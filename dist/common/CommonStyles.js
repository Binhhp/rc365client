"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScreenSelector = getScreenSelector;
exports.getEdgeChromiumNoHighContrastAdjustSelector = getEdgeChromiumNoHighContrastAdjustSelector;
exports.ScreenWidthMinUhfMobile = exports.ScreenWidthMaxXXLarge = exports.ScreenWidthMaxXLarge = exports.ScreenWidthMaxLarge = exports.ScreenWidthMaxMedium = exports.ScreenWidthMaxSmall = exports.ScreenWidthMinXXXLarge = exports.ScreenWidthMinXXLarge = exports.ScreenWidthMinXLarge = exports.ScreenWidthMinLarge = exports.ScreenWidthMinMedium = exports.ScreenWidthMinSmall = exports.EdgeChromiumHighContrastSelector = exports.HighContrastSelectorBlack = exports.HighContrastSelectorWhite = exports.HighContrastSelector = void 0;
var HighContrastSelector = "@media screen and (-ms-high-contrast: active)";
exports.HighContrastSelector = HighContrastSelector;
var HighContrastSelectorWhite = "@media screen and (-ms-high-contrast: black-on-white)";
exports.HighContrastSelectorWhite = HighContrastSelectorWhite;
var HighContrastSelectorBlack = "@media screen and (-ms-high-contrast: white-on-black)";
exports.HighContrastSelectorBlack = HighContrastSelectorBlack;
var EdgeChromiumHighContrastSelector = "@media screen and (-ms-high-contrast: active) and (forced-colors: active)";
exports.EdgeChromiumHighContrastSelector = EdgeChromiumHighContrastSelector;
var ScreenWidthMinSmall = 320;
exports.ScreenWidthMinSmall = ScreenWidthMinSmall;
var ScreenWidthMinMedium = 480;
exports.ScreenWidthMinMedium = ScreenWidthMinMedium;
var ScreenWidthMinLarge = 640;
exports.ScreenWidthMinLarge = ScreenWidthMinLarge;
var ScreenWidthMinXLarge = 1024;
exports.ScreenWidthMinXLarge = ScreenWidthMinXLarge;
var ScreenWidthMinXXLarge = 1366;
exports.ScreenWidthMinXXLarge = ScreenWidthMinXXLarge;
var ScreenWidthMinXXXLarge = 1920;
exports.ScreenWidthMinXXXLarge = ScreenWidthMinXXXLarge;
var ScreenWidthMaxSmall = ScreenWidthMinMedium - 1;
exports.ScreenWidthMaxSmall = ScreenWidthMaxSmall;
var ScreenWidthMaxMedium = ScreenWidthMinLarge - 1;
exports.ScreenWidthMaxMedium = ScreenWidthMaxMedium;
var ScreenWidthMaxLarge = ScreenWidthMinXLarge - 1;
exports.ScreenWidthMaxLarge = ScreenWidthMaxLarge;
var ScreenWidthMaxXLarge = ScreenWidthMinXXLarge - 1;
exports.ScreenWidthMaxXLarge = ScreenWidthMaxXLarge;
var ScreenWidthMaxXXLarge = ScreenWidthMinXXXLarge - 1;
exports.ScreenWidthMaxXXLarge = ScreenWidthMaxXXLarge;
var ScreenWidthMinUhfMobile = 768;
exports.ScreenWidthMinUhfMobile = ScreenWidthMinUhfMobile;

function getScreenSelector(min, max) {
  return "@media only screen and (min-width: " + min + "px) and (max-width: " + max + "px)";
}
/**
 * The style which turns off high contrast adjustment in (only) Edge Chromium browser.
 */


function getEdgeChromiumNoHighContrastAdjustSelector() {
  var _a;

  return _a = {}, _a[EdgeChromiumHighContrastSelector] = {
    forcedColorAdjust: "none"
  }, _a;
}