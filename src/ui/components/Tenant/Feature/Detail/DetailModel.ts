import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response";
import { IWorkingStorageConfig } from "../Tabs/StorageTemplate/StorageTemplateModel";

export interface IDetailFeatureProps {
  theme?: ThemeEnums;
  rcName?: string;
  isDetailFeatureVisibled?: boolean;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  confirmType?: TypeConfirm;
  workingConfig?: string;
  sourceConfig?: string;
  workingContext?: BaseContext;
  workingFeature?: BaseFeatureContextTenant;
  workingTenant?: BaseTenant;
  configurationType?: string;
  loggingConfig?: string;
  features?: BaseFeatureContextTenant[];
  contexts?: BaseContext[];
  isParameter?: boolean;
  workingParameter?: string;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR?: boolean;
  OnHandleUpdateBreadCrumb?: (nodes: INodes[]) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdateVisiblePagePanel?: (val: boolean) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateDetailFeatureVisibled?: (val: boolean) => void;
  OnResetApplicationStore?: () => void;
  OnUpdateWorkingConfig?: (config: string) => void;
  OnUpdateContextConfiguration?: (
    tenant: BaseTenant,
    config: string,
    context: BaseContext
  ) => Promise<ConversationIdResponse>;
  OnUpdateFeatureConfigTS?: (
    config: string,
    feature: BaseFeatureContextTenant,
    tenant: BaseTenant,
    isParameter?: boolean
  ) => Promise<ConversationIdResponse>;
  OnUpdateFeatureConfigWithParamsTS?: (
    feature: BaseFeatureContextTenant,
    tenant: BaseTenant,
    config?: string,
    workingParams?: string
  ) => Promise<ConversationIdResponse>;
  OnInitContextConfiguration?: (
    id: string,
    loggingConfig: string,
    contextKey: string,
    storageConfig: string
  ) => Promise<ConversationIdResponse>;
  OnUpdateWorkingFeature?: (item: BaseFeatureContextTenant) => void;
  OnUpdateWorkingContext?: (item: BaseContext) => void;
  OnUpdateSourceConfig?: (str: string) => void;
  OnGetFeaturesListInContext?: (tenantId: string) => void;
  OnGetContextsList?: (tenantId: string) => void;
  OnUpdateWorkingFeatureParameter?: (feature: BaseFeatureContextTenant) => void;
  OnResetResetTenantStore?: () => void;
  OnResetSignalRInfomations?: () => void;
  OnFetchStoreData?: (id: string) => void;
}

export interface IDetailFeatureStates {
  crtTab: string;
  feature: any;
  cId: string;
  wId: string;
  workingStorageConfig: IWorkingStorageConfig[];
  opts: IDropdownOption[];
  isVisiblePivotForm: boolean;
  signalRDB: any[];
}
