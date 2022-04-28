import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { TypeSensorTabs } from "src/entity/enums";
import { SensorStoreModel } from "src/entity/model/SensorStoreModel";
import { SensorTypes } from "src/ui/actions/model/SensorActionModel";
import { ActSensorTypeKeys } from "../actions/enums";

const HandleUpdateWorkingTab = (
  state: SensorStoreModel,
  tab: TypeSensorTabs
): SensorStoreModel => {
  let copyState = state.Clone() as SensorStoreModel;
  copyState.workingTab = tab;
  return copyState;
};
const HandleUpdateWorkingOrg = (
  state: SensorStoreModel,
  id: string
): SensorStoreModel => {
  let copyState = state.Clone() as SensorStoreModel;
  copyState.workingOrg = id;
  return copyState;
};
const HandleUpdateWorkingList = (
  state: SensorStoreModel,
  sensors: BaseSensor[]
): SensorStoreModel => {
  let copyState = state.Clone() as SensorStoreModel;
  copyState.workingListItem = sensors;
  return copyState;
};
const HandleUpdateEditSensor = (
  state: SensorStoreModel,
  sensors: BaseSensor
) => {
  let copyState = state.Clone() as SensorStoreModel;
  copyState.sensor = sensors;
  return copyState;
};
const HandleUpdateEditController = (
  state: SensorStoreModel,
  controllers: BaseController
) => {
  let copyState = state.Clone() as SensorStoreModel;
  copyState.controller = controllers;
  return copyState;
};
const HandleUpdateEditConfiguration = (
  state: SensorStoreModel,
  configs: BaseSensorType
) => {
  let copyState = state.Clone() as SensorStoreModel;
  copyState.config = configs;
  return copyState;
};
const HandleUpdateSensorTypeOpts = (
  state: SensorStoreModel,
  opts: IDropdownOption[]
) => {
  let copyState = state.Clone() as SensorStoreModel;
  copyState.sensorOpts = opts;
  return copyState;
};
const HandleResetStore = (state: SensorStoreModel) => {
  let newState = new SensorStoreModel();
  newState.workingTab = state.workingTab;
  newState.sensorOpts = state.sensorOpts;
  newState.workingOrg = state.workingOrg;
  return newState;
};
const Sensor = (
  state = new SensorStoreModel(),
  action: SensorTypes
): SensorStoreModel => {
  switch (action.type) {
    case ActSensorTypeKeys.UPDATE_SENSOR_WORKING_TAB:
      return HandleUpdateWorkingTab(state, action.payload);
    case ActSensorTypeKeys.UPDATE_SENSOR_WORKING_LIST:
      return HandleUpdateWorkingList(state, action.payload);
    case ActSensorTypeKeys.UPDATE_WORKING_ORGANIZATION:
      return HandleUpdateWorkingOrg(state, action.payload);
    case ActSensorTypeKeys.UPDATE_SENSOR_TYPE_OPTIONS:
      return HandleUpdateSensorTypeOpts(state, action.payload);
    case ActSensorTypeKeys.UPDATE_EDIT_SENSOR:
      return HandleUpdateEditSensor(state, action.payload);
    case ActSensorTypeKeys.UPDATE_EDIT_CONTROLLER:
      return HandleUpdateEditController(state, action.payload);
    case ActSensorTypeKeys.UPDATE_EDIT_CONFIGURATION:
      return HandleUpdateEditConfiguration(state, action.payload);
    case ActSensorTypeKeys.RESET_SENSOR_REDUX_STORE:
      return HandleResetStore(state);
    default:
      return state;
  }
};

export default Sensor;
