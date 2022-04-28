"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListGroupedExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _officeUiFabricReact = require("office-ui-fabric-react");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var margin = '0 20px 20px 0';
var controlWrapperClass = (0, _officeUiFabricReact.mergeStyles)({
  display: 'flex',
  flexWrap: 'wrap'
});
var toggleStyles = {
  root: {
    margin: margin
  },
  label: {
    marginLeft: 10
  }
};
var addItemButtonStyles = {
  root: {
    margin: margin
  }
};
var _blueGroupIndex = 2;

var DetailsListGroupedExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListGroupedExample, _super);

  function DetailsListGroupedExample(props) {
    var _this = _super.call(this, props) || this;

    _this._root = /*#__PURE__*/React.createRef();

    _this._addItem = function () {
      var items = _this.state.items;
      var groups = (0, _tslib.__spreadArrays)(_this.state.groups);
      groups[_blueGroupIndex].count++;

      _this.setState({
        items: items.concat([{
          key: 'item-' + items.length,
          name: 'New item ' + items.length,
          color: 'blue'
        }]),
        groups: groups
      }, function () {
        if (_this._root.current) {
          _this._root.current.focusIndex(items.length, true);
        }
      });
    };

    _this._onShowItemIndexInViewChanged = function (event, checked) {
      _this.setState({
        showItemIndexInView: checked
      });
    };

    _this._onChangeCompactMode = function (ev, checked) {
      _this.setState({
        isCompactMode: checked
      });
    };

    _this.state = {
      items: [{
        key: 'a',
        name: 'a',
        color: 'red'
      }, {
        key: 'b',
        name: 'b',
        color: 'red'
      }, {
        key: 'c',
        name: 'c',
        color: 'blue'
      }, {
        key: 'd',
        name: 'd',
        color: 'blue'
      }, {
        key: 'e',
        name: 'e',
        color: 'blue'
      }],
      // This is based on the definition of items
      groups: [{
        key: 'groupred0',
        name: 'Color: "red"',
        startIndex: 0,
        count: 2,
        level: 0
      }, {
        key: 'groupgreen2',
        name: 'Color: "green"',
        startIndex: 2,
        count: 0,
        level: 0
      }, {
        key: 'groupblue2',
        name: 'Color: "blue"',
        startIndex: 2,
        count: 3,
        level: 0
      }],
      showItemIndexInView: false,
      isCompactMode: false
    };
    _this._columns = [{
      key: 'name',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }, {
      key: 'color',
      name: 'Color',
      fieldName: 'color',
      minWidth: 100,
      maxWidth: 200
    }];
    return _this;
  }

  DetailsListGroupedExample.prototype.componentWillUnmount = function () {
    if (this.state.showItemIndexInView) {
      var itemIndexInView = this._root.current.getStartItemIndexInView();

      alert('first item index that was in view: ' + itemIndexInView);
    }
  };

  DetailsListGroupedExample.prototype.render = function () {
    var _a = this.state,
        items = _a.items,
        groups = _a.groups,
        isCompactMode = _a.isCompactMode;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: controlWrapperClass
    }, /*#__PURE__*/React.createElement(_officeUiFabricReact.DefaultButton, {
      onClick: this._addItem,
      text: "Add an item",
      styles: addItemButtonStyles
    }), /*#__PURE__*/React.createElement(_officeUiFabricReact.Toggle, {
      label: "Compact mode",
      inlineLabel: true,
      checked: isCompactMode,
      onChange: this._onChangeCompactMode,
      styles: toggleStyles
    }), /*#__PURE__*/React.createElement(_officeUiFabricReact.Toggle, {
      label: "Show index of first item in view when unmounting",
      inlineLabel: true,
      checked: this.state.showItemIndexInView,
      onChange: this._onShowItemIndexInViewChanged,
      styles: toggleStyles
    })), /*#__PURE__*/React.createElement(_officeUiFabricReact.DetailsList, {
      componentRef: this._root,
      items: items,
      groups: groups,
      columns: this._columns,
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      ariaLabelForSelectionColumn: "Toggle selection",
      checkButtonAriaLabel: "Row checkbox",
      onRenderDetailsHeader: this._onRenderDetailsHeader,
      groupProps: {
        showEmptyGroups: true
      },
      onRenderItemColumn: this._onRenderColumn,
      compact: isCompactMode
    }));
  };

  DetailsListGroupedExample.prototype._onRenderDetailsHeader = function (props, _defaultRender) {
    return /*#__PURE__*/React.createElement(_officeUiFabricReact.DetailsHeader, (0, _tslib.__assign)({}, props, {
      ariaLabelForToggleAllGroupsButton: 'Expand collapse groups'
    }));
  };

  DetailsListGroupedExample.prototype._onRenderColumn = function (item, index, column) {
    var value = item && column && column.fieldName ? item[column.fieldName] || '' : '';
    return /*#__PURE__*/React.createElement("div", {
      "data-is-focusable": true
    }, value);
  };

  return DetailsListGroupedExample;
}(React.Component);

exports.DetailsListGroupedExample = DetailsListGroupedExample;