"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.PivotWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _templateObject() {
  const data = _taggedTemplateLiteral([
    "\n  height: 100%;\n  width: 100%;\n  .tab-wrapper {\n    .moveLeft-btn,\n    .moveRight-btn {\n      display: none !important;\n    }\n    .ms-Pivot {\n      display: flex;\n      width: 100%;\n      overflow-x: auto;\n      overflow-y: hidden;\n            &::-webkit-scrollbar {\n        background-color: transparent;\n        cursor: pointer;\n      }\n      &::-webkit-scrollbar-thumb {\n        background: ",
    ";\n        border-radius: 10px;\n        background-clip: content-box;\n        border: solid 7px transparent;\n        &:hover {\n          background: #98a3a6;\n          background-clip: content-box;\n          border: solid 7px transparent;\n        }\n      }\n      .ms-Button--action .ms-Button-flexContainer .ms-Pivot-linkContent {\n        .ms-Pivot-icon,\n        .ms-Pivot-text {\n          padding: 0 4px;\n        }\n      }\n    }\n  }\n  @media screen and (max-width: 850px) {\n    .tab-wrapper {\n      padding: 0 20px;\n      .moveLeft-btn,\n      .moveRight-btn {\n        display: flex !important;\n        &:hover {\n          opacity: 1 !important;\n        }\n      }\n    }\n  }\n",
  ]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

const PivotWrapper = _styledComponents.default.div(
  _templateObject(),
  (_ref) => {
    let { theme } = _ref;
    return theme.theme === "dark" ? "#c8c8c8" : "#c8c6c4";
  }
);

exports.PivotWrapper = PivotWrapper;
