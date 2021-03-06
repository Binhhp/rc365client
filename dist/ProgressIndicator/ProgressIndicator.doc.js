import * as React from 'react';
import { ProgressIndicatorBasicExample } from './examples/ProgressIndicator.Basic.Example';
import { ProgressIndicatorIndeterminateExample } from './examples/ProgressIndicator.Indeterminate.Example';
var ProgressIndicatorBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/examples/ProgressIndicator.Basic.Example.tsx');
var ProgressIndicatorIndeterminateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/examples/ProgressIndicator.Indeterminate.Example.tsx');
export var ProgressIndicatorPageProps = {
    title: 'ProgressIndicator',
    componentName: 'ProgressIndicator',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/ProgressIndicator',
    examples: [
        {
            title: 'Default ProgressIndicator',
            code: ProgressIndicatorBasicExampleCode,
            view: React.createElement(ProgressIndicatorBasicExample, null),
        },
        {
            title: 'Indeterminate ProgressIndicator',
            code: ProgressIndicatorIndeterminateExampleCode,
            view: React.createElement(ProgressIndicatorIndeterminateExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=ProgressIndicator.doc.js.map