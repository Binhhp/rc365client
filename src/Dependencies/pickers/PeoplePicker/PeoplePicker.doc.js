import * as React from 'react';
import { PeoplePickerNormalExample } from './examples/PeoplePicker.Normal.Example';
import { PeoplePickerCompactExample } from './examples/PeoplePicker.Compact.Example';
import { PeoplePickerListExample } from './examples/PeoplePicker.List.Example';
import { PeoplePickerPreselectedItemsExample } from './examples/PeoplePicker.PreselectedItems.Example';
import { PeoplePickerLimitedSearchExample } from './examples/PeoplePicker.LimitedSearch.Example';
import { PeoplePickerProcessSelectionExample } from './examples/PeoplePicker.ProcessSelection.Example';
import { PeoplePickerControlledExample } from './examples/PeoplePicker.Controlled.Example';
var PeoplePickerNormalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Normal.Example.tsx');
var PeoplePickerCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Compact.Example.tsx');
var PeoplePickerListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.List.Example.tsx');
var PeoplePickerPreselectedItemsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.PreselectedItems.Example.tsx');
var PeoplePickerLimitedSearchExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.LimitedSearch.Example.tsx');
var PeoplePickerProcessSelectionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.ProcessSelection.Example.tsx');
var PeoplePickerControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Controlled.Example.tsx');
export var PeoplePickerPageProps = {
    title: 'PeoplePicker',
    componentName: 'PeoplePicker',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/PeoplePicker',
    examples: [
        {
            title: 'Normal People Picker',
            code: PeoplePickerNormalExampleCode,
            view: React.createElement(PeoplePickerNormalExample, null),
        },
        {
            title: 'Compact People Picker',
            code: PeoplePickerCompactExampleCode,
            view: React.createElement(PeoplePickerCompactExample, null),
        },
        {
            title: 'List People Picker',
            code: PeoplePickerListExampleCode,
            view: React.createElement(PeoplePickerListExample, null),
        },
        {
            title: 'People Picker with Preselected Items',
            code: PeoplePickerPreselectedItemsExampleCode,
            view: React.createElement(PeoplePickerPreselectedItemsExample, null),
        },
        {
            title: 'People Picker with Limited Search',
            code: PeoplePickerLimitedSearchExampleCode,
            view: React.createElement(PeoplePickerLimitedSearchExample, null),
        },
        {
            title: 'People Picker with Processed Selection',
            code: PeoplePickerProcessSelectionExampleCode,
            view: React.createElement(PeoplePickerProcessSelectionExample, null),
        },
        {
            title: 'Controlled People Picker',
            code: PeoplePickerControlledExampleCode,
            view: React.createElement(PeoplePickerControlledExample, null),
        },
    ],
    propertiesTablesSources: [
        require('!raw-loader!office-ui-fabric-react/src/components/pickers/BasePicker.types.ts'),
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerOverview.md'),
    bestPractices: require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerBestPractices.md'),
    dos: require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=PeoplePicker.doc.js.map