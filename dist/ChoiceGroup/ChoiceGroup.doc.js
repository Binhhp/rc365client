import * as React from 'react';
import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';
import { ChoiceGroupControlledExample } from './examples/ChoiceGroup.Controlled.Example';
import { ChoiceGroupLabelExample } from './examples/ChoiceGroup.Label.Example';
import { ChoiceGroupCustomExample } from './examples/ChoiceGroup.Custom.Example';
import { ChoiceGroupImageExample } from './examples/ChoiceGroup.Image.Example';
import { ChoiceGroupIconExample } from './examples/ChoiceGroup.Icon.Example';
var ChoiceGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Basic.Example.tsx');
var ChoiceGroupControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Controlled.Example.tsx');
var ChoiceGroupLabelExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Label.Example.tsx');
var ChoiceGroupCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Custom.Example.tsx');
var ChoiceGroupImageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Image.Example.tsx');
var ChoiceGroupIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Icon.Example.tsx');
export var ChoiceGroupPageProps = {
    title: 'ChoiceGroup',
    componentName: 'ChoiceGroup',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/ChoiceGroup',
    examples: [
        {
            title: 'Basic ChoiceGroup',
            code: ChoiceGroupBasicExampleCode,
            view: React.createElement(ChoiceGroupBasicExample, null),
        },
        {
            title: 'Controlled ChoiceGroup',
            code: ChoiceGroupControlledExampleCode,
            view: React.createElement(ChoiceGroupControlledExample, null),
        },
        {
            title: 'ChoiceGroup with images',
            code: ChoiceGroupImageExampleCode,
            view: React.createElement(ChoiceGroupImageExample, null),
        },
        {
            title: 'ChoiceGroup with icons',
            code: ChoiceGroupIconExampleCode,
            view: React.createElement(ChoiceGroupIconExample, null),
        },
        {
            title: 'ChoiceGroup with a custom label',
            code: ChoiceGroupLabelExampleCode,
            view: React.createElement(ChoiceGroupLabelExample, null),
        },
        {
            title: 'ChoiceGroup with custom option rendering',
            code: ChoiceGroupCustomExampleCode,
            view: React.createElement(ChoiceGroupCustomExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
    nativePropsElement: 'input',
};
//# sourceMappingURL=ChoiceGroup.doc.js.map