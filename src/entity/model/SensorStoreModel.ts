import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { UISettingKey } from "src/common/functions";
import { ICloneable } from "src/common/interfaces";
import { TypeSensorTabs } from "../enums";

export class SensorStoreModelDto {
  workingTab: TypeSensorTabs;
  workingListItem: BaseSensor[];
  sensorOpts: IDropdownOption[];
  sensor: BaseSensor;
  controller: BaseController;
  config: BaseSensorType;
  workingOrg: string;
}

const mapStringToWorkingTab = (str: string): TypeSensorTabs => {
  switch (str) {
    case "Controllers":
      return TypeSensorTabs.Controllers;
    case "Basic configurations":
      return TypeSensorTabs.Configurations;
    default:
      return TypeSensorTabs.Sensors;
  }
};

const onGetWorkingTabFromLocalStorage = () => {
  let settings = localStorage.getItem("UISettings");
  if (settings) {
    let Obj = JSON.parse(settings);
    if (Array.isArray(Obj)) {
      let idxStorage = Obj.findIndex(
        (o) => o.name === UISettingKey.SENSOR_LIST
      );
      if (idxStorage !== -1) {
        return mapStringToWorkingTab(Obj[idxStorage].workingTab);
      }
    }
  }
  return TypeSensorTabs.Sensors;
};

export class SensorStoreModel implements ICloneable<SensorStoreModel> {
  protected _workingTab: TypeSensorTabs;
  protected _workingListItem: BaseSensor[];
  protected _sensor: BaseSensor;
  protected _config: BaseSensorType;
  protected _controller: BaseController;
  protected _sensorOpts: IDropdownOption[];
  protected _workingOrg: string;
  constructor(dto?: SensorStoreModelDto) {
    if (dto) {
      this._workingTab = dto.workingTab;
      this._workingListItem = dto.workingListItem;
      this._controller = dto.controller;
      this._sensor = dto.sensor;
      this._config = dto.config;
      this._workingOrg = dto.workingOrg;
      this._sensorOpts = dto.sensorOpts;
    } else {
      this._workingTab = onGetWorkingTabFromLocalStorage();
      this._workingListItem = [];
      this._controller = new BaseController();
      this._sensor = new BaseSensor();
      this._config = new BaseSensorType();
      this._workingOrg = "";
      this._sensorOpts = [];
    }
  }
  public get sensorOpts(): IDropdownOption[] {
    return this._sensorOpts;
  }
  public set sensorOpts(v: IDropdownOption[]) {
    this._sensorOpts = v;
  }
  public get workingOrg(): string {
    return this._workingOrg;
  }
  public set workingOrg(v: string) {
    this._workingOrg = v;
  }
  public get sensor(): BaseSensor {
    return this._sensor;
  }
  public set sensor(v: BaseSensor) {
    this._sensor = v;
  }
  public get workingTab(): TypeSensorTabs {
    return this._workingTab;
  }
  public set workingTab(v: TypeSensorTabs) {
    this._workingTab = v;
  }
  public get controller(): BaseController {
    return this._controller;
  }
  public set controller(v: BaseController) {
    this._controller = v;
  }
  public get config(): BaseSensorType {
    return this._config;
  }
  public set config(v: BaseSensorType) {
    this._config = v;
  }
  public get workingListItem(): BaseSensor[] {
    return this._workingListItem;
  }
  public set workingListItem(v: BaseSensor[]) {
    this._workingListItem = v;
  }
  Clone(): SensorStoreModel {
    let dto = this.ToDto();
    return new SensorStoreModel(dto);
  }
  ToDto(): SensorStoreModelDto {
    return {
      workingTab: this._workingTab,
      workingListItem: this._workingListItem,
      controller: this._controller,
      sensor: this._sensor,
      config: this._config,
      workingOrg: this._workingOrg,
      sensorOpts: this._sensorOpts,
    };
  }
}
