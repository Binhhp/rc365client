import ListCustom from "aod-dependencies/DataList";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import buildQuery from "odata-query";
import * as React from "react";
import { GroupDto } from "src/common/classes/BaseGroup";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { FetchDataFromServer } from "src/common/functions";
import { TypeSearchList } from "src/entity/enums";
import { SignalRSearchUserResponse } from "src/services/interface/ISignalRManager";
import { ISearchItemProps, ISearchItemState } from "./SearchItemModel";

class SearchItem extends React.Component<ISearchItemProps, ISearchItemState> {
  protected _query: DataListSource;
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
      // defaultURL: string,
      endpoint?: string
    ): Promise<any[]> => {
      let top = skipNumber;
      let skip = skipNumber * (pageIndex - 1);
      let endpointBuilded = buildQuery({ top, skip });
      if (this.props.searchingText.trim() !== "") {
        let filter = [`contains(name,'${this.props.searchingText}')`];
        endpointBuilded = buildQuery({ top, skip, filter });
      }
      let defaultURL =
        this.state.type === TypeSearchList.Searching
          ? `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}aadusers`
          : "";
      let url =
        nextLink && nextLink !== ""
          ? nextLink
          : `${defaultURL}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }`;
      if (this.props.orgInfo) {
        url = `${url}&organizationId=${this.props.orgInfo.id}`;
      }
      await FetchDataFromServer({ url: url }).then((res) => {
        if (res) {
          this.setState({
            conversationId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        }
      });
      return [];
    };
  }

  componentDidUpdate(prevProps: ISearchItemProps, prevState: ISearchItemState) {
    if (
      this.props.typeSearch !== prevProps.typeSearch ||
      this.props.sourceItems !== prevProps.sourceItems
    ) {
      let newItems =
        this.props.typeSearch === TypeSearchList.Selected
          ? this.props.sourceItems
          : undefined;
      this.setState({
        type: this.props.typeSearch,
        items: newItems,
        conversationId: prevState.conversationId,
      });
    }
    if (this.props.signalRData && this.props.signalRData.searchUserResponse) {
      // [NOTE] : save SignalR data and return
      let res = this._onHandleBuildSignalRDataResponse(this.props.signalRData);
      this._query.source = res.searchUserResponse;
      if (
        this.props.signalRData &&
        this.props.signalRData.searchUserResponse !==
          prevProps.signalRData.searchUserResponse
      ) {
        this._onHandleGetDataForm();
      }
    }
  }

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryClassSource(this._query.source, 1);
  };

  private _onHandleBuildSignalRDataResponse = (
    signalRData: any
  ): SignalRSearchUserResponse => {
    let res = new SignalRSearchUserResponse();
    res.nextLink = signalRData.nextLink;
    if (
      signalRData.searchUserResponse &&
      Array.isArray(signalRData.searchUserResponse)
    ) {
      let result = signalRData.searchUserResponse.map((gr: any) => {
        let group = new GroupDto();
        group.id = gr.id || "";
        group.email = gr.email || "";
        // group.email = gr.email ? gr.email.split("@")[0] : "";
        group.name = gr.name || "";
        group.description = gr.description || "";
        group.domain = gr.email ? gr.email.split("@")[1] : "";
        return group;
      });
      res.searchUserResponse = result;
    }
    return res;
  };

  onHandleSelectSearchItems = (items: any[]) => {
    this.props.onHandleSelectedItems(items);
  };

  render() {
    const searchingItemColumn = [
      {
        key: "nameGr",
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
        key: "emailGr",
        name: "Email",
        fieldName: "email",
        minWidth: 70,
        maxWidth: 200,
        priority: 1,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.email}</span>;
        },
      },
    ];
    return (
      <ListCustom
        rcName={`filter.groups.${this.state.type}`}
        isOffline={this.state.type === TypeSearchList.Searching ? false : true}
        isLoading={this.props.isHaveMessageSignalR}
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
