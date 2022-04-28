"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedItemDefault = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../../../@uifabric/utilities");

var _Persona = require("../../../Persona");

var _BasePicker = require("../../BasePicker.types");

var _IconButton = require("../../../Button/IconButton/IconButton");

var stylesImport = _interopRequireWildcard(require("./PickerItemsDefault.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = stylesImport;
/**
 * @deprecated Use the exported from the package level 'PeoplePickerItem'. Will be removed in Fabric 7.
 */

var SelectedItemDefault = function SelectedItemDefault(peoplePickerItemProps) {
  var _a, _b;

  var item = peoplePickerItemProps.item,
      onRemoveItem = peoplePickerItemProps.onRemoveItem,
      index = peoplePickerItemProps.index,
      selected = peoplePickerItemProps.selected,
      removeButtonAriaLabel = peoplePickerItemProps.removeButtonAriaLabel;
  var itemId = (0, _utilities.getId)();

  var onClickIconButton = function onClickIconButton(removeItem) {
    return function () {
      if (removeItem) {
        removeItem();
      }
    };
  };

  return /*#__PURE__*/React.createElement("div", {
    className: (0, _utilities.css)('ms-PickerPersona-container', styles.personaContainer, (_a = {}, _a['is-selected ' + styles.personaContainerIsSelected] = selected, _a), (_b = {}, _b['is-invalid ' + styles.validationError] = item.ValidationState === _BasePicker.ValidationState.warning, _b)),
    "data-is-focusable": true,
    "data-is-sub-focuszone": true,
    "data-selection-index": index,
    role: 'listitem',
    "aria-labelledby": 'selectedItemPersona-' + itemId
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _utilities.css)('ms-PickerItem-content', styles.itemContent),
    id: 'selectedItemPersona-' + itemId
  }, /*#__PURE__*/React.createElement(_Persona.Persona, (0, _tslib.__assign)({}, item, {
    presence: item.presence !== undefined ? item.presence : _Persona.PersonaPresence.none,
    size: _Persona.PersonaSize.size28
  }))), /*#__PURE__*/React.createElement(_IconButton.IconButton, {
    onClick: onClickIconButton(onRemoveItem),
    iconProps: {
      iconName: 'Cancel',
      style: {
        fontSize: '12px'
      }
    },
    className: (0, _utilities.css)('ms-PickerItem-removeButton', styles.removeButton),
    ariaLabel: removeButtonAriaLabel
  }));
};

exports.SelectedItemDefault = SelectedItemDefault;