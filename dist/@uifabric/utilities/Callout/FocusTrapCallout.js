"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusTrapCallout = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _Callout = require("./Callout");

var _index = require("../FocusTrapZone/index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * A special Callout that uses FocusTrapZone to trap focus
 * @param props - Props for the component
 */
var FocusTrapCallout = function FocusTrapCallout(props) {
  return /*#__PURE__*/React.createElement(_Callout.Callout, (0, _tslib.__assign)({}, props), /*#__PURE__*/React.createElement(_index.FocusTrapZone, (0, _tslib.__assign)({
    disabled: props.hidden
  }, props.focusTrapProps), props.children));
};

exports.FocusTrapCallout = FocusTrapCallout;