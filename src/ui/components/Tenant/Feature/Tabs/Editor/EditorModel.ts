import { BaseContext } from "src/common/classes/BaseContext";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";
import { IWorkingStorageConfig } from "../StorageTemplate/StorageTemplateModel";

export interface IEditorProps {
  theme?: ThemeEnums;
  rcName?: string;
  isWorking?: boolean;
  editorValue?: string;
  workingConfig?: string;
  sourceLogging?: string;
  content?: string;
  loggingConfig?: string;
  isPanelPageOpen?: boolean;
  confirmType?: TypeConfirm;
  workingContext: BaseContext;
  isParameter?: boolean;
  workingParameter?: string;
  configurationType?: string;
  signalRData?: any;
  workingStorageConfig?: IWorkingStorageConfig[];
  signalRDB?: any[];
  onHandleSignalRDB?: (item: any[]) => void;
  onHandleWorkingStorageConfig?: (items: IWorkingStorageConfig[]) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnResetApplicationStore?: () => void;
  onUpdateWorkingConfig?: (str: string) => void;
  onUpdateWorkingLogging?: (str: string) => void;
  onUpdateWorkingParameter?: (str: string) => void;
}

export interface IEditorStates {
  value: string;
}

export class DatabaseConnectionString {
  ConnectionString: string;
}
export class DatabaseStorageConfig {
  Name: string;
  Type: string;
  Configuration: DatabaseConnectionString;
}
export class DefaultStorageConfigSource {
  Databases: DatabaseStorageConfig[];
}
