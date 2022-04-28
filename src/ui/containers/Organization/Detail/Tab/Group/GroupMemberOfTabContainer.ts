import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import MemberOfTab from "src/ui/components/Organization/Detail/DetailPanel/Groups/Tabs/MemberOf";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { JoinAsMemberOfGroupsTGrRequests } from "src/repositories/request/Organizations/JoinAsMemberOfGroupsRequests";
import { LeaveGroupsTGrRequests } from "src/repositories/request";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    group: state.Organization.group,
    workingGroups: state.Organization.workingGroups,
    workingTab: state.Organization.workingTab,
    confirmType: state.AppReducer.confirmType,
    orgInfo: state.Organization.organizationInfomation,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager = OrganizationManager.Instance;
  return {
    OnClearCidAndWorkflowId: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify());
    },
    
    OnUpdateGroup: (group: BaseGroup) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditGroup(group));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdatePanelVisible: (val: boolean, type: TypePanel) => {
      dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(type));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      dispatch(OrganizationReduxAction.StoreResetWorkingData());
    },
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnLeaveGroup: async (
      orgId: string,
      grId: string,
      groups: BaseGroup[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new LeaveGroupsTGrRequests();
      req.ChildGroupId = grId;
      req.GroupIds = groups.map((gr) => {
        return gr.id;
      });
      return await _organizationManager
        .LeaveGroupsTGr(orgId, req)
        .then((res) => {
          return res;
        });
    },
    OnHandleAddGroupToGroups: async (
      orgId: string,
      grId: string,
      groups: BaseGroup[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new JoinAsMemberOfGroupsTGrRequests();
      req.ChildGroupId = grId;
      req.GroupIds = groups.map((gr) => {
        return gr.id;
      });
      return await _organizationManager
        .JoinAsMemberOfGroupsTGr(orgId, req)
        .then((res) => {
          return res;
        });
    },
  };
};

const MemberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberOfTab);

export default MemberContainer;
