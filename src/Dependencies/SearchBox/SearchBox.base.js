import { __assign, __extends } from "tslib";
import * as React from "react";
import {
  initializeComponentRef,
  warnDeprecations,
  getId,
  KeyCodes,
  classNamesFunction,
  getNativeProps,
  inputProperties,
} from "../@uifabric/utilities";
import { IconButton } from "../Button/IconButton/IconButton";
import { Icon } from "../@uifabric/icons/Icon";
var getClassNames = classNamesFunction();
var COMPONENT_NAME = "SearchBox";
var SearchBoxBase = /** @class */ (function (_super) {
  __extends(SearchBoxBase, _super);
  function SearchBoxBase(props) {
    var _this = _super.call(this, props) || this;
    _this._rootElement = React.createRef();
    _this._inputElement = React.createRef();
    _this._onClickFocus = function () {
      var inputElement = _this._inputElement.current;
      if (inputElement) {
        _this.focus();
        inputElement.selectionStart = inputElement.selectionEnd = 0;
      }
    };
    _this._onFocusCapture = function (ev) {
      _this.setState({
        hasFocus: true,
      });
      if (_this.props.onFocus) {
        _this.props.onFocus(ev);
      }
    };
    _this._onClearClick = function (ev) {
      var clearButtonProps = _this.props.clearButtonProps;
      if (clearButtonProps && clearButtonProps.onClick) {
        clearButtonProps.onClick(ev);
      }
      if (!ev.defaultPrevented) {
        _this._onClear(ev);
      }
    };
    _this._onKeyDown = function (ev) {
      switch (ev.which) {
        case KeyCodes.escape:
          _this.props.onEscape && _this.props.onEscape(ev);
          if (!ev.defaultPrevented) {
            _this._onClear(ev);
          }
          break;
        case KeyCodes.enter:
          if (_this.props.onSearch) {
            _this.props.onSearch(_this.state.value);
            break;
          }
          // if we don't handle the enter press then we shouldn't prevent default
          return;
        default:
          _this.props.onKeyDown && _this.props.onKeyDown(ev);
          if (!ev.defaultPrevented) {
            return;
          }
      }
      // We only get here if the keypress has been handled,
      // or preventDefault was called in case of default keyDown handler
      ev.preventDefault();
      ev.stopPropagation();
    };
    _this._onBlur = function (ev) {
      _this.setState({
        hasFocus: false,
      });
      if (_this.props.onBlur) {
        _this.props.onBlur(ev);
      }
    };
    _this._onInputChange = function (ev) {
      var value = ev.target.value;
      if (value === _this._latestValue) {
        return;
      }
      _this._latestValue = value;
      _this.setState({ value: value });
      _this._callOnChange(ev, value);
    };
    initializeComponentRef(_this);
    warnDeprecations(COMPONENT_NAME, props, {
      labelText: "placeholder",
      defaultValue: "value",
    });
    _this._latestValue = props.value || "";
    _this._fallbackId = getId(COMPONENT_NAME);
    _this.state = {
      value: _this._latestValue,
      hasFocus: false,
    };
    return _this;
  }
  // tslint:disable-next-line function-name
  SearchBoxBase.prototype.UNSAFE_componentWillReceiveProps = function (
    newProps
  ) {
    if (newProps.value !== undefined) {
      this._latestValue = newProps.value;
      // If the user passes in null, substitute an empty string
      // (passing null is not allowed per typings, but users might do it anyway)
      this.setState({
        value: newProps.value || "",
      });
    }
  };
  SearchBoxBase.prototype.render = function () {
    var _a = this.props,
      rcName = _a.rcName,
      ariaLabel = _a.ariaLabel,
      placeholder = _a.placeholder,
      className = _a.className,
      disabled = _a.disabled,
      underlined = _a.underlined,
      styles = _a.styles,
      // tslint:disable-next-line:deprecation
      labelText = _a.labelText,
      theme = _a.theme,
      clearButtonProps = _a.clearButtonProps,
      disableAnimation = _a.disableAnimation,
      iconProps = _a.iconProps,
      _b = _a.id,
      id = _b === void 0 ? this._fallbackId : _b;
    var _c = this.state,
      value = _c.value,
      hasFocus = _c.hasFocus;
    var placeholderValue = placeholder !== undefined ? placeholder : labelText;
    var classNames = getClassNames(styles, {
      theme: theme,
      className: className,
      underlined: underlined,
      hasFocus: hasFocus,
      disabled: disabled,
      hasInput: value.length > 0,
      disableAnimation: disableAnimation,
    });
    var nativeProps = getNativeProps(this.props, inputProperties, [
      "className",
      "placeholder",
      "onFocus",
      "onBlur",
      "value",
    ]);
    return React.createElement(
      "div",
      {
        role: "search",
        ref: this._rootElement,
        className: classNames.root,
        onFocusCapture: this._onFocusCapture,
        "data-rc-id": rcName ? `src.wrapper.${rcName}` : undefined,
      },
      React.createElement(
        "div",
        {
          className: classNames.iconContainer,
          onClick: this._onClickFocus,
          "aria-hidden": true,
        },
        React.createElement(
          Icon,
          __assign({ iconName: "Search" }, iconProps, {
            className: classNames.icon,
          })
        )
      ),
      React.createElement(
        "input",
        __assign(
          { "data-rc-id": rcName ? `srb.${rcName}` : undefined },
          nativeProps,
          {
            id: id,
            className: classNames.field,
            placeholder: placeholderValue,
            onChange: this._onInputChange,
            onInput: this._onInputChange,
            onBlur: this._onBlur,
            onKeyDown: this._onKeyDown,
            value: value,
            disabled: disabled,
            role: "searchbox",
            "aria-label": ariaLabel,
            ref: this._inputElement,
          }
        )
      ),
      value.length > 0 &&
        React.createElement(
          "div",
          { className: classNames.clearButton },
          React.createElement(
            IconButton,
            __assign(
              {
                onBlur: this._onBlur,
                styles: {
                  root: { height: "auto" },
                  icon: { fontSize: "12px" },
                },
                iconProps: { iconName: "Clear" },
              },
              clearButtonProps,
              { onClick: this._onClearClick }
            )
          )
        )
    );
  };
  /**
   * Sets focus to the search box input field
   */
  SearchBoxBase.prototype.focus = function () {
    if (this._inputElement.current) {
      this._inputElement.current.focus();
    }
  };
  /**
   * Returns whether or not the SearchBox has focus
   */
  SearchBoxBase.prototype.hasFocus = function () {
    return !!this.state.hasFocus;
  };
  SearchBoxBase.prototype._onClear = function (ev) {
    this.props.onClear && this.props.onClear(ev);
    if (!ev.defaultPrevented) {
      this._latestValue = "";
      this.setState({
        value: "",
      });
      this._callOnChange(undefined, "");
      ev.stopPropagation();
      ev.preventDefault();
      this.focus();
    }
  };
  SearchBoxBase.prototype._callOnChange = function (ev, newValue) {
    // tslint:disable-next-line:deprecation
    var _a = this.props,
      onChange = _a.onChange,
      onChanged = _a.onChanged;
    // Call @deprecated method.
    if (onChanged) {
      onChanged(newValue);
    }
    if (onChange) {
      onChange(ev, newValue);
    }
  };
  SearchBoxBase.defaultProps = {
    disableAnimation: false,
    clearButtonProps: { ariaLabel: "Clear text" },
  };
  return SearchBoxBase;
})(React.Component);
export { SearchBoxBase };
//# sourceMappingURL=SearchBox.base.js.map
