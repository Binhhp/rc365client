"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = getStyles;
exports.SuggestionsItemGlobalClassNames = void 0;

var _styling = require("../../@uifabric/styling");

var SuggestionsItemGlobalClassNames = {
  root: 'ms-Suggestions-item',
  itemButton: 'ms-Suggestions-itemButton',
  closeButton: 'ms-Suggestions-closeButton',
  isSuggested: 'is-suggested'
};
exports.SuggestionsItemGlobalClassNames = SuggestionsItemGlobalClassNames;

function getStyles(props) {
  var _a, _b, _c;

  var className = props.className,
      theme = props.theme,
      suggested = props.suggested;
  var palette = theme.palette,
      semanticColors = theme.semanticColors;
  var classNames = (0, _styling.getGlobalClassNames)(SuggestionsItemGlobalClassNames, theme);
  return {
    root: [classNames.root, {
      display: 'flex',
      alignItems: 'stretch',
      boxSizing: 'border-box',
      width: '100%',
      position: 'relative',
      selectors: {
        '&:hover': {
          background: semanticColors.menuItemBackgroundHovered
        },
        '&:hover .ms-Suggestions-closeButton': {
          display: 'block'
        }
      }
    }, className],
    itemButton: [classNames.itemButton, {
      width: '100%',
      padding: 0,
      border: 'none',
      height: '100%',
      // Force the item button to be collapsible so it can always shrink
      // to accommodate the close button as a peer in its flex container.
      minWidth: 0,
      // Require for IE11 to truncate the component.
      overflow: 'hidden',
      selectors: (_a = {}, _a[_styling.HighContrastSelector] = {
        color: 'WindowText',
        selectors: {
          ':hover': {
            background: 'Highlight',
            color: 'HighlightText',
            MsHighContrastAdjust: 'none'
          }
        }
      }, _a[':hover'] = {
        color: semanticColors.menuItemTextHovered
      }, _a)
    }, suggested && [classNames.isSuggested, {
      background: semanticColors.menuItemBackgroundPressed,
      selectors: (_b = {
        ':hover': {
          background: semanticColors.menuDivider
        }
      }, _b[_styling.HighContrastSelector] = {
        background: 'Highlight',
        color: 'HighlightText',
        MsHighContrastAdjust: 'none'
      }, _b)
    }]],
    closeButton: [classNames.closeButton, {
      display: 'none',
      color: palette.neutralSecondary,
      padding: '0 4px',
      height: 'auto',
      width: 32,
      selectors: (_c = {
        ':hover, :active': {
          background: palette.neutralTertiaryAlt,
          color: palette.neutralDark
        }
      }, _c[_styling.HighContrastSelector] = {
        color: 'WindowText'
      }, _c)
    }, suggested && {
      selectors: {
        ':hover, :active': {
          background: palette.neutralTertiary,
          color: palette.neutralPrimary
        }
      }
    }]
  };
}