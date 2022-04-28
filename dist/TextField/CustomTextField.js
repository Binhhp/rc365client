"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _TextField = require("./TextField");

var _CustomTextFieldStyle = require("./CustomTextFieldStyle");

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

class CustomTextField extends React.Component {
  render() {
    let borderColor = this.props.darkMode === "dark" ? "#ffffff" : "#a6a6a6";

    if (this.props.errorMessage) {
      borderColor = this.props.darkMode === "dark" ? "#F1707B" : "#A80000";
    }

    return /*#__PURE__*/ React.createElement(
      _CustomTextFieldStyle.TextFieldWrapper,
      {
        className: "TextFieldWrapper-comp",
        theme: {
          darkMode: this.props.darkMode,
          errorMessage: this.props.errorMessage,
        },
      },
      /*#__PURE__*/ React.createElement(
        _TextField.TextField,
        _extends({}, this.props, {
          styles: _objectSpread(
            {
              field: {
                border: "1px solid ".concat(borderColor),
                borderRadius: 0,
                backgroundColor:
                  this.props.darkMode === "dark" ? "#333333" : "#ffffff",
                color: this.props.darkMode === "dark" ? "#ffffff" : "#323130",
                height: this.props.multiline ? "auto" : "32px",
              },
              fieldGroup: {
                border: "none",
                borderRadius: 0,
              },
              errorMessage: {
                color: this.props.darkMode === "dark" ? "#F1707B" : "#A80000",
                paddingTop: 0,
              },
              suffix: {
                borderLeft: "none !important",
                border: "1px solid ".concat(borderColor),
                background:
                  this.props.darkMode === "dark" ? "#333333" : "#f3f2f1",
                color: this.props.darkMode === "dark" ? "#ffffff" : "#CCCCCC",
                maxWidth: 150,
                width: "fit-content",
                padding: "0 5px",
              },
            },
            this.props.styles
          ),
        })
      )
    );
  }
}

var _default = CustomTextField;
exports.default = _default;
