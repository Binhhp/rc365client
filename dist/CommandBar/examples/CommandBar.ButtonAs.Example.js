import { __assign } from "tslib";
import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { ContextualMenuItem, } from 'office-ui-fabric-react/lib/ContextualMenu';
import { getTheme, concatStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
var theme = getTheme();
// Styles for both command bar and overflow/menu items
var itemStyles = {
    label: { fontSize: 18 },
    icon: { color: theme.palette.red },
    iconHovered: { color: theme.palette.redDark },
};
// For passing the styles through to the context menus
var menuStyles = {
    subComponentStyles: { menuItem: itemStyles, callout: {} },
};
var getCommandBarButtonStyles = memoizeFunction(function (originalStyles) {
    if (!originalStyles) {
        return itemStyles;
    }
    return concatStyleSets(originalStyles, itemStyles);
});
// Custom renderer for main command bar items
var CustomButton = function (props) {
    var buttonOnMouseClick = function () { return alert(props.text + " clicked"); };
    return React.createElement(CommandBarButton, __assign({}, props, { onClick: buttonOnMouseClick, styles: getCommandBarButtonStyles(props.styles) }));
};
// Custom renderer for menu items (these must have a separate custom renderer because it's unlikely
// that the same component could be rendered properly as both a command bar item and menu item).
// It's also okay to custom render only the command bar items without changing the menu items.
var CustomMenuItem = function (props) {
    var buttonOnMouseClick = function () { return alert(props.item.text + " clicked"); };
    // Due to ContextualMenu implementation quirks, passing styles here doesn't work
    return React.createElement(ContextualMenuItem, __assign({}, props, { onClick: buttonOnMouseClick }));
};
var overflowProps = {
    ariaLabel: 'More commands',
    menuProps: {
        contextualMenuItemAs: CustomMenuItem,
        // Styles are passed through to menu items here
        styles: menuStyles,
        items: [],
        isBeakVisible: true,
        beakWidth: 20,
        gapSpace: 10,
        directionalHint: DirectionalHint.topCenter,
    },
};
export var CommandBarButtonAsExample = function () {
    return (React.createElement(CommandBar, { overflowButtonProps: overflowProps, 
        // Custom render all buttons
        buttonAs: CustomButton, items: _items, overflowItems: _overflowItems, farItems: _farItems, ariaLabel: "Use left and right arrow keys to navigate between commands" }));
};
var _items = [
    {
        key: 'newItem',
        text: 'New',
        iconProps: { iconName: 'Add' },
        subMenuProps: {
            // Must specify the menu item type for submenus too!
            contextualMenuItemAs: CustomMenuItem,
            // Styles are passed through to menu items here
            styles: menuStyles,
            items: [
                { key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' } },
                { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
            ],
        },
    },
    {
        key: 'upload',
        text: 'Upload',
        iconProps: { iconName: 'Upload' },
        href: 'https://developer.microsoft.com/en-us/fluentui',
    },
    { key: 'share', text: 'Share', iconProps: { iconName: 'Share' }, onClick: function () { return console.log('Share'); } },
    { key: 'download', text: 'Download', iconProps: { iconName: 'Download' }, onClick: function () { return console.log('Download'); } },
];
var _overflowItems = [
    { key: 'move', text: 'Move to...', onClick: function () { return console.log('Move to'); }, iconProps: { iconName: 'MoveToFolder' } },
    { key: 'copy', text: 'Copy to...', onClick: function () { return console.log('Copy to'); }, iconProps: { iconName: 'Copy' } },
    { key: 'rename', text: 'Rename...', onClick: function () { return console.log('Rename'); }, iconProps: { iconName: 'Edit' } },
];
var _farItems = [
    {
        key: 'tile',
        text: 'Grid view',
        // This needs an ariaLabel since it's icon-only
        ariaLabel: 'Grid view',
        iconOnly: true,
        iconProps: { iconName: 'Tiles' },
        onClick: function () { return console.log('Tiles'); },
    },
    {
        key: 'info',
        text: 'Info',
        ariaLabel: 'Info',
        iconOnly: true,
        iconProps: { iconName: 'Info' },
        onClick: function () { return console.log('Info'); },
    },
];
//# sourceMappingURL=CommandBar.ButtonAs.Example.js.map