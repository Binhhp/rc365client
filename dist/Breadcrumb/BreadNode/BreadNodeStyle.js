"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const onHandleTheme = theme => {
  if (theme === "dark") {
    return ["#ffffff"];
  }

  return ["#323130"];
};

const NodeWrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  .node__item {\n    display: flex;\n    align-items: center;\n    .note__main {\n      display: flex;\n      align-items: center;\n      .ms-Dropdown {\n        &:after {\n          border-color: transparent;\n        }\n        .ms-Dropdown-caretDownWrapper {\n          display: none;\n        }\n      }\n      .selectDrop .ms-Dropdown-title {\n        border: none;\n        background-color: transparent;\n      }\n    }\n    .node__icon {\n      color: ", ";\n      // padding-right: 12px;\n    }\n    .ms-Button {\n      background-color: transparent;\n      padding: 0 10px;\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n"])), _ref => {
  let {
    theme
  } = _ref;
  return onHandleTheme(theme)[0];
});

exports.NodeWrapper = NodeWrapper;