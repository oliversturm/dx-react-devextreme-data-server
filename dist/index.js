(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '@devexpress/dx-react-core', './data-access', './loading.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('@devexpress/dx-react-core'), require('./data-access'), require('./loading.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.PropTypes, global.DevExpress.DXReactCore, global.DXReactDevExtremeDataAccess, global.loadingCss);
    global.DXReactDevExtremeDataServer = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _dxReactCore, _dataAccess) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DevExtremeDataServer = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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
      return this.state.loadResult ? this.state.loadResult.rows : [];
    }

    getTotalCount() {
      return this.state.loadResult ? this.state.loadResult.totalCount : 0;
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
            }
          });
        }
      });
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
      if (prevState.sorting !== this.state.sorting || prevState.currentPage !== this.state.currentPage || prevState.pageSize !== this.state.pageSize || prevState.filters !== this.state.filters || prevState.grouping !== this.state.grouping || prevState.expandedGroups !== this.state.expandedGroups || prevProps.reloadState !== this.props.reloadState) this.getData(this.getLoadOptions());
    }

    render() {
      return _react2.default.createElement(
        _dxReactCore.PluginContainer,
        null,
        _react2.default.createElement(_dxReactCore.Watcher, {
          watch: getter => ['sorting', 'currentPage', 'pageSize', 'filters', 'grouping', 'expandedGroups'].map(getter),
          onChange: (action, ...vals) => {
            const newPage = this.state.pageSize >= 0 && this.state.pageSize !== vals[2] ? Math.trunc(vals[1] * this.state.pageSize / vals[2]) : vals[1];

            this.setState({
              sorting: vals[0],
              currentPage: newPage,
              pageSize: vals[2],
              filters: vals[3],
              grouping: vals[4],
              expandedGroups: vals[5] ? Array.from(vals[5].values()) : [],
              loading: true
            });
            if (newPage !== vals[1]) action('setCurrentPage')(newPage);
          }
        }),
        _react2.default.createElement(_dxReactCore.Getter, { name: 'totalCount', value: this.getTotalCount() }),
        _react2.default.createElement(_dxReactCore.Getter, { name: 'rows', value: this.getRows() }),
        _react2.default.createElement(_dxReactCore.Getter, { name: 'loading', value: this.state.loading }),
        _react2.default.createElement(_dxReactCore.Getter, {
          name: 'totalPages',
          pureComputed: (totalCount, pageSize) => pageSize ? Math.ceil(totalCount / pageSize) : 0,
          connectArgs: getter => [getter('totalCount'), getter('pageSize')]
        }),
        _react2.default.createElement(_dxReactCore.Watcher, {
          watch: getter => [getter('totalPages'), getter('currentPage')],
          onChange: (action, totalPages, currentPage) => {
            if (totalPages > 0 && totalPages - 1 <= currentPage) action('setCurrentPage')(Math.max(totalPages - 1, 0));
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