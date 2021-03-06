import { IContextualMenuItem } from "../utilities/ContextualMenu";
/**
 * Determines the effective checked state of a menu item.
 *
 * @param item {IContextualMenuItem} to get the check state of.
 * @returns {true} if the item is checked.
 * @returns {false} if the item is unchecked.
 * @returns {null} if the item is not checkable.
 */
export declare function getIsChecked(item: IContextualMenuItem): boolean | null;
export declare function hasSubmenu(item: IContextualMenuItem): boolean;
export declare function isItemDisabled(item: IContextualMenuItem): boolean;
export declare function getMenuItemAriaRole(item: IContextualMenuItem): string;
