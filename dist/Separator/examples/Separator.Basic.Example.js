import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
var stackTokens = { childrenGap: 12 };
var HorizontalSeparatorStack = function (props) { return (React.createElement(React.Fragment, null, React.Children.map(props.children, function (child) {
    return React.createElement(Stack, { tokens: stackTokens }, child);
}))); };
var VerticalSeparatorStack = function (props) { return (React.createElement(Stack, { horizontal: true, horizontalAlign: "space-evenly" }, React.Children.map(props.children, function (child) {
    return (React.createElement(Stack, { horizontalAlign: "center", tokens: stackTokens }, child));
}))); };
var verticalStyle = mergeStyles({
    height: '200px',
});
var content = 'Today';
export var SeparatorBasicExample = function () { return (React.createElement(Stack, { tokens: stackTokens },
    React.createElement(HorizontalSeparatorStack, null,
        React.createElement(React.Fragment, null,
            React.createElement(Text, null, "Horizontal center aligned"),
            React.createElement(Separator, null, content)),
        React.createElement(React.Fragment, null,
            React.createElement(Text, null, "Horizontal start aligned"),
            React.createElement(Separator, { alignContent: "start" }, content)),
        React.createElement(React.Fragment, null,
            React.createElement(Text, null, "Horizontal end aligned"),
            React.createElement(Separator, { alignContent: "end" }, content)),
        React.createElement(React.Fragment, null,
            React.createElement(Text, null, "Empty horizontal"),
            React.createElement(Separator, null))),
    React.createElement(VerticalSeparatorStack, null,
        React.createElement(React.Fragment, null,
            React.createElement(Text, null, "Vertical center aligned"),
            React.createElement(Stack.Item, { className: verticalStyle },
                React.createElement(Separator, { vertical: true }, content))),
        React.createElement(React.Fragment, null,
            React.createElement(Text, null, "Vertical start aligned"),
            React.createElement(Stack.Item, { className: verticalStyle },
                React.createElement(Separator, { vertical: true, alignContent: "start" }, content))),
        React.createElement(React.Fragment, null,
            React.createElement(Text, null, "Vertical end aligned"),
            React.createElement(Stack.Item, { className: verticalStyle },
                React.createElement(Separator, { vertical: true }, content))),
        React.createElement(React.Fragment, null,
            React.createElement(Text, null, "Empty vertical"),
            React.createElement(Stack.Item, { className: verticalStyle },
                React.createElement(Separator, { vertical: true })))))); };
//# sourceMappingURL=Separator.Basic.Example.js.map