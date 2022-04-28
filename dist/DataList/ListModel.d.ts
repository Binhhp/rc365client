import { IShimmeredDetailsListProps } from "../DetailsList/ShimmeredDetailsList.types";
import { IGroup } from "../GroupedList";
import { DataListSource } from "./interface/IDataSource";
import { IColumnDl } from "./Main/MainModel";
export interface IListProps extends IShimmeredDetailsListProps {
    isDisableLazyLoading?: boolean;
    filterWithTicks?: boolean;
    isNotAction?: boolean;
    darkMode?: string;
    isLoading?: boolean;
    isOffline?: boolean;
    isFilterHidden?: boolean;
    isBlocking?: boolean;
    groupBy?: string;
    isCollapseOnlyByIcon?: boolean;
    iconName?: string;
    uniqueItemKey?: string;
    customLoading?: any;
    queryClass: DataListSource;
    columns: IColumnDl[];
    selectedItems?: any[];
    rcName: string;
    onRowClick?: (item: any) => void;
    onGetSelectionItem?: (selectionItems: any[]) => void;
    onGroupTitleClick?: (groups: IGroup) => void;
    onHandleClickGroupTitle?: (groups: IGroup) => void;
    onGetSelecteGroupList?: (groups: IGroup[]) => void;
    onHandleItems?: (items: any[], numbers: number) => void;
}
export interface IListStates {
    itemHeight: number;
    viewPort: number;
}
export interface IMyGroup {
    key: string;
    name: string;
    level?: number;
    isSelected?: boolean;
    isCollapsed?: boolean;
}
//# sourceMappingURL=ListModel.d.ts.map