import * as React from "react";
import { GroupTabWrapper } from "./GroupStyle";
import { GroupTabProps, GroupTabState } from "./GroupModel";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { IconGeneralProps } from "src/common/style";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import { LoadingSpinner } from "src/common/ui/Loading/LoadingSpinner";
import buildQuery from "odata-query";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import { FetchDataFromServer } from "src/common/functions";

const editGroupColumn = [
  {
    key: "name.edtUser.Gr",
    name: "Name",
    fieldName: "name",
    minWidth: 10,
    maxWidth: 200,
    priority: 1,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.name}</span>;
    },
  },
  {
    key: "email.edtUser.Gr",
    name: "Email",
    fieldName: "email",
    minWidth: 10,
    maxWidth: 200,
    priority: 2,
    data: "string",
    onRender: (item: any) => {
      return <div>{item.email}</div>;
    },
  },
];

class GroupTab extends React.Component<GroupTabProps, GroupTabState> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: GroupTabProps) {
    super(props);
    this.state = {
      selectedItems: [],
      isSearch: false,
      isLoading: false,
      isSearchApi: false,
      typingTimeout: 0,
      skipNumber: 0,
      searchingText: "",
      cId: "",
      typeConfirm: "",
      visibleText: "",
      workflowId: "",
      isConfirm: false,
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
      if (this.state.searchingText.trim() !== "" && endpoint) {
        let filter = [
          `contains(tolower(name),tolower('${this.state.searchingText}'))`,
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

  componentDidUpdate(prevProps: GroupTabProps, prevState: GroupTabState) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
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
    this.props.OnClearCidAndWorkflowId();
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "" });
    }
  };

  private _mapSearchTypeToAPI = (): string => {
    if (this.props.orgInfo && this.props.user) {
      switch (this.state.isSearch) {
        case true:
          return `${BuildURLWithTenantId(
            ApiFromOData.ODATA_API
          )}organizations('${this.props.orgInfo.id}')/groups`;

        case false:
          return `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}users('${
            this.props.user.id
          }')/groups`;

        default:
          return "";
      }
    }
    return "";
  };

  private _onHandleCallApiGetDataList = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
  };

  private _onHandleAddUserToGroups = () => {
    if (this.props.OnAddUserToGroups && this.props.orgInfo && this.props.user) {
      this.props
        .OnAddUserToGroups(
          this.props.orgInfo.id,
          this.props.user.id,
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

  private _onHandleLeaveGroup = () => {
    if (
      this.props.OnRemoveUserFromGroups &&
      this.state.selectedItems.length > 0 &&
      this.props.user &&
      this.props.orgInfo
    ) {
      this.props
        .OnRemoveUserFromGroups(
          this.props.orgInfo.id,
          this.props.user.id,
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

  onAddNewGroup = () => {
    // this.props.onAddMoreAct();
    this.setState({ isSearch: true });
  };

  onHandleSelection = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      let groupItems = selectedItems.map((i) => {
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
    return this.setState({ selectedItems });
  };

  onRemoveItems = () => {
    if (this.state.selectedItems.length > 0) {
      this.setState({ isConfirm: true, typeConfirm: "leave" });
    }
  };

  onHandleSearch = (
    event?: React.ChangeEvent<HTMLInputElement>,
    str?: string
  ) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      visibleText: str || "",
      isLoading: true,
      typingTimeout: window.setTimeout(() => {
        this._query.source = [];
        this.setState(
          {
            isLoading: false,
            searchingText: str ? str.trim() : "",
          },
          () => this._onHandleCallApiGetDataList()
        );
      }, 1000),
    });
  };

  onHandleCancel = async () => {
    if (this.state.selectedItems.length > 0) {
      this.setState({
        isSearch: false,
        isConfirm: true,
        typeConfirm: "cancel",
        searchingText: "",
        visibleText: "",
      });
    } else {
      await this.setState(
        {
          isSearch: true,
          searchingText: "",
          visibleText: "",
          selectedItems: [],
        },
        () => {
          this._query.GetData(1, this.state.skipNumber, null, "");
          setTimeout(() => {
            this.setState({ isSearch: false });
          }, 0);
        }
      );
    }
  };

  onHandleSave = () => {
    if (this.state.selectedItems.length > 0) {
      this.setState({
        isConfirm: true,
        typeConfirm: "submit",
        searchingText: "",
      });
    }
  };

  onHandleCancelConfirm = () => {
    this.setState({ isConfirm: false, typeConfirm: "" });
  };

  onHandleSubmitConfirm = () => {
    if (this.state.typeConfirm === "submit") {
      this._onHandleAddUserToGroups();
    }
    if (this.state.typeConfirm === "leave") {
      this._onHandleLeaveGroup();
    }
    this.setState({ isConfirm: false, typeConfirm: "", isSearch: false });
  };

  RenderConfirmContentByType = (): string => {
    if (this.state.typeConfirm && this.state.typeConfirm === "leave") {
      return "Do you really want to leave selected groups?";
    }
    if (this.state.typeConfirm && this.state.typeConfirm === "submit") {
      return "Do you really want to add selected groups?";
    }
    return "Changes that you made may not be saved. \nMakes you sure you want to cancel?";
  };

  render() {
    let contentCfm = this.RenderConfirmContentByType();
    return (
      <GroupTabWrapper className="GroupTabWrapper" theme={this.props.theme}>
        {this.state.isSearch && !this.state.isConfirm ? (
          <div className="actAdd">
            <CommandBarButton
              onClick={this.onHandleSave}
              iconProps={IconGeneralProps.saveIcon}
              text="Save"
              rcName="save.gr"
              darkMode={this.props.theme}
              disabled={this.state.selectedItems.length > 0 ? false : true}
            />
            <CommandBarButton
              onClick={this.onHandleCancel}
              iconProps={IconGeneralProps.cancelIcon}
              text="Cancel"
              rcName="cancel.gr"
              darkMode={this.props.theme}
            />
          </div>
        ) : (
          !this.state.isConfirm && (
            <div className="actAdd">
              <CommandBarButton
                onClick={this.onAddNewGroup}
                iconProps={IconGeneralProps.addIcon}
                text="Add more"
                rcName="add.gr"
                darkMode={this.props.theme}
              />
              <CommandBarButton
                onClick={this.onRemoveItems}
                iconProps={IconGeneralProps.leaveIcon}
                text="Leave"
                rcName="leave.gr"
                darkMode={this.props.theme}
                disabled={this.state.selectedItems.length > 0 ? false : true}
              />
            </div>
          )
        )}
        {this.state.isSearch && !this.state.isConfirm && (
          <div className="search__form">
            <span className="search__label">Search</span>
            <SearchBox
              darkMode={this.props.theme}
              placeholder="Search"
              id="search-input"
              rcName="search.gr"
              onChange={this.onHandleSearch}
              value={this.state.visibleText}
              onBlur={() =>
                this.setState({
                  visibleText: this.state.visibleText.trim(),
                })
              }
            />
          </div>
        )}
        {this.state.isLoading && !this.state.isConfirm ? (
          <LoadingSpinner darkMode={this.props.theme} rcName="member.search" />
        ) : ((this.state.searchingText.trim() !== "" && this.state.isSearch) ||
            !this.state.isSearch) &&
          !this.state.isConfirm ? (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
              margin: "20px 0",
            }}
          >
            <ListCustom
              rcName="edtUser.gr"
              columns={editGroupColumn}
              isOffline={false}
              isLoading={this.state.isLoading}
              darkMode={this.props.theme}
              onGetSelectionItem={this.onHandleSelection}
              queryClass={this._query}
              selectedItems={this.state.selectedItems}
              iconName="Group"
              ref={this.Action}
              isFilterHidden={this.state.isSearch}
            />
          </div>
        ) : (
          this.state.isConfirm && (
            <Confirm
              onHandleSubmit={this.onHandleSubmitConfirm}
              onHandleCancel={this.onHandleCancelConfirm}
              rcName={`leave.gr`}
              content={contentCfm}
            />
          )
        )}
      </GroupTabWrapper>
    );
  }
}

export default GroupTab;
