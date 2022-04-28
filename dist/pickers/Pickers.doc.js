"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersPageProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _PickerCustomResult = require("./examples/Picker.CustomResult.Example");

var _TagPickerBasic = require("./examples/TagPicker.Basic.Example");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TagPickerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/TagPicker.Basic.Example.tsx');

var PickerCustomResultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/Picker.CustomResult.Example.tsx');

var PickersPageProps = {
  title: 'Pickers',
  componentName: 'Pickers',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Pickers',
  examples: [{
    title: 'Tag Picker',
    code: TagPickerExampleCode,
    view: /*#__PURE__*/React.createElement(_TagPickerBasic.TagPickerBasicExample, null)
  }, {
    title: 'Custom Picker (Document Picker)',
    code: PickerCustomResultExampleCode,
    view: /*#__PURE__*/React.createElement(_PickerCustomResult.PickerCustomResultExample, null)
  }],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/pickers/docs/PickersOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
exports.PickersPageProps = PickersPageProps;