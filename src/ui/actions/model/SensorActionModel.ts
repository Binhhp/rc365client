import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { TypeSensorTabs } from "src/entity/enums";
import { ActSensorTypeKeys } from "../enums";

export interface UpdateWorkingTabAct {
  type: typeof ActSensorTypeKeys.UPDATE_SENSOR_WORKING_TAB;
  payload: TypeSensorTabs;
}

export interface UpdateWorkingListAct {
  type: typeof ActSensorTypeKeys.UPDATE_SENSOR_WORKING_LIST;
  payload: BaseSensor[];
}

export interface UpdateSensorTypesOptsAct {
  type: typeof ActSensorTypeKeys.UPDATE_SENSOR_TYPE_OPTIONS;
  payload: IDropdownOption[];
}
export interface UpdateWorkingOrganizationsAct {
  type: typeof ActSensorTypeKeys.UPDATE_WORKING_ORGANIZATION;
  payload: string;
}

export interface UpdateEditSensorsAct {
  type: typeof ActSensorTypeKeys.UPDATE_EDIT_SENSOR;
  payload: BaseSensor;
}

export interface UpdateEditControllersAct {
  type: typeof ActSensorTypeKeys.UPDATE_EDIT_CONTROLLER;
  payload: BaseController;
}

export interface UpdateEditConfigurationsAct {
  type: typeof ActSensorTypeKeys.UPDATE_EDIT_CONFIGURATION;
  payload: BaseSensorType;
}
export interface ResetSensorStoreAct {
  type: typeof ActSensorTypeKeys.RESET_SENSOR_REDUX_STORE;
}

export type SensorTypes =
  | UpdateWorkingOrganizationsAct
  | ResetSensorStoreAct
  | UpdateEditSensorsAct
  | UpdateEditControllersAct
  | UpdateEditConfigurationsAct
  | UpdateWorkingTabAct
  | UpdateSensorTypesOptsAct
  | UpdateWorkingListAct;
