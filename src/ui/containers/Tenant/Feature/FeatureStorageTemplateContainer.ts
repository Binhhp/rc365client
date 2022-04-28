import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import StorageTemplate from "src/ui/components/Tenant/Feature/Tabs/StorageTemplate";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { compose } from "redux";
import { Dispatch } from "redux";
import { ConversationIdResponse } from "src/repositories/response";
import { GetContextConfigurationRequest } from "src/repositories/request";
import { TenantManager } from "src/services/implements/TenantManager";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingFeature: state.Tenant.workingFeature,
    isWorking: state.AppReducer.isWorking,
    sourceConfig: state.Tenant.sourceConfig,
    workingConfig: state.Tenant.workingConfig,
    loggingConfig: state.Tenant.loggingConfig,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    confirmType: state.AppReducer.confirmType,
    signalRData: state.Organization.signalRData,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    workingTenant: state.Tenant.workingTenants,
    selectedContexts: state.Tenant.selectedContexts,
    workingContext: state.Tenant.workingContext,
    signalRConversationId: state.AppReducer.signalRConversationId
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _tenantManager = TenantManager.Instance;
  return {
    OnUpdateConversationId: (id: string) => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(id));
    },

    OnUpdateSignalRData: (val: any) => {
      dispatch(OrganizationReduxAction.StoreUpdateSignalRData(val));
    },

    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnResetApplicationStore: () => {
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
    OnUpdateWorkingConfig: (value: string) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingConfig(value));
    },
    onUpdateWorkingLogging: (str: string) => {
      dispatch(TenantReduxActionTS.onUpdateLoggingConfiguration(str));
    },
    OnGetContextDataBases: async (
      id: string,
      contextKeys: string[]
    ): Promise<ConversationIdResponse> => {
      let req = new GetContextConfigurationRequest();
      req.ContextKeys = contextKeys;
      return await _tenantManager.GetContextDatabases(req, id).then((res) => {
        dispatch(TenantReduxActionTS.onUpdateSContextDatabases());
        dispatch(NotificationReduxActionTS.onUpdateSignalRGetData(res.conversationId));
        return res;
      });
    },
  };
};

const StorageTemplateContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(StorageTemplate)
);

export default StorageTemplateContainer;
