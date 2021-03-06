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
var stackItemStyles = {
    root: {
        alignItems: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        display: 'flex',
        justifyContent: 'center',
    },
};
// Tokens definition
var outerStackTokens = { childrenGap: 5 };
var innerStackTokens = {
    childrenGap: 5,
    padding: 10,
};
export var VerticalStackGrowExample = function () {
    return (React.createElement(Stack, { tokens: outerStackTokens },
        React.createElement(Stack, { styles: stackStyles, tokens: innerStackTokens },
            React.createElement(Stack.Item, { grow: 3, styles: stackItemStyles }, "Grow is 3"),
            React.createElement(Stack.Item, { grow: 2, styles: stackItemStyles }, "Grow is 2"),
            React.createElement(Stack.Item, { grow: true, styles: stackItemStyles }, "Grow is 1"))));
};
//# sourceMappingURL=Stack.Vertical.Grow.Example.js.map