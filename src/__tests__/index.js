import { assert } from 'chai';
import { describe, it } from 'mocha';
import { DevExtremeDataServer } from '../index';
import { fetchData } from '../data-access';

describe('DevExtremeDataServer', function() {
  describe('getChildGroups', function() {
    it('refuses to do any work with an empty list', function() {
      const server = new DevExtremeDataServer({});
      const result = server.getChildGroups([], { columnName: 'test' });
      assert.deepEqual(result, []);
    });

    it('returns an empty list for wrong structure', function() {
      const server = new DevExtremeDataServer({});
      const result = server.getChildGroups(
        [{ intval: 3, strval: 'txt3' }, { intval: 4, strval: 'txt4' }],
        { columnName: 'test' }
      );
      assert.deepEqual(result, []);
    });

    it('does its thing correctly', function() {
      const server = new DevExtremeDataServer({});
      const rows = [
        { type: 'groupRow', groupedBy: 'field1', key: 1, value: 'group 1' },
        { intval: 3, strval: 'txt3' },
        { intval: 4, strval: 'txt4' },
        { type: 'groupRow', groupedBy: 'field1', key: 2, value: 'group 2' },
        { type: 'groupRow', groupedBy: 'field2', key: 21, value: 'subgroup 1' },
        { intval: 5, strval: 'txt5' }
      ];
      const groupsLevel1 = server.getChildGroups(rows, {
        columnName: 'field1'
      });
      assert.deepEqual(groupsLevel1, [
        {
          key: 1,
          value: 'group 1',
          childRows: [
            { intval: 3, strval: 'txt3' },
            { intval: 4, strval: 'txt4' }
          ]
        },
        {
          key: 2,
          value: 'group 2',
          childRows: [
            {
              type: 'groupRow',
              groupedBy: 'field2',
              key: 21,
              value: 'subgroup 1'
            },
            { intval: 5, strval: 'txt5' }
          ]
        }
      ]);

      const groupsLevel2 = server.getChildGroups(groupsLevel1[1].childRows, {
        columnName: 'field2'
      });
      assert.deepEqual(groupsLevel2, [
        {
          key: 21,
          value: 'subgroup 1',
          childRows: [{ intval: 5, strval: 'txt5' }]
        }
      ]);
    });
  });
});

describe('data access library', function() {
  describe('getSortingParams', function() {
    const { getSortingParams } = fetchData.testing;
    it('works', function() {
      const lo = {
        sorting: [
          { columnName: 'test', direction: 'desc' },
          { columnName: 'test2', direction: 'asc' }
        ]
      };
      const result = getSortingParams(lo);
      assert.deepEqual(result, {
        sort: [
          { selector: 'test', desc: true },
          { selector: 'test2', desc: false }
        ]
      });
    });

    it('ignores empty sorting', function() {
      assert.deepEqual(getSortingParams({ sorting: [] }), {});
    });

    it('ignores non-existent sorting', function() {
      assert.deepEqual(getSortingParams({}), {});
    });
  });

  describe('getPagingParams', function() {
    const { getPagingParams } = fetchData.testing;
    it('works', function() {
      const lo = { pageSize: 20, currentPage: 3 };
      assert.deepEqual(getPagingParams(lo), {
        take: 20,
        skip: 60
      });
    });

    it('ignores non-existent parameters', function() {
      assert.deepEqual(getPagingParams({}), {});
    });
  });

  describe('getFilterParams', function() {
    const { getFilterParams } = fetchData.testing;
    it('works with one filter', function() {
      const lo = {
        filters: [{ columnName: 'test', value: 42 }]
      };
      assert.deepEqual(getFilterParams(lo), { filter: [['test', '=', 42]] });
    });

    it('works with multiple filters', function() {
      const lo = {
        filters: [
          { columnName: 'test', value: 42 },
          { columnName: 'test2', value: 'other' }
        ]
      };
      assert.deepEqual(getFilterParams(lo), {
        filter: [['test', '=', 42], 'and', ['test2', '=', 'other']]
      });
    });

    it('ignores empty filter', function() {
      assert.deepEqual(getFilterParams({ filter: [] }), {});
    });

    it('ignores non-existent filter', function() {
      assert.deepEqual(getFilterParams({}), {});
    });
  });

  describe('getGroupParams', function() {
    const { getGroupParams } = fetchData.testing;

    it('works', function() {
      const lo = { grouping: [{ columnName: 'test' }] };
      assert.deepEqual(getGroupParams(lo), {
        group: [{ selector: 'test', isExpanded: false }],
        requireGroupCount: true,
        skip: undefined,
        take: undefined
      });
    });

    it('ignores empty grouping', function() {
      assert.deepEqual(getGroupParams({ grouping: [] }), {});
    });

    it('ignores non-existent grouping', function() {
      assert.deepEqual(getGroupParams({}), {});
    });
  });

  describe('createGroupQueryDataGenerator', function() {
    const { createGroupQueryDataGenerator } = fetchData.testing;

    describe('page range values', function() {
      it('pageRangeStart', function() {
        assert.equal(
          createGroupQueryDataGenerator(null, { pageSize: 10, currentPage: 3 })
            .testing.pageRangeStart,
          30
        );
      });

      it('pageRangeEnd', function() {
        assert.equal(
          createGroupQueryDataGenerator(null, { pageSize: 10, currentPage: 3 })
            .testing.pageRangeEnd,
          40
        );
      });

      it('special case for invalid params', function() {
        const {
          pageRangeStart,
          pageRangeEnd
        } = createGroupQueryDataGenerator(null, {
          pageSize: 10,
          currentPage: undefined
        }).testing;
        assert.isUndefined(pageRangeStart);
        assert.isUndefined(pageRangeEnd);
      });
    });

    describe('countInPageRange', function() {
      const { countInPageRange } = createGroupQueryDataGenerator(null, {
        pageSize: 10,
        currentPage: 3
      }).testing;

      it('finds count in range', function() {
        assert.isTrue(countInPageRange(32));
      });

      it('finds count outside of range', function() {
        assert.isFalse(countInPageRange(17));
      });

      it('has a special case for an undefined page range start', function() {
        // I don't remember what the point of this special case is, but
        // I clearly did it this way on purpose.
        const {
          countInPageRange: countInPageRange_
        } = createGroupQueryDataGenerator(null, {
          pageSize: 10,
          currentPage: undefined
        }).testing;
        assert.isTrue(countInPageRange_(3));
        assert.isTrue(countInPageRange_(-3));
        assert.isTrue(countInPageRange_(32));
        assert.isTrue(countInPageRange_(9999));
      });
    });

    describe('groupContentOverlapsPageRange', function() {
      const {
        groupContentOverlapsPageRange
      } = createGroupQueryDataGenerator(null, {
        pageSize: 10,
        currentPage: 3
      }).testing;

      it('finds overlap', function() {
        assert.isTrue(groupContentOverlapsPageRange(36, 10));
        assert.isTrue(groupContentOverlapsPageRange(32, 3));
        assert.isTrue(groupContentOverlapsPageRange(27, 10));
        assert.isTrue(groupContentOverlapsPageRange(27, 20));
      });

      it('finds no overlap', function() {
        assert.isFalse(groupContentOverlapsPageRange(42, 10));
        assert.isFalse(groupContentOverlapsPageRange(17, 10));
      });
    });

    describe('contentQueriesGenerator', function() {
      describe('getParentFilters', function() {
        it('works', function() {
          const {
            contentQueriesGenerator
          } = createGroupQueryDataGenerator(null, {
            pageSize: 10,
            currentPage: 0,
            grouping: [{ columnName: 'test' }]
          }).testing;

          const { getParentFilters } = contentQueriesGenerator(null, 0, null, [
            { existingFilter: 'barg' }
          ]).testing;
          assert.deepEqual(getParentFilters({ key: 'akey' }), [
            { existingFilter: 'barg' },
            { columnName: 'test', value: 'akey' }
          ]);
        });
      });

      describe('function', function() {
        it('works with one result', function() {
          const {
            contentQueriesGenerator
          } = createGroupQueryDataGenerator(null, {
            pageSize: 5,
            currentPage: 1,
            grouping: [{ columnName: 'test' }, { columnName: 'test2' }],
            expandedGroups: new Set(['top2', 'top3', 'top3|sub3', 'top3|sub4'])
          }).testing;
          const groupData = [
            {
              // group counts as one row, not expanded
              key: 'top1',
              items: [],
              count: 3
            },
            {
              // group counts as three rows, expanded with non-expanded children
              key: 'top2',
              items: [
                { key: 'sub1', items: [], count: 1 },
                { key: 'sub2', items: [], count: 1 }
              ],
              count: 2
            },
            {
              // group is expanded, header node is the final node on page 0 for
              // pageSize 5
              // first node of page 1 is the cont node for this
              key: 'top3',
              items: [
                {
                  // sub group is expanded, data should be queried because
                  // parts of it are visible with pageSize 5 and currentPage 1
                  // second node on page 1 is the header of this,
                  // followed by three content rows (out of five)
                  key: 'sub3',
                  items: [],
                  count: 5
                },
                {
                  // sub group is expanded, but it's not visible with pageSize 5
                  // and currentPage 1, so should not be queried
                  key: 'sub4',
                  items: [],
                  count: 5
                }
              ],
              count: 2
            }
          ];
          const result = Array.from(contentQueriesGenerator(groupData)());
          assert.deepEqual(result, [
            {
              groupKey: 'top3|sub3',
              queryString:
                '//localhost:3000/data/v1/values?filter%5B0%5D%5B0%5D=test&filter%5B0%5D%5B1%5D=%3D&filter%5B0%5D%5B2%5D=top3&filter%5B1%5D=and&filter%5B2%5D%5B0%5D=test2&filter%5B2%5D%5B1%5D=%3D&filter%5B2%5D%5B2%5D=sub3&requireTotalCount=true&tzOffset=0'
            }
          ]);
        });

        it('works with two results', function() {
          const {
            contentQueriesGenerator
          } = createGroupQueryDataGenerator(null, {
            pageSize: 5,
            currentPage: 1,
            grouping: [{ columnName: 'test' }, { columnName: 'test2' }],
            expandedGroups: new Set(['top2', 'top3', 'top3|sub3', 'top3|sub4'])
          }).testing;
          const groupData = [
            {
              // group counts as one row, not expanded
              key: 'top1',
              items: [],
              count: 3
            },
            {
              // group counts as three rows, expanded with non-expanded children
              key: 'top2',
              items: [
                { key: 'sub1', items: [], count: 1 },
                { key: 'sub2', items: [], count: 1 }
              ],
              count: 2
            },
            {
              // group is expanded, header node is the final node on page 0 for
              // pageSize 5
              // first node of page 1 is the cont node for this
              key: 'top3',
              items: [
                {
                  // sub group is expanded, data should be queried because
                  // parts of it are visible with pageSize 5 and currentPage 1
                  // second node on page 1 is the header of this,
                  // followed by one content row
                  key: 'sub3',
                  items: [],
                  count: 1
                },
                {
                  // sub group is expanded, data should be queried because
                  // page 1 has two rows available, so the header of this
                  // group and one content row fit on
                  key: 'sub4',
                  items: [],
                  count: 5
                }
              ],
              count: 2
            }
          ];
          const result = Array.from(contentQueriesGenerator(groupData)());
          assert.deepEqual(result, [
            {
              groupKey: 'top3|sub3',
              queryString:
                '//localhost:3000/data/v1/values?filter%5B0%5D%5B0%5D=test&filter%5B0%5D%5B1%5D=%3D&filter%5B0%5D%5B2%5D=top3&filter%5B1%5D=and&filter%5B2%5D%5B0%5D=test2&filter%5B2%5D%5B1%5D=%3D&filter%5B2%5D%5B2%5D=sub3&requireTotalCount=true&tzOffset=0'
            },
            {
              groupKey: 'top3|sub4',
              queryString:
                '//localhost:3000/data/v1/values?filter%5B0%5D%5B0%5D=test&filter%5B0%5D%5B1%5D=%3D&filter%5B0%5D%5B2%5D=top3&filter%5B1%5D=and&filter%5B2%5D%5B0%5D=test2&filter%5B2%5D%5B1%5D=%3D&filter%5B2%5D%5B2%5D=sub4&requireTotalCount=true&tzOffset=0'
            }
          ]);
        });
      });
    });
  });
});
