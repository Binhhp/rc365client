/// <reference types="react" />
import { IContextualMenuProps } from "../@uifabric/utilities/ContextualMenu";
import { IGroup } from "../GroupedList/GroupedList.types";
export interface IHOC {
  darkMode?: string;
  columns: IColumn[];
  items: any[];
  loading: boolean;
  onGetSelectionItem?: (selectionItems: any[]) => void;
  onGetFilterObject?: (filterData: IObjectFilter[]) => void;
  onRowClick?: (item: any) => void;
  onGetItemsList?: (
    page: number,
    itemsCount: number,
    order?: string,
    fieldName?: string
  ) => void;
  onRemoveFilter?: (filterObjectLength: number) => void;
  onGetQueryObject?: (
    sortObject: ISortObject,
    filterData: IObjectFilter[]
  ) => void;
  groups?: IGroup[];
}
export interface IListProps extends IHOC {
  itemCount: number;
}
export interface ISortObject {
  count: number;
  order: string;
  key: string;
}
export interface IListStates {
  items: any[];
  columns: IColumn[];
  filterItemsResult?: IColumn[];
  filterColumsResult?: IColumn[];
  selectionDetails: void;
  contextualMenu?: IContextualMenuProps;
  isSortedDescending: boolean;
  currentColumn: IColumn | null;
  isPanelVisible: boolean;
  filterBy: string[];
  targetColumn?: IColumn;
  itemCount: number;
  newFilterColumns: string[];
  page: number;
  isFiltered: boolean;
  order?: string;
  filterData: IObjectFilter[];
  groups?: IGroup[];
  filterGroupResult?: IGroup[];
  isScroll: boolean;
}
export interface IColumn {
  key: string;
  name: string;
  className?: string;
  iconClassName?: string;
  ariaLabel?: string;
  iconName?: string;
  isIconOnly?: boolean;
  fieldName?: string;
  minWidth: number;
  maxWidth?: number;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onRender?: (item?: any, index?: number, column?: IColumn) => JSX.Element;
  isRowHeader?: boolean;
  isResizable?: boolean;
  isSorted?: boolean;
  isSortedDescending?: boolean;
  sortAscendingAriaLabel?: string;
  sortDescendingAriaLabel?: string;
  data?: any;
  isPadded?: boolean;
  isCollapsible?: boolean;
  isDisable?: boolean;
  priority?: number;
  isFilter?: boolean;
}
export interface IFilterProps {
  targetColumn: IColumn;
  items: any[];
  onGetItem?: (arr: any[]) => void;
  columns: IColumn[];
  darkMode?: string;
  onGetFilterObject: (obj: IObjectFilter) => void;
  loading: boolean;
}
export interface IObjectFilter {
  columnKey: string;
  value:
    | string
    | boolean
    | Date
    | {
        date: Date;
      }[];
  key: string;
  operator: string;
}
export interface IFilterState {
  type?: string | number;
  value?:
    | string
    | boolean
    | {
        date: Date;
      }[]
    | Date;
  result: any[];
  resultColumns: [];
  operator: string;
}
export interface IItemsDefaultCol {
  key?: string;
  dateModified?: Date;
  name?: string;
  status?: boolean;
  modifiedBy?: Date | string;
  fileSizeRaw?: number;
  sharingBy?: string;
  isDisable?: boolean;
  fileName?: string;
}
export declare const StateListWrapper: import("styled-components").StyledComponent<
  "div",
  any,
  {},
  never
>;
export declare const PanelWrapper: import("styled-components").StyledComponent<
  "div",
  any,
  {},
  never
>;
export declare const CalendarWrapper: import("styled-components").StyledComponent<
  "div",
  any,
  {},
  never
>;
export declare const PanelContentWrapper: import("styled-components").StyledComponent<
  "div",
  any,
  {},
  never
>;
export declare const MenuFilterWrapper: import("styled-components").StyledComponent<
  "div",
  any,
  {},
  never
>;
export declare const OptionAndTextWrapper: import("styled-components").StyledComponent<
  "div",
  any,
  {},
  never
>;
