import * as React from "react";
import { GroupTabWrapper, GroupSearchWrapper } from "./GroupStyle";
import { IGroupTabProps, IGroupTabStates } from "./GroupModel";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import { BaseGroup } from "src/common/classes/BaseGroup";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { IconGeneralProps } from "src/common/style";
import { LoadingSpinner } from "src/common/ui/Loading/LoadingSpinner";
import buildQuery from "odata-query";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import { FetchDataFromServer } from "src/common/functions";

export default class GroupTab extends React.Component<
  IGroupTabProps,
  IGroupTabStates
> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IGroupTabProps) {
    super(props);
    this.state = {
      cId: "",
      workflowId: "",
      isSearch: false,
      isSearching: false,
      isConfirm: false,
      visibleText: "",
      searchText: "",
      typingTimeout: 0,
      selectedItems: [],
      sourceItems: [],
      removeItems: [],
      prevItems: [],
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
      let endpointBuilded = buildQuery({ top, skip });
      if (this.state.searchText.trim() !== "" && endpoint) {
        let filter = [
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
      if (endpoint && endpoint.trim() !== "") {
        await FetchDataFromServer({ url: url }).then((res) => {
          if (res) {
            this._query.source = res.value;
          }
        });
      }
      return [];
    };
  }

  componentDidUpdate(prevProps: IGroupTabProps, prevState: IGroupTabStates) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReload) {
      this._onHandleGetDataForm();
    }
  }

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "" });
    }
  };

  private _onHandleCallApiGetDataList = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
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

  private _mapSearchTypeToAPI = (): string => {
    if (this.props.org && this.props.resource) {
      switch (this.state.isSearch) {
        case true:
          return `${BuildURLWithTenantId(
            ApiFromOData.ODATA_API
          )}organizations('${this.props.org.id}')/groups`;

        case false:
          return `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}resources('${
            this.props.resource.id
          }')/groups`;

        default:
          return "";
      }
    }
    return "";
  };

  private _UpdateSearchInPanel = (val: boolean) => {
    if (
      this.props.isSearchInPanel !== val &&
      this.props.OnHandleUpdateSearchInPanel
    ) {
      this.props.OnHandleUpdateSearchInPanel(val);
    }
  };

  onHandleSelectedWorkingAppItems = (groups: any[]) => {
    if (groups.length > 0) {
      let groupItems = groups.map((i) => {
        let gr = new BaseGroup();
        gr.id = i.guid;
        gr.name = i.name;
        gr.email = i.email;
        gr.isDeleted = i.isDeleted;
        gr.parentId = i.parentId;
        gr.sequenceNumber = i.sequenceNumber;
        gr.version = i.version;
        gr.description = i.description;
        gr.domain = i.domain;
        return gr;
      });
      return this.setState({ selectedItems: groupItems });
    }
    return this.setState({ selectedItems: groups });
  };

  onHandleSearch = (val?: boolean) => {
    let value = val !== undefined ? val : !this.state.isSearch;
    this._UpdateSearchInPanel(value);
    this.setState(
      {
        isSearch: value,
        searchText: "",
        selectedItems: [],
        isSearching: !value ? true : this.state.isSearching,
      },
      () => {
        if (!value) {
          setTimeout(() => {
            this.setState({ isSearching: false });
          }, 0);
        }
      }
    );
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
      isSearching: true,
      visibleText: str || "",
      typingTimeout: window.setTimeout(() => {
        let rs = this._HandleConcatSelectedAndSource();
        this.setState(
          {
            isSearching: false,
            searchText: str ? str : "",
            prevItems: [],
            selectedItems: [],
            sourceItems: rs,
          },
          () => this._onHandleCallApiGetDataList()
        );
      }, 1000),
    });
  };

  onHandleAddGroup = () => {
    if (
      this.state.selectedItems.length > 0 &&
      this.props.org &&
      this.props.resource &&
      this.props.OnHandleAddResourceToGroup
    ) {
      this.props
        .OnHandleAddResourceToGroup(
          this.props.org.id,
          this.props.resource.id,
          this.state.selectedItems
        )
        .then((res) => {
          this.setState({
            workflowId: res.workflowId || "",
            cId: res.conversationId,
            searchText: "",
          });
        })
        .catch((er) => {
          this.setState({ searchText: "" });
        });
    }
    this.onHandleSearch();
  };

  onHandleLeaveGroups = () => {
    if (
      this.state.selectedItems.length > 0 &&
      this.props.resource &&
      this.props.org &&
      this.props.OnHandleLeaveGroup
    ) {
      this.props
        .OnHandleLeaveGroup(
          this.props.org.id,
          this.props.resource.id,
          this.state.selectedItems
        )
        .then((res) => {
          this.setState({
            workflowId: res.workflowId || "",
            cId: res.conversationId,
          });
        });
    }
  };

  onHandleCancelConfirm = () => {
    this.setState({ isConfirm: false });
  };

  onHandleSubmitConfirm = () => {
    this.onHandleLeaveGroups();
    this.setState({ isConfirm: false });
  };

  onHandleLeaveGroup = () => {
    if (this.state.selectedItems.length > 0) {
      this.setState({ isConfirm: true });
    }
  };

  render() {
    const GroupColumn = [
      {
        key: "nameGr",
        name: "Name",
        fieldName: "name",
        minWidth: 80,
        maxWidth: 200,
        priority: 1,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.name}</span>;
        },
      },
      {
        key: "emailGr",
        name: "Email",
        fieldName: "email",
        minWidth: 80,
        maxWidth: 200,
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.email}</span>;
        },
      },
    ];

    return (
      <GroupTabWrapper className="GroupTabWrapper" theme={this.props.theme}>
        <div className="group__action">
          {this.state.isSearch ? (
            <CommandBarButton
              className="save__btn"
              rcName="save.search"
              onClick={this.onHandleAddGroup}
              darkMode={this.props.theme}
              text="Save"
              disabled={this.state.selectedItems.length < 1 ? true : false}
              iconProps={IconGeneralProps.saveIcon}
            />
          ) : (
            <div className="group__actionDisplay">
              <CommandBarButton
                className="search-save__btn"
                rcName="add.search"
                onClick={() => this.onHandleSearch()}
                darkMode={this.props.theme}
                text="Add"
                iconProps={IconGeneralProps.addIcon}
              />
              <CommandBarButton
                rcName="leave.search"
                onClick={this.onHandleLeaveGroup}
                darkMode={this.props.theme}
                text="Leave"
                iconProps={IconGeneralProps.leaveIcon}
                disabled={this.state.selectedItems.length < 1 ? true : false}
              />
            </div>
          )}
          {this.state.isSearch && (
            <CommandBarButton
              rcName="cancel.search"
              text="Cancel"
              onClick={() => this.onHandleSearch()}
              darkMode={this.props.theme}
              iconProps={IconGeneralProps.cancelIcon}
            />
          )}
        </div>
        {this.state.isSearch && (
          <GroupSearchWrapper className="GroupSearchWrapper">
            <span className="search__label">Search</span>
            <SearchBox
              rcName="group.search"
              placeholder="Search"
              onChange={this.onHandleSearchText}
              darkMode={this.props.theme}
              value={this.state.visibleText}
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
          <div
            style={{
              height: `95%`,
              width: "100%",
              position: "relative",
              margin: "20px 0",
            }}
          >
            <ListCustom
              rcName="group.search"
              columns={GroupColumn}
              isOffline={false}
              isLoading={false}
              darkMode={this.props.theme}
              onGetSelectionItem={this.onHandleSelectedWorkingAppItems}
              iconName="Group"
              isFilterHidden={true}
              selectedItems={this.state.selectedItems}
              queryClass={this._query}
              ref={this.Action}
              isNotAction={this.state.isSearching}
            />
          </div>
        ) : (
          this.state.isConfirm && (
            <Confirm
              onHandleSubmit={this.onHandleSubmitConfirm}
              onHandleCancel={this.onHandleCancelConfirm}
              rcName={`leave.gr`}
              content="Do you really want to leave selected groups?"
            />
          )
        )}
      </GroupTabWrapper>
    );
  }
}
