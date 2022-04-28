"use strict";

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListGroupedLargeExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DetailsListGroupedLargeExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListGroupedLargeExample, _super);

  function DetailsListGroupedLargeExample(props) {
    var _this = _super.call(this, props) || this;

    _this._items = [];

    for (var i = 0; i < 1000; i++) {
      _this._items.push({
        key: i.toString(),
        name: 'Item ' + i,
        value: i.toString()
      });
    }

    _this._groups = [];

    for (var i = 0; i < 10; i++) {
      _this._groups.push({
        key: i.toString(),
        name: i.toString(),
        startIndex: i * 100,
        count: 100,
        level: 0
      });
    }

    _this._columns = [{
      key: 'name',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }, {
      key: 'value',
      name: 'Value',
      fieldName: 'value',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }];
    return _this;
  }

  DetailsListGroupedLargeExample.prototype.render = function () {
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsList, {
      items: this._items,
      groups: this._groups,
      columns: this._columns,
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      ariaLabelForSelectionColumn: "Toggle selection",
      checkButtonAriaLabel: "Row checkbox",
      onRenderDetailsHeader: this._onRenderDetailsHeader
    });
  };

  DetailsListGroupedLargeExample.prototype._onRenderDetailsHeader = function (props) {
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsHeader, (0, _tslib.__assign)({}, props, {
      ariaLabelForToggleAllGroupsButton: 'Toggle selection'
    }));
  };

  return DetailsListGroupedLargeExample;
}(React.Component);

exports.DetailsListGroupedLargeExample = DetailsListGroupedLargeExample;