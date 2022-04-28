import { BaseSensorType } from "src/common/classes/BaseSensorType";
import {
  ThemeEnums,
  TypeConfirm,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";
import { IDropdownOption } from "aod-dependencies/Dropdown";

export interface IEditConfigurationProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  isSearchInPanel?: boolean;
  workingTab?: any;
  workingListItem?: any[];
  confirmType?: TypeConfirm;
  panelType?: TypePanel;
  configuration?: BaseSensorType;
  sensorTypeOpts?: IDropdownOption[];
  OnUpdateVisiblePagePanel?: (val: boolean) => void;
  OnUpdateWorkingTab?: (type: TypeSensorTabs) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnResetSensorStore?: () => void;
}

export interface IEditConfigurationStates {
  errors: string[];
  configuration: BaseSensorType;
}
