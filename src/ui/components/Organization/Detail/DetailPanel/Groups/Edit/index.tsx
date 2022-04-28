import * as React from "react";
import { EditWrapper, MainWrapper } from "./EditStyle";
import { IEditGroupProps, IEditGroupState } from "./EditModel";
import { EditGroupTabs, TypeConfirm } from "src/entity/enums";
import GeneralTab from "src/ui/containers/Organization/Detail/Tab/Group/GroupGeneralTabContainer";
import MemberTab from "src/ui/containers/Organization/Detail/Tab/Group/GroupMemberTabContainer";
import MemberOfTab from "src/ui/containers/Organization/Detail/Tab/Group/GroupMemberOfTabContainer";
import SyncTab from "src/ui/containers/Organization/Detail/Tab/Group/GroupSyncTabContainer";
import { PivotItem } from "aod-dependencies/Pivot";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
// import Pivot from 'aod-dependencies/Pivot/CustomPivot';
// import ConfirmContent from "src/common/ui/Confirm/Content";
import { EditGroupPivotItem } from "src/common/constants";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { BuildRCAttribute } from "src/common/functions";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { IOrganizationManager } from "src/services/interface";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

export default class EditGroup extends React.Component<IEditGroupProps, IEditGroupState> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IEditGroupProps) {
    super(props);
    this.Action = React.createRef();
    this.state = {
      group: new BaseGroup(),
      groupId: this.props.group?.id,
      cId: "",
      workflowId: "",
      loading: false
    }
  }

  UNSAFE_componentWillMount(){
    if(this.props.group && this.state.cId === ""){
      this.onGetGroupInformation();
    }
  }

  componentDidUpdate() {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
    );
    if (isReload) {
      this.onGetGroupInformation();
      this.props.OnReloadOrganization(true);
      this.props.OnClearCidAndWorkflowId();
    }
  }

  private onGetGroupInformation = async () => {
    if(this.state.cId !== "" || this.state.workflowId !== ""){
      this.setState({ workflowId: "", cId: "" });
    }
    let _organizationManager: IOrganizationManager = OrganizationManager.Instance;
    if(this.state.groupId && this.props.organizationInfomation?.id) {
      this.setState({ loading: true });
      const group = await _organizationManager.GetGroupById(this.props.organizationInfomation.id, this.state.groupId);
      this.setState({ group: group, loading: false });
    }
  }

  private _mapCurrentTab = (str?: string): EditGroupTabs => {
    switch (str) {
      case "Member":
        return EditGroupTabs.Member;
      case "Member Of":
        return EditGroupTabs.MemberOf;
      case "Sync Status":
        return EditGroupTabs.Sync;
      default:
        return EditGroupTabs.General;
    }
  };

  private _onUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _mapWorkingTab = (type?: EditGroupTabs): string | undefined => {
    if (type) {
      switch (type) {
        case EditGroupTabs.Member:
          return "1";
        case EditGroupTabs.MemberOf:
          return "2";
        case EditGroupTabs.Sync:
          return "3";
        default:
          return "0";
      }
    }
    return undefined;
  };

  onHandleRemoveMember = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleRemoveMember();
  };

  onHandleSearchGroup = () => {
    this._onUpdateConfirmType(TypeConfirm.Search);
  };

  onSetCidAndWorkflowId = (cId: string, workflowId: string) => {
    this.setState({ cId: cId, workflowId: workflowId });
  }

  RenderTabContent = () => {
    if (this.props.workingEditTab) {
      let workingEditTab = this.props.workingEditTab.Clone() as WorkingEditTab;
      let crtTab = workingEditTab.groupTabs;
      switch (crtTab) {
        case EditGroupTabs.Member:
          return <MemberTab ref={this.Action} />;
        case EditGroupTabs.MemberOf:
          return <MemberOfTab />;
        case EditGroupTabs.Sync:
          return <SyncTab OnSetCIdAndWorkflowId={this.onSetCidAndWorkflowId} group={this.state.group}/>;
        default:
          return <GeneralTab loading={this.state.loading} group={this.state.group} />;
      }
    }
    return <GeneralTab loading={this.state.loading} group={this.state.group}/>;
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
        this.props.workingEditTab.groupTabs !== type &&
        this.props.OnUpdateWorkingEditTab
      ) {
        let workingEditTab =
          this.props.workingEditTab.Clone() as WorkingEditTab;
        workingEditTab.groupTabs = type;
        this.props.OnUpdateWorkingEditTab(workingEditTab);
      }
    }
  };

  render() {
    let idGrName = BuildRCAttribute("sp.group.name");
    return (
      <EditWrapper className="EditWrapper" theme={this.props.theme}>
        {this.props.group && (
          <h4 {...idGrName} className="edit__organizationName">
            {this.props.group.name}
          </h4>
        )}
        <MainWrapper className="MainWrapper" theme={this.props.theme}>
          <Pivot
            styles={{
              itemContainer: {
                width: "100%",
                height: "100%",
              },
            }}
            rcName="edtGroup"
            onLinkClick={this.onChangeTab}
            darkMode={this.props.theme}
            selectedKey={this._mapWorkingTab(
              this.props.workingEditTab
                ? this.props.workingEditTab.groupTabs
                : EditGroupTabs.General
            )}
          >
            {EditGroupPivotItem.map((item, index) => {
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
        </MainWrapper>
      </EditWrapper>
    );
  }
}
