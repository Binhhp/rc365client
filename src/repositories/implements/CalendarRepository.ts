import {
  ApiFromOData,
  BuildURLWithTenantId,
} from "../../common/constants/RootURL";
import { ICalendarRepository } from "../interface";
import { FetchDataFromServer } from "../../common/functions";
import { axiosMethod } from "src/entity/enums";
import { ConversationIdResponse } from "../response/ConversationIdResponse";
import {
  IRegisterAppointmentRequest,
  IRemoveAppointmentRequest,
  ISyncCalendarRequest,
  IUpdateAppointmentRequest,
} from "../request";

export class CalendarRepository implements ICalendarRepository {
  PostCreateAppointment = async (
    id: string,
    req: IRegisterAppointmentRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Calendars('${id}')/RegisterAppointment`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostEditAppointment = async (
    id: string,
    req: IUpdateAppointmentRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Calendars('${id}')/UpdateAppointment`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostDeleteAppointments = async (
    id: string,
    req: IRemoveAppointmentRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Calendars('${id}')/RemoveAppointment`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostSynchCalendar = async (
    id: string,
    req: ISyncCalendarRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Calendars('${id}')/SyncCalendar`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostStopSynchCalendar = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let req = new ISyncCalendarRequest();
    req.ResourceId = id;
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Calendars('${id}')/StopSyncCalendar`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
}
