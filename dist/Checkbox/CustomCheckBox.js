"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Checkbox = require("./Checkbox");

var _CustomCheckBoxStyle = require("./CustomCheckBoxStyle");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class CustomCheckBox extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(_CustomCheckBoxStyle.CheckBoxWrapper, {
      theme: this.props.darkMode
    }, /*#__PURE__*/React.createElement(_Checkbox.Checkbox, _extends({}, this.props, {
      styles: {
        checkbox: {
          borderRadius: 0,
          borderColor: this.props.darkMode === "dark" ? "#ffffff" : "#333333"
        },
        checkmark: {
          color: this.props.darkMode === "dark" ? "#333333" : "#ffffff"
        },
        text: {
          color: this.props.darkMode === "dark" ? "#ffffff" : "#333333"
        },
        label: {
          fontWeight: "normal",
          padding: "0 5px",
          color: this.props.darkMode === "dark" ? "#69afe5" : "#1196D1"
        }
      }
    })));
  }

}

var _default = CustomCheckBox;
exports.default = _default;