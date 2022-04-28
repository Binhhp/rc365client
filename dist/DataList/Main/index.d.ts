import * as React from "react";
import { IDetailsRowFieldsProps, IGroup } from "../../DetailsList";
import { IMainProps, IMainStates } from "./MainModel";
import { IContextualMenuItem } from "../../@uifabric/utilities/ContextualMenu";
export declare class MainList extends React.Component<IMainProps, IMainStates> {
    private _selection;
    constructor(props: IMainProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IMainProps, prevState: IMainStates): void;
    UNSAFE_componentWillReceiveProps(nextProps: IMainProps): void;
    private _onHandleBuildItemsWithGroupBy;
    private _BuildItemsByGoupByKeys;
    private _BuildMyGroupFromKeys;
    private _onHandleFirstLoad;
    private _onHandleCheckMode;
    private _onHandleOfflineMode;
    private _onHandleOnlineMode;
    private _SettingColumn;
    private _onResetPageIndex;
    private _BuildDefaultGroups;
    private _BuildDefaultColumn;
    private _onRenderColumnFilter;
    private _onHeaderClick;
    private _BuildDefaultSortObj;
    private _onHandleGetLocalStorageData;
    private _onHandleSaveToLocalStorage;
    onHandleSetSelectedItems: () => void;
    private _BuildEndpointWithSortAndFilter;
    private _mapSelectionSort;
    private _onHandleSortInOffline;
    private _onHandleGetValueByChildQuery;
    private _onHandleFilterInOffline;
    private _onHandleSortGroups;
    private _onHandleSelectSortInContextual;
    private _onHandleChangeQueryState;
    private _onHandleSentSelecteGroups;
    onGetFilterObj: (operator: string, colKey: string, value?: any) => void;
    onHandleUpdateDataCaseLazy: (source: any[], page?: number | undefined) => void;
    onHandleUpdateDataCaseFirst: (source: any[]) => void;
    onHandleQueryClassSource: (source: any[], page?: number | undefined, isLazy?: boolean | undefined) => void;
    onHandleQueryDataByClassType: (isLazy?: boolean | undefined) => Promise<void>;
    onCancelFilter: (key: string) => Promise<void>;
    onChoiceItemSort: (ev?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent> | undefined, item?: IContextualMenuItem | undefined) => void;
    onSetVisiblePanel: () => void;
    onHandleScrollList: (event: React.MouseEvent<HTMLDivElement, UIEvent>) => void;
    onHandleSelectedGroups: (groups: IGroup | IGroup[]) => Promise<void>;
    onHandleClickGroupTitle: (group: IGroup) => void;
    render(): JSX.Element;
    private _onRenderHeader;
    private _onRenderDetailsHeader;
    private _getContextualMenuProps;
    private _getContextualMenuFilterProps;
    onCheckFilter: (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, itemKey?: string | undefined) => void;
    private _onFilterColumn;
    private _onContextualMenuDismissed;
    private _onHandleUniqueArray;
    private _getSelectionDetails;
    private _onRenderRow;
    renderRowFields: (props: IDetailsRowFieldsProps) => JSX.Element;
}
//# sourceMappingURL=index.d.ts.map