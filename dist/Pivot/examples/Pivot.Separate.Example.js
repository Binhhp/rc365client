import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
var getTabId = function (itemKey) {
    return "ShapeColorPivot_" + itemKey;
};
export var PivotSeparateExample = function () {
    var _a = React.useState('rectangleRed'), selectedKey = _a[0], setSelectedKey = _a[1];
    var handleLinkClick = function (item) {
        setSelectedKey(item.props.itemKey);
    };
    return (React.createElement("div", null,
        React.createElement("div", { "aria-labelledby": getTabId(selectedKey), role: "tabpanel", style: {
                float: 'left',
                width: 100,
                height: selectedKey === 'squareRed' ? 100 : 200,
                background: selectedKey === 'rectangleGreen' ? 'green' : 'red',
            } }),
        React.createElement(Pivot, { "aria-label": "Separately Rendered Content Pivot Example", selectedKey: selectedKey, onLinkClick: handleLinkClick, headersOnly: true, getTabId: getTabId },
            React.createElement(PivotItem, { headerText: "Rectangle red", itemKey: "rectangleRed" }),
            React.createElement(PivotItem, { headerText: "Square red", itemKey: "squareRed" }),
            React.createElement(PivotItem, { headerText: "Rectangle green", itemKey: "rectangleGreen" }))));
};
//# sourceMappingURL=Pivot.Separate.Example.js.map