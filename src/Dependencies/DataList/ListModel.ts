import { IShimmeredDetailsListProps } from "../DetailsList/ShimmeredDetailsList.types";
import { IGroup } from "../GroupedList";
import { DataListSource } from "./interface/IDataSource";
import { IColumnDl } from "./Main/MainModel";

// [note]:
// !isOffline && !items => online mode
// isOffline && items => offline mode
// isOffline && !items => still call api but sort & filter in offline
export interface IListProps extends IShimmeredDetailsListProps {
  // disabled call api when scroll (lazyload funcional)
  isDisableLazyLoading?: boolean;
  // filter date with ticks type
  filterWithTicks?: boolean;
  // disable filter and sort functions
  isNotAction?: boolean;
  darkMode?: string;
  //   Loading shimmer
  isLoading?: boolean;
  //   List working with data local and dont call api
  isOffline?: boolean;
  //   Hidden filter in column
  isFilterHidden?: boolean;
  isBlocking?: boolean;
  //   key items to auto group up
  groupBy?: string;
  //   disabled header collapse functional
  isCollapseOnlyByIcon?: boolean;
  //   icon in rows (fluent ui icon)
  iconName?: string;
  // unique key of items (default is id)
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
