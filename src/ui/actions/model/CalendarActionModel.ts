import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { BaseCalendar } from "src/common/classes/BaseCalendar";
import { ActCalendarTypeKeys } from "../enums";

export interface UpdateWorkingAppointmentAct {
  type: typeof ActCalendarTypeKeys.UPDATE_WORKING_APPOINTMENT;
  payload: BaseAppointment;
}
export interface UpdateSelectedAppointmentAct {
  type: typeof ActCalendarTypeKeys.UPDATE_SELECTED_APPOINTMENTS;
  payload: BaseAppointment[];
}
export interface UpdateWorkingCalendarAct {
  type: typeof ActCalendarTypeKeys.UPDATE_WORKING_CALENDAR;
  payload: BaseCalendar;
}
export interface ResetCalendarStoreAct {
  type: typeof ActCalendarTypeKeys.RESET_CALENDAR_STORE;
}
export type CalendarActionTypes =
  | UpdateWorkingAppointmentAct
  | UpdateSelectedAppointmentAct
  | UpdateWorkingCalendarAct
  | ResetCalendarStoreAct;
