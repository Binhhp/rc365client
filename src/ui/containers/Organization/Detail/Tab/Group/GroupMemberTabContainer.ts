import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import MemberTab from "src/ui/components/Organization/Detail/DetailPanel/Groups/Tabs/Member";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { compose } from "redux";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";
import {
  RemoveMemberFromGroupTGrRequest,
  RemoveMemberFromGroupTRsRequest,
  RemoveMemberFromGroupTUsRequest,
} from "src/repositories/request/Organizations/RemoveMemberFromGroupRequests";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    group: state.Organization.group,
    workingGroups: state.Organization.workingGroups,
    confirmType: state.AppReducer.confirmType,
    organizationInfomation: state.Organization.organizationInfomation,
    workingTab: state.Organization.workingTab,
    isEdtGroupLoading: state.AppReducer.isEdtGroupLoading,
    signalRConversationId: state.AppReducer.signalRConversationId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    isReload: state.Organization.isReload,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager = OrganizationManager.Instance;
  return {
    OnReloadOrganization: (isReload: boolean) => {
      dispatch(OrganizationReduxAction.ReloadOrganizationList(isReload));
    },

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
    OnRemoveUserInGroup: async (
      items: string[],
      id: string,
      groupId: string
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new RemoveMemberFromGroupTUsRequest();
      req.GroupId = groupId;
      req.UserIds = items;
      return await _organizationManager
        .RemoveMemberToGroupTUs(id, req)
        .then((res) => {
          return res;
        });
    },
    OnRemoveGroupInGroup: async (
      items: string[],
      id: string,
      groupId: string
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new RemoveMemberFromGroupTGrRequest();
      req.GroupId = groupId;
      req.ChildGroupIds = items;
      return await _organizationManager
        .RemoveMemberToGroupTGr(id, req)
        .then((res) => {
          return res;
        });
    },
    OnRemoveResourceInGroup: async (
      items: string[],
      id: string,
      groupId: string
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new RemoveMemberFromGroupTRsRequest();
      req.GroupId = groupId;
      req.ResourceIds = items;
      return await _organizationManager
        .RemoveMemberToGroupTRs(id, req)
        .then((res) => {
          return res;
        });
    },
  };
};

const MemberContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(MemberTab)
);

export default MemberContainer;
