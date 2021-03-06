import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
// Non-mutating styles definition
var stackItemStyles = {
    root: {
        alignItems: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
    },
};
var containerStyles = {
    height: 200,
};
var nonShrinkingStackItemStyles = {
    root: {
        alignItems: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        overflow: 'hidden',
    },
};
// Tokens definition
var outerStackTokens = { childrenGap: 5 };
var innerStackTokens = {
    childrenGap: 5,
    padding: 10,
};
export var VerticalStackShrinkExample = function () {
    var _a = React.useState(100), stackHeight = _a[0], setStackHeight = _a[1];
    // Mutating styles definition
    var stackStyles = {
        root: {
            background: DefaultPalette.themeTertiary,
            height: stackHeight + "%",
            overflow: 'hidden',
        },
    };
    return (React.createElement(Stack, { tokens: outerStackTokens },
        React.createElement(Slider, { label: "Change the stack height to see how child items shrink:", min: 1, max: 100, step: 1, defaultValue: 100, showValue: true, onChange: setStackHeight }),
        React.createElement("div", { className: mergeStyles(containerStyles) },
            React.createElement(Stack, { styles: stackStyles, tokens: innerStackTokens },
                React.createElement(Stack.Item, { grow: true, styles: stackItemStyles }, "I shrink"),
                React.createElement(Stack.Item, { grow: true, styles: stackItemStyles }, "I shrink"),
                React.createElement(Stack.Item, { grow: true, disableShrink: true, styles: nonShrinkingStackItemStyles }, "I don't shrink"),
                React.createElement(Stack.Item, { grow: true, styles: stackItemStyles }, "I shrink")))));
};
//# sourceMappingURL=Stack.Vertical.Shrink.Example.js.map