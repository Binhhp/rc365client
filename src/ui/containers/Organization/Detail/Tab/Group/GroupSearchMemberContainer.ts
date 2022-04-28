import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  AddMemberToGroupTGrRequest,
  AddMemberToGroupTRsRequest,
  AddMemberToGroupTUsRequest,
} from "src/repositories/request/Organizations/AddMemberToGroupRequests";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import Search from "src/ui/components/Organization/Detail/DetailPanel/Groups/Tabs/Search";
import { appReducers } from "src/ui/reducers";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    workingTab: state.Organization.workingTab,
    orgInfo: state.Organization.organizationInfomation,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRData: state.Organization.signalRData,
    group: state.Organization.group,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager = OrganizationManager.Instance;
  return {
    OnUpdateSignalRActionType: () => {
      console.log("OnUpdateSignalRActionType");
    },
    OnAddUserToGroup: async (
      items: string[],
      id: string,
      groupId: string
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new AddMemberToGroupTUsRequest();
      req.GroupId = groupId;
      req.UserIds = items;
      return await _organizationManager
        .AddMemberToGroupTUs(id, req)
        .then((res) => {
          return res;
        });
    },
    OnAddGroupToGroup: async (
      items: string[],
      id: string,
      groupId: string
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new AddMemberToGroupTGrRequest();
      req.GroupId = groupId;
      req.ChildGroupIds = items;
      return await _organizationManager
        .AddMemberToGroupTGr(id, req)
        .then((res) => {
          return res;
        });
    },
    OnAddResourceToGroup: async (
      items: string[],
      id: string,
      groupId: string
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new AddMemberToGroupTRsRequest();
      req.GroupId = groupId;
      req.ResourceIds = items;
      return await _organizationManager
        .AddMemberToGroupTRs(id, req)
        .then((res) => {
          return res;
        });
    },
  };
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
