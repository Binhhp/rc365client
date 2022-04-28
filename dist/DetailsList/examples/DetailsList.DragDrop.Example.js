"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListDragDropExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _Link = require("office-ui-fabric-react/lib/Link");

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

var _MarqueeSelection = require("office-ui-fabric-react/lib/MarqueeSelection");

var _exampleData = require("@uifabric/example-data");

var _TextField = require("office-ui-fabric-react/lib/TextField");

var _Toggle = require("office-ui-fabric-react/lib/Toggle");

var _Styling = require("office-ui-fabric-react/lib/Styling");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var theme = (0, _Styling.getTheme)();
var margin = '0 30px 20px 0';
var dragEnterClass = (0, _Styling.mergeStyles)({
  backgroundColor: theme.palette.neutralLight
});
var controlWrapperClass = (0, _Styling.mergeStyles)({
  display: 'flex',
  flexWrap: 'wrap'
});
var textFieldStyles = {
  root: {
    margin: margin
  },
  fieldGroup: {
    maxWidth: '100px'
  }
};
var togglesStyles = {
  root: {
    margin: margin
  }
};

var DetailsListDragDropExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListDragDropExample, _super);

  function DetailsListDragDropExample(props) {
    var _this = _super.call(this, props) || this;

    _this._handleColumnReorder = function (draggedIndex, targetIndex) {
      var draggedItems = _this.state.columns[draggedIndex];
      var newColumns = (0, _tslib.__spreadArrays)(_this.state.columns); // insert before the dropped item

      newColumns.splice(draggedIndex, 1);
      newColumns.splice(targetIndex, 0, draggedItems);

      _this.setState({
        columns: newColumns
      });
    };

    _this._onChangeStartCountText = function (event, text) {
      _this.setState({
        frozenColumnCountFromStart: text
      });
    };

    _this._onChangeEndCountText = function (event, text) {
      _this.setState({
        frozenColumnCountFromEnd: text
      });
    };

    _this._onChangeColumnReorderEnabled = function (ev, checked) {
      _this.setState({
        isColumnReorderEnabled: checked
      });
    };

    _this._onItemInvoked = function (item) {
      alert("Item invoked: " + item.name);
    };

    _this._onRenderItemColumn = function (item, index, column) {
      var key = column.key;

      if (key === 'name') {
        return /*#__PURE__*/React.createElement(_Link.Link, {
          "data-selection-invoke": true
        }, item[key]);
      }

      return String(item[key]);
    };

    _this._selection = new _DetailsList.Selection();
    _this._dragDropEvents = _this._getDragDropEvents();
    _this._draggedIndex = -1;
    var items = (0, _exampleData.createListItems)(10, 0);
    _this.state = {
      items: items,
      columns: (0, _DetailsList.buildColumns)(items, true),
      isColumnReorderEnabled: true,
      frozenColumnCountFromStart: '1',
      frozenColumnCountFromEnd: '0'
    };
    return _this;
  }

  DetailsListDragDropExample.prototype.render = function () {
    var _a = this.state,
        items = _a.items,
        columns = _a.columns,
        isColumnReorderEnabled = _a.isColumnReorderEnabled,
        frozenColumnCountFromStart = _a.frozenColumnCountFromStart,
        frozenColumnCountFromEnd = _a.frozenColumnCountFromEnd;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: controlWrapperClass
    }, /*#__PURE__*/React.createElement(_Toggle.Toggle, {
      label: "Enable column reorder",
      checked: isColumnReorderEnabled,
      onChange: this._onChangeColumnReorderEnabled,
      onText: "Enabled",
      offText: "Disabled",
      styles: togglesStyles
    }), /*#__PURE__*/React.createElement(_TextField.TextField, {
      label: "Number of left frozen columns",
      onGetErrorMessage: this._validateNumber,
      value: frozenColumnCountFromStart,
      onChange: this._onChangeStartCountText,
      styles: textFieldStyles
    }), /*#__PURE__*/React.createElement(_TextField.TextField, {
      label: "Number of right frozen columns",
      onGetErrorMessage: this._validateNumber,
      value: frozenColumnCountFromEnd,
      onChange: this._onChangeEndCountText,
      styles: textFieldStyles
    })), /*#__PURE__*/React.createElement(_MarqueeSelection.MarqueeSelection, {
      selection: this._selection
    }, /*#__PURE__*/React.createElement(_DetailsList.DetailsList, {
      setKey: "items",
      items: items,
      columns: columns,
      selection: this._selection,
      selectionPreservedOnEmptyClick: true,
      onItemInvoked: this._onItemInvoked,
      onRenderItemColumn: this._onRenderItemColumn,
      dragDropEvents: this._dragDropEvents,
      columnReorderOptions: this.state.isColumnReorderEnabled ? this._getColumnReorderOptions() : undefined,
      ariaLabelForSelectionColumn: "Toggle selection",
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      checkButtonAriaLabel: "Row checkbox"
    })));
  };

  DetailsListDragDropExample.prototype._getColumnReorderOptions = function () {
    return {
      frozenColumnCountFromStart: parseInt(this.state.frozenColumnCountFromStart, 10),
      frozenColumnCountFromEnd: parseInt(this.state.frozenColumnCountFromEnd, 10),
      handleColumnReorder: this._handleColumnReorder
    };
  };

  DetailsListDragDropExample.prototype._validateNumber = function (value) {
    return isNaN(Number(value)) ? "The value should be a number, actual is " + value + "." : '';
  };

  DetailsListDragDropExample.prototype._getDragDropEvents = function () {
    var _this = this;

    return {
      canDrop: function canDrop(dropContext, dragContext) {
        return true;
      },
      canDrag: function canDrag(item) {
        return true;
      },
      onDragEnter: function onDragEnter(item, event) {
        // return string is the css classes that will be added to the entering element.
        return dragEnterClass;
      },
      onDragLeave: function onDragLeave(item, event) {
        return;
      },
      onDrop: function onDrop(item, event) {
        if (_this._draggedItem) {
          _this._insertBeforeItem(item);
        }
      },
      onDragStart: function onDragStart(item, itemIndex, selectedItems, event) {
        _this._draggedItem = item;
        _this._draggedIndex = itemIndex;
      },
      onDragEnd: function onDragEnd(item, event) {
        _this._draggedItem = undefined;
        _this._draggedIndex = -1;
      }
    };
  };

  DetailsListDragDropExample.prototype._insertBeforeItem = function (item) {
    var draggedItems = this._selection.isIndexSelected(this._draggedIndex) ? this._selection.getSelection() : [this._draggedItem];
    var insertIndex = this.state.items.indexOf(item);
    var items = this.state.items.filter(function (itm) {
      return draggedItems.indexOf(itm) === -1;
    });
    items.splice.apply(items, (0, _tslib.__spreadArrays)([insertIndex, 0], draggedItems));
    this.setState({
      items: items
    });
  };

  return DetailsListDragDropExample;
}(React.Component);

exports.DetailsListDragDropExample = DetailsListDragDropExample;