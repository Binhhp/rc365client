"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = void 0;

var _styling = require("../../@uifabric/styling");

var _utilities = require("../../@uifabric/utilities");

var _BaseButton = require("../BaseButton.styles");

var _SplitButton = require("../SplitButton/SplitButton.styles");

var _BaseButton2 = require("../BaseButton.classNames");

var getStyles = (0, _utilities.memoizeFunction)(function (theme, customStyles, focusInset, focusColor) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

  var baseButtonStyles = (0, _BaseButton.getStyles)(theme);
  var baseSplitButtonStyles = (0, _SplitButton.getStyles)(theme);
  var p = theme.palette,
      semanticColors = theme.semanticColors;
  var commandButtonHighContrastFocus = {
    left: 4,
    top: 4,
    bottom: 4,
    right: 4,
    border: 'none'
  };
  var commandButtonStyles = {
    root: [(0, _styling.getFocusStyle)(theme, {
      inset: 2,
      highContrastStyle: commandButtonHighContrastFocus,
      borderColor: 'transparent'
    }), theme.fonts.medium, {
      minWidth: '40px',
      backgroundColor: p.white,
      color: p.neutralPrimary,
      padding: '0 4px',
      border: 'none',
      borderRadius: 0,
      selectors: (_a = {}, _a[_styling.HighContrastSelector] = {
        border: 'none'
      }, _a)
    }],
    rootHovered: {
      backgroundColor: p.neutralLighter,
      color: p.neutralDark,
      selectors: (_b = {}, _b[_styling.HighContrastSelector] = {
        color: 'Highlight'
      }, _b["." + _BaseButton2.ButtonGlobalClassNames.msButtonIcon] = {
        color: p.themeDarkAlt
      }, _b["." + _BaseButton2.ButtonGlobalClassNames.msButtonMenuIcon] = {
        color: p.neutralPrimary
      }, _b)
    },
    rootPressed: {
      backgroundColor: p.neutralLight,
      color: p.neutralDark,
      selectors: (_c = {}, _c["." + _BaseButton2.ButtonGlobalClassNames.msButtonIcon] = {
        color: p.themeDark
      }, _c["." + _BaseButton2.ButtonGlobalClassNames.msButtonMenuIcon] = {
        color: p.neutralPrimary
      }, _c)
    },
    rootChecked: {
      backgroundColor: p.neutralLight,
      color: p.neutralDark,
      selectors: (_d = {}, _d["." + _BaseButton2.ButtonGlobalClassNames.msButtonIcon] = {
        color: p.themeDark
      }, _d["." + _BaseButton2.ButtonGlobalClassNames.msButtonMenuIcon] = {
        color: p.neutralPrimary
      }, _d)
    },
    rootCheckedHovered: {
      backgroundColor: p.neutralQuaternaryAlt,
      selectors: (_e = {}, _e["." + _BaseButton2.ButtonGlobalClassNames.msButtonIcon] = {
        color: p.themeDark
      }, _e["." + _BaseButton2.ButtonGlobalClassNames.msButtonMenuIcon] = {
        color: p.neutralPrimary
      }, _e)
    },
    rootExpanded: {
      backgroundColor: p.neutralLight,
      color: p.neutralDark,
      selectors: (_f = {}, _f["." + _BaseButton2.ButtonGlobalClassNames.msButtonIcon] = {
        color: p.themeDark
      }, _f["." + _BaseButton2.ButtonGlobalClassNames.msButtonMenuIcon] = {
        color: p.neutralPrimary
      }, _f)
    },
    rootExpandedHovered: {
      backgroundColor: p.neutralQuaternaryAlt
    },
    rootDisabled: {
      backgroundColor: p.white,
      selectors: (_g = {}, _g["." + _BaseButton2.ButtonGlobalClassNames.msButtonIcon] = {
        color: semanticColors.disabledBodySubtext
      }, _g)
    },
    // Split button styles
    splitButtonContainer: {
      height: '100%',
      selectors: (_h = {}, _h[_styling.HighContrastSelector] = {
        border: 'none'
      }, _h)
    },
    splitButtonDivider: {
      backgroundColor: p.neutralTertiaryAlt
    },
    splitButtonMenuButton: {
      backgroundColor: p.white,
      border: 'none',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      color: p.neutralSecondary,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralLighter,
          color: p.neutralDark,
          selectors: (_j = {}, _j[_styling.HighContrastSelector] = {
            color: 'Highlight'
          }, _j["." + _BaseButton2.ButtonGlobalClassNames.msButtonIcon] = {
            color: p.neutralPrimary
          }, _j)
        },
        ':active': {
          backgroundColor: p.neutralLight,
          selectors: (_k = {}, _k["." + _BaseButton2.ButtonGlobalClassNames.msButtonIcon] = {
            color: p.neutralPrimary
          }, _k)
        }
      }
    },
    splitButtonMenuButtonDisabled: {
      backgroundColor: p.white
    },
    splitButtonMenuButtonChecked: {
      backgroundColor: p.neutralLight,
      color: p.neutralDark,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralQuaternaryAlt
        }
      }
    },
    splitButtonMenuButtonExpanded: {
      backgroundColor: p.neutralLight,
      color: p.black,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralQuaternaryAlt
        }
      }
    },
    splitButtonMenuIcon: {
      color: p.neutralPrimary
    },
    splitButtonMenuIconDisabled: {
      color: p.neutralTertiary
    },
    label: {
      fontWeight: 'normal'
    },
    icon: {
      color: p.themePrimary
    },
    menuIcon: {
      color: p.neutralSecondary
    }
  };
  return (0, _styling.concatStyleSets)(baseButtonStyles, baseSplitButtonStyles, commandButtonStyles, customStyles);
});
exports.getStyles = getStyles;