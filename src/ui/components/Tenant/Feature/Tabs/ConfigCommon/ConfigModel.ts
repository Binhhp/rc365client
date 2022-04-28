import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { ErrorFieldItem } from "src/common/functions/FieldValidate";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response";
import { IWorkingStorageConfig } from "../StorageTemplate/StorageTemplateModel";

export interface IConfigCommonProps {
  theme?: ThemeEnums;
  selectedItems?: any[];
  panelType: string;
  rcName?: string;
  selectedFeatures?: BaseFeatureContextTenant[];
  selectedContexts?: BaseContext[];
  isWorking?: boolean;
  workingTenant?: BaseTenant;
  workingConfig?: string;
  sourceLogging?: string;
  loggingConfig?: string;
  isPanelPageOpen?: boolean;
  workingContext?: BaseContext;
  confirmType?: TypeConfirm;
  signalRConversationId?: string;
  signalRData?: any;
  isHaveMessageSignalR?: boolean;
  contextKeys?: string[];
  onHandleClosePanel?: () => void;
  OnUpdateWorkingStatus?: (status: boolean) => void;
  onUpdateWorkingLogging?: (str: string) => void;
  onUpdateWorkingConfig?: (str: string) => void;
  OnGetContextDataBases?: (
    id: string,
    contextKeys: string[]
  ) => Promise<ConversationIdResponse>;
  onUpdateConfigurationContexts?: (
    id: string,
    items: IWorkingStorageConfig[],
    selectedItems: string[],
    loggingStr: string
  ) => void;
  onUpdateConfigurationFeatures?: (
    id: string,
    features: BaseFeatureContextTenant[],
    val: string
  ) => void;
}

export interface IConfigCommonStates {
  value: string;
  type: string;
  isConfirm: boolean;
  confirmType: TypeConfirm;
  workingItems: IWorkingStorageConfig[];
  loggingItem: IWorkingStorageConfig | null;
  conversationId: string;
  errors: ErrorFieldItem[];
}
