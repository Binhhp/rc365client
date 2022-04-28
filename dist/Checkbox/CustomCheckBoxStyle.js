"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBoxWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  height: 100%;\n  .ms-Checkbox {\n    &:hover {\n      .ms-Checkbox-label {\n        .ms-Checkbox-checkbox {\n          border-color: ", ";\n        }\n        .ms-Checkbox-text {\n          color: ", ";\n        }\n      }\n    }\n  }\n\n  .is-disabled {\n    .ms-Checkbox-label {\n      .ms-Checkbox-checkbox {\n        border-color: ", " !important;\n        &:after {\n          border-color: ", ";\n        }\n        &:hover:after {\n          border-color: ", ";\n        }\n      }\n      .ms-Checkbox-text {\n        color: ", " !important;\n      }\n      .ms-icon-label {\n        padding: 0 5px;\n        color: ", ";\n        font-weight: normal;\n      }\n    }\n  }\n  .is-checked {\n    .ms-Checkbox-label {\n      .ms-Checkbox-checkbox {\n        border-color: transparent;\n        background-color: ", ";\n      }\n    }\n    &:hover {\n      .ms-Checkbox-checkbox {\n        background-color: ", ";\n        .ms-Checkbox-checkmark {\n          color: ", ";\n        }\n      }\n    }\n  }\n  .is-disabled.is-checked {\n    .ms-Checkbox-checkbox {\n      background-color: ", ";\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// </CheckBoxProps>
const CheckBoxWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return theme === "dark" ? "#fffffff" : "#a6a6a6";
}, (_ref2) => {
  let {
    theme
  } = _ref2;
  return theme === "dark" ? "#f4f4f4" : "#000000";
}, (_ref3) => {
  let {
    theme
  } = _ref3;
  return theme === "dark" ? "#c8c8c8" : "#C8C8C8";
}, (_ref4) => {
  let {
    theme
  } = _ref4;
  return theme === "dark" && "#c8c8c8";
}, (_ref5) => {
  let {
    theme
  } = _ref5;
  return theme === "dark" && "#c8c8c8";
}, (_ref6) => {
  let {
    theme
  } = _ref6;
  return theme === "dark" ? "#eaeaea" : "#A6A6A6";
}, (_ref7) => {
  let {
    theme
  } = _ref7;
  return theme === "dark" ? "#eaeaea" : "#A6A6A6";
}, (_ref8) => {
  let {
    theme
  } = _ref8;
  return theme === "dark" && "#69afe5";
}, (_ref9) => {
  let {
    theme
  } = _ref9;
  return theme === "dark" && "#b3d6fc";
}, (_ref10) => {
  let {
    theme
  } = _ref10;
  return theme === "dark" && "#333333";
}, (_ref11) => {
  let {
    theme
  } = _ref11;
  return theme === "dark" ? "#c8c8c8" : "#C8C8C8";
});

exports.CheckBoxWrapper = CheckBoxWrapper;