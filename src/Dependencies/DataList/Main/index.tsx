import * as React from "react";
import { ScrollablePane, ScrollbarVisibility } from "../../ScrollablePane";
import { Sticky, StickyPositionType } from "../../Sticky";
import { Selection, SelectionMode } from "../../@uifabric/utilities/selection";
import {
  DetailsHeader,
  DetailsListLayoutMode,
  IColumn,
  IDetailsListProps,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsHeaderStyles,
  DetailsRowFields,
  IDetailsRowFieldsProps,
  IGroup,
  IDetailsGroupRenderProps,
} from "../../DetailsList";
import { GroupHeader } from "../../GroupedList";
import { ShimmeredDetailsList } from "../../DetailsList/ShimmeredDetailsList";
import { MarqueeSelection } from "../../MarqueeSelection";
import { FilterType, IFilterQuery, OrderValue } from "../Interface";
import { IColumnDl, IMainProps, IMainStates } from "./MainModel";
import { MainWrapper, MenuFilterWrapper } from "./MainStyle";
import {
  IContextualMenuProps,
  DirectionalHint,
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
} from "../../@uifabric/utilities/ContextualMenu";
import { Panel, PanelType } from "../../Panel";
import Checkbox from "../../Checkbox/CustomCheckBox";
import FilterElement from "../Panel";
import buildQuery from "odata-query";
import { Icon } from "../../@uifabric/icons";

export class MainList extends React.Component<IMainProps, IMainStates> {
  private _selection: Selection;
  constructor(props: IMainProps) {
    super(props);
    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });
    this.state = {
      selectionDetails: undefined,
      isPanelVisible: false,
      isLastPage: false,
      isFirstLoad: true,
      isCallingWithLazy: false,
      contextualMenu: undefined,
      sourceColumns: [],
      columns: [],
      items: [],
      filterQuery: [],
      filterCols: [],
      workingColumn: null,
      page: 1,
      skipNumber: this.props.skipNumber || 0,
      nextLink: "",
      groups: [],
      sourceGroups: [],
      selectedGroups: [],
    };
  }

  componentDidMount() {
    this._onHandleFirstLoad();
  }

  componentDidUpdate(prevProps: IMainProps, prevState: IMainStates) {
    if (
      this.props.skipNumber !== prevProps.skipNumber &&
      this.props.skipNumber !== this.state.skipNumber
    ) {
      this.setState({ skipNumber: this.props.skipNumber });
    }
    if (this.props.viewPort !== prevProps.viewPort && this.props.viewPort > 0) {
      let crtColumns = [...this.state.columns];
      let isHaveMaxWidth = crtColumns.some(
        (c) => c.maxWidth && c.maxWidth > 0 && c.key !== "settingCol"
      );
      if (!isHaveMaxWidth) {
        let widthCheckAndSetting = 48;
        let width =
          (this.props.viewPort - widthCheckAndSetting) / crtColumns.length;
        let newCols = crtColumns.map((c) => {
          if (c.key !== "settingCol") {
            c.maxWidth = width;
          }
          return c;
        });
        this.setState({ columns: newCols });
      }
    }
    // uncheck all items
    if (
      this.props.selectedItems &&
      this.props.selectedItems.length < 1 &&
      prevProps.selectedItems &&
      prevProps.selectedItems.length > 0
    ) {
      this._selection.setAllSelected(false);
    }
    if (this.props.onHandleItems && this.state.items) {
      this.props.onHandleItems(this.state.items, this.state.items.length);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IMainProps) {
    if (this.props.theme !== nextProps.theme) {
      this.forceUpdate();
    }
  }

  // get keys of groupby in items
  private _onHandleBuildItemsWithGroupBy = (items?: any[]): string[] => {
    let workingItems = items ? items : [...this.state.items];
    let keys: string[] = [];
    if (this.props.groupBy && workingItems.length > 0) {
      workingItems.forEach((i: any) => {
        if (this.props.groupBy && !keys.includes(i[this.props.groupBy])) {
          keys.push(i[this.props.groupBy]);
        }
      });
    }
    return keys;
  };

  // sort items to groupup
  private _BuildItemsByGoupByKeys = (keys: string[], items?: any[]): any[] => {
    let newsItems: any[] = [];
    let workingItems = items ? items : this.state.items;
    if (keys.length > 0 && workingItems.length > 0) {
      let crtItems = [...workingItems];
      keys.forEach((k, i) => {
        let items = crtItems.filter(
          (i) => this.props.groupBy && i[this.props.groupBy] === k
        );
        newsItems = [...newsItems, ...items];
      });
    }
    return newsItems;
  };

  // build group by keys and new items
  private _BuildMyGroupFromKeys = (keys: string[], items: any[]): IGroup[] => {
    let groups: IGroup[] = [];
    keys.forEach((k, i) => {
      let item: IGroup = {
        key: "",
        name: "",
        startIndex: 0,
        count: 0,
      };
      if (i > 0) {
        item.startIndex =
          groups[groups.length - 1].count +
          groups[groups.length - 1].startIndex;
      }
      item.key = k;
      item.name = k;
      item.count = items.filter(
        (it) => this.props.groupBy && it[this.props.groupBy] === k
      ).length;
      return groups.push(item);
    });
    return groups;
  };

  private _onHandleFirstLoad = async () => {
    let storageData = this._onHandleGetLocalStorageData();
    let columns = this._BuildDefaultColumn(storageData.filterQuery);
    let groups = this._BuildDefaultGroups();
    let columnAfterFilterStorage = columns;
    if (storageData.filterCols && storageData.filterCols.length > 0) {
      let newCols = columnAfterFilterStorage.filter(
        (col) =>
          storageData.filterCols.includes(col.key) || col.key === "settingCol"
      );
      columnAfterFilterStorage = newCols;
    }
    this.setState(
      {
        sourceColumns: columns,
        columns: columnAfterFilterStorage,
        groups,
        nextLink: this.props.queryClass.nextLink,
        sourceGroups: groups,
        filterQuery: storageData.filterQuery,
        filterCols: storageData.filterCols,
        skipNumber: this.props.skipNumber,
        isFirstLoad: false,
      },
      () => this._onHandleCheckMode()
    );
  };

  // check mode of list
  private _onHandleCheckMode = async () => {
    if (
      this.props.items ||
      (typeof this.props.isOffline === "boolean" &&
        this.props.isOffline &&
        !this.props.items)
    ) {
      console.log("is Offline");
      this._onHandleOfflineMode();
    }
    if (
      !this.props.items &&
      (!this.props.isOffline || (this.props.isOffline && !this.props.items))
    ) {
      console.log("is Online");
      this._onHandleOnlineMode();
    }
  };

  private _onHandleOfflineMode = () => {
    if (this.props.items) {
      this.setState({ items: this.props.items });
    }
  };

  private _onHandleOnlineMode = () => {
    this.onHandleQueryDataByClassType();
  };

  private _SettingColumn = (): IColumnDl => {
    return {
      key: "settingCol",
      name: "File Type",
      iconName: "Settings",
      className: "column-icon",
      iconClassName: "settingCol-filter",
      isIconOnly: true,
      isResizable: false,
      isNotAction: false,
      isNotFilter: false,
      priority: 0,
      fieldName: "icon",
      minWidth: 16,
      maxWidth: 16,
      booleanFormOpts: [],
      onColumnClick: this._onRenderColumnFilter,
      onRender: (item: any) => {
        return (
          <div
            className="settingCol-wrapper"
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              iconName={this.props.iconName ? this.props.iconName : "PageData"}
            />
          </div>
        );
      },
    };
  };

  private _onResetPageIndex = async () => {
    let listItem: HTMLElement = document.getElementsByClassName(
      this.props.rcName
        ? `${this.props.rcName}-scrollPane`
        : "ms-ScrollablePane--contentContainer"
    )[0] as HTMLElement;
    if (listItem) {
      await listItem.scrollTo({ top: 0, behavior: "smooth" });
    }
    await this.setState({
      page: 1,
      isLastPage: false,
    });
  };

  // build default groups
  private _BuildDefaultGroups = () => {
    let crtGroup = [...this.state.groups];
    if (this.props.groups && this.props.groups.length > 0) {
      crtGroup = [...this.props.groups];
      crtGroup.push({
        key: "lastGroup",
        name: "",
        startIndex:
          crtGroup[crtGroup.length - 1].startIndex +
          crtGroup[crtGroup.length - 1].count,
        count: 10,
        level: 1,
        hasMoreData: true,
        isShowingAll: true,
        isCollapsed: false,
      });
      return crtGroup;
    }
    return crtGroup;
  };

  // build columns
  private _BuildDefaultColumn = (storage?: IFilterQuery[]): IColumnDl[] => {
    let crtFilter = storage ? [...storage] : [...this.state.filterQuery];
    let crtCol = this.props.columns;
    let cols = crtCol.map((col) => {
      if (col.key === "settingCol") {
        return col;
      }
      let isSorting = crtFilter.some(
        (f) => f.type === FilterType.Sort && f.columnKey === col.key
      );
      let isHasBeenFilter = crtFilter.some(
        (f) => f.key === col.key && f.type === FilterType.Filter
      );
      let isSortedDescending = crtFilter.some(
        (f) => f.columnKey === col.key && f.order === OrderValue.desc
      );
      col.isResizable = col.isResizable || true;
      col.isCollapsible = col.isCollapsible || false; // scroll-x  = true if this true
      col.isSorted = isSorting || false;
      col.isSortedDescending = isSortedDescending;
      col.sortAscendingAriaLabel = "Sorted A to Z";
      col.sortDescendingAriaLabel = "Sorted Z to A";
      col.isPadded = col.isPadded || true;
      // col.maxWidth = col.maxWidth;
      // col.isDisable= col.isDisable || false;
      col.booleanFormOpts = col.booleanFormOpts || [];
      col.priority = col.priority || 999;
      col.isFilter = isHasBeenFilter;
      col.isNotAction = col.isNotAction || false;
      col.isNotFilter = col.isNotFilter || false;
      col.onColumnClick = this._onHeaderClick;
      return col;
    });
    let settingCol = this._SettingColumn();
    cols.unshift(settingCol);
    // doing with group here
    return cols;
  };

  private _onRenderColumnFilter = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    if (!this.state.contextualMenu) {
      this.setState({
        contextualMenu: this._getContextualMenuFilterProps(ev, column),
        workingColumn: column,
      });
    } else {
      this._onFilterColumn();
      this.setState({
        contextualMenu: undefined,
        workingColumn: column,
      });
    }
  };

  private _onHeaderClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    this.setState({
      contextualMenu: this._getContextualMenuProps(ev, column),
      workingColumn: column,
    });
  };

  // find key & fieldName of highest priority
  private _BuildDefaultSortObj = (): { key: string; fieldName: string } => {
    let index = 999;
    let fieldName = "";
    let key = "";
    this.props.columns.forEach((col) => {
      if (col.priority && col.fieldName && col.priority < index) {
        index = col.priority;
        fieldName = col.fieldName;
        key = col.key;
      }
    });
    return { key, fieldName };
  };

  // check filter of list in localStorage
  private _onHandleGetLocalStorageData = (): {
    filterQuery: IFilterQuery[];
    filterCols: string[];
  } => {
    let listData = localStorage.getItem("listData");
    let defaultObj = this._BuildDefaultSortObj();
    let defaultFilter = [
      {
        columnKey: defaultObj.key,
        key: defaultObj.fieldName,
        value: "",
        operator: "",
        order: OrderValue.asc,
        type: FilterType.Sort,
      },
    ];
    if (listData) {
      let data = JSON.parse(listData);
      let listName = this.props.rcName;
      let listItem = data.find((i: any) => i.listName === listName);
      if (listItem) {
        return {
          filterQuery: listItem.filterQuery,
          filterCols: listItem.filterColumn,
        };
      }
    }
    return { filterQuery: defaultFilter, filterCols: [] };
  };

  private _onHandleSaveToLocalStorage = () => {
    let crtQuery = [...this.state.filterQuery];
    let listData = localStorage.getItem("listData");
    // already exist
    let obj = {
      listName: this.props.rcName,
      filterQuery: crtQuery,
      filterColumn: this.state.filterCols,
    };
    if (listData) {
      let data = JSON.parse(listData);
      let index = data.findIndex((d: any) => d.listName === this.props.rcName);
      if (index === -1) {
        data.push(obj);
      }
      if (index !== -1) {
        data[index].filterQuery = obj.filterQuery;
        data[index].filterColumn = obj.filterColumn;
      }
      localStorage.setItem("listData", JSON.stringify(data));
    }
    if (!listData) {
      localStorage.setItem("listData", JSON.stringify([obj]));
    }
  };

  // make items selected
  onHandleSetSelectedItems = () => {
    // const selectionItems = this._selection.getSelection();
    let newSelection = this._selection;
    if (
      this.props.selectedItems &&
      this.state.items &&
      this.state.items.length > 0
    ) {
      let uniqueKey = this.props.uniqueItemKey
        ? this.props.uniqueItemKey
        : "id";
      let selectedItems = this.state.items.map((i) => {
        return { ...i, key: i[uniqueKey] };
      });
      newSelection.setItems(selectedItems);
      for (let i = 0; i < selectedItems.length; i++) {
        if (
          this.props.selectedItems.some(
            (item) => item[uniqueKey] === selectedItems[i][uniqueKey]
          )
        ) {
          newSelection.setKeySelected(
            `${selectedItems[i][uniqueKey]}`,
            true,
            false
          );
        }
      }
    }
  };

  private _BuildEndpointWithSortAndFilter = (): string => {
    let crtQuery = [...this.state.filterQuery];
    let sortArr = crtQuery.filter((q) => q.type === FilterType.Sort);
    let filterArr = crtQuery.filter((q) => q.type !== FilterType.Sort);
    let orderByAr: any[] = [];
    let filterWith: any[] = [];
    if (sortArr.length > 0) {
      orderByAr = [`${sortArr[0].key} ${sortArr[0].order}`];
      if (sortArr[0].childQuery) {
        orderByAr = [`${sortArr[0].childQuery} ${sortArr[0].order}`];
      }
    }
    if (filterArr) {
      filterArr.forEach((f) => {
        let { columnKey, value, operator, childQuery } = f;
        let conditionKey = childQuery ? childQuery : columnKey;
        let isFilterOr = this.state.columns.findIndex(
          (col) =>
            col.fieldName === columnKey &&
            col.queryMultipleKeys &&
            col.queryMultipleKeys.length > 1
        );
        switch (operator) {
          case "contains":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [conditionKey]: {
                  ge: value[0].date,
                  le: value[value.length - 1].date,
                },
              };
              if (isFilterOr !== -1) {
                let arr =
                  this.state.columns[isFilterOr] &&
                  this.state.columns[isFilterOr].queryMultipleKeys
                    ? this.state.columns[isFilterOr].queryMultipleKeys!
                    : [];
                let crtFilterContains: any = {};
                let orArr = arr.filter((k) => k !== conditionKey);
                if (orArr.length > 0) {
                  orArr.forEach((i) => {
                    crtFilterContains[i] = {
                      ge: value[0].date,
                      le: value[value.length - 1].date,
                    };
                  });
                  filterWith.push({ or: crtFilterContains });
                  break;
                }
              }
              filterWith.push(filterDateArr);
              break;
            } else {
              let val = `tolower('${value}')`;
              let filterContains = {
                [`tolower(${conditionKey})`]: { contains: val },
              };
              if (isFilterOr !== -1) {
                let arr =
                  this.state.columns[isFilterOr] &&
                  this.state.columns[isFilterOr].queryMultipleKeys
                    ? this.state.columns[isFilterOr].queryMultipleKeys!
                    : [];
                let crtFilterContains: any = {};
                if (arr.length > 0) {
                  arr.forEach((i) => {
                    crtFilterContains[`tolower(${i})`] = { contains: val };
                  });
                  filterWith.push({ or: crtFilterContains });
                  break;
                }
              }
              filterWith.push(filterContains);
              break;
            }
          case "not":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [conditionKey]: {
                  lt: value[0].date,
                  gt: value[value.length - 1].date,
                },
              };
              if (isFilterOr !== -1) {
                let arr =
                  this.state.columns[isFilterOr] &&
                  this.state.columns[isFilterOr].queryMultipleKeys
                    ? this.state.columns[isFilterOr].queryMultipleKeys!
                    : [];
                if (arr.length > 0) {
                  let rs = arr.map((i) => {
                    return {
                      not: {
                        [i]: {
                          lt: value[0].date,
                          gt: value[value.length - 1].date,
                        },
                      },
                    };
                  });
                  filterWith.push({ and: rs });
                  break;
                }
              }
              filterWith.push(filterDateArr);
              break;
            } else {
              let val = `tolower('${value}')`;
              let filterNot = {
                not: { [`tolower(${conditionKey})`]: { contains: val } },
              };
              if (isFilterOr !== -1) {
                let arr =
                  this.state.columns[isFilterOr] &&
                  this.state.columns[isFilterOr].queryMultipleKeys
                    ? this.state.columns[isFilterOr].queryMultipleKeys!
                    : [];
                if (arr.length > 0) {
                  let rs = arr.map((i) => {
                    return { not: { [`tolower(${i})`]: { contains: val } } };
                  });
                  filterWith.push({ and: rs });
                  break;
                }
              }
              filterWith.push(filterNot);
              break;
            }

          default:
            let val: any = `tolower('${value}')`;
            let filterDefault = {
              [`tolower(${conditionKey})`]: { [operator]: val },
            };
            if (typeof value === "boolean") {
              val = value;
              filterDefault = {
                [conditionKey]: { [operator]: val },
              };
            }
            if (isFilterOr !== -1) {
              let arr =
                this.state.columns[isFilterOr] &&
                this.state.columns[isFilterOr].queryMultipleKeys
                  ? this.state.columns[isFilterOr].queryMultipleKeys!
                  : [];
              let crtFilterContains: any = {};
              if (arr.length > 1 && operator !== "ne") {
                arr.forEach((i) => {
                  crtFilterContains[`tolower(${i})`] = { [operator]: val };
                });
                filterWith.push({ or: crtFilterContains });
                break;
              } else {
                let rs = arr.map((i) => {
                  return { [`tolower(${i})`]: { [operator]: val } };
                });
                filterWith.push({ and: rs });
                break;
              }
            }
            filterWith.push(filterDefault);
            break;
        }
      });
    }
    let AndObj: any = {
      and: [],
    };
    AndObj.and = filterWith;
    if (filterWith.length > 0 || orderByAr.length > 0) {
      return buildQuery({ filter: AndObj, orderBy: orderByAr });
    }
    return "";
  };

  private _mapSelectionSort = (str: string): OrderValue => {
    if (str === "aToZ") {
      return OrderValue.asc;
    }
    return OrderValue.desc;
  };

  private _onHandleSortInOffline = async (
    key: string,
    queries?: IFilterQuery[],
    newCols?: IColumnDl[]
  ) => {
    if (this.state.workingColumn) {
      let newItems = await _copyAndSort(
        this.state.items,
        this.state.workingColumn.fieldName,
        this.state.workingColumn.isSortedDescending
      );
      let sortGr = [...this.state.groups];
      if (this.props.groups) {
        let newGr = this._onHandleSortGroups();
        sortGr = newGr.groups;
      }
      this.setState({
        items: newItems,
        columns: newCols ? newCols : this.state.columns,
        contextualMenu: undefined,
        groups: sortGr,
        filterQuery: queries ? queries : this.state.filterQuery,
      });
    }
  };

  // get value base on queryKey of column
  private _onHandleGetValueByChildQuery = (
    item: any,
    firstKey: string,
    lastKey: string,
    colKey: string,
    childObj?: any
  ) => {
    let obj = item[firstKey];
    if (this.state.workingColumn && !this.state.workingColumn.queryKey) {
      return item[colKey];
    }

    // case in first act
    if (!childObj && typeof item === "object") {
      for (const key in obj) {
        if (key === lastKey && typeof obj[key] !== "object") {
          return obj[key];
        }
        if (
          key === lastKey &&
          typeof obj[key] === "object" &&
          !Array.isArray(obj[key])
        ) {
          this._onHandleGetValueByChildQuery(item, firstKey, lastKey, obj[key]);
        }
        if (
          key === lastKey &&
          typeof obj[key] === "object" &&
          Array.isArray(obj[key])
        ) {
          obj[key].forEach((i: any) => {
            if (typeof i === "object") {
              this._onHandleGetValueByChildQuery(item, firstKey, lastKey, i);
            }
          });
        }
      }
    }
    // case child is object
    if (childObj && typeof childObj === "object" && !Array.isArray(childObj)) {
      for (const key in childObj) {
        if (key === lastKey && typeof childObj[key] !== "object") {
          return childObj[key];
        }
        if (
          key === lastKey &&
          typeof childObj[key] === "object" &&
          !Array.isArray(childObj[key])
        ) {
          this._onHandleGetValueByChildQuery(
            item,
            firstKey,
            lastKey,
            childObj[key]
          );
        }
        if (
          key === lastKey &&
          typeof childObj[key] === "object" &&
          Array.isArray(childObj[key])
        ) {
          childObj[key].forEach((i: any) => {
            if (typeof i === "object") {
              this._onHandleGetValueByChildQuery(item, firstKey, lastKey, i);
            }
          });
        }
      }
    }
    // case child is array
    if (childObj && typeof childObj === "object" && Array.isArray(childObj)) {
      childObj.forEach((i: any) => {
        if (typeof i === "object") {
          this._onHandleGetValueByChildQuery(item, firstKey, lastKey, i);
        }
      });
    }
  };

  private _onHandleFilterInOffline = (
    operator: string,
    colKey: string,
    value?: any
  ): any[] => {
    let crtItems = [...this.state.items];
    let queryKey =
      this.state.workingColumn && this.state.workingColumn.queryKey
        ? this.state.workingColumn.queryKey
        : "";
    let queryArr = queryKey.split("/");
    switch (operator) {
      case "gt":
        if (typeof value === "string") {
          let resultGreater = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            if (typeof value === "string" && keyFilter > parseInt(value)) {
              return true;
            }
            return false;
          });
          return resultGreater;
        }
        if (Object.prototype.toString.call(value) === "[object Date]") {
          let resultDateGreater = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            let date = new Date(keyFilter);
            if (value && date.valueOf() > value.valueOf()) {
              return true;
            }
            return false;
          });
          return resultDateGreater;
        }
        return [];

      case "lt":
        if (typeof value === "string") {
          let resultLessThan = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            if (typeof value === "string" && keyFilter < parseInt(value)) {
              return true;
            }
            return false;
          });
          return resultLessThan;
        }
        if (Object.prototype.toString.call(value) === "[object Date]") {
          let resultDateLessThan = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            let date = new Date(keyFilter);
            if (value && date.valueOf() < value.valueOf()) {
              return true;
            }
            return false;
          });
          return resultDateLessThan;
        }
        return [];

      case "ge":
        if (typeof value === "string") {
          let resultGreaterOrEqual = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            if (typeof value === "string" && keyFilter >= parseInt(value)) {
              return true;
            }
            return false;
          });
          return resultGreaterOrEqual;
        }
        if (Object.prototype.toString.call(value) === "[object Date]") {
          let resultDateGreaterOrEqual = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            let date = new Date(keyFilter);
            if (value && date.valueOf() >= value.valueOf()) {
              return true;
            }
            return false;
          });
          return resultDateGreaterOrEqual;
        }
        return [];

      case "le":
        if (typeof value === "string") {
          let resultLessThanOrEqual = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            if (typeof value === "string" && keyFilter <= parseInt(value)) {
              return true;
            }
            return false;
          });
          return resultLessThanOrEqual;
        }
        if (Object.prototype.toString.call(value) === "[object Date]") {
          let resultDateLessThanOrEqual = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            let date = new Date(keyFilter);
            if (value && date.valueOf() <= value.valueOf()) {
              return true;
            }
            return false;
          });
          return resultDateLessThanOrEqual;
        }
        return [];

      case "eq":
        if (typeof value === "string") {
          let resultEqual = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            if (keyFilter.toLocaleLowerCase() === value.toLocaleLowerCase()) {
              return true;
            }
            return false;
          });
          return resultEqual;
        }
        if (Object.prototype.toString.call(value) === "[object Date]") {
          let resultDate = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            let selectedDate = new Date(keyFilter);
            if (
              selectedDate.setHours(0, 0, 0, 0).valueOf() === value?.valueOf()
            ) {
              return true;
            }
            return false;
          });
          return resultDate;
        }
        return [];

      case "ne":
        let resultNotEqual = crtItems.filter((item) => {
          let keyFilter = this._onHandleGetValueByChildQuery(
            item,
            queryArr[0],
            queryArr[queryArr.length - 1],
            colKey
          );
          if (keyFilter.toLocaleLowerCase() !== value.toLocaleLowerCase()) {
            return true;
          }
          return false;
        });
        return resultNotEqual;

      case "contains":
        if (typeof value === "string") {
          let resultContain = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            if (
              keyFilter
                .toLocaleLowerCase()
                .indexOf(value.toLocaleLowerCase()) !== -1
            ) {
              return true;
            }
            return false;
          });
          return resultContain;
        }
        if (Array.isArray(value)) {
          let resultDateContain = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            let selectedDate = new Date(keyFilter);
            if (Array.isArray(value)) {
              let index = value?.findIndex(
                (val: { date: Date }) =>
                  val.date.valueOf() ===
                  selectedDate.setHours(0, 0, 0, 0).valueOf()
              );
              if (index !== -1) {
                return true;
              }
            }
            return false;
          });
          return resultDateContain;
        }
        return [];

      case "not":
        if (typeof value === "string") {
          let resultNotContain = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            if (
              keyFilter
                .toLocaleLowerCase()
                .indexOf(value.toLocaleLowerCase()) === -1
            ) {
              return true;
            }
            return false;
          });
          return resultNotContain;
        }
        if (Array.isArray(value)) {
          let resultDateNotWithIn = crtItems.filter((item) => {
            let keyFilter = this._onHandleGetValueByChildQuery(
              item,
              queryArr[0],
              queryArr[queryArr.length - 1],
              colKey
            );
            let selectedDate = new Date(keyFilter);
            if (
              (value &&
                Array.isArray(value) &&
                selectedDate.valueOf() < value[0].date.valueOf()) ||
              (value &&
                Array.isArray(value) &&
                selectedDate.valueOf() >
                  value[value.length - 1].date
                    .setHours(23, 59, 59, 0)
                    .valueOf())
            ) {
              return true;
            }
            return false;
          });
          return resultDateNotWithIn;
        }
        return [];

      case "boolean":
        let resultBoolean = crtItems.filter((item) => {
          let keyFilter = this._onHandleGetValueByChildQuery(
            item,
            queryArr[0],
            queryArr[queryArr.length - 1],
            colKey
          );
          if (keyFilter === value) {
            return true;
          }
          return false;
        });
        return resultBoolean;

      default:
        return [];
    }
  };

  private _onHandleSortGroups = (): { items: any[]; groups: any[] } => {
    let result: any[] = [];
    let newGroups: any[] = [];
    let crtGroups = [...this.state.groups];
    let crtItems = [...this.state.items];
    if (this.props.groups && crtGroups.length > 0) {
      crtGroups.forEach((gr) => {
        let childArr = crtItems.splice(gr.startIndex);
        if (gr.key !== "lastGroup") {
          childArr = crtItems.splice(gr.startIndex, gr.count);
        }
        let groupItems = [];
        if (this.state.workingColumn) {
          groupItems = _copyAndSort(
            childArr,
            this.state.workingColumn.fieldName,
            this.state.workingColumn.isSortedDescending
          );
        }
        result = [...result, ...groupItems];
      });
      if (
        this.state.workingColumn &&
        this.state.workingColumn.fieldName === "name"
      ) {
        newGroups = _copyAndSort(
          crtGroups,
          "name",
          this.state.workingColumn.isSortedDescending
        );
      }
      return { items: result, groups: newGroups };
    }
    return { items: [], groups: [] };
  };

  // handle sort base on sortQuery
  private _onHandleSelectSortInContextual = async (key: string) => {
    let newCols = [...this.state.columns];
    let crtQuery = [...this.state.filterQuery];
    // filter
    if (key === "filterBy") {
      this.setState({
        isPanelVisible: true,
      });
    }
    // sort
    if (key !== "filterBy") {
      const sortList: any = {
        aToZ: [true],
        zToA: [false],
      };
      newCols = this.state.columns.map((col) => {
        col.isSorted = false;
        if (
          this.state.workingColumn &&
          col.key === this.state.workingColumn.key
        ) {
          col.isSorted = true;
          col.isSortedDescending = !sortList[key][0];
        }
        return col;
      });
      let crtWorkingCol = { ...this.state.workingColumn } as IColumnDl;
      crtWorkingCol.isSortedDescending = !sortList[key][0];
      await this.setState({ workingColumn: crtWorkingCol });
      let index = crtQuery.findIndex((q) => q.type === FilterType.Sort);
      if (index === -1) {
        let defaultObj = await this._BuildDefaultSortObj();
        let defaultFilter: IFilterQuery = {
          columnKey: defaultObj.key,
          key: defaultObj.fieldName,
          value: "",
          operator: "",
          order: OrderValue.asc,
          type: FilterType.Sort,
          childQuery: this.state.workingColumn
            ? this.state.workingColumn.queryKey
            : undefined,
        };
        crtQuery.unshift(defaultFilter);
      }
      if (index !== -1 && this.state.workingColumn) {
        let filterItem: IFilterQuery = {
          columnKey: this.state.workingColumn.key,
          key: this.state.workingColumn.fieldName
            ? this.state.workingColumn.fieldName
            : "",
          value: "",
          operator: "",
          order: this._mapSelectionSort(key),
          type: FilterType.Sort,
          childQuery: this.state.workingColumn
            ? this.state.workingColumn.queryKey
            : undefined,
        };
        crtQuery[index] = filterItem;
      }
      // sort in offline mode
      if (
        (key !== "filterBy" && this.props.items && this.props.isOffline) ||
        (typeof this.props.isOffline === "boolean" && this.props.isOffline)
      ) {
        this._onHandleSaveToLocalStorage();
        return this._onHandleSortInOffline(key, crtQuery, newCols);
      }
      // sort in online mode
      if (key !== "filterBy" && !this.props.items && !this.props.isOffline) {
        await this.setState({ filterQuery: crtQuery, columns: newCols });
        this._onHandleSaveToLocalStorage();
        return this.onHandleQueryDataByClassType();
      }
    }
  };

  private _onHandleChangeQueryState = (
    operator: string,
    colKey: string,
    value?: any
  ): IFilterQuery[] => {
    let crtQuery = [...this.state.filterQuery];
    let item: IFilterQuery = {
      columnKey: colKey,
      key: this.state.workingColumn ? this.state.workingColumn.key : "",
      operator,
      value,
      order: "",
      type: FilterType.Filter,
      childQuery: this.state.workingColumn
        ? this.state.workingColumn.queryKey
        : undefined,
    };
    let index = crtQuery.findIndex((q) => q.key === item.key);
    if (index === -1) {
      crtQuery.push(item);
    }
    if (index !== -1) {
      crtQuery[index] = item;
    }
    return crtQuery;
  };

  private _onHandleSentSelecteGroups = () => {
    if (this.props.onGetSelecteGroupList) {
      this.props.onGetSelecteGroupList(this.state.selectedGroups);
    }
  };

  // handle filter base on filter query
  onGetFilterObj = (operator: string, colKey: string, value?: any) => {
    let crtColumns = [...this.state.columns];
    let queryArr = this._onHandleChangeQueryState(operator, colKey, value);
    let rs = crtColumns.map((col) => {
      if (
        this.state.workingColumn &&
        col.key === this.state.workingColumn.key
      ) {
        col.isFilter = true;
        return col;
      }
      return col;
    });
    // filter in offline mode
    if (
      this.props.items ||
      (typeof this.props.isOffline === "boolean" && this.props.isOffline)
    ) {
      let result = this._onHandleFilterInOffline(operator, colKey, value);
      return this.setState(
        {
          items: result,
          isPanelVisible: false,
          columns: rs,
          filterQuery: queryArr,
        },
        () => {
          this._onHandleSaveToLocalStorage();
        }
      );
    }
    // filter in online mode
    if (!this.props.items && !this.props.isOffline) {
      this.setState(
        {
          columns: rs,
          isPanelVisible: false,
          filterQuery: queryArr,
        },
        () => {
          this._onHandleSaveToLocalStorage();
          this.onHandleQueryDataByClassType();
        }
      );
      return;
    }
  };

  onHandleUpdateDataCaseLazy = (source: any[], page?: number) => {
    let groups = [...this.state.groups];
    let sourceItems = [...this.state.items, ...source];
    let keys = [];
    if (this.props.groupBy) {
      keys = this._onHandleBuildItemsWithGroupBy(sourceItems);
      sourceItems = this._BuildItemsByGoupByKeys(keys, sourceItems);
      groups = this._BuildMyGroupFromKeys(keys, sourceItems);
    }
    return this.setState(
      {
        items: sourceItems,
        page: page ? page : this.state.page + 1,
        isLastPage: source.length < this.state.skipNumber ? true : false,
        isCallingWithLazy: false,
        groups,
      },
      () => this.onHandleSetSelectedItems()
    );
  };

  onHandleUpdateDataCaseFirst = (source: any[]) => {
    let groups = [...this.state.groups];
    let sourceItems = [...source];
    let keys = [];
    if (this.props.groupBy) {
      keys = this._onHandleBuildItemsWithGroupBy(sourceItems);
      sourceItems = this._BuildItemsByGoupByKeys(keys, sourceItems);
      groups = this._BuildMyGroupFromKeys(keys, sourceItems);
    }
    return this.setState(
      {
        items: sourceItems,
        page: 1,
        isLastPage: source.length < this.state.skipNumber ? true : false,
        groups,
      },
      () => this.onHandleSetSelectedItems()
    );
  };

  // change current data
  onHandleQueryClassSource = (
    source: any[],
    page?: number,
    isLazy?: boolean
  ) => {
    // case load
    if (!isLazy) {
      this.onHandleUpdateDataCaseFirst(source);
    }
    // case lazy loading
    if (isLazy) {
      this.onHandleUpdateDataCaseLazy(source, page);
    }
  };

  // call api & get data
  onHandleQueryDataByClassType = async (isLazy?: boolean) => {
    let crtFilter = [...this.state.filterQuery];
    let endpoint = await this._BuildEndpointWithSortAndFilter();
    let crtPage = this.state.page;
    if (isLazy) {
      crtPage++;
    } else {
      crtPage = 1;
    }
    let srtEndpoint = `${endpoint}`;
    if (crtFilter.length > 1) {
      crtFilter.forEach((f) => {
        let subStrUTF = `'tolower(''${escape(f.value).replaceAll(
          "%24",
          "$"
        )}'')'`;
        let subStr = `'tolower(''${f.value}'')'`;
        if (
          srtEndpoint.indexOf(subStr) !== -1 &&
          srtEndpoint.indexOf("tolower") !== -1
        ) {
          srtEndpoint = srtEndpoint.replaceAll(
            subStr,
            `tolower('${escape(f.value)}')`
          );
        } else if (
          srtEndpoint.indexOf(subStrUTF) !== -1 &&
          srtEndpoint.indexOf("tolower") !== -1
        ) {
          srtEndpoint = srtEndpoint.replaceAll(
            subStrUTF,
            `tolower('${escape(f.value)}')`
          );
        }
        // special case
        let specialCase = "'tolower('''''')'";
        if (
          srtEndpoint.indexOf(specialCase) !== -1 &&
          srtEndpoint.indexOf("tolower") !== -1
        ) {
          srtEndpoint = srtEndpoint.replaceAll(specialCase, `tolower('''')`);
        }
      });
    }
    this.props.queryClass
      .GetData(
        crtPage,
        this.state.skipNumber,
        this.props.queryClass.nextLink,
        // this.state.defaultURL,
        srtEndpoint
      )
      .then((res) => {
        if (res && !this.props.queryClass.receiveBySinalR) {
          this.onHandleQueryClassSource(
            this.props.queryClass.source,
            crtPage,
            isLazy
          );
        }
      })
      .catch((err) => {
        this.setState({
          nextLink: "",
          isLastPage: true,
        });
      });
  };

  // change filterQuery state to default
  onCancelFilter = async (key: string) => {
    let defaultObj = await this._BuildDefaultSortObj();
    let crtQuery = [...this.state.filterQuery].filter((f) => f.key !== key);
    let defaultFilter = [
      {
        columnKey: defaultObj.key,
        key: defaultObj.fieldName,
        value: "",
        operator: "",
        order: OrderValue.asc,
        type: FilterType.Sort,
      },
    ];
    let newCols = this.state.columns.map((col) => {
      if (col.key === key) {
        col.isFilter = false;
        col.isSorted = false;
      }
      return col;
    });
    if (
      this.props.items &&
      this.props.isOffline
      //  ||
      // (typeof this.props.isOffline === "boolean" && this.props.isOffline)
    ) {
      return this.setState(
        {
          columns: newCols,
          items: this.props.items || [],
          filterQuery: crtQuery.length > 0 ? crtQuery : defaultFilter,
          page: 1,
          nextLink: "",
          workingColumn: null,
          isLastPage: false,
        },
        () => {
          this._onHandleSaveToLocalStorage();
          this._onHandleCheckMode();
        }
      );
    }
    return this.setState(
      {
        items: [],
        columns: newCols,
        filterQuery: crtQuery.length > 0 ? crtQuery : defaultFilter,
        page: 1,
        nextLink: "",
        workingColumn: null,
        isLastPage: false,
      },
      () => {
        this._onHandleSaveToLocalStorage();
        this._onHandleCheckMode();
      }
    );
  };

  onChoiceItemSort = (
    ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ): void => {
    if (item) {
      this._onResetPageIndex();
      let currentKey = item?.key;
      setTimeout(() => {
        this._onHandleSelectSortInContextual(currentKey);
      }, 0);
    }
  };

  onSetVisiblePanel = () => {
    this.setState({
      isPanelVisible: !this.state.isPanelVisible,
    });
  };

  onHandleScrollList = (event: React.MouseEvent<HTMLDivElement, UIEvent>) => {
    let name = this.props.rcName ? `scr.${this.props.rcName}` : "scr";
    let list: HTMLElement = document.querySelectorAll(
      `[data-rc-id*="${name}"]`
    )[0] as HTMLElement;
    if (
      !this.props.isDisableLazyLoading &&
      list &&
      (Math.floor(list.scrollTop) === list.scrollHeight - list.offsetHeight ||
        Math.floor(list.scrollTop) - 1 ===
          list.scrollHeight - list.offsetHeight) &&
      Math.floor(list.scrollTop) !== 0
      // (Math.ceil(list.scrollTop) === list.scrollHeight - list.offsetHeight ||
      //   Math.floor(list.scrollTop) === list.scrollHeight - list.offsetHeight)
    ) {
      if (
        (!this.state.isLastPage &&
          !this.props.items &&
          !this.props.isOffline &&
          !this.state.isCallingWithLazy) ||
        (!this.state.isLastPage &&
          !this.props.items &&
          this.props.isOffline &&
          !this.state.isCallingWithLazy)
      ) {
        this.setState({ isCallingWithLazy: true });
        this.onHandleQueryDataByClassType(true);
      }
    }
  };

  onHandleSelectedGroups = async (groups: IGroup | IGroup[]) => {
    let crtGroups = [...this.state.selectedGroups];
    if (Array.isArray(groups)) {
      if (groups.length > crtGroups.length) {
        crtGroups = groups;
      } else if (groups.length === crtGroups.length) {
        let difference = groups.filter((gr) => !crtGroups.includes(gr));
        if (difference.length > 0) {
          crtGroups = groups;
        }
        if (difference.length === 0) {
          crtGroups = [];
        }
      }
    } else {
      let idx = crtGroups.findIndex((gr) => gr.key === groups.key);
      if (idx === -1) {
        crtGroups.push(groups);
      }
      if (idx !== -1) {
        crtGroups.splice(idx, 1);
      }
    }
    await this.setState({ selectedGroups: crtGroups }, () =>
      this._onHandleSentSelecteGroups()
    );
  };

  onHandleClickGroupTitle = (group: IGroup) => {
    if (this.props.onGroupTitleClick) {
      this.props.onGroupTitleClick(group);
    }
  };

  public render() {
    const nameAttibute = "data-rc-id";
    let listRcId = { [nameAttibute]: `dl.${this.props.rcName}` };
    return (
      <MainWrapper
        onScroll={this.onHandleScrollList}
        theme={{ ...this.state, darkMode: this.props.darkMode }}
        className="MainWrapper"
        {...listRcId}
      >
        <ScrollablePane
          rcName={this.props.rcName}
          scrollbarVisibility={ScrollbarVisibility.auto}
        >
          <MarqueeSelection selection={this._selection}>
            <ShimmeredDetailsList
              customLoading={this.props.customLoading}
              items={this.state.items}
              compact={false}
              columns={this.state.columns}
              groups={
                this.state.groups.length > 0 ? this.state.groups : undefined
              }
              // isLoading changed but this component doesn't re-render
              enableShimmer={this.props.isLoading}
              selectionMode={
                this.props.selectionMode !== undefined
                  ? this.props.selectionMode
                  : SelectionMode.multiple
              }
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              useFastIcons={false}
              groupProps={{
                onRenderHeader: this._onRenderHeader,
                // headerProps: {
                //   onToggleCollapse: this.onHandleToggleGroup,
                // },
              }}
              onRenderRow={this._onRenderRow}
              onRenderDetailsHeader={this._onRenderDetailsHeader}
              onCancelFilter={(key: string) => this.onCancelFilter(key)}
              shimmerLines={this.props.skipNumber}
              viewPort={this.props.viewPort}
              rcName={this.props.rcName}
              onGetSelectedGroups={this.onHandleSelectedGroups}
              isCollapseOnlyByIcon={this.props.isCollapseOnlyByIcon}
              onHandleClickGroupTitle={this.onHandleClickGroupTitle}
              styles={{
                root: [
                  {
                    selectors: {
                      ":after": {
                        backgroundImage:
                          this.props.darkMode === "dark"
                            ? "linear-gradient(transparent 40%, rgb(72, 72, 72) 100%)"
                            : "linear-gradient(transparent 40%, rgb(241, 241, 241) 100%)",
                      },
                    },
                  },
                ],
              }}
              darkMode={this.props.darkMode}
              isEmptyItems={
                !this.props.isLoading && this.state.items.length < 1
                  ? this.props.isEmptyItems
                    ? this.props.isEmptyItems
                    : {
                        title: "No data available.",
                        detail: "",
                      }
                  : undefined
              }
            />
          </MarqueeSelection>
        </ScrollablePane>
        {this.state.contextualMenu && !this.props.isNotAction && (
          <ContextualMenu
            onItemClick={this.onChoiceItemSort}
            {...this.state.contextualMenu}
            rcName={this.props.rcName}
            // theme={this.props.darkMode === "dark" ? darkTheme : lightTheme}
            styles={{
              root: {
                background:
                  this.props.darkMode === "dark" ? "#333333" : "#ffffff",
                border: "transparent",
              },
              subComponentStyles: {
                menuItem: () => {
                  return {
                    root: [
                      {
                        color:
                          this.props.darkMode === "dark"
                            ? "#ffffff"
                            : "#212121",
                      },
                      {
                        selectors: {
                          ":hover": {
                            background:
                              this.props.darkMode === "dark"
                                ? "#445B6C"
                                : "#F4F4F4",
                            color:
                              this.props.darkMode === "dark"
                                ? "#ffffff"
                                : "#212121",
                          },
                          ":active": {
                            background:
                              this.props.darkMode === "dark"
                                ? "#445B6C"
                                : "#F4F4F4",
                            color:
                              this.props.darkMode === "dark"
                                ? "#ffffff"
                                : "#212121",
                          },
                        },
                      },
                    ],
                  };
                },
              },
            }}
            calloutProps={{ styles: { root: { zIndex: 1 } } }}
          />
        )}
        <Panel
          isOpen={this.state.isPanelVisible}
          onDismiss={this.onSetVisiblePanel}
          headerText="Filter by"
          closeButtonAriaLabel="Close"
          isLightDismiss={true}
          customWidth={"560px"}
          isBlocking={this.props.isBlocking}
          type={PanelType.custom}
          rcName={this.props.rcName}
          styles={{
            headerText: {
              fontSize: "21px",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
              fontWeight: "300",
            },
            subComponentStyles: {
              closeButton: {
                icon: {
                  fontSize: "15px",
                  color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
                  fontWeight: "normal",
                },
                rootHovered: {
                  background:
                    this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                  color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
                },
                rootPressed: {
                  backgroundColor:
                    this.props.darkMode === "dark" ? "#333333" : "#c8c8c8",
                },
              },
            },
            content: {
              paddingLeft: "32px",
              height: "100%",
              paddingBottom: 0,
              paddingTop: 15,
              background:
                this.props.darkMode === "dark" ? "#333333" : "#ffffff",
            },
            header: {
              paddingLeft: "32px",
            },
            contentInner: {
              height: "100%",
            },
            scrollableContent: {
              height: "100%",
            },
            commands: {
              margin: 0,
              paddingTop: "10px",
              background:
                this.props.darkMode === "dark" ? "#333333" : "#ffffff",
            },
            root: {
              zIndex: 1,
            },
          }}
        >
          {this.state.workingColumn && (
            <FilterElement
              targetColumn={this.state.workingColumn}
              darkMode={this.props.darkMode}
              onGetFilterObj={this.onGetFilterObj}
              rcName={this.props.rcName}
              filterWithTicks={this.props.filterWithTicks}
              filterQuery={this.state.filterQuery}
              workingColumn={this.state.workingColumn}
            />
          )}
        </Panel>
      </MainWrapper>
    );
  }

  private _onRenderHeader: IDetailsGroupRenderProps["onRenderHeader"] = (
    props
  ) => {
    return <GroupHeader {...props} />;
  };
  private _onRenderDetailsHeader: IDetailsListProps["onRenderDetailsHeader"] = (
    props
  ) => {
    const customStyles: Partial<IDetailsHeaderStyles> = {};
    let colNotAcitons = this.state.columns.filter((col) => col.isNotFilter);
    if (colNotAcitons.length > 0 || this.props.isNotAction) {
      let array = this.props.isNotAction
        ? [...this.state.columns]
        : [...colNotAcitons];
      array.forEach((col) => {
        let btn: HTMLElement = document.querySelectorAll(
          `[data-rc-id='col.${col.key}.${this.props.rcName}']`
        )[0] as HTMLElement;
        if (btn) {
          btn.style.cursor = "default";
          btn.style.background = "transparent";
        }
      });
    }
    if (props) {
      customStyles.root = {
        height: "30px",
        color: this.props.darkMode === "dark" ? "#ffffff" : "#333333",
        background: this.props.darkMode === "dark" ? "#121212" : "#ffffff",
        borderBottom:
          this.props.darkMode === "dark"
            ? "1px solid #000000"
            : "1px solid #EAEAEA",
        paddingBottom: 0,
      };
      return (
        <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
          <DetailsHeader
            {...props}
            styles={customStyles}
            ariaLabelForToggleAllGroupsButton={"Toggle selection"}
          />
        </Sticky>
      );
    }
    return null;
  };

  private _getContextualMenuProps(
    ev: React.MouseEvent<HTMLElement>,
    column: IColumnDl
  ): IContextualMenuProps {
    let items = [
      {
        key: "aToZ",
        name: "A to Z",
        canCheck: true,
      },
      {
        key: "zToA",
        name: "Z to A",
        canCheck: true,
      },
      {
        key: "divider_1",
        itemType: ContextualMenuItemType.Divider,
      },
      {
        key: "filterBy",
        name: "Filter By",
        canCheck: true,
        checked: column.isGrouped,
      },
    ];

    if (this.props.isFilterHidden) {
      items = items.filter((i) => !["filterBy", "divider_1"].includes(i.key));
    }
    if (column.isNotFilter) {
      items = [];
    }
    return {
      items: items,
      target: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: -5,
      // isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed,
    };
  }

  private _getContextualMenuFilterProps(
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): IContextualMenuProps {
    let itemsFilter: {
      key: string;
      name: string;
      onRender?: (
        item: any,
        dismissMenu: (ev?: any, dismissAll?: boolean) => void
      ) => JSX.Element;
    }[] = [];
    let currentColumn = [...this.state.sourceColumns];
    currentColumn.forEach((col) => {
      if (col.key !== "settingCol") {
        itemsFilter.push({ key: col.key, name: col.name });
      }
    });

    if (itemsFilter.length > 0) {
      for (let i = 0; i < itemsFilter.length; i++) {
        itemsFilter[i] = {
          ...itemsFilter[i],
          onRender: (
            item: any,
            dismissMenu: (ev?: any, dismissAll?: boolean) => void
          ) => {
            return (
              <MenuFilterWrapper theme={this.props.darkMode}>
                <Checkbox
                  checked={this.state.filterCols.includes(item.key)}
                  onChange={(e) => this.onCheckFilter(e, itemsFilter[i].key)}
                  title={item.name}
                  label={item.name}
                  rcName={`${item.key}.${this.props.rcName}`}
                  darkMode={this.props.darkMode}
                />
              </MenuFilterWrapper>
            );
          },
        };
      }
    }

    return {
      items: itemsFilter,
      target: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: -5,
      onDismiss: this._onFilterColumn,
    };
  }

  onCheckFilter = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    itemKey?: string
  ) => {
    let crtFilterCols = [...this.state.filterCols];
    if (itemKey) {
      let index = crtFilterCols.findIndex((doc) => doc === itemKey);
      if (index !== -1) {
        crtFilterCols.splice(index, 1);
        this.setState({ filterCols: crtFilterCols });
      }
      if (index === -1) {
        crtFilterCols.push(itemKey);
        this.setState({ filterCols: crtFilterCols });
      }
    }
  };

  private _onFilterColumn = async () => {
    let crtColumn = [...this.state.sourceColumns];
    let crtFilterCols = [...this.state.filterCols];
    if (crtFilterCols.length > 0) {
      let result = crtColumn.filter(
        (col) => crtFilterCols.includes(col.key) || col.key === "settingCol"
      );
      this.setState({ columns: result, contextualMenu: undefined }, () =>
        this._onHandleSaveToLocalStorage()
      );
    }
    if (crtFilterCols.length < 1) {
      this.setState(
        {
          columns: this.state.sourceColumns,
          contextualMenu: undefined,
        },
        () => this._onHandleSaveToLocalStorage()
      );
    }
  };

  private _onContextualMenuDismissed = (): void => {
    this.setState({
      contextualMenu: undefined,
    });
  };

  private _onHandleUniqueArray = (arr: any[]) => {
    let crtArr = [...arr];
    let key = this.props.uniqueItemKey ? this.props.uniqueItemKey : "id";
    let result = crtArr.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
    );
    return result;
  };

  private _getSelectionDetails(): void {
    const selectionItem = this._selection.getSelection();
    if (this.props.onGetSelectionItem) {
      this.props.onGetSelectionItem(selectionItem);
    }
  }

  private _onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      if (this.props.groups) {
        let crtGroup = [...this.state.groups];
        // let lastItemIndexOfGroup = 0;
        if (crtGroup.length > 0) {
          // let lastGroup =
          //   crtGroup.length >= 2
          //     ? crtGroup[crtGroup.length - 2]
          //     : crtGroup[crtGroup.length - 1];
          // lastItemIndexOfGroup = lastGroup.startIndex + lastGroup.count;
        }
      }
      if (props.item.isDisable) {
        customStyles.root = {
          color: props.darkMode === "dark" ? "#D5D5D5" : "#333333",
          borderBottom: "1px solid transparent",
        };
      } else {
        customStyles.root = {
          color: props.darkMode === "dark" ? "#ffffff" : "#333333",
          borderBottom: "1px solid transparent",
        };
      }
      return (
        <DetailsRow
          {...props}
          rowFieldsAs={this.renderRowFields}
          styles={customStyles}
        />
      );
    }
    return null;
  };

  renderRowFields = (props: IDetailsRowFieldsProps) => {
    const onRowFieldsClick = (item: any) => {
      this.props.onRowClick && this.props.onRowClick(item);
    };
    return (
      <span
        id={props.item.key}
        data-selection-disabled={true}
        onClick={() => onRowFieldsClick(props.item)}
      >
        <DetailsRowFields {...props} />
      </span>
    );
  };
}

function _copyAndSort<T>(
  items: T[],
  columnKey?: string,
  isSortedDescending?: boolean
): T[] {
  if (columnKey) {
    const key = columnKey as keyof T;
    let item = items.find((node) => node[key]);
    let typeValue = item && typeof item[key];

    switch (typeValue) {
      case "number":
        return items
          .slice(0)
          .sort((a: T, b: T) =>
            (isSortedDescending ? a[key] < b[key] : a[key] > b[key])
              ? 1
              : a[key] === b[key]
              ? 0
              : -1
          );

      case "boolean":
        return items.slice(0).sort((a: T, b: T) => {
          return isSortedDescending
            ? a[key] === b[key]
              ? 0
              : a[key]
              ? -1
              : 1
            : a[key] === b[key]
            ? 0
            : a[key]
            ? 1
            : -1;
        });

      case "object":
        let isDateObject =
          item && Object.prototype.toString.call(item[key]) === "[object Date]";
        if (isDateObject) {
          return items.splice(0).sort((a: T, b: T) => {
            return (isSortedDescending ? a[key] < b[key] : a[key] > b[key])
              ? 1
              : a[key] === b[key]
              ? 0
              : -1;
          });
        } else {
          return items;
        }

      default:
        return items.slice(0).sort((a: T, b: T) => {
          let stringA: string = String(a[key]).toLocaleLowerCase();
          let stringB: string = String(b[key]).toLocaleLowerCase();
          if (stringA === stringB) {
            return 0;
          } else if (!stringA || !stringB) {
            return 1;
          } else if (isSortedDescending) {
            return stringA < stringB ? -1 : 1;
          } else {
            return stringA < stringB ? 1 : -1;
          }
        });
    }
  }
  return items;
}
