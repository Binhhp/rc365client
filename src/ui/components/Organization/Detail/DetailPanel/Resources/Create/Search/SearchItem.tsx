import * as React from "react";
import { DataListSource } from "src/Dependencies/DataList/Interface";
import ListCustom from "src/Dependencies/DataList";
// import { DataListSource } from "aod-dependencies/DataList/Interface";
// import ListCustom from "aod-dependencies/DataList";
import buildQuery from "odata-query";
import { ResourceDto } from "src/common/classes/BaseResource";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { FetchDataFromServer } from "src/common/functions";
import { LoadingSpinner } from "src/common/ui/Loading";
import { TypeSearchList } from "src/entity/enums";
import { ISearchItemProps, ISearchItemState } from "./SearchItemModel";

class SearchItem extends React.Component<ISearchItemProps, ISearchItemState> {
  protected _query: DataListSource;
  private searchText: string = "";
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ISearchItemProps) {
    super(props);
    this.state = {
      type: TypeSearchList.Searching,
      items: undefined,
      conversationId: "",
      workflowId: "",
      data: [],
    };
    this.Action = React.createRef();
    this._query = new DataListSource();
    this._query.GetData = async (
      pageIndex: number,
      skipNumber: number,
      nextLink: string | null,
      endpoint?: string
    ): Promise<any[]> => {
      let top = skipNumber;
      let skip = skipNumber * (pageIndex - 1);
      let filter = [`contains(name,'${this.props.searchingText}')`];
      let endpointBuilded = buildQuery({ top, skip, filter });
      let defaultURL =
        this.state.type === TypeSearchList.Searching
          ? `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}aadusers`
          : "";
      let url = `${defaultURL}${endpointBuilded}${
        endpoint ? `&${endpoint.split("?")[1]}` : ""
      }${nextLink ? `&$skiptoken=${nextLink}` : ""}`;
      if (this.props.orgInfo) {
        url = `${url}&organizationId=${this.props.orgInfo.id}`;
      }
      if (this.props.searchingText.trim() !== "") {
        await FetchDataFromServer({ url: url }).then((res) => {
          if (res) {
            this.props.onSetSignalRGetData(res.conversationId);
            this.setState({
              conversationId: res.conversationId,
              workflowId: res.workflowId || "",
            });
          }
        });
      }
      return [];
    };
  }

  componentDidUpdate(prevProps: ISearchItemProps, prevState: ISearchItemState) {
    // call api when change toggle and after search delay
    if (
      (this.props.typeSearch === TypeSearchList.Searching &&
        prevProps.typeSearch === TypeSearchList.Selected) ||
      this.props.searchingText !== prevProps.searchingText
    ) {
      this._query.nextLink = "";
      this._onHandleUpdateDataCaseFirst([]);
      this._onHandleCallApiList();
    }
    // change items between selected and searching
    if (
      this.props.typeSearch !== prevProps.typeSearch ||
      this.props.sourceItems !== prevProps.sourceItems
    ) {
      let newItems = undefined;
      if (this.props.typeSearch === TypeSearchList.Selected) {
        newItems = this.props.sourceItems;
        this._query.source = newItems || [];
        this._onHandleUpdateDataCaseFirst(this._query.source);
      }
      this.setState({
        type: this.props.typeSearch,
        items: newItems,
      });
    }
    // receive signalR and update data list
    if (
      this.state.conversationId === this.props.signalRConversationId &&
      !this.props.isHaveMessageSignalR &&
      this.props.signalRData &&
      this.props.signalRData.searchUserResponse !==
        prevProps.signalRData.searchUserResponse
    ) {
      this._query.source = this.props.signalRData.searchUserResponse || [];
      if (this.props.signalRData && this.props.signalRData.nextLink) {
        this._query.nextLink = this.props.signalRData.nextLink;
      }
      if (this.props.searchingText !== this.searchText) {
        // case search with new text
        this._onHandleUpdateDataCaseFirst(this._query.source);
      } else if (
        this.props.searchingText === this.searchText &&
        this.props.typeSearch === TypeSearchList.Searching
      ) {
        // case search lazy loading
        this._onHandleUpdateDataCaseLazy(this._query.source);
      }
    }
  }
  private _onHandleCallApiList = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
  };

  private _onHandleUpdateDataCaseFirst = async (source: any[]) => {
    if (!this.Action.current) {
      return;
    }
    if (this.state.conversationId !== "" || this.state.workflowId !== "") {
      this.searchText = this.props.searchingText;
      this.setState({ workflowId: "", conversationId: "" });
    }
    await this.Action.current.onHandleUpdateDataCaseFirst(source);
  };

  private _onHandleUpdateDataCaseLazy = async (
    source: any[],
    page?: number
  ) => {
    if (!this.Action.current) {
      return;
    }
    if (this.state.conversationId !== "" || this.state.workflowId !== "") {
      this.searchText = this.props.searchingText;
      this.setState({ workflowId: "", conversationId: "" });
    }
    await this.Action.current.onHandleUpdateDataCaseLazy(source);
  };

  onHandleSelectSearchItems = (items: any[]) => {
    let result: any[] = [];
    if (items.length > 0) {
      result = items.map((rs: any) => {
        let resource = new ResourceDto();
        resource.displayName = rs.displayName || "";
        resource.id = rs.id || "";
        resource.email = rs.userPrincipalName || "";
        resource.name = rs.userPrincipalName
          ? rs.userPrincipalName.split("@")[0]
          : "";
        resource.location = rs.location || "";
        resource.phone = rs.mobilePhone || "";
        resource.capacity = rs.capacity || 0;
        resource.department = rs.department || "";
        resource.minHours = rs.minHours || 0;
        resource.maxDelivery = rs.maxDelivery || 0;
        resource.deadline = rs.deadline || "";
        resource.deadlineTime = rs.deadlineTime || "";
        resource.deadlineMess = rs.deadlineMess || "";
        resource.minHoursMess = rs.minHoursMess || "";
        resource.domain = rs.userPrincipalName
          ? rs.userPrincipalName.split("@")[1]
          : "";
        resource.gallery = rs.gallery || [];
        return resource;
      });
    }
    this.props.onHandleSelectedItems(result);
  };

  render() {
    const searchingItemColumn = [
      {
        key: "searchingItemName",
        name: "Name",
        fieldName: "name",
        minWidth: 70,
        maxWidth: 200,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.name}</span>;
        },
      },
      {
        key: "userPrincipalName",
        name: "Principal name",
        fieldName: "userPrincipalName",
        minWidth: 70,
        maxWidth: 200,
        priority: 1,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.userPrincipalName}</span>;
        },
      },
    ];
    return (
      <ListCustom
        customLoading={
          <LoadingSpinner
            rcName="resource.search.loading"
            darkMode={this.props.theme}
          ></LoadingSpinner>
        }
        rcName={`filter.resources.${this.state.type}`}
        items={this.state.items}
        isOffline={true}
        isLoading={
          // (this.props.searchingText.trim() !== "" &&
          //   this.state.conversationId === "") ||
          (this.props.searchingText.trim() !== "" &&
            (!this.props.signalRData ||
              (this.props.signalRData &&
                !this.props.signalRData.searchUserResponse))) ||
          (this.props.searchingText.trim() === "" &&
            this.searchText.trim() === "") ||
          (this.state.conversationId === this.props.signalRConversationId &&
            this.props.isHaveMessageSignalR &&
            this.searchText.trim() === "") ||
          (this.state.conversationId === this.props.signalRConversationId &&
            this.props.isHaveMessageSignalR &&
            this.searchText !== this.props.searchingText &&
            this.props.searchingText.trim() !== "")
            ? true
            : false
        }
        columns={searchingItemColumn}
        darkMode={this.props.theme}
        onGetSelectionItem={this.onHandleSelectSearchItems}
        isFilterHidden={true}
        selectedItems={
          this.state.type === TypeSearchList.Searching
            ? [...this.props.sourceItems, ...this.props.selectedItems]
            : this.props.removeItems
        }
        queryClass={this._query}
        ref={this.Action}
      />
    );
  }
}
export default SearchItem;
