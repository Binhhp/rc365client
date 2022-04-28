"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./App.css");

var _CustomChoiceGroup = _interopRequireDefault(require("aod-dependencies/ChoiceGroup/CustomChoiceGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <ChoiceGroupImport>
function App() {
  const optionsChoiceGroup = [{
    key: "A",
    text: "Option A"
  }, {
    key: "B",
    text: "Option B",
    disabled: true
  }, {
    key: "C",
    text: "Option C"
  }, {
    key: "D",
    text: "Option D"
  }]; // <ChoiceGroupExample>

  return dom("div", null, dom(_CustomChoiceGroup.default, {
    options: optionsChoiceGroup,
    defaultSelectedKey: "B",
    label: "Pick one" // <ChoiceGroupDarkMode>
    ,
    darkMode: "dark" // </ChoiceGroupDarkMode>

  }));
} //</ChoiceGroupExample>


var _default = App;
exports.default = _default;