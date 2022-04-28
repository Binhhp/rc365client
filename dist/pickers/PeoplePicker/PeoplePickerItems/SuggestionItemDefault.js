"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionItemSmall = exports.SuggestionItemNormal = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../../../@uifabric/utilities");

var _Persona = require("../../../Persona");

var stylesImport = _interopRequireWildcard(require("./SuggestionItemDefault.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = stylesImport;
/**
 * @deprecated Use the exported from the package level 'PeoplePickerItemSuggestion'. Will be removed in Fabric 7.0
 */

var SuggestionItemNormal = function SuggestionItemNormal(personaProps, suggestionItemProps) {
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _utilities.css)('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent)
  }, /*#__PURE__*/React.createElement(_Persona.Persona, (0, _tslib.__assign)({
    presence: personaProps.presence !== undefined ? personaProps.presence : _Persona.PersonaPresence.none,
    size: _Persona.PersonaSize.size24,
    className: (0, _utilities.css)('ms-PeoplePicker-Persona', styles.peoplePickerPersona),
    showSecondaryText: true
  }, personaProps)));
};
/**
 *  Will be removed in Fabric 7.0
 * @deprecated Use the exported from the package level 'PeoplePickerItemSuggestion' with compact prop set to true.
 */


exports.SuggestionItemNormal = SuggestionItemNormal;

var SuggestionItemSmall = function SuggestionItemSmall(personaProps, suggestionItemProps) {
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _utilities.css)('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent)
  }, /*#__PURE__*/React.createElement(_Persona.Persona, (0, _tslib.__assign)({
    presence: personaProps.presence !== undefined ? personaProps.presence : _Persona.PersonaPresence.none,
    size: _Persona.PersonaSize.size24,
    className: (0, _utilities.css)('ms-PeoplePicker-Persona', styles.peoplePickerPersona)
  }, personaProps)));
};

exports.SuggestionItemSmall = SuggestionItemSmall;