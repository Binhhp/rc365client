"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemContainer = exports.personaDetails = exports.itemContent = exports.validationError = exports.personaContainerIsSelected = exports.removeButton = exports.personaContainer = void 0;

var _lib = require("../../../@uifabric/LoadTheme/lib");

/* tslint:disable */
(0, _lib.loadStyles)([{
  "rawString": ".personaContainer_06a7696b{border-radius:15px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:"
}, {
  "theme": "neutralLighter",
  "defaultValue": "#f3f2f1"
}, {
  "rawString": ";margin:1px 2px;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;max-width:300px;vertical-align:middle}.personaContainer_06a7696b::-moz-focus-inner{border:0}.personaContainer_06a7696b{outline:transparent}.personaContainer_06a7696b{position:relative}.ms-Fabric--isFocusVisible .personaContainer_06a7696b:focus:after{content:'';position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;pointer-events:none;border:1px solid "
}, {
  "theme": "focusBorder",
  "defaultValue": "#605e5c"
}, {
  "rawString": "}.personaContainer_06a7696b:hover{background:"
}, {
  "theme": "neutralLight",
  "defaultValue": "#edebe9"
}, {
  "rawString": "}.personaContainer_06a7696b:hover .removeButton_06a7696b{color:"
}, {
  "theme": "neutralPrimary",
  "defaultValue": "#323130"
}, {
  "rawString": "}.personaContainer_06a7696b.personaContainerIsSelected_06a7696b{background:"
}, {
  "theme": "blue",
  "defaultValue": "#0078d4"
}, {
  "rawString": "}.personaContainer_06a7696b.personaContainerIsSelected_06a7696b .ms-Persona-primaryText{color:"
}, {
  "theme": "white",
  "defaultValue": "#ffffff"
}, {
  "rawString": "}@media screen and (-ms-high-contrast:active){.personaContainer_06a7696b.personaContainerIsSelected_06a7696b .ms-Persona-primaryText{color:HighlightText}}.personaContainer_06a7696b.personaContainerIsSelected_06a7696b .removeButton_06a7696b .ms-Button-icon{color:"
}, {
  "theme": "white",
  "defaultValue": "#ffffff"
}, {
  "rawString": "}@media screen and (-ms-high-contrast:active){.personaContainer_06a7696b.personaContainerIsSelected_06a7696b .removeButton_06a7696b .ms-Button-icon{color:HighlightText}}.personaContainer_06a7696b.personaContainerIsSelected_06a7696b .removeButton_06a7696b:hover{color:"
}, {
  "theme": "white",
  "defaultValue": "#ffffff"
}, {
  "rawString": ";background:"
}, {
  "theme": "themeDark",
  "defaultValue": "#005a9e"
}, {
  "rawString": "}@media screen and (-ms-high-contrast:active){.personaContainer_06a7696b.personaContainerIsSelected_06a7696b{border-color:Highlight;background:Highlight;-ms-high-contrast-adjust:none}}.personaContainer_06a7696b.validationError_06a7696b .ms-Persona-primaryText{color:"
}, {
  "theme": "redDark",
  "defaultValue": "#a4262c"
}, {
  "rawString": ";border-bottom:2px dotted "
}, {
  "theme": "redDark",
  "defaultValue": "#a4262c"
}, {
  "rawString": "}.personaContainer_06a7696b.validationError_06a7696b .ms-Persona-initials{font-size:20px}.personaContainer_06a7696b.validationError_06a7696b.personaContainerIsSelected_06a7696b{background:"
}, {
  "theme": "redDark",
  "defaultValue": "#a4262c"
}, {
  "rawString": "}.personaContainer_06a7696b.validationError_06a7696b.personaContainerIsSelected_06a7696b .ms-Persona-primaryText{color:"
}, {
  "theme": "white",
  "defaultValue": "#ffffff"
}, {
  "rawString": ";border-bottom:2px dotted "
}, {
  "theme": "white",
  "defaultValue": "#ffffff"
}, {
  "rawString": "}.personaContainer_06a7696b.validationError_06a7696b.personaContainerIsSelected_06a7696b .removeButton_06a7696b:hover{background:"
}, {
  "theme": "red",
  "defaultValue": "#e81123"
}, {
  "rawString": "}@media screen and (-ms-high-contrast:active){.personaContainer_06a7696b{border:1px solid WindowText}}.personaContainer_06a7696b .itemContent_06a7696b{-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto;min-width:0;max-width:100%;overflow:hidden}.personaContainer_06a7696b .removeButton_06a7696b{border-radius:15px;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;width:28px;height:28px;-ms-flex-preferred-size:28px;flex-basis:28px}.personaContainer_06a7696b .removeButton_06a7696b:hover{background:"
}, {
  "theme": "neutralTertiaryAlt",
  "defaultValue": "#c8c6c4"
}, {
  "rawString": ";color:"
}, {
  "theme": "neutralDark",
  "defaultValue": "#201f1e"
}, {
  "rawString": "}.personaContainer_06a7696b .personaDetails_06a7696b{-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto}.itemContainer_06a7696b{display:inline-block;vertical-align:top}"
}]);
var personaContainer = "personaContainer_06a7696b";
exports.personaContainer = personaContainer;
var removeButton = "removeButton_06a7696b";
exports.removeButton = removeButton;
var personaContainerIsSelected = "personaContainerIsSelected_06a7696b";
exports.personaContainerIsSelected = personaContainerIsSelected;
var validationError = "validationError_06a7696b";
exports.validationError = validationError;
var itemContent = "itemContent_06a7696b";
exports.itemContent = itemContent;
var personaDetails = "personaDetails_06a7696b";
exports.personaDetails = personaDetails;
var itemContainer = "itemContainer_06a7696b";
exports.itemContainer = itemContainer;