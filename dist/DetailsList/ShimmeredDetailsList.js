"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShimmeredDetailsList = void 0;

var _utilities = require("../@uifabric/utilities");

var _ShimmeredDetailsList = require("./ShimmeredDetailsList.base");

var _ShimmeredDetailsList2 = require("./ShimmeredDetailsList.styles");

var ShimmeredDetailsList = (0, _utilities.styled)(_ShimmeredDetailsList.ShimmeredDetailsListBase, _ShimmeredDetailsList2.getStyles, undefined, {
  scope: "ShimmeredDetailsList"
});
exports.ShimmeredDetailsList = ShimmeredDetailsList;