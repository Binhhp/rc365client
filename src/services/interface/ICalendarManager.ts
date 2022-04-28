import {
  IRegisterAppointmentRequest,
  IRemoveAppointmentRequest,
  ISyncCalendarRequest,
  IUpdateAppointmentRequest,
} from "src/repositories/request";
import { ConversationIdResponse } from "src/repositories/response";

export interface ICalendarManager {
  PostCreateAppointment: (
    id: string,
    req: IRegisterAppointmentRequest
  ) => Promise<ConversationIdResponse>;
  PostEditAppointment: (
    id: string,
    req: IUpdateAppointmentRequest
  ) => Promise<ConversationIdResponse>;
  PostDeleteAppointments: (
    id: string,
    req: IRemoveAppointmentRequest
  ) => Promise<ConversationIdResponse>;
  PostSynchCalendar: (
    id: string,
    req: ISyncCalendarRequest
  ) => Promise<ConversationIdResponse>;
  PostStopSynchCalendar: (id: string) => Promise<ConversationIdResponse>;
}
