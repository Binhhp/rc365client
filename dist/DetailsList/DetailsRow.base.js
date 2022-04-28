"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsRowBase = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _utilities = require("../@uifabric/utilities");

var _DetailsList = require("./DetailsList.types");

var _DetailsRowCheck = require("./DetailsRowCheck");

var _GroupSpacer = require("../GroupedList/GroupSpacer");

var _DetailsRowFields = require("./DetailsRowFields");

var _FocusZone = require("../FocusZone");

var _selection = require("../@uifabric/utilities/selection");

var _GroupedList = require("../GroupedList");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getClassNames = (0, _utilities.classNamesFunction)();
var DEFAULT_DROPPING_CSS_CLASS = "is-dropping";
var NO_COLUMNS = [];

var DetailsRowBase =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsRowBase, _super);

  function DetailsRowBase(props) {
    var _this = _super.call(this, props) || this;

    _this._cellMeasurer = /*#__PURE__*/React.createRef();
    _this._focusZone = /*#__PURE__*/React.createRef();

    _this._onSelectionChanged = function () {
      var selectionState = _this._getSelectionState(_this.props);

      if (!(0, _utilities.shallowCompare)(selectionState, _this.state.selectionState)) {
        _this.setState({
          selectionState: selectionState
        });
      }
    };

    _this._onRootRef = function (focusZone) {
      if (focusZone) {
        // Need to resolve the actual DOM node, not the component.
        // The element itself will be used for drag/drop and focusing.
        _this._root = ReactDOM.findDOMNode(focusZone);
      } else {
        _this._root = undefined;
      }
    };
    /**
     * update isDropping state based on the input value, which is used to change style during drag and drop
     *
     * when change to true, that means drag enter. we will add default dropping class name
     * or the custom dropping class name (return result from onDragEnter) to the root elemet.
     *
     * when change to false, that means drag leave. we will remove the dropping class name from root element.
     *
     * @param newValue - New isDropping state value
     * @param event - The event trigger dropping state change which can be dragenter, dragleave etc
     */


    _this._updateDroppingState = function (newValue, event) {
      var isDropping = _this.state.isDropping;
      var _a = _this.props,
          dragDropEvents = _a.dragDropEvents,
          item = _a.item;

      if (!newValue) {
        if (dragDropEvents.onDragLeave) {
          dragDropEvents.onDragLeave(item, event);
        }
      } else if (dragDropEvents.onDragEnter) {
        _this._droppingClassNames = dragDropEvents.onDragEnter(item, event);
      }

      if (isDropping !== newValue) {
        _this.setState({
          isDropping: newValue
        });
      }
    };

    (0, _utilities.initializeComponentRef)(_this);
    _this._events = new _utilities.EventGroup(_this);
    _this.state = {
      selectionState: _this._getSelectionState(props),
      columnMeasureInfo: undefined,
      isDropping: false
    };
    _this._droppingClassNames = "";
    return _this;
  }

  DetailsRowBase.prototype.componentDidMount = function () {
    var dragDropHelper = this.props.dragDropHelper;

    if (dragDropHelper) {
      this._dragDropSubscription = dragDropHelper.subscribe(this._root, this._events, this._getRowDragDropOptions());
    }

    this._events.on(this.props.selection, _selection.SELECTION_CHANGE, this._onSelectionChanged);

    if (this.props.onDidMount && this.props.item) {
      // If the item appears later, we should wait for it before calling this method.
      this._onDidMountCalled = true;
      this.props.onDidMount(this);
    }
  };

  DetailsRowBase.prototype.componentDidUpdate = function (previousProps) {
    var state = this.state;
    var _a = this.props,
        item = _a.item,
        onDidMount = _a.onDidMount;
    var columnMeasureInfo = state.columnMeasureInfo;

    if (this.props.itemIndex !== previousProps.itemIndex || this.props.item !== previousProps.item || this.props.dragDropHelper !== previousProps.dragDropHelper) {
      if (this._dragDropSubscription) {
        this._dragDropSubscription.dispose();

        delete this._dragDropSubscription;
      }

      if (this.props.dragDropHelper) {
        this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root, this._events, this._getRowDragDropOptions());
      }
    }

    if (columnMeasureInfo && columnMeasureInfo.index >= 0 && this._cellMeasurer.current) {
      var newWidth = this._cellMeasurer.current.getBoundingClientRect().width;

      columnMeasureInfo.onMeasureDone(newWidth);
      this.setState({
        columnMeasureInfo: undefined
      });
    }

    if (item && onDidMount && !this._onDidMountCalled) {
      this._onDidMountCalled = true;
      onDidMount(this);
    }
  };

  DetailsRowBase.prototype.componentWillUnmount = function () {
    var _a = this.props,
        item = _a.item,
        onWillUnmount = _a.onWillUnmount; // Only call the onWillUnmount callback if we have an item.

    if (onWillUnmount && item) {
      onWillUnmount(this);
    }

    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();

      delete this._dragDropSubscription;
    }

    this._events.dispose();
  }; // tslint:disable-next-line function-name


  DetailsRowBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
    this.setState({
      selectionState: this._getSelectionState(newProps)
    });
  };

  DetailsRowBase.prototype.shouldComponentUpdate = function (nextProps, nextState) {
    if (this.props.useReducedRowRenderer) {
      var newSelectionState = this._getSelectionState(nextProps);

      if (this.state.selectionState.isSelected !== newSelectionState.isSelected) {
        return true;
      }

      return !(0, _utilities.shallowCompare)(this.props, nextProps);
    }

    if (!this.props.useReducedRowRenderer) {
      return true;
    }
  };

  DetailsRowBase.prototype.render = function () {
    var _a = this.props,
        className = _a.className,
        rcName = _a.rcName,
        _b = _a.columns,
        columns = _b === void 0 ? NO_COLUMNS : _b,
        dragDropEvents = _a.dragDropEvents,
        item = _a.item,
        itemIndex = _a.itemIndex,
        _c = _a.onRenderCheck,
        onRenderCheck = _c === void 0 ? this._onRenderCheck : _c,
        onRenderDetailsCheckbox = _a.onRenderDetailsCheckbox,
        onRenderItemColumn = _a.onRenderItemColumn,
        getCellValueKey = _a.getCellValueKey,
        selectionMode = _a.selectionMode,
        _d = _a.rowWidth,
        rowWidth = _d === void 0 ? 0 : _d,
        checkboxVisibility = _a.checkboxVisibility,
        getRowAriaLabel = _a.getRowAriaLabel,
        getRowAriaDescribedBy = _a.getRowAriaDescribedBy,
        checkButtonAriaLabel = _a.checkButtonAriaLabel,
        checkboxCellClassName = _a.checkboxCellClassName,

    /** Alias rowFieldsAs as RowFields and default to DetailsRowFields if rowFieldsAs does not exist */
    _e = _a.rowFieldsAs,

    /** Alias rowFieldsAs as RowFields and default to DetailsRowFields if rowFieldsAs does not exist */
    RowFields = _e === void 0 ? _DetailsRowFields.DetailsRowFields : _e,
        selection = _a.selection,
        indentWidth = _a.indentWidth,
        enableUpdateAnimations = _a.enableUpdateAnimations,
        compact = _a.compact,
        theme = _a.theme,
        styles = _a.styles,
        cellsByColumn = _a.cellsByColumn,
        groupNestingDepth = _a.groupNestingDepth,
        _f = _a.useFastIcons,
        useFastIcons = _f === void 0 ? true : _f,
        cellStyleProps = _a.cellStyleProps;
    var _g = this.state,
        columnMeasureInfo = _g.columnMeasureInfo,
        isDropping = _g.isDropping;
    var _h = this.state.selectionState,
        _j = _h.isSelected,
        isSelected = _j === void 0 ? false : _j,
        _k = _h.isSelectionModal,
        isSelectionModal = _k === void 0 ? false : _k;
    var isDraggable = dragDropEvents ? !!(dragDropEvents.canDrag && dragDropEvents.canDrag(item)) : undefined;
    var droppingClassName = isDropping ? this._droppingClassNames || DEFAULT_DROPPING_CSS_CLASS : "";
    var ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : undefined;
    var ariaDescribedBy = getRowAriaDescribedBy ? getRowAriaDescribedBy(item) : undefined;
    var canSelect = !!selection && selection.canSelectItem(item, itemIndex);
    var isContentUnselectable = selectionMode === _selection.SelectionMode.multiple;
    var showCheckbox = selectionMode !== _selection.SelectionMode.none && checkboxVisibility !== _DetailsList.CheckboxVisibility.hidden;
    var ariaSelected = selectionMode === _selection.SelectionMode.none ? undefined : isSelected;
    this._classNames = (0, _tslib.__assign)((0, _tslib.__assign)({}, this._classNames), getClassNames(styles, {
      theme: theme,
      isSelected: isSelected,
      canSelect: !isContentUnselectable,
      anySelected: isSelectionModal,
      checkboxCellClassName: checkboxCellClassName,
      droppingClassName: droppingClassName,
      className: className,
      compact: compact,
      enableUpdateAnimations: enableUpdateAnimations,
      cellStyleProps: cellStyleProps
    }));
    var rowClassNames = {
      isMultiline: this._classNames.isMultiline,
      isRowHeader: this._classNames.isRowHeader,
      cell: this._classNames.cell,
      cellAnimation: this._classNames.cellAnimation,
      cellPadded: this._classNames.cellPadded,
      cellUnpadded: this._classNames.cellUnpadded,
      fields: this._classNames.fields
    }; // Only re-assign rowClassNames when classNames have changed.
    // Otherwise, they will cause DetailsRowFields to unnecessarily
    // re-render, see https://github.com/microsoft/fluentui/pull/8799.
    // Refactor DetailsRowFields to generate own styles to remove need for this.

    if (!(0, _utilities.shallowCompare)(this._rowClassNames || {}, rowClassNames)) {
      this._rowClassNames = rowClassNames;
    }

    var rowFields = /*#__PURE__*/React.createElement(RowFields, {
      rowClassNames: this._rowClassNames,
      cellsByColumn: cellsByColumn,
      columns: columns,
      item: item,
      itemIndex: itemIndex,
      columnStartIndex: showCheckbox ? 1 : 0,
      onRenderItemColumn: onRenderItemColumn,
      getCellValueKey: getCellValueKey,
      enableUpdateAnimations: enableUpdateAnimations,
      cellStyleProps: cellStyleProps,
      rcName,
      ariaSelected
    });
    return /*#__PURE__*/React.createElement(_FocusZone.FocusZone, (0, _tslib.__assign)({
      "data-is-focusable": true
    }, (0, _utilities.getNativeProps)(this.props, _utilities.divProperties), typeof isDraggable === "boolean" ? {
      "data-is-draggable": isDraggable,
      draggable: isDraggable
    } : {}, {
      direction: _FocusZone.FocusZoneDirection.horizontal,
      ref: this._onRootRef,
      componentRef: this._focusZone,
      role: "row",
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      className: this._classNames.root,
      "data-selection-index": itemIndex,
      "data-selection-touch-invoke": true,
      "data-item-index": itemIndex,
      "aria-rowindex": itemIndex + 1,
      "data-automationid": "DetailsRow",
      style: {
        minWidth: rowWidth
      },
      "aria-selected": ariaSelected,
      allowFocusRoot: true
    }), showCheckbox && /*#__PURE__*/React.createElement("div", {
      role: "gridcell",
      "aria-colindex": 1,
      "data-selection-toggle": true,
      className: this._classNames.checkCell
    }, onRenderCheck({
      selected: isSelected,
      anySelected: isSelectionModal,
      "aria-label": checkButtonAriaLabel,
      rcName: "".concat(rcName, ".").concat(itemIndex),
      "data-rc-id": rcName ? "row.cbx.".concat(rcName, ".").concat(itemIndex) : undefined,
      canSelect: canSelect,
      compact: compact,
      className: this._classNames.check,
      theme: theme,
      isVisible: checkboxVisibility === _DetailsList.CheckboxVisibility.always,
      onRenderDetailsCheckbox: onRenderDetailsCheckbox,
      useFastIcons: useFastIcons
    })), /*#__PURE__*/React.createElement(_GroupSpacer.GroupSpacer, {
      indentWidth: indentWidth,
      count: groupNestingDepth - (this.props.collapseAllVisibility === _GroupedList.CollapseAllVisibility.hidden ? 1 : 0)
    }), item && rowFields, columnMeasureInfo && /*#__PURE__*/React.createElement("span", {
      role: "presentation",
      className: (0, _utilities.css)(this._classNames.cellMeasurer, this._classNames.cell),
      ref: this._cellMeasurer
    }, /*#__PURE__*/React.createElement(RowFields, {
      rowClassNames: this._rowClassNames,
      columns: [columnMeasureInfo.column],
      item: item,
      itemIndex: itemIndex,
      columnStartIndex: (showCheckbox ? 1 : 0) + columns.length,
      onRenderItemColumn: onRenderItemColumn,
      getCellValueKey: getCellValueKey,
      rcName,
      ariaSelected
    })), /*#__PURE__*/React.createElement("span", {
      role: "checkbox",
      className: this._classNames.checkCover,
      "aria-checked": isSelected,
      "data-selection-toggle": true
    }));
  };
  /**
   * measure cell at index. and call the call back with the measured cell width when finish measure
   *
   * @param index - The cell index
   * @param onMeasureDone - The call back function when finish measure
   */


  DetailsRowBase.prototype.measureCell = function (index, onMeasureDone) {
    var _a = this.props.columns,
        columns = _a === void 0 ? NO_COLUMNS : _a;
    var column = (0, _tslib.__assign)({}, columns[index]);
    column.minWidth = 0;
    column.maxWidth = 999999;
    delete column.calculatedWidth;
    this.setState({
      columnMeasureInfo: {
        index: index,
        column: column,
        onMeasureDone: onMeasureDone
      }
    });
  };

  DetailsRowBase.prototype.focus = function (forceIntoFirstElement) {
    if (forceIntoFirstElement === void 0) {
      forceIntoFirstElement = false;
    }

    return !!this._focusZone.current && this._focusZone.current.focus(forceIntoFirstElement);
  };

  DetailsRowBase.prototype._onRenderCheck = function (props) {
    return /*#__PURE__*/React.createElement(_DetailsRowCheck.DetailsRowCheck, (0, _tslib.__assign)({
      rcName: props.rcName
    }, props));
  };

  DetailsRowBase.prototype._getSelectionState = function (props) {
    var itemIndex = props.itemIndex,
        selection = props.selection;
    return {
      isSelected: !!selection && selection.isIndexSelected(itemIndex),
      isSelectionModal: !!selection && !!selection.isModal && selection.isModal()
    };
  };

  DetailsRowBase.prototype._getRowDragDropOptions = function () {
    var _a = this.props,
        item = _a.item,
        itemIndex = _a.itemIndex,
        dragDropEvents = _a.dragDropEvents,
        eventsToRegister = _a.eventsToRegister;
    var options = {
      eventMap: eventsToRegister,
      selectionIndex: itemIndex,
      context: {
        data: item,
        index: itemIndex
      },
      canDrag: dragDropEvents.canDrag,
      canDrop: dragDropEvents.canDrop,
      onDragStart: dragDropEvents.onDragStart,
      updateDropState: this._updateDroppingState,
      onDrop: dragDropEvents.onDrop,
      onDragEnd: dragDropEvents.onDragEnd,
      onDragOver: dragDropEvents.onDragOver
    };
    return options;
  };

  return DetailsRowBase;
}(React.Component);

exports.DetailsRowBase = DetailsRowBase;