"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  .ms-ProgressIndicator {\n    .ms-ProgressIndicator-itemName {\n      color: ", ";\n    }\n    .ms-ProgressIndicator-itemDescription {\n      color: ", ";\n    }\n    .ms-ProgressIndicator-itemProgress {\n      .ms-ProgressIndicator-progressTrack {\n        background-color: ", ";\n      }\n      .ms-ProgressIndicator-progressBar {\n        background: ", ";\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// </ProgressIndicatorProps>
const ProgressWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return theme === "dark" ? "#ffffff" : "#212121";
}, (_ref2) => {
  let {
    theme
  } = _ref2;
  return theme === "dark" ? "#eaeaea" : "#605e5c";
}, (_ref3) => {
  let {
    theme
  } = _ref3;
  return theme === "dark" ? "#005A9E" : "#edebe9";
}, (_ref4) => {
  let {
    theme
  } = _ref4;
  return theme === "dark" ? "#69afe5" : "#005A9E";
});

exports.ProgressWrapper = ProgressWrapper;