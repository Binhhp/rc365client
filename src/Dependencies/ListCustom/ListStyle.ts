import styled from "styled-components";
import { IContextualMenuProps } from "../@uifabric/utilities/ContextualMenu";
import { IGroup } from "../GroupedList/GroupedList.types";
import { IEmptyContent } from "../DetailsList";
import {
  RestApiDataSource,
  SignalRDataSource,
  StaticDataSource,
} from "./interface/IDataSource";
import { SelectionMode } from "../@uifabric/utilities/selection";

// <ListProps>
export interface IHOC {
  darkMode?: string;
  columns: IColumn[];
  items?: any[];
  isOffline?: boolean;
  isLoading?: boolean;
  onGetSelectionItem?: (selectionItems: any[]) => void;
  onRowClick?: (item: any) => void;
  onRemoveFilter?: (filterObjectLength: number) => void;
  groups?: IGroup[];
  queryURL: string;
  columnIconName?: string;
  rcName?: string;
  isFilterHidden?: boolean;
  isBlocking?: boolean;
  isEmptyItems?: IEmptyContent;
  selectedItems?: any[];
  queryClass: StaticDataSource | RestApiDataSource | SignalRDataSource;
  selectionMode?: SelectionMode;
}
// </ListProps>

export interface IListProps extends IHOC {
  itemCount: number;
  viewPort: number;
}

// <ListSortObject>
export interface ISortObject {
  count: number;
  order: string;
  key: string;
}
// </ListSortObject>

export interface IListStates {
  items: any[];
  columns: IColumn[];
  filterItemsResult?: any[];
  filterColumsResult?: IColumn[];
  selectionDetails: void;
  contextualMenu?: IContextualMenuProps;
  currentColumn: IColumn | null;
  isPanelVisible: boolean;
  targetColumn?: IColumn;
  newFilterColumns: string[];
  filterData: IObjectFilter[];
  sortData: IObjectSort;
  groups?: IGroup[];
  filterGroupResult?: IGroup[];
  defaultURL: string;
  currentURL: string;
  pageIndex: number;
  skipNumber: number;
  isLoadingLazy: boolean;
  isLastPage: boolean;
  isNotAction?: boolean;
  nextLink: string | null;
}

// <ListColumns>
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
  isNotAction?: boolean;
}
// </ListColumns>

export interface IFilterProps {
  targetColumn: IColumn;
  items: any[];
  onGetItem?: (arr: any[]) => void;
  columns: IColumn[];
  darkMode?: string;
  onGetFilterObject: (obj: IObjectFilter) => void;
  isOffline?: boolean;
  rcName?: string;
}

// <ListFilterObject>
export interface IObjectFilter {
  columnKey: string;
  value: string | boolean | Date | { date: Date }[] | number;
  key: string;
  operator: string;
}
// </ListFilterObject>

export interface IFilterState {
  type?: string | number;
  value?: string | boolean | { date: Date }[] | Date | number;
  result: any[];
  resultColumns: [];
  operator: string;
  selectMode?: string;
}

export interface IItemsDefaultCol {
  key?: string; //unique value
  dateModified?: Date;
  name?: string;
  status?: boolean;
  modifiedBy?: Date | string; //Date or Date string
  fileSizeRaw?: number;
  sharingBy?: string;
  isDisable?: boolean;
  fileName?: string; //filename
}

export interface IObjectSort {
  count: number;
  order: OrderValue;
  key: string;
}

export enum OrderValue {
  asc = "asc",
  desc = "desc",
}

export const StateListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: Segoe UI;
  position: relative;
  border: ${({ theme }) =>
    theme.darkMode === "dark" ? "1px solid #000000" : "1px solid #edebe9"};
  img {
    width: 18px;
    height: 18px;
    padding-right: 17px;
  }
  .ms-DetailsHeader-cellName {
    font-weight: normal;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    justify-items: center;
    height: 100%;
  }
  .ms-DetailsHeader {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 0;
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#1d1d1d" : "#f9f9f9"};
    .btn-closeFilter {
      i {
        padding-left: 0;
      }
      &:hover {
        background: ${({ theme }) =>
          theme.darkMode === "dark" ? "#000000" : "#f4f4f4"};
        i {
          color: #c11818;
        }
      }
    }
    .ms-DetailsHeader-cell {
      cursor: pointer;
      height: 100%;
      &:active {
        background-color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
      }
      .ms-DetailsHeader-collapseButton {
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#ffffff" : "#333333"};
      }
      .ms-DetailsHeader-checkTooltip .ms-DetailsHeader-check {
        .ms-Check {
          .ms-Icon {
            color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"};
          }
        }
        .is-checked {
          .ms-Icon {
            color: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"} !important;
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "rgb(105, 175, 229)"} !important;
          }
        }
      }
      .settingCol-filter {
        font-size: 12px !important;
      }
      &:hover {
        background: ${({ theme }) =>
          theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
      }
      .ms-DetailsHeader-cellTitle {
        height: 30px;
        align-items: center;
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#ffffff" : "#333333"};
        i {
          font-size: 10px;
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#D5D5D5" : "#666666"};
        }
      }
    }
    .ms-DetailsHeader-cellSizer:last-of-type {
      display: none;
    }
  }
  .ms-DetailsRow {
    cursor: pointer;
    width: 100%;
    .ms-DetailsRow-cell {
      .ms-DetailsRow-check {
        .ms-Check {
          .ms-Icon {
            color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"};
          }
        }
        .is-checked {
          .ms-Icon {
            color: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"} !important;
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "rgb(105, 175, 229)"} !important;
          }
        }
      }
    }
    .ms-DetailsRow-cellCheck {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .column-icon {
      padding-left: 8px;
    }
    .name-col {
      color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#ffffff" : "#212121"};
    }
    &:hover {
      background: ${({ theme }) =>
        theme.darkMode === "dark" ? "#000000" : "#F4F4F4"} !important;
      color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
    }
  }
  .is-selected {
    background: ${({ theme }) =>
      theme.darkMode === "dark" ? "#454545" : "#ffffff"};
    span,
    i {
      color: ${({ theme }) =>
        theme.darkMode === "dark" && "#ffffff"} !important;
    }
  }
  .ms-Check {
    cursor: pointer;
  }
  .ms-ScrollablePane--contentContainer {
    .ms-DetailsList {
      overflow-x: hidden;
      .ms-DetailsList-contentWrapper {
        .ms-FocusZone {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#ffffff" : "#323130"};
          .ms-List-surface {
            .ms-List-page:nth-last-child(2) {
              .ms-GroupHeader {
                border-bottom: 0;
              }
            }
          }
          .ms-GroupHeader {
            background-color: ${({ theme }) =>
              theme.darkMode === "dark" ? "#212121" : "#ffffff"};
            border-bottom: ${({ theme }) =>
              theme.darkMode === "dark"
                ? "1px solid #000000"
                : "1px solid #edebe9"};
            cursor: pointer;
            &:hover {
              background-color: ${({ theme }) =>
                theme.darkMode === "dark" ? "#000000" : "#f4f4f4"};
            }
            .ms-GroupHeader-expand {
              cursor: pointer;
              &:hover {
                background-color: ${({ theme }) =>
                  theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
              }
              i {
                color: ${({ theme }) =>
                  theme.darkMode === "dark" ? "#ffffff" : "#323130"};
              }
            }
            .ms-GroupHeader-check {
              .ms-Check {
                .ms-Icon {
                  color: ${({ theme }) =>
                    theme.darkMode === "dark" && "#ffffff"};
                }
                &::before {
                  background: ${({ theme }) =>
                    theme.darkMode === "dark" && "#212121"};
                }
              }
              .is-checked {
                .ms-Icon {
                  color: ${({ theme }) =>
                    theme.darkMode === "dark" && "#212121"} !important;
                }
                &::before {
                  background: ${({ theme }) =>
                    theme.darkMode === "dark" &&
                    "rgb(105, 175, 229)"} !important;
                }
              }
            }
          }
        }
      }
    }
  }

  .ms-ScrollablePane--contentContainer::-webkit-scrollbar {
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#3c3c3c" : "#ffffff"};
    cursor: pointer;
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4"};
    border-radius: 10px;
    background-clip: content-box;
    border: solid 6px transparent;
    &:hover {
      background: #98a3a6;
      background-clip: content-box;
      border: solid 6px transparent;
    }
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button,
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-corner {
    background: transparent;
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:horizontal:increment {
    background-image: url(https://dl.dropboxusercontent.com/u/55165267/icon2.png);
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:end:increment {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAi0lEQVQokWNgGAUkAUYY48SJE9n////nIaiBkfGzhYXFNAYGBgYWJHFHRkbGYCIsXMPAwDCNgYGBgQkmwsLCEvn////1BDRufffuXQyGsxkYGBjOnDnD+vv375WMjIyBODQGe3l5/cSqGY8BGBqxasZiAFaNODXDDPjz508MCwvLEhMTk9+41A1BAADmHz3RwatzCgAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-position: center;
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:start:decrement {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAZ0lEQVQoke2MsQnDMBQF77k03kcgApkgK3g0F4HM4M7gRmgity+VGiMh9cmV/787+D3UeqSUnpLettcY4zks55wfwA4swCXpFUI4uvJNLFQDGhCbAQ2K1cBUrrY/HRFgtr11Nn9afAFsJydbydDm5gAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-position: center;
  }
  .ms-Shimmer-shimmerWrapper {
    border-color: ${({ theme }) => theme.darkMode === "dark" && "#323130"};
    background: ${({ theme }) => theme.darkMode === "dark" && "#323130"};
  }
  .ms-ShimmerGap-root {
    background-color: ${({ theme }) => theme.darkMode === "dark" && "#212121"};
  }
  .ms-ShimmerLine-topLeftCorner,
  .ms-ShimmerLine-topRightCorner,
  .ms-ShimmerLine-bottomRightCorner,
  .ms-ShimmerLine-bottomLeftCorner {
    fill: ${({ theme }) => theme.darkMode === "dark" && "#323130"};
  }
  .ms-Shimmer-shimmerGradient {
    background: ${({ theme }) => theme.darkMode === "dark" && "#373737"};
  }
  .ms-ShimmerLine-root {
    border-color: ${({ theme }) => theme.darkMode === "dark" && "#212121"};
  }
`;

export const PanelWrapper = styled.div`
  p {
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
    font-size: 17px;
  }
  ul {
    padding-top: 14px;
    padding-left: 0;
    margin-bottom: 33px;
    li {
      list-style: none;
      margin-bottom: 18.5px;
      .ms-Checkbox {
        .ms-Checkbox-checkbox {
          border-radius: 0;
          border-color: ${({ theme }) =>
            theme === "dark" ? "#ffffff" : "rgb(50, 49, 48)"};
        }
        .ms-Checkbox-text {
          color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
          font-weight: normal;
        }
      }
      .is-checked {
        .ms-Checkbox-label {
          .ms-Checkbox-checkbox {
            background-color: ${({ theme }) => theme === "dark" && "#69afe5"};
            border-color: ${({ theme }) => theme === "dark" && "#69afe5"};
            i {
              color: ${({ theme }) => theme === "dark" && "#333333"};
            }
          }
        }
        &:hover {
          .ms-Checkbox-label {
            .ms-Checkbox-checkbox {
              background-color: ${({ theme }) => theme === "dark" && "#b3d6fc"};
              border-color: ${({ theme }) => theme === "dark" && "#b3d6fc"};
            }
          }
        }
      }
    }
  }
  .btn-panel-group {
    display: flex;
    button {
      margin-right: 10px;
      .ms-Button-label {
        font-weight: 600;
      }
    }
    .is-disabled {
      background: ${({ theme }) =>
        theme === "dark" ? "#000000" : "#c8c8c8"} !important;
      .ms-Button-label {
        color: #ffffff !important;
      }
    }
  }
`;

export const CalendarWrapper = styled.div`
  padding: 18px 0 18px 0;
  .ms-Dropdown-container {
    margin-bottom: 15px;
  }
  .dayPicker_4cbef05b {
    box-shadow: none;
    width: 100%;
    .ms-DatePicker-holder {
      width: 100%;
      .ms-DatePicker-table {
        width: 100%;
      }
    }
  }
`;

export const PanelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MenuFilterWrapper = styled.div`
  padding: 5px 0 5px 10px;
  .ms-Checkbox {
    .ms-Checkbox-label {
      .ms-Checkbox-checkbox {
        border-radius: 0;
        border-color: ${({ theme }) =>
          theme === "dark" ? "#ffffff" : "rgb(50, 49, 48)"};
      }
      .ms-Checkbox-text {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
      }
    }
  }
  .is-checked {
    .ms-Checkbox-label {
      .ms-Checkbox-checkbox {
        background-color: ${({ theme }) => theme === "dark" && "#69afe5"};
        border-color: ${({ theme }) => theme === "dark" && "#69afe5"};
        i {
          color: ${({ theme }) => theme === "dark" && "#333333"};
        }
      }
    }
    &:hover {
      .ms-Checkbox-label {
        .ms-Checkbox-checkbox {
          background-color: ${({ theme }) => theme === "dark" && "#b3d6fc"};
          border-color: ${({ theme }) => theme === "dark" && "#b3d6fc"};
        }
      }
    }
  }
`;

export const OptionAndTextWrapper = styled.div`
  ul li {
    .ms-Dropdown-container {
      .ms-Dropdown-label {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
      }
      .ms-Dropdown-title {
        border-color: ${({ theme }) =>
          theme === "dark" ? "#ffffff" : "#212121"};
        background-color: ${({ theme }) =>
          theme === "dark" ? "#212121" : "#ffffff"};
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
      }
    }
    .ms-TextField {
      .ms-Label {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
      }
      .ms-TextField-fieldGroup {
        border-color: ${({ theme }) => theme === "dark" && "#ffffff"};
        input:-webkit-autofill {
          -webkit-text-fill-color: ${({ theme }) =>
            theme === "dark" && "#ffffff"} !important;
          -webkit-box-shadow: ${({ theme }) =>
            theme === "dark" && "0 0 0 30px #212121 inset !important"};
        }
      }
    }
    .is-disabled {
      .ms-TextField-fieldGroup {
        border-color: ${({ theme }) => theme === "dark" && "rgb(96, 94, 92)"};
        input {
          background-color: ${({ theme }) => theme === "dark" && "#212121"};
        }
      }
    }
  }
`;

export const ChoiceGroupWrapper = styled.div`
  padding: 15px 0 30px 0;
  .ms-ChoiceFieldGroup {
    .ms-ChoiceFieldGroup-flexContainer {
      .ms-ChoiceField {
        margin-top: 15px;
      }
    }
  }
`;
