"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.SpinButtonWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _templateObject() {
  const data = _taggedTemplateLiteral([
    "\n  i {\n    color: ",
    ";\n  }\n  .ms-Button {\n    cursor: pointer;\n    border-radius: 0;\n    background-color: ",
    ";\n    &:hover {\n      background-color: ",
    ";\n    }\n  }\n  .is-disabled {\n    opacity: 1;\n    background-color: ",
    ";\n  }\n  .ms-spinButton-input {\n    border-radius: 0;\n    background-color: ",
    ";\n    color: ",
    ";\n    &:disabled {\n      color: ",
    ";\n      background-color: ",
    ";\n    }\n  }\n  .ms-Label {\n    color: ",
    ";\n    font-weight: 600;\n    font-size: 14px;\n  }\n  .label-wrapper {\n    padding-bottom: 15px;\n  }\n  .input-wrapper {\n    border-color: ",
    ";\n    opacity: ",
    ";\n    border-radius: 0;\n    &:after {\n      border-radius: 0;\n      border-color: ",
    ";\n      border: ",
    ";\n    }\n    &:hover:after {\n      border-color: ",
    ";\n    }\n  }\n  .css-175 {\n    border-radius: 0;\n    &:after {\n      border: ",
    ";\n      border-radius: 0;\n    }\n  }\n",
  ]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

//</SpinButtonProps>
const SpinButtonWrapper = _styledComponents.default.div(
  _templateObject(),
  (_ref) => {
    let { theme } = _ref;
    return theme.darkMode === "dark" ? "#ffffff" : "#323130";
  },
  (_ref2) => {
    let { theme } = _ref2;
    return theme.darkMode === "dark" ? "#333333" : "#ffffff";
  },
  (_ref3) => {
    let { theme } = _ref3;
    return theme.darkMode === "dark" ? "#000000" : "#EAEAEA";
  },
  (_ref4) => {
    let { theme } = _ref4;
    return theme.darkMode === "dark" ? "#212121" : "#f4f4f4";
  },
  (_ref5) => {
    let { theme } = _ref5;
    return theme.darkMode === "dark" ? "#333333" : "#ffffff";
  },
  (_ref6) => {
    let { theme } = _ref6;
    return theme.darkMode === "dark" ? "#ffffff" : "#323130";
  },
  (_ref7) => {
    let { theme } = _ref7;
    return theme.darkMode === "dark" ? "#eaeaea" : "#A6A6A6";
  },
  (_ref8) => {
    let { theme } = _ref8;
    return theme.darkMode === "dark" ? "#212121" : "#f3f2f1";
  },
  (_ref9) => {
    let { theme } = _ref9;
    return theme.darkMode === "dark" ? "#ffffff" : "#323130";
  },
  (_ref10) => {
    let { theme } = _ref10;
    return theme.darkMode === "dark" ? "#ffffff" : "#323130";
  },
  (_ref11) => {
    let { theme } = _ref11;
    return theme.disabled && "0.5";
  },
  (_ref12) => {
    let { theme } = _ref12;
    return theme.darkMode === "dark" ? " #a19f9d" : "#323130";
  },
  (_ref13) => {
    let { theme } = _ref13;
    return theme.disabled && "0";
  },
  (_ref14) => {
    let { theme } = _ref14;
    return theme.darkMode === "dark" ? "#ffffff" : "#323130";
  },
  (_ref15) => {
    let { theme } = _ref15;
    return theme.darkMode === "dark"
      ? "1px solid #69afe5"
      : "1px solid #0078D4";
  }
); // border: ${({ theme }) =>
//   theme.darkMode === "dark" ? "1px solid #ffffff" : "1px solid #323130"};

exports.SpinButtonWrapper = SpinButtonWrapper;
