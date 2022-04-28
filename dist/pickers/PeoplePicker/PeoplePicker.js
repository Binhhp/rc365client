"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGenericItem = createGenericItem;
exports.ListPeoplePicker = exports.CompactPeoplePicker = exports.NormalPeoplePicker = exports.ListPeoplePickerBase = exports.CompactPeoplePickerBase = exports.NormalPeoplePickerBase = exports.MemberListPeoplePicker = exports.BasePeoplePicker = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../../@uifabric/utilities");

var _BasePicker = require("../BasePicker");

var _BasePicker2 = require("../BasePicker.types");

var _PeoplePickerItem = require("./PeoplePickerItems/PeoplePickerItem");

var _PeoplePickerItemSuggestion = require("./PeoplePickerItems/PeoplePickerItemSuggestion");

var _BasePicker3 = require("../BasePicker.styles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * {@docCategory PeoplePicker}
 */
var BasePeoplePicker =
/** @class */
function (_super) {
  (0, _tslib.__extends)(BasePeoplePicker, _super);

  function BasePeoplePicker() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return BasePeoplePicker;
}(_BasePicker.BasePicker);

exports.BasePeoplePicker = BasePeoplePicker;

/**
 * {@docCategory PeoplePicker}
 */
var MemberListPeoplePicker =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MemberListPeoplePicker, _super);

  function MemberListPeoplePicker() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return MemberListPeoplePicker;
}(_BasePicker.BasePickerListBelow);

exports.MemberListPeoplePicker = MemberListPeoplePicker;

/**
 * Standard People Picker.
 * {@docCategory PeoplePicker}
 */
var NormalPeoplePickerBase =
/** @class */
function (_super) {
  (0, _tslib.__extends)(NormalPeoplePickerBase, _super);

  function NormalPeoplePickerBase() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /** Default props for NormalPeoplePicker. */


  NormalPeoplePickerBase.defaultProps = {
    onRenderItem: function onRenderItem(props) {
      return /*#__PURE__*/React.createElement(_PeoplePickerItem.PeoplePickerItem, (0, _tslib.__assign)({}, props));
    },
    onRenderSuggestionsItem: function onRenderSuggestionsItem(personaProps, suggestionsProps) {
      return /*#__PURE__*/React.createElement(_PeoplePickerItemSuggestion.PeoplePickerItemSuggestion, {
        personaProps: personaProps,
        suggestionsProps: suggestionsProps
      });
    },
    createGenericItem: createGenericItem
  };
  return NormalPeoplePickerBase;
}(BasePeoplePicker);

exports.NormalPeoplePickerBase = NormalPeoplePickerBase;

/**
 * Compact layout. It uses personas without secondary text when displaying search results.
 * {@docCategory PeoplePicker}
 */
var CompactPeoplePickerBase =
/** @class */
function (_super) {
  (0, _tslib.__extends)(CompactPeoplePickerBase, _super);

  function CompactPeoplePickerBase() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /** Default props for CompactPeoplePicker. */


  CompactPeoplePickerBase.defaultProps = {
    onRenderItem: function onRenderItem(props) {
      return /*#__PURE__*/React.createElement(_PeoplePickerItem.PeoplePickerItem, (0, _tslib.__assign)({}, props));
    },
    onRenderSuggestionsItem: function onRenderSuggestionsItem(personaProps, suggestionsProps) {
      return /*#__PURE__*/React.createElement(_PeoplePickerItemSuggestion.PeoplePickerItemSuggestion, {
        personaProps: personaProps,
        suggestionsProps: suggestionsProps,
        compact: true
      });
    },
    createGenericItem: createGenericItem
  };
  return CompactPeoplePickerBase;
}(BasePeoplePicker);

exports.CompactPeoplePickerBase = CompactPeoplePickerBase;

/**
 * MemberList layout. The selected people show up below the search box.
 * {@docCategory PeoplePicker}
 */
var ListPeoplePickerBase =
/** @class */
function (_super) {
  (0, _tslib.__extends)(ListPeoplePickerBase, _super);

  function ListPeoplePickerBase() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /** Default props for ListPeoplePicker. */


  ListPeoplePickerBase.defaultProps = {
    onRenderItem: function onRenderItem(props) {
      return /*#__PURE__*/React.createElement(_PeoplePickerItem.PeoplePickerItem, (0, _tslib.__assign)({}, props));
    },
    onRenderSuggestionsItem: function onRenderSuggestionsItem(personaProps, suggestionsProps) {
      return /*#__PURE__*/React.createElement(_PeoplePickerItemSuggestion.PeoplePickerItemSuggestion, {
        personaProps: personaProps,
        suggestionsProps: suggestionsProps
      });
    },
    createGenericItem: createGenericItem
  };
  return ListPeoplePickerBase;
}(MemberListPeoplePicker);

exports.ListPeoplePickerBase = ListPeoplePickerBase;

/**
 * {@docCategory PeoplePicker}
 */
function createGenericItem(name, currentValidationState) {
  var personaToConvert = {
    key: name,
    primaryText: name,
    imageInitials: '!',
    ValidationState: currentValidationState
  };

  if (currentValidationState !== _BasePicker2.ValidationState.warning) {
    personaToConvert.imageInitials = (0, _utilities.getInitials)(name, (0, _utilities.getRTL)());
  }

  return personaToConvert;
}

var NormalPeoplePicker = (0, _utilities.styled)(NormalPeoplePickerBase, _BasePicker3.getStyles, undefined, {
  scope: 'NormalPeoplePicker'
});
exports.NormalPeoplePicker = NormalPeoplePicker;
var CompactPeoplePicker = (0, _utilities.styled)(CompactPeoplePickerBase, _BasePicker3.getStyles, undefined, {
  scope: 'CompactPeoplePicker'
});
exports.CompactPeoplePicker = CompactPeoplePicker;
var ListPeoplePicker = (0, _utilities.styled)(ListPeoplePickerBase, _BasePicker3.getStyles, undefined, {
  scope: 'ListPeoplePickerBase'
});
exports.ListPeoplePicker = ListPeoplePicker;