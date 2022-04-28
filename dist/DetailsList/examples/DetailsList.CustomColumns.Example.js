"use strict";

require("core-js/modules/es.array.sort");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListCustomColumnsExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _exampleData = require("@uifabric/example-data");

var _Link = require("office-ui-fabric-react/lib/Link");

var _Image = require("office-ui-fabric-react/lib/Image");

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

var _Styling = require("office-ui-fabric-react/lib/Styling");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DetailsListCustomColumnsExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListCustomColumnsExample, _super);

  function DetailsListCustomColumnsExample(props) {
    var _this = _super.call(this, props) || this;

    _this._onColumnClick = function (event, column) {
      var columns = _this.state.columns;
      var sortedItems = _this.state.sortedItems;
      var isSortedDescending = column.isSortedDescending; // If we've sorted this column, flip it.

      if (column.isSorted) {
        isSortedDescending = !isSortedDescending;
      } // Sort the items.


      sortedItems = _copyAndSort(sortedItems, column.fieldName, isSortedDescending); // Reset the items and columns to match the state.

      _this.setState({
        sortedItems: sortedItems,
        columns: columns.map(function (col) {
          col.isSorted = col.key === column.key;

          if (col.isSorted) {
            col.isSortedDescending = isSortedDescending;
          }

          return col;
        })
      });
    };

    var items = (0, _exampleData.createListItems)(500);
    _this.state = {
      sortedItems: items,
      columns: _buildColumns(items)
    };
    return _this;
  }

  DetailsListCustomColumnsExample.prototype.render = function () {
    var _a = this.state,
        sortedItems = _a.sortedItems,
        columns = _a.columns;
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsList, {
      items: sortedItems,
      setKey: "set",
      columns: columns,
      onRenderItemColumn: _renderItemColumn,
      onColumnHeaderClick: this._onColumnClick,
      onItemInvoked: this._onItemInvoked,
      onColumnHeaderContextMenu: this._onColumnHeaderContextMenu,
      ariaLabelForSelectionColumn: "Toggle selection",
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      checkButtonAriaLabel: "Row checkbox"
    });
  };

  DetailsListCustomColumnsExample.prototype._onColumnHeaderContextMenu = function (column, ev) {
    console.log("column " + column.key + " contextmenu opened.");
  };

  DetailsListCustomColumnsExample.prototype._onItemInvoked = function (item, index) {
    alert("Item " + item.name + " at index " + index + " has been invoked.");
  };

  return DetailsListCustomColumnsExample;
}(React.Component);

exports.DetailsListCustomColumnsExample = DetailsListCustomColumnsExample;

function _buildColumns(items) {
  var columns = (0, _DetailsList.buildColumns)(items);
  var thumbnailColumn = columns.filter(function (column) {
    return column.name === 'thumbnail';
  })[0]; // Special case one column's definition.

  thumbnailColumn.name = '';
  thumbnailColumn.maxWidth = 50;
  thumbnailColumn.ariaLabel = 'Thumbnail';
  return columns;
}

function _renderItemColumn(item, index, column) {
  var fieldContent = item[column.fieldName];

  switch (column.key) {
    case 'thumbnail':
      return /*#__PURE__*/React.createElement(_Image.Image, {
        src: fieldContent,
        width: 50,
        height: 50,
        imageFit: _Image.ImageFit.cover
      });

    case 'name':
      return /*#__PURE__*/React.createElement(_Link.Link, {
        href: "#"
      }, fieldContent);

    case 'color':
      return /*#__PURE__*/React.createElement("span", {
        "data-selection-disabled": true,
        className: (0, _Styling.mergeStyles)({
          color: fieldContent,
          height: '100%',
          display: 'block'
        })
      }, fieldContent);

    default:
      return /*#__PURE__*/React.createElement("span", null, fieldContent);
  }
}

function _copyAndSort(items, columnKey, isSortedDescending) {
  var key = columnKey;
  return items.slice(0).sort(function (a, b) {
    return (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1;
  });
}