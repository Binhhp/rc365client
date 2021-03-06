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
        alignItems: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'center',
    },
};
// Tokens definition
var stackTokens = {
    childrenGap: 5,
    padding: 10,
};
export var HorizontalStackGrowExample = function () {
    return (React.createElement(Stack, { horizontal: true, styles: stackStyles, tokens: stackTokens },
        React.createElement(Stack.Item, { grow: 3, styles: stackItemStyles }, "Grow is 3"),
        React.createElement(Stack.Item, { grow: 2, styles: stackItemStyles }, "Grow is 2"),
        React.createElement(Stack.Item, { grow: true, styles: stackItemStyles }, "Grow is 1")));
};
//# sourceMappingURL=Stack.Horizontal.Grow.Example.js.map