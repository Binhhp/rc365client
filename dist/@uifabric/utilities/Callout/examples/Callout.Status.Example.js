"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusCalloutExample = void 0;

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
  subtext: [theme.fonts.small, {
    margin: 0,
    height: '100%',
    padding: '24px 20px',
    fontWeight: _officeUiFabricReact.FontWeights.semilight
  }]
});

var StatusCalloutExample = function StatusCalloutExample() {
  var _a = (0, _reactHooks.useBoolean)(false),
      isCalloutVisible = _a[0],
      toggleIsCalloutVisible = _a[1].toggle;

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.buttonArea
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.DefaultButton, {
    onClick: toggleIsCalloutVisible,
    text: isCalloutVisible ? 'Hide StatusCallout' : 'Show StatusCallout'
  })), isCalloutVisible && /*#__PURE__*/React.createElement(_officeUiFabricReact.Callout, {
    className: styles.callout,
    target: "." + styles.buttonArea,
    onDismiss: toggleIsCalloutVisible,
    role: "status",
    "aria-live": "assertive"
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.DelayedRender, null, /*#__PURE__*/React.createElement("p", {
    className: styles.subtext
  }, "This message is treated as an aria-live assertive status message, and will be read by a screen reader regardless of focus."))));
};

exports.StatusCalloutExample = StatusCalloutExample;