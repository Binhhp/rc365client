"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CustomDropdown = _interopRequireDefault(require("aod-dependencies/Dropdown/CustomDropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <DropdownImport>
const options = [{
  key: "option1",
  text: "option1option1option1option1option1option1option1option1option1option1option1option1"
}, {
  key: "option2",
  text: "option2",
  disabled: true
}, {
  key: "option3",
  text: "option3"
}];

function App() {
  // <DropdownExample>
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "300px"
    }
  }, /*#__PURE__*/_react.default.createElement(_CustomDropdown.default, {
    placeholder: "Select an option",
    label: "Custom dropdown example",
    options: options // <DropdownDarkMode>
    ,
    darkMode: "dark" // </DropdownDarkMode>
    //<DropdownMultipleSelect>
    ,
    multiSelect: true //</DropdownMultipleSelect>

  }));
} //</DropdownExample>


var _default = App;
exports.default = _default;