"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalloutBasicExample = void 0;

var React = _interopRequireWildcard(require("react"));

var _officeUiFabricReact = require("office-ui-fabric-react");

var _reactHooks = require("@uifabric/react-hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var theme = (0, _officeUiFabricReact.getTheme)();
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
  title: [theme.fonts.xLarge, {
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
  subtext: [theme.fonts.small, {
    margin: 0,
    fontWeight: _officeUiFabricReact.FontWeights.semilight
  }],
  link: [theme.fonts.medium, {
    color: theme.palette.neutralPrimary
  }]
});

var CalloutBasicExample = function CalloutBasicExample() {
  var _a = (0, _reactHooks.useBoolean)(false),
      isCalloutVisible = _a[0],
      toggleIsCalloutVisible = _a[1].toggle;

  var labelId = (0, _reactHooks.useId)('callout-label');
  var descriptionId = (0, _reactHooks.useId)('callout-description');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.buttonArea
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.DefaultButton, {
    onClick: toggleIsCalloutVisible,
    text: isCalloutVisible ? 'Hide Callout' : 'Show Callout'
  })), isCalloutVisible && /*#__PURE__*/React.createElement(_officeUiFabricReact.Callout, {
    className: styles.callout,
    ariaLabelledBy: labelId,
    ariaDescribedBy: descriptionId,
    role: "alertdialog",
    gapSpace: 0,
    target: "." + styles.buttonArea,
    onDismiss: toggleIsCalloutVisible,
    setInitialFocus: true
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.Text, {
    className: styles.title,
    id: labelId
  }, "All of your favorite people")), /*#__PURE__*/React.createElement("div", {
    className: styles.inner
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.Text, {
    className: styles.subtext,
    id: descriptionId
  }, "Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom."), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.Link, {
    className: styles.link,
    href: "http://microsoft.com",
    target: "_blank"
  }, "Go to microsoft")))));
};

exports.CalloutBasicExample = CalloutBasicExample;