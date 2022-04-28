import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import {
  ItemInMultipleContextRequest,
  ItemInMultipleFeatureRequest,
  IUpdateMultipleContextRequest,
  IUpdateMultipleFeatureRequest,
} from "src/repositories/request";
import { TenantManager } from "src/services/implements/TenantManager";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import FeatureConfigCommon from "src/ui/components/Tenant/Feature/Tabs/ConfigCommon";
import { IWorkingStorageConfig } from "src/ui/components/Tenant/Feature/Tabs/StorageTemplate/StorageTemplateModel";
import { appReducers } from "src/ui/reducers";

const onHandleConvertWorkingConfigToStringJson = (item: any) => {
  let result: string[] = [];
  for (const key in item) {
    if (
      !["key", "connectionString", "contextKey", "featureKey"].includes(key)
    ) {
      let str = `${key}=${item[key]}`;
      result.push(str);
    }
  }
  if (result.length > 0) {
    return result.join(";");
  }
  return "";
};

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingFeature: state.Tenant.workingFeature,
    isWorking: state.AppReducer.isWorking,
    editorValue: state.Tenant.sourceConfig,
    workingConfig: state.Tenant.workingConfig,
    workingContext: state.Tenant.workingContext,
    loggingConfig: state.Tenant.loggingConfig,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    confirmType: state.AppReducer.confirmType,
    selectedFeatures: state.Tenant.selectedFeatures,
    selectedContexts: state.Tenant.selectedContexts,
    contextKeys: state.Tenant.contextKeys,
    workingTenant: state.Tenant.workingTenants,
    signalRConversationId: state.AppReducer.signalRConversationId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRData: state.Organization.signalRData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _tenantManager = TenantManager.Instance;
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnResetApplicationStore: () => {
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
    onUpdateWorkingConfig: (value: string) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingConfig(value));
    },
    onUpdateWorkingLogging: (str: string) => {
      dispatch(TenantReduxActionTS.onUpdateLoggingConfiguration(str));
    },
    OnResetSignalRData: () => {
      dispatch(OrganizationReduxAction.StoreUpdateSignalRData(null));
    },
    onUpdateConfigurationContexts: async (
      id: string,
      items: IWorkingStorageConfig[],
      selectedItems: string[],
      loggingStr: string
    ) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let reqItem = items.map((i) => {
        let item = new ItemInMultipleContextRequest();
        item.Name = i.featureKey;
        item.ConnectionString = onHandleConvertWorkingConfigToStringJson(i);
        item.ContextKey = i.contextKey;
        return item;
      });
      let req = new IUpdateMultipleContextRequest();
      req.ContextKeys = selectedItems;
      req.Configurations = reqItem;
      if (loggingStr !== "") {
        req.InitConfiguration = loggingStr;
      }
      await _tenantManager.UpdateConfigurationgContexts(id, req).then((res) => {
        if (res) {
          dispatch(TenantReduxActionTS.onUpdateTenantCId(res.conversationId));
          dispatch(
            TenantReduxActionTS.onUpdateTenantWId(
              res.workflowId ? res.workflowId : ""
            )
          );
        }
      });
    },
    onUpdateConfigurationFeatures: async (
      id: string,
      features: BaseFeatureContextTenant[],
      val: string
    ) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let reqItem = features.map((i) => {
        let item = new ItemInMultipleFeatureRequest();
        item.ContextKey = i.contextKey;
        item.FeatureKey = i.featureKey;
        return item;
      });
      let req = new IUpdateMultipleFeatureRequest();
      req.Value = val;
      req.Features = reqItem;
      await _tenantManager.UpdateConfigurationgFeatures(id, req).then((res) => {
        if (res) {
          dispatch(TenantReduxActionTS.onUpdateTenantCId(res.conversationId));
          dispatch(
            TenantReduxActionTS.onUpdateTenantWId(
              res.workflowId ? res.workflowId : ""
            )
          );
        }
      });
    },
  };
};

const FeatureConfigCommonContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(FeatureConfigCommon)
);

export default FeatureConfigCommonContainer;
