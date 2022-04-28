"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupedListBasicExample = void 0;

var React = _interopRequireWildcard(require("react"));

var _GroupedList = require("office-ui-fabric-react/lib/GroupedList");

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

var _FocusZone = require("office-ui-fabric-react/lib/FocusZone");

var _Selection = require("office-ui-fabric-react/lib/Selection");

var _Toggle = require("office-ui-fabric-react/lib/Toggle");

var _reactHooks = require("@uifabric/react-hooks");

var _exampleData = require("@uifabric/example-data");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var toggleStyles = {
  root: {
    marginBottom: '20px'
  }
};
var groupCount = 3;
var groupDepth = 3;
var items = (0, _exampleData.createListItems)(Math.pow(groupCount, groupDepth + 1));
var columns = Object.keys(items[0]).slice(0, 3).map(function (key) {
  return {
    key: key,
    name: key,
    fieldName: key,
    minWidth: 300
  };
});
var groups = (0, _exampleData.createGroups)(groupCount, groupDepth, 0, groupCount);

var GroupedListBasicExample = function GroupedListBasicExample() {
  var _a = (0, _reactHooks.useBoolean)(false),
      isCompactMode = _a[0],
      toggleIsCompactMode = _a[1].toggle;

  var selection = (0, _reactHooks.useConst)(function () {
    var s = new _Selection.Selection();
    s.setItems(items, true);
    return s;
  });

  var onRenderCell = function onRenderCell(nestingDepth, item, itemIndex) {
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsRow, {
      columns: columns,
      groupNestingDepth: nestingDepth,
      item: item,
      itemIndex: itemIndex,
      selection: selection,
      selectionMode: _Selection.SelectionMode.multiple,
      compact: isCompactMode
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Toggle.Toggle, {
    label: "Enable compact mode",
    checked: isCompactMode,
    onChange: toggleIsCompactMode,
    onText: "Compact",
    offText: "Normal",
    styles: toggleStyles
  }), /*#__PURE__*/React.createElement(_FocusZone.FocusZone, null, /*#__PURE__*/React.createElement(_Selection.SelectionZone, {
    selection: selection,
    selectionMode: _Selection.SelectionMode.multiple
  }, /*#__PURE__*/React.createElement(_GroupedList.GroupedList, {
    items: items,
    onRenderCell: onRenderCell,
    selection: selection,
    selectionMode: _Selection.SelectionMode.multiple,
    groups: groups,
    compact: isCompactMode
  }))));
};

exports.GroupedListBasicExample = GroupedListBasicExample;