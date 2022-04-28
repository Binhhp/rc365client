"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeoplePickerPageProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _PeoplePickerNormal = require("./examples/PeoplePicker.Normal.Example");

var _PeoplePickerCompact = require("./examples/PeoplePicker.Compact.Example");

var _PeoplePickerList = require("./examples/PeoplePicker.List.Example");

var _PeoplePickerPreselectedItems = require("./examples/PeoplePicker.PreselectedItems.Example");

var _PeoplePickerLimitedSearch = require("./examples/PeoplePicker.LimitedSearch.Example");

var _PeoplePickerProcessSelection = require("./examples/PeoplePicker.ProcessSelection.Example");

var _PeoplePickerControlled = require("./examples/PeoplePicker.Controlled.Example");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var PeoplePickerNormalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Normal.Example.tsx');

var PeoplePickerCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Compact.Example.tsx');

var PeoplePickerListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.List.Example.tsx');

var PeoplePickerPreselectedItemsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.PreselectedItems.Example.tsx');

var PeoplePickerLimitedSearchExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.LimitedSearch.Example.tsx');

var PeoplePickerProcessSelectionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.ProcessSelection.Example.tsx');

var PeoplePickerControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Controlled.Example.tsx');

var PeoplePickerPageProps = {
  title: 'PeoplePicker',
  componentName: 'PeoplePicker',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/PeoplePicker',
  examples: [{
    title: 'Normal People Picker',
    code: PeoplePickerNormalExampleCode,
    view: /*#__PURE__*/React.createElement(_PeoplePickerNormal.PeoplePickerNormalExample, null)
  }, {
    title: 'Compact People Picker',
    code: PeoplePickerCompactExampleCode,
    view: /*#__PURE__*/React.createElement(_PeoplePickerCompact.PeoplePickerCompactExample, null)
  }, {
    title: 'List People Picker',
    code: PeoplePickerListExampleCode,
    view: /*#__PURE__*/React.createElement(_PeoplePickerList.PeoplePickerListExample, null)
  }, {
    title: 'People Picker with Preselected Items',
    code: PeoplePickerPreselectedItemsExampleCode,
    view: /*#__PURE__*/React.createElement(_PeoplePickerPreselectedItems.PeoplePickerPreselectedItemsExample, null)
  }, {
    title: 'People Picker with Limited Search',
    code: PeoplePickerLimitedSearchExampleCode,
    view: /*#__PURE__*/React.createElement(_PeoplePickerLimitedSearch.PeoplePickerLimitedSearchExample, null)
  }, {
    title: 'People Picker with Processed Selection',
    code: PeoplePickerProcessSelectionExampleCode,
    view: /*#__PURE__*/React.createElement(_PeoplePickerProcessSelection.PeoplePickerProcessSelectionExample, null)
  }, {
    title: 'Controlled People Picker',
    code: PeoplePickerControlledExampleCode,
    view: /*#__PURE__*/React.createElement(_PeoplePickerControlled.PeoplePickerControlledExample, null)
  }],
  propertiesTablesSources: [require('!raw-loader!office-ui-fabric-react/src/components/pickers/BasePicker.types.ts')],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerOverview.md'),
  bestPractices: require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerBestPractices.md'),
  dos: require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerDos.md'),
  donts: require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
exports.PeoplePickerPageProps = PeoplePickerPageProps;