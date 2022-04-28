"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooleanFormWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const BooleanFormWrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  .action__wrapper {\n    display: flex;\n    padding: 20px 0;\n    .ms-Button {\n      margin-right: 15px;\n    }\n  }\n"])));

exports.BooleanFormWrapper = BooleanFormWrapper;