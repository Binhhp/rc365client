"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalloutContent = void 0;

var _index = require("../index");

var _CalloutContent = require("./CalloutContent.base");

var _CalloutContent2 = require("./CalloutContent.styles");

var CalloutContent = (0, _index.styled)(_CalloutContent.CalloutContentBase, _CalloutContent2.getStyles, undefined, {
  scope: "CalloutContent"
});
exports.CalloutContent = CalloutContent;