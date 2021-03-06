import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
export var PivotOverrideExample = function () {
    var _a = React.useState(0), selectedKey = _a[0], setSelectedKey = _a[1];
    var DefaultButtonOnClick = function () {
        setSelectedKey((selectedKey + 1) % 3);
    };
    return (React.createElement("div", null,
        React.createElement(Pivot, { "aria-label": "Override Selected Item Pivot Example", selectedKey: String(selectedKey) },
            React.createElement(PivotItem, { headerText: "My Files", itemKey: "0" },
                React.createElement(Label, null, "Pivot #1")),
            React.createElement(PivotItem, { headerText: "Recent", itemKey: "1" },
                React.createElement(Label, null, "Pivot #2")),
            React.createElement(PivotItem, { headerText: "Shared with me", itemKey: "2" },
                React.createElement(Label, null, "Pivot #3"))),
        React.createElement(DefaultButton, { onClick: DefaultButtonOnClick }, "Select next item")));
};
//# sourceMappingURL=Pivot.Override.Example.js.map