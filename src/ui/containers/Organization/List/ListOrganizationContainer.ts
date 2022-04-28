import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import ListOrganizations from "src/ui/components/Organization/List/Content";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { IListOrganizationsProps } from "src/ui/components/Organization/List/Content/ContentModels";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { CreateOrganizationRequest } from "src/repositories/request";
import { TypeConfirm } from "src/entity/enums";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import {
  CreateOrganizationResponse,
  DeleteOrganizationResponse,
} from "src/repositories/response";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isOrganizationListLoading: state.AppReducer.isOrganizationListLoading,
    organizationList: state.Organization.organizationList,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    confirmType: state.AppReducer.confirmType,
    isWorking: state.AppReducer.isWorking,
    breadCrumb: state.AppReducer.breadCrumb,
    isOrgListLoading: state.AppReducer.isOrgListLoading,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: IListOrganizationsProps
) => {
  let _organizationManager = OrganizationManager.Instance;
  return {
    OnClearCidAndWorkflowId: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify());
    },
    
    OnHandleDeleteOrganization: async (
      id: string
    ): Promise<DeleteOrganizationResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      dispatch(OrganizationReduxAction.StoreChangeLoadingOrganizatonList());
      return await _organizationManager.DeleteOrganization(id).then((res) => {
        dispatch(OrganizationReduxAction.StoreOrganizationsList());
        dispatch(OrganizationReduxAction.StoreChangeLoadingOrganizatonList());
        return res;
      });
    },
    LoadOrganizationList: async () => {
      dispatch(OrganizationReduxAction.StoreChangeLoadingOrganizatonList());
      await _organizationManager.GetOrganizationList().then((res) => {
        if (res) {
          dispatch(OrganizationReduxAction.StoreOrganizationsList());
          dispatch(OrganizationReduxAction.StoreChangeLoadingOrganizatonList());
          dispatch(
            ApplicationReduxActionTS.UpdateOrganizationListLoadingAct(false)
          );
        }
      })
      .catch((err) => {
        dispatch(OrganizationReduxAction.StoreChangeLoadingOrganizatonList());
        dispatch(
          ApplicationReduxActionTS.UpdateOrganizationListLoadingAct(false)
        );
      });
    },
    OnHandleResetApplicationStore: () => {
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
    OnHandleCreateOrganization: async (
      name: string,
      domains: string
    ): Promise<CreateOrganizationResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let _organizationManager = OrganizationManager.Instance;
      let request = new CreateOrganizationRequest();
      request.Name = name;
      request.DomainName = domains;
      dispatch(OrganizationReduxAction.StoreChangeLoadingOrganizatonList());
      return await _organizationManager
        .CreateOrganizationTS(request)
        .then((res) => {
          dispatch(OrganizationReduxAction.StoreOrganizationsList());
          dispatch(OrganizationReduxAction.StoreChangeLoadingOrganizatonList());
          return res;
        });
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnHandleUpdateBreadCrumb: async (nodes: INodes[]) => {
      dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
    },
  };
};

const ListOrganizationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOrganizations);

export default ListOrganizationContainer;
