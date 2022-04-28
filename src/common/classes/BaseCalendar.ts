import { ICloneable } from "src/common/interfaces";
import { BaseAppointment } from "./BaseAppointments";

export class CalendarDto {
  guid: string;
  onPremise: boolean;
  appointments: BaseAppointment[];
  orgId: string;
  adResourceId: string;
  resourceId: string;
  resourceName: string;
  timeZone: string;
  syncStatus: string;
  syncProcessData: SyncProcessData;
  lastProcessResult: LastProcessResult;
  removeAppointments: string[];
  cannotSyncAppointments: CannotSyncAppointment;
  subcriptionId: string;
}
export class CannotSyncAppointment {
  appointmentId: string;
  errorCode: number;
}
export class SyncProcessData {
  processingStartTime: string;
  syncTriggerSource: string;
}
export class LastProcessResult {
  syncedTime: string;
  status: string;
  errorCode: number;
  syncTriggerSource: string;
}
export class BaseCalendar implements ICloneable<BaseCalendar> {
  protected _onPremise: boolean;
  protected _appointments: BaseAppointment[];
  protected _orgId: string;
  protected _adResourceId: string;
  protected _resourceId: string;
  protected _resourceName: string;
  protected _timeZone: string;
  protected _syncStatus: string;
  protected _syncProcessData: SyncProcessData;
  protected _lastProcessResult: LastProcessResult;
  protected _removeAppointments: string[];
  protected _cannotSyncAppointments: CannotSyncAppointment;
  protected _subcriptionId: string;
  protected _guid: string;
  constructor(dto?: CalendarDto) {
    if (dto) {
      this._onPremise = dto.onPremise || false;
      this._appointments = dto.appointments || [];
      this._orgId = dto.orgId || "";
      this._adResourceId = dto.adResourceId || "";
      this._resourceId = dto.resourceId || "";
      this._syncStatus = dto.syncStatus || "";
      this._guid = dto.guid || "";
      this._syncProcessData = dto.syncProcessData || new SyncProcessData();
      this._lastProcessResult =
        dto.lastProcessResult || new LastProcessResult();
      this._removeAppointments = dto.removeAppointments || [];
      this._cannotSyncAppointments =
        dto.cannotSyncAppointments || new CannotSyncAppointment();
      this._subcriptionId = dto.subcriptionId || "";
      this._resourceName = dto.resourceName || "";
      this._timeZone = dto.timeZone || "";
    } else {
      this._onPremise = false;
      this._appointments = [];
      this._orgId = "";
      this._adResourceId = "";
      this._resourceId = "";
      this._syncStatus = "";
      this._guid = "";
      this._syncProcessData = new SyncProcessData();
      this._lastProcessResult = new LastProcessResult();
      this._removeAppointments = [];
      this._cannotSyncAppointments = new CannotSyncAppointment();
      this._subcriptionId = "";
      this._resourceName = "";
      this._timeZone = "";
    }
  }
  public get timeZone(): string {
    return this._timeZone;
  }
  public set timeZone(v: string) {
    this._timeZone = v;
  }
  public get resourceName(): string {
    return this._resourceName;
  }
  public set resourceName(v: string) {
    this._resourceName = v;
  }
  public get subcriptionId(): string {
    return this._subcriptionId;
  }
  public set subcriptionId(v: string) {
    this._subcriptionId = v;
  }
  public get cannotSyncAppointments(): CannotSyncAppointment {
    return this._cannotSyncAppointments;
  }
  public set cannotSyncAppointments(v: CannotSyncAppointment) {
    this._cannotSyncAppointments = v;
  }
  public get removeAppointments(): string[] {
    return this._removeAppointments;
  }
  public set removeAppointments(v: string[]) {
    this._removeAppointments = v;
  }
  public get lastProcessResult(): LastProcessResult {
    return this._lastProcessResult;
  }
  public set lastProcessResult(v: LastProcessResult) {
    this._lastProcessResult = v;
  }
  public get syncProcessData(): SyncProcessData {
    return this._syncProcessData;
  }
  public set syncProcessData(v: SyncProcessData) {
    this._syncProcessData = v;
  }
  public get syncStatus(): string {
    return this._syncStatus;
  }
  public set syncStatus(v: string) {
    this._syncStatus = v;
  }
  public get guid(): string {
    return this._guid;
  }
  public set guid(v: string) {
    this._guid = v;
  }
  public get resourceId(): string {
    return this._resourceId;
  }
  public set resourceId(v: string) {
    this._resourceId = v;
  }
  public get adResourceId(): string {
    return this._adResourceId;
  }
  public set adResourceId(v: string) {
    this._adResourceId = v;
  }
  public get orgId(): string {
    return this._orgId;
  }
  public set orgId(v: string) {
    this._orgId = v;
  }
  public get appointments(): BaseAppointment[] {
    return this._appointments;
  }
  public set appointments(v: BaseAppointment[]) {
    this._appointments = v;
  }
  public get onPremise(): boolean {
    return this._onPremise;
  }
  public set onPremise(v: boolean) {
    this._onPremise = v;
  }
  Clone(): BaseCalendar {
    let dto = this.ToDto();
    return new BaseCalendar(dto);
  }
  ToDto(): CalendarDto {
    return {
      resourceId: this._resourceId,
      onPremise: this._onPremise,
      appointments: this._appointments,
      adResourceId: this._adResourceId,
      syncStatus: this._syncStatus,
      syncProcessData: this._syncProcessData,
      lastProcessResult: this._lastProcessResult,
      removeAppointments: this._removeAppointments,
      cannotSyncAppointments: this._cannotSyncAppointments,
      subcriptionId: this._subcriptionId,
      orgId: this._orgId,
      resourceName: this._resourceName,
      timeZone: this._timeZone,
      guid: this._guid,
    };
  }
  UpdateByKey(key: string, value: any): BaseCalendar {
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
    return new BaseCalendar(resultTodo);
  }
}
