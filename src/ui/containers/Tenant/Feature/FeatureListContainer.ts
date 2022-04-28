import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import List from "src/ui/components/Tenant/Feature/List";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { TenantManager } from "src/services/implements/TenantManager";
import { Dispatch } from "redux";
import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingTenant: state.Tenant.workingTenants,
    isWorking: state.AppReducer.isWorking,
    confirmType: state.AppReducer.confirmType,
    workingContext: state.Tenant.workingContext,
    features: state.Tenant.features,
    contexts: state.Tenant.contexts,
    selectedFeatures: state.Tenant.selectedFeatures,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    tenantCId: state.Tenant.tenantCId,
    tenantWId: state.Tenant.tenantWId,
    signalRData: state.Organization.signalRData,
    selectedContexts: state.Tenant.selectedContexts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _tenantManagement = TenantManager.Instance;
  return {
    OnClearCidAndWorkflowId: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify());
    },
    OnUpdateConfigurationType: (str: string) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingConfigurationType(str));
    },
    OnGetFeaturesListInContext: async (tenantId: string) => {
      await _tenantManagement.GetFeaturesByTenantId(tenantId).then((res) => {
        dispatch(TenantReduxActionTS.onUpdateFeatureList());
      });
    },
    OnUpdateWorkingContext: async (key: string, contexts: BaseContext[]) => {
      let item = contexts.find((ct) => ct.contextKey === key);
      if (item) {
        dispatch(TenantReduxActionTS.onUpdateWorkingContext(item));
        dispatch(
          TenantReduxActionTS.onUpdateJsonConfig(item.stogareConfiguration)
        );
        dispatch(
          TenantReduxActionTS.onUpdateWorkingConfig(item.stogareConfiguration)
        );
      }
    },
    OnFetchStoreData: async (id: string) => {
      await _tenantManagement.GetFeaturesByTenantId(id).then((res) => {
        dispatch(TenantReduxActionTS.onUpdateFeatureList());
      });
      await _tenantManagement.GetContextsByTenantId(id).then((res) => {
        dispatch(TenantReduxActionTS.onUpdateContextsList());
      });
    },
    OnRestSignalRData: async () => {
      dispatch(OrganizationReduxAction.StoreUpdateSignalRData(null));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
    },
    OnResetStoreConfiguration: () => {
      dispatch(TenantReduxActionTS.onUpdateLoggingConfiguration(""));
      dispatch(TenantReduxActionTS.onUpdateWorkingConfig(""));
      dispatch(TenantReduxActionTS.onUpdateJsonConfig(""));
    },
    OnResetSignalRInfomations: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      dispatch(TenantReduxActionTS.onUpdateTenantCId(""));
      dispatch(TenantReduxActionTS.onUpdateTenantWId(""));
      dispatch(TenantReduxActionTS.onUpdateSelectedTenants([]));
      dispatch(TenantReduxActionTS.onUpdateSelectedFeatures([]));
      dispatch(TenantReduxActionTS.onUpdateSelectedContexts([]));
    },
    OnUpdateSelectedContexts: (items: any[]) => {
      dispatch(TenantReduxActionTS.onUpdateSelectedContexts(items));
    },
    OnUpdateSelectedFeatures: (features: BaseFeatureContextTenant[]) => {
      dispatch(TenantReduxActionTS.onUpdateSelectedFeatures(features));
    },
  };
};

const TenantFeatureListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default TenantFeatureListContainer;
