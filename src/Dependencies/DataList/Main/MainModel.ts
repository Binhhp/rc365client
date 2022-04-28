import { IContextualMenuProps } from "../../@uifabric/utilities/ContextualMenu";
import { IColumn, IGroup } from "../../DetailsList";
import { IFilterQuery } from "../Interface";
import { IListProps } from "../ListModel";

export interface IMainProps extends IListProps {
  viewPort: number;
  skipNumber: number;
  onHandleItems?: (items: any[], numbers: number) => void;
}

export interface IMainStates {
  selectionDetails: void;
  isPanelVisible: boolean;
  isFirstLoad: boolean;
  contextualMenu?: IContextualMenuProps;
  sourceColumns: IColumnDl[];
  columns: IColumnDl[];
  items: any[];
  workingColumn: IColumnDl | null;
  filterQuery: IFilterQuery[];
  page: number;
  skipNumber: number;
  nextLink: string;
  isLastPage: boolean;
  isCallingWithLazy: boolean;
  filterCols: string[];
  groups: IGroup[];
  sourceGroups: IGroup[];
  selectedGroups: IGroup[];
}
type keyFilter = string | boolean;
export interface IColumnDl extends IColumn {
  priority?: number;
  isFilter?: boolean;
  booleanFormOpts?: { key: keyFilter; text: string }[];
  isNotFilter?: boolean;
  // filter and sort query endpoint for item object type
  queryKey?: string;
  // filter query endpoint with case 'OR'
  queryMultipleKeys?: string[];
}
