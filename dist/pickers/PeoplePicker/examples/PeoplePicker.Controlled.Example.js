"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeoplePickerControlledExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _Button = require("office-ui-fabric-react/lib/Button");

var _Checkbox = require("office-ui-fabric-react/lib/Checkbox");

var _Persona = require("office-ui-fabric-react/lib/Persona");

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
var defaultButtonStyles = {
  root: {
    height: 'auto'
  }
};

var PeoplePickerControlledExample = function PeoplePickerControlledExample() {
  var _a = React.useState([]),
      currentSelectedItems = _a[0],
      setCurrentSelectedItems = _a[1];

  var _b = React.useState(false),
      delayResults = _b[0],
      setDelayResults = _b[1];

  var _c = React.useState(false),
      isPickerDisabled = _c[0],
      setIsPickerDisabled = _c[1];

  var peopleList = React.useState(_exampleData.people)[0];
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

  var onItemsChange = function onItemsChange(items) {
    setCurrentSelectedItems(items);
  };

  var controlledItems = [];

  for (var i = 0; i < 5; i++) {
    var item = peopleList[i];

    if (currentSelectedItems.indexOf(item) === -1) {
      controlledItems.push(peopleList[i]);
    }
  }

  var onDisabledButtonClick = function onDisabledButtonClick() {
    setIsPickerDisabled(!isPickerDisabled);
  };

  var onToggleDelayResultsChange = function onToggleDelayResultsChange() {
    setDelayResults(!delayResults);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Pickers.NormalPeoplePicker, {
    onResolveSuggestions: onFilterChanged,
    getTextFromItem: getTextFromItem,
    pickerSuggestionsProps: suggestionProps,
    className: 'ms-PeoplePicker',
    key: 'controlled',
    selectedItems: currentSelectedItems,
    onChange: onItemsChange,
    inputProps: {
      onBlur: function onBlur(ev) {
        return console.log('onBlur called');
      },
      onFocus: function onFocus(ev) {
        return console.log('onFocus called');
      }
    },
    componentRef: picker,
    resolveDelay: 300,
    disabled: isPickerDisabled
  }), /*#__PURE__*/React.createElement("label", null, " Click to Add a person "), controlledItems.map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index
    }, /*#__PURE__*/React.createElement(_Button.DefaultButton, {
      styles: defaultButtonStyles,
      // tslint:disable-next-line:jsx-no-lambda
      onClick: function onClick() {
        return setCurrentSelectedItems(currentSelectedItems.concat([item]));
      }
    }, /*#__PURE__*/React.createElement(_Persona.Persona, (0, _tslib.__assign)({}, item))));
  })), /*#__PURE__*/React.createElement(_Checkbox.Checkbox, {
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

exports.PeoplePickerControlledExample = PeoplePickerControlledExample;

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