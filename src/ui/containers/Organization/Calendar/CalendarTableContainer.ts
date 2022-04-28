import { IDropdownOption } from "aod-dependencies/Dropdown";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import {
  AppointmentBody,
  BaseAppointment,
  SingleValueProperty,
} from "src/common/classes/BaseAppointments";
import { BaseCalendar } from "src/common/classes/BaseCalendar";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import {
  DataTimeTimeZoneRequest,
  IRemoveAppointmentRequest,
  IUpdateAppointmentRequest,
} from "src/repositories/request";
import { CalendarManager } from "src/services/implements/CalendarManager";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { CalendarReduxActionTS } from "src/ui/actions/implements/CalendarAct";
import CalendarTable from "src/ui/components/Organization/Calendar/Content/List";
import { appReducers } from "src/ui/reducers";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    organizationInfomation: state.Organization.organizationInfomation,
    confirmType: state.AppReducer.confirmType,
    panelType: state.AppReducer.panelType,
    timeZones: state.settingsReducer.timeZones,
    workingCalendar: state.Calendar.workingCalendar,
    workingAppointment: state.Calendar.workingAppointment,
    resource: state.Organization.resource,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _calendarManager = CalendarManager.Instance;
  const ResetInformation = () => {
    dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
    dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
    dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
    dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Null));
  };
  return {
    OnUpdatePagePanelStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      if (val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Edit));
      } else {
        dispatch(CalendarReduxActionTS.ResetCalendarStore());
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Null));
      }
    },
    OnResetApplicationStore: () => {
      ResetInformation();
      dispatch(CalendarReduxActionTS.ResetCalendarStore());
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateWorkingAppointment: async (
      item: any,
      timezones: IDropdownOption[]
    ) => {
      let appointment = new BaseAppointment();
      appointment.subject = item.subject;
      appointment.startTime = item.startTime;
      appointment.endTime = item.endTime;
      if (timezones) {
        let tzStart = timezones.find(
          (t) => t.text === appointment.startTime.timeZone
        );
        let tzEnd = timezones.find(
          (t) => t.text === appointment.endTime.timeZone
        );
        if (tzEnd) {
          appointment.endTime.timeZone = String(tzEnd.key);
        }
        if (tzStart) {
          appointment.startTime.timeZone = String(tzStart.key);
        }
      }
      appointment.resourceId = item.resourceId;
      appointment.reservationId = item.reservationId;
      appointment.guid = item.guid;
      appointment.showAs = item.showAs;
      appointment.parentId = item.parentId;
      if (item.body) {
        let body = new AppointmentBody();
        body.content = item.body.content;
        body.contentType = item.body.contentType;
        appointment.body = body;
      }
      if (item.singleValueExtendedProperties) {
        let valItem = new SingleValueProperty();
        valItem.id = item.singleValueExtendedProperties.id;
        valItem.value = item.singleValueExtendedProperties.value;
        appointment.singleValueExtendedProperties = valItem;
      }
      if (item.calendar) {
        let calendar = new BaseCalendar();
        calendar.adResourceId = item.adResourceId;
        calendar.appointments = item.appointments;
        calendar.cannotSyncAppointments = item.cannotSyncAppointments;
        calendar.lastProcessResult = item.lastProcessResult;
        calendar.onPremise = item.onPremise;
        calendar.orgId = item.orgId;
        calendar.removeAppointments = item.removeAppointments;
        calendar.resourceId = item.resourceId;
        calendar.subcriptionId = item.subcriptionId;
        calendar.syncProcessData = item.syncProcessData;
        calendar.syncStatus = item.syncStatus;
        appointment.calendar = calendar;
      }
      await dispatch(
        CalendarReduxActionTS.UpdateWorkingAppointment(appointment)
      );
    },
    OnUpdateSelectedAppointments: async (items: any[]) => {
      let crtItems = [...items];
      let appointments = crtItems.map((i) => {
        let appointment = new BaseAppointment();
        appointment.subject = i.subject;
        appointment.guid = i.guid;
        appointment.startTime = i.startTime;
        appointment.endTime = i.endTime;
        appointment.resourceId = i.resourceId;
        appointment.reservationId = i.reservationId;
        appointment.reservationId = i.reservationId;
        appointment.body = i.body;
        appointment.singleValueExtendedProperties =
          i.singleValueExtendedProperties;
        appointment.calendar = i.calendar;
        return appointment;
      });
      await dispatch(
        CalendarReduxActionTS.UpdateSelectedAppointment(appointments)
      );
    },
    OnEditAppointment: async (
      id: string,
      item: BaseAppointment,
      timeZones: IDropdownOption[]
    ) => {
      let start = new DataTimeTimeZoneRequest();
      let end = new DataTimeTimeZoneRequest();
      start.DateTime = new Date(item.startTime.dateTime);
      start.TimeZone = item.startTime.timeZone;
      end.DateTime = new Date(item.endTime.dateTime);
      end.TimeZone = item.endTime.timeZone;
      if (timeZones) {
        let tzStart = timeZones.find((t) => t.text === item.startTime.timeZone);
        let tzEnd = timeZones.find((t) => t.text === item.endTime.timeZone);
        if (tzEnd) {
          end.TimeZone = String(tzEnd.key);
        }
        if (tzStart) {
          start.TimeZone = String(tzStart.key);
        }
      }
      let req = new IUpdateAppointmentRequest();
      req.AppointmentId = item.guid;
      req.Subject = item.subject;
      req.Start = start;
      req.End = end;
      req.ShowAs = item.showAs;
      await _calendarManager.PostEditAppointment(id, req).then((res) => {
        return res;
      });
    },
    OnDeleteAppointment: async (id: string, item: BaseAppointment) => {
      let req = new IRemoveAppointmentRequest();
      req.AppointmentIds = [item.guid];
      await _calendarManager.PostDeleteAppointments(id, req).then((res) => {
        return res;
      });
    },
  };
};

const CalendarTableContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(CalendarTable)
);

export default CalendarTableContainer;
