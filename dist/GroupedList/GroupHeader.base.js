"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.GroupHeaderBase = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../@uifabric/utilities");

var _selection = require("../@uifabric/utilities/selection");

var _Icon = require("../@uifabric/icons/Icon");

var _GroupSpacer = require("./GroupSpacer");

var _Spinner = require("../Spinner");

var _FocusZone = require("../FocusZone");

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

var GroupHeaderBase =
  /** @class */
  (function (_super) {
    (0, _tslib.__extends)(GroupHeaderBase, _super);

    function GroupHeaderBase(props) {
      var _this = _super.call(this, props) || this;

      _this._onToggleCollapse = function (ev) {
        var _a = _this.props,
          group = _a.group,
          onToggleCollapse = _a.onToggleCollapse,
          isGroupLoading = _a.isGroupLoading;
        var isCollapsed = _this.state.isCollapsed;
        var newCollapsed = !isCollapsed;
        var newLoadingVisible =
          !newCollapsed && isGroupLoading && isGroupLoading(group);

        _this.setState({
          isCollapsed: newCollapsed,
          isLoadingVisible: newLoadingVisible,
        });

        if (onToggleCollapse) {
          onToggleCollapse(group);
        }

        ev.stopPropagation();
        ev.preventDefault();
      };

      _this._onToggleSelectGroupClick = function (ev) {
        var _a = _this.props,
          onToggleSelectGroup = _a.onToggleSelectGroup,
          onGetSelectedGroups = _a.onGetSelectedGroups,
          group = _a.group;

        if (onToggleSelectGroup) {
          onToggleSelectGroup(group);
        }

        if (onGetSelectedGroups) {
          onGetSelectedGroups(group);
        }

        ev.preventDefault();
        ev.stopPropagation();
      };

      _this._onHeaderClick = function () {
        var _a = _this.props,
          group = _a.group,
          onGroupHeaderClick = _a.onGroupHeaderClick,
          onToggleSelectGroup = _a.onToggleSelectGroup;

        if (onGroupHeaderClick) {
          onGroupHeaderClick(group);
        } else if (onToggleSelectGroup) {
          onToggleSelectGroup(group);
        }
      };

      _this._onRenderTitle = function (props) {
        var group = props.group;
        var rcName = props.rcName;
        var onHandleClickGroupTitle = props.onHandleClickGroupTitle;
        var isCollapseOnlyByIcon = props.isCollapseOnlyByIcon;

        if (!group) {
          return null;
        }

        const onHandleClickTitle = () => {
          if (onHandleClickGroupTitle && isCollapseOnlyByIcon) {
            onHandleClickGroupTitle(group);
          }
        };

        return /*#__PURE__*/ React.createElement(
          "div",
          {
            className: _this._classNames.title,
            // onClick: props.onTitleClick,
            onClick: onHandleClickTitle,
          },
          /*#__PURE__*/ React.createElement(
            "span",
            { "data-rc-id": rcName ? `sp.grTitle.${rcName}` : undefined },
            group.name
          ),
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: _this._classNames.headerCount,
              "data-rc-id": rcName ? `sp.grTotalMember.${rcName}` : undefined,
            },
            "(",
            group.count,
            group.hasMoreData && "+",
            ")"
          )
        );
      };

      _this.state = {
        isCollapsed: _this.props.group && _this.props.group.isCollapsed,
        isLoadingVisible: false,
        selectedGroups: [],
      };
      return _this;
    } // tslint:disable-next-line function-name

    GroupHeaderBase.prototype.UNSAFE_componentWillReceiveProps = function (
      newProps
    ) {
      if (newProps.group) {
        var newCollapsed = newProps.group.isCollapsed;
        var isGroupLoading = newProps.isGroupLoading;
        var newLoadingVisible =
          !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);
        this.setState({
          isCollapsed: newCollapsed || false,
          isLoadingVisible: newLoadingVisible || false,
        });
      }
    };

    GroupHeaderBase.prototype.render = function () {
      var _a = this.props,
        group = _a.group,
        groupLevel = _a.groupLevel,
        viewport = _a.viewport,
        // onToggleCollapse = _a.onToggleCollapse,
        rcName = _a.rcName,
        selectionMode = _a.selectionMode,
        loadingText = _a.loadingText,
        // tslint:disable-next-line:deprecation
        _b = _a.isSelected,
        // tslint:disable-next-line:deprecation
        isSelected = _b === void 0 ? false : _b,
        _c = _a.selected,
        selected = _c === void 0 ? false : _c,
        indentWidth = _a.indentWidth,
        _d = _a.onRenderTitle,
        onRenderTitle = _d === void 0 ? this._onRenderTitle : _d,
        onRenderGroupHeaderCheckbox = _a.onRenderGroupHeaderCheckbox,
        _e = _a.isCollapsedGroupSelectVisible,
        isCollapsedGroupSelectVisible = _e === void 0 ? true : _e,
        expandButtonProps = _a.expandButtonProps,
        expandButtonIcon = _a.expandButtonIcon,
        selectAllButtonProps = _a.selectAllButtonProps,
        theme = _a.theme,
        styles = _a.styles,
        className = _a.className,
        isCollapseOnlyByIcon = _a.isCollapseOnlyByIcon,
        groupedListId = _a.groupedListId,
        compact = _a.compact,
        ariaPosInSet = _a.ariaPosInSet,
        ariaSetSize = _a.ariaSetSize,
        useFastIcons = _a.useFastIcons; // var isGroupLoading = _a.isGroupLoading;

      var defaultCheckboxRender = useFastIcons
        ? this._fastDefaultCheckboxRender
        : this._defaultCheckboxRender;
      var onRenderCheckbox = onRenderGroupHeaderCheckbox
        ? (0, _utilities.composeRenderFunction)(
            onRenderGroupHeaderCheckbox,
            defaultCheckboxRender
          )
        : defaultCheckboxRender;
      var _f = this.state,
        isCollapsed = _f.isCollapsed,
        isLoadingVisible = _f.isLoadingVisible;
      var canSelectGroup = selectionMode === _selection.SelectionMode.multiple;
      var isSelectionCheckVisible =
        canSelectGroup &&
        (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
      var currentlySelected = selected || isSelected;
      var isRTL = (0, _utilities.getRTL)(theme);
      this._classNames = getClassNames(styles, {
        theme: theme,
        className: className,
        selected: currentlySelected,
        isCollapsed: isCollapsed,
        compact: compact,
      });

      if (!group) {
        return null;
      }

      const onHandleConditionHeaderToggle = (ev) => {
        if (!isCollapseOnlyByIcon) {
          this._onToggleCollapse(ev);
        }
      };

      return /*#__PURE__*/ React.createElement(
        "div",
        {
          className: this._classNames.root,
          style: viewport
            ? {
                minWidth: viewport.width,
              }
            : {},
          onClick: (ev) => onHandleConditionHeaderToggle(ev),
          "aria-expanded": !group.isCollapsed,
          "aria-label": group.ariaLabel || group.name,
          "aria-level": groupLevel !== undefined ? groupLevel + 1 : undefined,
          "aria-setsize": ariaSetSize,
          "aria-posinset": ariaPosInSet,
          "data-is-focusable": true,
          "data-rc-id": rcName
            ? "dl.grHeader.".concat(rcName, ".").concat(group.key)
            : undefined,
          "data-rc-group-key": group.key,
        },
        group.key !== "lastGroup" &&
          /*#__PURE__*/ React.createElement(
            _FocusZone.FocusZone,
            {
              className: this._classNames.groupHeaderContainer,
              direction: _FocusZone.FocusZoneDirection.horizontal,
            },
            isSelectionCheckVisible
              ? /*#__PURE__*/ React.createElement(
                  "button",
                  (0, _tslib.__assign)(
                    {
                      type: "button",
                      className: this._classNames.check,
                      role: "checkbox",
                      "aria-checked": currentlySelected,
                      "data-selection-toggle": true,
                      "data-rc-id": rcName
                        ? "".concat(rcName, ".").concat(group.key)
                        : undefined,
                      onClick: this._onToggleSelectGroupClick,
                    },
                    selectAllButtonProps
                  ),
                  onRenderCheckbox(
                    {
                      checked: currentlySelected,
                      theme: theme,
                    },
                    onRenderCheckbox
                  )
                )
              : selectionMode !== _selection.SelectionMode.none &&
                  /*#__PURE__*/ React.createElement(_GroupSpacer.GroupSpacer, {
                    indentWidth: indentWidth,
                    count: 1,
                  }),
            /*#__PURE__*/ React.createElement(_GroupSpacer.GroupSpacer, {
              indentWidth: indentWidth,
              count: groupLevel,
            }),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: this._classNames.dropIcon,
              },
              /*#__PURE__*/ React.createElement(_Icon.Icon, {
                iconName: "Tag",
              })
            ),
            /*#__PURE__*/ React.createElement(
              "button",
              (0, _tslib.__assign)(
                {
                  type: "button",
                  className: this._classNames.expand,
                  onClick: this._onToggleCollapse,
                  "aria-expanded": !group.isCollapsed,
                  "aria-controls":
                    group && !group.isCollapsed ? groupedListId : undefined,
                  "data-rc-id": rcName
                    ? "".concat(rcName, ".").concat(group.key)
                    : undefined,
                },
                expandButtonProps
              ),
              /*#__PURE__*/ React.createElement(_Icon.Icon, {
                className: this._classNames.expandIsCollapsed,
                iconName:
                  expandButtonIcon ||
                  (isRTL ? "ChevronLeftMed" : "ChevronRightMed"),
                rcName: rcName
                  ? "".concat(rcName, ".").concat(group.key)
                  : undefined,
              })
            ),
            /*#__PURE__*/ React.createElement(_Icon.Icon, {
              className: "folder-icon",
              iconName: "FabricFolder",
              style: {
                fontSize: "16px",
                paddingLeft: "10px",
              },
              rcName: rcName
                ? "".concat(rcName, ".").concat(group.key)
                : undefined,
            }),
            onRenderTitle(this.props, this._onRenderTitle),
            isLoadingVisible &&
              /*#__PURE__*/ React.createElement(_Spinner.Spinner, {
                label: loadingText,
                rcName: rcName
                  ? "".concat(rcName, ".").concat(group.key)
                  : undefined,
              })
          )
      );
    };

    GroupHeaderBase.prototype._defaultCheckboxRender = function (
      checkboxProps
    ) {
      return /*#__PURE__*/ React.createElement(_utilities.Check, {
        checked: checkboxProps.checked,
      });
    };

    GroupHeaderBase.prototype._fastDefaultCheckboxRender = function (
      checkboxProps
    ) {
      return /*#__PURE__*/ React.createElement(FastCheck, {
        theme: checkboxProps.theme,
        checked: checkboxProps.checked,
      });
    };

    GroupHeaderBase.defaultProps = {
      expandButtonProps: {
        "aria-label": "expand collapse group",
      },
    };
    return GroupHeaderBase;
  })(React.Component);

exports.GroupHeaderBase = GroupHeaderBase;
var FastCheck = /*#__PURE__*/ React.memo(function (props) {
  return /*#__PURE__*/ React.createElement(_utilities.Check, {
    theme: props.theme,
    checked: props.checked,
    className: props.className,
    useFastIcons: true,
  });
});
