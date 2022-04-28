import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import {
  ThemeEnums,
  TypeConfirm,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";

export interface IEditControlllerProps {
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
  OnUpdateVisiblePagePanel?: (val: boolean) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateWorkingTab?: (type: TypeSensorTabs) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnResetSensorStore?: () => void;
}

export interface IEditControllerStates {
  crtTab: string;
  controller: BaseController;
  selectedItems: BaseSensor[];
  isCollapsed: boolean;
}
