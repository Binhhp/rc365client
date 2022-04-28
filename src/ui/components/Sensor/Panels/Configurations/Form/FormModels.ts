import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { ErrorFieldItem } from "src/common/functions/FieldValidate";
import { ThemeEnums, TypeConfirm, TypePanel } from "src/entity/enums";

export interface IConfigurationFormProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  isSearchInPanel?: boolean;
  workingTab?: any;
  workingListItem?: any[];
  confirmType?: TypeConfirm;
  sensorTypeOpts?: IDropdownOption[];
  panelType?: TypePanel;
  rcName?: string;
  configuration?: BaseSensorType;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateConfiguration?: (config: BaseSensorType) => void;
  isHaveSecretField: boolean;
}

export interface IConfigurationFormStates {
  config: BaseSensorType;
  opts: IDropdownOption[];
  errors: ErrorFieldItem[];
}
