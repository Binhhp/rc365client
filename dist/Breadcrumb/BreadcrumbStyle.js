"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadcrumbWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const BreadcrumbWrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: auto;\n  display: flex;\n  align-items: center;\n  .note__root{\n    button{\n      cursor: default;\n    }\n    span.ms-Button-label{\n      cursor: pointer;\n      &:hover{\n        color: #0078d4;\n      }\n    }\n  }\n  .note__child{\n    cursor: default;\n    span.ms-Button-label{\n      cursor: default;\n    }\n  }\n"])));

exports.BreadcrumbWrapper = BreadcrumbWrapper;