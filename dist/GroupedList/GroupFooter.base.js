"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupFooterBase = void 0;

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../@uifabric/utilities");

var _GroupSpacer = require("./GroupSpacer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getClassNames = (0, _utilities.classNamesFunction)();

var GroupFooterBase = function GroupFooterBase(props) {
  var group = props.group,
      groupLevel = props.groupLevel,
      footerText = props.footerText,
      indentWidth = props.indentWidth,
      styles = props.styles,
      theme = props.theme;
  var classNames = getClassNames(styles, {
    theme: theme
  });

  if (group && footerText) {
    return /*#__PURE__*/React.createElement("div", {
      className: classNames.root
    }, /*#__PURE__*/React.createElement(_GroupSpacer.GroupSpacer, {
      indentWidth: indentWidth,
      count: groupLevel
    }), footerText);
  }

  return null;
};

exports.GroupFooterBase = GroupFooterBase;