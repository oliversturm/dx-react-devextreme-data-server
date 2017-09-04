(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'qs'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('qs'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.qs);
    global.DXReactDevExtremeDataAccess = mod.exports;
  }
})(this, function (exports, _qs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createDataFetcher = exports.fetchData = undefined;

  var _qs2 = _interopRequireDefault(_qs);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const DEFAULTBASEDATA = '//localhost:3000/data/v1/values';

  const createDataFetcher = (BASEDATA = DEFAULTBASEDATA) => {
    const getSortingParams = loadOptions => loadOptions.sorting && loadOptions.sorting.length > 0 ? {
      sort: loadOptions.sorting.map(s => ({
        selector: s.columnName,
        desc: s.direction === 'desc'
      }))
    } : {};

    const getPagingParams = loadOptions => {
      const params = {};
      if (loadOptions.pageSize) params.take = loadOptions.pageSize;
      if (loadOptions.currentPage > 0) params.skip = loadOptions.currentPage * loadOptions.pageSize;
      return params;
    };

    const getFilterParams = loadOptions => loadOptions.filters && loadOptions.filters.length > 0 ? {
      filter: loadOptions.filters.reduce((r, v) => {
        if (v.value) {
          if (r.length > 0) r.push('and');
          r.push([v.columnName, '=', v.columnName === 'int1' ? parseInt(v.value, 10) : v.value]);
        }
        return r;
      }, [])
    } : {};

    const getGroupParams = loadOptions => loadOptions.grouping && loadOptions.grouping.length > 0 ? {
      group: loadOptions.grouping.map(g => ({
        selector: g.columnName,
        isExpanded: false
      })),
      requireGroupCount: true,
      skip: undefined,
      take: undefined } : {};

    const createQueryURL = (baseUrl, loadOptions) => {
      const params = Object.assign.apply({}, [getSortingParams(loadOptions), getPagingParams(loadOptions), getFilterParams(loadOptions), getGroupParams(loadOptions), {
        requireTotalCount: true,
        tzOffset: new Date().getTimezoneOffset()
      }]);

      console.log('Created params: ', params);

      const query = _qs2.default.stringify(params, {
        arrayFormat: 'indices'
      });
      return query ? baseUrl.concat('?', query) : baseUrl;
    };

    const convertSimpleQueryData = data => ({
      rows: data.data,
      totalCount: data.totalCount
    });

    const createGroupQueryData = (data, loadOptions) => {
      const isExpanded = groupKey => loadOptions.expandedGroups.includes(groupKey);
      const furtherGroupLevels = groupLevel => groupLevel + 1 < loadOptions.grouping.length;

      let cqTotalCount = 0;
      let totalCount = 0;

      const pageRangeStart = loadOptions.currentPage >= 0 && loadOptions.pageSize ? loadOptions.currentPage * loadOptions.pageSize : undefined;
      const pageRangeEnd = pageRangeStart >= 0 ? pageRangeStart + loadOptions.pageSize : undefined;

      function countInPageRange(count) {
        return pageRangeStart >= 0 ? count >= pageRangeStart && count < pageRangeEnd : true;
      }

      function groupContentOverlapsPageRange(groupStart, groupLength) {
        return pageRangeStart >= 0 ? groupStart < pageRangeEnd && groupStart + groupLength >= pageRangeStart : true;
      }

      function* generateContentQueries(list, groupLevel = 0, parentGroupKey, parentFilters = []) {
        function getParentFilters(group) {
          return [...parentFilters, {
            columnName: loadOptions.grouping[groupLevel].columnName,
            value: group.key
          }];
        }

        function countRow(rowsParent) {
          if (rowsParent && isPageBoundary(cqTotalCount)) cqTotalCount++;

          cqTotalCount++;
        }

        function countRows(c, rowsParent) {
          for (let i = 0; i < c; i++) countRow(rowsParent);
        }

        for (let group of list) {
          countRow(parentGroupKey);
          const groupKey = (parentGroupKey ? `${parentGroupKey}|` : '') + group.key;
          if (isExpanded(groupKey)) {
            if (furtherGroupLevels(groupLevel)) yield* generateContentQueries(group.items, groupLevel + 1, groupKey, getParentFilters(group));else {
              if (groupContentOverlapsPageRange(cqTotalCount, group.count)) yield {
                groupKey,
                queryString: createQueryURL(BASEDATA, {
                  sorting: loadOptions.sorting,

                  filters: loadOptions.filters.concat(getParentFilters(group))
                })
              };
              countRows(group.count, group);
            }
          }
        }
      }

      function isPageBoundary(count) {
        const fraction = count / loadOptions.pageSize;
        return fraction > 0 && fraction === Math.trunc(fraction);
      }

      function* generateRows(list, contentData, groupLevel = 0, parentGroupRow) {
        function* yieldRow(row, rowsParent) {

          if (rowsParent && isPageBoundary(totalCount)) {
            const contRow = Object.assign({}, rowsParent, {
              value: `${rowsParent.value} continued...`,
              column: rowsParent.column
            });
            if (countInPageRange(totalCount)) yield contRow;
            totalCount++;
          }

          if (countInPageRange(totalCount)) yield row;
          totalCount++;
        }

        function createGroupRow(group) {
          return {
            _headerKey: `groupRow_${loadOptions.grouping[groupLevel].columnName}`,
            key: (parentGroupRow ? `${parentGroupRow.key}|` : '') + `${group.key}`,
            groupedBy: loadOptions.grouping[groupLevel].columnName,
            value: group.key,
            type: 'groupRow'
          };
        }

        function* getGroupContent(groupRow, contentData, itemCount) {
          const cd = contentData.find(c => c.groupKey === groupRow.key);
          if (cd) {
            for (let row of cd.content) yield* yieldRow(row, groupRow);
          } else {
            for (let i = 0; i < itemCount; i++) yield* yieldRow(null, groupRow);
          }
        }

        for (let group of list) {
          const groupRow = createGroupRow(group);
          yield* yieldRow(groupRow, parentGroupRow);

          if (isExpanded(groupRow.key)) {
            if (furtherGroupLevels(groupLevel)) {
              yield* generateRows(group.items, contentData, groupLevel + 1, groupRow);
            } else {
              yield* getGroupContent(groupRow, contentData, group.count);
            }
          }
        }
      }

      function getContentData(groups) {
        const queries = Array.from(generateContentQueries(groups)).map(q => simpleQuery(q.queryString).then(res => ({
          groupKey: q.groupKey,
          content: res.dataFetched ? res.data.rows : undefined
        })));

        return Promise.all(queries);
      }

      return getContentData(data.data).then(contentData => ({
        rows: Array.from(generateRows(data.data, contentData)),
        totalCount
      }));
    };

    const simpleQuery = queryUrl => {
      return fetch(queryUrl).then(response => response.json()).then(data => {
        console.log('Received simple data: ', data);

        return {
          dataFetched: true,
          data: convertSimpleQueryData(data)
        };
      }).catch(reason => ({
        dataFetched: false,
        reason
      }));
    };

    const groupQuery = (queryUrl, loadOptions) => {
      return fetch(queryUrl).then(response => response.json()).then(data => {
        console.log('Received group data: ', data);

        return createGroupQueryData(data, loadOptions).then(data => ({
          dataFetched: true,
          data
        }));
      }).catch(reason => ({
        dataFetched: false,
        reason
      }));
    };

    return loadOptions => {
      const queryUrl = createQueryURL(BASEDATA, loadOptions);

      return new Promise((resolve, reject) => {
        console.warn('Querying (decoded): ', decodeURIComponent(queryUrl));

        (loadOptions.grouping && loadOptions.grouping.length > 0 ? groupQuery(queryUrl, loadOptions) : simpleQuery(queryUrl)).then(result => resolve(result));
      });
    };
  };

  const fetchData = createDataFetcher();

  exports.fetchData = fetchData;
  exports.createDataFetcher = createDataFetcher;
});