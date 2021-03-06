import * as React from 'react';
import { PickerCustomResultExample } from './examples/Picker.CustomResult.Example';
import { TagPickerBasicExample } from './examples/TagPicker.Basic.Example';
var TagPickerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/TagPicker.Basic.Example.tsx');
var PickerCustomResultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/Picker.CustomResult.Example.tsx');
export var PickersPageProps = {
    title: 'Pickers',
    componentName: 'Pickers',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Pickers',
    examples: [
        {
            title: 'Tag Picker',
            code: TagPickerExampleCode,
            view: React.createElement(TagPickerBasicExample, null),
        },
        {
            title: 'Custom Picker (Document Picker)',
            code: PickerCustomResultExampleCode,
            view: React.createElement(PickerCustomResultExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/pickers/docs/PickersOverview.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Pickers.doc.js.map