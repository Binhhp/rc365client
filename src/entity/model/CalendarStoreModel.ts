import { ICloneable } from "src/common/interfaces";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { BaseCalendar } from "src/common/classes/BaseCalendar";

export class CalendarStoreModelDto {
  workingAppointment: BaseAppointment;
  workingCalendar: BaseCalendar;
  selectedAppointments: BaseAppointment[];
}

export class CalendarStoreModel implements ICloneable<CalendarStoreModel> {
  protected _workingAppointment: BaseAppointment;
  protected _workingCalendar: BaseCalendar;
  protected _selectedAppointments: BaseAppointment[];
  constructor(dto?: CalendarStoreModelDto) {
    if (dto) {
      this._workingAppointment =
        dto.workingAppointment || new BaseAppointment();
      this._selectedAppointments = dto.selectedAppointments || [];
      this._workingCalendar = dto.workingCalendar || new BaseCalendar();
    } else {
      this._workingAppointment = new BaseAppointment();
      this._workingCalendar = new BaseCalendar();
      this._selectedAppointments = [];
    }
  }
  public get selectedAppointments(): BaseAppointment[] {
    return this._selectedAppointments;
  }
  public set selectedAppointments(v: BaseAppointment[]) {
    this._selectedAppointments = v;
  }
  public get workingCalendar(): BaseCalendar {
    return this._workingCalendar;
  }
  public set workingCalendar(v: BaseCalendar) {
    this._workingCalendar = v;
  }
  public get workingAppointment(): BaseAppointment {
    return this._workingAppointment;
  }
  public set workingAppointment(v: BaseAppointment) {
    this._workingAppointment = v;
  }
  Clone(): CalendarStoreModel {
    let dto = this.ToDto();
    return new CalendarStoreModel(dto);
  }
  ToDto(): CalendarStoreModelDto {
    return {
      workingAppointment: this._workingAppointment,
      workingCalendar: this._workingCalendar,
      selectedAppointments: this._selectedAppointments,
    };
  }
}
