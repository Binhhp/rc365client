"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsHeader = void 0;

var _utilities = require("../@uifabric/utilities");

var _DetailsHeader = require("./DetailsHeader.base");

var _DetailsHeader2 = require("./DetailsHeader.styles");

var DetailsHeader = (0, _utilities.styled)(_DetailsHeader.DetailsHeaderBase, _DetailsHeader2.getStyles, undefined, {
  scope: "DetailsHeader"
});
exports.DetailsHeader = DetailsHeader;