import { ShowAsEnums } from "src/common/classes/BaseAppointments";

export class IRegisterAppointmentRequest {
  Subject: string;
  ShowAs: ShowAsEnums;
  Start: DataTimeTimeZoneRequest;
  End: DataTimeTimeZoneRequest;
}

export class IUpdateAppointmentRequest {
  AppointmentId: string;
  Subject: string;
  Start: DataTimeTimeZoneRequest;
  End: DataTimeTimeZoneRequest;
  ShowAs: ShowAsEnums;
}

export class IRemoveAppointmentRequest {
  AppointmentIds: string[];
}

export class ISyncCalendarRequest {
  ResourceId: string;
}

export class DataTimeTimeZoneRequest {
  DateTime: Date;
  TimeZone: string;
}
