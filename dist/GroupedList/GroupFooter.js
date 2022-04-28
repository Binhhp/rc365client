"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupFooter = void 0;

var _utilities = require("../@uifabric/utilities");

var _GroupFooter = require("./GroupFooter.styles");

var _GroupFooter2 = require("./GroupFooter.base");

var GroupFooter = (0, _utilities.styled)(_GroupFooter2.GroupFooterBase, _GroupFooter.getStyles, undefined, {
  scope: 'GroupFooter'
});
exports.GroupFooter = GroupFooter;