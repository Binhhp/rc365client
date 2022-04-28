"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var dom = React.createElement;
var _DefaultButton = require("./DefaultButton");

var _ButtonStyle = require("./ButtonStyle");

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

class ButtonDefaultExample extends React.Component {
  render() {
    const { disabled, checked } = this.props;
    const addIcon = {
      iconName: this.props.icon ? this.props.icon : "",
    };
    return dom(
      _ButtonStyle.ButtonWrapper,
      {
        theme: {
          type: this.props.type,
          darkMode: this.props.darkMode,
        },
        className: this.props.className,
      },
      dom(
        _DefaultButton.DefaultButton,
        _extends(
          {
            onClick: this.props.onClick,
          },
          this.props,
          {
            iconProps: addIcon,
            text: this.props.text,
            disabled: disabled,
            checked: checked,
          }
        )
      )
    );
  }
}

var _default = ButtonDefaultExample;
exports.default = _default;
