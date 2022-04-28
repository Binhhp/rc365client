import { connect } from "react-redux";
import { compose } from "redux";
import {
  StopSyncSelectedUserRequest,
  SynchUseraAndResource,
  SyncSelectedUserRequest,
} from "src/repositories/request";
import {
  ConversationIdResponse,
  OrgSyncUserResourceItem,
} from "src/repositories/response";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { IOrganizationManager } from "src/services/interface";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import List from "src/ui/components/Organization/Detail/DetailPanel/Application/List";
import { appReducers } from "src/ui/reducers";
import { Dispatch } from "redux";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isApplicationInfomationLoading:
      state.AppReducer.isApplicationInfomationLoading,
    user: state.userReducer,
    workingAppItems: state.Organization.workingAppItems,
    org: state.Organization.organizationInfomation,
    isLoadingNotify: state.NotificationsReducer.isLoadingWorkflow,
    isHaveMessageSyncSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager: IOrganizationManager = OrganizationManager.Instance;
  return {
    OnClearCidAndWorkflowId: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify());
    },

    OnUpdateWorkingAppItems: (items: OrgSyncUserResourceItem[]) => {
      dispatch(
        OrganizationReduxAction.StoreUpdateWorkingApplicationItems(items)
      );
    },
    OnGetSynchronizeInfomationList: async (
      id: string
    ): Promise<OrgSyncUserResourceItem[]> => {
      let result = await _organizationManager.GetSynchronizeInfomationList(id);
      return result;
    },
    OnSyncAllUsers: async (id: string): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      return await _organizationManager.SyncAllUsers(id).then((res) => {
        return res;
      });
    },
    OnStopSyncAllUsers: async (id: string): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      return await _organizationManager.StopSyncAllUsers(id).then((res) => {
        return res;
      });
    },
    OnSyncSelectedItems: async (
      id: string,
      selectedItems: any[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new SyncSelectedUserRequest();
      let guids: SynchUseraAndResource[] = selectedItems.map((i) => {
        let item = new SynchUseraAndResource();
        item.Email = i.email;
        item.Type = i.type;
        return item;
      });
      req.UserAndResourceRequests = guids;
      return await _organizationManager
        .SyncSelectedItems(id, req)
        .then((res) => {
          return res;
        });
    },
    OnStopSyncSelectedItems: async (
      id: string,
      selectedItems: any[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new StopSyncSelectedUserRequest();
      let guids: SynchUseraAndResource[] = selectedItems.map((i) => {
        let item = new SynchUseraAndResource();
        item.Email = i.email;
        item.Type = i.type;
        return item;
      });
      req.UserAndResourceRequests = guids;
      return await _organizationManager
        .StopSyncSelectedItems(id, req)
        .then((res) => {
          return res;
        });
    },
  };
};

const ApplicationContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(List)
);

export default ApplicationContainer;
