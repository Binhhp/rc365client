import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { BaseContext } from "src/common/classes/BaseContext";
import {
  BaseFeatureContextTenant,
  BaseFeatureDescriptor,
} from "src/common/classes/BaseFeature";
import { BaseTenant, BaseTenantContext } from "src/common/classes/BaseTenant";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";

export interface IDetailProps {
  theme?: ThemeEnums;
  breadCrumb?: INodes[];
  isDetailFeatureVisibled?: boolean;
  isWorking?: boolean;
  confirmType?: TypeConfirm;
  workingTenant?: BaseTenant;
  workingContexts?: BaseContext;
  contexts?: BaseContext[];
  configurationType?: string;
  OnHandleUpdateBreadCrumb?: (node: INodes[]) => void;
  OnUpdateDetailFeatureVisibled?: (val: boolean) => void;
  OnUpdateWorkingFeature?: (item: BaseFeatureContextTenant) => void;
  OnResetApplicationStore?: () => void;
  OnGetTenantById?: (id: string) => Promise<any>;
  OnUpdateFeatureOfLicense?: (features: BaseFeatureDescriptor[]) => void;
  OnUpdateTenantConfiguration?: (config: BaseContext[]) => void;
  OnUpdateWorkingConfigurationContext?: (config: BaseContext) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnHandleUpdateTenant?: (
    id: string,
    tenant: BaseTenant
  ) => Promise<ConversationIdResponse>;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateSourceConfig?: (config: string) => void;
  OnGetContextsList?: (id: string) => void;
  OnGetFeaturesList?: (id: string) => void;
}

export interface IDetailStates {
  crtTab: string;
  isPanelOpen: boolean;
  isRedirect: boolean;
}
