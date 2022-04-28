import {
  BaseAppointment,
  DatetimeAndTimezone,
} from "src/common/classes/BaseAppointments";
import { ThemeEnums, TypePanel } from "src/entity/enums";
import { IDropdownOption } from "aod-dependencies/Dropdown";

export interface IFormProps {
  theme?: ThemeEnums;
  rcName?: string;
  isWorking?: boolean;
  workingAppointment?: BaseAppointment;
  timeZones?: IDropdownOption[];
  panelType?: TypePanel;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnGetFormValues?: (appointment: BaseAppointment, index?: number) => void;
}

export interface IFormStates {
  appointment: BaseAppointment;
  errors: ErrorTypes[];
  isSelectTimezone: boolean;
  startTime: DatetimeAndTimezone;
  endTime: DatetimeAndTimezone;
}

export enum ErrorTypes {
  Subject = "Subject",
  Start = "Start",
  End = "End",
}
