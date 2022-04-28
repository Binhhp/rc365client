import { ICloneable } from "src/common/interfaces";
import { IMinMaxLength } from "../interfaces/IMinMaxLength";
import { BaseResource } from "./BaseResource";

export class SensorDto {
  sensorType: string;
  sensorId: string;
  sensorControllerId: string;
  occupationStatus: string;
  resourceInfo: BaseResource;
  resourceName: string;
  resourceId: string;
  guid: string;
}

export class BaseSensor implements ICloneable<BaseSensor> {
  protected _sensorType: string;
  protected _sensorId: string;
  protected _sensorControllerId: string;
  protected _occupationStatus: string;
  protected _resourceName: string;
  protected _resourceId: string;
  protected _guid: string;
  protected _resourceInfo: BaseResource;
  constructor(dto?: SensorDto) {
    if (dto) {
      this._sensorType = dto.sensorType || "";
      this._sensorId = dto.sensorId || "";
      this._sensorControllerId = dto.sensorControllerId || "";
      this._occupationStatus = dto.occupationStatus || "";
      this._resourceId = dto.resourceId || "";
      this._resourceName = dto.resourceName || "";
      this._guid = dto.guid || "";
      this._resourceInfo = dto.resourceInfo || new BaseResource();
    } else {
      this._sensorType = "";
      this._sensorId = "";
      this._sensorControllerId = "";
      this._occupationStatus = "";
      this._resourceId = "";
      this._resourceName = "";
      this._guid = "";
      this._resourceInfo = new BaseResource();
    }
  }
  public get guid(): string {
    return this._guid;
  }

  public set guid(v: string) {
    this._guid = v;
  }

  public get resourceName(): string {
    return this._resourceName;
  }

  public set resourceName(v: string) {
    this._resourceName = v;
  }

  public get resourceId(): string {
    return this._resourceId;
  }

  public set resourceId(v: string) {
    this._resourceId = v;
  }
  public get resourceInfo(): BaseResource {
    return this._resourceInfo;
  }

  public set resourceInfo(v: BaseResource) {
    this._resourceInfo = v;
  }
  public get occupationStatus(): string {
    return this._occupationStatus;
  }

  public set occupationStatus(v: string) {
    this._occupationStatus = v;
  }
  public get sensorControllerId(): string {
    return this._sensorControllerId;
  }

  public set sensorControllerId(v: string) {
    this._sensorControllerId = v;
  }
  public get sensorId(): string {
    return this._sensorId;
  }

  public set sensorId(v: string) {
    this._sensorId = v;
  }
  public get sensorType(): string {
    return this._sensorType;
  }

  public set sensorType(v: string) {
    this._sensorType = v;
  }
  Clone(): BaseSensor {
    let dto = this.ToDto();
    return new BaseSensor(dto);
  }
  ToDto(): SensorDto {
    return {
      sensorType: this._sensorType,
      sensorId: this._sensorId,
      sensorControllerId: this._sensorControllerId,
      occupationStatus: this._occupationStatus,
      resourceInfo: this._resourceInfo,
      resourceName: this._resourceName,
      resourceId: this._resourceId,
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
  UpdateByKey(key: string, value: string): BaseSensor {
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
    return new BaseSensor(resultTodo);
  }
}
