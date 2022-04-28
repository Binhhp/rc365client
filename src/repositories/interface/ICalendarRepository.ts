import {
  IRegisterAppointmentRequest,
  IRemoveAppointmentRequest,
  ISyncCalendarRequest,
  IUpdateAppointmentRequest,
} from "../request";
import { ConversationIdResponse } from "../response";

export interface ICalendarRepository {
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
