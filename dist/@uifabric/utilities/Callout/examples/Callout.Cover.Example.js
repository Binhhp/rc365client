"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalloutCoverExample = void 0;

var React = _interopRequireWildcard(require("react"));

var _officeUiFabricReact = require("office-ui-fabric-react");

var _reactHooks = require("@uifabric/react-hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DIRECTION_OPTIONS = [{
  key: _officeUiFabricReact.DirectionalHint.topLeftEdge,
  text: 'Top Left Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.topCenter,
  text: 'Top Center'
}, {
  key: _officeUiFabricReact.DirectionalHint.topRightEdge,
  text: 'Top Right Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.topAutoEdge,
  text: 'Top Auto Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.bottomLeftEdge,
  text: 'Bottom Left Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.bottomCenter,
  text: 'Bottom Center'
}, {
  key: _officeUiFabricReact.DirectionalHint.bottomRightEdge,
  text: 'Bottom Right Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.bottomAutoEdge,
  text: 'Bottom Auto Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.leftTopEdge,
  text: 'Left Top Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.leftCenter,
  text: 'Left Center'
}, {
  key: _officeUiFabricReact.DirectionalHint.leftBottomEdge,
  text: 'Left Bottom Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.rightTopEdge,
  text: 'Right Top Edge'
}, {
  key: _officeUiFabricReact.DirectionalHint.rightCenter,
  text: 'Right Center'
}, {
  key: _officeUiFabricReact.DirectionalHint.rightBottomEdge,
  text: 'Right Bottom Edge'
}];
var styles = (0, _officeUiFabricReact.mergeStyleSets)({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32
  },
  configArea: {
    minWidth: '300px',
    display: 'inline-block'
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
  }
});

var CalloutCoverExample = function CalloutCoverExample() {
  var _a = (0, _reactHooks.useBoolean)(false),
      isCalloutVisible = _a[0],
      toggleIsCalloutVisible = _a[1].toggle;

  var _b = React.useState(_officeUiFabricReact.DirectionalHint.bottomLeftEdge),
      directionalHint = _b[0],
      setDirectionalHint = _b[1];

  var onDirectionalChanged = function onDirectionalChanged(event, option) {
    setDirectionalHint(option.key);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.configArea
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.Dropdown, {
    label: "Directional hint",
    selectedKey: directionalHint,
    options: DIRECTION_OPTIONS,
    onChange: onDirectionalChanged
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.buttonArea
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.DefaultButton, {
    text: isCalloutVisible ? 'Hide callout' : 'Show callout',
    onClick: toggleIsCalloutVisible
  })), isCalloutVisible ? /*#__PURE__*/React.createElement(_officeUiFabricReact.Callout, {
    className: styles.callout,
    onDismiss: toggleIsCalloutVisible,
    target: "." + styles.buttonArea,
    directionalHint: directionalHint,
    coverTarget: true,
    isBeakVisible: false,
    gapSpace: 0,
    setInitialFocus: true
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.Text, {
    className: styles.title
  }, "I'm covering the target!")), /*#__PURE__*/React.createElement("div", {
    className: styles.inner
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.DefaultButton, {
    onClick: toggleIsCalloutVisible,
    text: "Click to dismiss"
  }))) : null);
};

exports.CalloutCoverExample = CalloutCoverExample;