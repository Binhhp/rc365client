"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListCustomFooterExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DetailsListCustomFooterExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListCustomFooterExample, _super);

  function DetailsListCustomFooterExample(props) {
    var _this = _super.call(this, props) || this;

    _this._items = [];

    for (var i = 0; i < 5; i++) {
      _this._items.push({
        key: i,
        name: 'Item ' + i,
        value: i
      });
    }

    _this._columns = [{
      key: 'column1',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }, {
      key: 'column2',
      name: 'Value',
      fieldName: 'value',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }];
    return _this;
  }

  DetailsListCustomFooterExample.prototype.render = function () {
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsList, {
      items: this._items,
      columns: this._columns,
      setKey: "set",
      layoutMode: _DetailsList.DetailsListLayoutMode.justified,
      selectionPreservedOnEmptyClick: true,
      ariaLabelForSelectionColumn: "Toggle selection",
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      checkButtonAriaLabel: "Row checkbox",
      onRenderDetailsFooter: this._onRenderDetailsFooter
    });
  };

  DetailsListCustomFooterExample.prototype._onRenderDetailsFooter = function (detailsFooterProps) {
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsRow, (0, _tslib.__assign)({}, detailsFooterProps, {
      columns: detailsFooterProps.columns,
      item: {},
      itemIndex: -1,
      groupNestingDepth: detailsFooterProps.groupNestingDepth,
      selectionMode: _DetailsList.SelectionMode.single,
      selection: detailsFooterProps.selection,
      onRenderItemColumn: _renderDetailsFooterItemColumn,
      onRenderCheck: _onRenderCheckForFooterRow
    }));
  };

  return DetailsListCustomFooterExample;
}(React.Component);

exports.DetailsListCustomFooterExample = DetailsListCustomFooterExample;

var _renderDetailsFooterItemColumn = function _renderDetailsFooterItemColumn(item, index, column) {
  if (column) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, column.name));
  }

  return undefined;
};

var detailsRowCheckStyles = {
  root: {
    visibility: 'hidden'
  }
};

var _onRenderCheckForFooterRow = function _onRenderCheckForFooterRow(props) {
  return /*#__PURE__*/React.createElement(_DetailsList.DetailsRowCheck, (0, _tslib.__assign)({}, props, {
    styles: detailsRowCheckStyles,
    selected: true
  }));
};