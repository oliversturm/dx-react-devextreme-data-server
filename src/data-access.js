import qs from 'qs';

const DEFAULTBASEDATA = '//localhost:3000/data/v1/values';

const createDataFetcher = (BASEDATA = DEFAULTBASEDATA) => {
  const getSortingParams = loadOptions =>
    loadOptions.sorting && loadOptions.sorting.length > 0
      ? {
          sort: loadOptions.sorting.map(s => ({
            selector: s.columnName,
            desc: s.direction === 'desc'
          }))
        }
      : {};

  const getPagingParams = loadOptions => {
    const params = {};
    if (loadOptions.pageSize) params.take = loadOptions.pageSize;
    if (loadOptions.currentPage > 0)
      params.skip = loadOptions.currentPage * loadOptions.pageSize;
    return params;
  };

  const getFilterParams = loadOptions =>
    loadOptions.filters && loadOptions.filters.length > 0
      ? {
          filter: loadOptions.filters.reduce((r, v) => {
            if (r.length > 0) r.push('and');
            r.push([v.columnName, '=', v.value]);
            return r;
          }, [])
        }
      : {};

  const getGroupParams = loadOptions =>
    loadOptions.grouping && loadOptions.grouping.length > 0
      ? {
          group: loadOptions.grouping.map(g => ({
            selector: g.columnName,
            isExpanded: false
          })),
          requireGroupCount: true,
          // skip and take override any previous settings when
          // these params are combined with others
          skip: undefined,
          take: undefined // always query all groups
        }
      : {};

  const createQueryURL = (baseUrl, loadOptions) => {
    const params = Object.assign.apply({}, [
      getSortingParams(loadOptions),
      getPagingParams(loadOptions),
      getFilterParams(loadOptions),
      getGroupParams(loadOptions), // overrides skip and take
      {
        requireTotalCount: true,
        tzOffset: new Date().getTimezoneOffset()
      }
    ]);

    const query = qs.stringify(params, {
      arrayFormat: 'indices'
    });
    return query ? baseUrl.concat('?', query) : baseUrl;
  };

  const convertSimpleQueryData = data => ({
    rows: data.data,
    totalCount: data.totalCount
  });

  const createGroupQueryDataGenerator = (data, loadOptions) => {
    const isExpanded = groupKey => loadOptions.expandedGroups.has(groupKey);

    const furtherGroupLevels = groupLevel =>
      groupLevel + 1 < loadOptions.grouping.length;

    // both total counts on this level - cqTotalCount is used only inside the
    // contentQueriesGenerator, but that is recursive and cqTotalCount should be
    // outside that context
    let cqTotalCount = 0;
    let totalCount = 0;

    // page range: if totalCount is >= pageRangeStart and < pageRangeEnd
    // *before* the yield, then we yield
    const pageRangeStart =
      loadOptions.currentPage >= 0 && loadOptions.pageSize
        ? loadOptions.currentPage * loadOptions.pageSize
        : undefined;
    const pageRangeEnd =
      pageRangeStart >= 0 ? pageRangeStart + loadOptions.pageSize : undefined;

    const countInPageRange = count =>
      pageRangeStart >= 0
        ? count >= pageRangeStart && count < pageRangeEnd
        : true;

    const groupContentOverlapsPageRange = (groupStart, groupLength) =>
      pageRangeStart >= 0
        ? groupStart < pageRangeEnd &&
          groupStart + groupLength >= pageRangeStart
        : true;

    function contentQueriesGenerator(
      list,
      groupLevel = 0,
      parentGroupKey,
      parentFilters = []
    ) {
      const getParentFilters = group => [
        ...parentFilters,
        {
          columnName: loadOptions.grouping[groupLevel].columnName,
          value: group.key
        }
      ];

      function countRow(hasRowsParent) {
        // represents yielding a cont row
        if (hasRowsParent && isPageBoundary(cqTotalCount)) cqTotalCount++;
        // yielding the row itself
        cqTotalCount++;
      }

      function countRows(c, hasRowsParent) {
        for (let i = 0; i < c; i++) countRow(hasRowsParent);
      }

      const result = function*() {
        for (let group of list) {
          countRow(!!parentGroupKey);
          const groupKey =
            (parentGroupKey ? `${parentGroupKey}|` : '') + group.key;
          if (isExpanded(groupKey)) {
            if (furtherGroupLevels(groupLevel)) {
              yield* contentQueriesGenerator(
                group.items,
                groupLevel + 1,
                groupKey,
                getParentFilters(group)
              )();
            } else {
              if (groupContentOverlapsPageRange(cqTotalCount, group.count)) {
                yield {
                  groupKey,
                  queryString: createQueryURL(BASEDATA, {
                    sorting: loadOptions.sorting,
                    // not passing paging options
                    filters: (loadOptions.filters || []).concat(
                      getParentFilters(group)
                    )
                  })
                };
              }
              countRows(group.count, !!group);
            }
          }
        }
      };

      result.testing = {
        getParentFilters
      };

      return result;
    }

    function isPageBoundary(count) {
      const fraction = count / loadOptions.pageSize;
      return fraction > 0 && fraction === Math.trunc(fraction);
    }

    function createRowsGenerator(
      list,
      contentData,
      groupLevel = 0,
      parentGroupRow
    ) {
      function* yieldRow(row, rowsParent) {
        // rowsParent is the actual parent group row for this row -
        // it differs from parentGroupRow on the createRowsGenerator function in
        // that content rows of top-level groups have a rowsParent, but
        // no parentGroupRow.

        if (rowsParent && isPageBoundary(totalCount)) {
          const contRow = Object.assign({}, rowsParent, {
            value: `${rowsParent.value} continued...`,
            column: rowsParent.column
          });
          if (countInPageRange(totalCount)) yield contRow;
          totalCount++;
        }

        // now yield the actual row
        if (countInPageRange(totalCount)) yield row;
        totalCount++;
      }

      function createGroupRow(group) {
        return {
          // With CustomGrouping, the key needs to be just the group key
          // itself, no longer the full key that contains parent elements.
          // However, we need the parent part as well, because it's used
          // to look up separately loaded group data.
          fullKey:
            (parentGroupRow ? `${parentGroupRow.fullKey}|` : '') +
            `${group.key}`,
          key: `${group.key}`,
          groupedBy: loadOptions.grouping[groupLevel].columnName,
          value: group.key,
          type: 'groupRow'
        };
      }

      function* getGroupContent(groupRow, contentData, itemCount) {
        // console.log(
        //   `getGroupContent with key ${groupRow.fullKey}, contentData`,
        //   contentData
        // );
        const cd = contentData.find(c => c.groupKey === groupRow.fullKey);
        if (cd) {
          // optimization idea: only query as many content records
          // as will fit on the page, then yield dummy rows for the
          // remainder - currently I'm still doing a full query for
          // content, even if part of it won't be visible.
          for (let row of cd.content) yield* yieldRow(row, groupRow);
        } else {
          // no content found for this expanded group means no
          // query was run, which means that this group content
          // is not visible on the current page
          // to count properly, I'll just yield dummy rows instead
          for (let i = 0; i < itemCount; i++) yield* yieldRow(null, groupRow);
        }
      }

      const result = function*() {
        for (let group of list) {
          // Top group row
          const groupRow = createGroupRow(group);
          yield* yieldRow(groupRow, parentGroupRow);

          // Is the group expanded?
          if (isExpanded(groupRow.fullKey)) {
            // Are there further group levels?
            if (furtherGroupLevels(groupLevel)) {
              yield* createRowsGenerator(
                group.items,
                contentData,
                groupLevel + 1,
                groupRow
              )();
            } else {
              // Now we need to return the group content
              yield* getGroupContent(groupRow, contentData, group.count);
            }
          }
        }
      };

      result.testing = {
        yieldRow,
        createGroupRow,
        getGroupContent
      };

      return result;
    }

    function getContentData(groups) {
      const queries = Array.from(contentQueriesGenerator(groups)()).map(q =>
        simpleQuery(q.queryString).then(res => ({
          groupKey: q.groupKey,
          content: res.dataFetched ? res.data.rows : undefined
        }))
      );

      return Promise.all(queries);
    }

    const result = () =>
      getContentData(data.data).then(contentData => ({
        rows: Array.from(createRowsGenerator(data.data, contentData)()),
        totalCount
      }));

    result.testing = {
      isExpanded,
      furtherGroupLevels,
      pageRangeStart,
      pageRangeEnd,
      countInPageRange,
      groupContentOverlapsPageRange,
      contentQueriesGenerator,
      isPageBoundary,
      createRowsGenerator,
      getContentData
    };

    return result;
  };

  const simpleQuery = queryUrl => {
    return fetch(queryUrl)
      .then(response => response.json())
      .then(data => {
        return {
          dataFetched: true,
          data: convertSimpleQueryData(data)
        };
      })
      .catch(reason => ({
        dataFetched: false,
        reason
      }));
  };

  // Algorithm for group queries:
  // - construct query url with group parameters, setting all groups to
  //   isExpanded false (so no detail data will be returned), and
  //   skip and take to undefined (I'm not completely sure why this is
  //   important - perhaps it could be optimized) (createQueryURL)
  // - query data on query url, this returns all groups on all levels
  // - generate content queries by iterating over group list, counting rows
  //   required per group, taking into account page size and current page,
  //   and yielding simple query URLs for the groups that are visible at
  //   least partly on the current page (createContentQueries)
  // - execute the detail queries (getContentData)
  // - (createRowsGenerator) Iterate group data recursively, counting carefully
  //   the number of rows actually yielded (yieldRow). Data from the detail
  //   queries is pulled from the result sets at the right point (getGroupContent)

  const groupQuery = (queryUrl, loadOptions) => {
    return fetch(queryUrl)
      .then(response => response.json())
      .then(data => {
        return createGroupQueryDataGenerator(
          data,
          loadOptions
        )().then(data => ({
          dataFetched: true,
          data
        }));
      })
      .catch(reason => ({
        dataFetched: false,
        reason
      }));
  };

  const result = loadOptions => {
    const queryUrl = createQueryURL(BASEDATA, loadOptions);

    return new Promise(resolve => {
      (loadOptions.grouping && loadOptions.grouping.length > 0
        ? groupQuery(queryUrl, loadOptions)
        : simpleQuery(queryUrl)
      ).then(result => resolve(result));
    });
  };

  result.testing = {
    getSortingParams,
    getPagingParams,
    getFilterParams,
    getGroupParams,
    createQueryURL,
    convertSimpleQueryData,
    createGroupQueryDataGenerator,
    simpleQuery,
    groupQuery
  };

  return result;
};

const fetchData = createDataFetcher();

export { fetchData, createDataFetcher };
