"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupedListCustomExample = void 0;

var React = _interopRequireWildcard(require("react"));

var _GroupedList = require("office-ui-fabric-react/lib/GroupedList");

var _Link = require("office-ui-fabric-react/lib/Link");

var _exampleData = require("@uifabric/example-data");

var _Styling = require("office-ui-fabric-react/lib/Styling");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var theme = (0, _Styling.getTheme)();
var headerAndFooterStyles = {
  minWidth: 300,
  minHeight: 40,
  lineHeight: 40,
  paddingLeft: 16
};
var classNames = (0, _Styling.mergeStyleSets)({
  header: [headerAndFooterStyles, theme.fonts.xLarge],
  footer: [headerAndFooterStyles, theme.fonts.large],
  name: {
    display: 'inline-block',
    overflow: 'hidden',
    height: 24,
    cursor: 'default',
    padding: 8,
    boxSizing: 'border-box',
    verticalAlign: 'top',
    background: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    paddingLeft: 32
  }
});

var onRenderHeader = function onRenderHeader(props) {
  var toggleCollapse = function toggleCollapse() {
    props.onToggleCollapse(props.group);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classNames.header
  }, "This is a custom header for ", props.group.name, "\u00A0 (", /*#__PURE__*/React.createElement(_Link.Link, {
    onClick: toggleCollapse
  }, props.group.isCollapsed ? 'Expand' : 'Collapse'), ")");
};

var onRenderCell = function onRenderCell(nestingDepth, item, itemIndex) {
  return /*#__PURE__*/React.createElement("div", {
    role: "row",
    "data-selection-index": itemIndex
  }, /*#__PURE__*/React.createElement("span", {
    role: "cell",
    className: classNames.name
  }, item.name));
};

var onRenderFooter = function onRenderFooter(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: classNames.footer
  }, "This is a custom footer for ", props.group.name);
};

var groupedListProps = {
  onRenderHeader: onRenderHeader,
  onRenderFooter: onRenderFooter
};
var items = (0, _exampleData.createListItems)(20);
var groups = (0, _exampleData.createGroups)(4, 0, 0, 5);

var GroupedListCustomExample = function GroupedListCustomExample() {
  return /*#__PURE__*/React.createElement(_GroupedList.GroupedList, {
    items: items,
    onRenderCell: onRenderCell,
    groupProps: groupedListProps,
    groups: groups
  });
};

exports.GroupedListCustomExample = GroupedListCustomExample;