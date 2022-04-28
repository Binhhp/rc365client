"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeoplePickerItem = exports.PeoplePickerItemBase = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../../../@uifabric/utilities");

var _Persona = require("../../../Persona");

var _IconButton = require("../../../Button/IconButton/IconButton");

var _BasePicker = require("../../BasePicker.types");

var _PeoplePickerItem = require("./PeoplePickerItem.styles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getClassNames = (0, _utilities.classNamesFunction)();

var PeoplePickerItemBase = function PeoplePickerItemBase(props) {
  var item = props.item,
      onRemoveItem = props.onRemoveItem,
      index = props.index,
      selected = props.selected,
      removeButtonAriaLabel = props.removeButtonAriaLabel,
      styles = props.styles,
      theme = props.theme,
      className = props.className,
      disabled = props.disabled;
  var itemId = (0, _utilities.getId)();
  var classNames = getClassNames(styles, {
    theme: theme,
    className: className,
    selected: selected,
    disabled: disabled,
    invalid: item.ValidationState === _BasePicker.ValidationState.warning
  });
  var personaStyles = classNames.subComponentStyles ? classNames.subComponentStyles.persona : undefined;
  var personaCoinStyles = classNames.subComponentStyles ? classNames.subComponentStyles.personaCoin : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames.root,
    "data-is-focusable": !disabled,
    "data-is-sub-focuszone": true,
    "data-selection-index": index,
    role: 'listitem',
    "aria-labelledby": 'selectedItemPersona-' + itemId
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames.itemContent,
    id: 'selectedItemPersona-' + itemId
  }, /*#__PURE__*/React.createElement(_Persona.Persona, (0, _tslib.__assign)({
    size: _Persona.PersonaSize.size24,
    styles: personaStyles,
    coinProps: {
      styles: personaCoinStyles
    }
  }, item))), /*#__PURE__*/React.createElement(_IconButton.IconButton, {
    onClick: onRemoveItem,
    disabled: disabled,
    iconProps: {
      iconName: 'Cancel',
      styles: {
        root: {
          fontSize: '12px'
        }
      }
    },
    className: classNames.removeButton,
    ariaLabel: removeButtonAriaLabel
  }));
};

exports.PeoplePickerItemBase = PeoplePickerItemBase;
var PeoplePickerItem = (0, _utilities.styled)(PeoplePickerItemBase, _PeoplePickerItem.getStyles, undefined, {
  scope: 'PeoplePickerItem'
});
exports.PeoplePickerItem = PeoplePickerItem;