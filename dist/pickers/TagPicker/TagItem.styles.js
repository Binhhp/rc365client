"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = getStyles;

var _styling = require("../../@uifabric/styling");

var _BaseButton = require("../../Button/BaseButton.classNames");

var _utilities = require("../../@uifabric/utilities");

var GlobalClassNames = {
  root: 'ms-TagItem',
  text: 'ms-TagItem-text',
  close: 'ms-TagItem-close',
  isSelected: 'is-selected'
};
var TAG_HEIGHT = 26;

function getStyles(props) {
  var _a, _b, _c, _d;

  var className = props.className,
      theme = props.theme,
      selected = props.selected,
      disabled = props.disabled;
  var palette = theme.palette,
      effects = theme.effects,
      fonts = theme.fonts,
      semanticColors = theme.semanticColors;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  return {
    root: [classNames.root, fonts.medium, (0, _styling.getFocusStyle)(theme), {
      boxSizing: 'content-box',
      flexShrink: '1',
      margin: 2,
      height: TAG_HEIGHT,
      lineHeight: TAG_HEIGHT,
      cursor: 'default',
      userSelect: 'none',
      display: 'flex',
      flexWrap: 'nowrap',
      maxWidth: 300,
      minWidth: 0,
      borderRadius: effects.roundedCorner2,
      color: semanticColors.inputText,
      background: !selected || disabled ? palette.neutralLighter : palette.themePrimary,
      selectors: (_a = {
        ':hover': [!disabled && !selected && {
          color: palette.neutralDark,
          background: palette.neutralLight,
          selectors: {
            '.ms-TagItem-close': {
              color: palette.neutralPrimary
            }
          }
        }, disabled && {
          background: palette.neutralLighter
        }, selected && !disabled && {
          background: palette.themePrimary
        }]
      }, _a[_styling.HighContrastSelector] = {
        border: "1px solid " + (!selected ? 'WindowText' : 'WindowFrame')
      }, _a)
    }, disabled && {
      selectors: (_b = {}, _b[_styling.HighContrastSelector] = {
        borderColor: 'GrayText'
      }, _b)
    }, selected && !disabled && [classNames.isSelected, {
      color: palette.white
    }], className],
    text: [classNames.text, {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      minWidth: 30,
      margin: '0 8px'
    }, disabled && {
      selectors: (_c = {}, _c[_styling.HighContrastSelector] = {
        color: 'GrayText'
      }, _c)
    }],
    close: [classNames.close, {
      color: palette.neutralSecondary,
      width: 30,
      height: '100%',
      flex: '0 0 auto',
      borderRadius: (0, _utilities.getRTL)(theme) ? effects.roundedCorner2 + " 0 0 " + effects.roundedCorner2 : "0 " + effects.roundedCorner2 + " " + effects.roundedCorner2 + " 0",
      selectors: {
        ':hover': {
          background: palette.neutralQuaternaryAlt,
          color: palette.neutralPrimary
        },
        ':active': {
          color: palette.white,
          backgroundColor: palette.themeDark
        }
      }
    }, selected && {
      color: palette.white,
      selectors: {
        ':hover': {
          color: palette.white,
          background: palette.themeDark
        }
      }
    }, disabled && {
      selectors: (_d = {}, _d["." + _BaseButton.ButtonGlobalClassNames.msButtonIcon] = {
        color: palette.neutralSecondary
      }, _d)
    }]
  };
}