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
  });
});
