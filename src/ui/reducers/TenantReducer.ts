import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { TenantStoreModel } from "src/entity/model/TenantStoreModel";
import { IContextDatabases } from "src/repositories/response/Tenants/TenantContextResponse";
import { TenantTypes } from "src/ui/actions/model/TenantActionModel";
import { ActTenantTypeKeys } from "../actions/enums";

const HandleUpdateSelectedTenant = (
  state: TenantStoreModel,
  items: BaseTenant[]
): TenantStoreModel => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.selectedTenants = items;
  return copyState;
};
const HandleUpdateWorkingTenant = (
  state: TenantStoreModel,
  item: BaseTenant
): TenantStoreModel => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.workingTenants = item;
  return copyState;
};
const HandleUpdateVisibleDetailFeature = (
  state: TenantStoreModel,
  val: boolean
): TenantStoreModel => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.isDetailFeatureVisibled = val;
  return copyState;
};
const HandleUpdateWorkingFeature = (
  state: TenantStoreModel,
  item: BaseFeatureContextTenant
): TenantStoreModel => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.workingFeature = item;
  return copyState;
};
const HandleUpdateWorkingConfig = (
  state: TenantStoreModel,
  value: string
): TenantStoreModel => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.workingConfig = value;
  return copyState;
};
const HandleUpdateJsonConfig = (state: TenantStoreModel, value: string) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.sourceConfig = value;
  return copyState;
};
const HandleResetStore = (state: TenantStoreModel): TenantStoreModel => {
  let copyState = state.Clone() as TenantStoreModel;
  let newState = new TenantStoreModel();
  newState.workingTenants = copyState.workingTenants;
  newState.licences = copyState.licences;
  newState.contexts = copyState.contexts;
  newState.features = copyState.features;
  newState.tenantCId = copyState.tenantCId;
  newState.tenantWId = copyState.tenantWId;
  return newState;
};
const onHandleUpdateWorkingConfigurationContext = (
  state: TenantStoreModel,
  context: BaseContext
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.workingContext = context;
  return copyState;
};
const HandleSaveLicenceTS = (state: TenantStoreModel, licences: string[]) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.licences = licences;
  return copyState;
};
const HandleUpdateConfigurationType = (
  state: TenantStoreModel,
  type: string
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.configurationType = type;
  return copyState;
};
const HandleUpdateLoggingConfiguration = (
  state: TenantStoreModel,
  str: string
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.loggingConfig = str;
  return copyState;
};
const HandleUpdateFeatureList = (
  state: TenantStoreModel,
  features: BaseFeatureContextTenant[]
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.features = features;
  return copyState;
};
const HandleUpdateContextList = (
  state: TenantStoreModel,
  contexts: BaseContext[]
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.contexts = contexts;
  return copyState;
};
const HandleUpdateWorkingFeatureParameter = (
  state: TenantStoreModel,
  param: string
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.workingParameter = param;
  return copyState;
};
const HandleUpdateSelectedFeatures = (
  state: TenantStoreModel,
  features: BaseFeatureContextTenant[]
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.selectedFeatures = features;
  return copyState;
};
const HandleUpdateSelectedContexts = (
  state: TenantStoreModel,
  contexts: BaseContext[]
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.selectedContexts = contexts;
  return copyState;
};
const HandleUpdateContextDatabases = (
  state: TenantStoreModel,
  databases: IContextDatabases[]
) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.contextDatabases = databases;
  return copyState;
};
const HandleUpdateTenantCId = (state: TenantStoreModel, cId: string) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.tenantCId = cId;
  return copyState;
};
const HandleUpdateTenantWId = (state: TenantStoreModel, wId: string) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.tenantWId = wId;
  return copyState;
};
const HandleContextKeys = (state: TenantStoreModel, contextKeys: string[]) => {
  let copyState = state.Clone() as TenantStoreModel;
  copyState.contextKeys = contextKeys;
  return copyState;
}
const Tenant = (
  state = new TenantStoreModel(),
  action: TenantTypes
): TenantStoreModel => {
  switch (action.type) {
    
    case ActTenantTypeKeys.LOAD_TENANT_ITEMS:
      return state;
    case ActTenantTypeKeys.UPDATE_INIT_CONTEXT_KEY:
      return HandleContextKeys(state, action.payload);
    case ActTenantTypeKeys.UPDATE_SELECTED_TENANT:
      return HandleUpdateSelectedTenant(state, action.payload);
    case ActTenantTypeKeys.UPDATE_TENANT_CONVERSATION_ID:
      return HandleUpdateTenantCId(state, action.payload);
    case ActTenantTypeKeys.UPDATE_TENANT_WORKFLOW_ID:
      return HandleUpdateTenantWId(state, action.payload);
    case ActTenantTypeKeys.UDPATE_CONTEXT_DATABASES:
      return HandleUpdateContextDatabases(state, action.payload);
    case ActTenantTypeKeys.UDPATE_SELECTED_FEATURES:
      return HandleUpdateSelectedFeatures(state, action.payload);
    case ActTenantTypeKeys.UDPATE_SELECTED_CONTEXTS:
      return HandleUpdateSelectedContexts(state, action.payload);
    case ActTenantTypeKeys.UDPATE_TENANT_FEATURE_LIST:
      return HandleUpdateFeatureList(state, action.payload);
    case ActTenantTypeKeys.UDPATE_TENANT_CONTEXT_LIST:
      return HandleUpdateContextList(state, action.payload);
    case ActTenantTypeKeys.UPDATE_WORKING_TENANT:
      return HandleUpdateWorkingTenant(state, action.payload);
    case ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION_CONTEXT:
      return onHandleUpdateWorkingConfigurationContext(state, action.payload);
    case ActTenantTypeKeys.UPDATE_VISIBLE_DETAIL_FEATURE:
      return HandleUpdateVisibleDetailFeature(state, action.payload);
    case ActTenantTypeKeys.UPDATE_WORKING_FEATURE:
      return HandleUpdateWorkingFeature(state, action.payload);
    case ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION:
      return HandleUpdateWorkingConfig(state, action.payload);
    case ActTenantTypeKeys.UPDATE_JSON_CONFIGURATION:
      return HandleUpdateJsonConfig(state, action.payload);
    case ActTenantTypeKeys.UPDATE_WORKING_CONFIGURATION_TYPE:
      return HandleUpdateConfigurationType(state, action.payload);
    case ActTenantTypeKeys.RESET_TENANT_STORE:
      return HandleResetStore(state);
    case ActTenantTypeKeys.GET_LICENCE_LIST:
      return HandleSaveLicenceTS(state, action.payload);
    case ActTenantTypeKeys.UPDATE_LOGGING_CONFIGURATION:
      return HandleUpdateLoggingConfiguration(state, action.payload);
    case ActTenantTypeKeys.UDPATE_WORKING_FEATURE_PARAMETER:
      return HandleUpdateWorkingFeatureParameter(state, action.payload);
    default:
      return state;
  }
};

export default Tenant;
