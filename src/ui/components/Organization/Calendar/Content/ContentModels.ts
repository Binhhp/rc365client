import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import {
  ThemeEnums,
  TypeConfirm,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { ConversationIdResponse } from "src/repositories/response";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { SensorTypeResponse } from "src/repositories/response/Sensors/SensorTypeResponse";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { BaseCalendar } from "src/common/classes/BaseCalendar";

export interface ICalendarContentProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  isSearchInPanel?: boolean;
  workingTab?: TypeSensorTabs;
  workingListItem?: any[];
  confirmType?: TypeConfirm;
  sensorTypes?: any[];
  panelType?: TypePanel;
  configuration?: BaseSensorType;
  sensor?: BaseSensor;
  controller?: BaseController;
  orgInfo?: BaseOrganization;
  resource?: BaseResource;
  sensorTypeOpts?: IDropdownOption[];
  selectedAppointments?: BaseAppointment[];
  workingAppointment?: BaseAppointment;
  workingCalendar?: BaseCalendar;
  timeZones?: IDropdownOption[];
  OnUpdateVisiblePagePanel?: (val: boolean) => void;
  OnUpdateWorkingTab?: (type: TypeSensorTabs) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnResetSensorStore?: () => void;
  OnUpdateBeardCrumb?: (nodes: INodes[]) => void;
  OnRegisterSensor?: (
    sensor: BaseSensor,
    resource?: BaseResource
  ) => Promise<ConversationIdResponse>;
  OnRegisterSensorController?: (
    controller: BaseController
  ) => Promise<ConversationIdResponse>;
  OnRegisterSensorType?: (
    type: BaseSensorType
  ) => Promise<ConversationIdResponse>;
  // OnUnregisterSensor?: (
  //   sensor:  string[],
  // ) => Promise<ConversationIdResponse>;
  // OnUnregisterSensorController?: (
  //   controller:  string[]
  // ) => Promise<ConversationIdResponse>;
  // OnUnregisterSensorType?: (
  //   type: string[]
  // ) => Promise<ConversationIdResponse>;
  OnUpdateWorkingOrganization: (id: string) => Promise<any>;
  OnGetSensorType?: () => Promise<SensorTypeResponse[]>;
  OnResetApplicationStore?: () => void;
  OnCreateAppointment?: (
    id: string,
    item: BaseAppointment,
    timezones?: IDropdownOption[]
  ) => void;
  OnDeleteAppointment?: (id: string, items: BaseAppointment[]) => void;
}

export interface ICalendarContentStates {
  cId: string;
  isRedirect: boolean;
  isDisabled: boolean;
  isSyncPanel: boolean;
}
