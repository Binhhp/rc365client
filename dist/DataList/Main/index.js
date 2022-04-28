"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainList = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.json.stringify.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/esnext.string.replace-all.js");

require("core-js/modules/es.array.sort.js");

var React = _interopRequireWildcard(require("react"));

var _ScrollablePane = require("../../ScrollablePane");

var _Sticky = require("../../Sticky");

var _selection = require("../../@uifabric/utilities/selection");

var _DetailsList = require("../../DetailsList");

var _GroupedList = require("../../GroupedList");

var _ShimmeredDetailsList = require("../../DetailsList/ShimmeredDetailsList");

var _MarqueeSelection = require("../../MarqueeSelection");

var _Interface = require("../Interface");

var _MainStyle = require("./MainStyle");

var _ContextualMenu = require("../../@uifabric/utilities/ContextualMenu");

var _Panel = require("../../Panel");

var _CustomCheckBox = _interopRequireDefault(require("../../Checkbox/CustomCheckBox"));

var _Panel2 = _interopRequireDefault(require("../Panel"));

var _odataQuery = _interopRequireDefault(require("odata-query"));

var _icons = require("../../@uifabric/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MainList extends React.Component {
  constructor(_props) {
    super(_props);

    this._onHandleBuildItemsWithGroupBy = items => {
      let workingItems = items ? items : [...this.state.items];
      let keys = [];

      if (this.props.groupBy && workingItems.length > 0) {
        workingItems.forEach(i => {
          if (this.props.groupBy && !keys.includes(i[this.props.groupBy])) {
            keys.push(i[this.props.groupBy]);
          }
        });
      }

      return keys;
    };

    this._BuildItemsByGoupByKeys = (keys, items) => {
      let newsItems = [];
      let workingItems = items ? items : this.state.items;

      if (keys.length > 0 && workingItems.length > 0) {
        let crtItems = [...workingItems];
        keys.forEach((k, i) => {
          let items = crtItems.filter(i => this.props.groupBy && i[this.props.groupBy] === k);
          newsItems = [...newsItems, ...items];
        });
      }

      return newsItems;
    };

    this._BuildMyGroupFromKeys = (keys, items) => {
      let groups = [];
      keys.forEach((k, i) => {
        let item = {
          key: "",
          name: "",
          startIndex: 0,
          count: 0
        };

        if (i > 0) {
          item.startIndex = groups[groups.length - 1].count + groups[groups.length - 1].startIndex;
        }

        item.key = k;
        item.name = k;
        item.count = items.filter(it => this.props.groupBy && it[this.props.groupBy] === k).length;
        return groups.push(item);
      });
      return groups;
    };

    this._onHandleFirstLoad = async () => {
      let storageData = this._onHandleGetLocalStorageData();

      let columns = this._BuildDefaultColumn(storageData.filterQuery);

      let groups = this._BuildDefaultGroups();

      let columnAfterFilterStorage = columns;

      if (storageData.filterCols && storageData.filterCols.length > 0) {
        let newCols = columnAfterFilterStorage.filter(col => storageData.filterCols.includes(col.key) || col.key === "settingCol");
        columnAfterFilterStorage = newCols;
      }

      this.setState({
        sourceColumns: columns,
        columns: columnAfterFilterStorage,
        groups,
        nextLink: this.props.queryClass.nextLink,
        sourceGroups: groups,
        filterQuery: storageData.filterQuery,
        filterCols: storageData.filterCols,
        skipNumber: this.props.skipNumber,
        isFirstLoad: false
      }, () => this._onHandleCheckMode());
    };

    this._onHandleCheckMode = async () => {
      if (this.props.items || typeof this.props.isOffline === "boolean" && this.props.isOffline && !this.props.items) {
        console.log("is Offline");

        this._onHandleOfflineMode();
      }

      if (!this.props.items && (!this.props.isOffline || this.props.isOffline && !this.props.items)) {
        console.log("is Online");

        this._onHandleOnlineMode();
      }
    };

    this._onHandleOfflineMode = () => {
      if (this.props.items) {
        this.setState({
          items: this.props.items
        });
      }
    };

    this._onHandleOnlineMode = () => {
      this.onHandleQueryDataByClassType();
    };

    this._SettingColumn = () => {
      return {
        key: "settingCol",
        name: "File Type",
        iconName: "Settings",
        className: "column-icon",
        iconClassName: "settingCol-filter",
        isIconOnly: true,
        isResizable: false,
        isNotAction: false,
        isNotFilter: false,
        priority: 0,
        fieldName: "icon",
        minWidth: 16,
        maxWidth: 16,
        booleanFormOpts: [],
        onColumnClick: this._onRenderColumnFilter,
        onRender: item => {
          return /*#__PURE__*/React.createElement("div", {
            className: "settingCol-wrapper",
            style: {
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }, /*#__PURE__*/React.createElement(_icons.Icon, {
            iconName: this.props.iconName ? this.props.iconName : "PageData"
          }));
        }
      };
    };

    this._onResetPageIndex = async () => {
      let listItem = document.getElementsByClassName(this.props.rcName ? "".concat(this.props.rcName, "-scrollPane") : "ms-ScrollablePane--contentContainer")[0];

      if (listItem) {
        await listItem.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

      await this.setState({
        page: 1,
        isLastPage: false
      });
    };

    this._BuildDefaultGroups = () => {
      let crtGroup = [...this.state.groups];

      if (this.props.groups && this.props.groups.length > 0) {
        crtGroup = [...this.props.groups];
        crtGroup.push({
          key: "lastGroup",
          name: "",
          startIndex: crtGroup[crtGroup.length - 1].startIndex + crtGroup[crtGroup.length - 1].count,
          count: 10,
          level: 1,
          hasMoreData: true,
          isShowingAll: true,
          isCollapsed: false
        });
        return crtGroup;
      }

      return crtGroup;
    };

    this._BuildDefaultColumn = storage => {
      let crtFilter = storage ? [...storage] : [...this.state.filterQuery];
      let crtCol = this.props.columns;
      let cols = crtCol.map(col => {
        if (col.key === "settingCol") {
          return col;
        }

        let isSorting = crtFilter.some(f => f.type === _Interface.FilterType.Sort && f.columnKey === col.key);
        let isHasBeenFilter = crtFilter.some(f => f.key === col.key && f.type === _Interface.FilterType.Filter);
        let isSortedDescending = crtFilter.some(f => f.columnKey === col.key && f.order === _Interface.OrderValue.desc);
        col.isResizable = col.isResizable || true;
        col.isCollapsible = col.isCollapsible || false; // scroll-x  = true if this true

        col.isSorted = isSorting || false;
        col.isSortedDescending = isSortedDescending;
        col.sortAscendingAriaLabel = "Sorted A to Z";
        col.sortDescendingAriaLabel = "Sorted Z to A";
        col.isPadded = col.isPadded || true; // col.maxWidth = col.maxWidth;
        // col.isDisable= col.isDisable || false;

        col.booleanFormOpts = col.booleanFormOpts || [];
        col.priority = col.priority || 999;
        col.isFilter = isHasBeenFilter;
        col.isNotAction = col.isNotAction || false;
        col.isNotFilter = col.isNotFilter || false;
        col.onColumnClick = this._onHeaderClick;
        return col;
      });

      let settingCol = this._SettingColumn();

      cols.unshift(settingCol); // doing with group here

      return cols;
    };

    this._onRenderColumnFilter = (ev, column) => {
      if (!this.state.contextualMenu) {
        this.setState({
          contextualMenu: this._getContextualMenuFilterProps(ev, column),
          workingColumn: column
        });
      } else {
        this._onFilterColumn();

        this.setState({
          contextualMenu: undefined,
          workingColumn: column
        });
      }
    };

    this._onHeaderClick = (ev, column) => {
      this.setState({
        contextualMenu: this._getContextualMenuProps(ev, column),
        workingColumn: column
      });
    };

    this._BuildDefaultSortObj = () => {
      let index = 999;
      let fieldName = "";
      let key = "";
      this.props.columns.forEach(col => {
        if (col.priority && col.fieldName && col.priority < index) {
          index = col.priority;
          fieldName = col.fieldName;
          key = col.key;
        }
      });
      return {
        key,
        fieldName
      };
    };

    this._onHandleGetLocalStorageData = () => {
      let listData = localStorage.getItem("listData");

      let defaultObj = this._BuildDefaultSortObj();

      let defaultFilter = [{
        columnKey: defaultObj.key,
        key: defaultObj.fieldName,
        value: "",
        operator: "",
        order: _Interface.OrderValue.asc,
        type: _Interface.FilterType.Sort
      }];

      if (listData) {
        let data = JSON.parse(listData);
        let listName = this.props.rcName;
        let listItem = data.find(i => i.listName === listName);

        if (listItem) {
          return {
            filterQuery: listItem.filterQuery,
            filterCols: listItem.filterColumn
          };
        }
      }

      return {
        filterQuery: defaultFilter,
        filterCols: []
      };
    };

    this._onHandleSaveToLocalStorage = () => {
      let crtQuery = [...this.state.filterQuery];
      let listData = localStorage.getItem("listData"); // already exist

      let obj = {
        listName: this.props.rcName,
        filterQuery: crtQuery,
        filterColumn: this.state.filterCols
      };

      if (listData) {
        let data = JSON.parse(listData);
        let index = data.findIndex(d => d.listName === this.props.rcName);

        if (index === -1) {
          data.push(obj);
        }

        if (index !== -1) {
          data[index].filterQuery = obj.filterQuery;
          data[index].filterColumn = obj.filterColumn;
        }

        localStorage.setItem("listData", JSON.stringify(data));
      }

      if (!listData) {
        localStorage.setItem("listData", JSON.stringify([obj]));
      }
    };

    this.onHandleSetSelectedItems = () => {
      // const selectionItems = this._selection.getSelection();
      let newSelection = this._selection;

      if (this.props.selectedItems && this.state.items && this.state.items.length > 0) {
        let uniqueKey = this.props.uniqueItemKey ? this.props.uniqueItemKey : "id";
        let selectedItems = this.state.items.map(i => {
          return _objectSpread(_objectSpread({}, i), {}, {
            key: i[uniqueKey]
          });
        });
        newSelection.setItems(selectedItems);

        for (let i = 0; i < selectedItems.length; i++) {
          if (this.props.selectedItems.some(item => item[uniqueKey] === selectedItems[i][uniqueKey])) {
            newSelection.setKeySelected("".concat(selectedItems[i][uniqueKey]), true, false);
          }
        }
      }
    };

    this._BuildEndpointWithSortAndFilter = () => {
      let crtQuery = [...this.state.filterQuery];
      let sortArr = crtQuery.filter(q => q.type === _Interface.FilterType.Sort);
      let filterArr = crtQuery.filter(q => q.type !== _Interface.FilterType.Sort);
      let orderByAr = [];
      let filterWith = [];

      if (sortArr.length > 0) {
        orderByAr = ["".concat(sortArr[0].key, " ").concat(sortArr[0].order)];

        if (sortArr[0].childQuery) {
          orderByAr = ["".concat(sortArr[0].childQuery, " ").concat(sortArr[0].order)];
        }
      }

      if (filterArr) {
        filterArr.forEach(f => {
          let {
            columnKey,
            value,
            operator,
            childQuery
          } = f;
          let conditionKey = childQuery ? childQuery : columnKey;
          let isFilterOr = this.state.columns.findIndex(col => col.fieldName === columnKey && col.queryMultipleKeys && col.queryMultipleKeys.length > 1);

          switch (operator) {
            case "contains":
              if (Array.isArray(value)) {
                let filterDateArr = {
                  [conditionKey]: {
                    ge: value[0].date,
                    le: value[value.length - 1].date
                  }
                };

                if (isFilterOr !== -1) {
                  let arr = this.state.columns[isFilterOr] && this.state.columns[isFilterOr].queryMultipleKeys ? this.state.columns[isFilterOr].queryMultipleKeys : [];
                  let crtFilterContains = {};
                  let orArr = arr.filter(k => k !== conditionKey);

                  if (orArr.length > 0) {
                    orArr.forEach(i => {
                      crtFilterContains[i] = {
                        ge: value[0].date,
                        le: value[value.length - 1].date
                      };
                    });
                    filterWith.push({
                      or: crtFilterContains
                    });
                    break;
                  }
                }

                filterWith.push(filterDateArr);
                break;
              } else {
                let val = "tolower('".concat(value, "')");
                let filterContains = {
                  ["tolower(".concat(conditionKey, ")")]: {
                    contains: val
                  }
                };

                if (isFilterOr !== -1) {
                  let arr = this.state.columns[isFilterOr] && this.state.columns[isFilterOr].queryMultipleKeys ? this.state.columns[isFilterOr].queryMultipleKeys : [];
                  let crtFilterContains = {};

                  if (arr.length > 0) {
                    arr.forEach(i => {
                      crtFilterContains["tolower(".concat(i, ")")] = {
                        contains: val
                      };
                    });
                    filterWith.push({
                      or: crtFilterContains
                    });
                    break;
                  }
                }

                filterWith.push(filterContains);
                break;
              }

            case "not":
              if (Array.isArray(value)) {
                let filterDateArr = {
                  [conditionKey]: {
                    lt: value[0].date,
                    gt: value[value.length - 1].date
                  }
                };

                if (isFilterOr !== -1) {
                  let arr = this.state.columns[isFilterOr] && this.state.columns[isFilterOr].queryMultipleKeys ? this.state.columns[isFilterOr].queryMultipleKeys : [];

                  if (arr.length > 0) {
                    let rs = arr.map(i => {
                      return {
                        not: {
                          [i]: {
                            lt: value[0].date,
                            gt: value[value.length - 1].date
                          }
                        }
                      };
                    });
                    filterWith.push({
                      and: rs
                    });
                    break;
                  }
                }

                filterWith.push(filterDateArr);
                break;
              } else {
                let val = "tolower('".concat(value, "')");
                let filterNot = {
                  not: {
                    ["tolower(".concat(conditionKey, ")")]: {
                      contains: val
                    }
                  }
                };

                if (isFilterOr !== -1) {
                  let arr = this.state.columns[isFilterOr] && this.state.columns[isFilterOr].queryMultipleKeys ? this.state.columns[isFilterOr].queryMultipleKeys : [];

                  if (arr.length > 0) {
                    let rs = arr.map(i => {
                      return {
                        not: {
                          ["tolower(".concat(i, ")")]: {
                            contains: val
                          }
                        }
                      };
                    });
                    filterWith.push({
                      and: rs
                    });
                    break;
                  }
                }

                filterWith.push(filterNot);
                break;
              }

            default:
              let val = "tolower('".concat(value, "')");
              let filterDefault = {
                ["tolower(".concat(conditionKey, ")")]: {
                  [operator]: val
                }
              };

              if (typeof value === "boolean") {
                val = value;
                filterDefault = {
                  [conditionKey]: {
                    [operator]: val
                  }
                };
              }

              if (isFilterOr !== -1) {
                let arr = this.state.columns[isFilterOr] && this.state.columns[isFilterOr].queryMultipleKeys ? this.state.columns[isFilterOr].queryMultipleKeys : [];
                let crtFilterContains = {};

                if (arr.length > 1 && operator !== "ne") {
                  arr.forEach(i => {
                    crtFilterContains["tolower(".concat(i, ")")] = {
                      [operator]: val
                    };
                  });
                  filterWith.push({
                    or: crtFilterContains
                  });
                  break;
                } else {
                  let rs = arr.map(i => {
                    return {
                      ["tolower(".concat(i, ")")]: {
                        [operator]: val
                      }
                    };
                  });
                  filterWith.push({
                    and: rs
                  });
                  break;
                }
              }

              filterWith.push(filterDefault);
              break;
          }
        });
      }

      let AndObj = {
        and: []
      };
      AndObj.and = filterWith;

      if (filterWith.length > 0 || orderByAr.length > 0) {
        return (0, _odataQuery.default)({
          filter: AndObj,
          orderBy: orderByAr
        });
      }

      return "";
    };

    this._mapSelectionSort = str => {
      if (str === "aToZ") {
        return _Interface.OrderValue.asc;
      }

      return _Interface.OrderValue.desc;
    };

    this._onHandleSortInOffline = async (key, queries, newCols) => {
      if (this.state.workingColumn) {
        let newItems = await _copyAndSort(this.state.items, this.state.workingColumn.fieldName, this.state.workingColumn.isSortedDescending);
        let sortGr = [...this.state.groups];

        if (this.props.groups) {
          let newGr = this._onHandleSortGroups();

          sortGr = newGr.groups;
        }

        this.setState({
          items: newItems,
          columns: newCols ? newCols : this.state.columns,
          contextualMenu: undefined,
          groups: sortGr,
          filterQuery: queries ? queries : this.state.filterQuery
        });
      }
    };

    this._onHandleGetValueByChildQuery = (item, firstKey, lastKey, colKey, childObj) => {
      let obj = item[firstKey];

      if (this.state.workingColumn && !this.state.workingColumn.queryKey) {
        return item[colKey];
      } // case in first act


      if (!childObj && typeof item === "object") {
        for (const key in obj) {
          if (key === lastKey && typeof obj[key] !== "object") {
            return obj[key];
          }

          if (key === lastKey && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            this._onHandleGetValueByChildQuery(item, firstKey, lastKey, obj[key]);
          }

          if (key === lastKey && typeof obj[key] === "object" && Array.isArray(obj[key])) {
            obj[key].forEach(i => {
              if (typeof i === "object") {
                this._onHandleGetValueByChildQuery(item, firstKey, lastKey, i);
              }
            });
          }
        }
      } // case child is object


      if (childObj && typeof childObj === "object" && !Array.isArray(childObj)) {
        for (const key in childObj) {
          if (key === lastKey && typeof childObj[key] !== "object") {
            return childObj[key];
          }

          if (key === lastKey && typeof childObj[key] === "object" && !Array.isArray(childObj[key])) {
            this._onHandleGetValueByChildQuery(item, firstKey, lastKey, childObj[key]);
          }

          if (key === lastKey && typeof childObj[key] === "object" && Array.isArray(childObj[key])) {
            childObj[key].forEach(i => {
              if (typeof i === "object") {
                this._onHandleGetValueByChildQuery(item, firstKey, lastKey, i);
              }
            });
          }
        }
      } // case child is array


      if (childObj && typeof childObj === "object" && Array.isArray(childObj)) {
        childObj.forEach(i => {
          if (typeof i === "object") {
            this._onHandleGetValueByChildQuery(item, firstKey, lastKey, i);
          }
        });
      }
    };

    this._onHandleFilterInOffline = (operator, colKey, value) => {
      let crtItems = [...this.state.items];
      let queryKey = this.state.workingColumn && this.state.workingColumn.queryKey ? this.state.workingColumn.queryKey : "";
      let queryArr = queryKey.split("/");

      switch (operator) {
        case "gt":
          if (typeof value === "string") {
            let resultGreater = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              if (typeof value === "string" && keyFilter > parseInt(value)) {
                return true;
              }

              return false;
            });
            return resultGreater;
          }

          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDateGreater = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              let date = new Date(keyFilter);

              if (value && date.valueOf() > value.valueOf()) {
                return true;
              }

              return false;
            });
            return resultDateGreater;
          }

          return [];

        case "lt":
          if (typeof value === "string") {
            let resultLessThan = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              if (typeof value === "string" && keyFilter < parseInt(value)) {
                return true;
              }

              return false;
            });
            return resultLessThan;
          }

          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDateLessThan = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              let date = new Date(keyFilter);

              if (value && date.valueOf() < value.valueOf()) {
                return true;
              }

              return false;
            });
            return resultDateLessThan;
          }

          return [];

        case "ge":
          if (typeof value === "string") {
            let resultGreaterOrEqual = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              if (typeof value === "string" && keyFilter >= parseInt(value)) {
                return true;
              }

              return false;
            });
            return resultGreaterOrEqual;
          }

          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDateGreaterOrEqual = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              let date = new Date(keyFilter);

              if (value && date.valueOf() >= value.valueOf()) {
                return true;
              }

              return false;
            });
            return resultDateGreaterOrEqual;
          }

          return [];

        case "le":
          if (typeof value === "string") {
            let resultLessThanOrEqual = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              if (typeof value === "string" && keyFilter <= parseInt(value)) {
                return true;
              }

              return false;
            });
            return resultLessThanOrEqual;
          }

          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDateLessThanOrEqual = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              let date = new Date(keyFilter);

              if (value && date.valueOf() <= value.valueOf()) {
                return true;
              }

              return false;
            });
            return resultDateLessThanOrEqual;
          }

          return [];

        case "eq":
          if (typeof value === "string") {
            let resultEqual = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              if (keyFilter.toLocaleLowerCase() === value.toLocaleLowerCase()) {
                return true;
              }

              return false;
            });
            return resultEqual;
          }

          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDate = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              let selectedDate = new Date(keyFilter);

              if (selectedDate.setHours(0, 0, 0, 0).valueOf() === (value === null || value === void 0 ? void 0 : value.valueOf())) {
                return true;
              }

              return false;
            });
            return resultDate;
          }

          return [];

        case "ne":
          let resultNotEqual = crtItems.filter(item => {
            let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

            if (keyFilter.toLocaleLowerCase() !== value.toLocaleLowerCase()) {
              return true;
            }

            return false;
          });
          return resultNotEqual;

        case "contains":
          if (typeof value === "string") {
            let resultContain = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              if (keyFilter.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1) {
                return true;
              }

              return false;
            });
            return resultContain;
          }

          if (Array.isArray(value)) {
            let resultDateContain = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              let selectedDate = new Date(keyFilter);

              if (Array.isArray(value)) {
                let index = value === null || value === void 0 ? void 0 : value.findIndex(val => val.date.valueOf() === selectedDate.setHours(0, 0, 0, 0).valueOf());

                if (index !== -1) {
                  return true;
                }
              }

              return false;
            });
            return resultDateContain;
          }

          return [];

        case "not":
          if (typeof value === "string") {
            let resultNotContain = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              if (keyFilter.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === -1) {
                return true;
              }

              return false;
            });
            return resultNotContain;
          }

          if (Array.isArray(value)) {
            let resultDateNotWithIn = crtItems.filter(item => {
              let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

              let selectedDate = new Date(keyFilter);

              if (value && Array.isArray(value) && selectedDate.valueOf() < value[0].date.valueOf() || value && Array.isArray(value) && selectedDate.valueOf() > value[value.length - 1].date.setHours(23, 59, 59, 0).valueOf()) {
                return true;
              }

              return false;
            });
            return resultDateNotWithIn;
          }

          return [];

        case "boolean":
          let resultBoolean = crtItems.filter(item => {
            let keyFilter = this._onHandleGetValueByChildQuery(item, queryArr[0], queryArr[queryArr.length - 1], colKey);

            if (keyFilter === value) {
              return true;
            }

            return false;
          });
          return resultBoolean;

        default:
          return [];
      }
    };

    this._onHandleSortGroups = () => {
      let result = [];
      let newGroups = [];
      let crtGroups = [...this.state.groups];
      let crtItems = [...this.state.items];

      if (this.props.groups && crtGroups.length > 0) {
        crtGroups.forEach(gr => {
          let childArr = crtItems.splice(gr.startIndex);

          if (gr.key !== "lastGroup") {
            childArr = crtItems.splice(gr.startIndex, gr.count);
          }

          let groupItems = [];

          if (this.state.workingColumn) {
            groupItems = _copyAndSort(childArr, this.state.workingColumn.fieldName, this.state.workingColumn.isSortedDescending);
          }

          result = [...result, ...groupItems];
        });

        if (this.state.workingColumn && this.state.workingColumn.fieldName === "name") {
          newGroups = _copyAndSort(crtGroups, "name", this.state.workingColumn.isSortedDescending);
        }

        return {
          items: result,
          groups: newGroups
        };
      }

      return {
        items: [],
        groups: []
      };
    };

    this._onHandleSelectSortInContextual = async key => {
      let newCols = [...this.state.columns];
      let crtQuery = [...this.state.filterQuery]; // filter

      if (key === "filterBy") {
        this.setState({
          isPanelVisible: true
        });
      } // sort


      if (key !== "filterBy") {
        const sortList = {
          aToZ: [true],
          zToA: [false]
        };
        newCols = this.state.columns.map(col => {
          col.isSorted = false;

          if (this.state.workingColumn && col.key === this.state.workingColumn.key) {
            col.isSorted = true;
            col.isSortedDescending = !sortList[key][0];
          }

          return col;
        });

        let crtWorkingCol = _objectSpread({}, this.state.workingColumn);

        crtWorkingCol.isSortedDescending = !sortList[key][0];
        await this.setState({
          workingColumn: crtWorkingCol
        });
        let index = crtQuery.findIndex(q => q.type === _Interface.FilterType.Sort);

        if (index === -1) {
          let defaultObj = await this._BuildDefaultSortObj();
          let defaultFilter = {
            columnKey: defaultObj.key,
            key: defaultObj.fieldName,
            value: "",
            operator: "",
            order: _Interface.OrderValue.asc,
            type: _Interface.FilterType.Sort,
            childQuery: this.state.workingColumn ? this.state.workingColumn.queryKey : undefined
          };
          crtQuery.unshift(defaultFilter);
        }

        if (index !== -1 && this.state.workingColumn) {
          let filterItem = {
            columnKey: this.state.workingColumn.key,
            key: this.state.workingColumn.fieldName ? this.state.workingColumn.fieldName : "",
            value: "",
            operator: "",
            order: this._mapSelectionSort(key),
            type: _Interface.FilterType.Sort,
            childQuery: this.state.workingColumn ? this.state.workingColumn.queryKey : undefined
          };
          crtQuery[index] = filterItem;
        } // sort in offline mode


        if (key !== "filterBy" && this.props.items && this.props.isOffline || typeof this.props.isOffline === "boolean" && this.props.isOffline) {
          this._onHandleSaveToLocalStorage();

          return this._onHandleSortInOffline(key, crtQuery, newCols);
        } // sort in online mode


        if (key !== "filterBy" && !this.props.items && !this.props.isOffline) {
          await this.setState({
            filterQuery: crtQuery,
            columns: newCols
          });

          this._onHandleSaveToLocalStorage();

          return this.onHandleQueryDataByClassType();
        }
      }
    };

    this._onHandleChangeQueryState = (operator, colKey, value) => {
      let crtQuery = [...this.state.filterQuery];
      let item = {
        columnKey: colKey,
        key: this.state.workingColumn ? this.state.workingColumn.key : "",
        operator,
        value,
        order: "",
        type: _Interface.FilterType.Filter,
        childQuery: this.state.workingColumn ? this.state.workingColumn.queryKey : undefined
      };
      let index = crtQuery.findIndex(q => q.key === item.key);

      if (index === -1) {
        crtQuery.push(item);
      }

      if (index !== -1) {
        crtQuery[index] = item;
      }

      return crtQuery;
    };

    this._onHandleSentSelecteGroups = () => {
      if (this.props.onGetSelecteGroupList) {
        this.props.onGetSelecteGroupList(this.state.selectedGroups);
      }
    };

    this.onGetFilterObj = (operator, colKey, value) => {
      let crtColumns = [...this.state.columns];

      let queryArr = this._onHandleChangeQueryState(operator, colKey, value);

      let rs = crtColumns.map(col => {
        if (this.state.workingColumn && col.key === this.state.workingColumn.key) {
          col.isFilter = true;
          return col;
        }

        return col;
      }); // filter in offline mode

      if (this.props.items || typeof this.props.isOffline === "boolean" && this.props.isOffline) {
        let result = this._onHandleFilterInOffline(operator, colKey, value);

        return this.setState({
          items: result,
          isPanelVisible: false,
          columns: rs,
          filterQuery: queryArr
        }, () => {
          this._onHandleSaveToLocalStorage();
        });
      } // filter in online mode


      if (!this.props.items && !this.props.isOffline) {
        this.setState({
          columns: rs,
          isPanelVisible: false,
          filterQuery: queryArr
        }, () => {
          this._onHandleSaveToLocalStorage();

          this.onHandleQueryDataByClassType();
        });
        return;
      }
    };

    this.onHandleUpdateDataCaseLazy = (source, page) => {
      let groups = [...this.state.groups];
      let sourceItems = [...this.state.items, ...source];
      let keys = [];

      if (this.props.groupBy) {
        keys = this._onHandleBuildItemsWithGroupBy(sourceItems);
        sourceItems = this._BuildItemsByGoupByKeys(keys, sourceItems);
        groups = this._BuildMyGroupFromKeys(keys, sourceItems);
      }

      return this.setState({
        items: sourceItems,
        page: page ? page : this.state.page + 1,
        isLastPage: source.length < this.state.skipNumber ? true : false,
        isCallingWithLazy: false,
        groups
      }, () => this.onHandleSetSelectedItems());
    };

    this.onHandleUpdateDataCaseFirst = source => {
      let groups = [...this.state.groups];
      let sourceItems = [...source];
      let keys = [];

      if (this.props.groupBy) {
        keys = this._onHandleBuildItemsWithGroupBy(sourceItems);
        sourceItems = this._BuildItemsByGoupByKeys(keys, sourceItems);
        groups = this._BuildMyGroupFromKeys(keys, sourceItems);
      }

      return this.setState({
        items: sourceItems,
        page: 1,
        isLastPage: source.length < this.state.skipNumber ? true : false,
        groups
      }, () => this.onHandleSetSelectedItems());
    };

    this.onHandleQueryClassSource = (source, page, isLazy) => {
      // case load
      if (!isLazy) {
        this.onHandleUpdateDataCaseFirst(source);
      } // case lazy loading


      if (isLazy) {
        this.onHandleUpdateDataCaseLazy(source, page);
      }
    };

    this.onHandleQueryDataByClassType = async isLazy => {
      let crtFilter = [...this.state.filterQuery];
      let endpoint = await this._BuildEndpointWithSortAndFilter();
      let crtPage = this.state.page;

      if (isLazy) {
        crtPage++;
      } else {
        crtPage = 1;
      }

      let srtEndpoint = "".concat(endpoint);

      if (crtFilter.length > 1) {
        crtFilter.forEach(f => {
          let subStrUTF = "'tolower(''".concat(escape(f.value).replaceAll("%24", "$"), "'')'");
          let subStr = "'tolower(''".concat(f.value, "'')'");

          if (srtEndpoint.indexOf(subStr) !== -1 && srtEndpoint.indexOf("tolower") !== -1) {
            srtEndpoint = srtEndpoint.replaceAll(subStr, "tolower('".concat(escape(f.value), "')"));
          } else if (srtEndpoint.indexOf(subStrUTF) !== -1 && srtEndpoint.indexOf("tolower") !== -1) {
            srtEndpoint = srtEndpoint.replaceAll(subStrUTF, "tolower('".concat(escape(f.value), "')"));
          } // special case


          let specialCase = "'tolower('''''')'";

          if (srtEndpoint.indexOf(specialCase) !== -1 && srtEndpoint.indexOf("tolower") !== -1) {
            srtEndpoint = srtEndpoint.replaceAll(specialCase, "tolower('''')");
          }
        });
      }

      this.props.queryClass.GetData(crtPage, this.state.skipNumber, this.props.queryClass.nextLink, // this.state.defaultURL,
      srtEndpoint).then(res => {
        if (res && !this.props.queryClass.receiveBySinalR) {
          this.onHandleQueryClassSource(this.props.queryClass.source, crtPage, isLazy);
        }
      }).catch(err => {
        this.setState({
          nextLink: "",
          isLastPage: true
        });
      });
    };

    this.onCancelFilter = async key => {
      let defaultObj = await this._BuildDefaultSortObj();
      let crtQuery = [...this.state.filterQuery].filter(f => f.key !== key);
      let defaultFilter = [{
        columnKey: defaultObj.key,
        key: defaultObj.fieldName,
        value: "",
        operator: "",
        order: _Interface.OrderValue.asc,
        type: _Interface.FilterType.Sort
      }];
      let newCols = this.state.columns.map(col => {
        if (col.key === key) {
          col.isFilter = false;
          col.isSorted = false;
        }

        return col;
      });

      if (this.props.items && this.props.isOffline //  ||
      // (typeof this.props.isOffline === "boolean" && this.props.isOffline)
      ) {
        return this.setState({
          columns: newCols,
          items: this.props.items || [],
          filterQuery: crtQuery.length > 0 ? crtQuery : defaultFilter,
          page: 1,
          nextLink: "",
          workingColumn: null,
          isLastPage: false
        }, () => {
          this._onHandleSaveToLocalStorage();

          this._onHandleCheckMode();
        });
      }

      return this.setState({
        items: [],
        columns: newCols,
        filterQuery: crtQuery.length > 0 ? crtQuery : defaultFilter,
        page: 1,
        nextLink: "",
        workingColumn: null,
        isLastPage: false
      }, () => {
        this._onHandleSaveToLocalStorage();

        this._onHandleCheckMode();
      });
    };

    this.onChoiceItemSort = (ev, item) => {
      if (item) {
        this._onResetPageIndex();

        let currentKey = item === null || item === void 0 ? void 0 : item.key;
        setTimeout(() => {
          this._onHandleSelectSortInContextual(currentKey);
        }, 0);
      }
    };

    this.onSetVisiblePanel = () => {
      this.setState({
        isPanelVisible: !this.state.isPanelVisible
      });
    };

    this.onHandleScrollList = event => {
      let name = this.props.rcName ? "scr.".concat(this.props.rcName) : "scr";
      let list = document.querySelectorAll("[data-rc-id*=\"".concat(name, "\"]"))[0];

      if (!this.props.isDisableLazyLoading && list && (Math.floor(list.scrollTop) === list.scrollHeight - list.offsetHeight || Math.floor(list.scrollTop) - 1 === list.scrollHeight - list.offsetHeight) && Math.floor(list.scrollTop) !== 0 // (Math.ceil(list.scrollTop) === list.scrollHeight - list.offsetHeight ||
      //   Math.floor(list.scrollTop) === list.scrollHeight - list.offsetHeight)
      ) {
        if (!this.state.isLastPage && !this.props.items && !this.props.isOffline && !this.state.isCallingWithLazy || !this.state.isLastPage && !this.props.items && this.props.isOffline && !this.state.isCallingWithLazy) {
          this.setState({
            isCallingWithLazy: true
          });
          this.onHandleQueryDataByClassType(true);
        }
      }
    };

    this.onHandleSelectedGroups = async groups => {
      let crtGroups = [...this.state.selectedGroups];

      if (Array.isArray(groups)) {
        if (groups.length > crtGroups.length) {
          crtGroups = groups;
        } else if (groups.length === crtGroups.length) {
          let difference = groups.filter(gr => !crtGroups.includes(gr));

          if (difference.length > 0) {
            crtGroups = groups;
          }

          if (difference.length === 0) {
            crtGroups = [];
          }
        }
      } else {
        let idx = crtGroups.findIndex(gr => gr.key === groups.key);

        if (idx === -1) {
          crtGroups.push(groups);
        }

        if (idx !== -1) {
          crtGroups.splice(idx, 1);
        }
      }

      await this.setState({
        selectedGroups: crtGroups
      }, () => this._onHandleSentSelecteGroups());
    };

    this.onHandleClickGroupTitle = group => {
      if (this.props.onGroupTitleClick) {
        this.props.onGroupTitleClick(group);
      }
    };

    this._onRenderHeader = props => {
      return /*#__PURE__*/React.createElement(_GroupedList.GroupHeader, props);
    };

    this._onRenderDetailsHeader = props => {
      const customStyles = {};
      let colNotAcitons = this.state.columns.filter(col => col.isNotFilter);

      if (colNotAcitons.length > 0 || this.props.isNotAction) {
        let array = this.props.isNotAction ? [...this.state.columns] : [...colNotAcitons];
        array.forEach(col => {
          let btn = document.querySelectorAll("[data-rc-id='col.".concat(col.key, ".").concat(this.props.rcName, "']"))[0];

          if (btn) {
            btn.style.cursor = "default";
            btn.style.background = "transparent";
          }
        });
      }

      if (props) {
        customStyles.root = {
          height: "30px",
          color: this.props.darkMode === "dark" ? "#ffffff" : "#333333",
          background: this.props.darkMode === "dark" ? "#121212" : "#ffffff",
          borderBottom: this.props.darkMode === "dark" ? "1px solid #000000" : "1px solid #EAEAEA",
          paddingBottom: 0
        };
        return /*#__PURE__*/React.createElement(_Sticky.Sticky, {
          stickyPosition: _Sticky.StickyPositionType.Header,
          isScrollSynced: true
        }, /*#__PURE__*/React.createElement(_DetailsList.DetailsHeader, _extends({}, props, {
          styles: customStyles,
          ariaLabelForToggleAllGroupsButton: "Toggle selection"
        })));
      }

      return null;
    };

    this.onCheckFilter = (ev, itemKey) => {
      let crtFilterCols = [...this.state.filterCols];

      if (itemKey) {
        let index = crtFilterCols.findIndex(doc => doc === itemKey);

        if (index !== -1) {
          crtFilterCols.splice(index, 1);
          this.setState({
            filterCols: crtFilterCols
          });
        }

        if (index === -1) {
          crtFilterCols.push(itemKey);
          this.setState({
            filterCols: crtFilterCols
          });
        }
      }
    };

    this._onFilterColumn = async () => {
      let crtColumn = [...this.state.sourceColumns];
      let crtFilterCols = [...this.state.filterCols];

      if (crtFilterCols.length > 0) {
        let result = crtColumn.filter(col => crtFilterCols.includes(col.key) || col.key === "settingCol");
        this.setState({
          columns: result,
          contextualMenu: undefined
        }, () => this._onHandleSaveToLocalStorage());
      }

      if (crtFilterCols.length < 1) {
        this.setState({
          columns: this.state.sourceColumns,
          contextualMenu: undefined
        }, () => this._onHandleSaveToLocalStorage());
      }
    };

    this._onContextualMenuDismissed = () => {
      this.setState({
        contextualMenu: undefined
      });
    };

    this._onHandleUniqueArray = arr => {
      let crtArr = [...arr];
      let key = this.props.uniqueItemKey ? this.props.uniqueItemKey : "id";
      let result = crtArr.filter((item, index, self) => index === self.findIndex(t => t[key] === item[key]));
      return result;
    };

    this._onRenderRow = props => {
      const customStyles = {};

      if (props) {
        if (this.props.groups) {
          let crtGroup = [...this.state.groups]; // let lastItemIndexOfGroup = 0;

          if (crtGroup.length > 0) {// let lastGroup =
            //   crtGroup.length >= 2
            //     ? crtGroup[crtGroup.length - 2]
            //     : crtGroup[crtGroup.length - 1];
            // lastItemIndexOfGroup = lastGroup.startIndex + lastGroup.count;
          }
        }

        if (props.item.isDisable) {
          customStyles.root = {
            color: props.darkMode === "dark" ? "#D5D5D5" : "#333333",
            borderBottom: "1px solid transparent"
          };
        } else {
          customStyles.root = {
            color: props.darkMode === "dark" ? "#ffffff" : "#333333",
            borderBottom: "1px solid transparent"
          };
        }

        return /*#__PURE__*/React.createElement(_DetailsList.DetailsRow, _extends({}, props, {
          rowFieldsAs: this.renderRowFields,
          styles: customStyles
        }));
      }

      return null;
    };

    this.renderRowFields = props => {
      const onRowFieldsClick = item => {
        this.props.onRowClick && this.props.onRowClick(item);
      };

      return /*#__PURE__*/React.createElement("span", {
        id: props.item.key,
        "data-selection-disabled": true,
        onClick: () => onRowFieldsClick(props.item)
      }, /*#__PURE__*/React.createElement(_DetailsList.DetailsRowFields, props));
    };

    this._selection = new _selection.Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails()
        });
      }
    });
    this.state = {
      selectionDetails: undefined,
      isPanelVisible: false,
      isLastPage: false,
      isFirstLoad: true,
      isCallingWithLazy: false,
      contextualMenu: undefined,
      sourceColumns: [],
      columns: [],
      items: [],
      filterQuery: [],
      filterCols: [],
      workingColumn: null,
      page: 1,
      skipNumber: this.props.skipNumber || 0,
      nextLink: "",
      groups: [],
      sourceGroups: [],
      selectedGroups: []
    };
  }

  componentDidMount() {
    this._onHandleFirstLoad();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.skipNumber !== prevProps.skipNumber && this.props.skipNumber !== this.state.skipNumber) {
      this.setState({
        skipNumber: this.props.skipNumber
      });
    }

    if (this.props.viewPort !== prevProps.viewPort && this.props.viewPort > 0) {
      let crtColumns = [...this.state.columns];
      let isHaveMaxWidth = crtColumns.some(c => c.maxWidth && c.maxWidth > 0 && c.key !== "settingCol");

      if (!isHaveMaxWidth) {
        let widthCheckAndSetting = 48;
        let width = (this.props.viewPort - widthCheckAndSetting) / crtColumns.length;
        let newCols = crtColumns.map(c => {
          if (c.key !== "settingCol") {
            c.maxWidth = width;
          }

          return c;
        });
        this.setState({
          columns: newCols
        });
      }
    } // uncheck all items


    if (this.props.selectedItems && this.props.selectedItems.length < 1 && prevProps.selectedItems && prevProps.selectedItems.length > 0) {
      this._selection.setAllSelected(false);
    }

    if (this.props.onHandleItems && this.state.items) {
      this.props.onHandleItems(this.state.items, this.state.items.length);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.forceUpdate();
    }
  } // get keys of groupby in items


  render() {
    const nameAttibute = "data-rc-id";
    let listRcId = {
      [nameAttibute]: "dl.".concat(this.props.rcName)
    };
    return /*#__PURE__*/React.createElement(_MainStyle.MainWrapper, _extends({
      onScroll: this.onHandleScrollList,
      theme: _objectSpread(_objectSpread({}, this.state), {}, {
        darkMode: this.props.darkMode
      }),
      className: "MainWrapper"
    }, listRcId), /*#__PURE__*/React.createElement(_ScrollablePane.ScrollablePane, {
      rcName: this.props.rcName,
      scrollbarVisibility: _ScrollablePane.ScrollbarVisibility.auto
    }, /*#__PURE__*/React.createElement(_MarqueeSelection.MarqueeSelection, {
      selection: this._selection
    }, /*#__PURE__*/React.createElement(_ShimmeredDetailsList.ShimmeredDetailsList, {
      customLoading: this.props.customLoading,
      items: this.state.items,
      compact: false,
      columns: this.state.columns,
      groups: this.state.groups.length > 0 ? this.state.groups : undefined // isLoading changed but this component doesn't re-render
      ,
      enableShimmer: this.props.isLoading,
      selectionMode: this.props.selectionMode !== undefined ? this.props.selectionMode : _selection.SelectionMode.multiple,
      setKey: "multiple",
      layoutMode: _DetailsList.DetailsListLayoutMode.justified,
      isHeaderVisible: true,
      selection: this._selection,
      selectionPreservedOnEmptyClick: true,
      useFastIcons: false,
      groupProps: {
        onRenderHeader: this._onRenderHeader // headerProps: {
        //   onToggleCollapse: this.onHandleToggleGroup,
        // },

      },
      onRenderRow: this._onRenderRow,
      onRenderDetailsHeader: this._onRenderDetailsHeader,
      onCancelFilter: key => this.onCancelFilter(key),
      shimmerLines: this.props.skipNumber,
      viewPort: this.props.viewPort,
      rcName: this.props.rcName,
      onGetSelectedGroups: this.onHandleSelectedGroups,
      isCollapseOnlyByIcon: this.props.isCollapseOnlyByIcon,
      onHandleClickGroupTitle: this.onHandleClickGroupTitle,
      styles: {
        root: [{
          selectors: {
            ":after": {
              backgroundImage: this.props.darkMode === "dark" ? "linear-gradient(transparent 40%, rgb(72, 72, 72) 100%)" : "linear-gradient(transparent 40%, rgb(241, 241, 241) 100%)"
            }
          }
        }]
      },
      darkMode: this.props.darkMode,
      isEmptyItems: !this.props.isLoading && this.state.items.length < 1 ? this.props.isEmptyItems ? this.props.isEmptyItems : {
        title: "No data available.",
        detail: ""
      } : undefined
    }))), this.state.contextualMenu && !this.props.isNotAction && /*#__PURE__*/React.createElement(_ContextualMenu.ContextualMenu, _extends({
      onItemClick: this.onChoiceItemSort
    }, this.state.contextualMenu, {
      rcName: this.props.rcName // theme={this.props.darkMode === "dark" ? darkTheme : lightTheme}
      ,
      styles: {
        root: {
          background: this.props.darkMode === "dark" ? "#333333" : "#ffffff",
          border: "transparent"
        },
        subComponentStyles: {
          menuItem: () => {
            return {
              root: [{
                color: this.props.darkMode === "dark" ? "#ffffff" : "#212121"
              }, {
                selectors: {
                  ":hover": {
                    background: this.props.darkMode === "dark" ? "#445B6C" : "#F4F4F4",
                    color: this.props.darkMode === "dark" ? "#ffffff" : "#212121"
                  },
                  ":active": {
                    background: this.props.darkMode === "dark" ? "#445B6C" : "#F4F4F4",
                    color: this.props.darkMode === "dark" ? "#ffffff" : "#212121"
                  }
                }
              }]
            };
          }
        }
      },
      calloutProps: {
        styles: {
          root: {
            zIndex: 1
          }
        }
      }
    })), /*#__PURE__*/React.createElement(_Panel.Panel, {
      isOpen: this.state.isPanelVisible,
      onDismiss: this.onSetVisiblePanel,
      headerText: "Filter by",
      closeButtonAriaLabel: "Close",
      isLightDismiss: true,
      customWidth: "560px",
      isBlocking: this.props.isBlocking,
      type: _Panel.PanelType.custom,
      rcName: this.props.rcName,
      styles: {
        headerText: {
          fontSize: "21px",
          color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
          fontWeight: "300"
        },
        subComponentStyles: {
          closeButton: {
            icon: {
              fontSize: "15px",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
              fontWeight: "normal"
            },
            rootHovered: {
              background: this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#000000"
            },
            rootPressed: {
              backgroundColor: this.props.darkMode === "dark" ? "#333333" : "#c8c8c8"
            }
          }
        },
        content: {
          paddingLeft: "32px",
          height: "100%",
          paddingBottom: 0,
          paddingTop: 15,
          background: this.props.darkMode === "dark" ? "#333333" : "#ffffff"
        },
        header: {
          paddingLeft: "32px"
        },
        contentInner: {
          height: "100%"
        },
        scrollableContent: {
          height: "100%"
        },
        commands: {
          margin: 0,
          paddingTop: "10px",
          background: this.props.darkMode === "dark" ? "#333333" : "#ffffff"
        },
        root: {
          zIndex: 1
        }
      }
    }, this.state.workingColumn && /*#__PURE__*/React.createElement(_Panel2.default, {
      targetColumn: this.state.workingColumn,
      darkMode: this.props.darkMode,
      onGetFilterObj: this.onGetFilterObj,
      rcName: this.props.rcName,
      filterWithTicks: this.props.filterWithTicks,
      filterQuery: this.state.filterQuery,
      workingColumn: this.state.workingColumn
    })));
  }

  _getContextualMenuProps(ev, column) {
    let items = [{
      key: "aToZ",
      name: "A to Z",
      canCheck: true
    }, {
      key: "zToA",
      name: "Z to A",
      canCheck: true
    }, {
      key: "divider_1",
      itemType: _ContextualMenu.ContextualMenuItemType.Divider
    }, {
      key: "filterBy",
      name: "Filter By",
      canCheck: true,
      checked: column.isGrouped
    }];

    if (this.props.isFilterHidden) {
      items = items.filter(i => !["filterBy", "divider_1"].includes(i.key));
    }

    if (column.isNotFilter) {
      items = [];
    }

    return {
      items: items,
      target: ev.currentTarget,
      directionalHint: _ContextualMenu.DirectionalHint.bottomLeftEdge,
      gapSpace: -5,
      // isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed
    };
  }

  _getContextualMenuFilterProps(ev, column) {
    let itemsFilter = [];
    let currentColumn = [...this.state.sourceColumns];
    currentColumn.forEach(col => {
      if (col.key !== "settingCol") {
        itemsFilter.push({
          key: col.key,
          name: col.name
        });
      }
    });

    if (itemsFilter.length > 0) {
      for (let i = 0; i < itemsFilter.length; i++) {
        itemsFilter[i] = _objectSpread(_objectSpread({}, itemsFilter[i]), {}, {
          onRender: (item, dismissMenu) => {
            return /*#__PURE__*/React.createElement(_MainStyle.MenuFilterWrapper, {
              theme: this.props.darkMode
            }, /*#__PURE__*/React.createElement(_CustomCheckBox.default, {
              checked: this.state.filterCols.includes(item.key),
              onChange: e => this.onCheckFilter(e, itemsFilter[i].key),
              title: item.name,
              label: item.name,
              rcName: "".concat(item.key, ".").concat(this.props.rcName),
              darkMode: this.props.darkMode
            }));
          }
        });
      }
    }

    return {
      items: itemsFilter,
      target: ev.currentTarget,
      directionalHint: _ContextualMenu.DirectionalHint.bottomLeftEdge,
      gapSpace: -5,
      onDismiss: this._onFilterColumn
    };
  }

  _getSelectionDetails() {
    const selectionItem = this._selection.getSelection();

    if (this.props.onGetSelectionItem) {
      this.props.onGetSelectionItem(selectionItem);
    }
  }

}

exports.MainList = MainList;

function _copyAndSort(items, columnKey, isSortedDescending) {
  if (columnKey) {
    const key = columnKey;
    let item = items.find(node => node[key]);
    let typeValue = item && typeof item[key];

    switch (typeValue) {
      case "number":
        return items.slice(0).sort((a, b) => (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : a[key] === b[key] ? 0 : -1);

      case "boolean":
        return items.slice(0).sort((a, b) => {
          return isSortedDescending ? a[key] === b[key] ? 0 : a[key] ? -1 : 1 : a[key] === b[key] ? 0 : a[key] ? 1 : -1;
        });

      case "object":
        let isDateObject = item && Object.prototype.toString.call(item[key]) === "[object Date]";

        if (isDateObject) {
          return items.splice(0).sort((a, b) => {
            return (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : a[key] === b[key] ? 0 : -1;
          });
        } else {
          return items;
        }

      default:
        return items.slice(0).sort((a, b) => {
          let stringA = String(a[key]).toLocaleLowerCase();
          let stringB = String(b[key]).toLocaleLowerCase();

          if (stringA === stringB) {
            return 0;
          } else if (!stringA || !stringB) {
            return 1;
          } else if (isSortedDescending) {
            return stringA < stringB ? -1 : 1;
          } else {
            return stringA < stringB ? 1 : -1;
          }
        });
    }
  }

  return items;
}