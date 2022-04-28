"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = void 0;

var _Styling = require("../../../Styling");

var _Utilities = require("../../../Utilities");

var _BaseButton = require("../BaseButton.styles");

var _SplitButton = require("../SplitButton/SplitButton.styles");

var _ButtonThemes = require("../ButtonThemes");

var DEFAULT_BUTTON_HEIGHT = '32px';
var DEFAULT_BUTTON_MIN_WIDTH = '80px';
var getStyles = (0, _Utilities.memoizeFunction)(function (theme, customStyles, primary) {
  var baseButtonStyles = (0, _BaseButton.getStyles)(theme);
  var splitButtonStyles = (0, _SplitButton.getStyles)(theme);
  var defaultButtonStyles = {
    root: {
      minWidth: DEFAULT_BUTTON_MIN_WIDTH,
      height: DEFAULT_BUTTON_HEIGHT
    },
    label: {
      fontWeight: _Styling.FontWeights.semibold
    }
  };
  return (0, _Styling.concatStyleSets)(baseButtonStyles, defaultButtonStyles, primary ? (0, _ButtonThemes.primaryStyles)(theme) : (0, _ButtonThemes.standardStyles)(theme), splitButtonStyles, customStyles);
});
exports.getStyles = getStyles;