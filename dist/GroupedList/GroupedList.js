"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupedList = void 0;

var _utilities = require("../@uifabric/utilities");

var _GroupedList = require("./GroupedList.styles");

var _GroupedList2 = require("./GroupedList.base");

var GroupedList = (0, _utilities.styled)(_GroupedList2.GroupedListBase, _GroupedList.getStyles, undefined, {
  scope: "GroupedList"
});
exports.GroupedList = GroupedList;