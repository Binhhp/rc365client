"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = void 0;

var _styling = require("../@uifabric/styling");

var GlobalClassNames = {
  root: "ms-groupFooter"
};

var getStyles = function getStyles(props) {
  var theme = props.theme,
      className = props.className;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  return {
    root: [theme.fonts.medium, classNames.root, {
      position: "relative",
      padding: "5px 38px"
    }, className]
  };
};

exports.getStyles = getStyles;