import { __assign, __extends } from "tslib";
import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
// Non-mutating styles definition
var itemStyles = {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 50,
};
var VerticalStackWrapAdvancedExampleContent = function (props) {
    var stackWidth = props.stackWidth, containerHeight = props.containerHeight, overflow = props.overflow, horizontalAlignment = props.horizontalAlignment, verticalAlignment = props.verticalAlignment;
    // Mutating styles definition
    var stackStyles = {
        root: {
            background: DefaultPalette.themeTertiary,
            overflow: overflow,
            width: stackWidth + "%",
        },
    };
    var containerStyles = { height: containerHeight };
    return (React.createElement("div", { style: containerStyles },
        React.createElement(Stack, { wrap: true, horizontalAlign: horizontalAlignment, verticalAlign: verticalAlignment, styles: stackStyles, tokens: wrapStackTokens },
            React.createElement("span", { style: itemStyles }, "1"),
            React.createElement("span", { style: itemStyles }, "2"),
            React.createElement("span", { style: itemStyles }, "3"),
            React.createElement("span", { style: itemStyles }, "4"),
            React.createElement("span", { style: itemStyles }, "5"))));
};
// Tokens definition
var sectionStackTokens = { childrenGap: 10 };
var wrapStackTokens = { childrenGap: 20 };
var VerticalStackWrapAdvancedExample = /** @class */ (function (_super) {
    __extends(VerticalStackWrapAdvancedExample, _super);
    function VerticalStackWrapAdvancedExample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            stackWidth: 100,
            containerHeight: 420,
            horizontalAlignment: 'start',
            verticalAlignment: 'start',
            overflow: 'visible',
        };
        _this._horizontalAlignmentOptions = [
            { key: 'start', text: 'Left' },
            { key: 'center', text: 'Center' },
            { key: 'end', text: 'Right' },
        ];
        _this._verticalAlignmentOptions = [
            { key: 'start', text: 'Top' },
            { key: 'center', text: 'Center' },
            { key: 'end', text: 'Bottom' },
            { key: 'space-around', text: 'Space around' },
            { key: 'space-between', text: 'Space between' },
            { key: 'space-evenly', text: 'Space evenly' },
        ];
        _this._overflowOptions = [
            { key: 'visible', text: 'Visible' },
            { key: 'auto', text: 'Auto' },
            { key: 'hidden', text: 'Hidden' },
        ];
        _this._onWidthChange = function (value) {
            _this.setState({ stackWidth: value });
        };
        _this._onHeightChange = function (value) {
            _this.setState({ containerHeight: value });
        };
        _this._onHorizontalAlignChange = function (ev, option) {
            _this.setState({ horizontalAlignment: option.key });
        };
        _this._onVerticalAlignChange = function (ev, option) {
            _this.setState({ verticalAlignment: option.key });
        };
        _this._onOverflowChange = function (ev, option) {
            _this.setState({ overflow: option.key });
        };
        return _this;
    }
    VerticalStackWrapAdvancedExample.prototype.render = function () {
        var _a = this.state, overflow = _a.overflow, horizontalAlignment = _a.horizontalAlignment, verticalAlignment = _a.verticalAlignment;
        return (React.createElement(Stack, { tokens: sectionStackTokens },
            React.createElement(Stack, { horizontal: true },
                React.createElement(Stack.Item, { grow: true },
                    React.createElement(Slider, { label: "Stack height:", min: 1, max: 420, step: 1, defaultValue: 420, showValue: true, onChange: this._onHeightChange })),
                React.createElement(Stack.Item, { grow: true },
                    React.createElement(Slider, { label: "Container width:", min: 1, max: 100, step: 1, defaultValue: 100, showValue: true, onChange: this._onWidthChange }))),
            React.createElement(Stack, { horizontal: true, tokens: wrapStackTokens },
                React.createElement(Stack.Item, { grow: true },
                    React.createElement(Dropdown, { selectedKey: horizontalAlignment, placeholder: "Select Horizontal Alignment", label: "Horizontal alignment:", options: this._horizontalAlignmentOptions, onChange: this._onHorizontalAlignChange })),
                React.createElement(Stack.Item, { grow: true },
                    React.createElement(Dropdown, { selectedKey: verticalAlignment, placeholder: "Select Vertical Alignment", label: "Vertical alignment:", options: this._verticalAlignmentOptions, onChange: this._onVerticalAlignChange })),
                React.createElement(Stack.Item, { grow: true },
                    React.createElement(Dropdown, { selectedKey: overflow, placeholder: "Select Overflow", label: "Overflow:", options: this._overflowOptions, onChange: this._onOverflowChange }))),
            React.createElement(VerticalStackWrapAdvancedExampleContent, __assign({}, this.state))));
    };
    return VerticalStackWrapAdvancedExample;
}(React.Component));
export { VerticalStackWrapAdvancedExample };
//# sourceMappingURL=Stack.Vertical.WrapAdvanced.Example.js.map