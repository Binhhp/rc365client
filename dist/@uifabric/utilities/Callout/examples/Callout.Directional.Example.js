"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalloutDirectionalExample = void 0;

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
var theme = (0, _officeUiFabricReact.getTheme)();
var checkBoxStyles = {
  root: {
    margin: '10px 0'
  }
};
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
  calloutExampleButton: {
    width: '100%'
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
  subtext: [{
    margin: 0,
    fontWeight: _officeUiFabricReact.FontWeights.semilight
  }],
  link: [theme.fonts.medium, {
    color: theme.palette.neutralPrimary
  }],
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap'
  }
});

var CalloutDirectionalExample = function CalloutDirectionalExample() {
  var _a = (0, _reactHooks.useBoolean)(false),
      isCalloutVisible = _a[0],
      toggleIsCalloutVisible = _a[1].toggle;

  var _b = (0, _reactHooks.useBoolean)(true),
      isBeakVisible = _b[0],
      toggleIsBeakVisible = _b[1].toggle;

  var _c = React.useState(),
      gapSpace = _c[0],
      setGapSpace = _c[1];

  var _d = React.useState(),
      beakWidth = _d[0],
      setBeakWidth = _d[1];

  var labelId = (0, _reactHooks.useId)('callout-label');
  var descriptionId = (0, _reactHooks.useId)('callout-description');

  var _e = React.useState(_officeUiFabricReact.DirectionalHint.bottomLeftEdge),
      directionalHint = _e[0],
      setDirectionalHint = _e[1];

  var onDirectionalChanged = function onDirectionalChanged(event, option) {
    setDirectionalHint(option.key);
  };

  var onGapSlider = function onGapSlider(value) {
    setGapSpace(value);
  };

  var onBeakWidthSlider = function onBeakWidthSlider(value) {
    setBeakWidth(value);
  };

  var onShowBeakChange = function onShowBeakChange() {
    toggleIsBeakVisible();
    setBeakWidth(10);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.configArea
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.Checkbox, {
    styles: checkBoxStyles,
    label: "Show beak",
    checked: isBeakVisible,
    onChange: onShowBeakChange
  }), /*#__PURE__*/React.createElement(_officeUiFabricReact.Slider, {
    max: 30,
    label: "Gap Space",
    min: 0,
    defaultValue: 0,
    onChange: onGapSlider
  }), isBeakVisible && /*#__PURE__*/React.createElement(_officeUiFabricReact.Slider, {
    max: 50,
    label: "Beak Width",
    min: 10,
    defaultValue: 16,
    onChange: onBeakWidthSlider
  }), /*#__PURE__*/React.createElement(_officeUiFabricReact.Dropdown, {
    label: "Directional hint",
    selectedKey: directionalHint,
    options: DIRECTION_OPTIONS,
    onChange: onDirectionalChanged
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.buttonArea
  }, /*#__PURE__*/React.createElement(_officeUiFabricReact.DefaultButton, {
    className: styles.calloutExampleButton,
    onClick: toggleIsCalloutVisible,
    text: isCalloutVisible ? 'Hide callout' : 'Show callout'
  })), isCalloutVisible ? /*#__PURE__*/React.createElement(_officeUiFabricReact.Callout, {
    ariaLabelledBy: labelId,
    ariaDescribedBy: descriptionId,
    className: styles.callout,
    gapSpace: gapSpace,
    target: "." + styles.buttonArea,
    isBeakVisible: isBeakVisible,
    beakWidth: beakWidth,
    onDismiss: toggleIsCalloutVisible,
    directionalHint: directionalHint,
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
  }, "Go to Microsoft")))) : null);
};

exports.CalloutDirectionalExample = CalloutDirectionalExample;