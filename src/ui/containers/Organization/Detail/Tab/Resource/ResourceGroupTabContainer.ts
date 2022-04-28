import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import GroupsTab from "src/ui/components/Organization/Detail/DetailPanel/Resources/Tabs/Groups";
import { BaseResource } from "src/common/classes/BaseResource";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";
import { LeaveGroupsTRsRequests } from "src/repositories/request/Organizations/LeaveGroupRequests";
import { JoinAsMemberOfGroupsTRsRequests } from "src/repositories/request/Organizations/JoinAsMemberOfGroupsRequests";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    resource: state.Organization.resource,
    workingEditItems: state.Organization.workingEditItems,
    org: state.Organization.organizationInfomation,
    isSearchInPanel: state.AppReducer.isSearchInPanel,
    signalRConversationId: state.AppReducer.signalRConversationId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager = OrganizationManager.Instance;
  return {
    OnHandleUpdateResource: (resource: BaseResource) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditResource(resource));
    },
    OnHandleUpdateSearchInPanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateIsSearchInPanelAct(val));
    },
    OnHandleLeaveGroup: async (
      orgId: string,
      rsId: string,
      groups: BaseGroup[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new LeaveGroupsTRsRequests();
      let groupIds = groups.map((gr) => {
        return gr.id;
      });
      req.ResourceId = rsId;
      req.GroupIds = groupIds;
      return await _organizationManager
        .LeaveGroupsTRs(orgId, req)
        .then((res) => {
          return res;
        });
    },
    OnHandleAddResourceToGroup: async (
      orgId: string,
      rsId: string,
      groups: BaseGroup[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new JoinAsMemberOfGroupsTRsRequests();
      let groupIds = groups.map((gr) => {
        return gr.id;
      });
      req.ResourceId = rsId;
      req.GroupIds = groupIds;
      return await _organizationManager
        .JoinAsMemberOfGroupsTRs(orgId, req)
        .then((res) => {
          return res;
        });
    },
  };
};

const OrderTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsTab);

export default OrderTabContainer;
