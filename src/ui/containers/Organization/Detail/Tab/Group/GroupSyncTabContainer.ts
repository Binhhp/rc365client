import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import SyncTab from "src/ui/components/Organization/Detail/DetailPanel/Groups/Tabs/Sync";
import { ConversationIdResponse } from "src/repositories/response";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    user: state.Organization.user,
    orgInfo: state.Organization.organizationInfomation,
    isLoadingNotify: state.NotificationsReducer.isLoadingWorkflow
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnStartSynchGroup: async (
      id: string,
      group: BaseGroup
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let res = new ConversationIdResponse();
      return await res;
      // let req = new SyncSelectedUserRequest();
      // let items = [group];
      // let guids: SynchUseraAndResource[] = items.map((i) => {
      //   let item = new SynchUseraAndResource();
      //   item.Email = i.email;
      //   item.Type = "Group";
      //   return item;
      // });
      // req.UserAndResourceRequests = guids;
      // return await _organizationManager.SyncSelectedItems(id, req);
    },
    OnStopSynchGroup: async (
      id: string,
      group: BaseGroup
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let res = new ConversationIdResponse();
      return await res;
      // let req = new StopSyncSelectedUserRequest();
      // let items = [group];
      // let guids: SynchUseraAndResource[] = items.map((i) => {
      //   let item = new SynchUseraAndResource();
      //   item.Email = i.email;
      //   item.Type = "Group";
      //   return item;
      // });
      // req.UserAndResourceRequests = guids;
      // return await _organizationManager.StopSyncSelectedItems(id, req);
    },
  };
};

const SyncTabContainer = connect(mapStateToProps, mapDispatchToProps)(SyncTab);

export default SyncTabContainer;
