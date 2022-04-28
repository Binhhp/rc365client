"use strict";

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsRowFields = void 0;

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../@uifabric/utilities");

var _DetailsRow = require("./DetailsRow.styles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getCellText = function getCellText(item, column) {
  var value = item && column && column.fieldName ? item[column.fieldName] : "";

  if (value === null || value === undefined) {
    value = "";
  }

  if (typeof value === "boolean") {
    return value.toString();
  }

  return value;
};
/**
 * Component for rendering a row's cells in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */


var DetailsRowFields = /*#__PURE__*/React.memo(function (props) {
  var columns = props.columns,
      columnStartIndex = props.columnStartIndex,
      rowClassNames = props.rowClassNames,
      rcName = props.rcName,
      ariaSelected = props.ariaSelected,
      _a = props.cellStyleProps,
      cellStyleProps = _a === void 0 ? _DetailsRow.DEFAULT_CELL_STYLE_PROPS : _a,
      item = props.item,
      itemIndex = props.itemIndex,
      onRenderItemColumn = props.onRenderItemColumn,
      getCellValueKey = props.getCellValueKey,
      cellsByColumn = props.cellsByColumn,
      enableUpdateAnimations = props.enableUpdateAnimations;
  var cellValueKeysRef = React.useRef();
  var cellValueKeys = cellValueKeysRef.current || (cellValueKeysRef.current = {});
  return /*#__PURE__*/React.createElement("div", {
    className: rowClassNames.fields,
    "data-automationid": "DetailsRowFields",
    role: "presentation",
    "data-rc-id": rcName ? "row.".concat(rcName, ".").concat(itemIndex) : undefined
  }, columns.map(function (column, columnIndex) {
    var width = typeof column.calculatedWidth === "undefined" ? "auto" : column.calculatedWidth + cellStyleProps.cellLeftPadding + cellStyleProps.cellRightPadding + (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0);
    var _a = column.onRender,
        onRender = _a === void 0 ? onRenderItemColumn : _a,
        _b = column.getValueKey,
        getValueKey = _b === void 0 ? getCellValueKey : _b;
    var cellContentsRender = cellsByColumn && column.key in cellsByColumn ? cellsByColumn[column.key] : onRender ? onRender(item, itemIndex, column) : getCellText(item, column);
    var previousValueKey = cellValueKeys[column.key];
    var cellValueKey = enableUpdateAnimations && getValueKey ? getValueKey(item, itemIndex, column) : undefined;
    var showAnimation = false;

    if (cellValueKey !== undefined && previousValueKey !== undefined && cellValueKey !== previousValueKey) {
      showAnimation = true;
    }

    cellValueKeys[column.key] = cellValueKey; // generate a key that auto-dirties when content changes, to force the container to re-render,
    // to trigger animation

    var key = "" + column.key + (cellValueKey !== undefined ? "-" + cellValueKey : "");
    let {
      children
    } = cellContentsRender.props;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      role: column.isRowHeader ? "rowheader" : "gridcell",
      "aria-readonly": true,
      "aria-colindex": columnIndex + columnStartIndex + 1,
      className: (0, _utilities.css)(column.className, column.isMultiline && rowClassNames.isMultiline, column.isRowHeader && rowClassNames.isRowHeader, rowClassNames.cell, column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded, showAnimation && rowClassNames.cellAnimation),
      style: {
        width: width
      },
      "data-automationid": "DetailsRowCell",
      "data-automation-key": column.key,
      "data-rc-id": "col.".concat(column.key).concat(children && !column.isIconOnly ? ".".concat(children) : "", ".").concat(itemIndex),
      "aria-checked": ariaSelected ? "true" : "false"
    }, cellContentsRender);
  }));
}, function areEqual(prevProps, nextProps) {
  if (JSON.stringify(nextProps.item) === JSON.stringify(prevProps.item) && JSON.stringify(nextProps.columns) === JSON.stringify(prevProps.columns)) {
    return true;
  }

  return false;
});
exports.DetailsRowFields = DetailsRowFields;