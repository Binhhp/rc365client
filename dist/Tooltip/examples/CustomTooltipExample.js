"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CustomToolTip = _interopRequireDefault(require("aod-dependencies/Tooltip/CustomToolTip"));

var _CustomCheckBox = _interopRequireDefault(require("../../Checkbox/CustomCheckBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <TooltipImport>
// </TooltipImport>
function App() {
  // <TooltipExample>
  return dom(_CustomToolTip.default // <TooltipDarkMode>
  , {
    darkMode: "dark" // </TooltipDarkMode>
    ,
    content: "Tooltip example"
  }, dom(_CustomCheckBox.default, {
    label: "Check box",
    darkMode: "dark"
  })); // </TooltipExample>
}

var _default = App;
exports.default = _default;