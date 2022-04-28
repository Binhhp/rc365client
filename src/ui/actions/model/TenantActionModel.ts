import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { IContextDatabases } from "src/repositories/response/Tenants/TenantContextResponse";
import { ActTenantTypeKeys } from "../enums";

export interface LoadTenantAct {
  type: typeof ActTenantTypeKeys.LOAD_TENANT_ITEMS;
}

export interface UpdateSelectedTenantAct {
  type: typeof ActTenantTypeKeys.UPDATE_SELECTED_TENANT;
  payload: BaseTenant[];
}

export interface UpdateWorkingTenantAct {
  type: typeof ActTenantTypeKeys.UPDATE_WORKING_TENANT;
  payload: BaseTenant;
}

export interface UpdateDetailFeatureVisibleAct {
  type: typeof ActTenantTypeKeys.UPDATE_VISIBLE_DETAIL_FEATURE;
  payload: boolean;
}

export interface UpdateWorkingFeatureAct {
  type: typeof ActTenantTypeKeys.UPDATE_WORKING_FEATURE;
  payload: BaseFeatureContextTenant;
}

export interface UpdateJsonConfigurationAct {
  type: typeof ActTenantTypeKeys.UPDATE_JSON_CONFIGURATION;
  payload: string;
}
export interface UpdateWorkingConfigurationAct {
  type: typeof ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION;
  payload: string;
}
export interface UpdateTenantCId {
  type: typeof ActTenantTypeKeys.UPDATE_TENANT_CONVERSATION_ID;
  payload: string;
}
export interface UpdateTenantWId {
  type: typeof ActTenantTypeKeys.UPDATE_TENANT_WORKFLOW_ID;
  payload: string;
}
export interface ResetTenantStoreAct {
  type: typeof ActTenantTypeKeys.RESET_TENANT_STORE;
}

export interface UpdateWorkingConfigurationContext {
  type: typeof ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION_CONTEXT;
  payload: BaseContext;
}

export interface UpdateWorkingConfigurationType {
  type: typeof ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION_TYPE;
  payload: string;
}
export interface UpdateLoggingConfiguration {
  type: typeof ActTenantTypeKeys.UPDATE_LOGGING_CONFIGURATION;
  payload: string;
}
export interface UpdateFeatureList {
  type: typeof ActTenantTypeKeys.UDPATE_TENANT_FEATURE_LIST;
  payload: BaseFeatureContextTenant[];
}
export interface UpdateContextList {
  type: typeof ActTenantTypeKeys.UDPATE_TENANT_CONTEXT_LIST;
  payload: BaseContext[];
}
export interface UpdateWorkingFeatureParameter {
  type: typeof ActTenantTypeKeys.UDPATE_WORKING_FEATURE_PARAMETER;
  payload: string;
}
export interface GetLicenceList {
  type: typeof ActTenantTypeKeys.GET_LICENCE_LIST;
  payload: string[];
}
export interface UpdateSelectedFeatures {
  type: typeof ActTenantTypeKeys.UDPATE_SELECTED_FEATURES;
  payload: BaseFeatureContextTenant[];
}
export interface UpdateSelectedContexts {
  type: typeof ActTenantTypeKeys.UDPATE_SELECTED_CONTEXTS;
  payload: BaseContext[];
}
export interface UpdateContextDatabases {
  type: typeof ActTenantTypeKeys.UDPATE_CONTEXT_DATABASES;
  payload: IContextDatabases[];
}
export interface UpdateContextKey {
  type: typeof ActTenantTypeKeys.UPDATE_INIT_CONTEXT_KEY;
  payload: string[];
}
export type TenantTypes =
  | UpdateContextKey
  | UpdateDetailFeatureVisibleAct
  | UpdateContextDatabases
  | UpdateSelectedContexts
  | UpdateSelectedFeatures
  | UpdateLoggingConfiguration
  | UpdateWorkingFeatureParameter
  | ResetTenantStoreAct
  | UpdateContextList
  | UpdateFeatureList
  | GetLicenceList
  | UpdateWorkingConfigurationType
  | UpdateJsonConfigurationAct
  | UpdateWorkingFeatureAct
  | LoadTenantAct
  | UpdateWorkingTenantAct
  | UpdateWorkingConfigurationAct
  | UpdateWorkingConfigurationContext
  | UpdateSelectedTenantAct
  | UpdateTenantCId
  | UpdateTenantWId;
