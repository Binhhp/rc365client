import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseContext } from "src/common/classes/BaseContext";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response";

export interface IStorageTemplateProps {
  isMultiples: boolean;
  theme?: ThemeEnums;
  rcName?: string;
  isWorking?: boolean;
  sourceConfig?: string;
  workingConfig?: string;
  sourceLogging?: string;
  loggingConfig?: string;
  confirmType?: TypeConfirm;
  isPanelPageOpen?: boolean;
  workingStorageConfig?: IWorkingStorageConfig[];
  signalRData?: any;
  signalRConversationId?: string;
  isHaveMessageSignalR?: boolean;
  workingTenant?: BaseTenant;
  selectedContexts?: BaseContext[];
  workingContext?: BaseContext;
  signalRDB?: any[];
  OnUpdateConversationId: (id: string) => void;
  OnUpdateSignalRData: (val: any) => void;
  onHandleSignalRDB?: (item: any[]) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnResetApplicationStore?: () => void;
  OnUpdateWorkingConfig?: (str: string) => void;
  onUpdateWorkingLogging?: (str: string) => void;
  onHandleCurrentTab?: () => void;
  onHandleWorkingStorageConfig?: (items: IWorkingStorageConfig[]) => void;
  OnGetContextDataBases?: (
    id: string,
    contextKeys: string[]
  ) => Promise<ConversationIdResponse>;
  OnResetSignalRData?: () => void;
}
export interface IStorageTemplateStates {
  source: any;
  isInvalidJSON: boolean;
  isEmpty: boolean;
  opts: IDropdownOption[];
  selectedOpts: string[];
  workingStorageConfig: IWorkingStorageConfig[];
  isLoading: boolean;
  cId: string;
  isLoadingDBDone: boolean;
}
export interface IWorkingStorageConfig {
  key: string | number;
  contextKey: string;
  featureKey: string;
  connectionString: string;
  label?: string;
  Server?: string;
  Database?: string;
  User?: string;
  Password?: string;
}

export class DefaultStorageConfig implements IWorkingStorageConfig {
  key: string | number;
  contextKey: string;
  featureKey: string;
  connectionString: string;
  label?: string;
  Server?: string;
  Database?: string;
  User?: string;
  Password?: string;
  constructor(key: string = "Default") {
    this.key = key;
    this.contextKey = "";
    this.featureKey = "";
    this.connectionString = "";
    this.label = "";
    this.Server = "";
    this.Database = "";
    this.User = "";
    this.Password = "";
  }
}
