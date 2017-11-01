(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '@devexpress/dx-react-core', '@devexpress/dx-react-grid', 'lodash', './data-access', './loading.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('@devexpress/dx-react-core'), require('@devexpress/dx-react-grid'), require('lodash'), require('./data-access'), require('./loading.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.PropTypes, global.DevExpress.DXReactCore, global.devexpressDxReactGrid, global.lodash, global.DXReactDevExtremeDataAccess, global.loadingCss);
    global.DXReactDevExtremeDataServer = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _dxReactCore, _dxReactGrid, _lodash, _dataAccess) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DevExtremeDataServer = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const defaultLoadingIndicator = () => _react2.default.createElement(
    'div',
    { className: 'loading-shading' },
    _react2.default.createElement('span', { className: 'glyphicon glyphicon-refresh loading-icon' })
  );

  class DevExtremeDataServer extends _react2.default.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        loadResult: undefined,
        reloadState: undefined,
        loading: false
      };
      this.getRows = this.getRows.bind(this);
      this.getTotalCount = this.getTotalCount.bind(this);

      this.fetchData = (0, _dataAccess.createDataFetcher)(this.props.url);
    }

    getRows() {
      return this.state.loadResult && this.state.loadResult.rows ? this.state.loadResult.rows : [];
    }

    getTotalCount() {
      return this.state.loadResult && this.state.loadResult.totalCount ? this.state.loadResult.totalCount : 0;
    }

    getData(loadOptions) {
      const loadingTimer = setTimeout(() => {
        this.setState({
          showLoadingIndicator: true
        });
      }, this.props.loadingIndicatorThreshold);

      this.fetchData(loadOptions).then(res => {
        if (res.dataFetched) {
          clearTimeout(loadingTimer);

          this.setState({
            reloadState: this.props.reloadState,
            loading: false,
            showLoadingIndicator: false,
            loadResult: {
              rows: res.data.rows,
              totalCount: res.data.totalCount
            },
            tempGrouping: null,
            tempExpandedGroups: null
          });
        }
      });
    }

    getChildGroups(currentRows, grouping) {
      if (currentRows.length === 0 || currentRows[0].type !== 'groupRow') {
        return [];
      }
      return currentRows.reduce((acc, row) => {
        if (row.type === 'groupRow' && row.groupedBy === grouping.columnName) {
          acc.push({ key: row.key, value: row.value, childRows: [] });
        } else {
          acc[acc.length - 1].childRows.push(row);
        }
        return acc;
      }, []);
    }

    getLoadOptions() {
      return {
        sorting: this.state.sorting,
        currentPage: this.state.currentPage,
        pageSize: this.state.pageSize,
        filters: this.state.filters,
        grouping: this.state.grouping,
        expandedGroups: this.state.expandedGroups
      };
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.reloadState !== prevProps.reloadState && !this.state.loading) this.setState({
        loading: true
      });

      if (prevState.sorting !== this.state.sorting || prevState.currentPage !== this.state.currentPage || prevState.pageSize !== this.state.pageSize || prevState.filters !== this.state.filters || prevState.grouping !== this.state.grouping || prevState.expandedGroups !== this.state.expandedGroups || prevProps.reloadState !== this.props.reloadState) {
        this.getData(this.getLoadOptions());
      }
    }

    render() {
      return _react2.default.createElement(
        _dxReactCore.PluginContainer,
        null,
        _react2.default.createElement(_dxReactCore.Getter, {
          name: 'rows',
          computed: ({
            sorting,
            currentPage,
            pageSize,
            filters,
            grouping,
            expandedGroups
          }, actions) => {
            const oldPageSize = this.state.pageSize || pageSize;

            const newPage = (() => {
              if (oldPageSize !== pageSize) return pageSize > 0 ? Math.trunc(currentPage * oldPageSize / pageSize) : 0;else return currentPage;
            })();

            const newState = {
              sorting,
              currentPage: newPage,
              pageSize,
              filters,
              grouping,
              expandedGroups,
              loading: true
            };

            if (!_lodash2.default.isEqual(this.state.grouping, grouping) || !_lodash2.default.isEqual(this.state.expandedGroups, expandedGroups)) {
              newState.tempGrouping = this.state.grouping;
              newState.tempExpandedGroups = this.state.expandedGroups ? Array.from(this.state.expandedGroups.values()) : [];
            }

            setTimeout(() => this.setState(newState));

            if (newPage !== currentPage) actions.setCurrentPage(newPage);

            return [];
          }
        }),
        _react2.default.createElement(_dxReactCore.Getter, { name: 'totalCount', value: this.getTotalCount() }),
        _react2.default.createElement(_dxReactCore.Getter, { name: 'rows', value: this.getRows() }),
        _react2.default.createElement(_dxReactGrid.CustomGrouping, {
          getChildGroups: this.getChildGroups,
          grouping: this.state.tempGrouping,
          expandedGroups: this.state.tempExpandedGroups
        }),
        _react2.default.createElement(_dxReactCore.Getter, { name: 'loading', value: this.state.loading }),
        _react2.default.createElement(_dxReactCore.Getter, {
          name: 'totalPages',
          computed: ({ pageSize, totalCount }) => pageSize > 0 ? Math.ceil(totalCount / pageSize) : totalCount > 0 ? 1 : 0
        }),
        _react2.default.createElement(_dxReactCore.Getter, {
          name: 'currentPage',
          computed: ({ currentPage, totalPages }, actions) => {
            if (totalPages > 0 && totalPages - 1 < currentPage) actions.setCurrentPage(Math.max(totalPages - 1, 0));
            return currentPage;
          }
        }),
        _react2.default.createElement(
          _dxReactCore.Template,
          { name: 'root' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_dxReactCore.TemplatePlaceholder, null),
            this.state.showLoadingIndicator && this.props.useLoadingIndicator && this.props.loadingIndicator()
          )
        )
      );
    }
  }

  DevExtremeDataServer.defaultProps = {
    url: undefined,
    reloadState: 0,
    loadingIndicator: defaultLoadingIndicator,
    useLoadingIndicator: true,
    loadingIndicatorThreshold: 500
  };

  DevExtremeDataServer.propTypes = {
    url: _propTypes2.default.string,
    reloadState: _propTypes2.default.number,
    loadingIndicator: _propTypes2.default.func,
    useLoadingIndicator: _propTypes2.default.bool,
    loadingIndicatorThreshold: _propTypes2.default.number
  };

  exports.DevExtremeDataServer = DevExtremeDataServer;
});