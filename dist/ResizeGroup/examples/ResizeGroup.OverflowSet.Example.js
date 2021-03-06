import { __assign, __spreadArrays } from "tslib";
import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
var styles = mergeStyleSets({
    root: {
        display: 'block',
    },
    settingsGroup: {
        paddingTop: '20px',
    },
    itemCountDropdown: {
        width: '180px',
    },
});
var overflowSetStyles = { root: { height: 40 } };
var dropdownOptions = [
    { key: '20', text: '20' },
    { key: '30', text: '30' },
    { key: '40', text: '40' },
    { key: '50', text: '50' },
    { key: '75', text: '75' },
    { key: '100', text: '100' },
    { key: '200', text: '200' },
];
var generateData = function (count, cachingEnabled, checked) {
    var icons = ['Add', 'Share', 'Upload'];
    var dataItems = [];
    var cacheKey = '';
    for (var index = 0; index < count; index++) {
        var item = {
            key: "item" + index,
            name: "Item " + index,
            icon: icons[index % icons.length],
            checked: checked,
        };
        cacheKey = cacheKey + item.key;
        dataItems.push(item);
    }
    var result = {
        primary: dataItems,
        overflow: [],
    };
    if (cachingEnabled) {
        result = __assign(__assign({}, result), { cacheKey: cacheKey });
    }
    return result;
};
var computeCacheKey = function (primaryControls) {
    return primaryControls.reduce(function (acc, current) { return acc + current.key; }, '');
};
var onRenderItem = function (item) { return (React.createElement(CommandBarButton, { role: "menuitem", text: item.name, iconProps: { iconName: item.icon }, onClick: item.onClick, checked: item.checked })); };
export var ResizeGroupOverflowSetExample = function () {
    var _a = React.useState(20), numberOfItems = _a[0], setNumberOfItems = _a[1];
    var _b = useBoolean(false), buttonsChecked = _b[0], toggleButtonsChecked = _b[1].toggle;
    var _c = useBoolean(false), cachingEnabled = _c[0], toggleCachingEnabled = _c[1].toggle;
    var _d = useBoolean(false), onGrowDataEnabled = _d[0], toggleOnGrowDataEnabled = _d[1].toggle;
    var dataToRender = generateData(numberOfItems, cachingEnabled, buttonsChecked);
    var onReduceData = function (currentData) {
        if (currentData.primary.length === 0) {
            return undefined;
        }
        var overflow = __spreadArrays(currentData.primary.slice(-1), currentData.overflow);
        var primary = currentData.primary.slice(0, -1);
        var cacheKey = undefined;
        if (cachingEnabled) {
            cacheKey = computeCacheKey(primary);
        }
        return { primary: primary, overflow: overflow, cacheKey: cacheKey };
    };
    var onGrowData = function (currentData) {
        if (currentData.overflow.length === 0) {
            return undefined;
        }
        var overflow = currentData.overflow.slice(1);
        var primary = __spreadArrays(currentData.primary, currentData.overflow.slice(0, 1));
        var cacheKey = undefined;
        if (cachingEnabled) {
            cacheKey = computeCacheKey(primary);
        }
        return { primary: primary, overflow: overflow, cacheKey: cacheKey };
    };
    var onRenderOverflowButton = function (overflowItems) { return (React.createElement(CommandBarButton, { role: "menuitem", menuProps: { items: overflowItems } })); };
    var onRenderData = function (data) {
        return (React.createElement(OverflowSet, { role: "menubar", items: data.primary, overflowItems: data.overflow.length ? data.overflow : null, onRenderItem: onRenderItem, onRenderOverflowButton: onRenderOverflowButton, styles: overflowSetStyles }));
    };
    var onNumberOfItemsChanged = function (event, option) {
        setNumberOfItems(parseInt(option.text, 10));
    };
    return (React.createElement("div", null,
        React.createElement(ResizeGroup, { role: "tabpanel", "aria-label": "Resize Group with an Overflow Set", data: dataToRender, onReduceData: onReduceData, onGrowData: onGrowDataEnabled ? onGrowData : undefined, onRenderData: onRenderData }),
        React.createElement("div", { className: styles.settingsGroup },
            React.createElement(Toggle, { label: "Enable caching", onChange: toggleCachingEnabled, checked: cachingEnabled }),
            React.createElement(Toggle, { label: "Enable onGrowData", onChange: toggleOnGrowDataEnabled, checked: onGrowDataEnabled }),
            React.createElement(Toggle, { label: "Buttons checked", onChange: toggleButtonsChecked, checked: buttonsChecked }),
            React.createElement("div", { className: styles.itemCountDropdown },
                React.createElement(Dropdown, { label: "Number of items to render", selectedKey: numberOfItems.toString(), onChange: onNumberOfItemsChanged, options: dropdownOptions })))));
};
//# sourceMappingURL=ResizeGroup.OverflowSet.Example.js.map