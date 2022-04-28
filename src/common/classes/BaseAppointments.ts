import { ICloneable } from "src/common/interfaces";
import { BaseCalendar } from "./BaseCalendar";

export const OnHandleMapDataToBaseAppointment = (
  items: any
): BaseAppointment => {
  let newApm = new BaseAppointment();
  newApm.body = items.body;
  newApm.calendar = items.calendar;
  newApm.endTime = items.endTime;
  newApm.reservationId = items.reservationId;
  newApm.resourceId = items.resourceId;
  newApm.singleValueExtendedProperties = items.singleValueExtendedProperties;
  newApm.startTime = items.startTime;
  newApm.subject = items.subject;
  newApm.guid = items.guid;
  newApm.showAs = mapBetweenEnumAndValueOfShowAs(items.showAs);
  newApm.parentId = items.parentId;
  let start = new DatetimeAndTimezone();
  let end = new DatetimeAndTimezone();
  start.dateTime = items.startTime.dateTime;
  start.timeZone = items.startTime.timeZone;
  end.dateTime = items.endTime.dateTime;
  end.timeZone = items.endTime.timeZone;
  return newApm;
};

export enum ShowAsEnums {
  Free = 0,
  Tentative = 1,
  Busy = 2,
  OutOfOffice = 3,
  WorkingElsewhere = 4,
}

export const mapBetweenEnumAndValueOfShowAs = (
  value: string | number
): ShowAsEnums => {
  switch (value) {
    case 0:
    case "Free":
      return ShowAsEnums.Free;
    case 1:
    case "Tentative":
      return ShowAsEnums.Tentative;
    case 3:
    case "OutOfOffice":
      return ShowAsEnums.OutOfOffice;
    case 4:
    case "WorkingElsewhere":
      return ShowAsEnums.WorkingElsewhere;
    default:
      return ShowAsEnums.Busy;
  }
};

export class AppointmentDto {
  resourceId: string;
  reservationId: string;
  subject: string;
  body: AppointmentBody;
  startTime: DatetimeAndTimezone;
  endTime: DatetimeAndTimezone;
  singleValueExtendedProperties: SingleValueProperty;
  calendar: BaseCalendar;
  guid: string;
  showAs: ShowAsEnums;
  parentId: string;
}
export class DatetimeAndTimezone {
  dateTime: string;
  timeZone: string;
}
export class SingleValueProperty {
  id: string;
  value: string;
}
export class AppointmentBody {
  content: string;
  contentType: string;
}
export class BaseAppointment implements ICloneable<BaseAppointment> {
  protected _resourceId: string;
  protected _reservationId: string;
  protected _subject: string;
  protected _guid: string;
  protected _body: AppointmentBody;
  protected _startTime: DatetimeAndTimezone;
  protected _endTime: DatetimeAndTimezone;
  protected _singleValueExtendedProperties: SingleValueProperty;
  protected _calendar: BaseCalendar;
  protected _showAs: ShowAsEnums;
  protected _parentId: string;
  constructor(dto?: AppointmentDto) {
    if (dto) {
      this._resourceId = dto.resourceId || "";
      this._reservationId = dto.reservationId || "";
      this._subject = dto.subject || "";
      this._guid = dto.guid || "";
      this._showAs = dto.showAs || ShowAsEnums.Busy;
      this._parentId = dto.parentId || "";
      this._body = dto.body || new AppointmentBody();
      this._startTime = dto.startTime || new DatetimeAndTimezone();
      this._endTime = dto.endTime || new DatetimeAndTimezone();
      this._singleValueExtendedProperties =
        dto.singleValueExtendedProperties || new SingleValueProperty();
      this._calendar = dto.calendar || new BaseCalendar();
    } else {
      this._resourceId = "";
      this._guid = "";
      this._showAs = ShowAsEnums.Busy;
      this._parentId = "";
      this._reservationId = "";
      this._subject = "";
      this._body = new AppointmentBody();
      this._startTime = new DatetimeAndTimezone();
      this._endTime = new DatetimeAndTimezone();
      this._singleValueExtendedProperties = new SingleValueProperty();
      this._calendar = new BaseCalendar();
    }
  }
  public get calendar(): BaseCalendar {
    return this._calendar;
  }
  public set calendar(v: BaseCalendar) {
    this._calendar = v;
  }
  public get singleValueExtendedProperties(): SingleValueProperty {
    return this._singleValueExtendedProperties;
  }
  public set singleValueExtendedProperties(v: SingleValueProperty) {
    this._singleValueExtendedProperties = v;
  }
  public get endTime(): DatetimeAndTimezone {
    return this._endTime;
  }
  public set endTime(v: DatetimeAndTimezone) {
    this._endTime = v;
  }
  public get startTime(): DatetimeAndTimezone {
    return this._startTime;
  }
  public set startTime(v: DatetimeAndTimezone) {
    this._startTime = v;
  }
  public get body(): AppointmentBody {
    return this._body;
  }
  public set body(v: AppointmentBody) {
    this._body = v;
  }
  public get guid(): string {
    return this._guid;
  }
  public set guid(v: string) {
    this._guid = v;
  }
  public get subject(): string {
    return this._subject;
  }
  public set subject(v: string) {
    this._subject = v;
  }
  public get resourceId(): string {
    return this._resourceId;
  }
  public set resourceId(v: string) {
    this._resourceId = v;
  }
  public get reservationId(): string {
    return this._reservationId;
  }
  public set reservationId(v: string) {
    this._reservationId = v;
  }
  public get showAs(): ShowAsEnums {
    return this._showAs;
  }
  public set showAs(v: ShowAsEnums) {
    this._showAs = v;
  }
  public get parentId(): string {
    return this._parentId;
  }
  public set parentId(v: string) {
    this._parentId = v;
  }
  Clone(): BaseAppointment {
    let dto = this.ToDto();
    return new BaseAppointment(dto);
  }
  ToDto(): AppointmentDto {
    return {
      resourceId: this._resourceId,
      guid: this._guid,
      reservationId: this._reservationId,
      subject: this._subject,
      body: this._body,
      startTime: this.startTime,
      endTime: this._endTime,
      singleValueExtendedProperties: this._singleValueExtendedProperties,
      calendar: this._calendar,
      showAs: this._showAs,
      parentId: this._parentId,
    };
  }
  UpdateByKey(key: string, value: any): BaseAppointment {
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
    return new BaseAppointment(resultTodo);
  }
  isHaveEmptyField(): boolean {
    // let keys = ["startTime", "endTime", "subject"];
    // let thisStateDto = this.ToDto();
    // let resultTodo = this.ToDto();
    // let arrs = Object.entries(thisStateDto).filter((i) => keys.includes(i[0]));
    if (
      this._subject.trim() === "" ||
      !this._startTime ||
      !this._endTime ||
      (this._startTime &&
        (!this._startTime.dateTime ||
          this._startTime.dateTime.trim() === "")) ||
      (this._endTime &&
        (!this._endTime.dateTime || this._endTime.dateTime.trim() === ""))
    ) {
      return true;
    }
    return false;
  }
}
