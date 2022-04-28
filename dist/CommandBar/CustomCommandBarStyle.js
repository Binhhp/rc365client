"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandBarWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  width: 100%;\n  .ms-CommandBar,\n  .ms-CommandBar-secondaryCommand,\n  .ms-CommandBar-primaryCommand {\n    background-color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// </CommandBarProps>
const CommandBarWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return theme === "dark" ? "#333333" : "#ffffff";
});

exports.CommandBarWrapper = CommandBarWrapper;