"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.DetailsHeaderBase = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _utilities = require("../@uifabric/utilities");

var _DetailsList = require("./DetailsList.types");

var _FocusZone = require("../FocusZone");

var _icons = require("../@uifabric/icons");

var _Layer = require("../@uifabric/utilities/Layer");

var _GroupSpacer = require("../GroupedList/GroupSpacer");

var _GroupedList = require("../GroupedList");

var _DetailsRowCheck = require("./DetailsRowCheck");

var _selection = require("../@uifabric/utilities/selection");

var _DetailsColumn = require("./DetailsColumn");

var _DetailsHeader = require("./DetailsHeader.types");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

var getClassNames = (0, _utilities.classNamesFunction)();
var MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button

var MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button

var NO_COLUMNS = [];

var DetailsHeaderBase =
  /** @class */
  (function (_super) {
    (0, _tslib.__extends)(DetailsHeaderBase, _super);

    function DetailsHeaderBase(props) {
      var _this = _super.call(this, props) || this;

      _this._rootComponent = /*#__PURE__*/ React.createRef();
      _this._draggedColumnIndex = -1;
      _this._dropHintDetails = {};

      _this._updateDroppingState = function (newValue, event) {
        if (
          _this._draggedColumnIndex >= 0 &&
          event.type !== "drop" &&
          !newValue
        ) {
          _this._resetDropHints();
        }
      };

      _this._onDragOver = function (item, event) {
        if (_this._draggedColumnIndex >= 0) {
          event.stopPropagation();

          _this._computeDropHintToBeShown(event.clientX);
        }
      };

      _this._onDrop = function (item, event) {
        // Safe to assume this is defined since we're handling a drop event
        var columnReorderProps = _this._getColumnReorderProps(); // Target index will not get changed if draggeditem is after target item.

        if (_this._draggedColumnIndex >= 0 && event) {
          var targetIndex =
            _this._draggedColumnIndex > _this._currentDropHintIndex
              ? _this._currentDropHintIndex
              : _this._currentDropHintIndex - 1;

          var isValidDrop = _this._isValidCurrentDropHintIndex();

          event.stopPropagation();

          if (isValidDrop) {
            _this._onDropIndexInfo.sourceIndex = _this._draggedColumnIndex;
            _this._onDropIndexInfo.targetIndex = targetIndex;

            if (columnReorderProps.onColumnDrop) {
              var dragDropDetails = {
                draggedIndex: _this._draggedColumnIndex,
                targetIndex: targetIndex,
              };
              columnReorderProps.onColumnDrop(dragDropDetails); // tslint:disable:deprecation
            } else if (columnReorderProps.handleColumnReorder) {
              columnReorderProps.handleColumnReorder(
                _this._draggedColumnIndex,
                targetIndex
              ); // tslint:enable:deprecation
            }
          }
        }

        _this._resetDropHints();

        _this._dropHintDetails = {};
        _this._draggedColumnIndex = -1;
      };

      _this._updateDragInfo = function (props, event) {
        // Safe to assume this is defined since we're handling a drag event
        var columnReorderProps = _this._getColumnReorderProps();

        var itemIndex = props.itemIndex;

        if (itemIndex >= 0) {
          // Column index is set based on the checkbox
          _this._draggedColumnIndex = _this._isCheckboxColumnHidden()
            ? itemIndex - 1
            : itemIndex - 2;

          _this._getDropHintPositions();

          if (columnReorderProps.onColumnDragStart) {
            columnReorderProps.onColumnDragStart(true);
          }
        } else if (event && _this._draggedColumnIndex >= 0) {
          _this._resetDropHints();

          _this._draggedColumnIndex = -1;
          _this._dropHintDetails = {};

          if (columnReorderProps.onColumnDragEnd) {
            var columnDragEndLocation = _this._isEventOnHeader(event);

            columnReorderProps.onColumnDragEnd(
              {
                dropLocation: columnDragEndLocation,
              },
              event
            );
          }
        }
      };

      _this._getDropHintPositions = function () {
        var _a = _this.props.columns,
          columns = _a === void 0 ? NO_COLUMNS : _a; // Safe to assume this is defined since we're handling a drag/drop event

        var columnReorderProps = _this._getColumnReorderProps();

        var prevX = 0;
        var prevMid = 0;
        var prevRef;
        var frozenColumnCountFromStart =
          columnReorderProps.frozenColumnCountFromStart || 0;
        var frozenColumnCountFromEnd =
          columnReorderProps.frozenColumnCountFromEnd || 0;

        for (
          var i = frozenColumnCountFromStart;
          i < columns.length - frozenColumnCountFromEnd + 1;
          i++
        ) {
          if (_this._rootElement) {
            var dropHintElement = _this._rootElement.querySelectorAll(
              "#columnDropHint_" + i
            )[0];

            if (dropHintElement) {
              if (i === frozenColumnCountFromStart) {
                prevX = dropHintElement.offsetLeft;
                prevMid = dropHintElement.offsetLeft;
                prevRef = dropHintElement;
              } else {
                var newMid = (dropHintElement.offsetLeft + prevX) / 2;
                _this._dropHintDetails[i - 1] = {
                  originX: prevX,
                  startX: prevMid,
                  endX: newMid,
                  dropHintElementRef: prevRef,
                };
                prevMid = newMid;
                prevRef = dropHintElement;
                prevX = dropHintElement.offsetLeft;

                if (i === columns.length - frozenColumnCountFromEnd) {
                  _this._dropHintDetails[i] = {
                    originX: prevX,
                    startX: prevMid,
                    endX: dropHintElement.offsetLeft,
                    dropHintElementRef: prevRef,
                  };
                }
              }
            }
          }
        }
      };
      /**
       * Based on the given cursor position, finds the nearest drop hint and updates the state to make it visible
       */

      _this._computeDropHintToBeShown = function (clientX) {
        var isRtl = (0, _utilities.getRTL)(_this.props.theme);

        if (_this._rootElement) {
          var clientRect = _this._rootElement.getBoundingClientRect();

          var headerOriginX = clientRect.left;
          var eventXRelativePosition = clientX - headerOriginX;
          var currentDropHintIndex = _this._currentDropHintIndex;

          if (_this._isValidCurrentDropHintIndex()) {
            if (
              _liesBetween(
                isRtl,
                eventXRelativePosition,
                _this._dropHintDetails[currentDropHintIndex].startX,
                _this._dropHintDetails[currentDropHintIndex].endX
              )
            ) {
              return;
            }
          }

          var _a = _this.props.columns,
            columns = _a === void 0 ? NO_COLUMNS : _a; // Safe to assume this is defined since we're handling a drag/drop event

          var columnReorderProps = _this._getColumnReorderProps();

          var frozenColumnCountFromStart =
            columnReorderProps.frozenColumnCountFromStart || 0;
          var frozenColumnCountFromEnd =
            columnReorderProps.frozenColumnCountFromEnd || 0;
          var currentIndex = frozenColumnCountFromStart;
          var lastValidColumn = columns.length - frozenColumnCountFromEnd;
          var indexToUpdate = -1;

          if (
            _isBefore(
              isRtl,
              eventXRelativePosition,
              _this._dropHintDetails[currentIndex].endX
            )
          ) {
            indexToUpdate = currentIndex;
          } else if (
            _isAfter(
              isRtl,
              eventXRelativePosition,
              _this._dropHintDetails[lastValidColumn].startX
            )
          ) {
            indexToUpdate = lastValidColumn;
          } else if (_this._isValidCurrentDropHintIndex()) {
            if (
              _this._dropHintDetails[currentDropHintIndex + 1] &&
              _liesBetween(
                isRtl,
                eventXRelativePosition,
                _this._dropHintDetails[currentDropHintIndex + 1].startX,
                _this._dropHintDetails[currentDropHintIndex + 1].endX
              )
            ) {
              indexToUpdate = currentDropHintIndex + 1;
            } else if (
              _this._dropHintDetails[currentDropHintIndex - 1] &&
              _liesBetween(
                isRtl,
                eventXRelativePosition,
                _this._dropHintDetails[currentDropHintIndex - 1].startX,
                _this._dropHintDetails[currentDropHintIndex - 1].endX
              )
            ) {
              indexToUpdate = currentDropHintIndex - 1;
            }
          }

          if (indexToUpdate === -1) {
            var startIndex = frozenColumnCountFromStart;
            var endIndex = lastValidColumn;

            while (startIndex < endIndex) {
              var middleIndex = Math.ceil((endIndex + startIndex) / 2);

              if (
                _liesBetween(
                  isRtl,
                  eventXRelativePosition,
                  _this._dropHintDetails[middleIndex].startX,
                  _this._dropHintDetails[middleIndex].endX
                )
              ) {
                indexToUpdate = middleIndex;
                break;
              } else if (
                _isBefore(
                  isRtl,
                  eventXRelativePosition,
                  _this._dropHintDetails[middleIndex].originX
                )
              ) {
                endIndex = middleIndex;
              } else if (
                _isAfter(
                  isRtl,
                  eventXRelativePosition,
                  _this._dropHintDetails[middleIndex].originX
                )
              ) {
                startIndex = middleIndex;
              }
            }
          }

          if (
            indexToUpdate === _this._draggedColumnIndex ||
            indexToUpdate === _this._draggedColumnIndex + 1
          ) {
            if (_this._isValidCurrentDropHintIndex()) {
              _this._resetDropHints();
            }
          } else if (
            currentDropHintIndex !== indexToUpdate &&
            indexToUpdate >= 0
          ) {
            _this._resetDropHints();

            _this._updateDropHintElement(
              _this._dropHintDetails[indexToUpdate].dropHintElementRef,
              "inline-block"
            );

            _this._currentDropHintIndex = indexToUpdate;
          }
        }
      };

      _this._renderColumnSizer = function (_a) {
        var _b;

        var columnIndex = _a.columnIndex;
        var _c = _this.props.columns,
          columns = _c === void 0 ? NO_COLUMNS : _c;
        var column = columns[columnIndex];
        var columnResizeDetails = _this.state.columnResizeDetails;
        var classNames = _this._classNames;
        return column.isResizable
          ? /*#__PURE__*/ React.createElement("div", {
              key: column.key + "_sizer",
              "aria-hidden": true,
              role: "button",
              "data-is-focusable": false,
              onClick: _stopPropagation,
              "data-sizer-index": columnIndex,
              onBlur: _this._onSizerBlur,
              className: (0, _utilities.css)(
                classNames.cellSizer,
                columnIndex < columns.length - 1
                  ? classNames.cellSizerStart
                  : classNames.cellSizerEnd,
                ((_b = {}),
                (_b[classNames.cellIsResizing] =
                  columnResizeDetails &&
                  columnResizeDetails.columnIndex === columnIndex),
                _b)
              ),
              onDoubleClick: _this._onSizerDoubleClick.bind(_this, columnIndex),
            })
          : null;
      };

      _this._onRenderColumnHeaderTooltip = function (tooltipHostProps) {
        return /*#__PURE__*/ React.createElement(
          "span",
          {
            className: tooltipHostProps.hostClassName,
          },
          tooltipHostProps.children
        );
      };
      /**
       * Called when the select all toggle is clicked.
       */

      _this._onSelectAllClicked = function () {
        var selection = _this.props.selection;
        var groups = _this.props.groups;
        var onGetSelectedGroups = _this.props.onGetSelectedGroups;

        if (selection) {
          selection.toggleAllSelected();
        }

        if (onGetSelectedGroups && groups) {
          onGetSelectedGroups(groups);
        }
      };

      _this._onRootMouseDown = function (ev) {
        var columnIndexAttr = ev.target.getAttribute("data-sizer-index");
        var columnIndex = Number(columnIndexAttr);
        var _a = _this.props.columns,
          columns = _a === void 0 ? NO_COLUMNS : _a;

        if (
          columnIndexAttr === null ||
          ev.button !== MOUSEDOWN_PRIMARY_BUTTON
        ) {
          // Ignore anything except the primary button.
          return;
        }

        _this.setState({
          columnResizeDetails: {
            columnIndex: columnIndex,
            columnMinWidth: columns[columnIndex].calculatedWidth,
            originX: ev.clientX,
          },
        });

        ev.preventDefault();
        ev.stopPropagation();
      };

      _this._onRootMouseMove = function (ev) {
        var _a = _this.state,
          columnResizeDetails = _a.columnResizeDetails,
          isSizing = _a.isSizing;

        if (
          columnResizeDetails &&
          !isSizing &&
          ev.clientX !== columnResizeDetails.originX
        ) {
          _this.setState({
            isSizing: true,
          });
        }
      };

      _this._onRootRef = function (focusZone) {
        if (focusZone) {
          // Need to resolve the actual DOM node, not the component.
          // The element itself will be used for drag/drop and focusing.
          _this._rootElement = (0, _reactDom.findDOMNode)(focusZone);
        } else {
          _this._rootElement = undefined;
        }
      };

      _this._onRootKeyDown = function (ev) {
        var _a = _this.state,
          columnResizeDetails = _a.columnResizeDetails,
          isSizing = _a.isSizing;
        var _b = _this.props,
          _c = _b.columns,
          columns = _c === void 0 ? NO_COLUMNS : _c,
          onColumnResized = _b.onColumnResized;
        var columnIndexAttr = ev.target.getAttribute("data-sizer-index");

        if (!columnIndexAttr || isSizing) {
          return;
        }

        var columnIndex = Number(columnIndexAttr);

        if (!columnResizeDetails) {
          // tslint:disable-next-line:deprecation
          if (ev.which === _utilities.KeyCodes.enter) {
            _this.setState({
              columnResizeDetails: {
                columnIndex: columnIndex,
                columnMinWidth: columns[columnIndex].calculatedWidth,
              },
            });

            ev.preventDefault();
            ev.stopPropagation();
          }
        } else {
          var increment = void 0; // tslint:disable-next-line:deprecation

          if (ev.which === _utilities.KeyCodes.enter) {
            _this.setState({
              columnResizeDetails: undefined,
            });

            ev.preventDefault();
            ev.stopPropagation(); // tslint:disable-next-line:deprecation
          } else if (ev.which === _utilities.KeyCodes.left) {
            increment = (0, _utilities.getRTL)(_this.props.theme) ? 1 : -1; // tslint:disable-next-line:deprecation
          } else if (ev.which === _utilities.KeyCodes.right) {
            increment = (0, _utilities.getRTL)(_this.props.theme) ? -1 : 1;
          }

          if (increment) {
            if (!ev.shiftKey) {
              increment *= 10;
            }

            _this.setState({
              columnResizeDetails: (0, _tslib.__assign)(
                (0, _tslib.__assign)({}, columnResizeDetails),
                {
                  columnMinWidth:
                    columnResizeDetails.columnMinWidth + increment,
                }
              ),
            });

            if (onColumnResized) {
              onColumnResized(
                columns[columnIndex],
                columnResizeDetails.columnMinWidth + increment,
                columnIndex
              );
            }

            ev.preventDefault();
            ev.stopPropagation();
          }
        }
      };
      /**
       * mouse move event handler in the header
       * it will set isSizing state to true when user clicked on the sizer and move the mouse.
       *
       * @param ev - mouse move event
       */

      _this._onSizerMouseMove = function (ev) {
        var // use buttons property here since ev.button in some edge case is not upding well during the move.
          // but firefox doesn't support it, so we set the default value when it is not defined.
          buttons = ev.buttons;
        var _a = _this.props,
          onColumnIsSizingChanged = _a.onColumnIsSizingChanged,
          onColumnResized = _a.onColumnResized,
          _b = _a.columns,
          columns = _b === void 0 ? NO_COLUMNS : _b;
        var columnResizeDetails = _this.state.columnResizeDetails;

        if (buttons !== undefined && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
          // cancel mouse down event and return early when the primary button is not pressed
          _this._onSizerMouseUp(ev);

          return;
        }

        if (ev.clientX !== columnResizeDetails.originX) {
          if (onColumnIsSizingChanged) {
            onColumnIsSizingChanged(
              columns[columnResizeDetails.columnIndex],
              true
            );
          }
        }

        if (onColumnResized) {
          var movement = ev.clientX - columnResizeDetails.originX;

          if ((0, _utilities.getRTL)(_this.props.theme)) {
            movement = -movement;
          }

          onColumnResized(
            columns[columnResizeDetails.columnIndex],
            columnResizeDetails.columnMinWidth + movement,
            columnResizeDetails.columnIndex
          );
        }
      };

      _this._onSizerBlur = function (ev) {
        var columnResizeDetails = _this.state.columnResizeDetails;

        if (columnResizeDetails) {
          _this.setState({
            columnResizeDetails: undefined,
            isSizing: false,
          });
        }
      };
      /**
       * mouse up event handler in the header
       * clear the resize related state.
       * This is to ensure we can catch double click event
       *
       * @param ev - mouse up event
       */

      _this._onSizerMouseUp = function (ev) {
        var _a = _this.props,
          _b = _a.columns,
          columns = _b === void 0 ? NO_COLUMNS : _b,
          onColumnIsSizingChanged = _a.onColumnIsSizingChanged;
        var columnResizeDetails = _this.state.columnResizeDetails;

        _this.setState({
          columnResizeDetails: undefined,
          isSizing: false,
        });

        if (onColumnIsSizingChanged) {
          onColumnIsSizingChanged(
            columns[columnResizeDetails.columnIndex],
            false
          );
        }
      };

      _this._onToggleCollapseAll = function () {
        var onToggleCollapseAll = _this.props.onToggleCollapseAll;
        var newCollapsed = !_this.state.isAllCollapsed;

        _this.setState({
          isAllCollapsed: newCollapsed,
        });

        if (onToggleCollapseAll) {
          onToggleCollapseAll(newCollapsed);
        }
      };

      (0, _utilities.initializeComponentRef)(_this);
      _this._events = new _utilities.EventGroup(_this);
      _this.state = {
        columnResizeDetails: undefined,
        isAllCollapsed: _this.props.isAllCollapsed,
        isAllSelected:
          !!_this.props.selection && _this.props.selection.isAllSelected(),
      };
      _this._onDropIndexInfo = {
        sourceIndex: -1,
        targetIndex: -1,
      };
      _this._id = (0, _utilities.getId)("header");
      _this._currentDropHintIndex = -1; // The drag drop handler won't do any work until subscribe() is called,
      // so always set it up for convenience

      _this._dragDropHelper = new _utilities.DragDropHelper({
        selection: {
          getSelection: function getSelection() {
            return;
          },
        },
        minimumPixelsForDrag: _this.props.minimumPixelsForDrag,
      });
      return _this;
    }

    DetailsHeaderBase.prototype.componentDidMount = function () {
      var selection = this.props.selection;

      this._events.on(
        selection,
        _selection.SELECTION_CHANGE,
        this._onSelectionChanged
      ); // We need to use native on this to prevent MarqueeSelection from handling the event before us.

      this._events.on(this._rootElement, "mousedown", this._onRootMouseDown);

      this._events.on(this._rootElement, "keydown", this._onRootKeyDown);

      if (this._getColumnReorderProps()) {
        this._subscriptionObject = this._dragDropHelper.subscribe(
          this._rootElement,
          this._events,
          this._getHeaderDragDropOptions()
        );
      }
    };

    DetailsHeaderBase.prototype.componentDidUpdate = function (prevProps) {
      if (this._getColumnReorderProps()) {
        if (!this._subscriptionObject) {
          this._subscriptionObject = this._dragDropHelper.subscribe(
            this._rootElement,
            this._events,
            this._getHeaderDragDropOptions()
          );
        }
      } else if (this._subscriptionObject) {
        this._subscriptionObject.dispose();

        delete this._subscriptionObject;
      }

      if (
        this.props !== prevProps &&
        this._onDropIndexInfo.sourceIndex >= 0 &&
        this._onDropIndexInfo.targetIndex >= 0
      ) {
        var _a = prevProps.columns,
          previousColumns = _a === void 0 ? NO_COLUMNS : _a;
        var _b = this.props.columns,
          columns = _b === void 0 ? NO_COLUMNS : _b;

        if (
          previousColumns[this._onDropIndexInfo.sourceIndex].key ===
          columns[this._onDropIndexInfo.targetIndex].key
        ) {
          this._onDropIndexInfo = {
            sourceIndex: -1,
            targetIndex: -1,
          };
        }
      }

      if (this.props.isAllCollapsed !== prevProps.isAllCollapsed) {
        this.setState({
          isAllCollapsed: this.props.isAllCollapsed,
        });
      }
    };

    DetailsHeaderBase.prototype.componentWillUnmount = function () {
      if (this._subscriptionObject) {
        this._subscriptionObject.dispose();

        delete this._subscriptionObject;
      }

      this._dragDropHelper.dispose();

      this._events.dispose();
    };

    DetailsHeaderBase.prototype.render = function () {
      var _this = this;

      var _a = this.props,
        _b = _a.columns,
        columns = _b === void 0 ? NO_COLUMNS : _b,
        onCancelFilter = _a.onCancelFilter,
        ariaLabel = _a.ariaLabel,
        rcName = _a.rcName,
        ariaLabelForToggleAllGroupsButton =
          _a.ariaLabelForToggleAllGroupsButton,
        ariaLabelForSelectAllCheckbox = _a.ariaLabelForSelectAllCheckbox,
        selectAllVisibility = _a.selectAllVisibility,
        ariaLabelForSelectionColumn = _a.ariaLabelForSelectionColumn,
        indentWidth = _a.indentWidth,
        onColumnClick = _a.onColumnClick,
        onColumnContextMenu = _a.onColumnContextMenu,
        _c = _a.onRenderColumnHeaderTooltip,
        onRenderColumnHeaderTooltip =
          _c === void 0 ? this._onRenderColumnHeaderTooltip : _c,
        styles = _a.styles,
        selectionMode = _a.selectionMode,
        theme = _a.theme,
        onRenderDetailsCheckbox = _a.onRenderDetailsCheckbox,
        groupNestingDepth = _a.groupNestingDepth,
        useFastIcons = _a.useFastIcons,
        checkboxVisibility = _a.checkboxVisibility,
        className = _a.className;
      var _d = this.state,
        isAllSelected = _d.isAllSelected,
        columnResizeDetails = _d.columnResizeDetails,
        isSizing = _d.isSizing,
        isAllCollapsed = _d.isAllCollapsed;
      var showCheckbox =
        selectAllVisibility !== _DetailsHeader.SelectAllVisibility.none;
      var isCheckboxHidden =
        selectAllVisibility === _DetailsHeader.SelectAllVisibility.hidden;
      var isCheckboxAlwaysVisible =
        checkboxVisibility === _DetailsList.CheckboxVisibility.always;

      var columnReorderProps = this._getColumnReorderProps();

      var frozenColumnCountFromStart =
        columnReorderProps && columnReorderProps.frozenColumnCountFromStart
          ? columnReorderProps.frozenColumnCountFromStart
          : 0;
      var frozenColumnCountFromEnd =
        columnReorderProps && columnReorderProps.frozenColumnCountFromEnd
          ? columnReorderProps.frozenColumnCountFromEnd
          : 0;
      this._classNames = getClassNames(styles, {
        theme: theme,
        isAllSelected: isAllSelected,
        isSelectAllHidden:
          selectAllVisibility === _DetailsHeader.SelectAllVisibility.hidden,
        isResizingColumn: !!columnResizeDetails && isSizing,
        isSizing: isSizing,
        isAllCollapsed: isAllCollapsed,
        isCheckboxHidden: isCheckboxHidden,
        className: className,
      });
      var classNames = this._classNames;
      var IconComponent = useFastIcons ? _icons.FontIcon : _icons.Icon;
      var isRTL = (0, _utilities.getRTL)(theme);
      return /*#__PURE__*/ React.createElement(
        _FocusZone.FocusZone,
        {
          role: "row",
          "aria-label": ariaLabel,
          className: classNames.root,
          componentRef: this._rootComponent,
          ref: this._onRootRef,
          onMouseMove: this._onRootMouseMove,
          "data-automationid": "DetailsHeader",
          direction: _FocusZone.FocusZoneDirection.horizontal,
        },
        showCheckbox
          ? [
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  key: "__checkbox",
                  className: classNames.cellIsCheck,
                  "aria-labelledby": this._id + "-check",
                  onClick: !isCheckboxHidden
                    ? this._onSelectAllClicked
                    : undefined,
                  "aria-colindex": 1,
                  role: "columnheader",
                  "data-rc-id": rcName
                    ? "col.checkAll.".concat(rcName)
                    : undefined,
                },
                onRenderColumnHeaderTooltip(
                  {
                    hostClassName: classNames.checkTooltip,
                    id: this._id + "-checkTooltip",
                    setAriaDescribedBy: false,
                    content: ariaLabelForSelectAllCheckbox,
                    children: /*#__PURE__*/ React.createElement(
                      _DetailsRowCheck.DetailsRowCheck,
                      {
                        id: this._id + "-check",
                        "aria-label":
                          selectionMode === _selection.SelectionMode.multiple
                            ? ariaLabelForSelectAllCheckbox
                            : ariaLabelForSelectionColumn,
                        "aria-describedby": !isCheckboxHidden
                          ? ariaLabelForSelectAllCheckbox &&
                            !this.props.onRenderColumnHeaderTooltip
                            ? this._id + "-checkTooltip"
                            : undefined
                          : ariaLabelForSelectionColumn &&
                            !this.props.onRenderColumnHeaderTooltip
                          ? this._id + "-checkTooltip"
                          : undefined,
                        "data-is-focusable": !isCheckboxHidden || undefined,
                        isHeader: true,
                        selected: isAllSelected,
                        anySelected: false,
                        canSelect: !isCheckboxHidden,
                        className: classNames.check,
                        onRenderDetailsCheckbox: onRenderDetailsCheckbox,
                        useFastIcons: useFastIcons,
                        isVisible: isCheckboxAlwaysVisible,
                      }
                    ),
                  },
                  this._onRenderColumnHeaderTooltip
                )
              ),
              !this.props.onRenderColumnHeaderTooltip
                ? ariaLabelForSelectAllCheckbox && !isCheckboxHidden
                  ? /*#__PURE__*/ React.createElement(
                      "label",
                      {
                        key: "__checkboxLabel",
                        id: this._id + "-checkTooltip",
                        className: classNames.accessibleLabel,
                        "aria-hidden": true,
                      },
                      ariaLabelForSelectAllCheckbox
                    )
                  : ariaLabelForSelectionColumn && isCheckboxHidden
                  ? /*#__PURE__*/ React.createElement(
                      "label",
                      {
                        key: "__checkboxLabel",
                        id: this._id + "-checkTooltip",
                        className: classNames.accessibleLabel,
                        "aria-hidden": true,
                      },
                      ariaLabelForSelectionColumn
                    )
                  : null
                : null,
            ]
          : null,
        groupNestingDepth > 0 &&
          this.props.collapseAllVisibility ===
            _GroupedList.CollapseAllVisibility.visible
          ? /*#__PURE__*/ React.createElement(
              "div",
              {
                className: classNames.cellIsGroupExpander,
                onClick: this._onToggleCollapseAll,
                "data-is-focusable": true,
                "aria-label": ariaLabelForToggleAllGroupsButton,
                "aria-expanded": !isAllCollapsed,
                role: ariaLabelForToggleAllGroupsButton ? "button" : undefined,
              },
              /*#__PURE__*/ React.createElement(IconComponent, {
                className: classNames.collapseButton,
                iconName:
                  isAllCollapsed || typeof isAllCollapsed === "undefined"
                    ? "ChevronDownMed"
                    : "ChevronRightMed",
              })
            )
          : null,
        /*#__PURE__*/ React.createElement(_GroupSpacer.GroupSpacer, {
          indentWidth: indentWidth,
          count: groupNestingDepth - 1,
        }),
        columns.map(function (column, columnIndex) {
          var _isDraggable = columnReorderProps
            ? columnIndex >= frozenColumnCountFromStart &&
              columnIndex < columns.length - frozenColumnCountFromEnd
            : false;

          return [
            columnReorderProps &&
              (_isDraggable ||
                columnIndex === columns.length - frozenColumnCountFromEnd) &&
              _this._renderDropHint(columnIndex),
            /*#__PURE__*/ React.createElement(_DetailsColumn.DetailsColumn, {
              column: column,
              styles: column.styles,
              key: column.key,
              columnIndex: (showCheckbox ? 2 : 1) + columnIndex,
              parentId: _this._id,
              isDraggable: _isDraggable,
              updateDragInfo: _this._updateDragInfo,
              dragDropHelper: _this._dragDropHelper,
              onColumnClick: onColumnClick,
              onColumnContextMenu: onColumnContextMenu,
              // Do not render tooltips by default, but allow for override via props.
              onRenderColumnHeaderTooltip:
                _this.props.onRenderColumnHeaderTooltip,
              isDropped: _this._onDropIndexInfo.targetIndex === columnIndex,
              cellStyleProps: _this.props.cellStyleProps,
              useFastIcons: useFastIcons,
              onCancelFilter: onCancelFilter,
              rcName,
            }),
            _this._renderColumnDivider(columnIndex),
          ];
        }),
        columnReorderProps &&
          frozenColumnCountFromEnd === 0 &&
          this._renderDropHint(columns.length),
        isSizing &&
          /*#__PURE__*/ React.createElement(
            _Layer.Layer,
            null,
            /*#__PURE__*/ React.createElement("div", {
              className: classNames.sizingOverlay,
              onMouseMove: this._onSizerMouseMove,
              onMouseUp: this._onSizerMouseUp,
            })
          )
      );
    };
    /** Set focus to the active thing in the focus area. */

    DetailsHeaderBase.prototype.focus = function () {
      return Boolean(
        this._rootComponent.current && this._rootComponent.current.focus()
      );
    };
    /**
     * Gets column reorder props from this.props. If the calling code is part of setting up or
     * handling drag/drop events, it's safe to assume that this method's return value is defined
     * (because drag/drop handling will only be set up if reorder props are given).
     */

    DetailsHeaderBase.prototype._getColumnReorderProps = function () {
      var _a = this.props,
        columnReorderOptions = _a.columnReorderOptions,
        columnReorderProps = _a.columnReorderProps;
      return (
        columnReorderProps ||
        (columnReorderOptions &&
          (0, _tslib.__assign)((0, _tslib.__assign)({}, columnReorderOptions), {
            onColumnDragEnd: undefined,
          }))
      );
    };

    DetailsHeaderBase.prototype._getHeaderDragDropOptions = function () {
      var options = {
        selectionIndex: 1,
        context: {
          data: this,
          index: 0,
        },
        canDrag: function canDrag() {
          return false;
        },
        canDrop: function canDrop() {
          return true;
        },
        onDragStart: function onDragStart() {
          return undefined;
        },
        updateDropState: this._updateDroppingState,
        onDrop: this._onDrop,
        onDragEnd: function onDragEnd() {
          return undefined;
        },
        onDragOver: this._onDragOver,
      };
      return options;
    };

    DetailsHeaderBase.prototype._isValidCurrentDropHintIndex = function () {
      return this._currentDropHintIndex >= 0;
    };
    /**
     * @returns whether or not the "Select All" checkbox column is hidden.
     */

    DetailsHeaderBase.prototype._isCheckboxColumnHidden = function () {
      var _a = this.props,
        selectionMode = _a.selectionMode,
        checkboxVisibility = _a.checkboxVisibility;
      return (
        selectionMode === _selection.SelectionMode.none ||
        checkboxVisibility === _DetailsList.CheckboxVisibility.hidden
      );
    };

    DetailsHeaderBase.prototype._resetDropHints = function () {
      if (this._currentDropHintIndex >= 0) {
        this._updateDropHintElement(
          this._dropHintDetails[this._currentDropHintIndex].dropHintElementRef,
          "none"
        );

        this._currentDropHintIndex = -1;
      }
    };

    DetailsHeaderBase.prototype._updateDropHintElement = function (
      element,
      displayProperty
    ) {
      element.childNodes[1].style.display = displayProperty;
      element.childNodes[0].style.display = displayProperty;
    };

    DetailsHeaderBase.prototype._isEventOnHeader = function (event) {
      if (this._rootElement) {
        var clientRect = this._rootElement.getBoundingClientRect();

        if (
          event.clientX > clientRect.left &&
          event.clientX < clientRect.right &&
          event.clientY > clientRect.top &&
          event.clientY < clientRect.bottom
        ) {
          return _DetailsList.ColumnDragEndLocation.header;
        }
      }
    };

    DetailsHeaderBase.prototype._renderColumnDivider = function (columnIndex) {
      var _a = this.props.columns,
        columns = _a === void 0 ? NO_COLUMNS : _a;
      var column = columns[columnIndex];
      var onRenderDivider = column.onRenderDivider;
      return onRenderDivider
        ? onRenderDivider(
            {
              column: column,
              columnIndex: columnIndex,
            },
            this._renderColumnSizer
          )
        : this._renderColumnSizer({
            column: column,
            columnIndex: columnIndex,
          });
    };

    DetailsHeaderBase.prototype._renderDropHint = function (dropHintIndex) {
      var classNames = this._classNames;
      var IconComponent = this.props.useFastIcons
        ? _icons.FontIcon
        : _icons.Icon;
      return /*#__PURE__*/ React.createElement(
        "div",
        {
          key: "dropHintKey",
          className: classNames.dropHintStyle,
          id: "columnDropHint_" + dropHintIndex,
        },
        /*#__PURE__*/ React.createElement(IconComponent, {
          key: "dropHintCircleKey",
          "aria-hidden": true,
          "data-is-focusable": false,
          "data-sizer-index": dropHintIndex,
          className: classNames.dropHintCaretStyle,
          iconName: "CircleShapeSolid",
        }),
        /*#__PURE__*/ React.createElement("div", {
          key: "dropHintLineKey",
          "aria-hidden": true,
          "data-is-focusable": false,
          "data-sizer-index": dropHintIndex,
          className: classNames.dropHintLineStyle,
        })
      );
    };
    /**
     * double click on the column sizer will auto ajust column width
     * to fit the longest content among current rendered rows.
     *
     * @param columnIndex - index of the column user double clicked
     * @param ev - mouse double click event
     */

    DetailsHeaderBase.prototype._onSizerDoubleClick = function (
      columnIndex,
      ev
    ) {
      var _a = this.props,
        onColumnAutoResized = _a.onColumnAutoResized,
        _b = _a.columns,
        columns = _b === void 0 ? NO_COLUMNS : _b;

      if (onColumnAutoResized) {
        onColumnAutoResized(columns[columnIndex], columnIndex);
      }
    };

    DetailsHeaderBase.prototype._onSelectionChanged = function () {
      var isAllSelected =
        !!this.props.selection && this.props.selection.isAllSelected();

      if (this.state.isAllSelected !== isAllSelected) {
        this.setState({
          isAllSelected: isAllSelected,
        });
      }
    };

    DetailsHeaderBase.defaultProps = {
      selectAllVisibility: _DetailsHeader.SelectAllVisibility.visible,
      collapseAllVisibility: _GroupedList.CollapseAllVisibility.visible,
      useFastIcons: true,
    };
    return DetailsHeaderBase;
  })(React.Component);

exports.DetailsHeaderBase = DetailsHeaderBase;

function _liesBetween(rtl, target, left, right) {
  return rtl
    ? target <= left && target >= right
    : target >= left && target <= right;
}

function _isBefore(rtl, a, b) {
  return rtl ? a >= b : a <= b;
}

function _isAfter(rtl, a, b) {
  return rtl ? a <= b : a >= b;
}

function _stopPropagation(ev) {
  ev.stopPropagation();
}
