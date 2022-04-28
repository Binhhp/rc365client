"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsRowCheck = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../@uifabric/utilities");

var _DetailsRowCheck = require("./DetailsRowCheck.styles");

var _renderFunction = require("../@uifabric/utilities/renderFunction");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getClassNames = (0, _utilities.classNamesFunction)();

var DetailsRowCheckBase = function DetailsRowCheckBase(props) {
  var _a = props.isVisible,
      isVisible = _a === void 0 ? false : _a,
      _b = props.canSelect,
      canSelect = _b === void 0 ? false : _b,
      _c = props.anySelected,
      anySelected = _c === void 0 ? false : _c,
      _d = props.selected,
      selected = _d === void 0 ? false : _d,
      _e = props.isHeader,
      isHeader = _e === void 0 ? false : _e,
      className = props.className,
      // checkClassName = props.checkClassName,
  styles = props.styles,
      theme = props.theme,
      rcName = props.rcName,
      compact = props.compact,
      onRenderDetailsCheckbox = props.onRenderDetailsCheckbox,
      _f = props.useFastIcons,
      useFastIcons = _f === void 0 ? true : _f,
      // must be removed from buttonProps
  buttonProps = (0, _tslib.__rest)(props, ["isVisible", "canSelect", "anySelected", "selected", "isHeader", "className", "checkClassName", "styles", "theme", "compact", "onRenderDetailsCheckbox", "useFastIcons"]);
  var defaultCheckboxRender = useFastIcons ? _fastDefaultCheckboxRender : _defaultCheckboxRender;
  var onRenderCheckbox = onRenderDetailsCheckbox ? (0, _renderFunction.composeRenderFunction)(onRenderDetailsCheckbox, defaultCheckboxRender) : defaultCheckboxRender;
  var classNames = getClassNames(styles, {
    theme: theme,
    canSelect: canSelect,
    selected: selected,
    anySelected: anySelected,
    className: className,
    isHeader: isHeader,
    isVisible: isVisible,
    compact: compact
  });
  var detailsCheckboxProps = {
    checked: selected,
    theme: theme,
    rcName: rcName
  };
  return canSelect ? /*#__PURE__*/React.createElement("div", (0, _tslib.__assign)({}, buttonProps, {
    role: "checkbox",
    // tslint:disable-next-line:deprecation
    className: (0, _utilities.css)(classNames.root, classNames.check),
    "aria-checked": selected,
    "data-selection-toggle": true,
    "data-automationid": "DetailsRowCheck" // "data-rc-id": rcName ? `dl.cbx.${rcName}` : undefined,

  }), onRenderCheckbox(detailsCheckboxProps)) :
  /*#__PURE__*/
  // tslint:disable-next-line:deprecation
  React.createElement("div", (0, _tslib.__assign)({}, buttonProps, {
    className: (0, _utilities.css)(classNames.root, classNames.check)
  }));
};

var FastCheck = /*#__PURE__*/React.memo(function (props) {
  return /*#__PURE__*/React.createElement(_utilities.Check, {
    theme: props.theme,
    checked: props.checked,
    className: props.className,
    useFastIcons: true,
    rcName: props.rcName
  });
});

function _defaultCheckboxRender(checkboxProps) {
  return /*#__PURE__*/React.createElement(_utilities.Check, {
    checked: checkboxProps.checked,
    rcName: checkboxProps.rcName
  });
}

function _fastDefaultCheckboxRender(checkboxProps) {
  return /*#__PURE__*/React.createElement(FastCheck, {
    theme: checkboxProps.theme,
    checked: checkboxProps.checked,
    rcName: checkboxProps.rcName
  });
}

var DetailsRowCheck = (0, _utilities.styled)(DetailsRowCheckBase, _DetailsRowCheck.getStyles, undefined, {
  scope: "DetailsRowCheck"
}, true);
exports.DetailsRowCheck = DetailsRowCheck;