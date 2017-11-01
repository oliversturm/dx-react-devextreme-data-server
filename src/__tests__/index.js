import { assert } from 'chai';
import { describe, it } from 'mocha';
import { DevExtremeDataServer } from '../index';

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
