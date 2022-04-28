"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownBase = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../@uifabric/utilities");

var _CustomCheckBox = _interopRequireDefault(require("../Checkbox/CustomCheckBox"));

var _CommandButton = require("../Button/CommandButton/CommandButton");

var _common = require("../common");

var _Dropdown = require("./Dropdown.types");

var _DropdownSizePosCache = require("./utilities/DropdownSizePosCache");

var _FocusZone = require("../FocusZone");

var _icons = require("../@uifabric/icons");

var _Label = require("../Label");

var _KeytipData = require("../KeytipData");

var _Panel = require("../Panel");

var _decorators = require("../@uifabric/utilities/decorators");

var _selectableOption = require("../@uifabric/utilities/selectableOption");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getClassNames = (0, _utilities.classNamesFunction)();

var DropdownBase =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DropdownBase, _super);

  function DropdownBase(props) {
    var _this = _super.call(this, props) || this;

    _this._host = /*#__PURE__*/React.createRef();
    _this._focusZone = /*#__PURE__*/React.createRef();
    _this._dropDown = /*#__PURE__*/React.createRef();
    _this._scrollIdleDelay = 250
    /* ms */
    ;
    _this._sizePosCache = new _DropdownSizePosCache.DropdownSizePosCache();
    _this._requestAnimationFrame = (0, _utilities.safeRequestAnimationFrame)(_this);

    _this._onChange = function (event, options, index, checked, multiSelect) {
      // tslint:disable-next-line:deprecation
      var _a = _this.props,
          onChange = _a.onChange,
          onChanged = _a.onChanged;

      if (onChange || onChanged) {
        // for single-select, option passed in will always be selected.
        // for multi-select, flip the checked value
        var changedOpt = multiSelect ? (0, _tslib.__assign)((0, _tslib.__assign)({}, options[index]), {
          selected: !checked
        }) : options[index];
        onChange && onChange((0, _tslib.__assign)((0, _tslib.__assign)({}, event), {
          target: _this._dropDown.current
        }), changedOpt, index);
        onChanged && onChanged(changedOpt, index);
      }
    };
    /** Render text in dropdown input */


    _this._onRenderTitle = function (items) {
      var _a = _this.props.multiSelectDelimiter,
          multiSelectDelimiter = _a === void 0 ? ", " : _a;
      var displayTxt = items.map(function (i) {
        return i.text;
      }).join(multiSelectDelimiter);
      return /*#__PURE__*/React.createElement(React.Fragment, null, displayTxt);
    };
    /** Render placeholder text in dropdown input */


    _this._onRenderPlaceholder = function (props) {
      if (!_this._placeholder) {
        return null;
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, _this._placeholder);
    };
    /** Render Callout or Panel container and pass in list */


    _this._onRenderContainer = function (props) {
      var calloutProps = props.calloutProps,
          panelProps = props.panelProps;
      var _a = _this.props,
          responsiveMode = _a.responsiveMode,
          dropdownWidth = _a.dropdownWidth;
      var isSmall = responsiveMode <= _decorators.ResponsiveMode.medium;
      var panelStyles = _this._classNames.subComponentStyles ? _this._classNames.subComponentStyles.panel : undefined;
      return isSmall ? /*#__PURE__*/React.createElement(_Panel.Panel, (0, _tslib.__assign)({
        isOpen: true,
        isLightDismiss: true,
        onDismiss: _this._onDismiss,
        hasCloseButton: false,
        styles: panelStyles
      }, panelProps), _this._renderFocusableList(props)) : /*#__PURE__*/React.createElement(_utilities.Callout, (0, _tslib.__assign)({
        isBeakVisible: false,
        gapSpace: 0,
        doNotLayer: false,
        directionalHintFixed: false,
        directionalHint: _common.DirectionalHint.bottomLeftEdge
      }, calloutProps, {
        className: _this._classNames.callout,
        target: _this._dropDown.current,
        onDismiss: _this._onDismiss,
        onScroll: _this._onScroll,
        onPositioned: _this._onPositioned,
        calloutWidth: dropdownWidth || (_this._dropDown.current ? _this._dropDown.current.clientWidth : 0)
      }), _this._renderFocusableList(props));
    };
    /** Render Caret Down Icon */


    _this._onRenderCaretDown = function (props) {
      return /*#__PURE__*/React.createElement(_icons.Icon, {
        className: _this._classNames.caretDown,
        iconName: "ChevronDown",
        "aria-hidden": true
      });
    };
    /** Render List of items */


    _this._onRenderList = function (props) {
      var _a = props.onRenderItem,
          onRenderItem = _a === void 0 ? _this._onRenderItem : _a;
      var queue = {
        items: []
      };
      var renderedList = [];

      var emptyQueue = function emptyQueue() {
        var newGroup = queue.id ? [/*#__PURE__*/React.createElement("div", {
          role: "group",
          key: queue.id,
          "aria-labelledby": queue.id
        }, queue.items)] : queue.items;
        renderedList = (0, _tslib.__spreadArrays)(renderedList, newGroup); // Flush items and id

        queue = {
          items: []
        };
      };

      var placeRenderedOptionIntoQueue = function placeRenderedOptionIntoQueue(item, index) {
        /*
                  Case Header
                    empty queue if it's not already empty
                    ensure unique ID for header and set queue ID
                    push header into queue
                  Case Divider
                    push divider into queue if not first item
                    empty queue if not already empty
                  Default
                    push item into queue
                */
        switch (item.itemType) {
          case _selectableOption.SelectableOptionMenuItemType.Header:
            queue.items.length > 0 && emptyQueue();
            var id = _this._id + item.key;
            queue.items.push(onRenderItem((0, _tslib.__assign)((0, _tslib.__assign)({
              id: id
            }, item), {
              index: index
            }), _this._onRenderItem));
            queue.id = id;
            break;

          case _selectableOption.SelectableOptionMenuItemType.Divider:
            index > 0 && queue.items.push(onRenderItem((0, _tslib.__assign)((0, _tslib.__assign)({}, item), {
              index: index
            }), _this._onRenderItem));
            queue.items.length > 0 && emptyQueue();
            break;

          default:
            queue.items.push(onRenderItem((0, _tslib.__assign)((0, _tslib.__assign)({}, item), {
              index: index
            }), _this._onRenderItem));
        }
      }; // Place options into the queue. Queue will be emptied anytime a Header or Divider is encountered


      props.options.forEach(function (item, index) {
        placeRenderedOptionIntoQueue(item, index);
      }); // Push remaining items into all renderedList

      queue.items.length > 0 && emptyQueue();
      return /*#__PURE__*/React.createElement(React.Fragment, null, renderedList);
    };

    _this._onRenderItem = function (item) {
      switch (item.itemType) {
        case _selectableOption.SelectableOptionMenuItemType.Divider:
          return _this._renderSeparator(item);

        case _selectableOption.SelectableOptionMenuItemType.Header:
          return _this._renderHeader(item);

        default:
          return _this._renderOption(item);
      }
    };

    _this._renderOption = function (item) {
      var rcName = _this.props.rcName;
      var usingRcNameWithText = _this.props.usingRcNameWithText;
      var darkMode = _this.props.darkMode;
      var _a = _this.props.onRenderOption,
          onRenderOption = _a === void 0 ? _this._onRenderOption : _a;
      var _b = _this.state.selectedIndices,
          selectedIndices = _b === void 0 ? [] : _b;
      var isItemSelected = item.index !== undefined && selectedIndices ? selectedIndices.indexOf(item.index) > -1 : false; // select the right className based on the combination of selected/disabled

      var itemClassName = item.hidden // predicate: item hidden
      ? _this._classNames.dropdownItemHidden : isItemSelected && item.disabled === true // predicate: both selected and disabled
      ? _this._classNames.dropdownItemSelectedAndDisabled : isItemSelected // predicate: selected only
      ? _this._classNames.dropdownItemSelected : item.disabled === true // predicate: disabled only
      ? _this._classNames.dropdownItemDisabled : _this._classNames.dropdownItem;
      var _c = item.title,
          title = _c === void 0 ? item.text : _c;
      var multiSelectItemStyles = _this._classNames.subComponentStyles ? _this._classNames.subComponentStyles.multiSelectItem : undefined;
      return !_this.props.multiSelect ? /*#__PURE__*/React.createElement(_CommandButton.CommandButton, {
        id: _this._listId + item.index,
        key: item.key,
        "data-index": item.index,
        "data-is-focusable": !item.disabled,
        disabled: item.disabled,
        className: itemClassName,
        onClick: _this._onItemClick(item),
        onMouseEnter: _this._onItemMouseEnter.bind(_this, item),
        onMouseLeave: _this._onMouseItemLeave.bind(_this, item),
        onMouseMove: _this._onItemMouseMove.bind(_this, item),
        role: "option",
        "aria-selected": isItemSelected ? "true" : "false",
        ariaLabel: item.ariaLabel,
        title: title,
        "aria-posinset": _this._sizePosCache.positionInSet(item.index),
        "aria-setsize": _this._sizePosCache.optionSetSize,
        rcName: rcName ? "ddl.Opt.".concat(usingRcNameWithText ? item.text : item.key) : undefined
      }, onRenderOption(item, _this._onRenderOption)) : /*#__PURE__*/React.createElement(_CustomCheckBox.default, {
        id: _this._listId + item.index,
        key: item.key,
        "data-index": item.index,
        "data-is-focusable": !item.disabled,
        disabled: item.disabled,
        onChange: _this._onItemClick(item),
        inputProps: {
          onMouseEnter: _this._onItemMouseEnter.bind(_this, item),
          onMouseLeave: _this._onMouseItemLeave.bind(_this, item),
          onMouseMove: _this._onItemMouseMove.bind(_this, item)
        },
        label: item.text,
        title: title,
        onRenderLabel: _this._onRenderItemLabel.bind(_this, item),
        className: itemClassName,
        role: "option",
        "aria-selected": isItemSelected ? "true" : "false",
        checked: isItemSelected,
        styles: multiSelectItemStyles,
        ariaPositionInSet: _this._sizePosCache.positionInSet(item.index),
        ariaSetSize: _this._sizePosCache.optionSetSize,
        darkMode,
        rcName: rcName ? "ddl.".concat(rcName, ".").concat(usingRcNameWithText ? item.text : item.key) : undefined
      });
    };
    /** Render content of item (i.e. text/icon inside of button) */


    _this._onRenderOption = function (item) {
      let rcName = props.rcName;
      let usingRcNameWithText = props.usingRcNameWithText;
      return /*#__PURE__*/React.createElement("span", {
        className: _this._classNames.dropdownOptionText,
        "data-rc-id": rcName ? "ddl.Opt.sp.".concat(rcName, ".").concat(usingRcNameWithText ? item.text : item.key) : undefined
      }, item.text);
    };
    /** Render custom label for drop down item */


    _this._onRenderItemLabel = function (item) {
      var _a = _this.props.onRenderOption,
          onRenderOption = _a === void 0 ? _this._onRenderOption : _a;
      return onRenderOption(item, _this._onRenderOption);
    };

    _this._onPositioned = function (positions) {
      if (_this._focusZone.current) {
        // Focusing an element can trigger a reflow. Making this wait until there is an animation
        // frame can improve perf significantly.
        _this._requestAnimationFrame(function () {
          var selectedIndices = _this.state.selectedIndices;

          if (_this._focusZone.current) {
            if (selectedIndices && selectedIndices[0] && !_this.props.options[selectedIndices[0]].disabled) {
              var element = (0, _utilities.getDocument)().getElementById(_this._id + "-list" + selectedIndices[0]);

              if (element) {
                _this._focusZone.current.focusElement(element);
              }
            } else {
              _this._focusZone.current.focus();
            }
          }
        });
      }

      if (!_this.state.calloutRenderEdge || _this.state.calloutRenderEdge !== positions.targetEdge) {
        _this.setState({
          calloutRenderEdge: positions.targetEdge
        });
      }
    };

    _this._onItemClick = function (item) {
      return function (event) {
        if (!item.disabled) {
          _this.setSelectedIndex(event, item.index);

          if (!_this.props.multiSelect) {
            // only close the callout when it's in single-select mode
            _this.setState({
              isOpen: false
            });
          }
        }
      };
    };
    /**
     * Scroll handler for the callout to make sure the mouse events
     * for updating focus are not interacting during scroll
     */


    _this._onScroll = function () {
      if (!_this._isScrollIdle && _this._scrollIdleTimeoutId !== undefined) {
        clearTimeout(_this._scrollIdleTimeoutId);
        _this._scrollIdleTimeoutId = undefined;
      } else {
        _this._isScrollIdle = false;
      }

      _this._scrollIdleTimeoutId = setTimeout(function () {
        _this._isScrollIdle = true;
      }, _this._scrollIdleDelay);
    };

    _this._onMouseItemLeave = function (item, ev) {
      if (_this._shouldIgnoreMouseEvent()) {
        return;
      }
      /**
       * IE11 focus() method forces parents to scroll to top of element.
       * Edge and IE expose a setActive() function for focusable divs that
       * sets the page focus but does not scroll the parent element.
       */


      if (_this._host.current) {
        if (_this._host.current.setActive) {
          try {
            _this._host.current.setActive();
          } catch (e) {
            /* no-op */
          }
        } else {
          _this._host.current.focus();
        }
      }
    };

    _this._onDismiss = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this._onDropdownBlur = function (ev) {
      // If Dropdown disabled do not proceed with this logic.
      var disabled = _this._isDisabled();

      if (disabled) {
        return;
      } // hasFocus tracks whether the root element has focus so always update the state.


      _this.setState({
        hasFocus: false
      });

      if (_this.state.isOpen) {
        // Do not onBlur when the callout is opened
        return;
      }

      if (_this.props.onBlur) {
        _this.props.onBlur(ev);
      }
    };

    _this._onDropdownKeyDown = function (ev) {
      // If Dropdown disabled do not process any keyboard events.
      var disabled = _this._isDisabled();

      if (disabled) {
        return;
      } // Take note if we are processing an alt (option) or meta (command) keydown.
      // See comment in _shouldHandleKeyUp for reasoning.


      _this._lastKeyDownWasAltOrMeta = _this._isAltOrMeta(ev);

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      var newIndex;
      var selectedIndex = _this.state.selectedIndices.length ? _this.state.selectedIndices[0] : -1;
      var containsExpandCollapseModifier = ev.altKey || ev.metaKey;
      var isOpen = _this.state.isOpen;

      switch (ev.which) {
        case _utilities.KeyCodes.enter:
          _this.setState({
            isOpen: !isOpen
          });

          break;

        case _utilities.KeyCodes.escape:
          if (!isOpen) {
            return;
          }

          _this.setState({
            isOpen: false
          });

          break;

        case _utilities.KeyCodes.up:
          if (containsExpandCollapseModifier) {
            if (isOpen) {
              _this.setState({
                isOpen: false
              });

              break;
            }

            return;
          }

          if (_this.props.multiSelect) {
            _this.setState({
              isOpen: true
            });
          } else if (!_this._isDisabled()) {
            newIndex = _this._moveIndex(ev, -1, selectedIndex - 1, selectedIndex);
          }

          break;

        case _utilities.KeyCodes.down:
          if (containsExpandCollapseModifier) {
            ev.stopPropagation();
            ev.preventDefault();
          }

          if (containsExpandCollapseModifier && !isOpen || _this.props.multiSelect) {
            _this.setState({
              isOpen: true
            });
          } else if (!_this._isDisabled()) {
            newIndex = _this._moveIndex(ev, 1, selectedIndex + 1, selectedIndex);
          }

          break;

        case _utilities.KeyCodes.home:
          if (!_this.props.multiSelect) {
            newIndex = _this._moveIndex(ev, 1, 0, selectedIndex);
          }

          break;

        case _utilities.KeyCodes.end:
          if (!_this.props.multiSelect) {
            newIndex = _this._moveIndex(ev, -1, _this.props.options.length - 1, selectedIndex);
          }

          break;

        case _utilities.KeyCodes.space:
          // event handled in _onDropdownKeyUp
          break;

        default:
          return;
      }

      if (newIndex !== selectedIndex) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    };

    _this._onDropdownKeyUp = function (ev) {
      // If Dropdown disabled do not process any keyboard events.
      var disabled = _this._isDisabled();

      if (disabled) {
        return;
      }

      var shouldHandleKey = _this._shouldHandleKeyUp(ev);

      var isOpen = _this.state.isOpen;

      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      switch (ev.which) {
        case _utilities.KeyCodes.space:
          _this.setState({
            isOpen: !isOpen
          });

          break;

        default:
          if (shouldHandleKey && isOpen) {
            _this.setState({
              isOpen: false
            });
          }

          return;
      }

      ev.stopPropagation();
      ev.preventDefault();
    };

    _this._onZoneKeyDown = function (ev) {
      var elementToFocus; // Take note if we are processing an alt (option) or meta (command) keydown.
      // See comment in _shouldHandleKeyUp for reasoning.

      _this._lastKeyDownWasAltOrMeta = _this._isAltOrMeta(ev);
      var containsExpandCollapseModifier = ev.altKey || ev.metaKey;

      switch (ev.which) {
        case _utilities.KeyCodes.up:
          if (containsExpandCollapseModifier) {
            _this.setState({
              isOpen: false
            });
          } else {
            if (_this._host.current) {
              elementToFocus = (0, _utilities.getLastFocusable)(_this._host.current, _this._host.current.lastChild, true);
            }
          }

          break;
        // All directional keystrokes should be canceled when the zone is rendered.
        // This avoids the body scroll from reacting and thus dismissing the dropdown.

        case _utilities.KeyCodes.home:
        case _utilities.KeyCodes.end:
        case _utilities.KeyCodes.pageUp:
        case _utilities.KeyCodes.pageDown:
          break;

        case _utilities.KeyCodes.down:
          if (!containsExpandCollapseModifier && _this._host.current) {
            elementToFocus = (0, _utilities.getFirstFocusable)(_this._host.current, _this._host.current.firstChild, true);
          }

          break;

        case _utilities.KeyCodes.escape:
          _this.setState({
            isOpen: false
          });

          break;

        case _utilities.KeyCodes.tab:
          _this.setState({
            isOpen: false
          });

          return;

        default:
          return;
      }

      if (elementToFocus) {
        elementToFocus.focus();
      }

      ev.stopPropagation();
      ev.preventDefault();
    };

    _this._onZoneKeyUp = function (ev) {
      var shouldHandleKey = _this._shouldHandleKeyUp(ev);

      if (shouldHandleKey && _this.state.isOpen) {
        _this.setState({
          isOpen: false
        });

        ev.preventDefault();
      }
    };

    _this._onDropdownClick = function (ev) {
      if (_this.props.onClick) {
        _this.props.onClick(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      var isOpen = _this.state.isOpen;

      var disabled = _this._isDisabled();

      if (!disabled && !_this._shouldOpenOnFocus()) {
        _this.setState({
          isOpen: !isOpen
        });
      }

      _this._isFocusedByClick = false; // reset
    };

    _this._onDropdownMouseDown = function () {
      _this._isFocusedByClick = true;
    };

    _this._onFocus = function (ev) {
      var _a = _this.state,
          isOpen = _a.isOpen,
          selectedIndices = _a.selectedIndices;
      var multiSelect = _this.props.multiSelect;

      var disabled = _this._isDisabled();

      if (!disabled) {
        if (!_this._isFocusedByClick && !isOpen && selectedIndices.length === 0 && !multiSelect) {
          // Per aria: https://www.w3.org/TR/wai-aria-practices-1.1/#listbox_kbd_interaction
          _this._moveIndex(ev, 1, 0, -1);
        }

        if (_this.props.onFocus) {
          _this.props.onFocus(ev);
        }

        var state = {
          hasFocus: true
        };

        if (_this._shouldOpenOnFocus()) {
          state.isOpen = true;
        }

        _this.setState(state);
      }
    };
    /**
     * Because the isDisabled prop is deprecated, we have had to repeat this logic all over the place.
     * This helper method avoids all the repetition.
     */


    _this._isDisabled = function () {
      var disabled = _this.props.disabled; // tslint:disable-next-line:deprecation

      var isDisabled = _this.props.isDisabled; // Remove this deprecation workaround at 1.0.0

      if (disabled === undefined) {
        disabled = isDisabled;
      }

      return disabled;
    };

    _this._onRenderLabel = function (props) {
      var label = props.label,
          required = props.required,
          rcName = props.rcName,
          disabled = props.disabled;
      var labelStyles = _this._classNames.subComponentStyles ? _this._classNames.subComponentStyles.label : undefined;
      return label ? /*#__PURE__*/React.createElement(_Label.Label, {
        className: _this._classNames.label,
        id: _this._labelId,
        required: required,
        styles: labelStyles,
        disabled: disabled,
        rcName
      }, label) : null;
    };

    (0, _utilities.initializeComponentRef)(_this);
    var multiSelect = props.multiSelect,
        selectedKey = props.selectedKey,
        selectedKeys = props.selectedKeys,
        defaultSelectedKey = props.defaultSelectedKey,
        defaultSelectedKeys = props.defaultSelectedKeys,
        options = props.options;

    if (process.env.NODE_ENV !== "production") {
      (0, _utilities.warnDeprecations)("Dropdown", props, {
        isDisabled: "disabled",
        onChanged: "onChange",
        placeHolder: "placeholder",
        onRenderPlaceHolder: "onRenderPlaceholder"
      });
      (0, _utilities.warnMutuallyExclusive)("Dropdown", props, {
        defaultSelectedKey: "selectedKey",
        defaultSelectedKeys: "selectedKeys",
        selectedKeys: "selectedKey"
      });

      if (multiSelect) {
        var warnMultiSelect = function warnMultiSelect(prop) {
          return (0, _utilities.warn)("Dropdown property '" + prop + "' cannot be used when 'multiSelect' is true. Use '" + prop + "s' instead.");
        };

        if (selectedKey !== undefined) {
          warnMultiSelect("selectedKey");
        }

        if (defaultSelectedKey !== undefined) {
          warnMultiSelect("defaultSelectedKey");
        }
      } else {
        var warnNotMultiSelect = function warnNotMultiSelect(prop) {
          return (0, _utilities.warn)("Dropdown property '" + prop + "s' cannot be used when 'multiSelect' is false/unset. Use '" + prop + "' instead.");
        };

        if (selectedKeys !== undefined) {
          warnNotMultiSelect("selectedKey");
        }

        if (defaultSelectedKeys !== undefined) {
          warnNotMultiSelect("defaultSelectedKey");
        }
      }
    }

    _this._id = props.id || (0, _utilities.getId)("Dropdown");
    _this._labelId = _this._id + "-label";
    _this._listId = _this._id + "-list";
    _this._optionId = _this._id + "-option";
    _this._isScrollIdle = true;
    var selectedIndices;

    if (multiSelect) {
      selectedIndices = _this._getSelectedIndexes(options, defaultSelectedKeys !== undefined ? defaultSelectedKeys : selectedKeys);
    } else {
      selectedIndices = _this._getSelectedIndexes(options, defaultSelectedKey !== undefined ? defaultSelectedKey : selectedKey);
    }

    _this._sizePosCache.updateOptions(options);

    _this.state = {
      isOpen: false,
      selectedIndices: selectedIndices,
      hasFocus: false,
      calloutRenderEdge: undefined
    };
    return _this;
  }

  Object.defineProperty(DropdownBase.prototype, "selectedOptions", {
    /**
     * All selected options
     */
    get: function get() {
      var options = this.props.options;
      var selectedIndices = this.state.selectedIndices;
      return (0, _selectableOption.getAllSelectedOptions)(options, selectedIndices);
    },
    enumerable: true,
    configurable: true
  });

  DropdownBase.prototype.componentWillUnmount = function () {
    clearTimeout(this._scrollIdleTimeoutId);
  }; // tslint:disable-next-line function-name


  DropdownBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
    // In controlled component usage where selectedKey is provided, update the selectedIndex
    // state if the key or options change.
    var selectedKeyProp; // this does a shallow compare (assumes options are pure), for the purposes of determining whether
    // defaultSelectedKey/defaultSelectedKeys are respected.

    var didOptionsChange = newProps.options !== this.props.options;

    if (newProps.multiSelect) {
      if (didOptionsChange && newProps.defaultSelectedKeys !== undefined) {
        selectedKeyProp = "defaultSelectedKeys";
      } else {
        selectedKeyProp = "selectedKeys";
      }
    } else {
      if (didOptionsChange && newProps.defaultSelectedKey !== undefined) {
        selectedKeyProp = "defaultSelectedKey";
      } else {
        selectedKeyProp = "selectedKey";
      }
    }

    if (newProps[selectedKeyProp] !== undefined && (newProps[selectedKeyProp] !== this.props[selectedKeyProp] || didOptionsChange)) {
      this.setState({
        selectedIndices: this._getSelectedIndexes(newProps.options, newProps[selectedKeyProp])
      });
    }

    if (newProps.options !== this.props.options // preexisting code assumes purity of the options...
    ) {
      this._sizePosCache.updateOptions(newProps.options);
    }
  };

  DropdownBase.prototype.componentDidUpdate = function (prevProps, prevState) {
    if (prevState.isOpen === true && this.state.isOpen === false) {
      this._gotMouseMove = false;

      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }
  };

  DropdownBase.prototype.render = function () {
    var _this = this;

    var id = this._id;
    var props = this.props;
    var className = props.className,
        label = props.label,
        rcName = props.rcName,
        options = props.options,
        ariaLabel = props.ariaLabel,
        required = props.required,
        errorMessage = props.errorMessage,
        keytipProps = props.keytipProps,
        propStyles = props.styles,
        theme = props.theme,
        panelProps = props.panelProps,
        calloutProps = props.calloutProps,
        multiSelect = props.multiSelect,
        _a = props.onRenderTitle,
        onRenderTitle = _a === void 0 ? this._onRenderTitle : _a,
        _b = props.onRenderContainer,
        onRenderContainer = _b === void 0 ? this._onRenderContainer : _b,
        _c = props.onRenderCaretDown,
        onRenderCaretDown = _c === void 0 ? this._onRenderCaretDown : _c,
        _d = props.onRenderLabel,
        onRenderLabel = _d === void 0 ? this._onRenderLabel : _d;
    var _e = this.state,
        isOpen = _e.isOpen,
        selectedIndices = _e.selectedIndices,
        calloutRenderEdge = _e.calloutRenderEdge; // tslint:disable-next-line:deprecation

    var onRenderPlaceholder = props.onRenderPlaceholder || props.onRenderPlaceHolder || this._onRenderPlaceholder;
    var selectedOptions = (0, _selectableOption.getAllSelectedOptions)(options, selectedIndices);
    var divProps = (0, _utilities.getNativeProps)(props, _utilities.divProperties);

    var disabled = this._isDisabled();

    var errorMessageId = id + "-errorMessage";
    var ariaActiveDescendant = disabled ? undefined : isOpen && selectedIndices.length === 1 && selectedIndices[0] >= 0 ? this._listId + selectedIndices[0] : undefined;
    var ariaAttrs = multiSelect ? {
      role: "button"
    } : // single select
    {
      role: "listbox",
      childRole: "option",
      ariaSetSize: this._sizePosCache.optionSetSize,
      ariaPosInSet: this._sizePosCache.positionInSet(selectedIndices[0]),
      ariaSelected: selectedIndices[0] === undefined ? undefined : true
    };
    this._classNames = getClassNames(propStyles, {
      theme: theme,
      className: className,
      hasError: !!(errorMessage && errorMessage.length > 0),
      hasLabel: !!label,
      isOpen: isOpen,
      required: required,
      disabled: disabled,
      isRenderingPlaceholder: !selectedOptions.length,
      panelClassName: !!panelProps ? panelProps.className : undefined,
      calloutClassName: !!calloutProps ? calloutProps.className : undefined,
      calloutRenderEdge: calloutRenderEdge
    });
    var hasErrorMessage = !!errorMessage && errorMessage.length > 0;
    return /*#__PURE__*/React.createElement("div", {
      className: this._classNames.root
    }, onRenderLabel(this.props, this._onRenderLabel), /*#__PURE__*/React.createElement(_KeytipData.KeytipData, {
      keytipProps: keytipProps,
      disabled: disabled
    }, function (keytipAttributes) {
      return /*#__PURE__*/React.createElement("div", (0, _tslib.__assign)({}, keytipAttributes, {
        "data-is-focusable": !disabled,
        ref: _this._dropDown,
        id: id,
        tabIndex: disabled ? -1 : 0,
        role: ariaAttrs.role,
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen ? "true" : "false",
        "aria-label": ariaLabel,
        "aria-labelledby": label && !ariaLabel ? (0, _utilities.mergeAriaAttributeValues)(_this._labelId, _this._optionId) : undefined,
        "aria-describedby": (0, _utilities.mergeAriaAttributeValues)(keytipAttributes["aria-describedby"], hasErrorMessage ? _this._id + "-errorMessage" : undefined),
        "aria-activedescendant": ariaActiveDescendant,
        "aria-required": required,
        "aria-disabled": disabled,
        "aria-owns": isOpen ? _this._listId : undefined,
        "data-rc-id": rcName ? "ddl.".concat(rcName) : undefined
      }, divProps, {
        className: _this._classNames.dropdown,
        onBlur: _this._onDropdownBlur,
        onKeyDown: _this._onDropdownKeyDown,
        onKeyUp: _this._onDropdownKeyUp,
        onClick: _this._onDropdownClick,
        onMouseDown: _this._onDropdownMouseDown,
        onFocus: _this._onFocus
      }), /*#__PURE__*/React.createElement("span", {
        id: _this._optionId,
        className: _this._classNames.title,
        "aria-live": "polite",
        "aria-atomic": true,
        "aria-invalid": hasErrorMessage,
        role: ariaAttrs.childRole,
        "aria-setsize": ariaAttrs.ariaSetSize,
        "aria-posinset": ariaAttrs.ariaPosInSet,
        "data-rc-id": rcName ? "ddl.sp.".concat(rcName) : undefined,
        "aria-selected": ariaAttrs.ariaSelected
      }, // If option is selected render title, otherwise render the placeholder text
      selectedOptions.length ? onRenderTitle(selectedOptions, _this._onRenderTitle) : onRenderPlaceholder(props, _this._onRenderPlaceholder)), /*#__PURE__*/React.createElement("span", {
        className: _this._classNames.caretDownWrapper
      }, onRenderCaretDown(props, _this._onRenderCaretDown)));
    }), isOpen && onRenderContainer((0, _tslib.__assign)((0, _tslib.__assign)({}, props), {
      onDismiss: this._onDismiss
    }), this._onRenderContainer),
    /*#__PURE__*/
    // hasErrorMessage &&
    React.createElement("div", {
      role: "alert",
      id: errorMessageId,
      className: this._classNames.errorMessage,
      "data-rc-id": rcName ? "errMsg.".concat(rcName) : undefined
    }, errorMessage ? errorMessage : ""));
  };

  DropdownBase.prototype.focus = function (shouldOpenOnFocus) {
    if (this._dropDown.current) {
      this._dropDown.current.focus();

      if (shouldOpenOnFocus) {
        this.setState({
          isOpen: true
        });
      }
    }
  };

  DropdownBase.prototype.setSelectedIndex = function (event, index) {
    var _this = this;

    var _a = this.props,
        options = _a.options,
        selectedKey = _a.selectedKey,
        selectedKeys = _a.selectedKeys,
        multiSelect = _a.multiSelect,
        notifyOnReselect = _a.notifyOnReselect;
    var _b = this.state.selectedIndices,
        selectedIndices = _b === void 0 ? [] : _b;
    var checked = selectedIndices ? selectedIndices.indexOf(index) > -1 : false;
    var newIndexes = [];
    index = Math.max(0, Math.min(options.length - 1, index)); // If this is a controlled component then no state change should take place.

    if (selectedKey !== undefined || selectedKeys !== undefined) {
      this._onChange(event, options, index, checked, multiSelect);

      return;
    }

    if (!multiSelect && !notifyOnReselect && index === selectedIndices[0]) {
      return;
    } else if (multiSelect) {
      newIndexes = selectedIndices ? this._copyArray(selectedIndices) : [];

      if (checked) {
        var position = newIndexes.indexOf(index);

        if (position > -1) {
          // unchecked the current one
          newIndexes.splice(position, 1);
        }
      } else {
        // add the new selected index into the existing one
        newIndexes.push(index);
      }
    } else {
      // Set the selected option if this is an uncontrolled component
      newIndexes = [index];
    }

    event.persist(); // Call onChange after state is updated

    this.setState({
      selectedIndices: newIndexes
    }, function () {
      _this._onChange(event, options, index, checked, multiSelect);
    });
  };

  Object.defineProperty(DropdownBase.prototype, "_placeholder", {
    /** Get either props.placeholder (new name) or props.placeHolder (old name) */
    get: function get() {
      // tslint:disable-next-line:deprecation
      return this.props.placeholder || this.props.placeHolder;
    },
    enumerable: true,
    configurable: true
  });

  DropdownBase.prototype._copyArray = function (array) {
    var newArray = [];

    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
      var element = array_1[_i];
      newArray.push(element);
    }

    return newArray;
  };
  /**
   * Finds the next valid Dropdown option and sets the selected index to it.
   * @param stepValue - Value of how many items the function should traverse.  Should be -1 or 1.
   * @param index - Index of where the search should start
   * @param selectedIndex - The selectedIndex Dropdown's state
   * @returns The next valid dropdown option's index
   */


  DropdownBase.prototype._moveIndex = function (event, stepValue, index, selectedIndex) {
    var options = this.props.options; // Return selectedIndex if nothing has changed or options is empty

    if (selectedIndex === index || options.length === 0) {
      return selectedIndex;
    } // If the user is pressing the up or down key we want to make
    // sure that the dropdown cycles through the options without
    // causing the screen to scroll. In _onDropdownKeyDown
    // at the very end is a check to see if newIndex !== selectedIndex.
    // If the index is less than 0 and we set it back to 0, then
    // newIndex will equal selectedIndex and not stop the action
    // of the key press happening and vice versa for indexes greater
    // than or equal to the options length.


    if (index >= options.length) {
      index = 0;
    } else if (index < 0) {
      index = options.length - 1;
    }

    var stepCounter = 0; // If current index is a header or divider, or disabled, increment by step

    while (options[index].itemType === _Dropdown.DropdownMenuItemType.Header || options[index].itemType === _Dropdown.DropdownMenuItemType.Divider || options[index].disabled) {
      // If stepCounter exceeds length of options, then return selectedIndex (-1)
      if (stepCounter >= options.length) {
        return selectedIndex;
      } // If index + stepValue is out of bounds, wrap around


      if (index + stepValue < 0) {
        index = options.length;
      } else if (index + stepValue >= options.length) {
        index = -1;
      }

      index = index + stepValue;
      stepCounter++;
    }

    this.setSelectedIndex(event, index);
    return index;
  };
  /** Wrap item list in a FocusZone */


  DropdownBase.prototype._renderFocusableList = function (props) {
    var _a = props.onRenderList,
        onRenderList = _a === void 0 ? this._onRenderList : _a,
        label = props.label,
        ariaLabel = props.ariaLabel,
        rcName = props.rcName,
        multiSelect = props.multiSelect;
    return /*#__PURE__*/React.createElement("div", {
      className: this._classNames.dropdownItemsWrapper,
      onKeyDown: this._onZoneKeyDown,
      onKeyUp: this._onZoneKeyUp,
      ref: this._host,
      tabIndex: 0
    }, /*#__PURE__*/React.createElement(_FocusZone.FocusZone, {
      ref: this._focusZone,
      direction: _FocusZone.FocusZoneDirection.vertical,
      id: this._listId,
      className: this._classNames.dropdownItems,
      role: "listbox",
      "aria-label": ariaLabel,
      "aria-labelledby": label && !ariaLabel ? this._labelId : undefined,
      "aria-multiselectable": multiSelect,
      "data-rc-id": rcName ? "ddt.Opt.List.".concat(rcName) : undefined
    }, onRenderList(props, this._onRenderList)));
  };

  DropdownBase.prototype._renderSeparator = function (item) {
    var index = item.index,
        key = item.key;

    if (index > 0) {
      return /*#__PURE__*/React.createElement("div", {
        role: "separator",
        key: key,
        className: this._classNames.dropdownDivider
      });
    }

    return null;
  };

  DropdownBase.prototype._renderHeader = function (item) {
    var _a = this.props.onRenderOption,
        onRenderOption = _a === void 0 ? this._onRenderOption : _a;
    var key = item.key,
        id = item.id;
    return /*#__PURE__*/React.createElement("div", {
      id: id,
      key: key,
      className: this._classNames.dropdownItemHeader
    }, onRenderOption(item, this._onRenderOption));
  };

  DropdownBase.prototype._onItemMouseEnter = function (item, ev) {
    if (this._shouldIgnoreMouseEvent()) {
      return;
    }

    var targetElement = ev.currentTarget;
    targetElement.focus();
  };

  DropdownBase.prototype._onItemMouseMove = function (item, ev) {
    var targetElement = ev.currentTarget;
    this._gotMouseMove = true;

    if (!this._isScrollIdle || document.activeElement === targetElement) {
      return;
    }

    targetElement.focus();
  };

  DropdownBase.prototype._shouldIgnoreMouseEvent = function () {
    return !this._isScrollIdle || !this._gotMouseMove;
  };
  /** Get all selected indexes for multi-select mode */


  DropdownBase.prototype._getSelectedIndexes = function (options, selectedKey) {
    if (selectedKey === undefined) {
      if (this.props.multiSelect) {
        return this._getAllSelectedIndices(options);
      }

      var selectedIndex = this._getSelectedIndex(options, null);

      return selectedIndex !== -1 ? [selectedIndex] : [];
    } else if (!Array.isArray(selectedKey)) {
      var selectedIndex2 = this._getSelectedIndex(options, selectedKey);

      return selectedIndex2 !== -1 ? [selectedIndex2] : [];
    }

    var selectedIndices = [];

    for (var _i = 0, selectedKey_1 = selectedKey; _i < selectedKey_1.length; _i++) {
      var key = selectedKey_1[_i];

      var selectedIndex1 = this._getSelectedIndex(options, key);

      selectedIndex1 !== -1 && selectedIndices.push(selectedIndex1);
    }

    return selectedIndices;
  };

  DropdownBase.prototype._getAllSelectedIndices = function (options) {
    return options.map(function (option, index) {
      return option.selected ? index : -1;
    }).filter(function (index) {
      return index !== -1;
    });
  };

  DropdownBase.prototype._getSelectedIndex = function (options, selectedKey) {
    return (0, _utilities.findIndex)(options, function (option) {
      // tslint:disable-next-line:triple-equals
      if (selectedKey != null) {
        return option.key === selectedKey;
      } else {
        // tslint:disable-next-line:deprecation
        return !!option.selected || !!option.isSelected;
      }
    });
  };
  /**
   * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
   */


  DropdownBase.prototype._isAltOrMeta = function (ev) {
    return ev.which === _utilities.KeyCodes.alt || ev.key === "Meta";
  };
  /**
   * We close the menu on key up only if ALL of the following are true:
   * - Most recent key down was alt or meta (command)
   * - The alt/meta key down was NOT followed by some other key (such as down/up arrow to
   *   expand/collapse the menu)
   * - We're not on a Mac (or iOS)
   *
   * This is because on Windows, pressing alt moves focus to the application menu bar or similar,
   * closing any open context menus. There is not a similar behavior on Macs.
   */


  DropdownBase.prototype._shouldHandleKeyUp = function (ev) {
    var keyPressIsAltOrMetaAlone = this._lastKeyDownWasAltOrMeta && this._isAltOrMeta(ev);

    this._lastKeyDownWasAltOrMeta = false;
    return !!keyPressIsAltOrMetaAlone && !((0, _utilities.isMac)() || (0, _utilities.isIOS)());
  };
  /**
   * Returns true if dropdown should set to open on focus.
   * Otherwise, isOpen state should be toggled on click
   */


  DropdownBase.prototype._shouldOpenOnFocus = function () {
    var hasFocus = this.state.hasFocus;
    var openOnKeyboardFocus = this.props.openOnKeyboardFocus;
    return !this._isFocusedByClick && openOnKeyboardFocus === true && !hasFocus;
  };

  DropdownBase.defaultProps = {
    options: []
  }; // eslint-disable-next-line no-func-assign

  DropdownBase = (0, _tslib.__decorate)([_decorators.withResponsiveMode], DropdownBase);
  return DropdownBase;
}(React.Component);

exports.DropdownBase = DropdownBase;