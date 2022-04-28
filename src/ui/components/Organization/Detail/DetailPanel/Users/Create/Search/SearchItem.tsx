import buildQuery from "odata-query";
import * as React from "react";
import { UserDto } from "src/common/classes/BaseUser";
import { DataListSource } from "src/Dependencies/DataList/Interface";
import ListCustom from "src/Dependencies/DataList";
// import { DataListSource } from "aod-dependencies/DataList/Interface";
// import ListCustom from "aod-dependencies/DataList";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { FetchDataFromServer } from "src/common/functions";
import { LoadingSpinner } from "src/common/ui/Loading";
import { TypeSearchList } from "src/entity/enums";
import { ISearchItemProps, ISearchItemState } from "./SearchItemModel";

class SearchItem extends React.Component<ISearchItemProps, ISearchItemState> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  private searchText: string = "";
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
    this._query.receiveBySinalR = true;
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
              workflowId: res.workflowId,
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
      result = items.map((us: any) => {
        let user = new UserDto();
        user.email = us.userPrincipalName || "";
        user.displayName = us.displayName || "";
        user.name = us.userPrincipalName
          ? us.userPrincipalName.split("@")[0]
          : "";
        user.city = us.city || "";
        user.countryOrRegion = us.countryOrRegion || "";
        user.department = us.department || "";
        user.faxNumber = us.faxNumber || "";
        user.jobTitle = us.jobTitle || "";
        user.mobilePhone = us.mobilePhone || "";
        user.office = us.office || "";
        user.officePhone = us.officePhone || "";
        user.stateOrProvince = us.stateOrProvince || "";
        user.streetAddress = us.streetAddress || "";
        user.zipOrPostalCode = us.zipOrPostalCode || "";
        user.id = us.id || "";
        user.organizationId = us.organizationId || "";
        user.domain = us.userPrincipalName
          ? us.userPrincipalName.split("@")[1]
          : "";
        return user;
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
            rcName="loading"
            darkMode={this.props.theme}
          ></LoadingSpinner>
        }
        rcName={`filter.User.${this.state.type}`}
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
        items={this.state.items}
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
