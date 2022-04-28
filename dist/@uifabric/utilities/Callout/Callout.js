"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Callout = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _CalloutContent = require("./CalloutContent");

var _index = require("../index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Callout =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Callout, _super);

  function Callout() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Callout.prototype.render = function () {
    var _a = this.props,
        layerProps = _a.layerProps,
        rest = (0, _tslib.__rest)(_a, ["layerProps"]);
    var content = /*#__PURE__*/React.createElement(_CalloutContent.CalloutContent, (0, _tslib.__assign)({}, rest));
    return this.props.doNotLayer ? content : /*#__PURE__*/React.createElement(_index.Layer, (0, _tslib.__assign)({}, layerProps), content);
  };

  return Callout;
}(React.Component);

exports.Callout = Callout;