import { __spreadArrays } from "tslib";
import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useConstCallback } from '@uifabric/react-hooks';
export var CommandBarLazyExample = function () {
    var _a = React.useState(undefined), menuItems = _a[0], setMenuItems = _a[1];
    var timeoutRef = React.useRef();
    var onMenuDismissed = useConstCallback(function () {
        setMenuItems(undefined);
    });
    var loadItems = useConstCallback(function () {
        var itemCount = Math.floor(Math.random() * 5) + 1;
        var newMenuItems = [];
        for (var i = 0; i < itemCount; i++) {
            newMenuItems.push({
                key: "sub-item-" + i,
                name: "Item " + i,
            });
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(function () {
            setMenuItems(newMenuItems);
        }, 2000);
    });
    var items = React.useMemo(function () {
        return [
            {
                key: 'a',
                name: 'Test',
            },
            {
                key: 'menu',
                name: 'Lazy-loaded menu',
                subMenuProps: {
                    items: menuItems
                        ? __spreadArrays(menuItems, [
                            {
                                key: 'divider',
                                name: '-',
                                itemType: ContextualMenuItemType.Divider,
                            },
                            {
                                key: 'permanent',
                                name: 'Permanent option',
                            },
                        ]) : [],
                    onMenuOpened: loadItems,
                    onMenuDismissed: onMenuDismissed,
                },
            },
        ];
    }, [menuItems]);
    return (React.createElement("div", null,
        React.createElement(CommandBar, { items: items })));
};
//# sourceMappingURL=CommandBar.Lazy.Example.js.map