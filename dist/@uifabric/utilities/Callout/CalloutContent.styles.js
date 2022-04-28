"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getStyles = void 0;

var _styling = require("../../styling");

function getBeakStyle(beakWidth) {
  return {
    height: beakWidth,
    width: beakWidth,
  };
}

var GlobalClassNames = {
  container: "ms-Callout-container",
  root: "ms-Callout",
  beak: "ms-Callout-beak",
  beakCurtain: "ms-Callout-beakCurtain",
  calloutMain: "ms-Callout-main",
};

var getStyles = function getStyles(props) {
  var _a;

  var theme = props.theme,
    className = props.className,
    overflowYHidden = props.overflowYHidden,
    calloutWidth = props.calloutWidth,
    beakWidth = props.beakWidth,
    backgroundColor = props.backgroundColor,
    calloutMaxWidth = props.calloutMaxWidth;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  var semanticColors = theme.semanticColors,
    effects = theme.effects;
  return {
    container: [
      classNames.container,
      {
        position: "relative",
      },
    ],
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        position: "absolute",
        boxSizing: "border-box",
        borderRadius: effects.roundedCorner2,
        zIndex: 99999999,
        boxShadow: effects.elevation16,
        selectors:
          ((_a = {}),
          (_a[_styling.HighContrastSelector] = {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "WindowText",
          }),
          _a),
      },
      (0, _styling.focusClear)(),
      className,
      !!calloutWidth && {
        width: calloutWidth,
      },
      !!calloutMaxWidth && {
        maxWidth: calloutMaxWidth,
      },
    ],
    beak: [
      classNames.beak,
      {
        position: "absolute",
        backgroundColor: semanticColors.menuBackground,
        boxShadow: "inherit",
        border: "inherit",
        boxSizing: "border-box",
        transform: "rotate(45deg)",
      },
      getBeakStyle(beakWidth),
      backgroundColor && {
        backgroundColor: backgroundColor,
      },
    ],
    beakCurtain: [
      classNames.beakCurtain,
      {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: semanticColors.menuBackground,
        borderRadius: effects.roundedCorner2,
      },
    ],
    calloutMain: [
      classNames.calloutMain,
      {
        backgroundColor: semanticColors.menuBackground,
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative",
        borderRadius: effects.roundedCorner2,
      },
      overflowYHidden && {
        overflowY: "hidden",
      },
      backgroundColor && {
        backgroundColor: backgroundColor,
      }, // "&::-webkit-scrollbar" && {
      //   backgroundColor: "transparent",
      //   cursor: "pointer",
      // },
      // "&::-webkit-scrollbar-thumb" && {
      //   // background: ${({ theme }) => (theme === "dark" ? "#c8c8c8" : "#c8c6c4")};
      //   borderRadius: " 10px",
      //   backgroundClip: "content-box",
      //   border: "solid 6px transparent",
      // },
      // "&::-webkit-scrollbar-thumb:hover" && {
      //   background: " #98a3a6",
      //   backgroundClip: "content-box",
      //   border: "solid 6px transparent",
      // },
    ],
  };
};

exports.getStyles = getStyles;
