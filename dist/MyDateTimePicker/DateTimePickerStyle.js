"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePickerWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const DateTimePickerWrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  .ms-TextField-fieldGroup i {\n    color: ", ";\n  }\n"])), _ref => {
  let {
    theme
  } = _ref;
  return theme === "dark" ? "#fff" : "#a6a6a6";
});

exports.DateTimePickerWrapper = DateTimePickerWrapper;