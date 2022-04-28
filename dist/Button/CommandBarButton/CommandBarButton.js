"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CommandBarButton = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _BaseButton = require("../BaseButton");

var _utilities = require("../../@uifabric/utilities");

var _BaseComponent = require("../../@uifabric/utilities/BaseComponent");

var _CommandBarButton = require("./CommandBarButton.styles");

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

/**
 * {@docCategory Button}
 */
var CommandBarButton =
  /** @class */
  (function (_super) {
    (0, _tslib.__extends)(CommandBarButton, _super);

    function CommandBarButton() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }

    CommandBarButton.prototype.render = function () {
      var _a = this.props,
        darkMode = _a.darkMode,
        rcName = _a.rcName,
        styles = _a.styles,
        theme = _a.theme;
      return /*#__PURE__*/ React.createElement(
        _BaseButton.BaseButton,
        (0, _tslib.__assign)({}, this.props, {
          variantClassName: "ms-Button--commandBar",
          styles: (0, _CommandBarButton.getStyles)(theme, styles),
          onRenderDescription: _BaseComponent.nullRender,
          darkMode: darkMode,
          rcName,
        })
      );
    };

    CommandBarButton = (0, _tslib.__decorate)(
      [
        (0, _utilities.customizable)(
          "CommandBarButton",
          ["theme", "styles"],
          true
        ),
      ],
      CommandBarButton
    );
    return CommandBarButton;
  })(React.Component);

exports.CommandBarButton = CommandBarButton;
