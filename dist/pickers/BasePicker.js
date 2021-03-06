"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePickerListBelow = exports.BasePicker = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../@uifabric/utilities");

var _FocusZone = require("../FocusZone");

var _selection = require("../@uifabric/utilities/selection");

var _Suggestions = require("./Suggestions/Suggestions");

var _Suggestions2 = require("./Suggestions/Suggestions.styles");

var _SuggestionsController = require("./Suggestions/SuggestionsController");

var _BasePicker = require("./BasePicker.types");

var _Autofill = require("../Autofill");

var stylesImport = _interopRequireWildcard(require("./BasePicker.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { Autofill } from '../SearchBox/CustomSearchBox';
var legacyStyles = stylesImport;
var getClassNames = (0, _utilities.classNamesFunction)();
/**
 * Should be removed once new picker without inheritance is created
 */

function getStyledSuggestions(suggestionsType) {
  return (0, _utilities.styled)(suggestionsType, _Suggestions2.getStyles, undefined, {
    scope: "Suggestions"
  });
}
/**
 * {@docCategory Pickers}
 */


var BasePicker =
/** @class */
function (_super) {
  (0, _tslib.__extends)(BasePicker, _super);

  function BasePicker(basePickerProps) {
    var _this = _super.call(this, basePickerProps) || this; // Refs


    _this.root = /*#__PURE__*/React.createRef();
    _this.input = /*#__PURE__*/React.createRef();
    _this.focusZone = /*#__PURE__*/React.createRef();
    _this.suggestionElement = /*#__PURE__*/React.createRef();
    /**
     * @deprecated this is no longer necessary as typescript now supports generic elements
     */

    _this.SuggestionOfProperType = _Suggestions.Suggestions; // tslint:disable-next-line:deprecation

    _this._styledSuggestions = getStyledSuggestions(_this.SuggestionOfProperType);

    _this.dismissSuggestions = function (ev) {
      var selectItemFunction = function selectItemFunction() {
        if (_this.props.onDismiss) {
          _this.props.onDismiss(ev, _this.suggestionStore.currentSuggestion ? _this.suggestionStore.currentSuggestion.item : undefined);
        }

        if (!ev || ev && !ev.defaultPrevented) {
          // Select the first suggestion if one is available when user leaves.
          if (_this.canAddItems() && _this.suggestionStore.hasSelectedSuggestion() && _this.state.suggestedDisplayValue) {
            _this.addItemByIndex(0);
          }
        }
      };

      if (_this.currentPromise) {
        _this.currentPromise.then(function () {
          return selectItemFunction();
        });
      } else {
        selectItemFunction();
      }

      _this.setState({
        suggestionsVisible: false
      });
    };

    _this.refocusSuggestions = function (keyCode) {
      _this.resetFocus();

      if (_this.suggestionStore.suggestions && _this.suggestionStore.suggestions.length > 0) {
        if (keyCode === _utilities.KeyCodes.up) {
          _this.suggestionStore.setSelectedSuggestion(_this.suggestionStore.suggestions.length - 1);
        } else if (keyCode === _utilities.KeyCodes.down) {
          _this.suggestionStore.setSelectedSuggestion(0);
        }
      }
    };

    _this.onInputChange = function (value) {
      _this.updateValue(value);

      _this.setState({
        moreSuggestionsAvailable: true,
        isMostRecentlyUsedVisible: false
      });
    };

    _this.onSuggestionClick = function (ev, item, index) {
      _this.addItemByIndex(index);
    };

    _this.onSuggestionRemove = function (ev, item, index) {
      if (_this.props.onRemoveSuggestion) {
        _this.props.onRemoveSuggestion(item);
      }

      _this.suggestionStore.removeSuggestion(index);
    };

    _this.onInputFocus = function (ev) {
      // Only trigger all of the focus if this component isn't already focused.
      // For example when an item is selected or removed from the selected list it should be treated
      // as though the input is still focused.
      if (!_this.state.isFocused) {
        _this.setState({
          isFocused: true
        });

        _this.selection.setAllSelected(false);

        _this._userTriggeredSuggestions();

        if (_this.props.inputProps && _this.props.inputProps.onFocus) {
          _this.props.inputProps.onFocus(ev);
        }
      }
    };

    _this.onInputBlur = function (ev) {
      if (_this.props.inputProps && _this.props.inputProps.onBlur) {
        _this.props.inputProps.onBlur(ev);
      }
    };

    _this.onBlur = function (ev) {
      if (_this.state.isFocused) {
        // Only blur the entire component if an unrelated element gets focus.
        // Otherwise treat it as though it still has focus.
        // Do nothing if the blur is coming from something
        // inside the comboBox root or the comboBox menu since
        // it we are not really bluring from the whole comboBox
        var relatedTarget = ev.relatedTarget;

        if (ev.relatedTarget === null) {
          // In IE11, due to lack of support, event.relatedTarget is always
          // null making every onBlur call to be "outside" of the ComboBox
          // even when it's not. Using document.activeElement is another way
          // for us to be able to get what the relatedTarget without relying
          // on the event
          relatedTarget = document.activeElement;
        }

        if (relatedTarget && !(0, _utilities.elementContains)(_this.root.current, relatedTarget)) {
          _this.setState({
            isFocused: false
          });

          if (_this.props.onBlur) {
            _this.props.onBlur(ev);
          }
        }
      }
    };
    /**
     * Reveals suggestions any time the user clicks on the input element
     * without shifting focus.
     */


    _this.onClick = function (ev) {
      if (_this.props.inputProps !== undefined && _this.props.inputProps.onClick !== undefined) {
        _this.props.inputProps.onClick(ev);
      } // Only primary (left) clicks show suggestions.


      if (ev.button === 0) {
        _this._userTriggeredSuggestions();
      }
    };

    _this.onKeyDown = function (ev) {
      var keyCode = ev.which;

      switch (keyCode) {
        case _utilities.KeyCodes.escape:
          if (_this.state.suggestionsVisible) {
            _this.setState({
              suggestionsVisible: false
            });

            ev.preventDefault();
            ev.stopPropagation();
          }

          break;

        case _utilities.KeyCodes.tab:
        case _utilities.KeyCodes.enter:
          if (_this.suggestionElement.current && _this.suggestionElement.current.hasSuggestedActionSelected()) {
            _this.suggestionElement.current.executeSelectedAction();
          } else if (!ev.shiftKey && _this.suggestionStore.hasSelectedSuggestion() && _this.state.suggestionsVisible) {
            _this.completeSuggestion();

            ev.preventDefault();
            ev.stopPropagation();
          } else {
            _this._completeGenericSuggestion();
          }

          break;

        case _utilities.KeyCodes.backspace:
          if (!_this.props.disabled) {
            _this.onBackspace(ev);
          }

          ev.stopPropagation();
          break;

        case _utilities.KeyCodes.del:
          if (!_this.props.disabled) {
            if (_this.input.current && ev.target === _this.input.current.inputElement && _this.state.suggestionsVisible && _this.suggestionStore.currentIndex !== -1) {
              if (_this.props.onRemoveSuggestion) {
                _this.props.onRemoveSuggestion(_this.suggestionStore.currentSuggestion.item);
              }

              _this.suggestionStore.removeSuggestion(_this.suggestionStore.currentIndex);

              _this.forceUpdate();
            } else {
              _this.onBackspace(ev);
            }
          }

          ev.stopPropagation();
          break;

        case _utilities.KeyCodes.up:
          if (_this.input.current && ev.target === _this.input.current.inputElement && _this.state.suggestionsVisible) {
            if (_this.suggestionElement.current && _this.suggestionElement.current.tryHandleKeyDown(keyCode, _this.suggestionStore.currentIndex)) {
              ev.preventDefault();
              ev.stopPropagation();
            } else {
              if (_this.suggestionElement.current && _this.suggestionElement.current.hasSuggestedAction() && _this.suggestionStore.currentIndex === 0) {
                ev.preventDefault();
                ev.stopPropagation();

                _this.suggestionElement.current.focusAboveSuggestions();

                _this.suggestionStore.deselectAllSuggestions();

                _this.forceUpdate();
              } else {
                if (_this.suggestionStore.previousSuggestion()) {
                  ev.preventDefault();
                  ev.stopPropagation();

                  _this.onSuggestionSelect();
                }
              }
            }
          }

          break;

        case _utilities.KeyCodes.down:
          if (_this.input.current && ev.target === _this.input.current.inputElement && _this.state.suggestionsVisible) {
            if (_this.suggestionElement.current && _this.suggestionElement.current.tryHandleKeyDown(keyCode, _this.suggestionStore.currentIndex)) {
              ev.preventDefault();
              ev.stopPropagation();
            } else {
              if (_this.suggestionElement.current && _this.suggestionElement.current.hasSuggestedAction() && _this.suggestionStore.currentIndex + 1 === _this.suggestionStore.suggestions.length) {
                ev.preventDefault();
                ev.stopPropagation();

                _this.suggestionElement.current.focusBelowSuggestions();

                _this.suggestionStore.deselectAllSuggestions();

                _this.forceUpdate();
              } else {
                if (_this.suggestionStore.nextSuggestion()) {
                  ev.preventDefault();
                  ev.stopPropagation();

                  _this.onSuggestionSelect();
                }
              }
            }
          }

          break;

        default:
          break;
      }
    };

    _this.onItemChange = function (changedItem, index) {
      var items = _this.state.items;

      if (index >= 0) {
        var newItems = items;
        newItems[index] = changedItem;

        _this._updateSelectedItems(newItems);
      }
    };

    _this.onGetMoreResults = function () {
      _this.setState({
        isSearching: true
      }, function () {
        if (_this.props.onGetMoreResults && _this.input.current) {
          var suggestions = _this.props.onGetMoreResults(_this.input.current.value, _this.state.items);

          var suggestionsArray = suggestions;
          var suggestionsPromiseLike = suggestions;

          if (Array.isArray(suggestionsArray)) {
            _this.updateSuggestions(suggestionsArray);

            _this.setState({
              isSearching: false
            });
          } else if (suggestionsPromiseLike.then) {
            suggestionsPromiseLike.then(function (newSuggestions) {
              _this.updateSuggestions(newSuggestions);

              _this.setState({
                isSearching: false
              });
            });
          }
        } else {
          _this.setState({
            isSearching: false
          });
        }

        if (_this.input.current) {
          _this.input.current.focus();
        }

        _this.setState({
          moreSuggestionsAvailable: false,
          isResultsFooterVisible: true
        });
      });
    };

    _this.completeSelection = function (item) {
      _this.addItem(item);

      _this.updateValue("");

      if (_this.input.current) {
        _this.input.current.clear();
      }

      _this.setState({
        suggestionsVisible: false
      });
    };

    _this.addItemByIndex = function (index) {
      _this.completeSelection(_this.suggestionStore.getSuggestionAtIndex(index).item);
    };

    _this.addItem = function (item) {
      var processedItem = _this.props.onItemSelected ? _this.props.onItemSelected(item) : item;

      if (processedItem === null) {
        return;
      }

      var processedItemObject = processedItem;
      var processedItemPromiseLike = processedItem;

      if (processedItemPromiseLike && processedItemPromiseLike.then) {
        processedItemPromiseLike.then(function (resolvedProcessedItem) {
          var newItems = _this.state.items.concat([resolvedProcessedItem]);

          _this._updateSelectedItems(newItems);
        });
      } else {
        var newItems = _this.state.items.concat([processedItemObject]);

        _this._updateSelectedItems(newItems);
      }

      _this.setState({
        suggestedDisplayValue: ""
      });
    };

    _this.removeItem = function (item, focusNextItem) {
      var items = _this.state.items;
      var index = items.indexOf(item);

      if (index >= 0) {
        var newItems = items.slice(0, index).concat(items.slice(index + 1));

        _this._updateSelectedItems(newItems, focusNextItem ? index : undefined);
      }
    };

    _this.removeItems = function (itemsToRemove) {
      var items = _this.state.items;
      var newItems = items.filter(function (item) {
        return itemsToRemove.indexOf(item) === -1;
      });
      var firstItemToRemove = itemsToRemove[0];
      var index = items.indexOf(firstItemToRemove);

      _this._updateSelectedItems(newItems, index);
    };

    _this._shouldFocusZoneEnterInnerZone = function (ev) {
      // If suggestions are shown const up/down keys control them, otherwise allow them through to control the focusZone.
      if (_this.state.suggestionsVisible) {
        switch (ev.which) {
          case _utilities.KeyCodes.up:
          case _utilities.KeyCodes.down:
            return true;

          default:
            return;
        }
      }

      if (ev.which === _utilities.KeyCodes.enter) {
        return true;
      }

      return false;
    };

    _this._onResolveSuggestions = function (updatedValue) {
      var suggestions = _this.props.onResolveSuggestions(updatedValue, _this.state.items);

      if (suggestions !== null) {
        _this.updateSuggestionsList(suggestions, updatedValue);
      }
    };

    _this._completeGenericSuggestion = function () {
      if (_this.props.onValidateInput && _this.input.current && _this.props.onValidateInput(_this.input.current.value) !== _BasePicker.ValidationState.invalid && _this.props.createGenericItem) {
        var itemToConvert = _this.props.createGenericItem(_this.input.current.value, _this.props.onValidateInput(_this.input.current.value));

        _this.suggestionStore.createGenericSuggestion(itemToConvert);

        _this.completeSuggestion();
      }
    };
    /**
     * This should be called when the user does something other than use text entry to trigger suggestions.
     *
     */


    _this._userTriggeredSuggestions = function () {
      if (!_this.state.suggestionsVisible) {
        var input = _this.input.current ? _this.input.current.value : "";

        if (!input) {
          _this.onEmptyInputFocus();
        } else {
          if (_this.suggestionStore.suggestions.length === 0) {
            _this._onResolveSuggestions(input);
          } else {
            _this.setState({
              isMostRecentlyUsedVisible: false,
              suggestionsVisible: true
            });
          }
        }
      }
    };

    (0, _utilities.initializeComponentRef)(_this);
    _this._async = new _utilities.Async(_this);
    var items = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];
    _this._id = (0, _utilities.getId)();
    _this._ariaMap = {
      selectedItems: "selected-items-" + _this._id,
      selectedSuggestionAlert: "selected-suggestion-alert-" + _this._id,
      suggestionList: "suggestion-list-" + _this._id
    };
    _this.suggestionStore = new _SuggestionsController.SuggestionsController();
    _this.selection = new _selection.Selection({
      onSelectionChanged: function onSelectionChanged() {
        return _this.onSelectionChange();
      }
    });

    _this.selection.setItems(items);

    _this.state = {
      items: items,
      suggestedDisplayValue: "",
      isMostRecentlyUsedVisible: false,
      moreSuggestionsAvailable: false,
      isFocused: false,
      isSearching: false,
      selectedIndices: []
    };
    return _this;
  }

  Object.defineProperty(BasePicker.prototype, "items", {
    get: function get() {
      return this.state.items;
    },
    enumerable: true,
    configurable: true
  }); // tslint:disable-next-line function-name

  BasePicker.prototype.UNSAFE_componentWillUpdate = function (newProps, newState) {
    if (newState.items && newState.items !== this.state.items) {
      this.selection.setItems(newState.items);
    }
  };

  BasePicker.prototype.componentDidMount = function () {
    this.selection.setItems(this.state.items);
    this._onResolveSuggestions = this._async.debounce(this._onResolveSuggestions, this.props.resolveDelay);
  }; // tslint:disable-next-line function-name


  BasePicker.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
    var _this = this;

    var newItems = newProps.selectedItems;

    if (newItems) {
      var focusIndex_1; // If there are less new items than old items then something was removed and we
      // should try to keep focus consistent

      if (newItems.length < this.state.items.length) {
        focusIndex_1 = this.state.items.indexOf(this.selection.getSelection()[0]);
      }

      this.setState({
        items: newProps.selectedItems
      }, function () {
        // Only update the focus if this component is currently focused to ensure that the basepicker
        // doesn't steal focus from something else.
        if (_this.state.isFocused) {
          // Need to reset focus in the same that way that we do if an item is selected by a non-controlled component
          // See _onSelectedItemsUpdated.
          _this.resetFocus(focusIndex_1);
        }
      });
    }
  };

  BasePicker.prototype.componentWillUnmount = function () {
    if (this.currentPromise) {
      this.currentPromise = undefined;
    }

    this._async.dispose();
  };

  BasePicker.prototype.focus = function () {
    if (this.focusZone.current) {
      this.focusZone.current.focus();
    }
  };

  BasePicker.prototype.focusInput = function () {
    if (this.input.current) {
      this.input.current.focus();
    }
  };

  BasePicker.prototype.completeSuggestion = function (forceComplete) {
    if (this.suggestionStore.hasSelectedSuggestion() && this.input.current) {
      this.completeSelection(this.suggestionStore.currentSuggestion.item);
    } else if (forceComplete) {
      this._completeGenericSuggestion();
    }
  };

  BasePicker.prototype.render = function () {
    var _a = this.state,
        suggestedDisplayValue = _a.suggestedDisplayValue,
        isFocused = _a.isFocused,
        items = _a.items;
    var _b = this.props,
        rcName = _b.rcName,
        type = _b.type,
        isLoading = _b.isLoading,
        className = _b.className,
        darkMode = _b.darkMode,
        inputProps = _b.inputProps,
        disabled = _b.disabled,
        theme = _b.theme,
        styles = _b.styles;
    var selectedSuggestionAlertId = this.props.enableSelectedSuggestionAlert ? this._ariaMap.selectedSuggestionAlert : "";
    var suggestionsAvailable = this.state.suggestionsVisible ? this._ariaMap.suggestionList : ""; // TODO
    // Clean this up by leaving only the first part after removing support for SASS.
    // Currently we can not remove the SASS styles from BasePicker class because it
    // might be used by consumers who created custom pickers from extending from
    // this base class and have not used the new 'styles' prop.
    // We check for 'styles' prop which is going to be injected by the 'styled' HOC
    // for every other already existing picker variant (PeoplePicker, TagPicker)
    // so that we can use the CSS-in-JS styles. If the check fails (ex: custom picker),
    // then we just use the old SASS styles instead.
    // let colorIcon = theme.palette.accent;

    var classNames = styles ? getClassNames(styles, {
      theme: theme,
      className: className,
      isFocused: isFocused,
      disabled: disabled,
      inputClassName: inputProps && inputProps.className
    }) : {
      root: (0, _utilities.css)("ms-BasePicker", className ? className : ""),
      text: (0, _utilities.css)("ms-BasePicker-text", legacyStyles.pickerText, this.state.isFocused && legacyStyles.inputFocused),
      itemsWrapper: legacyStyles.pickerItems,
      input: (0, _utilities.css)("ms-BasePicker-input", legacyStyles.pickerInput, inputProps && inputProps.className),
      screenReaderText: legacyStyles.screenReaderOnly
    };
    return /*#__PURE__*/React.createElement("div", {
      ref: this.root,
      className: classNames.root,
      onKeyDown: this.onKeyDown,
      onBlur: this.onBlur
    }, /*#__PURE__*/React.createElement(_FocusZone.FocusZone, {
      componentRef: this.focusZone,
      direction: _FocusZone.FocusZoneDirection.bidirectional,
      shouldEnterInnerZone: this._shouldFocusZoneEnterInnerZone,
      role: "combobox",
      "aria-expanded": !!this.state.suggestionsVisible,
      "aria-owns": suggestionsAvailable || undefined,
      "aria-haspopup": suggestionsAvailable && this.suggestionStore.suggestions.length > 0 ? "listbox" : "dialog"
    }, this.getSuggestionsAlert(classNames.screenReaderText), /*#__PURE__*/React.createElement(_selection.SelectionZone, {
      selection: this.selection,
      selectionMode: _selection.SelectionMode.multiple
    }, /*#__PURE__*/React.createElement("div", {
      className: classNames.text,
      style: {
        backgroundColor: darkMode === "dark" ? "#333333" : "#ffffff"
      }
    }, items.length > 0 && /*#__PURE__*/React.createElement("span", {
      id: this._ariaMap.selectedItems,
      className: classNames.itemsWrapper,
      role: "list"
    }, this.renderItems()), this.canAddItems() && /*#__PURE__*/React.createElement(_Autofill.Autofill, (0, _tslib.__assign)({
      spellCheck: false
    }, inputProps, {
      className: classNames.input,
      darkMode,
      rcName,
      type,
      isLoading,
      componentRef: this.input,
      onClick: this.onClick,
      onFocus: this.onInputFocus,
      onBlur: this.onInputBlur,
      onInputValueChange: this.onInputChange,
      suggestedDisplayValue: suggestedDisplayValue,
      "aria-describedby": items.length > 0 ? this._ariaMap.selectedItems : undefined,
      "aria-controls": suggestionsAvailable + " " + selectedSuggestionAlertId || undefined,
      "aria-activedescendant": this.getActiveDescendant(),
      role: "textbox",
      disabled: disabled,
      onInputChange: this.props.onInputChange
    }))))), this.renderSuggestions(darkMode, _b));
  };

  BasePicker.prototype.canAddItems = function () {
    var items = this.state.items;
    var itemLimit = this.props.itemLimit;
    return itemLimit === undefined || items.length < itemLimit;
  };

  BasePicker.prototype.renderSuggestions = function (darkMode, props) {
    let {
      type,
      rcName
    } = this.props;
    let isLoadingSearch = this.props.isLoading;
    var StyledTypedSuggestions = this._styledSuggestions;
    return this.state.suggestionsVisible && this.input ? /*#__PURE__*/React.createElement(_utilities.Callout, (0, _tslib.__assign)({
      isBeakVisible: false,
      gapSpace: 5,
      target: this.input.current ? this.input.current.inputElement : undefined,
      onDismiss: this.dismissSuggestions,
      directionalHint: _utilities.DirectionalHint.bottomLeftEdge,
      directionalHintForRTL: _utilities.DirectionalHint.bottomRightEdge
    }, this.props.pickerCalloutProps), /*#__PURE__*/React.createElement(StyledTypedSuggestions, // Assumed to set in derived component's defaultProps
    (0, _tslib.__assign)({
      // Assumed to set in derived component's defaultProps
      darkMode,
      rcName,
      isLoadingSearch,
      type,
      onLazyActionScroll: this.props.lazyActionScroll,
      onRenderSuggestion: this.props.onRenderSuggestionsItem,
      onSuggestionClick: this.onSuggestionClick,
      onSuggestionRemove: this.onSuggestionRemove,
      suggestions: this.suggestionStore.getSuggestions(),
      componentRef: this.suggestionElement,
      onGetMoreResults: this.onGetMoreResults,
      moreSuggestionsAvailable: this.state.moreSuggestionsAvailable,
      isLoading: this.state.suggestionsLoading,
      isSearching: this.state.isSearching,
      isMostRecentlyUsedVisible: this.state.isMostRecentlyUsedVisible,
      isResultsFooterVisible: this.state.isResultsFooterVisible,
      refocusSuggestions: this.refocusSuggestions,
      removeSuggestionAriaLabel: this.props.removeButtonAriaLabel,
      suggestionsListId: this._ariaMap.suggestionList,
      createGenericItem: this._completeGenericSuggestion
    }, this.props.pickerSuggestionsProps))) : null;
  };

  BasePicker.prototype.renderItems = function () {
    var _this = this;

    var _a = this.props,
        disabled = _a.disabled,
        removeButtonAriaLabel = _a.removeButtonAriaLabel;
    var onRenderItem = this.props.onRenderItem;
    var _b = this.state,
        items = _b.items,
        selectedIndices = _b.selectedIndices;
    return items.map(function (item, index) {
      return onRenderItem({
        item: item,
        index: index,
        key: item.key ? item.key : index,
        selected: selectedIndices.indexOf(index) !== -1,
        onRemoveItem: function onRemoveItem() {
          return _this.removeItem(item, true);
        },
        disabled: disabled,
        onItemChange: _this.onItemChange,
        removeButtonAriaLabel: removeButtonAriaLabel
      });
    });
  };

  BasePicker.prototype.resetFocus = function (index) {
    var items = this.state.items;

    if (items.length && index >= 0) {
      var newEl = this.root.current && this.root.current.querySelectorAll("[data-selection-index]")[Math.min(index, items.length - 1)];

      if (newEl && this.focusZone.current) {
        this.focusZone.current.focusElement(newEl);
      }
    } else if (!this.canAddItems()) {
      this.resetFocus(items.length - 1);
    } else {
      if (this.input.current) {
        this.input.current.focus();
      }
    }
  };

  BasePicker.prototype.onSuggestionSelect = function () {
    if (this.suggestionStore.currentSuggestion) {
      var currentValue = this.input.current ? this.input.current.value : "";

      var itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, currentValue);

      this.setState({
        suggestedDisplayValue: itemValue
      });
    }
  };

  BasePicker.prototype.onSelectionChange = function () {
    this.setState({
      selectedIndices: this.selection.getSelectedIndices()
    });
  };

  BasePicker.prototype.updateSuggestions = function (suggestions) {
    this.suggestionStore.updateSuggestions(suggestions, 0);
    this.forceUpdate();
  };
  /**
   * Only to be called when there is nothing in the input. Checks to see if the consumer has
   * provided a function to resolve suggestions
   */


  BasePicker.prototype.onEmptyInputFocus = function () {
    var emptyResolveSuggestions = this.props.onEmptyResolveSuggestions ? this.props.onEmptyResolveSuggestions : // tslint:disable-next-line:deprecation
    this.props.onEmptyInputFocus; // Only attempt to resolve suggestions if it exists

    if (emptyResolveSuggestions) {
      var suggestions = emptyResolveSuggestions(this.state.items);
      this.updateSuggestionsList(suggestions);
      this.setState({
        isMostRecentlyUsedVisible: true,
        suggestionsVisible: true,
        moreSuggestionsAvailable: false
      });
    }
  };

  BasePicker.prototype.updateValue = function (updatedValue) {
    this._onResolveSuggestions(updatedValue);
  };

  BasePicker.prototype.updateSuggestionsList = function (suggestions, updatedValue) {
    var _this = this;

    var suggestionsArray = suggestions;
    var suggestionsPromiseLike = suggestions; // Check to see if the returned value is an array, if it is then just pass it into the next function .
    // If the returned value is not an array then check to see if it's a promise or PromiseLike.
    // If it is then resolve it asynchronously.

    if (Array.isArray(suggestionsArray)) {
      this._updateAndResolveValue(updatedValue, suggestionsArray);
    } else if (suggestionsPromiseLike && suggestionsPromiseLike.then) {
      this.setState({
        suggestionsLoading: true
      }); // Clear suggestions

      this.suggestionStore.updateSuggestions([]);

      if (updatedValue !== undefined) {
        this.setState({
          suggestionsVisible: this._getShowSuggestions()
        });
      } else {
        this.setState({
          suggestionsVisible: this.input.current && this.input.current.inputElement === document.activeElement
        });
      } // Ensure that the promise will only use the callback if it was the most recent one.


      var promise_1 = this.currentPromise = suggestionsPromiseLike;
      promise_1.then(function (newSuggestions) {
        if (promise_1 === _this.currentPromise) {
          _this._updateAndResolveValue(updatedValue, newSuggestions);
        }
      });
    }
  };

  BasePicker.prototype.resolveNewValue = function (updatedValue, suggestions) {
    var _this = this;

    this.updateSuggestions(suggestions);
    var itemValue = undefined;

    if (this.suggestionStore.currentSuggestion) {
      itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, updatedValue);
    } // Only set suggestionloading to false after there has been time for the new suggestions to flow
    // to the suggestions list. This is to ensure that the suggestions are available before aria-activedescendant
    // is set so that screen readers will read out the first selected option.


    this.setState({
      suggestedDisplayValue: itemValue,
      suggestionsVisible: this._getShowSuggestions()
    }, function () {
      return _this.setState({
        suggestionsLoading: false
      });
    });
  };

  BasePicker.prototype.onChange = function (items) {
    if (this.props.onChange) {
      this.props.onChange(items);
    }
  }; // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow


  BasePicker.prototype.onBackspace = function (ev) {
    if (this.state.items.length && !this.input.current || this.input.current && !this.input.current.isValueSelected && this.input.current.cursorLocation === 0) {
      if (this.selection.getSelectedCount() > 0) {
        this.removeItems(this.selection.getSelection());
      } else {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    }
  };

  BasePicker.prototype.getActiveDescendant = function () {
    var currentIndex = this.suggestionStore.currentIndex;
    return currentIndex > -1 && !this.state.suggestionsLoading ? "sug-" + currentIndex : undefined;
  };

  BasePicker.prototype.getSuggestionsAlert = function (suggestionAlertClassName) {
    if (suggestionAlertClassName === void 0) {
      suggestionAlertClassName = legacyStyles.screenReaderOnly;
    }

    var currentIndex = this.suggestionStore.currentIndex;

    if (this.props.enableSelectedSuggestionAlert) {
      var selectedSuggestion = currentIndex > -1 ? this.suggestionStore.getSuggestionAtIndex(this.suggestionStore.currentIndex) : undefined;
      var selectedSuggestionAlertText = selectedSuggestion ? selectedSuggestion.ariaLabel : undefined;
      return /*#__PURE__*/React.createElement("div", {
        className: suggestionAlertClassName,
        role: "alert",
        id: this._ariaMap.selectedSuggestionAlert,
        "aria-live": "assertive"
      }, selectedSuggestionAlertText, " ");
    }
  };
  /**
   * Takes in the current updated value and either resolves it with the new suggestions
   * or if updated value is undefined then it clears out currently suggested items
   */


  BasePicker.prototype._updateAndResolveValue = function (updatedValue, newSuggestions) {
    if (updatedValue !== undefined) {
      this.resolveNewValue(updatedValue, newSuggestions);
    } else {
      this.suggestionStore.updateSuggestions(newSuggestions, -1);

      if (this.state.suggestionsLoading) {
        this.setState({
          suggestionsLoading: false
        });
      }
    }
  };
  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If `selectedItems` is provided, this will act as a controlled component and it will not update its own state.
   */


  BasePicker.prototype._updateSelectedItems = function (items, focusIndex) {
    var _this = this;

    if (this.props.selectedItems) {
      // If the component is a controlled component then the controlling component will need to add or remove the items.
      this.onChange(items);
    } else {
      this.setState({
        items: items
      }, function () {
        _this._onSelectedItemsUpdated(items, focusIndex);
      });
    }
  };

  BasePicker.prototype._onSelectedItemsUpdated = function (items, focusIndex) {
    this.resetFocus(focusIndex);
    this.onChange(items);
  };
  /**
   * Suggestions are normally shown after the user updates text and the text
   * is non-empty, but also when the user clicks on the input element.
   * @returns True if suggestions should be shown.
   */


  BasePicker.prototype._getShowSuggestions = function () {
    var areSuggestionsVisible = this.input.current !== undefined && this.input.current !== null && this.input.current.inputElement === document.activeElement && this.input.current.value !== "";
    return areSuggestionsVisible;
  };

  BasePicker.prototype._getTextFromItem = function (item, currentValue) {
    if (this.props.getTextFromItem) {
      return this.props.getTextFromItem(item, currentValue);
    } else {
      return "";
    }
  };

  return BasePicker;
}(React.Component);

exports.BasePicker = BasePicker;

var BasePickerListBelow =
/** @class */
function (_super) {
  (0, _tslib.__extends)(BasePickerListBelow, _super);

  function BasePickerListBelow() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  BasePickerListBelow.prototype.render = function () {
    var _a = this.state,
        suggestedDisplayValue = _a.suggestedDisplayValue,
        isFocused = _a.isFocused;
    var _b = this.props,
        className = _b.className,
        type = _b.type,
        darkMode = _b.darkMode,
        inputProps = _b.inputProps,
        disabled = _b.disabled,
        theme = _b.theme,
        styles = _b.styles;
    var selectedSuggestionAlertId = this.props.enableSelectedSuggestionAlert ? this._ariaMap.selectedSuggestionAlert : "";
    var suggestionsAvailable = this.state.suggestionsVisible ? this._ariaMap.suggestionList : ""; // TODO
    // Clean this up by leaving only the first part after removing support for SASS.
    // Currently we can not remove the SASS styles from BasePicker class because it
    // might be used by consumers who created custom pickers from extending from
    // this base class and have not used the new 'styles' prop.
    // We check for 'styles' prop which is going to be injected by the 'styled' HOC
    // for every other already existing picker variant (PeoplePicker, TagPicker)
    // so that we can use the CSS-in-JS styles. If the check fails (ex: custom picker),
    // then we just use the old SASS styles instead.

    var classNames = styles ? getClassNames(styles, {
      theme: theme,
      className: className,
      isFocused: isFocused,
      inputClassName: inputProps && inputProps.className
    }) : {
      root: (0, _utilities.css)("ms-BasePicker", className ? className : ""),
      text: (0, _utilities.css)("ms-BasePicker-text", legacyStyles.pickerText, this.state.isFocused && legacyStyles.inputFocused),
      input: (0, _utilities.css)("ms-BasePicker-input", legacyStyles.pickerInput, inputProps && inputProps.className),
      screenReaderText: legacyStyles.screenReaderOnly
    };
    return /*#__PURE__*/React.createElement("div", {
      ref: this.root,
      onBlur: this.onBlur
    }, /*#__PURE__*/React.createElement("div", {
      className: classNames.root,
      onKeyDown: this.onKeyDown
    }, this.getSuggestionsAlert(classNames.screenReaderText), /*#__PURE__*/React.createElement("div", {
      className: classNames.text,
      "aria-owns": suggestionsAvailable || undefined,
      "aria-expanded": !!this.state.suggestionsVisible,
      "aria-haspopup": suggestionsAvailable && this.suggestionStore.suggestions.length > 0 ? "listbox" : "dialog",
      role: "combobox"
    }, /*#__PURE__*/React.createElement(_Autofill.Autofill, (0, _tslib.__assign)({}, inputProps, darkMode, type, {
      className: classNames.input,
      componentRef: this.input,
      onFocus: this.onInputFocus,
      onBlur: this.onInputBlur,
      onClick: this.onClick,
      onInputValueChange: this.onInputChange,
      suggestedDisplayValue: suggestedDisplayValue,
      "aria-activedescendant": this.getActiveDescendant(),
      role: "textbox",
      disabled: disabled,
      "aria-controls": suggestionsAvailable + " " + selectedSuggestionAlertId || undefined,
      onInputChange: this.props.onInputChange
    })))), this.renderSuggestions(), /*#__PURE__*/React.createElement(_selection.SelectionZone, {
      selection: this.selection,
      selectionMode: _selection.SelectionMode.single
    }, /*#__PURE__*/React.createElement(_FocusZone.FocusZone, {
      componentRef: this.focusZone,
      className: "ms-BasePicker-selectedItems",
      // just a className hook without any styles applied to it.
      isCircularNavigation: true,
      direction: _FocusZone.FocusZoneDirection.bidirectional,
      shouldEnterInnerZone: this._shouldFocusZoneEnterInnerZone,
      id: this._ariaMap.selectedItems,
      role: "list"
    }, this.renderItems())));
  };

  BasePickerListBelow.prototype.onBackspace = function (ev) {// override the existing backspace method to not do anything because the list items appear below.
  };

  return BasePickerListBelow;
}(BasePicker);

exports.BasePickerListBelow = BasePickerListBelow;