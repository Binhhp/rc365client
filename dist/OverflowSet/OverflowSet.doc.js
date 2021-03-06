import * as React from 'react';
import { OverflowSetCustomExample } from './examples/OverflowSet.Custom.Example';
import { OverflowSetBasicExample } from './examples/OverflowSet.Basic.Example';
import { OverflowSetVerticalExample } from './examples/OverflowSet.Vertical.Example';
import { OverflowSetBasicReversedExample } from './examples/OverflowSet.BasicReversed.Example';
var OverflowSetCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Custom.Example.tsx');
var OverflowSetBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Basic.Example.tsx');
var OverflowSetVerticalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Vertical.Example.tsx');
var OverflowSetBasicReversedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.BasicReversed.Example.tsx');
export var OverflowSetPageProps = {
    title: 'OverflowSet',
    componentName: 'OverflowSet',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/OverflowSet',
    examples: [
        {
            title: 'OverflowSet Basic Example',
            code: OverflowSetBasicExampleCode,
            view: React.createElement(OverflowSetBasicExample, null),
        },
        {
            title: 'OverflowSet Vertical Example',
            code: OverflowSetVerticalExampleCode,
            view: React.createElement(OverflowSetVerticalExample, null),
        },
        {
            title: 'OverflowSet Custom Example',
            code: OverflowSetCustomExampleCode,
            view: React.createElement(OverflowSetCustomExample, null),
        },
        {
            title: 'OverflowSet Reversed Example',
            code: OverflowSetBasicReversedExampleCode,
            view: React.createElement(OverflowSetBasicReversedExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/docs/OverflowSetOverview.md'),
    bestPractices: '',
    dos: '',
    donts: '',
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=OverflowSet.doc.js.map