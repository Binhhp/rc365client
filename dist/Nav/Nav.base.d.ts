import * as React from 'react';
import { INav, INavProps } from './Nav.types';
export declare function isRelativeUrl(url: string): boolean;
export interface INavState {
    isGroupCollapsed: {
        [key: string]: boolean;
    };
    isLinkExpandStateChanged?: boolean;
    selectedKey?: string;
}
export declare class NavBase extends React.Component<INavProps, INavState> implements INav {
    static defaultProps: INavProps;
    private _focusZone;
    constructor(props: INavProps);
    render(): JSX.Element | null;
    readonly selectedKey: string | undefined;
    /**
     * Sets focus to the first tabbable item in the zone.
     * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
     * if focus is already in the focus zone.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    focus(forceIntoFirstElement?: boolean): boolean;
    private _onRenderLink;
    private _renderNavLink;
    private _renderCompositeLink;
    private _renderLink;
    private _renderLinks;
    private _renderGroup;
    private _renderGroupHeader;
    private _onGroupHeaderClicked;
    private _onLinkExpandClicked;
    private _preventBounce;
    private _onNavAnchorLinkClicked;
    private _onNavButtonLinkClicked;
    private _isLinkSelected;
    private _isGroupExpanded;
    private _toggleCollapsed;
}
