import * as React from 'react';
import { SeparatorBasicExample } from './examples/Separator.Basic.Example';
import { SeparatorThemingExample } from './examples/Separator.Theming.Example';
import { SeparatorIconExample } from './examples/Separator.Icon.Example';
var SeparatorBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Separator/examples/Separator.Basic.Example.tsx');
var SeparatorThemingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Separator/examples/Separator.Theming.Example.tsx');
var SeparatorIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Separator/examples/Separator.Icon.Example.tsx');
export var SeparatorPageProps = {
    title: 'Separator',
    componentName: 'Separator',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Separator',
    examples: [
        {
            title: 'Basic Separator with Text',
            code: SeparatorBasicExampleCode,
            view: React.createElement(SeparatorBasicExample, null),
        },
        {
            title: 'Basic Themed Separator with Text',
            code: SeparatorThemingExampleCode,
            view: React.createElement(SeparatorThemingExample, null),
        },
        {
            title: 'Separator With Icon',
            code: SeparatorIconExampleCode,
            view: React.createElement(SeparatorIconExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Separator/docs/SeparatorOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Separator/docs/SeparatorDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Separator/docs/SeparatorDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Separator.doc.js.map