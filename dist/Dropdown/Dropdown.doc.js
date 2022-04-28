"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownPageProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _DropdownBasic = require("./examples/Dropdown.Basic.Example");

var _DropdownControlled = require("./examples/Dropdown.Controlled.Example");

var _DropdownControlledMulti = require("./examples/Dropdown.ControlledMulti.Example");

var _DropdownCustom = require("./examples/Dropdown.Custom.Example");

var _DropdownError = require("./examples/Dropdown.Error.Example");

var _DropdownRequired = require("./examples/Dropdown.Required.Example");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DropdownBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Basic.Example.tsx');

var DropdownControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Controlled.Example.tsx');

var DropdownControlledMultiExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.ControlledMulti.Example.tsx');

var DropdownCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Custom.Example.tsx');

var DropdownErrorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Error.Example.tsx');

var DropdownRequiredExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Required.Example.tsx');

var DropdownPageProps = {
  title: 'Dropdown',
  componentName: 'Dropdown',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Dropdown',
  examples: [{
    title: 'Basic Dropdowns',
    code: DropdownBasicExampleCode,
    view: /*#__PURE__*/React.createElement(_DropdownBasic.DropdownBasicExample, null)
  }, {
    title: 'Controlled single-select Dropdown',
    code: DropdownControlledExampleCode,
    view: /*#__PURE__*/React.createElement(_DropdownControlled.DropdownControlledExample, null)
  }, {
    title: 'Controlled multi-select Dropdown',
    code: DropdownControlledMultiExampleCode,
    view: /*#__PURE__*/React.createElement(_DropdownControlledMulti.DropdownControlledMultiExample, null)
  }, {
    title: 'Customized Dropdown',
    code: DropdownCustomExampleCode,
    view: /*#__PURE__*/React.createElement(_DropdownCustom.DropdownCustomExample, null)
  }, {
    title: 'Dropdown with error message',
    code: DropdownErrorExampleCode,
    view: /*#__PURE__*/React.createElement(_DropdownError.DropdownErrorExample, null)
  }, {
    title: 'Required Dropdown',
    code: DropdownRequiredExampleCode,
    view: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "This example also demonstrates how to programmatically set focus on and open a Dropdown."), /*#__PURE__*/React.createElement(_DropdownRequired.DropdownRequiredExample, null))
  }],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownOverview.md'),
  bestPractices: '',
  dos: require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDos.md'),
  donts: require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
exports.DropdownPageProps = DropdownPageProps;