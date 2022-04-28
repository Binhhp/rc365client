import { ICloneable } from "src/common/interfaces";
import { IMinMaxLength } from "../interfaces/IMinMaxLength";

export class SensorTypeDto {
  sensorType: string;
  numberOfSensors: number;
  pullUrl: string;
  pushUrl: string;
  endpoint: string;
  apiKey: string;
  guid: string;
  sequenceNumber: number;
  version: number;
}

export class BaseSensorType implements ICloneable<BaseSensorType> {
  protected _sensorType: string;
  protected _pullUrl: string;
  protected _pushUrl: string;
  protected _endpoint: string;
  protected _apiKey: string;
  protected _guid: string;
  protected _sequenceNumber: number;
  protected _version: number;
  protected _numberOfSensors: number;
  constructor(dto?: SensorTypeDto) {
    if (dto) {
      this._sensorType = dto.sensorType || "";
      this._pullUrl = dto.pullUrl || "";
      this._pushUrl = dto.pushUrl || "";
      this._endpoint = dto.endpoint || "";
      this._apiKey = dto.apiKey || "";
      this._guid = dto.guid || "";
      this._numberOfSensors = dto.numberOfSensors || 0;
      this._version = dto.version || 0;
      this._sequenceNumber = dto.sequenceNumber || 0;
    } else {
      this._sensorType = "";
      this._pullUrl = "";
      this._pushUrl = "";
      this._endpoint = "";
      this._apiKey = "";
      this._guid = "";
      this._numberOfSensors = 0;
      this._version = 0;
      this._sequenceNumber = 0;
    }
  }
  public get version(): number {
    return this._version;
  }

  public set version(v: number) {
    this._version = v;
  }
  public get sequenceNumber(): number {
    return this._sequenceNumber;
  }

  public set sequenceNumber(v: number) {
    this._sequenceNumber = v;
  }

  public get guid(): string {
    return this._guid;
  }

  public set guid(v: string) {
    this._guid = v;
  }
  public get apiKey(): string {
    return this._apiKey;
  }

  public set apiKey(v: string) {
    this._apiKey = v;
  }
  public get endpoint(): string {
    return this._endpoint;
  }

  public set endpoint(v: string) {
    this._endpoint = v;
  }
  public get pushUrl(): string {
    return this._pushUrl;
  }

  public set pushUrl(v: string) {
    this._pushUrl = v;
  }
  public get pullUrl(): string {
    return this._pullUrl;
  }
  public set pullUrl(v: string) {
    this._pullUrl = v;
  }
  public get numberOfSensors(): number {
    return this._numberOfSensors;
  }

  public set numberOfSensors(v: number) {
    this._numberOfSensors = v;
  }
  public get sensorType(): string {
    return this._sensorType;
  }

  public set sensorType(v: string) {
    this._sensorType = v;
  }
  Clone(): BaseSensorType {
    let dto = this.ToDto();
    return new BaseSensorType(dto);
  }
  ToDto(): SensorTypeDto {
    return {
      sensorType: this._sensorType,
      numberOfSensors: this._numberOfSensors,
      pullUrl: this._pullUrl,
      pushUrl: this._pushUrl,
      endpoint: this._endpoint,
      apiKey: this._apiKey,
      sequenceNumber: this._sequenceNumber,
      version: this._version,
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
  UpdateByKey(key: string, value: string): BaseSensorType {
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
    return new BaseSensorType(resultTodo);
  }
}
