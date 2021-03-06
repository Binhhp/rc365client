import * as React from 'react';
import { SearchBoxFullSizeExample } from './examples/SearchBox.FullSize.Example';
import { SearchBoxUnderlinedExample } from './examples/SearchBox.Underlined.Example';
import { SearchBoxDisabledExample } from './examples/SearchBox.Disabled.Example';
import { SearchBoxCustomIconExample } from './examples/SearchBox.CustomIcon.Example';
import { SearchBoxSmallExample } from './examples/SearchBox.Small.Example';
var SearchBoxFullSizeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.FullSize.Example.tsx');
var SearchBoxUnderlinedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Underlined.Example.tsx');
var SearchBoxDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Disabled.Example.tsx');
var SearchBoxCustomIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.CustomIcon.Example.tsx');
var SearchBoxSmallExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Small.Example.tsx');
export var SearchBoxPageProps = {
    title: 'SearchBox',
    componentName: 'SearchBox',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/SearchBox',
    examples: [
        {
            title: 'Default SearchBox',
            code: SearchBoxFullSizeExampleCode,
            view: React.createElement(SearchBoxFullSizeExample, null),
        },
        {
            title: 'Underlined SearchBox',
            code: SearchBoxUnderlinedExampleCode,
            view: React.createElement(SearchBoxUnderlinedExample, null),
        },
        {
            title: 'Disabled SearchBoxes',
            code: SearchBoxDisabledExampleCode,
            view: React.createElement(SearchBoxDisabledExample, null),
        },
        {
            title: 'SearchBox with custom icon',
            code: SearchBoxCustomIconExampleCode,
            view: React.createElement(SearchBoxCustomIconExample, null),
        },
        {
            title: 'SearchBox with fixed width and custom event handling',
            code: SearchBoxSmallExampleCode,
            view: React.createElement(SearchBoxSmallExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxOverview.md'),
    bestPractices: require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxBestPractices.md'),
    dos: require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=SearchBox.doc.js.map