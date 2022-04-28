"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsColumn = void 0;

var _utilities = require("../@uifabric/utilities");

var _DetailsColumn = require("./DetailsColumn.base");

var _DetailsColumn2 = require("./DetailsColumn.styles");

var DetailsColumn = (0, _utilities.styled)(_DetailsColumn.DetailsColumnBase, _DetailsColumn2.getStyles, undefined, {
  scope: "DetailsColumn"
});
exports.DetailsColumn = DetailsColumn;