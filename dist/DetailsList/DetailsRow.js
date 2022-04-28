"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsRow = void 0;

var _utilities = require("../@uifabric/utilities");

var _DetailsRow = require("./DetailsRow.base");

var _DetailsRow2 = require("./DetailsRow.styles");

var DetailsRow = (0, _utilities.styled)(_DetailsRow.DetailsRowBase, _DetailsRow2.getStyles, undefined, {
  scope: "DetailsRow"
});
exports.DetailsRow = DetailsRow;