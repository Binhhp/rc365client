"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupHeader = void 0;

var _utilities = require("../@uifabric/utilities");

var _GroupHeader = require("./GroupHeader.styles");

var _GroupHeader2 = require("./GroupHeader.base");

var GroupHeader = (0, _utilities.styled)(_GroupHeader2.GroupHeaderBase, _GroupHeader.getStyles, undefined, {
  scope: "GroupHeader"
});
exports.GroupHeader = GroupHeader;