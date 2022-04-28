"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsList = void 0;

var _utilities = require("../@uifabric/utilities");

var _DetailsList = require("./DetailsList.base");

var _DetailsList2 = require("./DetailsList.styles");

var DetailsList = (0, _utilities.styled)(_DetailsList.DetailsListBase, _DetailsList2.getStyles, undefined, {
  scope: "DetailsList"
});
exports.DetailsList = DetailsList;