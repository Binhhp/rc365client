import * as React from 'react';
import { DefaultPalette, Stack } from 'office-ui-fabric-react';
// Styles definition
var stackStyles = {
    root: {
        background: DefaultPalette.themeTertiary,
        height: 100,
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
export var HorizontalStackVerticalAlignExample = function () {
    return (React.createElement(Stack, { tokens: stackTokens },
        React.createElement("span", null, "Top-aligned"),
        React.createElement(Stack, { horizontal: true, verticalAlign: "start", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3")),
        React.createElement("span", null, "Vertically centered"),
        React.createElement(Stack, { horizontal: true, verticalAlign: "center", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3")),
        React.createElement("span", null, "Bottom-aligned"),
        React.createElement(Stack, { horizontal: true, verticalAlign: "end", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3"))));
};
//# sourceMappingURL=Stack.Horizontal.VerticalAlign.Example.js.map