"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));
var dom = _react.createElement;

var _Button = _interopRequireDefault(require("aod-dependencies/Button"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// <ButtonImport>
// </ButtonImport>
function App() {
  return (
    // <ButtonExample>
    dom(
      "div",
      {
        className: "App",
      },
      dom(_Button.default, {
        text: "Button",
        onClick: () => console.log("click"), // <ButtonDarkMode>
        darkMode: "dark", // </ButtonDarkMode>
        disabled: false, // <ButtonType>
        type: "Primary", // </ButtonType>
        // <ButtonIcon>
        icon: "Delete", // </ButtonIcon>
      })
    ) // </ButtonExample>
  );
}

var _default = App;
exports.default = _default;
