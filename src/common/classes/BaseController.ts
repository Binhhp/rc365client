import { ICloneable } from "src/common/interfaces";
import { IMinMaxLength } from "../interfaces/IMinMaxLength";
import { BaseResource } from "./BaseResource";
import { BaseSensor } from "./BaseSensor";

export class ControllerDto {
  resourceId: string;
  resourceName: string;
  totalSensors: number;
  timeZone: string;
  occupationStatus: string;
  sensorControllerId: string;
  sensors: BaseSensor[];
  reservationTime: string;
  sensorTime: string;
  controllerStatus: boolean;
  resourceInfo: BaseResource;
  reservationTimeTick: number;
  sensorTimeTick: number;
  guid: string;
}

export class BaseController implements ICloneable<BaseController> {
  protected _resourceId: string;
  protected _sensorControllerId: string;
  protected _sensors: BaseSensor[];
  protected _occupationStatus: string;
  protected _resourceName: string;
  protected _totalSensors: number;
  protected _timeZone: string;
  protected _reservationTime: string;
  protected _sensorTime: string;
  protected _guid: string;
  protected _controllerStatus: boolean;
  protected _resourceInfo: BaseResource;
  protected _reservationTimeTick: number;
  protected _sensorTimeTick: number;
  constructor(dto?: ControllerDto) {
    if (dto) {
      this._sensors = dto.sensors || [];
      this._resourceId = dto.resourceId || "";
      this._sensorControllerId = dto.sensorControllerId || "";
      this._occupationStatus = dto.occupationStatus || "";
      this._timeZone = dto.timeZone || "";
      this._totalSensors = dto.totalSensors || 0;
      this._reservationTimeTick = dto.reservationTimeTick || 0;
      this._sensorTimeTick = dto.sensorTimeTick || 0;
      this._resourceName = dto.resourceName || "";
      this._reservationTime = dto.reservationTime || "";
      this._sensorTime = dto.sensorTime || "";
      this._guid = dto.guid || "";
      this._controllerStatus = dto.controllerStatus || false;
      this._resourceInfo = dto.resourceInfo || new BaseResource();
    } else {
      this._sensors = [];
      this._resourceId = "";
      this._sensorControllerId = "";
      this._occupationStatus = "";
      this._timeZone = "";
      this._totalSensors = 0;
      this._reservationTimeTick = 0;
      this._sensorTimeTick = 0;
      this._resourceName = "";
      this._reservationTime = "";
      this._sensorTime = "";
      this._guid = "";
      this._controllerStatus = false;
      this._resourceInfo = new BaseResource();
    }
  }

  public get sensorTimeTick(): number {
    return this._sensorTimeTick;
  }

  public set sensorTimeTick(v: number) {
    this._sensorTimeTick = v;
  }
  public get reservationTimeTick(): number {
    return this._reservationTimeTick;
  }

  public set reservationTimeTick(v: number) {
    this._reservationTimeTick = v;
  }
  public get resourceInfo(): BaseResource {
    return this._resourceInfo;
  }

  public set resourceInfo(v: BaseResource) {
    this._resourceInfo = v;
  }
  public get controllerStatus(): boolean {
    return this._controllerStatus;
  }

  public set controllerStatus(v: boolean) {
    this._controllerStatus = v;
  }
  public get sensorTime(): string {
    return this._sensorTime;
  }

  public set sensorTime(v: string) {
    this._sensorTime = v;
  }
  public get guid(): string {
    return this._guid;
  }

  public set guid(v: string) {
    this._guid = v;
  }
  public get reservationTime(): string {
    return this._reservationTime;
  }

  public set reservationTime(v: string) {
    this._reservationTime = v;
  }
  public get resourceName(): string {
    return this._resourceName;
  }

  public set resourceName(v: string) {
    this._resourceName = v;
  }
  public get totalSensors(): number {
    return this._totalSensors;
  }

  public set totalSensors(v: number) {
    this._totalSensors = v;
  }
  public get timeZone(): string {
    return this._timeZone;
  }

  public set timeZone(v: string) {
    this._timeZone = v;
  }
  public get occupationStatus(): string {
    return this._occupationStatus;
  }

  public set occupationStatus(v: string) {
    this._occupationStatus = v;
  }
  public get sensors(): BaseSensor[] {
    return this._sensors;
  }

  public set sensors(v: BaseSensor[]) {
    this._sensors = v;
  }

  public get resourceId(): string {
    return this._resourceId;
  }

  public set resourceId(v: string) {
    this._resourceId = v;
  }

  public get sensorControllerId(): string {
    return this._sensorControllerId;
  }

  public set sensorControllerId(v: string) {
    this._sensorControllerId = v;
  }

  Clone(): BaseController {
    let dto = this.ToDto();
    return new BaseController(dto);
  }

  ToDto(): ControllerDto {
    return {
      sensorControllerId: this._sensorControllerId,
      resourceId: this._resourceId,
      sensors: this._sensors,
      occupationStatus: this._occupationStatus,
      timeZone: this._timeZone,
      totalSensors: this._totalSensors,
      resourceName: this._resourceName,
      sensorTime: this._sensorTime,
      reservationTime: this._reservationTime,
      controllerStatus: this._controllerStatus,
      resourceInfo: this._resourceInfo,
      sensorTimeTick: this._sensorTimeTick,
      reservationTimeTick: this._reservationTimeTick,
      guid: this._guid,
    };
  }

  IsHaveInvalidLengthField(
    exceptKeys?: string[],
    minmax?: IMinMaxLength[]
  ): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some((item) => {
      let max = 256;
      if (minmax) {
        let idx = minmax.findIndex((i) => i.key === item[0]);
        if (idx !== -1) {
          max = minmax[idx].max;
        }
      }
      let condition =
        typeof item[1] === "string" && item[1].trim().length > max;
      if (exceptKeys) {
        condition =
          typeof item[1] === "string" &&
          item[1].trim().length > max &&
          !exceptKeys.some((k) => k === item[0]);
      }
      return condition;
    });
  }

  UpdateByKey(key: string, value: any): BaseController {
    let thisStateDto = this.ToDto();
    let resultTodo = this.ToDto();
    Object.entries(thisStateDto).map((item) => {
      if (item[0] === key) {
        let itemKey = item[0];
        Object.assign(resultTodo, { [itemKey]: value });
        item[1] = value;
        return item;
      }
      return item;
    });
    return new BaseController(resultTodo);
  }
}
