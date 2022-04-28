import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { BaseCalendar } from "src/common/classes/BaseCalendar";
import { ActCalendarTypeKeys } from "../enums";
import { CalendarActionTypes } from "../model/CalendarActionModel";

export class CalendarReduxActionTS {
  public static UpdateWorkingAppointment = (
    appointment: BaseAppointment
  ): CalendarActionTypes => {
    return {
      type: ActCalendarTypeKeys.UPDATE_WORKING_APPOINTMENT,
      payload: appointment,
    };
  };
  public static UpdateSelectedAppointment = (
    appointments: BaseAppointment[]
  ): CalendarActionTypes => {
    return {
      type: ActCalendarTypeKeys.UPDATE_SELECTED_APPOINTMENTS,
      payload: appointments,
    };
  };
  public static UpdateWorkingCalendar = (
    calendar: BaseCalendar
  ): CalendarActionTypes => {
    return {
      type: ActCalendarTypeKeys.UPDATE_WORKING_CALENDAR,
      payload: calendar,
    };
  };
  public static ResetCalendarStore = (): CalendarActionTypes => {
    return {
      type: ActCalendarTypeKeys.RESET_CALENDAR_STORE,
    };
  };
}
