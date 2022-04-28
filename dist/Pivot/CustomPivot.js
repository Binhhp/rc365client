"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Pivot = require("./Pivot");

var _utilities = require("../@uifabric/utilities");

var _DefaultTheme = require("../@uifabric/DefaultTheme");

var _CustomPivotStyle = require("./CustomPivotStyle");

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

class CustomSearchBox extends React.Component {
  constructor() {
    super(...arguments);

    this.onHandleMoveRight = () => {
      let wrapWidth = document.getElementById(
        "tabListWrapper".concat(
          this.props.rcName ? "-".concat(this.props.rcName) : ""
        )
      );

      if (wrapWidth) {
        wrapWidth.scrollLeft = wrapWidth.scrollLeft + 50;
      }
    };

    this.onHandleMoveLeft = () => {
      let wrapWidth = document.getElementById(
        "tabListWrapper".concat(
          this.props.rcName ? "-".concat(this.props.rcName) : ""
        )
      );

      if (wrapWidth) {
        wrapWidth.scrollLeft = wrapWidth.scrollLeft - 50;
      }
    };
  }

  render() {
    const currentTheme =
      this.props.darkMode === "dark"
        ? _DefaultTheme.darkTheme
        : _DefaultTheme.lightTheme;
    return /*#__PURE__*/ React.createElement(
      _CustomPivotStyle.PivotWrapper,
      {
        className: "PivotWrapper",
        theme: this.props.darkMode,
      },
      /*#__PURE__*/ React.createElement(
        _utilities.Customizer,
        currentTheme,
        /*#__PURE__*/ React.createElement(
          _Pivot.Pivot,
          _extends({}, this.props, {
            onHandleMoveToLeft: this.onHandleMoveLeft,
            onHandleMoveToRight: this.onHandleMoveRight,
            styles: {
              root: {
                display: "flex",
                width: "100%",
                overflowX: "auto",
                overflowY: "hidden",
                paddingBottom: "5px",
              },
              text: {
                padding: "0 4px",
              },
            },
          })
        )
      )
    );
  }
}

var _default = CustomSearchBox;
exports.default = _default;
