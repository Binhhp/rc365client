import * as React from 'react';
import { DefaultPalette, Stack } from 'office-ui-fabric-react';
// Styles definition
var stackStyles = {
    root: {
        background: DefaultPalette.themeTertiary,
    },
};
var stackItemStyles = {
    root: {
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        padding: 5,
    },
};
var itemAlignmentsStackStyles = {
    root: {
        background: DefaultPalette.themeTertiary,
        height: 100,
    },
};
// Tokens definition
var containerStackTokens = { childrenGap: 5 };
var horizontalGapStackTokens = {
    childrenGap: 10,
    padding: 10,
};
var itemAlignmentsStackTokens = {
    childrenGap: 5,
    padding: 10,
};
var clickableStackTokens = {
    padding: 10,
};
export var HorizontalStackBasicExample = function () {
    return (React.createElement(Stack, { tokens: containerStackTokens },
        React.createElement("span", null, "Default horizontal stack"),
        React.createElement(Stack, { horizontal: true, disableShrink: true, styles: stackStyles },
            React.createElement("span", null, "Item One"),
            React.createElement("span", null, "Item Two"),
            React.createElement("span", null, "Item Three")),
        React.createElement("span", null, "Ordered stack"),
        React.createElement(Stack, { horizontal: true, disableShrink: true, styles: stackStyles },
            React.createElement(Stack.Item, { order: 2 },
                React.createElement("span", null, "Item One")),
            React.createElement(Stack.Item, { order: 3 },
                React.createElement("span", null, "Item Two")),
            React.createElement(Stack.Item, { order: 1 },
                React.createElement("span", null, "Item Three"))),
        React.createElement("span", null, "Horizontal gap between items"),
        React.createElement(Stack, { horizontal: true, disableShrink: true, styles: stackStyles, tokens: horizontalGapStackTokens },
            React.createElement("span", null, "Item One"),
            React.createElement("span", null, "Item Two"),
            React.createElement("span", null, "Item Three")),
        React.createElement("span", null, "Item alignments"),
        React.createElement(Stack, { horizontal: true, disableShrink: true, styles: itemAlignmentsStackStyles, tokens: itemAlignmentsStackTokens },
            React.createElement(Stack.Item, { align: "auto", styles: stackItemStyles },
                React.createElement("span", null, "Auto-aligned item")),
            React.createElement(Stack.Item, { align: "stretch", styles: stackItemStyles },
                React.createElement("span", null, "Stretch-aligned item")),
            React.createElement(Stack.Item, { align: "baseline", styles: stackItemStyles },
                React.createElement("span", null, "Baseline-aligned item")),
            React.createElement(Stack.Item, { align: "start", styles: stackItemStyles },
                React.createElement("span", null, "Start-aligned item")),
            React.createElement(Stack.Item, { align: "center", styles: stackItemStyles },
                React.createElement("span", null, "Center-aligned item")),
            React.createElement(Stack.Item, { align: "end", styles: stackItemStyles },
                React.createElement("span", null, "End-aligned item"))),
        React.createElement("span", null, "Clickable stack"),
        React.createElement(Stack, { horizontal: true, disableShrink: true, onClick: _onClick, styles: stackStyles, tokens: clickableStackTokens },
            React.createElement("span", null, "Click inside this box"))));
};
function _onClick() {
    alert('Clicked Stack');
}
//# sourceMappingURL=Stack.Horizontal.Basic.Example.js.map