"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupedListPageProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _GroupedListBasic = require("./examples/GroupedList.Basic.Example");

var _GroupedListCustom = require("./examples/GroupedList.Custom.Example");

var _GroupedListCustomCheckbox = require("./examples/GroupedList.CustomCheckbox.Example");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var GroupedListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Basic.Example.tsx');

var GroupedListCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Custom.Example.tsx');

var GroupedListCustomCheckboxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.CustomCheckbox.Example.tsx');

var GroupedListPageProps = {
  title: 'GroupedList',
  componentName: 'GroupedList',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/GroupedList',
  examples: [{
    title: 'GroupedList basic example',
    code: GroupedListBasicExampleCode,
    view: /*#__PURE__*/React.createElement(_GroupedListBasic.GroupedListBasicExample, null)
  }, {
    title: 'GroupedList example with custom header and footer',
    code: GroupedListCustomExampleCode,
    view: /*#__PURE__*/React.createElement(_GroupedListCustom.GroupedListCustomExample, null)
  }, {
    title: 'GroupedList example with custom checkbox',
    code: GroupedListCustomCheckboxExampleCode,
    view: /*#__PURE__*/React.createElement(_GroupedListCustomCheckbox.GroupedListCustomCheckboxExample, null)
  }],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/docs/GroupedListOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true
};
exports.GroupedListPageProps = GroupedListPageProps;