"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.string.includes.js");

var React = _interopRequireWildcard(require("react"));

var _PickerStyle = require("./PickerStyle");

var _CustomTextField = _interopRequireDefault(require("../TextField/CustomTextField"));

var _ContextualMenu = require("../@uifabric/utilities/ContextualMenu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this._onHandleChangeInput = (ev, val) => {
      if (val) {
        this.setState({
          value: val,
          contextualMenu: this._getContextualMenuProps(ev, val)
        }, () => this.onHandleSendValueToParent(val));
      }

      if (!val) {
        this.setState({
          value: "",
          contextualMenu: undefined
        }, () => this.onHandleSendValueToParent(""));
      }
    };

    this._onContextualMenuDismissed = () => {
      this.setState({
        contextualMenu: undefined
      });
    };

    this._getContextualMenuProps = (ev, val) => {
      let crtItems = [...this.props.items];

      if (val.trim() !== "") {
        crtItems = crtItems.filter(i => {
          var _i$text;

          return (_i$text = i.text) === null || _i$text === void 0 ? void 0 : _i$text.toLocaleLowerCase().includes(val.toLocaleLowerCase());
        });
      }

      return {
        items: crtItems,
        target: ev.target,
        directionalHint: _ContextualMenu.DirectionalHint.bottomLeftEdge,
        useTargetWidth: true,
        onDismiss: this._onContextualMenuDismissed
      };
    };

    this._onHandleChoiceItemSort = (ev, item) => {
      if (item) {
        this.setState({
          value: item.text || ""
        }, () => this.onHandleSendValueToParent(item.text || ""));
      }
    };

    this.onHandleSendValueToParent = str => {
      if (this.props.onGetValueOfPicker) {
        this.props.onGetValueOfPicker(str ? str : this.state.value);
      }
    };

    this.state = {
      contextualMenu: undefined,
      value: ""
    };
  }

  componentDidMount() {
    if (this.props.value && this.props.value.trim() !== "") {
      this.setState({
        value: this.props.value
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(_PickerStyle.PickerWrapper, {
      className: "PickerWrapper",
      theme: this.props.darkMode
    }, /*#__PURE__*/React.createElement(_CustomTextField.default, _extends({
      onChange: this._onHandleChangeInput,
      className: "picker__ipt",
      darkMode: this.props.darkMode,
      rcName: this.props.rcName,
      value: this.state.value,
      errorMessage: this.props.errorMessage
    }, this.props.inputProps)), this.state.contextualMenu && this.state.value.trim() !== "" && /*#__PURE__*/React.createElement(_ContextualMenu.ContextualMenu, _extends({
      onItemClick: this._onHandleChoiceItemSort
    }, this.state.contextualMenu, {
      rcName: this.props.rcName,
      styles: {
        root: {
          background: this.props.darkMode === "dark" ? "#333333" : "#ffffff",
          border: "transparent"
        },
        container: {
          maxHeight: "200px",
          overflowY: "scroll",
          selectors: {
            "::-webkit-scrollbar": {
              backgroundColor: this.props.darkMode === "dark" ? "#333333" : "#ffffff",
              cursor: "pointer"
            },
            "::-webkit-scrollbar-thumb": {
              background: this.props.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4",
              borderRadius: "10px",
              backgroundClip: "content-box",
              border: "solid 6px transparent"
            }
          }
        },
        subComponentStyles: {
          menuItem: () => {
            return {
              root: [{
                color: this.props.darkMode === "dark" ? "#ffffff" : "#212121"
              }, {
                selectors: {
                  ":hover": {
                    background: this.props.darkMode === "dark" ? "#445B6C" : "#F4F4F4",
                    color: this.props.darkMode === "dark" ? "#ffffff" : "#212121"
                  },
                  ":active": {
                    background: this.props.darkMode === "dark" ? "#445B6C" : "#F4F4F4",
                    color: this.props.darkMode === "dark" ? "#ffffff" : "#212121"
                  }
                }
              }]
            };
          }
        }
      },
      calloutProps: {
        styles: {
          root: {
            zIndex: 1
          },
          calloutMain: {
            overflow: "hidden",
            opacity: 1
          }
        }
      },
      shouldFocusOnMount: false
    })));
  }

}

var _default = Picker; // ":hover" :{
//   background: "#98a3a6",
//   backgroundClip: "content-box",
//   border: "solid 6px transparent",
// }

exports.default = _default;