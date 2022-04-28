import { appReducers } from "src/ui/reducers";
import { compose } from "redux";
import { connect } from "react-redux";
import GroupTab from "src/ui/components/Organization/Detail/DetailPanel/Users/Tabs/Group";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { BaseUser } from "src/common/classes/BaseUser";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { JoinAsMemberOfGroupsTUsRequests } from "src/repositories/request/Organizations/JoinAsMemberOfGroupsRequests";
import { LeaveGroupsTUsRequests } from "src/repositories/request";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    user: state.Organization.user,
    confirmType: state.AppReducer.confirmType,
    isWorking: state.AppReducer.isWorking,
    orgInfo: state.Organization.organizationInfomation,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
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
    
    OnUpdateIsConfirm: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmCreateAct(val));
    },
    OnUpdateUser: (user: BaseUser) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditUser(user));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdatePanelVisible: (val: boolean, type: TypePanel) => {
      dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(type));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      dispatch(OrganizationReduxAction.StoreResetWorkingData());
    },
    OnAddUserToGroups: async (
      orgId: string,
      usId: string,
      groups: BaseGroup[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let grIds = groups.map((gr) => {
        return gr.id;
      });
      let req = new JoinAsMemberOfGroupsTUsRequests();
      req.GroupIds = grIds;
      req.UserId = usId;
      return await _organizationManager
        .JoinAsMemberOfGroupsTUs(orgId, req)
        .then((res) => {
          return res;
        });
    },
    OnRemoveUserFromGroups: async (
      orgId: string,
      usId: string,
      groups: BaseGroup[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new LeaveGroupsTUsRequests();
      req.UserId = usId;
      req.GroupIds = groups.map((gr) => {
        return gr.id;
      });
      return await _organizationManager
        .LeaveGroupsTUs(orgId, req)
        .then((res) => {
          return res;
        });
    },
  };
};

const GroupTabContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(GroupTab)
);

export default GroupTabContainer;
