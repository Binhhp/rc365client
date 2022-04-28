"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _TagPicker = require("./TagPicker");

var _utilities = require("../../@uifabric/utilities");

var _DefaultTheme = require("../../@uifabric/DefaultTheme");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class CustomTagPicker extends React.Component {
  render() {
    const currentTheme = this.props.darkMode === "dark" ? _DefaultTheme.darkTheme : _DefaultTheme.lightTheme;
    return /*#__PURE__*/React.createElement(_utilities.Customizer, currentTheme, /*#__PURE__*/React.createElement(_TagPicker.TagPicker, _extends({}, this.props, {
      styles: {
        text: {
          borderRadius: 0,
          border: "none",
          selectors: {
            ":after": {
              border: "none"
            }
          }
        },
        input: {
          borderRadius: 0,
          height: 32,
          border: this.props.darkMode === "dark" ? "1px solid #ffffff !important" : "1px solid #a6a6a6 !important"
        }
      }
    })));
  }

}

var _default = CustomTagPicker;
exports.default = _default;