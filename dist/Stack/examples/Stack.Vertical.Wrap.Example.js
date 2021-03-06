import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
// Non-mutating styles definition
var itemStyles = {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    width: 50,
};
// Tokens definition
var sectionStackTokens = { childrenGap: 10 };
var wrapStackTokens = { childrenGap: 20 };
export var VerticalStackWrapExample = function () {
    var _a = React.useState(420), stackHeight = _a[0], setStackHeight = _a[1];
    // Mutating styles definition
    var stackStyles = {
        root: {
            background: DefaultPalette.themeTertiary,
            height: stackHeight,
        },
    };
    return (React.createElement(Stack, { tokens: sectionStackTokens },
        React.createElement(Slider, { label: "Change the stack height to see how child items wrap onto multiple columns:", min: 1, max: 420, step: 1, defaultValue: 420, showValue: true, onChange: setStackHeight }),
        React.createElement(Stack, { wrap: true, styles: stackStyles, tokens: wrapStackTokens },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3"),
            React.createElement("span", { style: itemStyles }, "4"),
            React.createElement("span", { style: itemStyles }, "5"),
            React.createElement("span", { style: itemStyles }, "6"))));
};
//# sourceMappingURL=Stack.Vertical.Wrap.Example.js.map