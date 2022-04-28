import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import SyncTab from "src/ui/components/Organization/Detail/DetailPanel/Users/Tabs/Sync";
import { IOrganizationManager } from "src/services/interface";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { ConversationIdResponse } from "src/repositories/response";
import {
  StopSyncSelectedUserRequest,
  SynchUseraAndResource,
  SyncSelectedUserRequest,
} from "src/repositories/request";
import { BaseUser } from "src/common/classes/BaseUser";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    orgInfo: state.Organization.organizationInfomation,
    isLoadingNotify: state.NotificationsReducer.isLoadingWorkflow
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager: IOrganizationManager = OrganizationManager.Instance;
  return {
    OnStartSynchUser: async (
      id: string,
      user: BaseUser
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new SyncSelectedUserRequest();
      let items = [user];
      let guids: SynchUseraAndResource[] = items.map((i) => {
        let item = new SynchUseraAndResource();
        item.Email = i.email;
        item.Type = "User";
        return item;
      });
      req.UserAndResourceRequests = guids;
      return await _organizationManager
        .SyncSelectedItems(id, req)
        .then((res) => {
          return res;
        });
    },
    OnStopSynchUser: async (
      id: string,
      user: BaseUser
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new StopSyncSelectedUserRequest();
      let items = [user];
      let guids: SynchUseraAndResource[] = items.map((i) => {
        let item = new SynchUseraAndResource();
        item.Email = i.email;
        item.Type = "User";
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

const SyncTabContainer = connect(mapStateToProps, mapDispatchToProps)(SyncTab);

export default SyncTabContainer;
