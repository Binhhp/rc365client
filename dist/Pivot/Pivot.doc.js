import * as React from 'react';
import { PivotBasicExample } from './examples/Pivot.Basic.Example';
import { PivotIconCountExample } from './examples/Pivot.IconCount.Example';
import { PivotLargeExample } from './examples/Pivot.Large.Example';
import { PivotTabsExample } from './examples/Pivot.Tabs.Example';
import { PivotTabsLargeExample } from './examples/Pivot.TabsLarge.Example';
import { PivotOnChangeExample } from './examples/Pivot.OnChange.Example';
import { PivotRemoveExample } from './examples/Pivot.Remove.Example';
import { PivotOverrideExample } from './examples/Pivot.Override.Example';
import { PivotSeparateExample } from './examples/Pivot.Separate.Example';
var PivotRemoveExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Remove.Example.tsx');
var PivotBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Basic.Example.tsx');
var PivotLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Large.Example.tsx');
var PivotTabsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Tabs.Example.tsx');
var PivotTabsLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.TabsLarge.Example.tsx');
var PivotOnChangeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.OnChange.Example.tsx');
var PivotIconCountExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.IconCount.Example.tsx');
var PivotOverrideExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Override.Example.tsx');
var PivotSeparateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Separate.Example.tsx');
export var PivotPageProps = {
    title: 'Pivot',
    componentName: 'Pivot',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Pivot',
    examples: [
        {
            title: 'Default Pivot',
            code: PivotBasicExampleCode,
            view: React.createElement(PivotBasicExample, null),
        },
        {
            title: 'Count and Icon',
            code: PivotIconCountExampleCode,
            view: React.createElement(PivotIconCountExample, null),
        },
        {
            title: 'Large link size',
            code: PivotLargeExampleCode,
            view: React.createElement(PivotLargeExample, null),
        },
        {
            title: 'Links of tab style',
            code: PivotTabsExampleCode,
            view: React.createElement(PivotTabsExample, null),
        },
        {
            title: 'Links of large tab style',
            code: PivotTabsLargeExampleCode,
            view: React.createElement(PivotTabsLargeExample, null),
        },
        {
            title: 'Trigger onchange event',
            code: PivotOnChangeExampleCode,
            view: React.createElement(PivotOnChangeExample, null),
        },
        {
            title: 'Show/Hide pivot item',
            code: PivotRemoveExampleCode,
            view: React.createElement(PivotRemoveExample, null),
        },
        {
            title: 'Override selected item',
            code: PivotOverrideExampleCode,
            view: React.createElement(PivotOverrideExample, null),
        },
        {
            title: 'Render content separately',
            code: PivotSeparateExampleCode,
            view: React.createElement(PivotSeparateExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativePropsForComponentName: 'PivotItem',
    allowNativeProps: true,
};
//# sourceMappingURL=Pivot.doc.js.map