import { SensorTypes } from "../model/SensorActionModel";
import { ActSensorTypeKeys } from "../enums";
import { TypeSensorTabs } from "src/entity/enums";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseController } from "src/common/classes/BaseController";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { SensorManager } from "src/services/implements/SensorManager";
//  TS : to store
// FS: from server

export class SensorReduxActionTS {
  public static SensorUpdateWorkingTab = (
    type: TypeSensorTabs
  ): SensorTypes => {
    return {
      type: ActSensorTypeKeys.UPDATE_SENSOR_WORKING_TAB,
      payload: type,
    };
  };
  public static SensorUpdateWorkingOrg = (id: string): SensorTypes => {
    return {
      type: ActSensorTypeKeys.UPDATE_WORKING_ORGANIZATION,
      payload: id,
    };
  };
  public static SensorUpdateWorkingList = (
    sensors: BaseSensor[]
  ): SensorTypes => {
    return {
      type: ActSensorTypeKeys.UPDATE_SENSOR_WORKING_LIST,
      payload: sensors,
    };
  };
  public static SensorUpdateSensorTypeOpts = (
    opts?: IDropdownOption[]
  ): SensorTypes => {
    let _sensorManager = SensorManager.Instance;
    return {
      type: ActSensorTypeKeys.UPDATE_SENSOR_TYPE_OPTIONS,
      payload: opts ? opts : _sensorManager.sensorOpts,
    };
  };
  public static SensorUpdateEditSensor = (sensors: BaseSensor): SensorTypes => {
    return {
      type: ActSensorTypeKeys.UPDATE_EDIT_SENSOR,
      payload: sensors,
    };
  };
  public static SensorUpdateEditController = (
    controllers: BaseController
  ): SensorTypes => {
    return {
      type: ActSensorTypeKeys.UPDATE_EDIT_CONTROLLER,
      payload: controllers,
    };
  };
  public static SensorUpdateEditConfiguration = (
    configurations: BaseSensorType
  ): SensorTypes => {
    return {
      type: ActSensorTypeKeys.UPDATE_EDIT_CONFIGURATION,
      payload: configurations,
    };
  };
  public static SensorResetStore = (): SensorTypes => {
    return {
      type: ActSensorTypeKeys.RESET_SENSOR_REDUX_STORE,
    };
  };
}
