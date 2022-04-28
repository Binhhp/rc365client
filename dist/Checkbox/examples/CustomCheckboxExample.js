"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CustomCheckBox = _interopRequireDefault(require("aod-dependencies/Checkbox/CustomCheckBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <CheckBoxImport>
// </CheckBoxImport>
function App() {
  // <CheckBoxExample>
  return dom(_CustomCheckBox.default, {
    label: "Check box" //<CheckBoxDarkMode>
    ,
    darkMode: "dark" //</CheckBoxDarkMode>
    ,
    indeterminate: true,
    disabled: true,
    icon: {
      iconName: "Delete"
    }
  });
} //</CheckBoxExample>


var _default = App;
exports.default = _default;