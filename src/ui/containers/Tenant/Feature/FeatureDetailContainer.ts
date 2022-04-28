import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import DetailFeature from "src/ui/components/Tenant/Feature/Detail";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { TypeConfirm } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TenantManager } from "src/services/implements/TenantManager";
import {
  ConfigurationRequest,
  ConfigurationStorageRequest,
  InitContextConfigurationRequest,
  UpdateConfigurationRequest,
  UpdateStorageConfigurationRequest,
} from "src/repositories/request/Tenants";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { ConversationIdResponse } from "src/repositories/response";
import { Dispatch } from "redux";
import { BaseContext } from "src/common/classes/BaseContext";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const onHandleGetParameterVal = (obj: any, childObj?: any): any => {
  if (!childObj) {
    for (const key in obj) {
      if (key === "Parameters") {
        return JSON.stringify(obj[key]);
      }
      if (key !== "Parameters" && typeof obj[key] === "object") {
        return onHandleGetParameterVal(obj, obj[key]);
      }
    }
  }
  if (childObj && typeof childObj === "object" && !Array.isArray(childObj)) {
    for (const key in childObj) {
      if (key === "Parameters") {
        return JSON.stringify(childObj[key]);
      }
      if (key !== "Parameters" && typeof childObj[key] === "object") {
        return onHandleGetParameterVal(obj, childObj);
      }
    }
  }
  if (childObj && typeof childObj === "object" && Array.isArray(childObj)) {
    childObj.forEach((i: any) => {
      if (typeof i === "object") {
        return onHandleGetParameterVal(obj, i);
      }
    });
  }
};

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingFeature: state.Tenant.workingFeature,
    workingTenant: state.Tenant.workingTenants,
    isWorking: state.AppReducer.isWorking,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    confirmType: state.AppReducer.confirmType,
    workingConfig: state.Tenant.workingConfig,
    isDetailFeatureVisibled: state.Tenant.isDetailFeatureVisibled,
    workingContext: state.Tenant.workingContext,
    configurationType: state.Tenant.configurationType,
    loggingConfig: state.Tenant.loggingConfig,
    features: state.Tenant.features,
    contexts: state.Tenant.contexts,
    workingParameter: state.Tenant.workingParameter,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    sourceConfig: state.Tenant.sourceConfig,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _tenantManagement = TenantManager.Instance;
  return {
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateWorkingFeature: (item: BaseFeatureContextTenant) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingFeature(item));
    },
    OnUpdateWorkingContext: (item: BaseContext) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingContext(item));
    },
    OnUpdateSourceConfig: (config: string) => {
      dispatch(TenantReduxActionTS.onUpdateJsonConfig(config));
      dispatch(TenantReduxActionTS.onUpdateWorkingConfig(config));
    },
    OnUpdateVisiblePagePanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
    },
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateWorkingConfig: (config: string) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingConfig(config));
    },
    OnResetResetTenantStore: () => {
      dispatch(TenantReduxActionTS.onResetTenantStore());
      dispatch(TenantReduxActionTS.onUpdateWorkingConfig(""));
    },
    OnResetSignalRInfomations: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
    },
    OnFetchStoreData: async (id: string) => {
      await _tenantManagement.GetFeaturesByTenantId(id).then((res) => {
        dispatch(TenantReduxActionTS.onUpdateFeatureList());
      });
      await _tenantManagement.GetContextsByTenantId(id).then((res) => {
        dispatch(TenantReduxActionTS.onUpdateContextsList());
      });
    },
    OnUpdateWorkingFeatureParameter: (feature: BaseFeatureContextTenant) => {
      if (feature.configuration && feature.configuration.trim() !== "") {
        let source = "";
        try {
          source = JSON.parse(feature.configuration.trim());
        } catch {}
        if (source) {
          let param = onHandleGetParameterVal(source);
          dispatch(TenantReduxActionTS.onUpdateWorkingFeatureParameter(param));
        }
      }
    },
    OnGetFeaturesListInContext: async (tenantId: string) => {
      return await _tenantManagement
        .GetFeaturesByTenantId(tenantId)
        .then((res) => {
          dispatch(TenantReduxActionTS.onUpdateFeatureList());
        });
    },
    OnUpdateFeatureConfigTS: async (
      config: string,
      feature: BaseFeatureContextTenant,
      tenant: BaseTenant,
      isParameter?: boolean
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new UpdateConfigurationRequest();
      let arrConfig = config.split("\n").map((c) => {
        return c.trim();
      });
      let newConfig = arrConfig.join("");
      let arrFeature = [feature];
      let rs = arrFeature.map((f) => {
        let item = new ConfigurationRequest();
        item.Configuration = f.configuration;
        if (
          f.featureKey === feature.featureKey &&
          f.contextKey === feature.contextKey &&
          !isParameter
        ) {
          item.Configuration = newConfig;
        }
        item.ContextKey = f.contextKey;
        item.FeatureKey = f.featureKey;
        item.IsEnabled = f.isEnabled;
        item.Version = f.version;
        return item;
      });
      req.Configurations = rs;
      return await _tenantManagement
        .UpdateConfiguration(tenant.id, req)
        .then((res) => {
          if (res) {
            if (
              req.Configurations[0].Configuration &&
              req.Configurations[0].Configuration.trim() !== ""
            ) {
              let source = "";
              try {
                source = JSON.parse(req.Configurations[0].Configuration.trim());
              } catch {}
              if (source) {
                let param = onHandleGetParameterVal(source);
                dispatch(
                  TenantReduxActionTS.onUpdateWorkingFeatureParameter(param)
                );
              }
            }
            // dispatch(TenantReduxActionTS.onUpdateTenantCId(res.conversationId));
            // dispatch(
            //   TenantReduxActionTS.onUpdateTenantWId(
            //     res.workflowId ? res.workflowId : ""
            //   )
            // );
          }
          return res;
        });
    },
    OnUpdateFeatureConfigWithParamsTS: async (
      feature: BaseFeatureContextTenant,
      tenant: BaseTenant
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new UpdateConfigurationRequest();
      let arrFeature = [feature];
      let rs = arrFeature.map((f) => {
        let item = new ConfigurationRequest();
        item.Configuration = f.configuration;
        item.ContextKey = f.contextKey;
        item.FeatureKey = f.featureKey;
        item.IsEnabled = f.isEnabled;
        item.Version = f.version;
        return item;
      });
      req.Configurations = rs;
      return await _tenantManagement
        .UpdateConfiguration(tenant.id, req)
        .then((res) => {
          if (res) {
            dispatch(
              TenantReduxActionTS.onUpdateWorkingConfig(
                req.Configurations[0].Configuration
              )
            );
            dispatch(
              TenantReduxActionTS.onUpdateJsonConfig(
                req.Configurations[0].Configuration
              )
            );
            // dispatch(TenantReduxActionTS.onUpdateTenantCId(res.conversationId));
            // dispatch(
            //   TenantReduxActionTS.onUpdateTenantWId(
            //     res.workflowId ? res.workflowId : ""
            //   )
            // );
          }
          return res;
        });
    },
    OnUpdateContextConfiguration: async (
      tenant: BaseTenant,
      config: string,
      workingContext: BaseContext
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let arrContext = [workingContext];
      let contextReqs = arrContext.map((c) => {
        let item = new ConfigurationStorageRequest();
        item.Configuration = c.stogareConfiguration;
        item.ContextKey = c.contextKey;
        if (c.contextKey === workingContext.contextKey) {
          item.Configuration = config;
        }
        return item;
      });
      let req = new UpdateStorageConfigurationRequest();
      req.Configurations = contextReqs;
      return await _tenantManagement
        .UpdateStorageConfiguration(tenant.id, req)
        .then((res) => {
          if (res) {
            dispatch(TenantReduxActionTS.onUpdateTenantCId(res.conversationId));
            dispatch(
              TenantReduxActionTS.onUpdateTenantWId(
                res.workflowId ? res.workflowId : ""
              )
            );
          }
          return res;
        });
    },
    OnUpdateDetailFeatureVisibled: (val: boolean) => {
      dispatch(TenantReduxActionTS.onUpdateFeatureVisibledDetail(val));
    },
    OnInitContextConfiguration: async (
      id: string,
      loggingConfig: string,
      contextKey: string,
      storageConfig: string
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new InitContextConfigurationRequest();
      req.Context = contextKey;
      req.StorageConfiguration = storageConfig;
      req.LoggingConfiguration = loggingConfig;
      return await _tenantManagement
        .InitContextConfiguration(req, id)
        .then((res) => {
          if (res) {
            dispatch(TenantReduxActionTS.onUpdateTenantCId(res.conversationId));
            dispatch(
              TenantReduxActionTS.onUpdateTenantWId(
                res.workflowId ? res.workflowId : ""
              )
            );
          }
          return res;
        });
    },
  };
};

const FeatureDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailFeature);

export default FeatureDetailContainer;
