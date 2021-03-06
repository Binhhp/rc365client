"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suggestionsAvailable = exports.suggestionsSpinner = exports.suggestionsNone = exports.suggestionsContainer = exports.suggestionsTitle = exports.buttonSelected = exports.actionButton = exports.itemButton = exports.suggestionsItemIsSuggested = exports.closeButton = exports.suggestionsItem = exports.root = void 0;

var _lib = require("../../@uifabric/LoadTheme/lib");

/* tslint:disable */
(0, _lib.loadStyles)([{
  "rawString": ".root_7ccc02ef{min-width:260px}.suggestionsItem_7ccc02ef{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;position:relative;overflow:hidden}.suggestionsItem_7ccc02ef:hover{background:"
}, {
  "theme": "neutralLighter",
  "defaultValue": "#f3f2f1"
}, {
  "rawString": "}.suggestionsItem_7ccc02ef:hover .closeButton_7ccc02ef{display:block}.suggestionsItem_7ccc02ef.suggestionsItemIsSuggested_7ccc02ef{background:"
}, {
  "theme": "neutralLight",
  "defaultValue": "#edebe9"
}, {
  "rawString": "}.suggestionsItem_7ccc02ef.suggestionsItemIsSuggested_7ccc02ef:hover{background:"
}, {
  "theme": "neutralTertiaryAlt",
  "defaultValue": "#c8c6c4"
}, {
  "rawString": "}@media screen and (-ms-high-contrast:active){.suggestionsItem_7ccc02ef.suggestionsItemIsSuggested_7ccc02ef:hover{background:Highlight;color:HighlightText}}@media screen and (-ms-high-contrast:active){.suggestionsItem_7ccc02ef.suggestionsItemIsSuggested_7ccc02ef{background:Highlight;color:HighlightText;-ms-high-contrast-adjust:none}}.suggestionsItem_7ccc02ef.suggestionsItemIsSuggested_7ccc02ef .closeButton_7ccc02ef:hover{background:"
}, {
  "theme": "neutralTertiary",
  "defaultValue": "#a19f9d"
}, {
  "rawString": ";color:"
}, {
  "theme": "neutralPrimary",
  "defaultValue": "#323130"
}, {
  "rawString": "}@media screen and (-ms-high-contrast:active){.suggestionsItem_7ccc02ef.suggestionsItemIsSuggested_7ccc02ef .itemButton_7ccc02ef{color:HighlightText}}.suggestionsItem_7ccc02ef .closeButton_7ccc02ef{display:none;color:"
}, {
  "theme": "neutralSecondary",
  "defaultValue": "#605e5c"
}, {
  "rawString": "}.suggestionsItem_7ccc02ef .closeButton_7ccc02ef:hover{background:"
}, {
  "theme": "neutralLight",
  "defaultValue": "#edebe9"
}, {
  "rawString": "}.actionButton_7ccc02ef{background-color:transparent;border:0;cursor:pointer;margin:0;position:relative;border-top:1px solid "
}, {
  "theme": "neutralLight",
  "defaultValue": "#edebe9"
}, {
  "rawString": ";height:40px;width:100%;font-size:12px}[dir=ltr] .actionButton_7ccc02ef{padding-left:8px}[dir=rtl] .actionButton_7ccc02ef{padding-right:8px}html[dir=ltr] .actionButton_7ccc02ef{text-align:left}html[dir=rtl] .actionButton_7ccc02ef{text-align:right}.actionButton_7ccc02ef:hover{background-color:"
}, {
  "theme": "neutralLight",
  "defaultValue": "#edebe9"
}, {
  "rawString": ";cursor:pointer}.actionButton_7ccc02ef:active,.actionButton_7ccc02ef:focus{background-color:"
}, {
  "theme": "themeLight",
  "defaultValue": "#c7e0f4"
}, {
  "rawString": "}.actionButton_7ccc02ef .ms-Button-icon{font-size:16px;width:25px}.actionButton_7ccc02ef .ms-Button-label{margin:0 4px 0 9px}html[dir=rtl] .actionButton_7ccc02ef .ms-Button-label{margin:0 9px 0 4px}.buttonSelected_7ccc02ef{background-color:"
}, {
  "theme": "themeLight",
  "defaultValue": "#c7e0f4"
}, {
  "rawString": "}.suggestionsTitle_7ccc02ef{padding:0 12px;color:"
}, {
  "theme": "themePrimary",
  "defaultValue": "#0078d4"
}, {
  "rawString": ";font-size:12px;line-height:40px;border-bottom:1px solid "
}, {
  "theme": "neutralLight",
  "defaultValue": "#edebe9"
}, {
  "rawString": "}.suggestionsContainer_7ccc02ef{overflow-y:auto;overflow-x:hidden;max-height:300px;border-bottom:1px solid "
}, {
  "theme": "neutralLight",
  "defaultValue": "#edebe9"
}, {
  "rawString": "}.suggestionsNone_7ccc02ef{text-align:center;color:#797775;font-size:12px;line-height:30px}.suggestionsSpinner_7ccc02ef{margin:5px 0;white-space:nowrap;line-height:20px;font-size:12px}html[dir=ltr] .suggestionsSpinner_7ccc02ef{padding-left:14px}html[dir=rtl] .suggestionsSpinner_7ccc02ef{padding-right:14px}html[dir=ltr] .suggestionsSpinner_7ccc02ef{text-align:left}html[dir=rtl] .suggestionsSpinner_7ccc02ef{text-align:right}.suggestionsSpinner_7ccc02ef .ms-Spinner-circle{display:inline-block;vertical-align:middle}.suggestionsSpinner_7ccc02ef .ms-Spinner-label{display:inline-block;margin:0 10px 0 16px;vertical-align:middle}html[dir=rtl] .suggestionsSpinner_7ccc02ef .ms-Spinner-label{margin:0 16px 0 10px}.itemButton_7ccc02ef.itemButton_7ccc02ef{width:100%;padding:0;min-width:0;height:100%}@media screen and (-ms-high-contrast:active){.itemButton_7ccc02ef.itemButton_7ccc02ef{color:WindowText}}.itemButton_7ccc02ef.itemButton_7ccc02ef:hover{color:"
}, {
  "theme": "neutralDark",
  "defaultValue": "#201f1e"
}, {
  "rawString": "}.closeButton_7ccc02ef.closeButton_7ccc02ef{padding:0 4px;height:auto;width:32px}@media screen and (-ms-high-contrast:active){.closeButton_7ccc02ef.closeButton_7ccc02ef{color:WindowText}}.closeButton_7ccc02ef.closeButton_7ccc02ef:hover{background:"
}, {
  "theme": "neutralTertiaryAlt",
  "defaultValue": "#c8c6c4"
}, {
  "rawString": ";color:"
}, {
  "theme": "neutralDark",
  "defaultValue": "#201f1e"
}, {
  "rawString": "}.suggestionsAvailable_7ccc02ef{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}"
}]);
var root = "root_7ccc02ef";
exports.root = root;
var suggestionsItem = "suggestionsItem_7ccc02ef";
exports.suggestionsItem = suggestionsItem;
var closeButton = "closeButton_7ccc02ef";
exports.closeButton = closeButton;
var suggestionsItemIsSuggested = "suggestionsItemIsSuggested_7ccc02ef";
exports.suggestionsItemIsSuggested = suggestionsItemIsSuggested;
var itemButton = "itemButton_7ccc02ef";
exports.itemButton = itemButton;
var actionButton = "actionButton_7ccc02ef";
exports.actionButton = actionButton;
var buttonSelected = "buttonSelected_7ccc02ef";
exports.buttonSelected = buttonSelected;
var suggestionsTitle = "suggestionsTitle_7ccc02ef";
exports.suggestionsTitle = suggestionsTitle;
var suggestionsContainer = "suggestionsContainer_7ccc02ef";
exports.suggestionsContainer = suggestionsContainer;
var suggestionsNone = "suggestionsNone_7ccc02ef";
exports.suggestionsNone = suggestionsNone;
var suggestionsSpinner = "suggestionsSpinner_7ccc02ef";
exports.suggestionsSpinner = suggestionsSpinner;
var suggestionsAvailable = "suggestionsAvailable_7ccc02ef";
exports.suggestionsAvailable = suggestionsAvailable;