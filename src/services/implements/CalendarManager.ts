import { ICalendarRepository } from "src/repositories/interface";
import { ConversationIdResponse } from "src/repositories/response";
import { CalendarRepository } from "src/repositories/implements/CalendarRepository";
import { ICalendarManager } from "../interface/ICalendarManager";
import {
  IRegisterAppointmentRequest,
  IRemoveAppointmentRequest,
  ISyncCalendarRequest,
  IUpdateAppointmentRequest,
} from "src/repositories/request";

export class CalendarManager implements ICalendarManager {
  private static _instance: CalendarManager;
  private _calendarRepositories: ICalendarRepository;
  constructor() {
    this._calendarRepositories = new CalendarRepository();
  }
  public static get Instance(): CalendarManager {
    if (!this._instance) {
      this._instance = new CalendarManager();
    }
    return this._instance;
  }
  PostCreateAppointment = async (
    id: string,
    req: IRegisterAppointmentRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._calendarRepositories.PostCreateAppointment(
      id,
      req
    );
    return response;
  };
  PostEditAppointment = async (
    id: string,
    req: IUpdateAppointmentRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._calendarRepositories.PostEditAppointment(
      id,
      req
    );
    return response;
  };
  PostDeleteAppointments = async (
    id: string,
    req: IRemoveAppointmentRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._calendarRepositories.PostDeleteAppointments(
      id,
      req
    );
    return response;
  };
  PostSynchCalendar = async (
    id: string,
    req: ISyncCalendarRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._calendarRepositories.PostSynchCalendar(id, req);
    return response;
  };
  PostStopSynchCalendar = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response = await this._calendarRepositories.PostStopSynchCalendar(id);
    return response;
  };
}
