import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
// Styles definition
var stackStyles = {
    root: {
        background: DefaultPalette.themeTertiary,
        height: 250,
    },
};
var itemStyles = {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 50,
};
// Tokens definition
var sectionStackTokens = { childrenGap: 10 };
var headingStackTokens = { childrenGap: 30 };
export var VerticalStackVerticalAlignExample = function () {
    return (React.createElement(Stack, { tokens: sectionStackTokens },
        React.createElement(Stack, { horizontal: true, disableShrink: true, horizontalAlign: "space-between", tokens: headingStackTokens },
            React.createElement(Stack, { grow: true },
                React.createElement("span", null, "Top-aligned"),
                React.createElement(Stack, { verticalAlign: "start", styles: stackStyles },
                    React.createElement("span", { style: itemStyles }, "1"),
                    React.createElement("span", { style: itemStyles }, "2"),
                    React.createElement("span", { style: itemStyles }, "3"))),
            React.createElement(Stack, { grow: true },
                React.createElement("span", null, "Vertically centered"),
                React.createElement(Stack, { verticalAlign: "center", styles: stackStyles },
                    React.createElement("span", { style: itemStyles }, "1"),
                    React.createElement("span", { style: itemStyles }, "2"),
                    React.createElement("span", { style: itemStyles }, "3"))),
            React.createElement(Stack, { grow: true },
                React.createElement("span", null, "Bottom-aligned"),
                React.createElement(Stack, { verticalAlign: "end", styles: stackStyles },
                    React.createElement("span", { style: itemStyles }, "1"),
                    React.createElement("span", { style: itemStyles }, "2"),
                    React.createElement("span", { style: itemStyles }, "3")))),
        React.createElement(Stack, { horizontal: true, disableShrink: true, horizontalAlign: "space-between", tokens: headingStackTokens },
            React.createElement(Stack, { grow: true },
                React.createElement("span", null, "Vertical space around items"),
                React.createElement(Stack, { verticalAlign: "space-around", styles: stackStyles },
                    React.createElement("span", { style: itemStyles }, "1"),
                    React.createElement("span", { style: itemStyles }, "2"),
                    React.createElement("span", { style: itemStyles }, "3"))),
            React.createElement(Stack, { grow: true },
                React.createElement("span", null, "Vertical space between items"),
                React.createElement(Stack, { verticalAlign: "space-between", styles: stackStyles },
                    React.createElement("span", { style: itemStyles }, "1"),
                    React.createElement("span", { style: itemStyles }, "2"),
                    React.createElement("span", { style: itemStyles }, "3"))),
            React.createElement(Stack, { grow: true },
                React.createElement("span", null, "Items vertically evenly spaced"),
                React.createElement(Stack, { verticalAlign: "space-evenly", styles: stackStyles },
                    React.createElement("span", { style: itemStyles }, "1"),
                    React.createElement("span", { style: itemStyles }, "2"),
                    React.createElement("span", { style: itemStyles }, "3"))))));
};
//# sourceMappingURL=Stack.Vertical.VerticalAlign.Example.js.map