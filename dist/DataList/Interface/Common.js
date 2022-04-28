"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderValue = exports.OperatorFilterStringEnums = exports.OperatorFilterNumberEnums = exports.FilterType = void 0;
let OperatorFilterStringEnums;
exports.OperatorFilterStringEnums = OperatorFilterStringEnums;

(function (OperatorFilterStringEnums) {
  OperatorFilterStringEnums["Equal"] = "eq";
  OperatorFilterStringEnums["NotEqual"] = "ne";
  OperatorFilterStringEnums["NotContain"] = "not";
  OperatorFilterStringEnums["Contain"] = "contains";
  OperatorFilterStringEnums["Null"] = "null";
})(OperatorFilterStringEnums || (exports.OperatorFilterStringEnums = OperatorFilterStringEnums = {}));

let OperatorFilterNumberEnums;
exports.OperatorFilterNumberEnums = OperatorFilterNumberEnums;

(function (OperatorFilterNumberEnums) {
  OperatorFilterNumberEnums["Equal"] = "eq";
  OperatorFilterNumberEnums["Less"] = "lt";
  OperatorFilterNumberEnums["Greater"] = "gt";
  OperatorFilterNumberEnums["LessOrEqual"] = "le";
  OperatorFilterNumberEnums["GreaterOrEqual"] = "ge";
  OperatorFilterNumberEnums["Null"] = "null";
})(OperatorFilterNumberEnums || (exports.OperatorFilterNumberEnums = OperatorFilterNumberEnums = {}));

let FilterType;
exports.FilterType = FilterType;

(function (FilterType) {
  FilterType["Filter"] = "Filter";
  FilterType["Sort"] = "Sort";
})(FilterType || (exports.FilterType = FilterType = {}));

let OrderValue;
exports.OrderValue = OrderValue;

(function (OrderValue) {
  OrderValue["asc"] = "asc";
  OrderValue["desc"] = "desc";
})(OrderValue || (exports.OrderValue = OrderValue = {}));