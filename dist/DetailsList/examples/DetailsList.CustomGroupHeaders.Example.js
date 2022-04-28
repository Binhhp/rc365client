"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListCustomGroupHeadersExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _Link = require("office-ui-fabric-react/lib/Link");

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

var _exampleData = require("@uifabric/example-data");

var _Styling = require("office-ui-fabric-react/lib/Styling");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ROW_HEIGHT = 42; // from DEFAULT_ROW_HEIGHTS in DetailsRow.styles.ts

var GROUP_HEADER_AND_FOOTER_SPACING = 8;
var GROUP_HEADER_AND_FOOTER_BORDER_WIDTH = 1;
var GROUP_HEADER_HEIGHT = 95;
var GROUP_FOOTER_HEIGHT = GROUP_HEADER_AND_FOOTER_SPACING * 4 + GROUP_HEADER_AND_FOOTER_BORDER_WIDTH * 2;
var theme = (0, _Styling.getTheme)();
var classNames = (0, _Styling.mergeStyleSets)({
  headerAndFooter: {
    borderTop: GROUP_HEADER_AND_FOOTER_BORDER_WIDTH + "px solid " + theme.palette.neutralQuaternary,
    borderBottom: GROUP_HEADER_AND_FOOTER_BORDER_WIDTH + "px solid " + theme.palette.neutralQuaternary,
    padding: GROUP_HEADER_AND_FOOTER_SPACING,
    margin: GROUP_HEADER_AND_FOOTER_SPACING + "px 0",
    background: theme.palette.neutralLighterAlt,
    // Overlay the sizer bars
    position: 'relative',
    zIndex: 100
  },
  headerTitle: [theme.fonts.xLarge, {
    padding: '4px 0'
  }],
  headerLinkSet: {
    margin: '4px -8px'
  },
  headerLink: {
    margin: '0 8px'
  }
});
var ITEMS_PER_GROUP = 20;
var GROUP_COUNT = 20;

var DetailsListCustomGroupHeadersExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListCustomGroupHeadersExample, _super);

  function DetailsListCustomGroupHeadersExample(props) {
    var _this = _super.call(this, props) || this;

    _this._onRenderDetailsHeader = function (props) {
      if (props) {
        return /*#__PURE__*/React.createElement(_DetailsList.DetailsHeader, (0, _tslib.__assign)({}, props, {
          ariaLabelForToggleAllGroupsButton: 'Toggle selection'
        }));
      }

      return null;
    };

    _this._onRenderGroupHeader = function (props) {
      if (props) {
        return /*#__PURE__*/React.createElement("div", {
          className: classNames.headerAndFooter
        }, /*#__PURE__*/React.createElement("div", {
          className: classNames.headerTitle
        }, "Custom header for " + props.group.name), /*#__PURE__*/React.createElement("div", {
          className: classNames.headerLinkSet
        }, /*#__PURE__*/React.createElement(_Link.Link, {
          className: classNames.headerLink,
          onClick: _this._onToggleSelectGroup(props)
        }, props.selected ? 'Remove selection' : 'Select group'), /*#__PURE__*/React.createElement(_Link.Link, {
          className: classNames.headerLink,
          onClick: _this._onToggleCollapse(props)
        }, props.group.isCollapsed ? 'Expand group' : 'Collapse group')));
      }

      return null;
    };

    _this._onRenderGroupFooter = function (props) {
      if (props) {
        return /*#__PURE__*/React.createElement("div", {
          className: classNames.headerAndFooter
        }, /*#__PURE__*/React.createElement("em", null, "Custom footer for " + props.group.name));
      }

      return null;
    };

    _this._getGroupTotalRowHeight = function (group) {
      return group.isCollapsed ? 0 : ROW_HEIGHT * group.count;
    };

    _this._getGroupHeight = function (group, _groupIndex) {
      return GROUP_HEADER_HEIGHT + GROUP_FOOTER_HEIGHT + _this._getGroupTotalRowHeight(group);
    };

    _this._items = (0, _exampleData.createListItems)(500);
    _this._groups = (0, _exampleData.createGroups)(GROUP_COUNT, 1, 0, ITEMS_PER_GROUP);
    return _this;
  }

  DetailsListCustomGroupHeadersExample.prototype.render = function () {
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsList, {
      items: this._items,
      groups: this._groups,
      groupProps: {
        onRenderHeader: this._onRenderGroupHeader,
        onRenderFooter: this._onRenderGroupFooter
      },
      getGroupHeight: this._getGroupHeight,
      ariaLabelForSelectionColumn: "Toggle selection",
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      checkButtonAriaLabel: "Row checkbox",
      onRenderDetailsHeader: this._onRenderDetailsHeader
    });
  };

  DetailsListCustomGroupHeadersExample.prototype._onToggleSelectGroup = function (props) {
    return function () {
      props.onToggleSelectGroup(props.group);
    };
  };

  DetailsListCustomGroupHeadersExample.prototype._onToggleCollapse = function (props) {
    return function () {
      props.onToggleCollapse(props.group);
    };
  };

  return DetailsListCustomGroupHeadersExample;
}(React.Component);

exports.DetailsListCustomGroupHeadersExample = DetailsListCustomGroupHeadersExample;