"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// </DropdownProps>
const onCheckDarkMode = darkMode => {
  if (darkMode === "dark") {
    return true;
  }

  return false;
};

const DropdownWrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  .ms-Dropdown-container {\n    .ms-Label {\n      color: ", ";\n    }\n    .ms-Dropdown {\n      .ms-Dropdown-caretDownWrapper {\n        i {\n          color: ", ";\n        }\n      }\n      &:focus:after {\n        border-radius: 0;\n        border-color: ", ";\n        border-width: 1px;\n      }\n      &:hover {\n        .ms-Dropdown-title {\n          border-color: ", ";\n          color: ", ";\n        }\n        .ms-Dropdown-caretDownWrapper {\n          i {\n            color: ", ";\n          }\n        }\n      }\n    }\n    .is-disabled {\n      pointer-events: none;\n      .ms-Dropdown-title {\n        background-color: ", ";\n        color: ", ";\n      }\n      .ms-Dropdown-caretDownWrapper {\n        i {\n          color: ", ";\n        }\n      }\n    }\n  }\n"])), _ref => {
  let {
    theme
  } = _ref;
  return onCheckDarkMode(theme) ? "#ffffff" : "#000000";
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return onCheckDarkMode(theme) ? "#ffffff" : "#666666";
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return onCheckDarkMode(theme) ? "#b3d6fc" : "#005A9E";
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return onCheckDarkMode(theme) ? "#f4f4f4" : "#212121";
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return onCheckDarkMode(theme) ? "#ffffff" : "#000000";
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return onCheckDarkMode(theme) ? "#c4c4c4" : "#212121";
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return onCheckDarkMode(theme) ? "#212121" : "#F4F4F4";
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return onCheckDarkMode(theme) ? "#eaeaea" : "#A6A6A6";
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return onCheckDarkMode(theme) ? "#eaeaea" : "#A6A6A6";
});

exports.DropdownWrapper = DropdownWrapper;