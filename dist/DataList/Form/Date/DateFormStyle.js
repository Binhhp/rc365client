"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateFormWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const DateFormWrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 18px 0 18px 0;\n  .DropdownWrapper {\n    margin-bottom: 20px;\n  }\n  .ms-Dropdown-container {\n    margin-bottom: 15px;\n  }\n  .dayPicker_4cbef05b {\n    box-shadow: none;\n    width: 100%;\n    .ms-DatePicker-holder {\n      width: 100%;\n      .ms-DatePicker-table {\n        width: 100%;\n      }\n    }\n  }\n  .action__wrapper {\n    display: flex;\n    padding: 20px 0;\n    .ms-Button {\n      margin-right: 15px;\n    }\n  }\n"])));

exports.DateFormWrapper = DateFormWrapper;