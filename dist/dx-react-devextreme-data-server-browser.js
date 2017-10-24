(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"), require("@devexpress/dx-react-core"), require("qs"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types", "@devexpress/dx-react-core", "qs"], factory);
	else if(typeof exports === 'object')
		exports["DXReactDevExtremeDataServer"] = factory(require("react"), require("prop-types"), require("@devexpress/dx-react-core"), require("qs"));
	else
		root["DXReactDevExtremeDataServer"] = factory(root["React"], root["PropTypes"], root["DevExpress"]["DXReactCore"], root["Qs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var defaultLoadingIndicator = function defaultLoadingIndicator() {
    return _react2.default.createElement(
      'div',
      { className: 'loading-shading' },
      _react2.default.createElement('span', { className: 'glyphicon glyphicon-refresh loading-icon' })
    );
  };

  var DevExtremeDataServer = function (_React$PureComponent) {
    _inherits(DevExtremeDataServer, _React$PureComponent);

    function DevExtremeDataServer(props) {
      _classCallCheck(this, DevExtremeDataServer);

      var _this = _possibleConstructorReturn(this, (DevExtremeDataServer.__proto__ || Object.getPrototypeOf(DevExtremeDataServer)).call(this, props));

      _this.state = {
        loadResult: undefined,
        reloadState: undefined,
        loading: false
      };
      _this.getRows = _this.getRows.bind(_this);
      _this.getTotalCount = _this.getTotalCount.bind(_this);

      _this.fetchData = (0, _dataAccess.createDataFetcher)(_this.props.url);
      return _this;
    }

    _createClass(DevExtremeDataServer, [{
      key: 'getRows',
      value: function getRows() {
        return this.state.loadResult && this.state.loadResult.rows ? this.state.loadResult.rows : [];
      }
    }, {
      key: 'getTotalCount',
      value: function getTotalCount() {
        return this.state.loadResult && this.state.loadResult.totalCount ? this.state.loadResult.totalCount : 0;
      }
    }, {
      key: 'getData',
      value: function getData(loadOptions) {
        var _this2 = this;

        var loadingTimer = setTimeout(function () {
          _this2.setState({
            showLoadingIndicator: true
          });
        }, this.props.loadingIndicatorThreshold);

        this.fetchData(loadOptions).then(function (res) {
          if (res.dataFetched) {
            clearTimeout(loadingTimer);

            _this2.setState({
              reloadState: _this2.props.reloadState,
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
    }, {
      key: 'getLoadOptions',
      value: function getLoadOptions() {
        return {
          sorting: this.state.sorting,
          currentPage: this.state.currentPage,
          pageSize: this.state.pageSize,
          filters: this.state.filters,
          grouping: this.state.grouping,
          expandedGroups: this.state.expandedGroups
        };
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (this.props.reloadState !== prevProps.reloadState && !this.state.loading) this.setState({
          loading: true
        });

        if (prevState.sorting !== this.state.sorting || prevState.currentPage !== this.state.currentPage || prevState.pageSize !== this.state.pageSize || prevState.filters !== this.state.filters || prevState.grouping !== this.state.grouping || prevState.expandedGroups !== this.state.expandedGroups || prevProps.reloadState !== this.props.reloadState) this.getData(this.getLoadOptions());
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        return _react2.default.createElement(
          _dxReactCore.PluginContainer,
          null,
          _react2.default.createElement(_dxReactCore.Watcher, {
            watch: function watch(getter) {
              return ['sorting', 'currentPage', 'pageSize', 'filters', 'grouping', 'expandedGroups'].map(getter);
            },
            onChange: function onChange(action) {
              for (var _len = arguments.length, vals = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                vals[_key - 1] = arguments[_key];
              }

              var oldPageSize = _this3.state.pageSize || vals[2];

              var newPage = function () {
                if (oldPageSize !== vals[2]) return vals[2] > 0 ? Math.trunc(vals[1] * oldPageSize / vals[2]) : 0;else return vals[1];
              }();

              _this3.setState({
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
          _react2.default.createElement(_dxReactCore.Getter, { name: 'isGroupRow', value: function value(row) {
              return row.type === 'group';
            } }),
          _react2.default.createElement(_dxReactCore.Getter, { name: 'totalCount', value: this.getTotalCount() }),
          _react2.default.createElement(_dxReactCore.Getter, { name: 'rows', value: this.getRows() }),
          _react2.default.createElement(_dxReactCore.Getter, { name: 'loading', value: this.state.loading }),
          _react2.default.createElement(_dxReactCore.Getter, {
            name: 'totalPages',
            computed: function computed(getters) {
              return getters.pageSize > 0 ? Math.ceil(getters.totalCount / getters.pageSize) : getters.totalCount > 0 ? 1 : 0;
            }
          }),
          _react2.default.createElement(_dxReactCore.Watcher, {
            watch: function watch(getter) {
              return [getter('totalPages'), getter('currentPage')];
            },
            onChange: function onChange(action, totalPages, currentPage) {
              if (totalPages > 0 && totalPages - 1 < currentPage) action('setCurrentPage')(Math.max(totalPages - 1, 0));
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
    }]);

    return DevExtremeDataServer;
  }(_react2.default.PureComponent);

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var DEFAULTBASEDATA = '//localhost:3000/data/v1/values';

  var createDataFetcher = function createDataFetcher() {
    var BASEDATA = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTBASEDATA;

    var getSortingParams = function getSortingParams(loadOptions) {
      return loadOptions.sorting && loadOptions.sorting.length > 0 ? {
        sort: loadOptions.sorting.map(function (s) {
          return {
            selector: s.columnName,
            desc: s.direction === 'desc'
          };
        })
      } : {};
    };

    var getPagingParams = function getPagingParams(loadOptions) {
      var params = {};
      if (loadOptions.pageSize) params.take = loadOptions.pageSize;
      if (loadOptions.currentPage > 0) params.skip = loadOptions.currentPage * loadOptions.pageSize;
      return params;
    };

    var getFilterParams = function getFilterParams(loadOptions) {
      return loadOptions.filters && loadOptions.filters.length > 0 ? {
        filter: loadOptions.filters.reduce(function (r, v) {
          if (v.value) {
            if (r.length > 0) r.push('and');
            r.push([v.columnName, '=', v.columnName === 'int1' ? parseInt(v.value, 10) : v.value]);
          }
          return r;
        }, [])
      } : {};
    };

    var getGroupParams = function getGroupParams(loadOptions) {
      return loadOptions.grouping && loadOptions.grouping.length > 0 ? {
        group: loadOptions.grouping.map(function (g) {
          return {
            selector: g.columnName,
            isExpanded: false
          };
        }),
        requireGroupCount: true,
        skip: undefined,
        take: undefined } : {};
    };

    var createQueryURL = function createQueryURL(baseUrl, loadOptions) {
      var params = Object.assign.apply({}, [getSortingParams(loadOptions), getPagingParams(loadOptions), getFilterParams(loadOptions), getGroupParams(loadOptions), {
        requireTotalCount: true,
        tzOffset: new Date().getTimezoneOffset()
      }]);

      console.log('Created params: ', params);

      var query = _qs2.default.stringify(params, {
        arrayFormat: 'indices'
      });
      return query ? baseUrl.concat('?', query) : baseUrl;
    };

    var convertSimpleQueryData = function convertSimpleQueryData(data) {
      return {
        rows: data.data,
        totalCount: data.totalCount
      };
    };

    var createGroupQueryData = function createGroupQueryData(data, loadOptions) {
      var _marked = [generateContentQueries, generateRows].map(regeneratorRuntime.mark);

      var isExpanded = function isExpanded(groupKey) {
        return loadOptions.expandedGroups.includes(groupKey);
      };
      var furtherGroupLevels = function furtherGroupLevels(groupLevel) {
        return groupLevel + 1 < loadOptions.grouping.length;
      };

      var cqTotalCount = 0;
      var totalCount = 0;

      var pageRangeStart = loadOptions.currentPage >= 0 && loadOptions.pageSize ? loadOptions.currentPage * loadOptions.pageSize : undefined;
      var pageRangeEnd = pageRangeStart >= 0 ? pageRangeStart + loadOptions.pageSize : undefined;

      function countInPageRange(count) {
        return pageRangeStart >= 0 ? count >= pageRangeStart && count < pageRangeEnd : true;
      }

      function groupContentOverlapsPageRange(groupStart, groupLength) {
        return pageRangeStart >= 0 ? groupStart < pageRangeEnd && groupStart + groupLength >= pageRangeStart : true;
      }

      function generateContentQueries(list) {
        var groupLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var parentGroupKey = arguments[2];
        var parentFilters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        var getParentFilters, countRow, countRows, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, group, groupKey;

        return regeneratorRuntime.wrap(function generateContentQueries$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                countRows = function countRows(c, rowsParent) {
                  for (var i = 0; i < c; i++) {
                    countRow(rowsParent);
                  }
                };

                countRow = function countRow(rowsParent) {
                  if (rowsParent && isPageBoundary(cqTotalCount)) cqTotalCount++;

                  cqTotalCount++;
                };

                getParentFilters = function getParentFilters(group) {
                  return [].concat(_toConsumableArray(parentFilters), [{
                    columnName: loadOptions.grouping[groupLevel].columnName,
                    value: group.key
                  }]);
                };

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 6;
                _iterator = list[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 24;
                  break;
                }

                group = _step.value;

                countRow(parentGroupKey);
                groupKey = (parentGroupKey ? parentGroupKey + '|' : '') + group.key;

                if (!isExpanded(groupKey)) {
                  _context.next = 21;
                  break;
                }

                if (!furtherGroupLevels(groupLevel)) {
                  _context.next = 17;
                  break;
                }

                return _context.delegateYield(generateContentQueries(group.items, groupLevel + 1, groupKey, getParentFilters(group)), 't0', 15);

              case 15:
                _context.next = 21;
                break;

              case 17:
                if (!groupContentOverlapsPageRange(cqTotalCount, group.count)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 20;
                return {
                  groupKey: groupKey,
                  queryString: createQueryURL(BASEDATA, {
                    sorting: loadOptions.sorting,

                    filters: loadOptions.filters.concat(getParentFilters(group))
                  })
                };

              case 20:
                countRows(group.count, group);

              case 21:
                _iteratorNormalCompletion = true;
                _context.next = 8;
                break;

              case 24:
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t1 = _context['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 30:
                _context.prev = 30;
                _context.prev = 31;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 33:
                _context.prev = 33;

                if (!_didIteratorError) {
                  _context.next = 36;
                  break;
                }

                throw _iteratorError;

              case 36:
                return _context.finish(33);

              case 37:
                return _context.finish(30);

              case 38:
              case 'end':
                return _context.stop();
            }
          }
        }, _marked[0], this, [[6, 26, 30, 38], [31,, 33, 37]]);
      }

      function isPageBoundary(count) {
        var fraction = count / loadOptions.pageSize;
        return fraction > 0 && fraction === Math.trunc(fraction);
      }

      function generateRows(list, contentData) {
        var groupLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var parentGroupRow = arguments[3];

        var _marked2, yieldRow, createGroupRow, getGroupContent, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, group, groupRow;

        return regeneratorRuntime.wrap(function generateRows$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                getGroupContent = function getGroupContent(groupRow, contentData, itemCount) {
                  var cd, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, row, i;

                  return regeneratorRuntime.wrap(function getGroupContent$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          cd = contentData.find(function (c) {
                            return c.groupKey === groupRow.key;
                          });

                          if (!cd) {
                            _context3.next = 29;
                            break;
                          }

                          _iteratorNormalCompletion2 = true;
                          _didIteratorError2 = false;
                          _iteratorError2 = undefined;
                          _context3.prev = 5;
                          _iterator2 = cd.content[Symbol.iterator]();

                        case 7:
                          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context3.next = 13;
                            break;
                          }

                          row = _step2.value;
                          return _context3.delegateYield(yieldRow(row, groupRow), 't0', 10);

                        case 10:
                          _iteratorNormalCompletion2 = true;
                          _context3.next = 7;
                          break;

                        case 13:
                          _context3.next = 19;
                          break;

                        case 15:
                          _context3.prev = 15;
                          _context3.t1 = _context3['catch'](5);
                          _didIteratorError2 = true;
                          _iteratorError2 = _context3.t1;

                        case 19:
                          _context3.prev = 19;
                          _context3.prev = 20;

                          if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                          }

                        case 22:
                          _context3.prev = 22;

                          if (!_didIteratorError2) {
                            _context3.next = 25;
                            break;
                          }

                          throw _iteratorError2;

                        case 25:
                          return _context3.finish(22);

                        case 26:
                          return _context3.finish(19);

                        case 27:
                          _context3.next = 35;
                          break;

                        case 29:
                          i = 0;

                        case 30:
                          if (!(i < itemCount)) {
                            _context3.next = 35;
                            break;
                          }

                          return _context3.delegateYield(yieldRow(null, groupRow), 't2', 32);

                        case 32:
                          i++;
                          _context3.next = 30;
                          break;

                        case 35:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _marked2[1], this, [[5, 15, 19, 27], [20,, 22, 26]]);
                };

                createGroupRow = function createGroupRow(group) {
                  return {
                    _headerKey: 'groupRow_' + loadOptions.grouping[groupLevel].columnName,
                    key: (parentGroupRow ? parentGroupRow.key + '|' : '') + ('' + group.key),
                    groupedBy: loadOptions.grouping[groupLevel].columnName,
                    value: group.key,
                    type: 'groupRow'
                  };
                };

                yieldRow = function yieldRow(row, rowsParent) {
                  var contRow;
                  return regeneratorRuntime.wrap(function yieldRow$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(rowsParent && isPageBoundary(totalCount))) {
                            _context2.next = 6;
                            break;
                          }

                          contRow = Object.assign({}, rowsParent, {
                            value: rowsParent.value + ' continued...',
                            column: rowsParent.column
                          });

                          if (!countInPageRange(totalCount)) {
                            _context2.next = 5;
                            break;
                          }

                          _context2.next = 5;
                          return contRow;

                        case 5:
                          totalCount++;

                        case 6:
                          if (!countInPageRange(totalCount)) {
                            _context2.next = 9;
                            break;
                          }

                          _context2.next = 9;
                          return row;

                        case 9:
                          totalCount++;

                        case 10:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _marked2[0], this);
                };

                _marked2 = [yieldRow, getGroupContent].map(regeneratorRuntime.mark);
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context4.prev = 7;
                _iterator3 = list[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context4.next = 22;
                  break;
                }

                group = _step3.value;
                groupRow = createGroupRow(group);
                return _context4.delegateYield(yieldRow(groupRow, parentGroupRow), 't0', 13);

              case 13:
                if (!isExpanded(groupRow.key)) {
                  _context4.next = 19;
                  break;
                }

                if (!furtherGroupLevels(groupLevel)) {
                  _context4.next = 18;
                  break;
                }

                return _context4.delegateYield(generateRows(group.items, contentData, groupLevel + 1, groupRow), 't1', 16);

              case 16:
                _context4.next = 19;
                break;

              case 18:
                return _context4.delegateYield(getGroupContent(groupRow, contentData, group.count), 't2', 19);

              case 19:
                _iteratorNormalCompletion3 = true;
                _context4.next = 9;
                break;

              case 22:
                _context4.next = 28;
                break;

              case 24:
                _context4.prev = 24;
                _context4.t3 = _context4['catch'](7);
                _didIteratorError3 = true;
                _iteratorError3 = _context4.t3;

              case 28:
                _context4.prev = 28;
                _context4.prev = 29;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 31:
                _context4.prev = 31;

                if (!_didIteratorError3) {
                  _context4.next = 34;
                  break;
                }

                throw _iteratorError3;

              case 34:
                return _context4.finish(31);

              case 35:
                return _context4.finish(28);

              case 36:
              case 'end':
                return _context4.stop();
            }
          }
        }, _marked[1], this, [[7, 24, 28, 36], [29,, 31, 35]]);
      }

      function getContentData(groups) {
        var queries = Array.from(generateContentQueries(groups)).map(function (q) {
          return simpleQuery(q.queryString).then(function (res) {
            return {
              groupKey: q.groupKey,
              content: res.dataFetched ? res.data.rows : undefined
            };
          });
        });

        return Promise.all(queries);
      }

      return getContentData(data.data).then(function (contentData) {
        return {
          rows: Array.from(generateRows(data.data, contentData)),
          totalCount: totalCount
        };
      });
    };

    var simpleQuery = function simpleQuery(queryUrl) {
      return fetch(queryUrl).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log('Received simple data: ', data);

        return {
          dataFetched: true,
          data: convertSimpleQueryData(data)
        };
      }).catch(function (reason) {
        return {
          dataFetched: false,
          reason: reason
        };
      });
    };

    var groupQuery = function groupQuery(queryUrl, loadOptions) {
      return fetch(queryUrl).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log('Received group data: ', data);

        return createGroupQueryData(data, loadOptions).then(function (data) {
          return {
            dataFetched: true,
            data: data
          };
        });
      }).catch(function (reason) {
        return {
          dataFetched: false,
          reason: reason
        };
      });
    };

    return function (loadOptions) {
      var queryUrl = createQueryURL(BASEDATA, loadOptions);

      return new Promise(function (resolve, reject) {
        console.warn('Querying (decoded): ', decodeURIComponent(queryUrl));

        (loadOptions.grouping && loadOptions.grouping.length > 0 ? groupQuery(queryUrl, loadOptions) : simpleQuery(queryUrl)).then(function (result) {
          return resolve(result);
        });
      });
    };
  };

  var fetchData = createDataFetcher();

  exports.fetchData = fetchData;
  exports.createDataFetcher = createDataFetcher;
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./loading.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./loading.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports


// module
exports.push([module.i, ".loading-shading {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(255, 255, 255, .3);\n}\n\n.loading-icon {\n    position: absolute;\n    font-size: 20px;\n    top: calc(45% - 10px) !important;\n    left: calc(50% - 10px);\n\n  -animation: spin .7s infinite linear;\n  -webkit-animation: spin2 .7s infinite linear;\n}\n\n@-webkit-keyframes spin2 {\n    from { -webkit-transform: rotate(0deg); }\n    to { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n    from { transform: scale(1) rotate(0deg); }\n    to { transform: scale(1) rotate(360deg); }\n}\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});