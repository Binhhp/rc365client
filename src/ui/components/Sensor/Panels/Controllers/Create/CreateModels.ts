import { BaseController } from "src/common/classes/BaseController";
import { BaseResource } from "src/common/classes/BaseResource";
import {
  ThemeEnums,
  TypeConfirm,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";

export interface ICreateControllerProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  isSearchInPanel?: boolean;
  workingTab?: TypeSensorTabs;
  workingListItem?: any[];
  confirmType?: TypeConfirm;
  sensorTypes?: any[];
  panelType?: TypePanel;
  rcName?: string;
  controller?: BaseController;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateController?: (config: BaseController) => void;
}

export interface ICreateControllerStates {
  controller: BaseController;
  errors: string[];
  isCollapsed: boolean;
  cId: string;
  selectedItems: BaseResource[];
}
