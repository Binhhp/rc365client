import * as React from "react";
import {
  MemberWrapper,
  GroupSearchWrapper,
  MemberContentWrapper,
} from "./MemberOfStyle";
import { IMemberOfProps, IMemberOfStates } from "./MemberOfModel";
import { TypeConfirm } from "src/entity/enums";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { IconGeneralProps } from "src/common/style";
import buildQuery from "odata-query";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import { BaseGroup } from "src/common/classes/BaseGroup";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import { LoadingSpinner } from "src/common/ui/Loading";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import { FetchDataFromServer } from "src/common/functions";

export default class MemberOf extends React.Component<
  IMemberOfProps,
  IMemberOfStates
> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IMemberOfProps) {
    super(props);
    this.state = {
      isConfirm: false,
      isSearch: false,
      isSearching: false,
      searchText: "",
      visibleText: "",
      typingTimeout: 0,
      skipNumber: 0,
      selectedItems: [],
      sourceItems: [],
      cId: "",
      workflowId: "",
      loading: false,
      loadingQuery: false,
    };
    this._query = new DataListSource();
    this.Action = React.createRef();
    this._query.GetData = async (
      pageIndex: number,
      skipNumber: number,
      nextLink: string | null,
      endpoint?: string
    ): Promise<any[]> => {
      this.setState({ loadingQuery: true });
      let top = skipNumber;
      let skip = skipNumber * (pageIndex - 1);
      let endpointBuilded = buildQuery({ top, skip });
      if (this.state.searchText.trim() !== "" && this.props.group) {
        let filter = [
          { not: { name: `${this.props.group.name}` } },
          `contains(tolower(name),tolower('${this.state.searchText}'))`,
        ];
        endpointBuilded = buildQuery({ top, skip, filter });
      }
      let defaultURL = this._mapSearchTypeToAPI();
      let url =
        nextLink && nextLink !== ""
          ? nextLink
          : `${defaultURL}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }`;
      if (skipNumber > 0 && skipNumber !== this.state.skipNumber) {
        this.setState({ skipNumber });
      }
      await FetchDataFromServer({ url: url }).then((res) => {
        if (res) {
          this._query.source = res.value;
          this.setState({ loadingQuery: false });
        }
      });
      return [];
    };
  }

  componentDidUpdate(prevProps: IMemberOfProps, prevState: IMemberOfStates) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
    );
    if (isReload) {
      this._onHandleCallApiGetDataList();
    }
  }

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.OnUpdateWorkingStatus && this.props.isWorking !== val) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  // private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
  //   if (this.props.confirmType !== type) {
  //     this._onHandleConfirmType(type);
  //   }
  // };

  private _mapSearchTypeToAPI = (): string => {
    if (this.props.orgInfo && this.props.group) {
      switch (this.state.isSearch) {
        case true:
          return `${BuildURLWithTenantId(
            ApiFromOData.ODATA_API
          )}organizations('${this.props.orgInfo.id}')/groups`;

        case false:
          return `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}groups('${
            this.props.group.id
          }')/memberOfs`;

        default:
          return "";
      }
    }
    return "";
  };

  private _onHandleConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      switch (type) {
        case TypeConfirm.Delete:
          return this.props.OnUpdateConfirmType(type);

        case TypeConfirm.Cancel:
          if (this.props.isWorking) {
            return this.props.OnUpdateConfirmType(type);
          }
          return;

        default:
          if (this.props.isWorking) {
            return this.props.OnUpdateConfirmType(type);
          }
          return;
      }
    }
  };

  private _onHandUpdateState = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      let grs = selectedItems.map((i) => {
        let gr = new BaseGroup();
        gr.description = i.description;
        gr.domain = i.domain;
        gr.email = i.email;
        gr.isDeleted = i.isDeleted;
        gr.name = i.name;
        gr.parentId = i.parentId;
        gr.sequenceNumber = i.sequenceNumber;
        gr.version = i.version;
        gr.id = i.guid;
        return gr;
      });
      return this.setState({ selectedItems: grs });
    }
    return this.setState({ selectedItems });
  };

  private _onHandleLeaveGroups = (groups: BaseGroup[]) => {
    if (this.props.OnLeaveGroup && this.props.group && this.props.orgInfo) {
      this.props
        .OnLeaveGroup(this.props.orgInfo.id, this.props.group.id, groups)
        .then((res) => {
          if (res) {
            this.setState({
              workflowId: res.workflowId || "",
              cId: res.conversationId,
            });
          }
        });
    }
  };

  private _onHandleRemoveSelectedMember = async () => {
    if (this.state.selectedItems.length > 0) {
      this.setState({ isSearch: false, isConfirm: true });
    } else {
      await this.setState(
        {
          isSearch: true,
          searchText: "",
          selectedItems: [],
        },
        () => {
          this._query.GetData(1, this.state.skipNumber, null);
          setTimeout(() => {
            this.setState({ isSearch: false });
          }, 0);
        }
      );
    }
  };

  private _onHandleCallApiGetDataList = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
    this.props.OnClearCidAndWorkflowId();
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "", loading: false });
    }
  };

  private _HandleConcatSelectedAndSource = () => {
    let crtSelectedItems = [...this.state.selectedItems];
    let crtSources = [...this.state.sourceItems];
    if (crtSources.length < 1) {
      return crtSelectedItems;
    }
    if (crtSources.length > 0 && crtSelectedItems.length > 0) {
      crtSelectedItems.forEach((item) => {
        let index = crtSources.findIndex((i) => i.id === item.id);
        if (index === -1) {
          crtSources.push(item);
        }
      });
      return crtSources;
    }
    return crtSources;
  };

  private _OnHandleAddGroupToGroups = () => {
    if (
      this.state.selectedItems.length > 0 &&
      this.props.group &&
      this.props.orgInfo &&
      this.props.OnHandleAddGroupToGroups
    ) {
      this.props
        .OnHandleAddGroupToGroups(
          this.props.orgInfo.id,
          this.props.group.id,
          this.state.selectedItems
        )
        .then((res) => {
          if (res) {
            this.setState({
              workflowId: res.workflowId || "",
              cId: res.conversationId,
            });
          }
        });
    }
  };

  onHandleCancelConfirm = () => {
    this.setState({ isConfirm: false });
  };

  onHandleSubmitConfirm = () => {
    if (this.state.selectedItems.length > 0) {
      this._onHandleLeaveGroups(this.state.selectedItems);
      this._onHandleUpdateWorkingStatus(true);
      this.setState({ isConfirm: false, loading: true });
    }
  };

  onHandleOpenSearch = () => {
    this.setState({ isSearch: true });
  };

  onHandleSearchText = (
    event?: React.ChangeEvent<HTMLInputElement>,
    str?: string
  ) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      visibleText: str || "",
      isSearching: true,
      typingTimeout: window.setTimeout(() => {
        let rs = this._HandleConcatSelectedAndSource();
        this.setState(
          {
            isSearching: false,
            searchText: str ? str : "",
            selectedItems: [],
            sourceItems: rs,
          },
          () => this._onHandleCallApiGetDataList()
        );
      }, 1000),
    });
  };

  onHandleSaveAddParent = () => {
    this._OnHandleAddGroupToGroups();
    this.setState(
      {
        ...this.state,
        isSearch: false,
        isSearching: true,
        searchText: "",
        loading: true,
      },
      () =>
        setTimeout(() => {
          this.setState({ isSearching: false });
        }, 0)
    );
  };

  render() {
    let memberColumn = [
      {
        key: "NameCol",
        name: "Name",
        fieldName: "name",
        minWidth: 60,
        priority: 1,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.name}</span>;
        },
      },
      {
        key: "EmailCol",
        name: "Email",
        fieldName: "email",
        minWidth: 60,
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.email}</span>;
        },
      },
    ];

    return (
      <MemberWrapper
        theme={{
          theme: this.props.theme,
        }}
        className="MemberWrapper"
      >
        <MemberContentWrapper className="MemberContentWrapper">
          {!this.state.isConfirm && (
            <>
              {this.state.isSearch ? (
                <div className="Member__action">
                  <CommandBarButton
                    onClick={this.onHandleSaveAddParent}
                    iconProps={IconGeneralProps.saveIcon}
                    text="Save"
                    rcName={`save.gr`}
                    darkMode={this.props.theme}
                    disabled={
                      this.state.selectedItems.length > 0 ? false : true
                    }
                  />
                  <CommandBarButton
                    onClick={this._onHandleRemoveSelectedMember}
                    iconProps={IconGeneralProps.cancelIcon}
                    text="Cancel"
                    rcName={`cancel.gr`}
                    darkMode={this.props.theme}
                  />
                </div>
              ) : (
                <div className="Member__action">
                  <CommandBarButton
                    onClick={this.onHandleOpenSearch}
                    iconProps={IconGeneralProps.addIcon}
                    text="Add"
                    rcName={`add.gr`}
                    darkMode={this.props.theme}
                  />
                  <CommandBarButton
                    onClick={this._onHandleRemoveSelectedMember}
                    iconProps={IconGeneralProps.deleteIcon}
                    text="Leave"
                    rcName={`leave.gr`}
                    darkMode={this.props.theme}
                    disabled={
                      this.state.selectedItems.length > 0 ? false : true
                    }
                  />
                </div>
              )}
            </>
          )}
          {this.state.isSearch && (
            <GroupSearchWrapper className="GroupSearchWrapper">
              <span className="search__label">Search</span>
              <SearchBox
                rcName="gr.search.memberOf"
                value={this.state.visibleText}
                placeholder="Search"
                onChange={this.onHandleSearchText}
                darkMode={this.props.theme}
                onBlur={() =>
                  this.setState({
                    visibleText: this.state.visibleText.trim(),
                  })
                }
              />
            </GroupSearchWrapper>
          )}
          {this.state.isSearching && !this.state.isConfirm ? (
            <LoadingSpinner darkMode={this.props.theme} />
          ) : ((this.state.searchText.trim() !== "" && this.state.isSearch) ||
              !this.state.isSearch) &&
            !this.state.isConfirm ? (
            <div style={{ position: "relative" }}>
              <ListCustom
                rcName={`edt.${this.props.workingTab}.memberOf`}
                columns={memberColumn}
                // items={defaultResoureItems}
                // isLoading={
                //   (this.props.isHaveMessageSignalR &&
                //     this.props.signalRConversationId === this.state.cId) ||
                //   false
                // }
                customLoading={
                  <LoadingSpinner
                    rcName="loading"
                    darkMode={this.props.theme}
                  ></LoadingSpinner>
                }
                isLoading={this.state.loading || this.state.loadingQuery}
                darkMode={this.props.theme}
                onGetSelectionItem={this._onHandUpdateState}
                iconName="Group"
                selectedItems={this.state.selectedItems}
                queryClass={this._query}
                ref={this.Action}
                isFilterHidden={this.state.isSearch}
              />
            </div>
          ) : (
            this.state.isConfirm && (
              <Confirm
                onHandleSubmit={this.onHandleSubmitConfirm}
                onHandleCancel={this.onHandleCancelConfirm}
                rcName={`member.${this.props.workingTab}`}
                content="Do you really want to leave selected groups?"
              />
            )
          )}
        </MemberContentWrapper>
      </MemberWrapper>
    );
  }
}
