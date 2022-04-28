"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListBasicExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _Announced = require("office-ui-fabric-react/lib/Announced");

var _TextField = require("office-ui-fabric-react/lib/TextField");

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

var _MarqueeSelection = require("office-ui-fabric-react/lib/MarqueeSelection");

var _Fabric = require("office-ui-fabric-react/lib/Fabric");

var _Styling = require("office-ui-fabric-react/lib/Styling");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var exampleChildClass = (0, _Styling.mergeStyles)({
  display: 'block',
  marginBottom: '10px'
});
var textFieldStyles = {
  root: {
    maxWidth: '300px'
  }
};

var DetailsListBasicExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListBasicExample, _super);

  function DetailsListBasicExample(props) {
    var _this = _super.call(this, props) || this;

    _this._onFilter = function (ev, text) {
      _this.setState({
        items: text ? _this._allItems.filter(function (i) {
          return i.name.toLowerCase().indexOf(text) > -1;
        }) : _this._allItems
      });
    };

    _this._onItemInvoked = function (item) {
      alert("Item invoked: " + item.name);
    };

    _this._selection = new _DetailsList.Selection({
      onSelectionChanged: function onSelectionChanged() {
        return _this.setState({
          selectionDetails: _this._getSelectionDetails()
        });
      }
    }); // Populate with items for demos.

    _this._allItems = [];

    for (var i = 0; i < 200; i++) {
      _this._allItems.push({
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
    _this.state = {
      items: _this._allItems,
      selectionDetails: _this._getSelectionDetails()
    };
    return _this;
  }

  DetailsListBasicExample.prototype.render = function () {
    var _a = this.state,
        items = _a.items,
        selectionDetails = _a.selectionDetails;
    return /*#__PURE__*/React.createElement(_Fabric.Fabric, null, /*#__PURE__*/React.createElement("div", {
      className: exampleChildClass
    }, selectionDetails), /*#__PURE__*/React.createElement(_Announced.Announced, {
      message: selectionDetails
    }), /*#__PURE__*/React.createElement(_TextField.TextField, {
      className: exampleChildClass,
      label: "Filter by name:",
      onChange: this._onFilter,
      styles: textFieldStyles
    }), /*#__PURE__*/React.createElement(_Announced.Announced, {
      message: "Number of items after filter applied: " + items.length + "."
    }), /*#__PURE__*/React.createElement(_MarqueeSelection.MarqueeSelection, {
      selection: this._selection
    }, /*#__PURE__*/React.createElement(_DetailsList.DetailsList, {
      items: items,
      columns: this._columns,
      setKey: "set",
      layoutMode: _DetailsList.DetailsListLayoutMode.justified,
      selection: this._selection,
      selectionPreservedOnEmptyClick: true,
      ariaLabelForSelectionColumn: "Toggle selection",
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      checkButtonAriaLabel: "Row checkbox",
      onItemInvoked: this._onItemInvoked
    })));
  };

  DetailsListBasicExample.prototype._getSelectionDetails = function () {
    var selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';

      case 1:
        return '1 item selected: ' + this._selection.getSelection()[0].name;

      default:
        return selectionCount + " items selected";
    }
  };

  return DetailsListBasicExample;
}(React.Component);

exports.DetailsListBasicExample = DetailsListBasicExample;