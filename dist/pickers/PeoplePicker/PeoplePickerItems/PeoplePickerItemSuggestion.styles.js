"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = getStyles;

var _styling = require("../../../@uifabric/styling");

var _SuggestionsItem = require("../../Suggestions/SuggestionsItem.styles");

var GlobalClassNames = {
  root: 'ms-PeoplePicker-personaContent',
  personaWrapper: 'ms-PeoplePicker-Persona'
};

function getStyles(props) {
  var _a, _b, _c;

  var className = props.className,
      theme = props.theme;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  var textSelectorsStyles = {
    selectors: (_a = {}, _a["." + _SuggestionsItem.SuggestionsItemGlobalClassNames.isSuggested + " &"] = {
      selectors: (_b = {}, _b[_styling.HighContrastSelector] = {
        color: 'HighlightText'
      }, _b)
    }, _a["." + classNames.root + ":hover &"] = {
      selectors: (_c = {}, _c[_styling.HighContrastSelector] = {
        color: 'HighlightText'
      }, _c)
    }, _a)
  };
  return {
    root: [classNames.root, {
      width: '100%',
      padding: '4px 12px'
    }, className],
    personaWrapper: [classNames.personaWrapper, {
      width: 180
    }],
    subComponentStyles: {
      persona: {
        primaryText: textSelectorsStyles,
        secondaryText: textSelectorsStyles
      }
    }
  };
}