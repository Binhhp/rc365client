import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import {
  ThemeEnums,
  TypeConfirm,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";

export interface IEditConfigurationProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  isSearchInPanel?: boolean;
  controller?: BaseController;
  workingTab?: any;
  workingListItem?: any[];
  confirmType?: TypeConfirm;
  sensorTypes?: any[];
  panelType?: TypePanel;
  rcName: string;
  status: boolean;
  OnUpdateVisiblePagePanel?: (val: boolean) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnHandleUpdateController?: (controller: BaseController) => void;
}

export interface IEditConfigurationStates {
  controller: BaseController;
  errors: string[];
}
