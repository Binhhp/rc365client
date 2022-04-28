"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeoplePickerItemSuggestion = exports.PeoplePickerItemSuggestionBase = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../../../@uifabric/utilities");

var _Persona = require("../../../Persona");

var _PeoplePickerItemSuggestion = require("./PeoplePickerItemSuggestion.styles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getClassNames = (0, _utilities.classNamesFunction)();

var PeoplePickerItemSuggestionBase = function PeoplePickerItemSuggestionBase(props) {
  var personaProps = props.personaProps,
      suggestionsProps = props.suggestionsProps,
      compact = props.compact,
      styles = props.styles,
      theme = props.theme,
      className = props.className;
  var classNames = getClassNames(styles, {
    theme: theme,
    className: suggestionsProps && suggestionsProps.suggestionsItemClassName || className
  });
  var personaStyles = classNames.subComponentStyles && classNames.subComponentStyles.persona ? classNames.subComponentStyles.persona : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames.root
  }, /*#__PURE__*/React.createElement(_Persona.Persona, (0, _tslib.__assign)({
    size: _Persona.PersonaSize.size24,
    styles: personaStyles,
    className: classNames.personaWrapper,
    showSecondaryText: !compact
  }, personaProps)));
};

exports.PeoplePickerItemSuggestionBase = PeoplePickerItemSuggestionBase;
var PeoplePickerItemSuggestion = (0, _utilities.styled)(PeoplePickerItemSuggestionBase, _PeoplePickerItemSuggestion.getStyles, undefined, {
  scope: 'PeoplePickerItemSuggestion'
});
exports.PeoplePickerItemSuggestion = PeoplePickerItemSuggestion;