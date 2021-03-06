import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
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
export var VerticalStackHorizontalAlignExample = function () {
    return (React.createElement(Stack, { tokens: stackTokens },
        React.createElement("span", null, "Left-aligned"),
        React.createElement(Stack, { horizontalAlign: "start", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2")),
        React.createElement("span", null, "Horizontally centered"),
        React.createElement(Stack, { horizontalAlign: "center", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2")),
        React.createElement("span", null, "Right-aligned"),
        React.createElement(Stack, { horizontalAlign: "end", styles: stackStyles },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"))));
};
//# sourceMappingURL=Stack.Vertical.HorizontalAlign.Example.js.map