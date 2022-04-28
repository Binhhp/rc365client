"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  .ms-Button {\n    min-width: 80px;\n    width: auto;\n    height: 32px;\n    border: none;\n    border-radius: 0;\n    background-color: ", ";\n    .ms-Button-label {\n      color: ", ";\n      font-weight: normal;\n    }\n    .ms-Icon {\n      margin: 0;\n      padding-right: 5px;\n      color: ", ";\n      font-weight: normal;\n    }\n    &:hover {\n      background-color: ", ";\n      .ms-Button-label {\n        color: ", ";\n      }\n    }\n    &:active {\n      background-color: ", ";\n    }\n  }\n  .is-disabled.ms-Button {\n    background-color: ", ";\n    .ms-Button-label,\n    .ms-Icon {\n      color: ", ";\n      font-weight: normal;\n      opacity: 0.5;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// </ButtonProps>
const hanldType = theme => {
  //   [textColor,backgroundColor,hoverColor,activeColor,iconColor]
  let typeTheme = theme.type ? theme.type.toLowerCase() : theme.type;

  switch (typeTheme) {
    case "primary":
      if (theme.darkMode === "dark") {
        return ["#333333", "#69afe5", "#92c5f2", "#81bced", "#333333"];
      } else {
        return ["#ffffff", "#0078D4", "#106EBE", "#005A9E", "#ffffff"];
      }

    default:
      if (theme.darkMode === "dark") {
        return ["#ffffff", "#1b1a19", "#000000", "#212121", "#ffffff"];
      } else {
        return ["#212121", "#F4F4F4", "#EAEAEA", "#C8C8C8", "#333333"];
      }

  }
};

const ButtonWrapper = _styledComponents.default.div(_templateObject(), (_ref) => {
  let {
    theme
  } = _ref;
  return hanldType(theme)[1];
}, (_ref2) => {
  let {
    theme
  } = _ref2;
  return hanldType(theme)[0];
}, (_ref3) => {
  let {
    theme
  } = _ref3;
  return hanldType(theme)[4];
}, (_ref4) => {
  let {
    theme
  } = _ref4;
  return hanldType(theme)[2];
}, (_ref5) => {
  let {
    theme
  } = _ref5;
  return hanldType(theme)[0];
}, (_ref6) => {
  let {
    theme
  } = _ref6;
  return hanldType(theme)[3];
}, (_ref7) => {
  let {
    theme
  } = _ref7;
  return theme.darkMode === "dark" ? "#212121" : "#f4f4f4";
}, (_ref8) => {
  let {
    theme
  } = _ref8;
  return theme.darkMode === "dark" ? "#D5D5D5" : "#a6a6a6";
});

exports.ButtonWrapper = ButtonWrapper;