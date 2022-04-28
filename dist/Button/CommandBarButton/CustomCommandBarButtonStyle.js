"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandBarButtonWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  height: 100%;\n  .ms-Button--commandBar {\n    height: 100%;\n    background-color: transparent;\n    .ms-Button-flexContainer {\n      margin: auto 0;\n      .ms-Button-textContainer {\n        color: ", ";\n      }\n      .ms-Button-icon {\n        color: ", ";\n      }\n      .ms-Button-menuIcon {\n        color: ", ";\n      }\n    }\n\n    &:hover {\n      background-color: transparent;\n      .ms-Button-flexContainer {\n        .ms-Button-textContainer {\n          color: ", ";\n        }\n        .ms-Button-icon {\n          color: ", ";\n        }\n        .ms-Button-menuIcon {\n          color: ", ";\n          background-color: transparent;\n        }\n      }\n    }\n    &:active {\n      .ms-Button-flexContainer {\n        .ms-Button-textContainer {\n          color: ", ";\n        }\n        .ms-Button-icon {\n          color: ", ";\n        }\n        .ms-Button-menuIcon {\n          color: ", ";\n        }\n      }\n    }\n  }\n  .is-disabled {\n    .ms-Button-textContainer,\n    i {\n      color: ", " !important;\n    }\n  }\n  .is-expanded {\n    .ms-Button-flexContainer {\n      .ms-Button-textContainer {\n        color: ", " !important;\n      }\n      .ms-Button-icon {\n        color: ", " !important;\n      }\n      .ms-Button-menuIcon {\n        color: ", " !important;\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// 69afe5
const CommandBarButtonWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return theme === "dark" ? "#ffffff" : "#212121";
}, (_ref2) => {
  let {
    theme
  } = _ref2;
  return theme === "dark" ? "#b3d6fc" : "#2B569A";
}, (_ref3) => {
  let {
    theme
  } = _ref3;
  return theme === "dark" ? "#a19f9d" : "#c4c4c4";
}, (_ref4) => {
  let {
    theme
  } = _ref4;
  return theme === "dark" ? "#69afe5" : "#0078d4";
}, (_ref5) => {
  let {
    theme
  } = _ref5;
  return theme === "dark" ? "#69afe5" : "#0078d4";
}, (_ref6) => {
  let {
    theme
  } = _ref6;
  return theme === "dark" ? "#69afe5" : "#0078d4";
}, (_ref7) => {
  let {
    theme
  } = _ref7;
  return theme === "dark" ? "#ffffff" : "#000000";
}, (_ref8) => {
  let {
    theme
  } = _ref8;
  return theme === "dark" ? "#b3d6fc" : "#2B569A";
}, (_ref9) => {
  let {
    theme
  } = _ref9;
  return theme === "dark" ? "#b3d6fc" : "#eaeaea";
}, (_ref10) => {
  let {
    theme
  } = _ref10;
  return theme === "dark" ? "#A19F9D" : "#A6A6A6";
}, (_ref11) => {
  let {
    theme
  } = _ref11;
  return theme === "dark" ? "#69afe5" : "#0078d4";
}, (_ref12) => {
  let {
    theme
  } = _ref12;
  return theme === "dark" ? "#69afe5" : "#0078d4";
}, (_ref13) => {
  let {
    theme
  } = _ref13;
  return theme === "dark" ? "#69afe5" : "#0078d4";
});

exports.CommandBarButtonWrapper = CommandBarButtonWrapper;