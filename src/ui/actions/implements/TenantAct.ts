import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { IContextDatabases } from "src/repositories/response/Tenants/TenantContextResponse";
import { TenantManager } from "src/services/implements/TenantManager";
import { ActTenantTypeKeys } from "../enums";
import { TenantTypes } from "../model/TenantActionModel";

export class TenantReduxActionTS {
  public static onUpdateContextKeys = (
    items: string[]
  ): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_INIT_CONTEXT_KEY,
      payload: items
    };
  };
  public static onLoadTenantList = (): TenantTypes => {
    return {
      type: ActTenantTypeKeys.LOAD_TENANT_ITEMS,
    };
  };
  public static onUpdateSelectedTenants = (
    items: BaseTenant[]
  ): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_SELECTED_TENANT,
      payload: items,
    };
  };
  public static onUpdateWorkingTenant = (item?: BaseTenant): TenantTypes => {
    let workingTenant = TenantManager.Instance.workingTenant;
    return {
      type: ActTenantTypeKeys.UPDATE_WORKING_TENANT,
      payload: item ? item : workingTenant,
    };
  };
  public static onUpdateWorkingFeature = (
    item: BaseFeatureContextTenant
  ): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_WORKING_FEATURE,
      payload: item,
    };
  };
  public static onUpdateFeatureVisibledDetail = (val: boolean): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_VISIBLE_DETAIL_FEATURE,
      payload: val,
    };
  };
  public static onUpdateJsonConfig = (val: string): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_JSON_CONFIGURATION,
      payload: val,
    };
  };
  public static onUpdateWorkingConfig = (val: string): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION,
      payload: val,
    };
  };
  public static onResetTenantStore = (): TenantTypes => {
    return {
      type: ActTenantTypeKeys.RESET_TENANT_STORE,
    };
  };

  public static onUpdateWorkingContext = (
    contexts: BaseContext
  ): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION_CONTEXT,
      payload: contexts,
    };
  };

  public static onGetLicenceList = (licences: string[]): TenantTypes => {
    return {
      type: ActTenantTypeKeys.GET_LICENCE_LIST,
      payload: licences,
    };
  };
  public static onUpdateWorkingConfigurationType = (
    type: string
  ): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION_TYPE,
      payload: type,
    };
  };
  public static onUpdateLoggingConfiguration = (str: string): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_LOGGING_CONFIGURATION,
      payload: str,
    };
  };
  public static onUpdateWorkingFeatureParameter = (
    str: string
  ): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UDPATE_WORKING_FEATURE_PARAMETER,
      payload: str,
    };
  };
  public static onUpdateTenantCId = (str: string): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_TENANT_CONVERSATION_ID,
      payload: str,
    };
  };
  public static onUpdateTenantWId = (str: string): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UPDATE_TENANT_WORKFLOW_ID,
      payload: str,
    };
  };
  public static onUpdateFeatureList = (
    features?: BaseFeatureContextTenant[]
  ): TenantTypes => {
    let serviceFeatures = TenantManager.Instance.features;
    return {
      type: ActTenantTypeKeys.UDPATE_TENANT_FEATURE_LIST,
      payload: features ? features : serviceFeatures,
    };
  };
  public static onUpdateContextsList = (
    contexts?: BaseContext[]
  ): TenantTypes => {
    let serviceContexts = TenantManager.Instance.contexts;
    return {
      type: ActTenantTypeKeys.UDPATE_TENANT_CONTEXT_LIST,
      payload: contexts ? contexts : serviceContexts,
    };
  };
  public static onUpdateSelectedContexts = (
    contexts: BaseContext[]
  ): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UDPATE_SELECTED_CONTEXTS,
      payload: contexts,
    };
  };
  public static onUpdateSContextDatabases = (
    databases?: IContextDatabases[]
  ): TenantTypes => {
    let contextDatabases = TenantManager.Instance.contextDatabases;
    return {
      type: ActTenantTypeKeys.UDPATE_CONTEXT_DATABASES,
      payload: databases ? databases : contextDatabases,
    };
  };
  public static onUpdateSelectedFeatures = (
    features: BaseFeatureContextTenant[]
  ): TenantTypes => {
    return {
      type: ActTenantTypeKeys.UDPATE_SELECTED_FEATURES,
      payload: features,
    };
  };
}
