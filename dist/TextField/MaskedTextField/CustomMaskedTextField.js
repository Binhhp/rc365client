"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _CustomMaskedTextFieldStyle = require("./CustomMaskedTextFieldStyle");

var _utilities = require("../../@uifabric/utilities");

var _DefaultTheme = require("../../@uifabric/DefaultTheme");

var _ = require("..");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class CustomMaskedTextField extends React.Component {
  render() {
    const currentTheme =
      this.props.darkMode === "dark"
        ? _DefaultTheme.darkTheme
        : _DefaultTheme.lightTheme;
    let borderColor = this.props.darkMode === "dark" ? "#ffffff" : "#a6a6a6";

    if (this.props.errorMessage) {
      borderColor = this.props.darkMode === "dark" ? "#F1707B" : "#A80000";
    }

    return /*#__PURE__*/ React.createElement(
      _CustomMaskedTextFieldStyle.MaskedTextFieldWrapper,
      {
        className: "MaskedTextFieldWrapper",
        theme: {
          darkMode: this.props.darkMode,
          errorMessage: this.props.errorMessage,
        },
      },
      /*#__PURE__*/ React.createElement(
        _utilities.Customizer,
        currentTheme,
        /*#__PURE__*/ React.createElement(
          _.MaskedTextField,
          _extends({}, this.props, {
            styles: _objectSpread(
              {
                fieldGroup: {
                  borderColor: borderColor,
                  borderRadius: 0,
                  selectors: {
                    ":hover": {
                      borderColor: borderColor,
                    },
                  },
                },
              },
              this.props.styles
            ),
          })
        )
      )
    );
  }
}

var _default = CustomMaskedTextField;
exports.default = _default;
