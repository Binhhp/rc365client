import { __assign } from "tslib";
import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
// Non-mutating styles definition
var textStyles = {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: DefaultPalette.white,
};
var firstStackStyles = {
    root: {
        background: DefaultPalette.neutralTertiary,
    },
};
var firstStackItemStyles = __assign(__assign({}, textStyles), { background: DefaultPalette.themePrimary });
var secondStackStyles = {
    root: {
        background: DefaultPalette.neutralSecondary,
    },
};
var secondStackItemStyles = __assign(__assign({}, textStyles), { background: DefaultPalette.themeDark });
var thirdStackStyles = {
    root: {},
};
var thirdStackItemStyles = __assign(__assign({}, textStyles), { background: DefaultPalette.themeDarker });
// Tokens definition
var sectionStackTokens = { childrenGap: 10 };
var wrapStackTokens = { childrenGap: '30 40' };
var firstStackTokens = { childrenGap: '10 30' };
var secondStackTokens = { childrenGap: '20 50' };
export var HorizontalStackWrapNestedExample = function () {
    var _a = React.useState(100), stackWidth = _a[0], setStackWidth = _a[1];
    // Mutating styles definition
    var containerStackStyles = {
        root: {
            background: DefaultPalette.themeTertiary,
            width: stackWidth + "%",
        },
    };
    return (React.createElement(Stack, { tokens: sectionStackTokens },
        React.createElement(Slider, { label: "Change the stack width to see how child items wrap onto multiple rows:", min: 1, max: 100, step: 1, defaultValue: 100, showValue: true, onChange: setStackWidth }),
        React.createElement(Stack, { horizontal: true, wrap: true, styles: containerStackStyles, tokens: wrapStackTokens },
            React.createElement(Stack, { horizontal: true, wrap: true, styles: firstStackStyles, tokens: firstStackTokens },
                React.createElement("span", { style: firstStackItemStyles }, "1"),
                React.createElement("span", { style: firstStackItemStyles }, "2"),
                React.createElement("span", { style: firstStackItemStyles }, "3"),
                React.createElement("span", { style: firstStackItemStyles }, "4"),
                React.createElement("span", { style: firstStackItemStyles }, "5"),
                React.createElement("span", { style: firstStackItemStyles }, "6"),
                React.createElement("span", { style: firstStackItemStyles }, "7")),
            React.createElement(Stack, { horizontal: true, wrap: true, styles: secondStackStyles, tokens: secondStackTokens },
                React.createElement("span", { style: secondStackItemStyles }, "1"),
                React.createElement("span", { style: secondStackItemStyles }, "2"),
                React.createElement("span", { style: secondStackItemStyles }, "3")),
            React.createElement(Stack, { horizontal: true, wrap: true, styles: thirdStackStyles },
                React.createElement("span", { style: thirdStackItemStyles }, "1"),
                React.createElement("span", { style: thirdStackItemStyles }, "2"),
                React.createElement("span", { style: thirdStackItemStyles }, "3"),
                React.createElement("span", { style: thirdStackItemStyles }, "4"),
                React.createElement("span", { style: thirdStackItemStyles }, "5"),
                React.createElement("span", { style: thirdStackItemStyles }, "6"),
                React.createElement("span", { style: thirdStackItemStyles }, "7"),
                React.createElement("span", { style: thirdStackItemStyles }, "8"),
                React.createElement("span", { style: thirdStackItemStyles }, "9"),
                React.createElement("span", { style: thirdStackItemStyles }, "10")))));
};
//# sourceMappingURL=Stack.Horizontal.WrapNested.Example.js.map