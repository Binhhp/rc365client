import { IGroup } from "aod-dependencies/GroupedList";
import { BaseContext, ContextDto } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { BaseTenant, TenantContextDto } from "src/common/classes/BaseTenant";
import { ThemeEnums, TypeConfirm, TypePanel } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response";

export interface IFeatureProps {
  theme?: ThemeEnums;
  rcName?: string;
  isHaveNameAction?: boolean;
  type: string;
  isWorking?: boolean;
  workingTenant?: BaseTenant;
  isPanelPageOpen?: boolean;
  panelType?: TypePanel;
  confirmType?: TypeConfirm;
  licenceType?: string;
  workingContext?: BaseContext;
  contexts?: BaseContext[];
  features?: BaseFeatureContextTenant[];
  selectedFeatures?: BaseFeatureContextTenant[];
  selectedContexts?: BaseContext[];
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR?: boolean;
  tenantWId?: string;
  tenantCId?: string;
  signalRData?: any;
  OnClearCidAndWorkflowId: () => void;
  onGetSelectedItem?: (item: BaseFeatureContextTenant) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateConfigurationType?: (str: string) => void;
  OnUpdateStorageConfiguration?: (
    contexts: BaseContext,
    id: string
  ) => Promise<ConversationIdResponse>;
  OnGetTenantContext?: (
    contextKey: string,
    tenantId: string
  ) => Promise<TenantContextDto>;
  OnUpdateFeatureTS?: (
    items: any[],
    features: BaseFeatureContextTenant[]
  ) => void;
  OnGetFeaturesListInContext?: (tenantId: string) => void;
  OnGetContextsListInContext?: (
    tenantId: string,
    contextKey: string
  ) => Promise<ContextDto[]>;
  OnUpdateSelectedContexts?: (items: any[]) => void;
  OnUpdateSelectedFeatures?: (items: BaseFeatureContextTenant[]) => void;
  OnUpdateWorkingContext?: (id: string, contexts: BaseContext[]) => void;
  OnResetStoreConfiguration?: () => void;
  OnResetSignalRInfomations?: () => void;
  OnFetchStoreData?: (id: string) => void;
  OnRestSignalRData?: () => void;
}

export interface IFeaturetState {
  isSelection: boolean;
  selectedItems: BaseFeatureContextTenant[];
  width: number;
  isRedirect: boolean;
  workingItem: any;
  redirectUrl: string;
  isVisibled: boolean;
  isConfirm: boolean;
  typeOfConfirm: string;
  workingContext: BaseContext;
  contexts: BaseContext;
  groupContext: IGroup[];
  panelType: string;
}
