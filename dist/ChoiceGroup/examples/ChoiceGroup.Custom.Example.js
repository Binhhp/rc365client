import * as React from 'react';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
export var ChoiceGroupCustomExample = function () {
    return React.createElement(ChoiceGroup, { defaultSelectedKey: "B", options: options, label: "Pick one" });
};
var optionRootClass = mergeStyles({ display: 'flex', alignItems: 'baseline' });
var dropdownStyles = {
    root: { marginBottom: 0, marginLeft: 5 },
};
var dropdownOptions = [
    { key: 'A', text: '5 seconds' },
    { key: 'B', text: '10 seconds' },
    { key: 'C', text: '20 seconds' },
];
var options = [
    {
        key: 'A',
        text: 'Mark displayed items as read after',
        ariaLabel: 'Mark displayed items as read after - Press tab for further action',
        onRenderField: function (props, render) {
            return (React.createElement("div", { className: optionRootClass },
                render(props),
                React.createElement(Dropdown, { defaultSelectedKey: "A", styles: dropdownStyles, options: dropdownOptions, 
                    // tslint:disable-next-line:deprecation
                    disabled: props ? !props.checked : false, ariaLabel: "Select a time span" })));
        },
    },
    { key: 'B', text: 'Option B', styles: { root: { border: '1px solid green' } } },
    { key: 'C', text: 'Option C', disabled: true },
    { key: 'D', text: 'Option D' },
];
//# sourceMappingURL=ChoiceGroup.Custom.Example.js.map