"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultButton = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _BaseButton = require("../BaseButton");

var _Utilities = require("../../../Utilities");

var _DefaultButton = require("./DefaultButton.styles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * {@docCategory Button}
 */
var DefaultButton =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DefaultButton, _super);

  function DefaultButton() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  DefaultButton.prototype.render = function () {
    var _a = this.props,
        _b = _a.primary,
        primary = _b === void 0 ? false : _b,
        styles = _a.styles,
        theme = _a.theme;
    return /*#__PURE__*/React.createElement(_BaseButton.BaseButton, (0, _tslib.__assign)({}, this.props, {
      variantClassName: primary ? 'ms-Button--primary' : 'ms-Button--default',
      styles: (0, _DefaultButton.getStyles)(theme, styles, primary),
      onRenderDescription: _Utilities.nullRender
    }));
  };

  DefaultButton = (0, _tslib.__decorate)([(0, _Utilities.customizable)('DefaultButton', ['theme', 'styles'], true)], DefaultButton);
  return DefaultButton;
}(React.Component);

exports.DefaultButton = DefaultButton;