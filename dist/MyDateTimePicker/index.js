"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.trim.js");

var React = _interopRequireWildcard(require("react"));

var _icons = require("../@uifabric/icons");

var _Callout = require("../@uifabric/utilities/Callout");

var _ContextualMenu = require("../@uifabric/utilities/ContextualMenu");

var _CalenderInline = _interopRequireDefault(require("../calendar-custom/CalenderInline"));

var _CustomSpinButton = _interopRequireDefault(require("../SpinButton/CustomSpinButton"));

var _CustomTextField = _interopRequireDefault(require("../TextField/CustomTextField"));

var _DateTimePickerStyle = require("./DateTimePickerStyle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this._onHandleConvertValueToData = value => {
      if (value) {
        let date = new Date(value);
        this.setState({
          date,
          value: date ? date.toLocaleString() : "",
          hour: date ? date.getHours() : 0,
          minute: date ? date.getMinutes() : 0,
          second: date ? date.getSeconds() : 0
        });
      }
    };

    this._onHandleUpdateVisibleCallout = (val, displayDate) => {
      if (typeof val === "undefined") {
        this.setState({
          isVisibledCallout: !this.state.isVisibledCallout,
          value: displayDate || this.state.value
        });
      }

      if (typeof val !== "undefined") {
        this.setState({
          isVisibledCallout: val,
          value: displayDate || this.state.value // date: this.state.value.trim() === "" ? null : this.state.date,
          // hour: this.state.value.trim() === "" ? 0 : this.state.hour,
          // minute: this.state.value.trim() === "" ? 0 : this.state.minute,
          // second: this.state.value.trim() === "" ? 0 : this.state.second,

        }); // if (this.props.onGetValue) {
        //   this.props.onGetValue("");
        // }
      }
    };

    this._onHandleSentValue = () => {
      if (this.props.onGetValue) {
        let date = this._onHandleConvertToDisplayText();

        let result = date.toLocaleString();

        if (this.props.getDataType) {
          switch (this.props.getDataType.toLocaleLowerCase()) {
            case "date":
              result = date;
              break;

            case "time":
              result = date.getTime();
              break;

            case "ticks":
              result = date.getTime() * 10000 + 621355968000000000;
              break;

            default:
              break;
          }
        }

        if (this.state.date) {
          this.props.onGetValue(result);
        } else {
          this.props.onGetValue("");
        }
      }
    };

    this._onHandleConvertToDisplayText = date => {
      let crtDate = date ? date : this.state.date;

      if (crtDate) {
        crtDate.setHours(this.state.hour);
        crtDate.setMinutes(this.state.minute);
        crtDate.setSeconds(this.state.second);
        return crtDate;
      }

      return new Date();
    };

    this.onHandleOnFocusInMask = () => {
      var _this$props$textField;

      this._onHandleUpdateVisibleCallout(true);

      return (_this$props$textField = this.props.textFieldProps) === null || _this$props$textField === void 0 ? void 0 : _this$props$textField.onFocus;
    };

    this.onHandleDismiss = () => {
      var _this$props$calloutPr;

      this._onHandleUpdateVisibleCallout();

      return (_this$props$calloutPr = this.props.calloutProps) === null || _this$props$calloutPr === void 0 ? void 0 : _this$props$calloutPr.onDismiss;
    };

    this.onHandleCancel = () => {
      this.setState({
        hour: this.state.value.trim() === "" ? 0 : this.state.hour,
        minute: this.state.value.trim() === "" ? 0 : this.state.minute,
        second: this.state.value.trim() === "" ? 0 : this.state.second,
        date: this.state.value.trim() === "" ? null : this.state.date,
        value: this.state.value.trim() === "" ? "" : this.state.value,
        isVisibledCallout: false
      });

      if (this.state.value.trim() === "") {
        this._onHandleSentValue();
      }
    };

    this.onHandleCheck = () => {
      if (this.state.date) {
        let displayDate = this._onHandleConvertToDisplayText();

        this._onHandleUpdateVisibleCallout(undefined, displayDate.toLocaleString());

        this._onHandleSentValue();
      } else {
        this._onHandleUpdateVisibleCallout();

        this._onHandleSentValue();
      }
    };

    this.onValidateSpin = (value, event, type) => {
      let state = _objectSpread({}, this.state);

      state.isWorking = true;

      if (type === "hour" && !isNaN(Number(value))) {
        state[type] = Number(value);

        if (Number(value) <= 23) {
          return this.setState(state);
        }

        if (Number(value) >= 24) {
          return this.setState({
            hour: 24,
            second: 0,
            minute: 0
          });
        }
      }

      if (type && type !== "hour" && !isNaN(Number(value))) {
        if (Number(value) <= 59) {
          state[type] = Number(value);
        }

        if (Number(value) > 59 || this.state.hour === 24) {
          state[type] = 0;
        }

        return this.setState(state);
      }
    };

    this.onIncrementSpin = (value, type) => {
      let state = _objectSpread({}, this.state);

      if (type === "hour" && !isNaN(Number(value)) && Number(value) <= 22) {
        this.setState({
          hour: this.state.hour + 1
        });
      }

      if (type === "hour" && !isNaN(Number(value)) && Number(value) === 23) {
        this.setState({
          hour: 24,
          second: 0,
          minute: 0
        });
      }

      if (type && type !== "hour" && !isNaN(Number(value)) && Number(value) <= 58) {
        state[type] = Number(state[type]) + 1;
        state.isWorking = true;
        this.setState(state);
      }

      if (type && type !== "hour" && !isNaN(Number(value)) && Number(value) === 59) {
        state[type] = 0;
        state.isWorking = true;
        this.setState(state);
      }
    };

    this.onDecrementSpin = (value, type) => {
      let state = _objectSpread({}, this.state);

      state.isWorking = true;

      if (type && !isNaN(Number(value)) && Number(value) >= 1) {
        state[type] = Number(state[type]) - 1;
        this.setState(state);
      }
    };

    this.onGetDataCalendar = val => {
      if (!Array.isArray(val)) {
        this.setState({
          date: val
        });
      }
    };

    this.onHandleChange = (event, newValue) => {
      var _this$props$textField2;

      if (newValue && !isNaN(Date.parse(newValue)) && this._isValidDate(new Date(newValue))) {
        let date = new Date(newValue);
        this.setState({
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          date,
          value: newValue
        });
      } else {
        this.setState({
          value: newValue ? newValue : ""
        });
      }

      return (_this$props$textField2 = this.props.textFieldProps) === null || _this$props$textField2 === void 0 ? void 0 : _this$props$textField2.onChange;
    };

    this.state = {
      value: "",
      isVisibledCallout: false,
      hour: 0,
      minute: 0,
      second: 0,
      date: null
    };
  }

  componentDidUpdate(pp, ps) {
    if (this.props.value !== pp.value && typeof this.props.value !== "undefined" && !this.state.date) {
      this._onHandleConvertValueToData(this.props.value);
    }
  }

  _isValidDate(d) {
    return d instanceof Date && !isNaN(Number(d));
  }

  render() {
    var _this$props$calloutPr2, _this$props$calloutPr3, _this$props$calloutPr4, _this$props$calloutPr5;

    return /*#__PURE__*/React.createElement(_DateTimePickerStyle.DateTimePickerWrapper, {
      className: "DateTimePickerWrapper",
      theme: this.props.darkMode
    }, /*#__PURE__*/React.createElement(_CustomTextField.default, _extends({
      onFocus: this.onHandleOnFocusInMask,
      onChange: this.onHandleChange,
      value: this.state.value,
      id: this.props.id,
      rcName: this.props.rcName,
      darkMode: this.props.darkMode,
      autoComplete: "off",
      iconProps: {
        iconName: "Calendar"
      }
    }, this.props.textFieldProps)), this.state.isVisibledCallout && /*#__PURE__*/React.createElement(_Callout.Callout, _extends({
      directionalHintFixed: ((_this$props$calloutPr2 = this.props.calloutProps) === null || _this$props$calloutPr2 === void 0 ? void 0 : _this$props$calloutPr2.directionalHintFixed) || true,
      beakWidth: ((_this$props$calloutPr3 = this.props.calloutProps) === null || _this$props$calloutPr3 === void 0 ? void 0 : _this$props$calloutPr3.beakWidth) || 0,
      gapSpace: ((_this$props$calloutPr4 = this.props.calloutProps) === null || _this$props$calloutPr4 === void 0 ? void 0 : _this$props$calloutPr4.gapSpace) || 0,
      directionalHint: ((_this$props$calloutPr5 = this.props.calloutProps) === null || _this$props$calloutPr5 === void 0 ? void 0 : _this$props$calloutPr5.directionalHint) || _ContextualMenu.DirectionalHint.bottomLeftEdge,
      target: "#".concat(this.props.id),
      onDismiss: this._onHandleUpdateVisibleCallout
    }, this.props.calloutProps), /*#__PURE__*/React.createElement("div", {
      className: "blk__header__row",
      style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 0",
        background: this.props.darkMode === "dark" ? "#1B1A19" : "#fff"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "blk__time",
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(_CustomSpinButton.default, {
      className: "ipt__time hour",
      min: 0,
      step: 24,
      value: String(this.state.hour),
      styles: {
        root: {
          minWidth: 0
        },
        spinButtonWrapper: {
          selectors: {
            ":after": {
              borderColor: this.props.darkMode === "dark" ? "#212121  !important" : "#c4c4c4 !important"
            }
          }
        }
      },
      style: {
        width: 50,
        minWidth: 0,
        margin: "0 5px"
      },
      inputProps: {
        style: {
          minWidth: 0,
          width: 50,
          padding: "0 5px"
        }
      },
      onValidate: (val, e) => this.onValidateSpin(val, e, "hour"),
      onDecrement: val => this.onDecrementSpin(val, "hour"),
      onIncrement: val => this.onIncrementSpin(val, "hour"),
      rcName: this.props.rcName,
      darkMode: this.props.darkMode
    }), /*#__PURE__*/React.createElement(_CustomSpinButton.default, {
      className: "ipt__time minute",
      value: String(this.state.minute === 0 ? "00" : this.state.minute),
      min: 0,
      step: 60,
      styles: {
        root: {
          minWidth: 0
        },
        spinButtonWrapper: {
          selectors: {
            ":after": {
              borderColor: this.props.darkMode === "dark" ? "#212121  !important" : "#c4c4c4 !important"
            }
          }
        }
      },
      style: {
        width: 50,
        minWidth: 0,
        margin: "0 5px"
      },
      inputProps: {
        style: {
          minWidth: 0,
          width: 50,
          padding: "0 5px"
        }
      },
      onValidate: (val, e) => this.onValidateSpin(val, e, "minute"),
      onDecrement: val => this.onDecrementSpin(val, "minute"),
      onIncrement: val => this.onIncrementSpin(val, "minute"),
      rcName: this.props.rcName,
      darkMode: this.props.darkMode
    }), /*#__PURE__*/React.createElement(_CustomSpinButton.default, {
      className: "ipt__time second",
      min: 0,
      value: String(this.state.second === 0 ? "00" : this.state.second),
      step: 60,
      styles: {
        root: {
          minWidth: 0
        },
        spinButtonWrapper: {
          selectors: {
            ":after": {
              borderColor: this.props.darkMode === "dark" ? "#212121  !important" : "#c4c4c4 !important"
            }
          }
        }
      },
      style: {
        width: 50,
        minWidth: 0,
        margin: "0 5px"
      },
      inputProps: {
        style: {
          minWidth: 0,
          width: 50,
          padding: "0 5px"
        }
      },
      onValidate: (val, e) => this.onValidateSpin(val, e, "second"),
      onDecrement: val => this.onDecrementSpin(val, "second"),
      onIncrement: val => this.onIncrementSpin(val, "second"),
      rcName: this.props.rcName,
      darkMode: this.props.darkMode
    })), /*#__PURE__*/React.createElement("div", {
      className: "blk__actions",
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement(_icons.Icon, {
      onClick: this.onHandleCancel,
      className: "cancel",
      iconName: "Cancel",
      style: {
        padding: "2px 5px",
        cursor: "pointer"
      },
      styles: {
        root: {
          selectors: {
            ":hover": {
              fontWeight: "600"
            }
          }
        }
      },
      rcName: this.props.rcName
    }), /*#__PURE__*/React.createElement(_icons.Icon, {
      onClick: this.onHandleCheck,
      rcName: this.props.rcName,
      className: "check",
      iconName: "CheckMark",
      style: {
        padding: "2px 5px",
        cursor: "pointer"
      },
      styles: {
        root: {
          selectors: {
            ":hover": {
              fontWeight: "600",
              color: this.props.darkMode === "dark" ? "#69afe5" : "#0078d4"
            }
          }
        }
      }
    }))), /*#__PURE__*/React.createElement(_CalenderInline.default, {
      autoNavigateOnSelection: true,
      showGoToToday: false,
      highlightSelectedMonth: true,
      showMonthPickerAsOverlay: true,
      showWeekNumbers: false,
      showSixWeeksByDefault: false,
      switchMode: false,
      onSelectChanged: this.onGetDataCalendar,
      rcName: this.props.rcName,
      selectedDate: this.state.date || new Date(),
      darkMode: this.props.darkMode
    })));
  }

}

var _default = DateTimePicker;
exports.default = _default;