"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = exports.CHECK_CELL_WIDTH = void 0;

var _styling = require("../@uifabric/styling");

var _DetailsRow = require("./DetailsRow.styles");

var _DetailsHeader = require("./DetailsHeader.styles");

var _Check = require("../@uifabric/utilities/Check/Check.styles");

var GlobalClassNames = {
  root: "ms-DetailsRow-check",
  isDisabled: "ms-DetailsRow-check--isDisabled",
  isHeader: "ms-DetailsRow-check--isHeader"
};
var CHECK_CELL_WIDTH = 48;
exports.CHECK_CELL_WIDTH = CHECK_CELL_WIDTH;

var getStyles = function getStyles(props) {
  var theme = props.theme,
      className = props.className,
      isHeader = props.isHeader,
      selected = props.selected,
      anySelected = props.anySelected,
      canSelect = props.canSelect,
      compact = props.compact,
      isVisible = props.isVisible;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  var rowHeight = _DetailsRow.DEFAULT_ROW_HEIGHTS.rowHeight,
      compactRowHeight = _DetailsRow.DEFAULT_ROW_HEIGHTS.compactRowHeight;
  var height = isHeader ? _DetailsHeader.HEADER_HEIGHT : compact ? compactRowHeight : rowHeight;
  var isCheckVisible = isVisible || selected || anySelected;
  return {
    root: [classNames.root, className],
    check: [!canSelect && classNames.isDisabled, isHeader && classNames.isHeader, (0, _styling.getFocusStyle)(theme), theme.fonts.small, _Check.CheckGlobalClassNames.checkHost, {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "default",
      boxSizing: "border-box",
      verticalAlign: "top",
      background: "none",
      backgroundColor: "transparent",
      border: "none",
      opacity: isCheckVisible ? 1 : 0,
      height: height,
      width: CHECK_CELL_WIDTH,
      padding: 0,
      margin: 0
    }],
    isDisabled: []
  };
};

exports.getStyles = getStyles;