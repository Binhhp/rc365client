"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var React = _interopRequireWildcard(require("react"));

var _Dropdown = require("./Dropdown");

var _CustomDropdownStyle = require("./CustomDropdownStyle");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CustomDropdown extends React.Component {
  constructor() {
    super(...arguments);
    this._dropdown = /*#__PURE__*/React.createRef();
  }

  componentDidMount() {
    if (this.props.autoFocus) this._dropdown.current.focus();
  }

  render() {
    let borderColor = this.props.darkMode === "dark" ? "1px solid #ffffff" : "1px solid #a6a6a6";

    if (this.props.errorMessage) {
      borderColor = this.props.darkMode === "dark" ? "1px solid #F1707B" : "1px solid #A80000";
    }

    return /*#__PURE__*/React.createElement(_CustomDropdownStyle.DropdownWrapper, {
      className: "DropdownWrapper",
      theme: this.props.darkMode
    }, /*#__PURE__*/React.createElement(_Dropdown.Dropdown, _extends({
      componentRef: this._dropdown
    }, this.props, {
      styles: _objectSpread({
        dropdownOptionText: {
          color: this.props.darkMode === "dark" ? "#ffffff " : "#323130 "
        },
        label: {
          selectors: {
            ":after": {
              color: this.props.darkMode === "dark" ? "#F1707B" : "#A80000"
            }
          }
        },
        dropdownItemsWrapper: {
          maxHeight: 500
        },
        errorMessage: {
          color: this.props.darkMode === "dark" ? "#F1707B" : "#A80000",
          paddingTop: 0,
          position: "absolute"
        },
        dropdown: {
          border: borderColor,
          // height: 32,
          selectors: {
            ":hover": {
              border: borderColor
            }
          }
        },
        title: {
          borderRadius: 0,
          fontWeight: "normal",
          border: "none !important",
          background: "transparent",
          color: this.props.darkMode === "dark" ? "#ffffff !important" : "#323130 !important"
        },
        dropdownItemSelected: [{
          backgroundColor: this.props.darkMode === "dark" ? "#000000" : "#edebe9",
          color: this.props.darkMode === "dark" ? "#ffffff" : "#333333"
        }, {
          selectors: {
            ":hover:focus": {
              backgroundColor: this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#333333"
            },
            ":focus": {
              backgroundColor: this.props.darkMode === "dark" ? "#000000" : "#F4F4F4"
            },
            ":active": {
              backgroundColor: this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#333333"
            }
          }
        }],
        dropdownItem: [{
          color: this.props.darkMode === "dark" ? "#ffffff" : "#212121"
        }, {
          selectors: {
            ":hover:focus": {
              backgroundColor: this.props.darkMode === "dark" ? "#212121" : "#F4F4F4",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#333333"
            },
            ":active": {
              backgroundColor: this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#333333"
            },
            ":hover": {
              backgroundColor: this.props.darkMode === "dark" ? "#212121" : "#F4F4F4",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#333333"
            }
          }
        }],
        dropdownItemDisabled: [{
          color: this.props.darkMode === "dark" ? "#eaeaea" : "#A6A6A6",
          opacity: this.props.darkMode === "dark" ? "0.5" : "1"
        }]
      }, this.props.styles),
      calloutProps: _objectSpread({
        backgroundColor: this.props.darkMode === "dark" ? "#333333" : "#ffffff",
        styles: {
          calloutMain: [{
            border: this.props.darkMode === "dark" ? "1px solid #212121" : "1px solid #f7f7f7",
            selectors: {
              "&::-webkit-scrollbar": {
                backgroundColor: "transparent",
                cursor: "pointer"
              },
              "&::-webkit-scrollbar-thumb": {
                background: this.props.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4",
                borderRadius: " 10px",
                backgroundClip: "content-box",
                border: "solid 6px transparent"
              }
            }
          }]
        }
      }, this.props.calloutProps),
      onRenderPlaceholder: () => {
        return /*#__PURE__*/React.createElement("span", {
          className: "ddl.placeHolder",
          style: {
            opacity: "0.6"
          }
        }, this.props.placeholder);
      }
    })));
  }

}

var _default = CustomDropdown;
exports.default = _default;