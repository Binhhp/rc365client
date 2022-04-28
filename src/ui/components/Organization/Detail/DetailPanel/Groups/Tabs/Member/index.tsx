import * as React from "react";
import { MemberWrapper, MemberContentWrapper } from "./MemberStyle";
import { IMemberProps, IMemberStates } from "./MemberModel";
import { TypePage } from "src/entity/enums";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { BaseUser } from "src/common/classes/BaseUser";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { IconGeneralProps } from "src/common/style";
import Search from "src/ui/containers/Organization/Detail/Tab/Group/GroupSearchMemberContainer";
import buildQuery from "odata-query";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import { FetchDataFromServer } from "src/common/functions";
import { LoadingSpinner } from "src/common/ui/Loading";

export default class Member extends React.Component<
  IMemberProps,
  IMemberStates
> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IMemberProps) {
    super(props);
    this.state = {
      selectedMembers: [],
      isSearch: false,
      cId: "",
      workflowId: "",
      isConfirm: false,
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
      this.setState({ ...this.state, loadingQuery: true });
      let top = skipNumber;
      let skip = skipNumber * (pageIndex - 1);
      let endpointBuilded = buildQuery({ top, skip });
      let defaultURL = `${BuildURLWithTenantId(
        ApiFromOData.ODATA_API
      )}groups('${this.props.group?.id}')/members`;
      let url =
        nextLink && nextLink !== ""
          ? nextLink
          : `${defaultURL}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }`;
      await FetchDataFromServer({ url: url }).then((res) => {
        if (res) {
          this._query.source = res.value;
          this.setState({ ...this.state, loadingQuery: false });
        }
      });
      return [];
    };
  }

  componentDidUpdate(prevProps: IMemberProps, prevState: IMemberStates) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
    );
    if (isReload) {
      this._onHandleGetDataForm();
      this.props.OnReloadOrganization(true);
    }
  }

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
    this.props.OnClearCidAndWorkflowId();
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "", loading: false });
    }
  };

  private _onHandleRemoveUserToGroup = (items: any[], id: string) => {
    let users = items.map((i) => {
      return i.guid;
    });
    if (this.props.OnRemoveUserInGroup && this.props.group) {
      this.props
        .OnRemoveUserInGroup(users, id, this.props.group.id)
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
  private _onHandleRemoveGroupToGroup = (items: any[], id: string) => {
    let groups = items.map((i) => {
      return i.guid;
    });
    if (this.props.OnRemoveGroupInGroup && this.props.group) {
      this.props
        .OnRemoveGroupInGroup(groups, id, this.props.group.id)
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
  private _onHandleRemoveResourceToGroup = (items: any[], id: string) => {
    let groups = items.map((i) => {
      return i.guid;
    });
    if (this.props.OnRemoveResourceInGroup && this.props.group) {
      this.props
        .OnRemoveResourceInGroup(groups, id, this.props.group.id)
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
  
  private onReloadList = (val: boolean = false) => this.setState({ loading: val });
  private _onHandleRemoveMember = async () => {
    this.onReloadList(true);
    let crtMembers = [...this.state.selectedMembers];
    let users = crtMembers.filter((m) => m.type === "User");
    let groups = crtMembers.filter((m) => m.type === "Group");
    let resources = crtMembers.filter((m) => m.type === "Resource");
    if (users.length > 0 && this.props.organizationInfomation) {
      this._onHandleRemoveUserToGroup(
        users,
        this.props.organizationInfomation.id
      );
    }
    if (groups.length > 0 && this.props.organizationInfomation) {
      this._onHandleRemoveGroupToGroup(
        groups,
        this.props.organizationInfomation.id
      );
    }
    if (resources.length > 0 && this.props.organizationInfomation) {
      this._onHandleRemoveResourceToGroup(
        resources,
        this.props.organizationInfomation.id
      );
    }
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
  };

  private _onHandUpdateState = (selectedUsers: BaseUser[]) => {
    this.setState({ selectedMembers: selectedUsers });
  };

  private _onHandleRemoveSelectedMember = () => {
    if (this.state.selectedMembers.length > 0) {
      this.setState({ isConfirm: true });
    }
  };
  private _UpdateIsSearch = () => {
    this.setState({
      isSearch: !this.state.isSearch,
    });
  };

  private _mapIconByWorkingTab = (): string => {
    switch (this.props.workingTab) {
      case TypePage.Users:
        return "Contact";
      case TypePage.Resources:
        return "Product";
      case TypePage.Groups:
        return "Group";
      default:
        return "Contact";
    }
  };

  onHandleCidAndWorkflowId = (cId: string, workflowId: string) => {
    this.setState({ workflowId: workflowId, cId: cId });
  }

  onHandleCId = (id: string) => {
    this.setState({
      cId: id,
    });
  };

  onHandleCancelConfirm = () => {
    this.setState({ isConfirm: false });
  };

  onHandleSubmitConfirm = () => {
    this._onHandleRemoveMember();
    this.setState({ isConfirm: false });
  };

  render() {
    let memberColumn = [
      {
        key: "NameCol",
        name: "Name",
        fieldName: "name",
        minWidth: 60,
        maxWidth: 120,
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
        maxWidth: 160,
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.email}</span>;
        },
      },
      {
        key: "TypeCol",
        name: "Type",
        fieldName: "type",
        minWidth: 60,
        maxWidth: 120,
        priority: 3,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.type}</span>;
        },
      },
    ];
    return (
      <>
        {this.state.isSearch && !this.state.isConfirm ? (
          <Search
            onReloadList={this.onReloadList}
            onHandleCidAndWorkflowId={this.onHandleCidAndWorkflowId}
            onHandleConversationId={this.onHandleCId}
            UpdateSearchVisible={this._UpdateIsSearch}
          />
        ) : !this.state.isConfirm ? (
          <MemberWrapper
            theme={{
              theme: this.props.theme,
            }}
            className="MemberWrapper"
          >
            <MemberContentWrapper className="MemberContentWrapper">
              <div className="Member__action">
                <CommandBarButton
                  onClick={this._UpdateIsSearch}
                  iconProps={IconGeneralProps.addIcon}
                  text="Add"
                  rcName={`add.${this.props.workingTab}`}
                  darkMode={this.props.theme}
                />
                <CommandBarButton
                  onClick={this._onHandleRemoveSelectedMember}
                  iconProps={IconGeneralProps.deleteIcon}
                  text="Remove"
                  rcName={`remove.${this.props.workingTab}`}
                  darkMode={this.props.theme}
                  disabled={
                    this.state.selectedMembers.length > 0 ? false : true
                  }
                />
              </div>
              <ListCustom
                customLoading={
                  <LoadingSpinner
                    rcName="loading"
                    darkMode={this.props.theme}
                  ></LoadingSpinner>
                }
                isLoading={this.state.loading}
                rcName={`edt.${this.props.workingTab}.member`}
                columns={memberColumn}
                darkMode={this.props.theme}
                onGetSelectionItem={this._onHandUpdateState}
                iconName={this._mapIconByWorkingTab()}
                selectedItems={this.state.selectedMembers}
                queryClass={this._query}
                ref={this.Action}
              />
            </MemberContentWrapper>
          </MemberWrapper>
        ) : (
          <Confirm
            onHandleSubmit={this.onHandleSubmitConfirm}
            onHandleCancel={this.onHandleCancelConfirm}
            rcName={`member.${this.props.workingTab}`}
            content="Do you really want to remove selected members?"
          />
        )}
      </>
    );
  }
}
