import { CalendarActionTypes } from "src/ui/actions/model/CalendarActionModel";
import { ActCalendarTypeKeys } from "../actions/enums";
import { CalendarStoreModel } from "src/entity/model/CalendarStoreModel";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { BaseCalendar } from "src/common/classes/BaseCalendar";

const OnHandleUpdateWorkingAppointment = (
  state: CalendarStoreModel,
  items: BaseAppointment
): CalendarStoreModel => {
  let copyState = state.Clone() as CalendarStoreModel;
  copyState.workingAppointment = items;
  return copyState;
};
const OnHandleUpdateWorkingCalendar = (
  state: CalendarStoreModel,
  items: BaseCalendar
): CalendarStoreModel => {
  let copyState = state.Clone() as CalendarStoreModel;
  copyState.workingCalendar = items;
  return copyState;
};
const OnHandleUpdateSelectedAppointment = (
  state: CalendarStoreModel,
  items: BaseAppointment[]
): CalendarStoreModel => {
  let copyState = state.Clone() as CalendarStoreModel;
  copyState.selectedAppointments = items;
  return copyState;
};
const OnHandleResetCalendarStore = (
  state: CalendarStoreModel
): CalendarStoreModel => {
  let copyState = new CalendarStoreModel();
  return copyState;
};
const Calendar = (
  state: CalendarStoreModel = new CalendarStoreModel(),
  action: CalendarActionTypes
): CalendarStoreModel => {
  switch (action.type) {
    case ActCalendarTypeKeys.UPDATE_WORKING_APPOINTMENT:
      return OnHandleUpdateWorkingAppointment(state, action.payload);
    case ActCalendarTypeKeys.UPDATE_WORKING_CALENDAR:
      return OnHandleUpdateWorkingCalendar(state, action.payload);
    case ActCalendarTypeKeys.UPDATE_SELECTED_APPOINTMENTS:
      return OnHandleUpdateSelectedAppointment(state, action.payload);
    case ActCalendarTypeKeys.RESET_CALENDAR_STORE:
      return OnHandleResetCalendarStore(state);
    default:
      return state;
  }
};

export default Calendar;
