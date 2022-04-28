"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = void 0;

var _utilities = require("../@uifabric/utilities");

var _Dropdown = require("./Dropdown.base");

var _Dropdown2 = require("./Dropdown.styles");

var Dropdown = (0, _utilities.styled)(_Dropdown.DropdownBase, _Dropdown2.getStyles, undefined, {
  scope: "Dropdown"
});
exports.Dropdown = Dropdown;