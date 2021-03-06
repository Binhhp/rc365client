import * as React from 'react';
import { DefaultPalette, Stack } from 'office-ui-fabric-react';
// Styles definition
var stackStyles = {
    root: {
        background: DefaultPalette.themeTertiary,
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
var stackTokens = { childrenGap: 5 };
export var HorizontalStackHorizontalAlignExample = function () {
    return (React.createElement(Stack, { tokens: stackTokens },
        React.createElement("span", null, "Left-aligned"),
        React.createElement(Stack, { horizontal: true, horizontalAlign: "start", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3")),
        React.createElement("span", null, "Horizontally centered"),
        React.createElement(Stack, { horizontal: true, horizontalAlign: "center", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3")),
        React.createElement("span", null, "Right-aligned"),
        React.createElement(Stack, { horizontal: true, horizontalAlign: "end", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3")),
        React.createElement("span", null, "Horizontal space around items"),
        React.createElement(Stack, { horizontal: true, horizontalAlign: "space-around", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3")),
        React.createElement("span", null, "Horizontal space between items"),
        React.createElement(Stack, { horizontal: true, horizontalAlign: "space-between", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3")),
        React.createElement("span", null, "Items horizontally evenly spaced"),
        React.createElement(Stack, { horizontal: true, horizontalAlign: "space-evenly", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3"))));
};
//# sourceMappingURL=Stack.Horizontal.HorizontalAlign.Example.js.map