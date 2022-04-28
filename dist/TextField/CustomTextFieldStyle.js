"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  .ms-TextField {\n    .ms-TextField-wrapper {\n      .ms-Label {\n        color: ", ";\n        &:after {\n          color: ", ";\n        }\n      }\n      .ms-TextField-fieldGroup {\n        &:after {\n          display: none;\n        }\n        .ms-TextField-prefix {\n          background: ", ";\n          color: ", ";\n        }\n        textarea {\n          cursor: auto;\n          &::-webkit-scrollbar {\n            background-color: ", ";\n            cursor: pointer;\n          }\n          &::-webkit-scrollbar-thumb {\n            background: ", ";\n            border-radius: 10px;\n            background-clip: content-box;\n            border: solid 6px transparent;\n            &:hover {\n              background: #98a3a6;\n              background-clip: content-box;\n              border: solid 6px transparent;\n            }\n          }\n          &::-webkit-scrollbar-button,\n          &::-webkit-scrollbar-corner {\n            background: transparent;\n          }\n          &::-webkit-scrollbar-button:horizontal:increment {\n            background-image: url(https://dl.dropboxusercontent.com/u/55165267/icon2.png);\n          }\n          &::-webkit-scrollbar-button:end:increment {\n            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAi0lEQVQokWNgGAUkAUYY48SJE9n////nIaiBkfGzhYXFNAYGBgYWJHFHRkbGYCIsXMPAwDCNgYGBgQkmwsLCEvn////1BDRufffuXQyGsxkYGBjOnDnD+vv375WMjIyBODQGe3l5/cSqGY8BGBqxasZiAFaNODXDDPjz508MCwvLEhMTk9+41A1BAADmHz3RwatzCgAAAABJRU5ErkJggg==);\n            background-repeat: no-repeat;\n            background-position: center;\n          }\n          &::-webkit-scrollbar-button:start:decrement {\n            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAZ0lEQVQoke2MsQnDMBQF77k03kcgApkgK3g0F4HM4M7gRmgity+VGiMh9cmV/787+D3UeqSUnpLettcY4zks55wfwA4swCXpFUI4uvJNLFQDGhCbAQ2K1cBUrrY/HRFgtr11Nn9afAFsJydbydDm5gAAAABJRU5ErkJggg==);\n            background-repeat: no-repeat;\n            background-position: center;\n          }\n        }\n\n        &::placeholder {\n          color: red;\n        }\n      }\n    }\n    .ms-TextField-errorMessage {\n      color: ", ";\n      padding-top: 0;\n    }\n  }\n  .is-disabled {\n    .ms-TextField-wrapper {\n      .ms-Label {\n        color: ", ";\n      }\n      .ms-TextField-fieldGroup {\n        border-color: ", ";\n        .ms-TextField-prefix {\n          background-color: ", ";\n          span {\n            color: ", ";\n            opacity: ", ";\n          }\n        }\n        input,\n        textarea {\n          background-color: ", ";\n          border: none;\n        }\n        input[type=\"text\"],\n        textarea[type=\"text\"] {\n          color: ", ";\n        }\n        input::placeholder {\n          color: ", ";\n          opacity: 0.6;\n        }\n        i {\n          color: ", ";\n          opacity: ", ";\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// </TextFieldProps>
// &::-webkit-input-placeholder {
//   border-color: ${({ theme }) =>
//     theme.darkMode === "dark" ? "#a19f9d" : "#605e5c"};
// }
const TextFieldWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return theme.darkMode === "dark" ? "#ffffff" : "#323130";
}, (_ref2) => {
  let {
    theme
  } = _ref2;
  return theme.darkMode === "dark" ? "#F1707B" : "#A80000";
}, (_ref3) => {
  let {
    theme
  } = _ref3;
  return theme.darkMode === "dark" && "#212121";
}, (_ref4) => {
  let {
    theme
  } = _ref4;
  return theme.darkMode === "dark" && "#bababa";
}, (_ref5) => {
  let {
    theme
  } = _ref5;
  return theme.darkMode === "dark" ? "#3c3c3c" : "#ffffff";
}, (_ref6) => {
  let {
    theme
  } = _ref6;
  return theme.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4";
}, (_ref7) => {
  let {
    theme
  } = _ref7;
  return theme.errorMessage && theme.darkMode === "dark" ? "rgb(241, 112, 123) !important" : "rgb(164, 38, 44) !important";
}, (_ref8) => {
  let {
    theme
  } = _ref8;
  return theme.darkMode === "dark" ? "#797775" : "#A6A6A6";
}, (_ref9) => {
  let {
    theme
  } = _ref9;
  return theme.darkMode === "dark" ? "#212121" : "#F4F4F4";
}, (_ref10) => {
  let {
    theme
  } = _ref10;
  return theme.darkMode === "dark" && "#212121";
}, (_ref11) => {
  let {
    theme
  } = _ref11;
  return theme.darkMode === "dark" && "#eaeaea";
}, (_ref12) => {
  let {
    theme
  } = _ref12;
  return theme.darkMode === "dark" && "0.5";
}, (_ref13) => {
  let {
    theme
  } = _ref13;
  return theme.darkMode === "dark" ? "#212121" : "#F4F4F4";
}, (_ref14) => {
  let {
    theme
  } = _ref14;
  return theme.darkMode === "dark" ? "#eaeaea" : "#A6A6A6";
}, (_ref15) => {
  let {
    theme
  } = _ref15;
  return theme.darkMode === "dark" ? "#c4c4c4 !important" : "#212121 !important";
}, (_ref16) => {
  let {
    theme
  } = _ref16;
  return theme.darkMode === "dark" ? "#eaeaea" : "#A6A6A6";
}, (_ref17) => {
  let {
    theme
  } = _ref17;
  return theme.darkMode === "dark" && "0.5";
});

exports.TextFieldWrapper = TextFieldWrapper;