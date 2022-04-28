import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";

export interface ITempleteProps {
  theme?: ThemeEnums;
  rcName?: string;
  isWorking?: boolean;
  sourceConfig?: string;
  workingConfig?: string;
  sourceLogging?: string;
  loggingConfig?: string;
  confirmType?: TypeConfirm;
  isPanelPageOpen?: boolean;
  isParameter?: boolean;
  workingParameter?: string;
  workingFeature?: BaseFeatureContextTenant;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnResetApplicationStore?: () => void;
  OnUpdateWorkingConfig?: (str: string) => void;
  onUpdateWorkingLogging?: (str: string) => void;
  onHandleCurrentTab?: () => void;
  onUpdateWorkingParameter?: (str: string) => void;
}

export interface ITempleteStates {
  source: any;
  blocks: any[];
  isInvalidJSON: boolean;
  isEmpty: boolean;
}
