"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalloutFocusTrapExample = void 0;

var React = _interopRequireWildcard(require("react"));

var _officeUiFabricReact = require("office-ui-fabric-react");

var _reactHooks = require("@uifabric/react-hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = (0, _officeUiFabricReact.mergeStyleSets)({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32
  },
  callout: {
    maxWidth: 300
  },
  header: {
    padding: '18px 24px 12px'
  },
  title: [{
    margin: 0,
    fontWeight: _officeUiFabricReact.FontWeights.semilight
  }],
  inner: {
    height: '100%',
    padding: '0 24px 20px'
  },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 24px 24px'
  },
  subtext: [{
    margin: 0,
    fontWeight: _officeUiFabricReact.FontWeights.semilight
  }]
});

var CalloutFocusTrapExample = function CalloutFocusTrapExample() {
  var _a = (0, _reactHooks.useBoolean)(false),
      isCalloutVisible = _a[0],
      toggleIsCalloutVisible = _a[1].toggle;

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.buttonArea
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.DefaultButton, {
    onClick: toggleIsCalloutVisible,
    text: isCalloutVisible ? 'Hide FocusTrapCallout' : 'Show FocusTrapCallout'
  })), isCalloutVisible ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_officeUiFabricReact.FocusTrapCallout, {
    role: "alertdialog",
    className: styles.callout,
    gapSpace: 0,
    target: "." + styles.buttonArea,
    onDismiss: toggleIsCalloutVisible,
    setInitialFocus: true
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.Text, {
    className: styles.title
  }, "Callout title here")), /*#__PURE__*/React.createElement("div", {
    className: styles.inner
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_officeUiFabricReact.Text, {
    className: styles.subtext
  }, "Content is wrapped in a FocusTrapZone so that user cannot accidently tab out of this callout."))), /*#__PURE__*/React.createElement(_officeUiFabricReact.FocusZone, null, /*#__PURE__*/React.createElement(_officeUiFabricReact.Stack, {
    className: styles.buttons,
    gap: 8,
    horizontal: true
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.PrimaryButton, {
    onClick: toggleIsCalloutVisible
  }, "Button 1"), /*#__PURE__*/React.createElement(_officeUiFabricReact.DefaultButton, {
    onClick: toggleIsCalloutVisible
  }, "Button 2"))))) : null);
};

exports.CalloutFocusTrapExample = CalloutFocusTrapExample;