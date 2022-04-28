"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  .is-checked {\n    .ms-Toggle-innerContainer .ms-Toggle-background {\n      background: ", ";\n      border: none;\n      &:hover {\n        background: ", ";\n      }\n      .ms-Toggle-thumb {\n        background-color: ", ";\n      }\n    }\n  }\n  .ms-Toggle-innerContainer .ms-Toggle-background {\n    background: ", ";\n    border: 1px solid\n      ", ";\n    .ms-Toggle-thumb {\n      background-color: ", ";\n    }\n  }\n  .is-disabled {\n    .ms-Toggle-innerContainer {\n      opacity: 0.5;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// hover #92c5f2
const ToggleWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return theme === "dark" ? "#62aaff" : "#0078d4";
}, (_ref2) => {
  let {
    theme
  } = _ref2;
  return theme === "dark" ? "#a4d4ff" : "#005a9e";
}, (_ref3) => {
  let {
    theme
  } = _ref3;
  return theme === "dark" ? "#333333" : "#ffffff";
}, (_ref4) => {
  let {
    theme
  } = _ref4;
  return theme === "dark" ? "#333333" : "#ffffff";
}, (_ref5) => {
  let {
    theme
  } = _ref5;
  return theme === "dark" ? "#ffffff" : "#212121";
}, (_ref6) => {
  let {
    theme
  } = _ref6;
  return theme === "dark" ? "#ffffff" : "#333333";
});

exports.ToggleWrapper = ToggleWrapper;