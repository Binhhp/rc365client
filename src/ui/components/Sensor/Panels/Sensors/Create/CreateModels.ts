import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { NewErrorType } from "src/common/constants/ErrorTypes";
import { ThemeEnums, TypeConfirm, TypePanel } from "src/entity/enums";

export interface ICreateSensorProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  isSearchInPanel?: boolean;
  workingTab?: any;
  workingListItem?: any[];
  confirmType?: TypeConfirm;
  sensorTypes?: any[];
  panelType?: TypePanel;
  rcName?: string;
  sensor?: BaseSensor;
  controller?: BaseController;
  configuration?: BaseSensorType;
  sensorTypeOpts?: IDropdownOption[];
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateSensor?: (config: BaseSensor) => void;
  OnUpdateWorkingResource?: (rs?: any) => void;
}

export interface ICreateSensorStates {
  sensor: BaseSensor;
  errors: any[];
  isCollapsed: boolean;
  cId: string;
  opts: IDropdownOption[];
}

export enum CreateSensorErrors {
  Id = "Id",
  Type = "Type",
}
export const SensorErrorType = { ...NewErrorType, ...CreateSensorErrors };
export type SensorTypeEnum = typeof SensorErrorType;
