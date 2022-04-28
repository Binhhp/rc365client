"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoiceGroupWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  .ms-ChoiceFieldGroup {\n    .ms-ChoiceFieldGroup-flexContainer {\n      .ms-ChoiceField {\n        color: ", ";\n        .is-disabled {\n          pointer-events: none;\n          &::before,\n          &::after {\n            border-color: ", " !important;\n          }\n        }\n        .is-disabled {\n          &:not(.ms-ChoiceField-input) {\n            opacity: ", ";\n          }\n        }\n      }\n      .is-checked {\n        &:hover {\n          .ms-ChoiceFieldLabel {\n            color: ", ";\n          }\n        }\n        &:hover::before,\n        &:hover::after {\n          border-color: ", " !important;\n        }\n        &::after {\n          border-color: ", ";\n        }\n        &::before {\n          background-color: ", ";\n          border-color: ", " !important;\n        }\n        &:hover::after {\n          background-color: ", ";\n        }\n      }\n      .ms-ChoiceField-field {\n        &:hover {\n          .ms-ChoiceFieldLabel {\n            color: ", ";\n          }\n        }\n        &::before {\n          background-color: ", ";\n          border-color: ", ";\n        }\n        &:hover::after {\n          background-color: ", ";\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// </ChoiceGroupProps>
const ChoiceGroupWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return theme === "dark" ? "#ffffff" : "#323130";
}, (_ref2) => {
  let {
    theme
  } = _ref2;
  return theme === "dark" ? "#c8c8c8" : "#c8c6c4";
}, (_ref3) => {
  let {
    theme
  } = _ref3;
  return theme === "dark" && "0.5";
}, (_ref4) => {
  let {
    theme
  } = _ref4;
  return theme === "dark" ? "#ffffff" : "#323130";
}, (_ref5) => {
  let {
    theme
  } = _ref5;
  return theme === "dark" ? "#b3d6fc" : "#0e7aaa";
}, (_ref6) => {
  let {
    theme
  } = _ref6;
  return theme === "dark" ? "#69afe5" : "#1196d1";
}, (_ref7) => {
  let {
    theme
  } = _ref7;
  return theme === "dark" ? "#333333" : "#ffffff";
}, (_ref8) => {
  let {
    theme
  } = _ref8;
  return theme === "dark" ? "#69afe5" : "#1196d1";
}, (_ref9) => {
  let {
    theme
  } = _ref9;
  return theme === "dark" ? "#f4f4f4" : "#605e5c";
}, (_ref10) => {
  let {
    theme
  } = _ref10;
  return theme === "dark" ? "#ffffff" : "#323130";
}, (_ref11) => {
  let {
    theme
  } = _ref11;
  return theme === "dark" ? "#333333" : "#ffffff";
}, (_ref12) => {
  let {
    theme
  } = _ref12;
  return theme === "dark" ? "#f4f4f4" : "#323130";
}, (_ref13) => {
  let {
    theme
  } = _ref13;
  return theme === "dark" ? "#f4f4f4" : "#605e5c";
}); // .field-53 {
//   &::before {
//     background-color: ${({ theme }) =>
//       theme === "dark" ? "#333333" : "#ffffff"};
//     border-color: ${({ theme }) =>
//       theme === "dark" ? "#c8c8c8" : "#c8c6c4"};
//   }
//   &:hover::after {
//     background-color: ${({ theme }) =>
//       theme === "dark" ? "#c8c8c8" : "#c8c6c4"};
//   }
// }


exports.ChoiceGroupWrapper = ChoiceGroupWrapper;