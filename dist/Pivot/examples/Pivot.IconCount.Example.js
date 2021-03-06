import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';
var labelStyles = {
    root: { marginTop: 10 },
};
export var PivotIconCountExample = function () {
    return (React.createElement("div", null,
        React.createElement(Pivot, { "aria-label": "Count and Icon Pivot Example" },
            React.createElement(PivotItem, { headerText: "My Files", itemCount: 42, itemIcon: "Emoji2" },
                React.createElement(Label, { styles: labelStyles }, "Pivot #1")),
            React.createElement(PivotItem, { itemCount: 23, itemIcon: "Recent" },
                React.createElement(Label, { styles: labelStyles }, "Pivot #2")),
            React.createElement(PivotItem, { headerText: "Placeholder", itemIcon: "Globe" },
                React.createElement(Label, { styles: labelStyles }, "Pivot #3")),
            React.createElement(PivotItem, { headerText: "Shared with me", itemIcon: "Ringer", itemCount: 1 },
                React.createElement(Label, { styles: labelStyles }, "Pivot #4")),
            React.createElement(PivotItem, { headerText: "Customized Rendering", itemIcon: "Globe", itemCount: 10, onRenderItemLink: _customRenderer },
                React.createElement(Label, { styles: labelStyles }, "Customized Rendering")))));
};
function _customRenderer(link, defaultRenderer) {
    return (React.createElement("span", null,
        defaultRenderer(link),
        React.createElement(Icon, { iconName: "Airplane", style: { color: 'red' } })));
}
//# sourceMappingURL=Pivot.IconCount.Example.js.map