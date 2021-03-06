import { __assign, __spreadArrays } from "tslib";
import * as React from 'react';
import { mergeStyles, ResizeGroupDirection, CommandBarButton, ResizeGroup, OverflowSet, DirectionalHint, createArray, } from 'office-ui-fabric-react';
var generateData = function (count, cachingEnabled, checked) {
    var icons = ['Add', 'Share', 'Upload'];
    var cacheKey = '';
    var dataItems = createArray(count, function (index) {
        cacheKey = cacheKey + ("item" + index);
        return {
            key: "item" + index,
            name: "Item " + index,
            icon: icons[index % icons.length],
            checked: checked,
        };
    });
    var result = {
        primary: dataItems,
        overflow: [],
    };
    if (cachingEnabled) {
        result = __assign(__assign({}, result), { cacheKey: cacheKey });
    }
    return result;
};
var buttonStyles = {
    root: {
        paddingBottom: 10,
        paddingTop: 10,
        width: 100,
    },
};
var exampleHeight = '40vh';
var resizeRootClassName = mergeStyles({ height: exampleHeight });
var dataToRender = generateData(20, false, false);
var onRenderItem = function (item) { return (React.createElement(CommandBarButton, { role: "menuitem", text: item.name, iconProps: { iconName: item.icon }, onClick: item.onClick, checked: item.checked, styles: buttonStyles })); };
var onRenderOverflowButton = function (overflowItems) { return (React.createElement(CommandBarButton, { role: "menuitem", styles: buttonStyles, menuIconProps: { iconName: 'ChevronRight' }, menuProps: { items: overflowItems, directionalHint: DirectionalHint.rightCenter } })); };
var onRenderData = function (data) { return (React.createElement(OverflowSet, { role: "menubar", vertical: true, items: data.primary, overflowItems: data.overflow.length ? data.overflow : null, onRenderItem: onRenderItem, onRenderOverflowButton: onRenderOverflowButton })); };
var onReduceData = function (currentData) {
    if (currentData.primary.length === 0) {
        return undefined;
    }
    var overflow = __spreadArrays(currentData.primary.slice(-1), currentData.overflow);
    var primary = currentData.primary.slice(0, -1);
    return { primary: primary, overflow: overflow, undefined: undefined };
};
export var ResizeGroupVerticalOverflowSetExample = function () { return (React.createElement(ResizeGroup, { className: resizeRootClassName, role: "tabpanel", "aria-label": "Vertical Resize Group with an Overflow Set", direction: ResizeGroupDirection.vertical, data: dataToRender, onReduceData: onReduceData, onRenderData: onRenderData })); };
//# sourceMappingURL=ResizeGroup.VerticalOverflowSet.Example.js.map