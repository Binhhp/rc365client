"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupedListCustomCheckboxExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _GroupedList = require("office-ui-fabric-react/lib/GroupedList");

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

var _FocusZone = require("office-ui-fabric-react/lib/FocusZone");

var _Selection = require("office-ui-fabric-react/lib/Selection");

var _Toggle = require("office-ui-fabric-react/lib/Toggle");

var _exampleData = require("@uifabric/example-data");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var groupCount = 3;
var groupDepth = 1;

var GroupedListCustomCheckboxExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(GroupedListCustomCheckboxExample, _super);

  function GroupedListCustomCheckboxExample(props) {
    var _this = _super.call(this, props) || this;

    _this._onRenderHeader = function (props) {
      return /*#__PURE__*/React.createElement(_GroupedList.GroupHeader, (0, _tslib.__assign)({
        onRenderGroupHeaderCheckbox: _this._onRenderGroupHeaderCheckbox
      }, props));
    };

    _this._onRenderGroupHeaderCheckbox = function (props) {
      return /*#__PURE__*/React.createElement(_Toggle.Toggle, {
        checked: props.checked
      });
    };

    _this._onRenderCell = function (nestingDepth, item, itemIndex) {
      return /*#__PURE__*/React.createElement(_DetailsList.DetailsRow, {
        columns: _this._columns,
        groupNestingDepth: nestingDepth,
        item: item,
        itemIndex: itemIndex,
        selection: _this._selection,
        selectionMode: _Selection.SelectionMode.multiple
      });
    };

    _this._items = (0, _exampleData.createListItems)(Math.pow(groupCount, groupDepth + 1));
    _this._columns = Object.keys(_this._items[0]).slice(0, 3).map(function (key) {
      return {
        key: key,
        name: key,
        fieldName: key,
        minWidth: 300
      };
    });
    _this._groups = (0, _exampleData.createGroups)(groupCount, groupDepth, 0, groupCount);
    _this._selection = new _Selection.Selection();

    _this._selection.setItems(_this._items);

    _this.state = {};
    return _this;
  }

  GroupedListCustomCheckboxExample.prototype.render = function () {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_FocusZone.FocusZone, null, /*#__PURE__*/React.createElement(_Selection.SelectionZone, {
      selection: this._selection,
      selectionMode: _Selection.SelectionMode.multiple
    }, /*#__PURE__*/React.createElement(_GroupedList.GroupedList, {
      items: this._items,
      onRenderCell: this._onRenderCell,
      selection: this._selection,
      selectionMode: _Selection.SelectionMode.multiple,
      groups: this._groups,
      groupProps: {
        onRenderHeader: this._onRenderHeader
      }
    }))));
  };

  return GroupedListCustomCheckboxExample;
}(React.Component);

exports.GroupedListCustomCheckboxExample = GroupedListCustomCheckboxExample;