"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListCustomRowsExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

var _exampleData = require("@uifabric/example-data");

var _Styling = require("office-ui-fabric-react/lib/Styling");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var theme = (0, _Styling.getTheme)();

var DetailsListCustomRowsExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListCustomRowsExample, _super);

  function DetailsListCustomRowsExample(props) {
    var _this = _super.call(this, props) || this;

    _this._onRenderRow = function (props) {
      var customStyles = {};

      if (props) {
        if (props.itemIndex % 2 === 0) {
          // Every other row renders with a different background color
          customStyles.root = {
            backgroundColor: theme.palette.themeLighterAlt
          };
        }

        return /*#__PURE__*/React.createElement(_DetailsList.DetailsRow, (0, _tslib.__assign)({}, props, {
          styles: customStyles
        }));
      }

      return null;
    };

    _this._items = (0, _exampleData.createListItems)(500);
    return _this;
  }

  DetailsListCustomRowsExample.prototype.render = function () {
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsList, {
      items: this._items,
      setKey: "set",
      onRenderRow: this._onRenderRow,
      checkButtonAriaLabel: "Row checkbox"
    });
  };

  return DetailsListCustomRowsExample;
}(React.Component);

exports.DetailsListCustomRowsExample = DetailsListCustomRowsExample;