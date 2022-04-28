"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = void 0;

var _utilities = require("../@uifabric/utilities");

var GlobalClassNames = {
  root: "ms-GroupShowAll",
  link: "ms-Link"
};

var getStyles = function getStyles(props) {
  var _a;

  var theme = props.theme;
  var fonts = theme.fonts;
  var classNames = (0, _utilities.getGlobalClassNames)(GlobalClassNames, theme);
  return {
    root: [classNames.root, {
      position: "relative",
      padding: "10px 84px",
      cursor: "pointer",
      selectors: (_a = {}, _a["." + classNames.link] = {
        fontSize: fonts.small.fontSize
      }, _a)
    }]
  };
};

exports.getStyles = getStyles;