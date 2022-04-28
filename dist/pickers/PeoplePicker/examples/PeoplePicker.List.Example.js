"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeoplePickerListExample = void 0;

var React = _interopRequireWildcard(require("react"));

var _Checkbox = require("office-ui-fabric-react/lib/Checkbox");

var _Pickers = require("office-ui-fabric-react/lib/Pickers");

var _exampleData = require("@uifabric/example-data");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var suggestionProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts'
};
var checkboxStyles = {
  root: {
    marginTop: 10
  }
};

var PeoplePickerListExample = function PeoplePickerListExample() {
  var _a = React.useState(false),
      delayResults = _a[0],
      setDelayResults = _a[1];

  var _b = React.useState(false),
      isPickerDisabled = _b[0],
      setIsPickerDisabled = _b[1];

  var _c = React.useState(_exampleData.mru),
      mostRecentlyUsed = _c[0],
      setMostRecentlyUsed = _c[1];

  var _d = React.useState(_exampleData.people),
      peopleList = _d[0],
      setPeopleList = _d[1];

  var picker = React.useRef(null);

  var onFilterChanged = function onFilterChanged(filterText, currentPersonas, limitResults) {
    if (filterText) {
      var filteredPersonas = filterPersonasByText(filterText);
      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.slice(0, limitResults) : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  var filterPersonasByText = function filterPersonasByText(filterText) {
    return peopleList.filter(function (item) {
      return doesTextStartWith(item.text, filterText);
    });
  };

  var filterPromise = function filterPromise(personasToReturn) {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  var returnMostRecentlyUsed = function returnMostRecentlyUsed(currentPersonas) {
    setMostRecentlyUsed(removeDuplicates(mostRecentlyUsed, currentPersonas));
    return filterPromise(mostRecentlyUsed);
  };

  var onRemoveSuggestion = function onRemoveSuggestion(item) {
    var indexPeopleList = peopleList.indexOf(item);
    var indexMostRecentlyUsed = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      var newPeople = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
      setPeopleList(newPeople);
    }

    if (indexMostRecentlyUsed >= 0) {
      var newSuggestedPeople = mostRecentlyUsed.slice(0, indexMostRecentlyUsed).concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      setMostRecentlyUsed(newSuggestedPeople);
    }
  };

  var onDisabledButtonClick = function onDisabledButtonClick() {
    setIsPickerDisabled(!isPickerDisabled);
  };

  var onToggleDelayResultsChange = function onToggleDelayResultsChange() {
    setDelayResults(!delayResults);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Pickers.ListPeoplePicker, {
    onResolveSuggestions: onFilterChanged,
    onEmptyInputFocus: returnMostRecentlyUsed,
    getTextFromItem: getTextFromItem,
    className: 'ms-PeoplePicker',
    pickerSuggestionsProps: suggestionProps,
    key: 'list',
    onRemoveSuggestion: onRemoveSuggestion,
    onValidateInput: validateInput,
    inputProps: {
      onBlur: function onBlur(ev) {
        return console.log('onBlur called');
      },
      onFocus: function onFocus(ev) {
        return console.log('onFocus called');
      },
      'aria-label': 'People Picker'
    },
    componentRef: picker,
    resolveDelay: 300,
    disabled: isPickerDisabled
  }), /*#__PURE__*/React.createElement(_Checkbox.Checkbox, {
    label: "Disable People Picker",
    checked: isPickerDisabled,
    onChange: onDisabledButtonClick,
    styles: checkboxStyles
  }), /*#__PURE__*/React.createElement(_Checkbox.Checkbox, {
    label: "Delay Suggestion Results",
    defaultChecked: delayResults,
    onChange: onToggleDelayResultsChange,
    styles: checkboxStyles
  }));
};

exports.PeoplePickerListExample = PeoplePickerListExample;

function doesTextStartWith(text, filterText) {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(personas, possibleDupes) {
  return personas.filter(function (persona) {
    return !listContainsPersona(persona, possibleDupes);
  });
}

function listContainsPersona(persona, personas) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }

  return personas.filter(function (item) {
    return item.text === persona.text;
  }).length > 0;
}

function convertResultsToPromise(results) {
  return new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(results);
    }, 2000);
  });
}

function getTextFromItem(persona) {
  return persona.text;
}

function validateInput(input) {
  if (input.indexOf('@') !== -1) {
    return _Pickers.ValidationState.valid;
  } else if (input.length > 1) {
    return _Pickers.ValidationState.warning;
  } else {
    return _Pickers.ValidationState.invalid;
  }
}