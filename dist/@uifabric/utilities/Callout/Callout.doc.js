"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalloutPageProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _CalloutBasic = require("./examples/Callout.Basic.Example");

var _CalloutStatus = require("./examples/Callout.Status.Example");

var _CalloutFocusTrap = require("./examples/Callout.FocusTrap.Example");

var _CalloutDirectional = require("./examples/Callout.Directional.Example");

var _CalloutCover = require("./examples/Callout.Cover.Example");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CalloutBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx');

var StatusCalloutExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Status.Example.tsx');

var CalloutFocusTrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.FocusTrap.Example.tsx');

var CalloutDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx');

var CalloutCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx');

var CalloutPageProps = {
  title: 'Callout',
  componentName: 'Callout',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Callout',
  examples: [{
    title: 'Default Callout',
    code: CalloutBasicExampleCode,
    view: /*#__PURE__*/React.createElement(_CalloutBasic.CalloutBasicExample, null)
  }, {
    title: 'FocusTrapCallout Variant',
    code: CalloutFocusTrapExampleCode,
    view: /*#__PURE__*/React.createElement(_CalloutFocusTrap.CalloutFocusTrapExample, null)
  }, {
    title: 'Non-focusable Callout with accessible text',
    code: StatusCalloutExampleCode,
    view: /*#__PURE__*/React.createElement(_CalloutStatus.StatusCalloutExample, null)
  }, {
    title: 'Callout with directional hint',
    code: CalloutDirectionalExampleCode,
    view: /*#__PURE__*/React.createElement(_CalloutDirectional.CalloutDirectionalExample, null)
  }, {
    title: 'Callout that covers the target element',
    code: CalloutCoverExampleCode,
    view: /*#__PURE__*/React.createElement(_CalloutCover.CalloutCoverExample, null)
  }],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutOverview.md'),
  bestPractices: '',
  dos: require('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDos.md'),
  donts: require('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
exports.CalloutPageProps = CalloutPageProps;