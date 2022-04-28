"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  display: flex;\n  margin-bottom: 20px;\n  .ms-Checkbox {\n    padding-left: ", ";\n  }\n  .ms-Checkbox-checkbox {\n    border-radius: 0;\n    border-color: ", ";\n  }\n  .icon-rightArrow {\n    font-size: 16px;\n    color: ", ";\n    line-height: 16px;\n    padding-right: 13px;\n    cursor: pointer;\n  }\n  .ms-Checkbox-text {\n    color: ", ";\n    font-weight: normal;\n  }\n  .is-disabled {\n    pointer-events: none;\n    .ms-Checkbox-checkbox {\n      background-color: ", ";\n      border-color: ", ";\n    }\n    .ms-Checkbox-text {\n      color: ", ";\n    }\n  }\n  .ms-Checkbox:hover {\n    .ms-Checkbox-checkmark {\n      color: #ffffff;\n    }\n    .ms-Checkbox-checkbox {\n      border-color: ", ";\n      &::after {\n        border-color: #0078d4;\n      }\n    }\n    .ms-Checkbox-text {\n      color: ", ";\n    }\n  }\n  .is-checked {\n    .ms-Checkbox-checkbox {\n      border-color: ", ";\n      &:hover {\n        border-color: transparent;\n        background-color: #0078d4;\n      }\n    }\n    &:hover {\n      .ms-Checkbox-checkbox {\n        border-color: transparent;\n        background-color: ", ";\n      }\n    }\n  }\n  .is-checked.is-disabled {\n    .ms-Checkbox-checkbox {\n      border-color: ", ";\n    }\n    &:hover {\n      .ms-Checkbox-checkbox {\n        border-color: ", ";\n        border-color: transparent;\n        background-color: #0078d4;\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// </INodes>
const ItemWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return theme.visibleIcon ? "0" : "29px";
}, props => props.theme.darkMode === "dark" ? "#ffffff" : "#666666", props => props.theme.darkMode === "dark" ? "#ffffff" : "#8f8e8c", props => props.theme.darkMode === "dark" ? "#ffffff" : "#333333", props => props.theme.darkMode === "dark" ? "#212121" : "#e5e5e5", props => props.theme.darkMode === "dark" ? "#212121" : "#e5e5e5", props => props.theme.darkMode === "dark" && "#D5D5D5", (_ref2) => {
  let {
    theme
  } = _ref2;
  return theme.darkMode === "dark" ? "#ffffff" : "#666666";
}, props => props.theme.darkMode === "dark" ? "#ffffff" : "#333333", props => props.theme.darkMode === "dark" ? "#0078d4" : "#0078D4", props => props.theme.darkMode === "dark" ? "#9ecbf5" : "#005a9e", props => props.theme.darkMode === "dark" ? "#212121" : "#e5e5e5", props => props.theme.darkMode === "dark" ? "#212121" : "#e5e5e5");

exports.ItemWrapper = ItemWrapper;