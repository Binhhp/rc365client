import { __assign, __decorate, __extends, __spreadArrays } from "tslib";
import * as React from "react";
import {
  initializeComponentRef,
  FocusRects,
  Async,
  KeyCodes,
  elementContains,
  getRTLSafeKeyCode,
  classNamesFunction,
  memoizeFunction,
} from "../@uifabric/utilities";
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,
  DetailsListLayoutMode,
  ColumnDragEndLocation,
} from "../DetailsList/DetailsList.types";
import { DetailsHeader } from "../DetailsList/DetailsHeader";
import { SelectAllVisibility } from "../DetailsList/DetailsHeader.types";
import { DetailsRow } from "../DetailsList/DetailsRow";
import { FocusZone, FocusZoneDirection } from "../FocusZone";
import {
  Selection,
  SelectionMode,
  SelectionZone,
} from "../@uifabric/utilities/selection";
import { DragDropHelper } from "../@uifabric/utilities";
import { GroupedList } from "../GroupedList";
import { List } from "../List";
import { withViewport } from "../@uifabric/utilities/decorators";
import { GetGroupCount } from "../@uifabric/utilities";
import { DEFAULT_CELL_STYLE_PROPS } from "./DetailsRow.styles";
import { CHECK_CELL_WIDTH as CHECKBOX_WIDTH } from "./DetailsRowCheck.styles";
// For every group level there is a GroupSpacer added. Importing this const to have the source value in one place.
import { SPACER_WIDTH as GROUP_EXPAND_WIDTH } from "../GroupedList/GroupSpacer";
import { composeRenderFunction } from "../@uifabric/utilities/renderFunction";
var getClassNames = classNamesFunction();
var MIN_COLUMN_WIDTH = 100; // this is the global min width
var DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
var DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
var DetailsListBase = /** @class */ (function (_super) {
  __extends(DetailsListBase, _super);

  function DetailsListBase(props) {
    var rcName = props.rcName;
    var _this = _super.call(this, props) || this;
    _this._root = React.createRef();
    _this._header = React.createRef();
    _this._groupedList = React.createRef();
    _this._list = React.createRef();
    _this._focusZone = React.createRef();
    _this._selectionZone = React.createRef();
    _this._sumColumnWidths = memoizeFunction(function (columns) {
      var totalWidth = 0;
      columns.forEach(function (column) {
        return (totalWidth += column.calculatedWidth || column.minWidth);
      });
      return totalWidth;
    });
    _this._onRenderRow = function (props, defaultRender) {
      return React.createElement(DetailsRow, __assign({ rcName }, props));
    };
    _this._onRenderDetailsHeader = function (
      detailsHeaderProps,
      defaultRender
    ) {
      return React.createElement(
        DetailsHeader,
        __assign({}, detailsHeaderProps)
      );
    };
    _this._onRenderDetailsFooter = function (
      detailsFooterProps,
      defaultRender
    ) {
      return null;
    };
    _this._onRenderListCell = function (nestingDepth) {
      return function (item, itemIndex) {
        return _this._onRenderCell(nestingDepth, item, itemIndex);
      };
    };
    _this._onRenderCell = function (nestingDepth, item, index) {
      var _a = _this.props,
        compact = _a.compact,
        rcName = _a.rcName,
        darkMode = _a.darkMode,
        dragDropEvents = _a.dragDropEvents,
        eventsToRegister = _a.rowElementEventMap,
        onRenderMissingItem = _a.onRenderMissingItem,
        onRenderItemColumn = _a.onRenderItemColumn,
        getCellValueKey = _a.getCellValueKey,
        _b = _a.selectionMode,
        selectionMode = _b === void 0 ? _this._selection.mode : _b,
        viewport = _a.viewport,
        checkboxVisibility = _a.checkboxVisibility,
        getRowAriaLabel = _a.getRowAriaLabel,
        getRowAriaDescribedBy = _a.getRowAriaDescribedBy,
        checkButtonAriaLabel = _a.checkButtonAriaLabel,
        checkboxCellClassName = _a.checkboxCellClassName,
        groupProps = _a.groupProps,
        useReducedRowRenderer = _a.useReducedRowRenderer,
        indentWidth = _a.indentWidth,
        _c = _a.cellStyleProps,
        cellStyleProps = _c === void 0 ? DEFAULT_CELL_STYLE_PROPS : _c,
        onRenderCheckbox = _a.onRenderCheckbox,
        enableUpdateAnimations = _a.enableUpdateAnimations,
        useFastIcons = _a.useFastIcons;
      var viewportWidth = viewport && viewport.width ? viewport.width : 0;
      var onRenderRow = _this.props.onRenderRow
        ? composeRenderFunction(_this.props.onRenderRow, _this._onRenderRow)
        : _this._onRenderRow;
      var collapseAllVisibility =
        groupProps && groupProps.collapseAllVisibility;
      var selection = _this._selection;
      var dragDropHelper = _this._dragDropHelper;
      var columns = _this.state.adjustedColumns;
      var rowCheckWidth =
        selectionMode !== SelectionMode.none &&
        checkboxVisibility !== CheckboxVisibility.hidden
          ? CHECKBOX_WIDTH
          : 0;
      var groupExpandWidth = _this._getGroupNestingDepth() * GROUP_EXPAND_WIDTH;
      var totalWidth = 0; // offset because we have one less inner padding.
      var availableWidth = viewportWidth - (rowCheckWidth + groupExpandWidth);
      // var availableWidth = viewPort - (rowCheckWidth + groupExpandWidth);
      let as = [...columns];
      let priorityColumn = as.splice(0).sort((a, b) => {
        return a.priority - b.priority;
      });
      // let realColumn = columns;
      let realColumn = totalWidth > availableWidth ? priorityColumn : columns;
      var rowProps = {
        item: item,
        itemIndex: index,
        compact: compact,
        columns: realColumn,
        groupNestingDepth: nestingDepth,
        selectionMode: selectionMode,
        selection: selection,
        onDidMount: _this._onRowDidMount,
        onWillUnmount: _this._onRowWillUnmount,
        onRenderItemColumn: onRenderItemColumn,
        getCellValueKey: getCellValueKey,
        eventsToRegister: eventsToRegister,
        dragDropEvents: dragDropEvents,
        dragDropHelper: dragDropHelper,
        viewport: viewport,
        checkboxVisibility: checkboxVisibility,
        collapseAllVisibility: collapseAllVisibility,
        getRowAriaLabel: getRowAriaLabel,
        getRowAriaDescribedBy: getRowAriaDescribedBy,
        checkButtonAriaLabel: checkButtonAriaLabel,
        checkboxCellClassName: checkboxCellClassName,
        useReducedRowRenderer: useReducedRowRenderer,
        indentWidth: indentWidth,
        cellStyleProps: cellStyleProps,
        onRenderDetailsCheckbox: onRenderCheckbox,
        enableUpdateAnimations: enableUpdateAnimations,
        rowWidth: _this._sumColumnWidths(realColumn),
        useFastIcons: useFastIcons,
        rcName,
        darkMode,
      };
      if (!item) {
        if (onRenderMissingItem) {
          return onRenderMissingItem(index, rowProps);
        }
        return null;
      }
      return onRenderRow(rowProps);
    };
    _this._onGroupExpandStateChanged = function (isSomeGroupExpanded) {
      _this.setState({
        isSomeGroupExpanded: isSomeGroupExpanded,
      });
    };
    _this._onColumnIsSizingChanged = function (column, isSizing) {
      _this.setState({
        isSizing: isSizing,
      });
    };
    _this._onHeaderKeyDown = function (ev) {
      if (ev.which === KeyCodes.down) {
        if (_this._focusZone.current && _this._focusZone.current.focus()) {
          // select the first item in list after down arrow key event
          // only if nothing was selected; otherwise start with the already-selected item
          if (_this._selection.getSelectedIndices().length === 0) {
            _this._selection.setIndexSelected(0, true, false);
          }
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    };
    _this._onContentKeyDown = function (ev) {
      if (ev.which === KeyCodes.up && !ev.altKey) {
        if (_this._header.current && _this._header.current.focus()) {
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    };
    _this._onRowDidMount = function (row) {
      var _a = row.props,
        item = _a.item,
        itemIndex = _a.itemIndex;
      var itemKey = _this._getItemKey(item, itemIndex);
      _this._activeRows[itemKey] = row; // this is used for column auto resize
      _this._setFocusToRowIfPending(row);
      var onRowDidMount = _this.props.onRowDidMount;
      if (onRowDidMount) {
        onRowDidMount(item, itemIndex);
      }
    };
    _this._onRowWillUnmount = function (row) {
      var onRowWillUnmount = _this.props.onRowWillUnmount;
      var _a = row.props,
        item = _a.item,
        itemIndex = _a.itemIndex;
      var itemKey = _this._getItemKey(item, itemIndex);
      delete _this._activeRows[itemKey];
      if (onRowWillUnmount) {
        onRowWillUnmount(item, itemIndex);
      }
    };
    _this._onToggleCollapse = function (collapsed) {
      _this.setState({
        isCollapsed: collapsed,
      });
      if (_this._groupedList.current) {
        _this._groupedList.current.toggleCollapseAll(collapsed);
      }
    };
    _this._onColumnDragEnd = function (props, event) {
      var columnReorderOptions = _this.props.columnReorderOptions;
      var finalDropLocation = ColumnDragEndLocation.outside;
      if (columnReorderOptions && columnReorderOptions.onDragEnd) {
        if (
          props.dropLocation &&
          props.dropLocation !== ColumnDragEndLocation.header
        ) {
          finalDropLocation = props.dropLocation;
        } else if (_this._root.current) {
          var clientRect = _this._root.current.getBoundingClientRect();
          if (
            event.clientX > clientRect.left &&
            event.clientX < clientRect.right &&
            event.clientY > clientRect.top &&
            event.clientY < clientRect.bottom
          ) {
            finalDropLocation = ColumnDragEndLocation.surface;
          }
        }
        columnReorderOptions.onDragEnd(finalDropLocation);
      }
    };
    _this._onColumnResized = function (
      resizingColumn,
      newWidth,
      resizingColumnIndex
    ) {
      var newCalculatedWidth = Math.max(
        resizingColumn.minWidth || MIN_COLUMN_WIDTH,
        newWidth
      );
      if (_this.props.onColumnResize) {
        _this.props.onColumnResize(
          resizingColumn,
          newCalculatedWidth,
          resizingColumnIndex
        );
      }
      _this._rememberCalculatedWidth(resizingColumn, newCalculatedWidth);
      _this._adjustColumns(_this.props, true, resizingColumnIndex);
      _this.setState({
        version: {},
      });
    };
    /**
     * Callback function when double clicked on the details header column resizer
     * which will measure the column cells of all the active rows and resize the
     * column to the max cell width.
     *
     * @param column - double clicked column definition
     * @param columnIndex - double clicked column index
     * TODO: min width 100 should be changed to const value and should be consistent with the
     * value used on _onSizerMove method in DetailsHeader
     */
    _this._onColumnAutoResized = function (column, columnIndex) {
      var max = 0;
      var count = 0;
      var totalCount = Object.keys(_this._activeRows).length;
      for (var key in _this._activeRows) {
        if (_this._activeRows.hasOwnProperty(key)) {
          var currentRow = _this._activeRows[key];
          currentRow.measureCell(columnIndex, function (width) {
            max = Math.max(max, width);
            count++;
            if (count === totalCount) {
              _this._onColumnResized(column, max, columnIndex);
            }
          });
        }
      }
    };
    /**
     * Call back function when an element in FocusZone becomes active. It will translate it into item
     * and call onActiveItemChanged callback if specified.
     *
     * @param row - element that became active in Focus Zone
     * @param focus - event from Focus Zone
     */
    _this._onActiveRowChanged = function (el, ev) {
      var _a = _this.props,
        items = _a.items,
        onActiveItemChanged = _a.onActiveItemChanged;
      if (!el) {
        return;
      }
      // Check and assign index only if the event was raised from any DetailsRow element
      if (el.getAttribute("data-item-index")) {
        var index = Number(el.getAttribute("data-item-index"));
        if (index >= 0) {
          if (onActiveItemChanged) {
            onActiveItemChanged(items[index], index, ev);
          }
          _this.setState({
            focusedItemIndex: index,
          });
        }
      }
    };
    _this._onBlur = function (event) {
      _this.setState({
        focusedItemIndex: -1,
      });
    };
    _this.isRightArrow = function (event) {
      return (
        event.which === getRTLSafeKeyCode(KeyCodes.right, _this.props.theme)
      );
    };
    initializeComponentRef(_this);
    _this._async = new Async(_this);
    _this._activeRows = {};
    _this._columnOverrides = {};
    _this.state = {
      focusedItemIndex: -1,
      lastWidth: 0,
      adjustedColumns: _this._getAdjustedColumns(props),
      isSizing: false,
      isDropping: false,
      isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
      isSomeGroupExpanded:
        props.groupProps && !props.groupProps.isAllGroupsCollapsed,
      version: {},
    };
    _this._selection =
      props.selection ||
      new Selection({
        onSelectionChanged: undefined,
        getKey: props.getKey,
        selectionMode: props.selectionMode,
      });
    if (!_this.props.disableSelectionZone) {
      _this._selection.setItems(props.items, false);
    }
    _this._dragDropHelper = props.dragDropEvents
      ? new DragDropHelper({
          selection: _this._selection,
          minimumPixelsForDrag: props.minimumPixelsForDrag,
        })
      : undefined;
    _this._initialFocusedIndex = props.initialFocusedIndex;
    return _this;
  }
  DetailsListBase.prototype.scrollToIndex = function (
    index,
    measureItem,
    scrollToMode
  ) {
    this._list.current &&
      this._list.current.scrollToIndex(index, measureItem, scrollToMode);
    this._groupedList.current &&
      this._groupedList.current.scrollToIndex(index, measureItem, scrollToMode);
  };
  DetailsListBase.prototype.focusIndex = function (
    index,
    forceIntoFirstElement,
    measureItem,
    scrollToMode
  ) {
    if (forceIntoFirstElement === void 0) {
      forceIntoFirstElement = false;
    }
    var item = this.props.items[index];
    if (item) {
      this.scrollToIndex(index, measureItem, scrollToMode);
      var itemKey = this._getItemKey(item, index);
      var row = this._activeRows[itemKey];
      if (row) {
        this._setFocusToRow(row, forceIntoFirstElement);
      }
    }
  };
  DetailsListBase.prototype.getStartItemIndexInView = function () {
    if (this._list && this._list.current) {
      return this._list.current.getStartItemIndexInView();
    } else if (this._groupedList && this._groupedList.current) {
      return this._groupedList.current.getStartItemIndexInView();
    }
    return 0;
  };
  DetailsListBase.prototype.componentWillUnmount = function () {
    if (this._dragDropHelper) {
      // TODO If the DragDropHelper was passed via props, this will dispose it, which is incorrect behavior.
      this._dragDropHelper.dispose();
    }
    this._async.dispose();
  };
  DetailsListBase.prototype.componentDidUpdate = function (
    prevProps,
    prevState
  ) {
    if (this._initialFocusedIndex !== undefined) {
      var item2 = this.props.items[this._initialFocusedIndex];
      if (item2) {
        var itemKey2 = this._getItemKey(item2, this._initialFocusedIndex);
        var row2 = this._activeRows[itemKey2];
        if (row2) {
          this._setFocusToRowIfPending(row2);
        }
      }
    }
    if (
      this.props.items !== prevProps.items &&
      this.props.items.length > 0 &&
      this.state.focusedItemIndex !== -1 &&
      !elementContains(this._root.current, document.activeElement, false)
    ) {
      // Item set has changed and previously-focused item is gone.
      // Set focus to item at index of previously-focused item if it is in range,
      // else set focus to the last item.
      var index =
        this.state.focusedItemIndex < this.props.items.length
          ? this.state.focusedItemIndex
          : this.props.items.length - 1;
      var item3 = this.props.items[index];
      var itemKey3 = this._getItemKey(item3, this.state.focusedItemIndex);
      var row3 = this._activeRows[itemKey3];
      if (row3) {
        this._setFocusToRow(row3);
      } else {
        this._initialFocusedIndex = index;
      }
    }
    if (this.props.onDidUpdate) {
      this.props.onDidUpdate(this);
    }
  };
  // tslint:disable-next-line function-name
  DetailsListBase.prototype.UNSAFE_componentWillReceiveProps = function (
    newProps
  ) {
    var _a = this.props,
      checkboxVisibility = _a.checkboxVisibility,
      items = _a.items,
      setKey = _a.setKey,
      _b = _a.selectionMode,
      selectionMode = _b === void 0 ? this._selection.mode : _b,
      columns = _a.columns,
      viewport = _a.viewport,
      compact = _a.compact,
      dragDropEvents = _a.dragDropEvents;
    var _c = (this.props.groupProps || {}).isAllGroupsCollapsed,
      isAllGroupsCollapsed = _c === void 0 ? undefined : _c;
    var newViewportWidth = (newProps.viewport && newProps.viewport.width) || 0;
    var oldViewportWidth = (viewport && viewport.width) || 0;
    var shouldResetSelection =
      newProps.setKey !== setKey || newProps.setKey === undefined;
    var shouldForceUpdates = false;
    if (newProps.layoutMode !== this.props.layoutMode) {
      shouldForceUpdates = true;
    }
    if (shouldResetSelection) {
      this._initialFocusedIndex = newProps.initialFocusedIndex;
      // reset focusedItemIndex when setKey changes
      this.setState({
        focusedItemIndex:
          this._initialFocusedIndex !== undefined
            ? this._initialFocusedIndex
            : -1,
      });
    }
    if (!this.props.disableSelectionZone && newProps.items !== items) {
      this._selection.setItems(newProps.items, shouldResetSelection);
    }
    if (
      newProps.checkboxVisibility !== checkboxVisibility ||
      newProps.columns !== columns ||
      newViewportWidth !== oldViewportWidth ||
      newProps.compact !== compact
    ) {
      shouldForceUpdates = true;
    }
    this._adjustColumns(newProps, true);
    if (newProps.selectionMode !== selectionMode) {
      shouldForceUpdates = true;
    }
    if (
      isAllGroupsCollapsed === undefined &&
      newProps.groupProps &&
      newProps.groupProps.isAllGroupsCollapsed !== undefined
    ) {
      this.setState({
        isCollapsed: newProps.groupProps.isAllGroupsCollapsed,
        isSomeGroupExpanded: !newProps.groupProps.isAllGroupsCollapsed,
      });
    }
    if (newProps.dragDropEvents !== dragDropEvents) {
      this._dragDropHelper && this._dragDropHelper.dispose();
      this._dragDropHelper = newProps.dragDropEvents
        ? new DragDropHelper({
            selection: this._selection,
            minimumPixelsForDrag: newProps.minimumPixelsForDrag,
          })
        : undefined;
      shouldForceUpdates = true;
    }
    if (shouldForceUpdates) {
      this.setState({
        version: {},
      });
    }
  };
  DetailsListBase.prototype.render = function () {
    var _a = this.props,
      customLoading = _a.customLoading,
      onCancelFilter = _a.onCancelFilter,
      rcName = _a.rcName,
      isCollapseOnlyByIcon = _a.isCollapseOnlyByIcon,
      onGetSelectedGroups = _a.onGetSelectedGroups,
      onHandleClickGroupTitle = _a.onHandleClickGroupTitle,
      isShimmerLoading = _a.isShimmerLoading,
      ariaLabelForListHeader = _a.ariaLabelForListHeader,
      ariaLabelForSelectAllCheckbox = _a.ariaLabelForSelectAllCheckbox,
      ariaLabelForSelectionColumn = _a.ariaLabelForSelectionColumn,
      className = _a.className,
      checkboxVisibility = _a.checkboxVisibility,
      compact = _a.compact,
      constrainMode = _a.constrainMode,
      dragDropEvents = _a.dragDropEvents,
      groups = _a.groups,
      groupProps = _a.groupProps,
      indentWidth = _a.indentWidth,
      items = _a.items,
      isEmptyItems = _a.isEmptyItems,
      isPlaceholderData = _a.isPlaceholderData,
      isHeaderVisible = _a.isHeaderVisible,
      layoutMode = _a.layoutMode,
      onItemInvoked = _a.onItemInvoked,
      onItemContextMenu = _a.onItemContextMenu,
      onColumnHeaderClick = _a.onColumnHeaderClick,
      onColumnHeaderContextMenu = _a.onColumnHeaderContextMenu,
      _b = _a.selectionMode,
      selectionMode = _b === void 0 ? this._selection.mode : _b,
      selectionPreservedOnEmptyClick = _a.selectionPreservedOnEmptyClick,
      selectionZoneProps = _a.selectionZoneProps,
      ariaLabel = _a.ariaLabel,
      ariaLabelForGrid = _a.ariaLabelForGrid,
      rowElementEventMap = _a.rowElementEventMap,
      _c = _a.shouldApplyApplicationRole,
      shouldApplyApplicationRole = _c === void 0 ? false : _c,
      getKey = _a.getKey,
      listProps = _a.listProps,
      usePageCache = _a.usePageCache,
      onShouldVirtualize = _a.onShouldVirtualize,
      viewport = _a.viewport,
      minimumPixelsForDrag = _a.minimumPixelsForDrag,
      getGroupHeight = _a.getGroupHeight,
      styles = _a.styles,
      theme = _a.theme,
      _d = _a.cellStyleProps,
      cellStyleProps = _d === void 0 ? DEFAULT_CELL_STYLE_PROPS : _d,
      onRenderCheckbox = _a.onRenderCheckbox,
      useFastIcons = _a.useFastIcons;
    var viewportWidth = viewport && viewport.width ? viewport.width : 0;
    var _e = this.state,
      adjustedColumns = _e.adjustedColumns,
      isCollapsed = _e.isCollapsed,
      isSizing = _e.isSizing,
      isSomeGroupExpanded = _e.isSomeGroupExpanded;
    var _f = this,
      selection = _f._selection,
      dragDropHelper = _f._dragDropHelper;
    var groupNestingDepth = this._getGroupNestingDepth();
    var additionalListProps = __assign(
      {
        renderedWindowsAhead: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD,
        renderedWindowsBehind: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND,
        getKey: getKey,
        version: this.state.version,
      },
      listProps
    );
    var selectAllVisibility = SelectAllVisibility.none; // for SelectionMode.none
    if (selectionMode === SelectionMode.single) {
      selectAllVisibility = SelectAllVisibility.hidden;
    }
    if (selectionMode === SelectionMode.multiple) {
      // if isCollapsedGroupSelectVisible is false, disable select all when the list has all collapsed groups
      var isCollapsedGroupSelectVisible =
        groupProps &&
        groupProps.headerProps &&
        groupProps.headerProps.isCollapsedGroupSelectVisible;
      if (isCollapsedGroupSelectVisible === undefined) {
        isCollapsedGroupSelectVisible = true;
      }
      var isSelectAllVisible =
        isCollapsedGroupSelectVisible || !groups || isSomeGroupExpanded;
      selectAllVisibility = isSelectAllVisible
        ? SelectAllVisibility.visible
        : SelectAllVisibility.hidden;
    }
    if (checkboxVisibility === CheckboxVisibility.hidden) {
      selectAllVisibility = SelectAllVisibility.none;
    }
    var _g = this.props,
      _h = _g.onRenderDetailsHeader,
      onRenderDetailsHeader = _h === void 0 ? this._onRenderDetailsHeader : _h,
      _j = _g.onRenderDetailsFooter,
      onRenderDetailsFooter = _j === void 0 ? this._onRenderDetailsFooter : _j;
    var detailsFooterProps = this._getDetailsFooterProps();
    var columnReorderProps = this._getColumnReorderProps();
    var rowCount =
      (isHeaderVisible ? 1 : 0) +
      GetGroupCount(groups) +
      (items ? items.length : 0);
    var classNames = getClassNames(styles, {
      theme: theme,
      compact: compact,
      isFixed: layoutMode === DetailsListLayoutMode.fixedColumns,
      isHorizontalConstrained:
        constrainMode === ConstrainMode.horizontalConstrained,
      className: className,
    });
    var rowCheckWidth =
      selectionMode !== SelectionMode.none &&
      checkboxVisibility !== CheckboxVisibility.hidden
        ? CHECKBOX_WIDTH
        : 0;
    var groupExpandWidth = this._getGroupNestingDepth() * GROUP_EXPAND_WIDTH;
    var totalWidth = 0; // offset because we have one less inner padding.
    var availableWidth = viewportWidth - (rowCheckWidth + groupExpandWidth);
    // var availableWidth = viewPort - (rowCheckWidth + groupExpandWidth);
    let as = [...adjustedColumns];
    let priorityColumn = as.splice(0).sort((a, b) => {
      return a.priority - b.priority;
    });
    // let realColumn = adjustedColumns;
    let realColumn =
      totalWidth > availableWidth ? priorityColumn : adjustedColumns;

    var list = groups
      ? React.createElement(GroupedList, {
          componentRef: this._groupedList,
          groups: groups,
          groupProps: groupProps ? this._getGroupProps(groupProps) : undefined,
          items: items,
          onRenderCell: this._onRenderCell,
          selection: selection,
          selectionMode:
            checkboxVisibility !== CheckboxVisibility.hidden
              ? selectionMode
              : SelectionMode.none,
          dragDropEvents: dragDropEvents,
          dragDropHelper: dragDropHelper,
          eventsToRegister: rowElementEventMap,
          listProps: additionalListProps,
          onGroupExpandStateChanged: this._onGroupExpandStateChanged,
          usePageCache: usePageCache,
          onShouldVirtualize: onShouldVirtualize,
          getGroupHeight: getGroupHeight,
          compact: compact,
          onGetSelectedGroups,
          rcName,
          isCollapseOnlyByIcon,
          onHandleClickGroupTitle,
        })
      : !isEmptyItems
      ? React.createElement(
          List,
          __assign(
            {
              ref: this._list,
              role: "presentation",
              items: items,
              onRenderCell: this._onRenderListCell(0),
              usePageCache: usePageCache,
              onShouldVirtualize: onShouldVirtualize,
              rcName,
            },
            additionalListProps
          )
        )
      : React.createElement(
          "div",
          {
            className: "listEmptyWrapper",
            style: { textAlign: "center", marginTop: "30px" },
            "data-rc-id": rcName ? `dl.empty.${rcName}` : undefined,
          },
          React.createElement(
            "h5",
            {
              className: "listEmpty__title",
              style: { fontSize: "14px", margin: "15px 0" },
            },
            isEmptyItems.title
          ),
          React.createElement(
            "span",
            { className: "listEmpty__detail" },
            isEmptyItems.detail
          )
        );
    let isLoading = isShimmerLoading ? "loading" : "done";
    return (
      // If shouldApplyApplicationRole is true, role application will be applied to make arrow keys work
      // with JAWS.
      React.createElement(
        "div",
        __assign(
          {
            ref: this._root,
            className: classNames.root,
            "data-automationid": "DetailsList",
            "data-is-scrollable": "false",
            "aria-label": ariaLabel,
            "data-rc-id": rcName
              ? `dl${rcName ? `.${rcName}.${isLoading}` : `.${isLoading}`}`
              : undefined,
            // "data-rc-loading": `${isShimmerLoading ? "loading" : "done"}`,
          },
          shouldApplyApplicationRole
            ? {
                role: "application",
              }
            : {}
        ),
        React.createElement(FocusRects, null),
        React.createElement(
          "div",
          {
            role: "grid",
            "aria-label": ariaLabelForGrid,
            "aria-rowcount": isPlaceholderData ? -1 : rowCount,
            "aria-colcount":
              (selectAllVisibility !== SelectAllVisibility.none ? 1 : 0) +
              (adjustedColumns ? adjustedColumns.length : 0),
            "aria-readonly": "true",
            "aria-busy": isPlaceholderData,
          },
          React.createElement(
            "div",
            {
              onKeyDown: this._onHeaderKeyDown,
              role: "presentation",
              className: classNames.headerWrapper,
            },
            isHeaderVisible &&
              onRenderDetailsHeader(
                {
                  componentRef: this._header,
                  selectionMode: selectionMode,
                  layoutMode: layoutMode,
                  selection: selection,
                  columns: realColumn,
                  onColumnClick: onColumnHeaderClick,
                  onColumnContextMenu: onColumnHeaderContextMenu,
                  onColumnResized: this._onColumnResized,
                  onColumnIsSizingChanged: this._onColumnIsSizingChanged,
                  onColumnAutoResized: this._onColumnAutoResized,
                  groupNestingDepth: groupNestingDepth,
                  isAllCollapsed: isCollapsed,
                  onToggleCollapseAll: this._onToggleCollapse,
                  ariaLabel: ariaLabelForListHeader,
                  ariaLabelForSelectAllCheckbox: ariaLabelForSelectAllCheckbox,
                  ariaLabelForSelectionColumn: ariaLabelForSelectionColumn,
                  selectAllVisibility: selectAllVisibility,
                  collapseAllVisibility:
                    groupProps && groupProps.collapseAllVisibility,
                  viewport: viewport,
                  columnReorderProps: columnReorderProps,
                  minimumPixelsForDrag: minimumPixelsForDrag,
                  cellStyleProps: cellStyleProps,
                  checkboxVisibility: checkboxVisibility,
                  indentWidth: indentWidth,
                  onRenderDetailsCheckbox: onRenderCheckbox,
                  rowWidth: this._sumColumnWidths(this.state.adjustedColumns),
                  useFastIcons: useFastIcons,
                  onCancelFilter: onCancelFilter,
                  rcName,
                  groups,
                  onGetSelectedGroups,
                },
                this._onRenderDetailsHeader
              )
          ),
          React.createElement(
            "div",
            {
              onKeyDown: this._onContentKeyDown,
              role: "presentation",
              className: classNames.contentWrapper,
            },
            React.createElement(
              FocusZone,
              {
                componentRef: this._focusZone,
                className: classNames.focusZone,
                direction: FocusZoneDirection.vertical,
                shouldEnterInnerZone: this.isRightArrow,
                onActiveElementChanged: this._onActiveRowChanged,
                onBlur: this._onBlur,
                rcName,
              },
              customLoading && isShimmerLoading
              ? React.createElement(
                "div",
                {
                  style: {
                    position: "absolute",
                    width: `max-content`,
                    top: `50%`,
                    left: `50%`,
                    transform: `translate(-50%,-50%)`
                  },
                  className: "ms-CustomLoading" 
                },
                customLoading
              )
              : !this.props.disableSelectionZone
                ? React.createElement(
                    SelectionZone,
                    __assign(
                      {
                        ref: this._selectionZone,
                        selection: selection,
                        selectionPreservedOnEmptyClick:
                          selectionPreservedOnEmptyClick,
                        selectionMode: selectionMode,
                        onItemInvoked: onItemInvoked,
                        onItemContextMenu: onItemContextMenu,
                        enterModalOnTouch:
                          this.props.enterModalSelectionOnTouch,
                        rcName,
                      },
                      selectionZoneProps || {}
                    ),
                    list
                  )
                : list
            )
          ),
          onRenderDetailsFooter(
            __assign({}, detailsFooterProps),
            this._onRenderDetailsFooter
          )
        )
      )
    );
  };
  DetailsListBase.prototype.forceUpdate = function () {
    _super.prototype.forceUpdate.call(this);
    this._forceListUpdates();
  };
  DetailsListBase.prototype._getGroupNestingDepth = function () {
    var groups = this.props.groups;
    var level = 0;
    var groupsInLevel = groups;
    while (groupsInLevel && groupsInLevel.length > 0) {
      level++;
      groupsInLevel = groupsInLevel[0].children;
    }
    return level;
  };
  DetailsListBase.prototype._setFocusToRowIfPending = function (row) {
    var itemIndex = row.props.itemIndex;
    if (
      this._initialFocusedIndex !== undefined &&
      itemIndex === this._initialFocusedIndex
    ) {
      this._setFocusToRow(row);
      delete this._initialFocusedIndex;
    }
  };
  DetailsListBase.prototype._setFocusToRow = function (
    row,
    forceIntoFirstElement
  ) {
    if (forceIntoFirstElement === void 0) {
      forceIntoFirstElement = false;
    }
    if (this._selectionZone.current) {
      this._selectionZone.current.ignoreNextFocus();
    }
    this._async.setTimeout(function () {
      row.focus(forceIntoFirstElement);
    }, 0);
  };
  DetailsListBase.prototype._forceListUpdates = function () {
    if (this._groupedList.current) {
      this._groupedList.current.forceUpdate();
    }
    if (this._list.current) {
      this._list.current.forceUpdate();
    }
  };
  DetailsListBase.prototype._notifyColumnsResized = function () {
    this.state.adjustedColumns.forEach(function (column) {
      if (column.onColumnResize) {
        column.onColumnResize(column.currentWidth);
      }
    });
  };
  DetailsListBase.prototype._adjustColumns = function (
    newProps,
    forceUpdate,
    resizingColumnIndex
  ) {
    var adjustedColumns = this._getAdjustedColumns(
      newProps,
      forceUpdate,
      resizingColumnIndex
    );
    var viewport = this.props.viewport;
    var viewportWidth = viewport && viewport.width ? viewport.width : 0;
    if (adjustedColumns) {
      this.setState(
        {
          adjustedColumns: adjustedColumns,
          lastWidth: viewportWidth,
        },
        this._notifyColumnsResized
      );
    }
  };
  /** Returns adjusted columns, given the viewport size and layout mode. */
  DetailsListBase.prototype._getAdjustedColumns = function (
    newProps,
    forceUpdate,
    resizingColumnIndex
  ) {
    var _this = this;
    var newItems = newProps.items,
      layoutMode = newProps.layoutMode,
      selectionMode = newProps.selectionMode,
      viewport = newProps.viewport;
    var viewportWidth = viewport && viewport.width ? viewport.width : 0;
    var newColumns = newProps.columns;
    var columns = this.props ? this.props.columns : [];
    var lastWidth = this.state ? this.state.lastWidth : -1;
    var lastSelectionMode = this.state
      ? this.state.lastSelectionMode
      : undefined;
    if (
      !forceUpdate &&
      lastWidth === viewportWidth &&
      lastSelectionMode === selectionMode &&
      (!columns || newColumns === columns)
    ) {
      return [];
    }
    newColumns = newColumns || buildColumns(newItems, true);
    var adjustedColumns;
    if (layoutMode === DetailsListLayoutMode.fixedColumns) {
      adjustedColumns = this._getFixedColumns(newColumns);
      // Preserve adjusted column calculated widths.
      adjustedColumns.forEach(function (column) {
        _this._rememberCalculatedWidth(column, column.calculatedWidth);
      });
    } else {
      if (resizingColumnIndex !== undefined) {
        adjustedColumns = this._getJustifiedColumnsAfterResize(
          newColumns,
          viewportWidth,
          newProps,
          resizingColumnIndex
        );
      } else {
        adjustedColumns = this._getJustifiedColumns(
          newColumns,
          viewportWidth,
          newProps,
          0
        );
      }
      adjustedColumns.forEach(function (column) {
        _this._getColumnOverride(column.key).currentWidth =
          column.calculatedWidth;
      });
    }
    return adjustedColumns;
  };
  /** Builds a set of columns based on the given columns mixed with the current overrides. */
  DetailsListBase.prototype._getFixedColumns = function (newColumns) {
    var _this = this;
    return newColumns.map(function (column) {
      var newColumn = __assign(
        __assign({}, column),
        _this._columnOverrides[column.key]
      );
      if (!newColumn.calculatedWidth) {
        newColumn.calculatedWidth =
          newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH;
      }
      return newColumn;
    });
  };
  DetailsListBase.prototype._getJustifiedColumnsAfterResize = function (
    newColumns,
    viewportWidth,
    props,
    resizingColumnIndex
  ) {
    var _this = this;
    var fixedColumns = newColumns.slice(0, resizingColumnIndex);
    fixedColumns.forEach(function (column) {
      return (column.calculatedWidth = _this._getColumnOverride(
        column.key
      ).currentWidth);
    });
    var fixedWidth = fixedColumns.reduce(function (total, column, i) {
      return total + getPaddedWidth(column, i === 0, props);
    }, 0);
    var remainingColumns = newColumns.slice(resizingColumnIndex);
    var remainingWidth = viewportWidth - fixedWidth;
    return __spreadArrays(
      fixedColumns,
      this._getJustifiedColumns(
        remainingColumns,
        remainingWidth,
        props,
        resizingColumnIndex
      )
    );
  };
  /** Builds a set of columns to fix within the viewport width. */
  DetailsListBase.prototype._getJustifiedColumns = function (
    newColumns,
    viewportWidth,
    props,
    firstIndex
  ) {
    var _this = this;
    var _a = props.selectionMode,
      selectionMode = _a === void 0 ? this._selection.mode : _a,
      checkboxVisibility = props.checkboxVisibility;
    var rowCheckWidth =
      selectionMode !== SelectionMode.none &&
      checkboxVisibility !== CheckboxVisibility.hidden
        ? CHECKBOX_WIDTH
        : 0;
    var groupExpandWidth = this._getGroupNestingDepth() * GROUP_EXPAND_WIDTH;
    var totalWidth = 0; // offset because we have one less inner padding.
    var availableWidth = viewportWidth - (rowCheckWidth + groupExpandWidth);
    // var availableWidth = viewPort - (rowCheckWidth + groupExpandWidth);
    var adjustedColumns = newColumns.map(function (column, i) {
      var newColumn = __assign(
        __assign(__assign({}, column), {
          calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH,
        }),
        _this._columnOverrides[column.key]
      );
      var isFirst = i + firstIndex === 0;
      totalWidth += getPaddedWidth(newColumn, isFirst, props);
      return newColumn;
    });
    var lastIndex = adjustedColumns.length - 1;
    // Shrink or remove collapsable columns.
    while (lastIndex > 0 && totalWidth > availableWidth) {
      var column1 = adjustedColumns[lastIndex];
      var minWidth1 = column1.minWidth || MIN_COLUMN_WIDTH;
      var overflowWidth = totalWidth - availableWidth;
      // tslint:disable-next-line:deprecation
      if (
        column1.calculatedWidth - minWidth1 >=
        overflowWidth
        // || !(column1.isCollapsible || column1.isCollapsable) // isCollapsible always false
      ) {
        var originalWidth = column1.calculatedWidth;
        column1.calculatedWidth = Math.max(
          column1.calculatedWidth - overflowWidth,
          minWidth1
        );
        totalWidth -= originalWidth - column1.calculatedWidth;
      } else {
        totalWidth -= getPaddedWidth(column1, false, props);
        // remove cols base on priority of col
        let priorityColumn = adjustedColumns.splice(0).sort((a, b) => {
          return a.priority - b.priority;
        });
        priorityColumn.splice(lastIndex, 1);
        adjustedColumns = priorityColumn;
        // adjustedColumns.splice(lastIndex, 1);
      }
      lastIndex--;
    }
    // Then expand columns starting at the beginning, until we've filled the width.
    for (
      var i = 0;
      i < adjustedColumns.length && totalWidth < availableWidth;
      i++
    ) {
      var column2 = adjustedColumns[i];
      var isLast = i === adjustedColumns.length - 1;
      var overrides = this._columnOverrides[column2.key];
      if (overrides && overrides.calculatedWidth && !isLast) {
        continue;
      }
      var spaceLeft = availableWidth - totalWidth;
      var increment = void 0;
      if (isLast) {
        increment = spaceLeft;
      } else {
        var maxWidth = column2.maxWidth;
        var minWidth2 = column2.minWidth || maxWidth || MIN_COLUMN_WIDTH;
        increment = maxWidth
          ? Math.min(spaceLeft, maxWidth - minWidth2)
          : spaceLeft;
      }
      column2.calculatedWidth = column2.calculatedWidth + increment;
      totalWidth += increment;
    }
    return adjustedColumns;
  };
  DetailsListBase.prototype._rememberCalculatedWidth = function (
    column,
    newCalculatedWidth
  ) {
    var overrides = this._getColumnOverride(column.key);
    overrides.calculatedWidth = newCalculatedWidth;
    overrides.currentWidth = newCalculatedWidth;
  };
  DetailsListBase.prototype._getColumnOverride = function (key) {
    return (this._columnOverrides[key] = this._columnOverrides[key] || {});
  };
  DetailsListBase.prototype._getItemKey = function (item, itemIndex) {
    var getKey = this.props.getKey;
    var itemKey = undefined;
    if (item) {
      itemKey = item.key;
    }
    if (getKey) {
      itemKey = getKey(item, itemIndex);
    }
    if (!itemKey) {
      itemKey = itemIndex;
    }
    return itemKey;
  };
  DetailsListBase.prototype._getDetailsFooterProps = function () {
    var columns = this.state.adjustedColumns;
    var _a = this.props,
      viewport = _a.viewport,
      checkboxVisibility = _a.checkboxVisibility,
      indentWidth = _a.indentWidth,
      _b = _a.cellStyleProps,
      cellStyleProps = _b === void 0 ? DEFAULT_CELL_STYLE_PROPS : _b,
      _c = _a.selectionMode,
      selectionMode = _c === void 0 ? this._selection.mode : _c;
    return {
      columns: columns,
      groupNestingDepth: this._getGroupNestingDepth(),
      selection: this._selection,
      selectionMode: selectionMode,
      viewport: viewport,
      checkboxVisibility: checkboxVisibility,
      indentWidth: indentWidth,
      cellStyleProps: cellStyleProps,
    };
  };
  DetailsListBase.prototype._getColumnReorderProps = function () {
    var columnReorderOptions = this.props.columnReorderOptions;
    if (columnReorderOptions) {
      return __assign(__assign({}, columnReorderOptions), {
        onColumnDragEnd: this._onColumnDragEnd,
      });
    }
  };
  DetailsListBase.prototype._getGroupProps = function (detailsGroupProps) {
    var _this = this;
    var onRenderDetailsGroupFooter = detailsGroupProps.onRenderFooter,
      onRenderDetailsGroupHeader = detailsGroupProps.onRenderHeader;
    var columns = this.state.adjustedColumns;
    var _a = this.props,
      _b = _a.selectionMode,
      selectionMode = _b === void 0 ? this._selection.mode : _b,
      viewport = _a.viewport,
      rcName = _a.rcName,
      _c = _a.cellStyleProps,
      cellStyleProps = _c === void 0 ? DEFAULT_CELL_STYLE_PROPS : _c,
      checkboxVisibility = _a.checkboxVisibility,
      indentWidth = _a.indentWidth;
    var groupNestingDepth = this._getGroupNestingDepth();
    var onRenderFooter = onRenderDetailsGroupFooter
      ? function (props, defaultRender) {
          return onRenderDetailsGroupFooter(
            __assign(__assign({}, props), {
              columns: columns,
              groupNestingDepth: groupNestingDepth,
              indentWidth: indentWidth,
              selection: _this._selection,
              selectionMode: selectionMode,
              viewport: viewport,
              checkboxVisibility: checkboxVisibility,
              cellStyleProps: cellStyleProps,
              rcName,
            }),
            defaultRender
          );
        }
      : undefined;
    var onRenderHeader = onRenderDetailsGroupHeader
      ? function (props, defaultRender) {
          return onRenderDetailsGroupHeader(
            __assign(__assign({}, props), {
              columns: columns,
              groupNestingDepth: groupNestingDepth,
              indentWidth: indentWidth,
              selection: _this._selection,
              selectionMode: selectionMode,
              viewport: viewport,
              checkboxVisibility: checkboxVisibility,
              cellStyleProps: cellStyleProps,
              rcName,
            }),
            defaultRender
          );
        }
      : undefined;
    return __assign(__assign({ rcName }, detailsGroupProps), {
      onRenderFooter: onRenderFooter,
      onRenderHeader: onRenderHeader,
    });
  };
  DetailsListBase.defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained,
    checkboxVisibility: CheckboxVisibility.onHover,
    isHeaderVisible: true,
    compact: false,
    useFastIcons: true,
  };
  DetailsListBase = __decorate([withViewport], DetailsListBase);
  return DetailsListBase;
})(React.Component);
export { DetailsListBase };
export function buildColumns(
  items,
  canResizeColumns,
  onColumnClick,
  sortedColumnKey,
  isSortedDescending,
  groupedColumnKey,
  isMultiline
) {
  var columns = [];
  if (items && items.length) {
    var firstItem = items[0];
    for (var propName in firstItem) {
      if (firstItem.hasOwnProperty(propName)) {
        columns.push({
          key: propName,
          name: propName,
          fieldName: propName,
          minWidth: MIN_COLUMN_WIDTH,
          maxWidth: 300,
          isCollapsable: !!columns.length,
          isCollapsible: !!columns.length,
          isMultiline: isMultiline === undefined ? false : isMultiline,
          isSorted: sortedColumnKey === propName,
          isSortedDescending: !!isSortedDescending,
          isRowHeader: false,
          columnActionsMode: ColumnActionsMode.clickable,
          isResizable: canResizeColumns,
          onColumnClick: onColumnClick,
          isGrouped: groupedColumnKey === propName,
        });
      }
    }
  }
  return columns;
}

function getPaddedWidth(column, isFirst, props) {
  var _a = props.cellStyleProps,
    cellStyleProps = _a === void 0 ? DEFAULT_CELL_STYLE_PROPS : _a;
  return (
    column.calculatedWidth +
    cellStyleProps.cellLeftPadding +
    cellStyleProps.cellRightPadding +
    (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0)
  );
}
//# sourceMappingURL=DetailsList.base.js.map
