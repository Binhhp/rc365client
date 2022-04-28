"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Autofill = require("../../Autofill/Autofill");

Object.keys(_Autofill).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Autofill[key];
    }
  });
});