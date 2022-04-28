import * as React from "react";
import { Wrapper, MainContentWrapper } from "./EditStyle";
import { EditUserProps, EditUserState } from "./EditModels";
import { EditUserTabs, TypeConfirm } from "src/entity/enums";
import ProfileTab from "src/ui/containers/Organization/Detail/Tab/User/UserProfileTabContainer";
import GroupTab from "src/ui/containers/Organization/Detail/Tab/User/UserGroupTabContainer";
import SyncTabs from "src/ui/containers/Organization/Detail/Tab/User/UserSyncTabContainer";
import { PivotItem } from "aod-dependencies/Pivot";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import { EditUserPivotItem } from "src/common/constants";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { BuildRCAttribute } from "src/common/functions";
import { BaseUser } from "src/common/classes/BaseUser";
import { IOrganizationManager } from "src/services/interface";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

export default class EditUser extends React.Component<EditUserProps, EditUserState> {
  constructor(props: EditUserProps){
    super(props);
    this.state = {
      user: new BaseUser(),
      userId: this.props.user?.id,
      cId: "",
      workflowId: "",
      loading: false
    }
  }

  UNSAFE_componentWillMount(){
    if(this.props.user && this.state.cId === ""){
      this.onGetUserInformation();
    }
  }

  private onGetUserInformation = async () => {
    if(this.state.cId !== "" || this.state.workflowId !== ""){
      this.setState({ workflowId: "", cId: "" });
    }
    let _organizationManager: IOrganizationManager = OrganizationManager.Instance;
    if(this.state.userId && this.props.organizationInfomation?.id) {
      this.setState({ loading: true });
      const user = await _organizationManager.GetDetailUserById(this.props.organizationInfomation.id, this.state.userId);
      this.setState({ user: user, loading: false });
    }
  }

  onSetCidAndWorkflowId = (cId: string, workflowId: string) => {
    this.setState({ cId: cId, workflowId: workflowId });
  }
  componentDidUpdate() {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
    );
    if (isReload) {
      this.onGetUserInformation();
      this.props.OnReloadOrganization(true);
      this.props.OnClearCidAndWorkflowId();
    }
  }

  private _mapCurrentTab = (str?: string): EditUserTabs => {
    switch (str) {
      case "Group":
        return EditUserTabs.Group;
      case "Sync Status":
        return EditUserTabs.Sync;
      default:
        return EditUserTabs.Profile;
    }
  };

  private _onUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  onHandleSearchGroup = () => {
    this._onUpdateConfirmType(TypeConfirm.Search);
  };

  RenderTabContent = () => {
    if (this.props.workingEditTab) {
      let workingEditTab = this.props.workingEditTab.Clone() as WorkingEditTab;
      let crtTab = workingEditTab.userTabs;
      switch (crtTab) {
        case EditUserTabs.Group:
          return <GroupTab onAddMoreAct={this.onHandleSearchGroup} />;
        case EditUserTabs.Sync:
          return <SyncTabs OnSetCIdAndWorkflowId={this.onSetCidAndWorkflowId} user={this.state.user}/>;
        default:
          return <ProfileTab loading={this.state.loading} user={this.state.user} />;
      }
    }
    return <ProfileTab loading={this.state.loading} user={this.state.user} />;
  };

  onChangeTab = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ): void => {
    if (item) {
      let { headerText } = item.props;
      let type = this._mapCurrentTab(headerText);
      if (
        this.props.workingEditTab &&
        this.props.workingEditTab.userTabs !== type &&
        this.props.OnUpdateWorkingEditTab
      ) {
        let workingEditTab =
          this.props.workingEditTab.Clone() as WorkingEditTab;
        workingEditTab.userTabs = type;
        this.props.OnUpdateWorkingEditTab(workingEditTab);
      }
    }
  };

  mapWorkingTabToNumber = (): string => {
    if (this.props.workingEditTab) {
      switch (this.props.workingEditTab.userTabs) {
        case EditUserTabs.Profile:
          return "0";
        case EditUserTabs.Group:
          return "1";
        case EditUserTabs.Sync:
          return "2";
        default:
          return "";
      }
    }
    return "";
  };

  render() {
    let idUserName = BuildRCAttribute("sp.org.name");
    return (
      <Wrapper className="EditWrapper" theme={this.props.theme}>
        {this.props.user && (
          <h4 className="edit__organizationName" {...idUserName}>
            {this.props.user.name}
          </h4>
        )}
        <MainContentWrapper
          className="MainContentWrapper"
          theme={this.props.theme}
        >
          <Pivot
            styles={{
              itemContainer: {
                width: "100%",
                height: "100%",
              },
            }}
            rcName="edtUser"
            onLinkClick={this.onChangeTab}
            darkMode={this.props.theme}
            selectedKey={this.mapWorkingTabToNumber()}
          >
            {EditUserPivotItem.map((item, index) => {
              return (
                <PivotItem
                  key={index}
                  headerText={item.text}
                  itemIcon={item.iconName}
                >
                  {this.RenderTabContent()}
                </PivotItem>
              );
            })}
          </Pivot>
        </MainContentWrapper>
      </Wrapper>
    );
  }
}
