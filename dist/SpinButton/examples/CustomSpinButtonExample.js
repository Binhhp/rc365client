"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CustomSpinButton = _interopRequireDefault(require("aod-dependencies/SpinButton/CustomSpinButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//<SpinButtonImport>
//</SpinButtonImport>
function App() {
  // <SpinButtonExample>
  return dom("div", null, dom(_CustomSpinButton.default, {
    defaultValue: "0",
    label: "Basic SpinButton:",
    min: 0,
    max: 100,
    step: 1 //<SpinButtonDarkMode>
    ,
    darkMode: "dark" //</SpinButtonDarkMode>
    ,
    iconProps: {
      iconName: "IncreaseIndentLegacy"
    }
  })); // </SpinButtonExample>
}

var _default = App;
exports.default = _default;