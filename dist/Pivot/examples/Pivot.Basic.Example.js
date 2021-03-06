import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
var labelStyles = {
    root: { marginTop: 10 },
};
export var PivotBasicExample = function () {
    return (React.createElement(Pivot, { "aria-label": "Basic Pivot Example" },
        React.createElement(PivotItem, { headerText: "My Files", headerButtonProps: {
                'data-order': 1,
                'data-title': 'My Files Title',
            } },
            React.createElement(Label, { styles: labelStyles }, "Pivot #1")),
        React.createElement(PivotItem, { headerText: "Recent" },
            React.createElement(Label, { styles: labelStyles }, "Pivot #2")),
        React.createElement(PivotItem, { headerText: "Shared with me" },
            React.createElement(Label, { styles: labelStyles }, "Pivot #3"))));
};
//# sourceMappingURL=Pivot.Basic.Example.js.map