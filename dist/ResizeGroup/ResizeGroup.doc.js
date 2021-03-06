import * as React from 'react';
import { ResizeGroupOverflowSetExample } from './examples/ResizeGroup.OverflowSet.Example';
import { FlexBoxResizeGroupExample } from './examples/ResizeGroup.FlexBox.Example';
import { ResizeGroupVerticalOverflowSetExample } from './examples/ResizeGroup.VerticalOverflowSet.Example';
var ResizeGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.OverflowSet.Example.tsx');
var ResizeGroupVerticalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.VerticalOverflowSet.Example.tsx');
var ResizeGroupFlexBoxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.FlexBox.Example.tsx');
export var ResizeGroupPageProps = {
    title: 'ResizeGroup',
    componentName: 'ResizeGroup',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/ResizeGroup',
    examples: [
        {
            title: 'Use ResizeGroup to move commands into an overflow menu',
            code: ResizeGroupBasicExampleCode,
            view: React.createElement(ResizeGroupOverflowSetExample, null),
        },
        {
            title: 'Use a vertical ResizeGroup to move commands into an overflow menu',
            code: ResizeGroupVerticalExampleCode,
            view: React.createElement(ResizeGroupVerticalOverflowSetExample, null),
            isScrollable: false,
        },
        {
            title: 'Use ResizeGroup to prevent two groups of items from overlapping',
            code: ResizeGroupFlexBoxExampleCode,
            view: React.createElement(FlexBoxResizeGroupExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=ResizeGroup.doc.js.map