import * as React from "react";
import { ScrollablePane, ScrollbarVisibility } from "../ScrollablePane";
import { Sticky, StickyPositionType } from "../Sticky";
import { Selection, SelectionMode } from "../@uifabric/utilities/selection";
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
} from "../DetailsList";
import { ShimmeredDetailsList } from "../DetailsList/ShimmeredDetailsList";
import { MarqueeSelection } from "../MarqueeSelection";
import {
  StateListWrapper,
  IListProps,
  IListStates,
  IObjectFilter,
  MenuFilterWrapper,
  OrderValue,
  IObjectSort,
  ISortObject,
} from "./ListStyle";
import {
  IContextualMenuProps,
  DirectionalHint,
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
} from "../@uifabric/utilities/ContextualMenu";
import { Panel, PanelType } from "../Panel";
import { Checkbox } from "../Checkbox/index";
import FilterElement from "./filterPanel";
import { IGroup } from "../GroupedList/GroupedList.types";
import buildQuery from "odata-query";
import { Icon } from "../@uifabric/icons/Icon";

export class DetailsListDocumentsExample extends React.Component<
  IListProps,
  IListStates
> {
  private _selection: Selection;
  constructor(props: IListProps) {
    super(props);
    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: [],
      columns: [],
      selectionDetails: this._getSelectionDetails(),
      contextualMenu: undefined,
      isPanelVisible: false,
      currentColumn: null,
      filterItemsResult: undefined,
      filterColumsResult: undefined,
      targetColumn: undefined,
      newFilterColumns: [],
      filterData: [],
      groups: [],
      filterGroupResult: [],
      sortData: {
        count: 0,
        order: OrderValue.desc,
        key: "",
      },
      defaultURL: this.props.queryURL,
      currentURL: "",
      pageIndex: 1,
      skipNumber: this.props.itemCount,
      isLoadingLazy: false,
      isLastPage: false,
      nextLink: null,
    };
  }

  componentDidMount() {
    this._HandleValues();
  }

  UNSAFE_componentWillReceiveProps(nextProps: IListProps) {
    if (
      nextProps.columns !== this.props.columns ||
      nextProps.items !== this.props.items ||
      this.props.viewPort !== nextProps.viewPort ||
      this.props.queryURL !== nextProps.queryURL ||
      this.props.isLoading !== nextProps.isLoading ||
      this.props.itemCount !== nextProps.itemCount
    ) {
      this.onSetDefaultColumnsNew(
        !this.props.items && !nextProps.items && true
      );
      // this.props.items &&
      //   nextProps.items &&
      //   this.setState({
      //     items: nextProps.items,
      //   });
      this.onHandleQueryClassSource(
        nextProps.queryClass.source,
        this.state.pageIndex
      );
    }

    // set selected item when selectedItems props change to undefined
    if (
      nextProps.selectedItems !== this.props.selectedItems ||
      !nextProps.selectedItems
    ) {
      this.onHandleSetSelectedItems(nextProps.selectedItems);
    }

    if (
      this.props.queryClass.source !== nextProps.queryClass.source &&
      this.props.isLoading !== nextProps.isLoading &&
      this.props.isLoading
    ) {
      this.onHandleQueryClassSource(
        nextProps.queryClass.source,
        this.state.pageIndex
      );
    }
  }

  onHandleQueryDataByClassType = (isLazy?: boolean) => {
    let endpoint = this._BuildEndpointWithSortAndFilter();
    let crtPageIndex = this.state.pageIndex;
    if (isLazy) {
      crtPageIndex = crtPageIndex + 1;
    } else {
      crtPageIndex = 1;
    }
    this.props.queryClass
      .GetData(
        crtPageIndex,
        this.state.skipNumber,
        this.state.nextLink,
        this.state.defaultURL,
        endpoint
      )
      .then((res) => {
        if (res) {
          this.onHandleQueryClassSource(
            this.props.queryClass.source,
            crtPageIndex,
            isLazy
          );
        }
      })
      .then((res) => {
        this.onHandleSetSelectedItems(this.props.selectedItems);
      })
      .catch((err) => {
        this.setState({
          isLoadingLazy: false,
          nextLink: null,
          isLastPage: true,
        });
      });
  };

  private _isChildArray = (child: any[], parent: any[]): boolean => {
    let result = true;
    if (parent.length >= child.length) {
      let rs = child.some((c) =>
        parent
          .map((p) => {
            return p.id;
          })
          .includes(c.id)
      );
      if (!rs) {
        return false;
      }
    } else {
      return false;
    }
    return result;
  };

  private _mergeItemsWithSource = (items: any[], source: any[]): any[] => {
    let crtItems = items.length > 0 ? [...items] : [...source];
    let isChild = this._isChildArray(items, source);
    if (items.length > 0 && !isChild) {
      source.forEach((s) => {
        let index = items.findIndex((i) => s.id === i.id);
        if (index === -1) {
          crtItems.push(s);
        }
      });
    }
    if (items.length > 0 && isChild) {
      crtItems = [...source];
    }
    return crtItems;
  };

  onHandleQueryClassSource = (
    source: any[],
    crtPageIndex: number,
    isLazy?: boolean
  ) => {
    if (!isLazy && source && source.length > 0) {
      // let nextLink = "@odata.nextLink";
      return this.setState({
        items: this._mergeItemsWithSource(this.state.items, source),
        // items: source,
        // filterItemsResult: undefined,
        isLoadingLazy: false,
        isLastPage: source.length < this.props.itemCount ? true : false,
        pageIndex: crtPageIndex,
        nextLink: null,
      });
    }

    // case after sort and concat
    else if (
      isLazy &&
      this.state.filterItemsResult &&
      this.state.filterItemsResult.length > 0 &&
      source &&
      source.length > 0
    ) {
      // let nextLink = "@odata.nextLink";
      return this.setState({
        filterItemsResult: this._mergeItemsWithSource(
          this.state.filterItemsResult,
          source
        ),
        isLoadingLazy: false,
        isLastPage: source.length < this.props.itemCount ? true : false,
        pageIndex: crtPageIndex,
        nextLink: null,
      });
    }

    // case after sort
    else if (
      isLazy &&
      !this.state.filterItemsResult &&
      source &&
      source.length > 0
    ) {
      // let nextLink = "@odata.nextLink";
      return this.setState({
        filterItemsResult: this._mergeItemsWithSource(this.state.items, source),
        // filterItemsResult: [...this.state.items, ...source],
        isLoadingLazy: false,
        isLastPage: source.length < this.props.itemCount ? true : false,
        pageIndex: crtPageIndex,
        nextLink: null,
      });
    }
    if (source && source.length < 1) {
      this.setState({
        isLoadingLazy: false,
        isLastPage: true,
      });
    }
  };

  private _BuildDefaultSortObj = (): string => {
    let index = 99;
    let keyCol = "";
    this.props.columns.forEach((col) => {
      if (col.priority && col.fieldName && col.priority < index) {
        index = col.priority;
        keyCol = col.fieldName;
      }
    });
    return keyCol;
  };

  private _HandleValues = async () => {
    let defaultKey = await this._BuildDefaultSortObj();
    let listStorage = JSON.parse(localStorage.getItem("listData")!);
    let listName = this.props.rcName
      ? this.props.rcName
      : this.props.columns[0].key;
    let index = listStorage
      ? listStorage.findIndex((item: any) => item.listName === listName)
      : -1;
    let val = index !== -1 ? listStorage[index].filterColumn : null;
    //handle is online & offline mode
    let sort: IObjectSort = {
      count: 0,
      order: OrderValue.asc,
      key: defaultKey,
    };
    // if localstorage have data save it to state
    if (listStorage && index !== -1) {
      let dataLocalStorage = listStorage[index];
      if (dataLocalStorage.sortQuery && dataLocalStorage.sortQuery.key !== "") {
        sort = dataLocalStorage.sortQuery;
      }
      this.setState({
        filterData:
          dataLocalStorage.filterQuery &&
          dataLocalStorage.filterQuery.length > 0
            ? dataLocalStorage.filterQuery
            : [],
        newFilterColumns:
          dataLocalStorage.filterColumn &&
          dataLocalStorage.filterColumn.length > 0
            ? dataLocalStorage.filterColumn
            : [],
        sortData: sort,
        isLastPage:
          dataLocalStorage.filterQuery &&
          dataLocalStorage.filterQuery.length > 0
            ? true
            : false,
      });
      this.onSetDefaultColumnsNew(val && val.length > 0 ? true : undefined);
    } else {
      this.setState({ sortData: sort });
      this.onSetDefaultColumnsNew();
    }
    if (!this.props.items || !this.props.isOffline) {
      this.onHandleOnlineMode();
    }
    if (this.props.items) {
      this.onHandleOfflineMode();
    }
  };

  private _onHandleScrollList = async (
    event: React.MouseEvent<HTMLDivElement, UIEvent>
  ) => {
    let crtColumn = [...this.state.columns];
    let name = this.props.rcName ? `scr.${this.props.rcName}` : "scr";
    let list: HTMLElement = document.querySelectorAll(
      `[data-rc-id*="${name}"]`
    )[0] as HTMLElement;
    if (
      list &&
      Math.floor(list.scrollTop) === list.scrollHeight - list.offsetHeight
      // || Math.ceil(list.scrollTop) === list.scrollHeight - list.offsetHeight)
    ) {
      let index = crtColumn.findIndex((item) => item.isSorted);
      if (index !== -1) {
        crtColumn[index].isSorted = false;
        this.setState({ columns: crtColumn });
      }
      if (!this.state.isLastPage) {
        this.onHandleQueryDataByClassType(true);
      }
    }
  };

  onHandleOfflineMode = () => {
    if (this.props.items) {
      this.setState({
        items: this.props.items,
      });
    }
  };

  // filter , sort ,filterColumn
  onHandleOnlineMode = async () => {
    let listStorage = JSON.parse(localStorage.getItem("listData")!);
    let listName = this.props.rcName
      ? this.props.rcName
      : this.props.columns[0].key;
    let index = listStorage
      ? listStorage.findIndex((item: any) => item.listName === listName)
      : -1;

    // handle query without localstorage
    if (index === -1 && !this.props.items) {
      // concat items by new data (lazy loading)
      // this.setState({ isLoadingLazy: true });
      this.onHandleQueryDataByClassType();
    }

    // handle query with localstorage
    if (index !== -1 && listStorage && !this.props.items) {
      let listData = listStorage[index];
      await this.setState({
        sortData: listData.sortQuery,
        filterData:
          listData.filterQuery && listData.filterQuery.length > 0
            ? listData.filterQuery
            : [],
      });

      // exist localstorage
      if (
        listData.sortQuery ||
        listData.filterQuery ||
        (listData.filterQuery && listData.filterQuery.length > 0)
      ) {
        // exist localstorage but have query object
        this.onBuildQuery(listData.sortQuery, listData.filterQuery);
      } else {
        // exist localstorage but dont have any query object
        // this.setState({ isLoadingLazy: true });
        this.onHandleQueryDataByClassType();
      }
    }
  };

  onHandleSetSelectedItems = (items?: any[]) => {
    const selectionItems = this._selection.getSelection();
    let newSelection = this._selection;
    if (
      items &&
      items.length > 0 &&
      JSON.stringify(selectionItems) !==
        JSON.stringify(this.props.selectedItems) &&
      selectionItems.length < 1
    ) {
      let itemsBuilded = this.state.items
        ? this.state.items.map((item) => {
            return { ...item, key: item.id || item.key };
          })
        : [];
      newSelection.setItems(itemsBuilded);
      for (let i = 0; i < itemsBuilded.length; i++) {
        if (items.some((item) => item.id === itemsBuilded[i].id)) {
          newSelection.setKeySelected(`${itemsBuilded[i].key}`, true, false);
        }
      }
    }
    if (!items || items.length === 0) {
      this._selection.setAllSelected(false);
    }
  };

  onHandleSort = async (endpoint: string) => {
    let ent = this._BuildEndpointWithSortAndFilter();
    await this.setState({ filterItemsResult: undefined });
    this.props.queryClass
      .GetData(1, this.state.skipNumber, "", this.state.defaultURL, ent)
      .then((res) => {
        if (this.props.queryClass.source) {
          // let nextLink = "@odata.nextLink";
          this.setState({
            items: this.props.queryClass.source,
            isLoadingLazy: false,
            nextLink: null,
            pageIndex: 1,
          });
        }
      });
  };

  onFilterDataFromServer = (endpoint: string) => {
    let ent = this._BuildEndpointWithSortAndFilter();
    this.props.queryClass
      .GetData(1, this.state.skipNumber, "", this.state.defaultURL, endpoint)
      .then((res) => {
        if (this.props.queryClass.source) {
          // let nextLink = "@odata.nextLink";
          this.setState({
            items: this.props.queryClass.source,
            isLoadingLazy: false,
            nextLink: null,
            pageIndex: 1,
          });
        }
      })
      .then((res) => {
        this.onSetDefaultColumnsNew();
      })
      .catch((err) =>
        this.setState({
          isLoadingLazy: false,
        })
      );
  };

  private _BuildEndpointWithSortAndFilter = (): string => {
    let sortObject = this.state.sortData;
    let filterObj = [...this.state.filterData];
    let listStorage = JSON.parse(localStorage.getItem("listData")!);
    let listName = this.props.rcName
      ? this.props.rcName
      : this.props.columns[0].key;
    let indexList = listStorage
      ? listStorage.findIndex((item: any) => item.listName === listName)
      : -1;
    let data = {
      listName: listName,
      sortQuery: sortObject && sortObject.key !== "" ? sortObject : null,
      filterQuery: filterObj && filterObj.length > 0 ? filterObj : null,
      filterColumn:
        this.state.newFilterColumns.length > 0
          ? this.state.newFilterColumns
          : [],
    };
    let top = this.props.itemCount;
    let result = "";
    // let skip = this.props.itemCount * (this.state.pageIndex - 1);
    if (!listStorage) {
      localStorage.setItem("listData", JSON.stringify([data]));
    }
    //only sort
    if (
      (!filterObj || (filterObj && filterObj.length === 0)) &&
      sortObject &&
      sortObject.key !== ""
    ) {
      if (this.state.sortData !== sortObject) {
        this.setState({
          sortData: {
            count: sortObject.count,
            order: sortObject.order,
            key: sortObject.key,
          },
        });
      }
      result = buildQuery({
        orderBy: [`${sortObject.key} ${sortObject.order}`],
        // top,
        // skip,
      });

      if (listStorage && indexList === -1) {
        let currentListData = [...listStorage];
        currentListData.push(data);
        localStorage.setItem("listData", JSON.stringify(currentListData));
      }
      if (listStorage && indexList !== -1) {
        let rs = listStorage.map((item: any) => {
          if (item.listName === listName) {
            return (item = {
              ...item,
              sortQuery: sortObject,
            });
          }
          return item;
        });
        localStorage.setItem("listData", JSON.stringify(rs));
      }
    }
    //filter without sort
    if (
      filterObj &&
      filterObj.length > 0 &&
      (!sortObject || (sortObject && sortObject.key === ""))
    ) {
      if (this.state.filterData !== filterObj) {
        this.setState({ filterData: filterObj });
      }
      let endpoint: any[] = [];
      filterObj.forEach((filter) => {
        let { key, value, operator } = filter;
        switch (operator) {
          case "contains":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { ge: value[0].date, le: value[value.length - 1].date },
              };
              endpoint.push(filterDateArr);
            } else {
              let filterContains = { [key]: { contains: value } };
              endpoint.push(filterContains);
            }
            break;

          case "not":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { lt: value[0].date, gt: value[value.length - 1].date },
              };
              endpoint.push(filterDateArr);
            } else {
              let filterNot = { not: { [key]: { contains: value } } };
              endpoint.push(filterNot);
            }
            break;

          default:
            let filterDefault = { [key]: { [operator]: value } };
            endpoint.push(filterDefault);
            break;
        }
      });
      result = buildQuery({ filter: endpoint });
      if (listStorage && indexList === -1) {
        let currentListData = [...listStorage];
        currentListData.push(data);
        localStorage.setItem("listData", JSON.stringify(currentListData));
      }
      if (listStorage && indexList !== -1) {
        let rs = listStorage.map((item: any) => {
          if (item.listName === listName) {
            return (item = {
              ...item,
              // sortQuery: null,
              filterQuery: filterObj,
            });
          }
          return item;
        });
        localStorage.setItem("listData", JSON.stringify(rs));
      }
    }
    // filter with sort
    if (
      filterObj &&
      filterObj.length > 0 &&
      sortObject &&
      sortObject.key !== ""
    ) {
      if (this.state.filterData !== filterObj) {
        this.setState({ filterData: filterObj });
      }
      if (this.state.sortData !== sortObject) {
        this.setState({
          sortData: {
            count: sortObject.count,
            order: sortObject.order,
            key: sortObject.key,
          },
        });
      }
      let filterQuery: any[] = [];
      filterObj.forEach((filter) => {
        let { key, value, operator } = filter;
        switch (operator) {
          case "contains":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { ge: value[0].date, le: value[value.length - 1].date },
              };
              filterQuery.push(filterDateArr);
            } else {
              let filterContains = { [key]: { contains: value } };
              filterQuery.push(filterContains);
            }
            break;
          case "not":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { lt: value[0].date, gt: value[value.length - 1].date },
              };
              filterQuery.push(filterDateArr);
            } else {
              let filterNot = { not: { [key]: { contains: value } } };
              filterQuery.push(filterNot);
            }

            break;
          default:
            let filterDefault = { [key]: { [operator]: value } };
            filterQuery.push(filterDefault);
            break;
        }
      });
      let orderByy = [`${sortObject.key} ${sortObject.order}`];
      result = buildQuery({ filter: filterQuery, orderBy: orderByy });
      if (listStorage && indexList === -1) {
        let currentListData = [...listStorage];
        currentListData.push(data);
        localStorage.setItem("listData", JSON.stringify(currentListData));
      }
      if (listStorage && indexList !== -1) {
        let rs = listStorage.map((item: any) => {
          if (item.listName === listName) {
            return (item = {
              ...item,
              sortQuery: sortObject,
              filterQuery: filterObj,
            });
          }
          return item;
        });
        localStorage.setItem("listData", JSON.stringify(rs));
      }
    }
    return result;
  };

  onBuildQuery = async (
    sortObject: IObjectSort,
    filterObj: IObjectFilter[]
  ) => {
    let listStorage = JSON.parse(localStorage.getItem("listData")!);
    let listName = this.props.rcName
      ? this.props.rcName
      : this.props.columns[0].key;
    let indexList = listStorage
      ? listStorage.findIndex((item: any) => item.listName === listName)
      : -1;
    let data = {
      listName: listName,
      sortQuery: sortObject && sortObject.key !== "" ? sortObject : null,
      filterQuery: filterObj && filterObj.length > 0 ? filterObj : null,
      filterColumn:
        this.state.newFilterColumns.length > 0
          ? this.state.newFilterColumns
          : [],
    };
    let top = this.props.itemCount;
    // let skip = this.props.itemCount * (this.state.pageIndex - 1);
    if (!listStorage) {
      localStorage.setItem("listData", JSON.stringify([data]));
    }
    //only sort
    if (
      (!filterObj || (filterObj && filterObj.length === 0)) &&
      sortObject &&
      sortObject.key !== ""
    ) {
      if (this.state.sortData !== sortObject) {
        await this.setState({
          sortData: {
            count: sortObject.count,
            order: sortObject.order,
            key: sortObject.key,
          },
        });
      }
      this.onHandleSort(
        buildQuery({
          orderBy: [`${sortObject.key} ${sortObject.order}`],
          top,
          // skip,
        })
      );

      if (listStorage && indexList === -1) {
        let currentListData = [...listStorage];
        currentListData.push(data);
        localStorage.setItem("listData", JSON.stringify(currentListData));
      }
      if (listStorage && indexList !== -1) {
        let result = listStorage.map((item: any) => {
          if (item.listName === listName) {
            return (item = {
              ...item,
              sortQuery: sortObject,
              // filterQuery: [],
            });
          }
          return item;
        });
        localStorage.setItem("listData", JSON.stringify(result));
      }
    }
    //filter without sort
    if (
      filterObj &&
      filterObj.length > 0 &&
      (!sortObject || (sortObject && sortObject.key === ""))
    ) {
      if (this.state.filterData !== filterObj) {
        this.setState({ filterData: filterObj });
      }
      let endpoint: any[] = [];
      filterObj.forEach((filter) => {
        let { key, value, operator } = filter;
        switch (operator) {
          case "contains":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { ge: value[0].date, le: value[value.length - 1].date },
              };
              endpoint.push(filterDateArr);
            } else {
              let filterContains = { [key]: { contains: value } };
              endpoint.push(filterContains);
            }
            break;

          case "not":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { lt: value[0].date, gt: value[value.length - 1].date },
              };
              endpoint.push(filterDateArr);
            } else {
              let filterNot = { not: { [key]: { contains: value } } };
              endpoint.push(filterNot);
            }
            break;

          default:
            let filterDefault = { [key]: { [operator]: value } };
            endpoint.push(filterDefault);
            break;
        }
      });
      this.onFilterDataFromServer(buildQuery({ filter: endpoint }));
      if (listStorage && indexList === -1) {
        let currentListData = [...listStorage];
        currentListData.push(data);
        localStorage.setItem("listData", JSON.stringify(currentListData));
      }
      if (listStorage && indexList !== -1) {
        let result = listStorage.map((item: any) => {
          if (item.listName === listName) {
            return (item = {
              ...item,
              // sortQuery: null,
              filterQuery: filterObj,
            });
          }
          return item;
        });
        localStorage.setItem("listData", JSON.stringify(result));
      }
    }
    // filter with sort
    if (
      filterObj &&
      filterObj.length > 0 &&
      sortObject &&
      sortObject.key !== ""
    ) {
      if (this.state.filterData !== filterObj) {
        this.setState({ filterData: filterObj });
      }
      if (this.state.sortData !== sortObject) {
        this.setState({
          sortData: {
            count: sortObject.count,
            order: sortObject.order,
            key: sortObject.key,
          },
        });
      }
      let filterQuery: any[] = [];
      await filterObj.forEach((filter) => {
        let { key, value, operator } = filter;
        switch (operator) {
          case "contains":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { ge: value[0].date, le: value[value.length - 1].date },
              };
              filterQuery.push(filterDateArr);
            } else {
              let filterContains = { [key]: { contains: value } };
              filterQuery.push(filterContains);
            }
            break;
          case "not":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { lt: value[0].date, gt: value[value.length - 1].date },
              };
              filterQuery.push(filterDateArr);
            } else {
              let filterNot = { not: { [key]: { contains: value } } };
              filterQuery.push(filterNot);
            }

            break;
          default:
            let filterDefault = { [key]: { [operator]: value } };
            filterQuery.push(filterDefault);
            break;
        }
      });
      let orderByy = [`${sortObject.key} ${sortObject.order}`];
      this.onHandleSort(buildQuery({ filter: filterQuery, orderBy: orderByy }));
      if (listStorage && indexList === -1) {
        let currentListData = [...listStorage];
        currentListData.push(data);
        localStorage.setItem("listData", JSON.stringify(currentListData));
      }
      if (listStorage && indexList !== -1) {
        let result = listStorage.map((item: any) => {
          if (item.listName === listName) {
            return (item = {
              ...item,
              sortQuery: sortObject,
              filterQuery: filterObj,
            });
          }
          return item;
        });
        localStorage.setItem("listData", JSON.stringify(result));
      }
    }
    if (
      sortObject &&
      sortObject.key === "" &&
      (!filterObj || (filterObj && filterObj.length === 0))
    ) {
      this.onHandleQueryDataByClassType();
    }
  };

  onSetDefaultColumnsNew = async (columnsSaved?: boolean) => {
    let listStorage = JSON.parse(localStorage.getItem("listData")!);
    let listName = this.props.rcName
      ? this.props.rcName
      : this.props.columns[0].key;
    let indexList = listStorage
      ? listStorage.findIndex((item: any) => item.listName === listName)
      : -1;
    let val = indexList !== -1 ? listStorage[indexList].filterColumn : null;
    // modify column
    // compare state columns vs props columns
    let arrFiltered: string[] = [];
    this.state.columns.forEach((col) => {
      if (col.isFilter) {
        arrFiltered.push(col.key);
      }
    });
    let newColumns = await this.props.columns.map((col) => {
      if (col.key !== "settingCol") {
        let isHasBeenFilter =
          indexList !== -1 && listStorage && listStorage[indexList].filterQuery
            ? listStorage[indexList].filterQuery.some(
                (item: any) => item.columnKey === col.key
              )
            : arrFiltered.some((item: string) => item === col.key)
            ? true
            : false;
        let isSortedDescending = false;
        if (this.state.sortData && col.fieldName === this.state.sortData.key) {
          isSortedDescending =
            this.state.sortData.order === "desc" ? true : false;
        }
        return (col = {
          ...col,
          isResizable: col.isResizable || true,
          isCollapsible: col.isCollapsible || false, // scroll-x  = true if this true
          isSorted: col.isSorted || false,
          isSortedDescending:
            col.isSortedDescending || isSortedDescending || false,
          sortAscendingAriaLabel: "Sorted A to Z",
          sortDescendingAriaLabel: "Sorted Z to A",
          isPadded: col.isPadded || true,
          maxWidth: col.maxWidth,
          isDisable: col.isDisable || false,
          priority: col.priority || 999,
          isFilter: isHasBeenFilter,
          isNotAction: col.isNotAction || false,
          onColumnClick: this.onHeaderClick,
        });
      } else {
        return col;
      }
    });
    await newColumns.unshift({
      key: "settingCol",
      name: "File Type",
      iconName: "Settings",
      className: "column-icon",
      iconClassName: "settingCol-filter",
      isIconOnly: true,
      isResizable: false,
      isNotAction: false,
      priority: 0,
      fieldName: "icon",
      minWidth: 16,
      maxWidth: 16,
      onColumnClick: this.onRenderColumnFilter,
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
              iconName={
                this.props.columnIconName
                  ? this.props.columnIconName
                  : "PageData"
              }
            />
          </div>
        );
      },
    });
    // exist group
    let currentGroups = this.props.groups ? [...this.props.groups] : [];
    if (this.props.groups && this.props.groups.length > 0) {
      let groupsProps = this.props.groups;
      currentGroups.push({
        key: "lastGroup",
        name: "",
        startIndex:
          groupsProps[groupsProps.length - 1].startIndex +
          groupsProps[groupsProps.length - 1].count,
        count: 10,
        level: 1,
        hasMoreData: true,
        isShowingAll: true,
        isCollapsed: false,
      });
    } else if (columnsSaved && val && val.length >= 0) {
      // exist filterCol
      let existFilterCol = await newColumns.filter(
        (col) => val.includes(col.key) || col.key === "settingCol"
      );
      return await this.setState({
        filterColumsResult: val.length > 0 ? existFilterCol : undefined,
        columns: newColumns,
        groups: this.props.groups && currentGroups,
        currentURL: this.props.queryURL,
      });
    } else if (!columnsSaved && !val) {
      // dont exist filterCol
      return await this.setState({
        columns: newColumns,
        filterColumsResult: undefined,
        groups: this.props.groups && currentGroups,
        currentURL: this.props.queryURL,
      });
    } else {
      // dont exist filterCol
      return await this.setState({
        columns: newColumns,
        groups: this.props.groups && currentGroups,
        currentURL: this.props.queryURL,
      });
    }
  };

  onRenderColumnFilter = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    if (!this.state.contextualMenu) {
      this.setState({
        contextualMenu: this._getContextualMenuFilterProps(ev, column),
        currentColumn: column,
      });
    } else {
      this.onFilterColumn();
      this.setState({
        contextualMenu: undefined,
        currentColumn: column,
      });
    }
  };

  onHeaderClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    this.setState({
      contextualMenu: this._getContextualMenuProps(ev, column),
      currentColumn: column,
    });
  };

  onResetPageIndex = async () => {
    let listItem: HTMLElement = document.getElementsByClassName(
      this.props.rcName
        ? `${this.props.rcName}-scrollPane`
        : "ms-ScrollablePane--contentContainer"
    )[0] as HTMLElement;
    if (listItem) {
      await listItem.scrollTo({ top: 0, behavior: "smooth" });
    }
    await this.setState({
      pageIndex: 1,
      isLastPage: false,
    });
  };

  onAwaitChoiceItem = async (currentKey: any) => {
    const {
      columns,
      items,
      currentColumn,
      filterColumsResult,
      filterItemsResult,
    } = this.state;
    let columnToSort = filterColumsResult ? filterColumsResult : columns;
    let itemsToSort = items;
    const newColumns: IColumn[] = columnToSort.slice();
    if (currentColumn && currentKey !== "filterBy") {
      const currColumn: IColumn = newColumns.filter(
        (currCol) => currentColumn.key === currCol.key
      )[0];
      const sortList: any = {
        aToZ: [true],
        zToA: [false],
      };
      if (this.props.isOffline) {
        newColumns.forEach((newCol: IColumn) => {
          if (newCol === currColumn) {
            currColumn.isSortedDescending = sortList[currentKey][0];
            currColumn.isSorted = true;
          } else {
            newCol.isSorted = false;
            newCol.isSortedDescending = false;
          }
        });
        let newItems = [];
        let result: any = [];
        let newGroups: IGroup[] = [];
        let filterGroup =
          this.state.filterGroupResult &&
          this.state.filterGroupResult.length > 0
            ? this.state.filterGroupResult
            : this.state.groups;
        if (this.props.groups) {
          if (filterGroup && filterGroup.length > 0) {
            filterGroup.forEach((gr) => {
              let currentItems = filterItemsResult
                ? [...filterItemsResult]
                : [...items];
              let childArr =
                gr.key !== "lastGroup"
                  ? currentItems.splice(gr.startIndex, gr.count)
                  : currentItems.splice(gr.startIndex);
              let groupItems = _copyAndSort(
                childArr,
                currColumn.fieldName!,
                currColumn.isSortedDescending
              );
              result = [...result, ...groupItems];
            });
            if (currColumn.fieldName === "name") {
              newGroups = _copyAndSort(
                filterGroup,
                "name",
                currColumn.isSortedDescending
              );
            }
          }
        } else {
          newItems = _copyAndSort(
            itemsToSort,
            currColumn.fieldName!,
            currColumn.isSortedDescending
          );
        }
        if (!filterColumsResult) {
          this.setState({
            columns,
            filterColumsResult: newColumns,
            filterItemsResult: newItems.length > 0 ? newItems : result,
            contextualMenu: undefined,
            filterGroupResult: newGroups.length > 0 ? newGroups : filterGroup,
          });
        }
        if (filterColumsResult) {
          this.setState({
            filterColumsResult: newColumns,
            columns,
            filterItemsResult: newItems.length > 0 ? newItems : result,
            contextualMenu: undefined,
            filterGroupResult: newGroups.length > 0 ? newGroups : filterGroup,
          });
        }
      } else {
        newColumns.forEach((newCol: IColumn) => {
          if (newCol === currColumn) {
            currColumn.isSortedDescending = sortList[currentKey][0];
            currColumn.isSorted = true;
          } else {
            newCol.isSorted = false;
            newCol.isSortedDescending = false;
          }
        });
        this.setState({
          filterColumsResult: newColumns,
          sortData: {
            count: this.state.skipNumber,
            // count: this.state.itemCount,
            order: sortList[currentKey][0] ? OrderValue.asc : OrderValue.desc,
            key: currentColumn.fieldName!,
          },
        });
        this.onBuildQuery &&
          this.onBuildQuery(
            {
              count: this.state.skipNumber,
              order: sortList[currentKey][0] ? OrderValue.asc : OrderValue.desc,
              key: currentColumn.fieldName!,
            },
            this.state.filterData
          );
      }
    }
    if (currentColumn && currentKey === "filterBy") {
      const currColumn: IColumn = newColumns.filter(
        (currCol) => currentColumn.key === currCol.key
      )[0];
      newColumns.forEach((newCol: IColumn) => {
        newCol.isSorted = false;
      });
      if (filterColumsResult) {
        this.setState({
          isPanelVisible: true,
          columns,
          filterColumsResult: newColumns,
          targetColumn: currColumn,
        });
      }
      if (!filterColumsResult) {
        this.setState({
          isPanelVisible: true,
          columns: newColumns,
          targetColumn: currColumn,
        });
      }
    }
  };

  onChoiceItemSort = (
    ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ): void => {
    if (item) {
      this.onResetPageIndex();
      let currentKey = item?.key;
      setTimeout(() => {
        this.onAwaitChoiceItem(currentKey);
      }, 0);
    }
  };

  onSetVisiblePanel = () => {
    this.setState({
      isPanelVisible: !this.state.isPanelVisible,
    });
  };

  onGetResultArr = async (itemsArr: any[], type?: string) => {
    let columnsArr = this.state.columns;
    let currentItem = this.state.items;
    let currentFilterColumn = this.state.filterColumsResult;
    if (!type) {
      let index = columnsArr.findIndex(
        (col) => col.key === this.state.targetColumn?.key
      );
      if (index !== -1) {
        columnsArr[index].isFilter = true;
      }
      if (currentFilterColumn && currentFilterColumn.length > 0) {
        let index = currentFilterColumn.findIndex(
          (col) => col.key === this.state.targetColumn?.key
        );
        if (index !== -1) {
          currentFilterColumn[index].isFilter = true;
        }
      }
    }

    if (
      itemsArr &&
      this.state.groups &&
      this.props.groups &&
      this.props.groups.length > 0
    ) {
      let groupsProps = [...this.state.groups];
      let currentGroup = await groupsProps.map((gr) => {
        return (gr = { ...gr, count: 0, startIndex: 0, isCollapsed: false });
      });
      itemsArr.forEach((item) => {
        let index = currentItem.findIndex(
          (curItem) => curItem.key === item.key
        );
        if (index !== -1) {
          groupsProps.forEach((gr) => {
            if (index >= gr.startIndex && index < gr.startIndex + gr.count) {
              let indexCurGroup = currentGroup.findIndex(
                (doc) => doc.key === gr.key
              );
              if (indexCurGroup !== -1) {
                currentGroup[indexCurGroup].count =
                  currentGroup[indexCurGroup].count + 1;
              }
            }
          });
        }
      });
      let i = currentGroup.length;
      while (i--) {
        if (currentGroup[i].count === 0) {
          currentGroup.splice(i, 1);
        }
      }
      for (let i = 0; i < currentGroup.length; i++) {
        if (i > 0) {
          currentGroup[i].startIndex =
            currentGroup[i - 1].startIndex + currentGroup[i - 1].count;
        }
        if (i === 0) {
          currentGroup[i].startIndex = 0;
        }
      }
      this.setState({
        filterItemsResult: itemsArr,
        filterGroupResult: currentGroup ? currentGroup : this.state.groups,
      });
    }

    if (itemsArr && itemsArr.length > 0 && !this.props.groups) {
      this.setState({
        filterItemsResult: itemsArr,
      });
    }

    this.setState({
      isPanelVisible: false,
    });
  };

  onCancelFilterNew = async (key: string) => {
    let defaultKey = await this._BuildDefaultSortObj();
    let columnsArr = [...this.state.columns];
    let columnsFilteredArr = this.state.filterColumsResult;
    let currentFilter = this.state.filterData;
    let index = currentFilter.findIndex((filter) => filter.columnKey === key);
    let listName = this.props.rcName
      ? this.props.rcName
      : this.props.columns[0].key;
    let listStorage = JSON.parse(localStorage.getItem("listData")!);
    let indexList = listStorage
      ? listStorage.findIndex((item: any) => item.listName === listName)
      : -1;
    let defaultSortObj: IObjectSort = {
      count: 0,
      order: OrderValue.asc,
      key: defaultKey,
    };

    if (listStorage && indexList !== -1) {
      let newListData: any = [...listStorage];
      newListData[indexList].sortQuery = defaultSortObj;
      let dataQuery = newListData[indexList].filterQuery;
      if (dataQuery && dataQuery.length > 0) {
        let index = dataQuery.findIndex(
          (query: any) => query.columnKey === key
        );
        if (index !== -1) {
          dataQuery.splice(index, 1);
        }
      } else {
        dataQuery = null;
      }

      if (index !== -1) {
        currentFilter.splice(index, 1);
      }
      for (const i in columnsArr) {
        if (columnsArr[i].isFilter && columnsArr[i].key === key) {
          columnsArr[i] = { ...columnsArr[i], isFilter: false };
          break;
        }
      }
      if (columnsFilteredArr && columnsFilteredArr.length > 0) {
        for (const i in columnsFilteredArr) {
          if (
            columnsFilteredArr[i].isFilter &&
            columnsFilteredArr[i].key === key
          ) {
            columnsFilteredArr[i] = {
              ...columnsFilteredArr[i],
              isFilter: false,
            };
            break;
          }
        }
      }

      if (
        listStorage.length > 1 &&
        newListData[indexList] &&
        newListData[indexList].filterColumn &&
        newListData[indexList].filterColumn.length < 1
      ) {
        newListData.splice(indexList, 1);
        localStorage.setItem("listData", JSON.stringify(newListData));
      }
      if (
        newListData[indexList] &&
        newListData[indexList].filterColumn &&
        newListData[indexList].filterColumn.length > 0
      ) {
        localStorage.setItem("listData", JSON.stringify(newListData));
      }
      if (
        listStorage.length < 2 &&
        newListData[indexList] &&
        newListData[indexList].filterColumn &&
        newListData[indexList].filterColumn.length < 1
      ) {
        localStorage.removeItem("listData");
      }
    }

    if (!this.props.isOffline) {
      if (currentFilter.length > 0) {
        this.setState({
          columns: columnsArr,
          filterData: currentFilter,
          pageIndex: 1, //fix here
          sortData: defaultSortObj,
        });
        this.onBuildQuery &&
          this.onBuildQuery(this.state.sortData, currentFilter);
      }
      if (currentFilter.length < 1) {
        await this.setState({
          items: [],
          filterData: currentFilter,
          filterGroupResult: [],
          columns: columnsArr,
          filterItemsResult: undefined,
          pageIndex: 1,
          sortData: defaultSortObj,
        });
        !this.props.items
          ? this.onHandleQueryDataByClassType()
          : // ? this.onGetItemLazy(this.state.itemCount, "remove")
            this.setState({ items: this.props.items });
      }
    }
    if (this.props.isOffline) {
      let result = await this.onChangeFilterData(currentFilter);
      if (currentFilter.length > 0) {
        this.onGetResultArr(result, "remove");
        this.setState({
          filterItemsResult: result,
          filterData: currentFilter,
          columns: columnsArr,
        });
      }
      if (currentFilter.length < 1) {
        await this.setState({
          items: [],
          filterData: currentFilter,
          filterGroupResult: [],
          columns: columnsArr,
          filterItemsResult: undefined,
          pageIndex: 1,
          sortData: defaultSortObj,
        });
        !this.props.items
          ? // ? this.onGetItemLazy(this.state.itemCount, "remove")
            this.onHandleQueryDataByClassType()
          : this.setState({ items: this.props.items });
      }
    }
    this.props.onRemoveFilter &&
      this.props.onRemoveFilter(currentFilter.length);
  };

  onChangeFilterData = async (filterData: IObjectFilter[], data?: any[]) => {
    let items = [...this.state.items];
    filterData.forEach((doc) => {
      let filterData: any[] = [];
      switch (doc.operator) {
        case "gt":
          if (typeof doc.value === "string") {
            let resultGreater = items.filter((item) => {
              let itemValue = item[doc.key];
              if (
                typeof doc.value === "string" &&
                itemValue > parseInt(doc.value)
              ) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultGreater];
          }
          if (Object.prototype.toString.call(doc.value) === "[object Date]") {
            let resultDateGreater = items.filter((item) => {
              let itemValue = item[doc.key];
              if (doc.value && itemValue.valueOf() > doc.value.valueOf()) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultDateGreater];
          }
          break;

        case "lt":
          if (typeof doc.value === "string") {
            let resultLessThan = items.filter((item) => {
              let itemValue = item[doc.key];
              if (
                typeof doc.value === "string" &&
                itemValue < parseInt(doc.value)
              ) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultLessThan];
          }
          if (Object.prototype.toString.call(doc.value) === "[object Date]") {
            let resultDateLessThan = items.filter((item) => {
              let itemValue = item[doc.key];
              if (doc.value && itemValue.valueOf() < doc.value.valueOf()) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultDateLessThan];
          }
          break;

        case "ge":
          if (typeof doc.value === "string") {
            let resultGreaterOrEqual = items.filter((item) => {
              let itemValue = item[doc.key];
              if (
                typeof doc.value === "string" &&
                itemValue >= parseInt(doc.value)
              ) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultGreaterOrEqual];
          }
          if (Object.prototype.toString.call(doc.value) === "[object Date]") {
            let resultDateGreaterOrEqual = items.filter((item) => {
              let itemValue = item[doc.key];
              if (doc.value && itemValue.valueOf() >= doc.value.valueOf()) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultDateGreaterOrEqual];
          }
          break;

        case "le":
          if (typeof doc.value === "string") {
            let resultLessThanOrEqual = items.filter((item) => {
              let itemValue = item[doc.key];
              if (
                typeof doc.value === "string" &&
                itemValue <= parseInt(doc.value)
              ) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultLessThanOrEqual];
          }
          if (Object.prototype.toString.call(doc.value) === "[object Date]") {
            let resultDateLessThanOrEqual = items.filter((item) => {
              let itemValue = item[doc.key];
              if (doc.value && itemValue.valueOf() <= doc.value.valueOf()) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultDateLessThanOrEqual];
          }
          break;

        case "eq":
          if (typeof doc.value === "boolean") {
            let resultBoolean = items.filter((item) => {
              if (item[doc.key] === doc.value) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultBoolean];
          } else if (
            Object.prototype.toString.call(doc.value) === "[object Date]"
          ) {
            let resultDate = items.filter((item) => {
              let selectedDate = new Date(item[doc.key]);
              if (
                Object.prototype.toString.call(doc.value) === "[object Date]" &&
                selectedDate.setHours(0, 0, 0, 0).valueOf() ===
                  doc.value?.valueOf()
              ) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultDate];
          } else {
            let resultEqual = items.filter((item) => {
              let itemVal =
                typeof item[doc.key] === "string"
                  ? item[doc.key].toLocaleLowerCase()
                  : item[doc.key].toString();
              if (itemVal === doc.value) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultEqual];
          }
          break;

        case "ne":
          let resultNotEqual = items.filter((item) => {
            let itemVal =
              typeof item[doc.key] === "string"
                ? item[doc.key].toLocaleLowerCase()
                : item[doc.key].toString();
            if (itemVal !== doc.value) {
              return true;
            }
            return false;
          });
          filterData = [...filterData, ...resultNotEqual];
          break;

        case "contains":
          if (Object.prototype.toString.call(doc.value) === "[object Date]") {
            let resultDateContain = items.filter((item) => {
              let selectedDate = new Date(item[doc.key]);
              if (Array.isArray(doc.value)) {
                let index = doc.value?.findIndex(
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
            filterData = [...filterData, ...resultDateContain];
          } else {
            let resultContain = items.filter((item) => {
              let string =
                typeof item[doc.key] === "string"
                  ? item[doc.key].toLocaleLowerCase()
                  : item[doc.key].toString();
              if (string.indexOf(doc.value) !== -1) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultContain];
          }
          break;

        case "not":
          if (typeof doc.value === "string") {
            let resultNotContain = items.filter((item) => {
              let string =
                typeof item[doc.key] === "string"
                  ? item[doc.key].toLocaleLowerCase()
                  : item[doc.key].toString();
              if (string.indexOf(doc.value) === -1) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultNotContain];
          }
          if (Array.isArray(doc.value)) {
            let resultDateNotWithIn = items.filter((item) => {
              let selectedDate = new Date(item[doc.key]);
              if (
                (doc.value &&
                  Array.isArray(doc.value) &&
                  selectedDate.valueOf() < doc.value[0].date.valueOf()) ||
                (doc.value &&
                  Array.isArray(doc.value) &&
                  selectedDate.valueOf() >
                    doc.value[doc.value.length - 1].date
                      .setHours(23, 59, 59, 0)
                      .valueOf())
              ) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultDateNotWithIn];
          }

          break;

        default:
          break;
      }
      items = filterData;
    });
    return items;
  };

  onGetFilterObj = async (obj: IObjectFilter) => {
    let currentFilter = [...this.state.filterData];
    let index = await currentFilter.findIndex(
      (filter) => filter.columnKey === obj.columnKey
    );
    if (index === -1) {
      currentFilter.push(obj);
      await this.setState({
        filterData: currentFilter,
        filterItemsResult: !this.props.isOffline
          ? undefined
          : this.state.filterItemsResult,
        items: !this.props.isOffline ? [] : this.state.items,
      });
    }
    if (index !== -1) {
      currentFilter[index] = obj;
      await this.setState({
        filterData: currentFilter,
        filterItemsResult: !this.props.isOffline
          ? undefined
          : this.state.filterItemsResult,
        items: !this.props.isOffline ? [] : this.state.items,
      });
    }
    this.onBuildQuery &&
      !this.props.isOffline &&
      this.onBuildQuery(this.state.sortData, currentFilter);
  };

  public render() {
    const {
      columns,
      items,
      contextualMenu,
      isPanelVisible,
      targetColumn,
      filterItemsResult,
      filterColumsResult,
      groups,
      filterGroupResult,
      currentColumn,
    } = this.state;

    let currentGroup =
      filterGroupResult && filterGroupResult.length > 0
        ? filterGroupResult
        : groups;

    const nameAttibute = "data-rc-id";
    let listRcId = { [nameAttibute]: `dl.${this.props.rcName}` };
    return (
      <StateListWrapper
        onScroll={this._onHandleScrollList}
        theme={{ ...this.state, darkMode: this.props.darkMode }}
        className="customList-wrapper"
        {...listRcId}
      >
        <ScrollablePane
          rcName={this.props.rcName}
          scrollbarVisibility={ScrollbarVisibility.auto}
        >
          <MarqueeSelection selection={this._selection}>
            <ShimmeredDetailsList
              items={filterItemsResult ? filterItemsResult : items}
              compact={false}
              columns={
                filterColumsResult && filterColumsResult.length > 0
                  ? filterColumsResult
                  : columns
              }
              groups={!this.props.isLoading ? currentGroup : undefined}
              // isLoading changed but this component doesn't re-render
              enableShimmer={this.props.isLoading}
              selectionMode={
                this.props.selectionMode !== undefined
                  ? this.props.selectionMode
                  : SelectionMode.multiple
              }
              // getKey={this._getKey}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              useFastIcons={false}
              onRenderRow={this._onRenderRow}
              onRenderDetailsHeader={this._onRenderDetailsHeader}
              onCancelFilter={(key: string) => this.onCancelFilterNew(key)}
              shimmerLines={this.props.itemCount}
              viewPort={this.props.viewPort}
              rcName={this.props.rcName}
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
                (filterItemsResult &&
                  filterItemsResult.length < 1 &&
                  !this.props.isLoading) ||
                (items.length < 1 &&
                  !filterItemsResult &&
                  !this.props.isLoading)
                  ? this.props.isEmptyItems
                    ? this.props.isEmptyItems
                    : {
                        title: "No data available.",
                        detail: "",
                      }
                  : undefined
              }
              // isEmptyItems={
              //   (filterItemsResult &&
              //     filterItemsResult.length < 1 &&
              //     !this.state.isLoadingLazy) ||
              //   (items.length < 1 &&
              //     !filterItemsResult &&
              //     !this.state.isLoadingLazy)
              //     ? this.props.isEmptyItems
              //       ? this.props.isEmptyItems
              //       : {
              //           title: "No data available.",
              //           detail: "",
              //         }
              //     : undefined
              // }
            />
          </MarqueeSelection>
        </ScrollablePane>
        {currentColumn && !currentColumn.isNotAction && contextualMenu && (
          <ContextualMenu
            onItemClick={this.onChoiceItemSort}
            {...contextualMenu}
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
          isOpen={isPanelVisible}
          onDismiss={this.onSetVisiblePanel}
          headerText="Filter by"
          closeButtonAriaLabel="Close"
          isLightDismiss={true}
          customWidth={"321px"}
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
          {targetColumn && (
            <FilterElement
              targetColumn={targetColumn}
              items={filterItemsResult ? filterItemsResult : items}
              onGetItem={this.onGetResultArr}
              columns={filterColumsResult ? filterColumsResult : columns}
              darkMode={this.props.darkMode}
              onGetFilterObject={this.onGetFilterObj}
              isOffline={this.props.isOffline}
              rcName={this.props.rcName}
            />
          )}
        </Panel>
      </StateListWrapper>
    );
  }

  private _onRenderDetailsHeader: IDetailsListProps["onRenderDetailsHeader"] = (
    props
  ) => {
    const customStyles: Partial<IDetailsHeaderStyles> = {};
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
    column: IColumn
  ): IContextualMenuProps {
    let { isFilterHidden } = this.props;
    const items = [
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
    const itemsNotFilter = [
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
    ];
    return {
      items: isFilterHidden ? itemsNotFilter : items,
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
    let currentColumn = [...this.state.columns];
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
                  checked={this.state.newFilterColumns.includes(item.key)}
                  onChange={(e) => this.onCheckFilter(e, itemsFilter[i].key)}
                  title={item.name}
                  label={item.name}
                  rcName={`${item.key}.${this.props.rcName}`}
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
      onDismiss: this.onFilterColumn,
    };
  }

  onCheckFilter = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    itemKey?: string
  ) => {
    let currentFilterArr = [...this.state.newFilterColumns];
    if (itemKey) {
      let index = currentFilterArr.findIndex((doc) => doc === itemKey);
      if (index !== -1) {
        currentFilterArr.splice(index, 1);
        this.setState({ newFilterColumns: currentFilterArr });
      }
      if (index === -1) {
        currentFilterArr.push(itemKey);
        this.setState({ newFilterColumns: currentFilterArr });
      }
    }
  };

  onFilterColumn = async () => {
    let currentColumn = [...this.state.columns];
    let arrColumnsFilter = [...this.state.newFilterColumns];
    let result = currentColumn.filter((col) => {
      if (
        arrColumnsFilter.includes(col.key) ||
        (arrColumnsFilter.length > 0 && col.key === "settingCol")
      ) {
        return true;
      }
      return false;
    });
    await this.setState({
      contextualMenu: undefined,
      filterColumsResult: result,
    });
    let listStorage = JSON.parse(localStorage.getItem("listData")!);
    let listName = this.props.rcName
      ? this.props.rcName
      : this.props.columns[0].key;
    let indexList = listStorage
      ? listStorage.findIndex((item: any) => item.listName === listName)
      : -1;
    if (listStorage && this.state.newFilterColumns.length > 0) {
      if (indexList !== -1) {
        let result = listStorage.map((item: any) => {
          if (item.listName === listName) {
            return (item = {
              ...item,
              filterColumn: this.state.newFilterColumns,
            });
          }
          return item;
        });
        localStorage.setItem("listData", JSON.stringify(result));
      }
      if (indexList === -1) {
        let currentListData = [
          ...listStorage,
          {
            listName: listName,
            sortQuery: null,
            filterQuery: null,
            filterColumn: this.state.newFilterColumns,
          },
        ];
        localStorage.setItem("listData", JSON.stringify(currentListData));
      }
    }
    if (!listStorage && this.state.newFilterColumns.length > 0) {
      let data = [
        {
          listName: listName,
          sortQuery: null,
          filterQuery: null,
          filterColumn: this.state.newFilterColumns,
        },
      ];
      localStorage.setItem("listData", JSON.stringify(data));
    }
    if (this.state.newFilterColumns.length < 1 && indexList !== -1) {
      let newListData = [...listStorage];
      if (
        (!newListData[indexList].filterQuery ||
          newListData[indexList].filterQuery.length < 1) &&
        (!newListData[indexList].sortQuery ||
          !newListData[indexList].sortQuery.key) &&
        listStorage.length > 1
      ) {
        listStorage.splice(indexList, 1);
        localStorage.setItem("listData", JSON.stringify(listStorage));
      }
      if (
        (!newListData[indexList].filterQuery ||
          newListData[indexList].filterQuery.length < 1) &&
        (!newListData[indexList].sortQuery ||
          !newListData[indexList].sortQuery.key) &&
        listStorage.length < 2
      ) {
        localStorage.removeItem("listData");
      } else {
        newListData[indexList] = {
          ...newListData[indexList],
          filterColumn: [],
        };
        localStorage.setItem("listData", JSON.stringify(newListData));
      }
    }
    if (this.state.newFilterColumns.length < 1) {
      this.setState({
        filterColumsResult: undefined,
      });
    }
  };

  private _onContextualMenuDismissed = (): void => {
    this.setState({
      contextualMenu: undefined,
    });
  };

  private _getSelectionDetails(): void {
    const selectionItem = this._selection.getSelection();
    this.props.onGetSelectionItem &&
      this.props.onGetSelectionItem(selectionItem);
  }

  private _onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      let backgroundRow = "";
      if (this.props.groups) {
        let currentGroups =
          this.state.filterGroupResult &&
          this.state.filterGroupResult.length > 0
            ? [...this.state.filterGroupResult]
            : this.state.groups
            ? [...this.state.groups]
            : [];
        let lastItemIndexOfGroup = 0;
        if (currentGroups.length > 0) {
          let lastGroup =
            currentGroups.length >= 2
              ? currentGroups[currentGroups.length - 2]
              : currentGroups[currentGroups.length - 1];
          lastItemIndexOfGroup = lastGroup.startIndex + lastGroup.count;
        }
        backgroundRow =
          props.darkMode === "dark"
            ? props.itemIndex < lastItemIndexOfGroup
              ? "#393838"
              : "#454545"
            : props.itemIndex >= lastItemIndexOfGroup
            ? "#ffffff"
            : "#f8f8f8";
      }
      if (!this.props.groups) {
        backgroundRow = props.darkMode === "dark" ? "#393838" : "#ffffff";
      }

      if (props.item.isDisable) {
        customStyles.root = {
          color: props.darkMode === "dark" ? "#D5D5D5" : "#333333",
          background: `${backgroundRow} !important`,
          borderBottom: "1px solid transparent",
        };
      } else {
        customStyles.root = {
          color: props.darkMode === "dark" ? "#ffffff" : "#333333",
          background: `${backgroundRow} !important`,
          borderBottom: "1px solid transparent",
        };
      }
      return (
        <DetailsRow
          rowFieldsAs={this.renderRowFields}
          {...props}
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
  columnKey: string,
  isSortedDescending?: boolean
): T[] {
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
        let stringA: string = JSON.stringify(a[key]).toLocaleLowerCase();
        let stringB: string = JSON.stringify(b[key]).toLocaleLowerCase();
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
