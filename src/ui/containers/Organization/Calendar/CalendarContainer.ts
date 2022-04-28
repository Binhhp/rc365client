import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import {
  DataTimeTimeZoneRequest,
  IRegisterAppointmentRequest,
  IRemoveAppointmentRequest,
} from "src/repositories/request";
import { CalendarManager } from "src/services/implements/CalendarManager";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { CalendarReduxActionTS } from "src/ui/actions/implements/CalendarAct";
import Calendar from "src/ui/components/Organization/Calendar/Content";
import { appReducers } from "src/ui/reducers";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    selectedAppointments: state.Calendar.selectedAppointments,
    workingAppointment: state.Calendar.workingAppointment,
    workingCalendar: state.Calendar.workingCalendar,
    resource: state.Organization.resource,
    orgInfo: state.Organization.organizationInfomation,
    confirmType: state.AppReducer.confirmType,
    isWorking: state.AppReducer.isWorking,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    panelType: state.AppReducer.panelType,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    timeZones: state.settingsReducer.timeZones,
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
    OnUpdateVisiblePagePanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      if (val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Create));
      } else {
        ResetInformation();
        dispatch(CalendarReduxActionTS.ResetCalendarStore());
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Null));
      }
    },
    OnResetApplicationStore: () => {
      ResetInformation();
      // dispatch(OrganizationReduxAction.StoreResetWorkingData());
      dispatch(CalendarReduxActionTS.ResetCalendarStore());
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateBeardCrumb: (nodes: INodes[]) => {
      dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
    },
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnCreateAppointment: async (
      id: string,
      item: BaseAppointment,
      timezones?: IDropdownOption[]
    ) => {
      let start = new DataTimeTimeZoneRequest();
      let end = new DataTimeTimeZoneRequest();
      start.DateTime = new Date(item.startTime.dateTime);
      start.TimeZone = item.startTime.timeZone;
      end.DateTime = new Date(item.endTime.dateTime);
      end.TimeZone = item.endTime.timeZone;
      if (timezones) {
        let tzStart = timezones.find((t) => t.text === item.startTime.timeZone);
        let tzEnd = timezones.find((t) => t.text === item.endTime.timeZone);
        if (tzEnd) {
          end.TimeZone = String(tzEnd.key);
        }
        if (tzStart) {
          start.TimeZone = String(tzStart.key);
        }
      }
      let req = new IRegisterAppointmentRequest();
      req.Subject = item.subject;
      req.Start = start;
      req.End = end;
      req.ShowAs = item.showAs;
      await _calendarManager.PostCreateAppointment(id, req).then((res) => {
        return res;
      });
    },
    OnDeleteAppointment: async (id: string, items: BaseAppointment[]) => {
      let req = new IRemoveAppointmentRequest();
      req.AppointmentIds = items.map((i) => {
        return i.guid;
      });
      await _calendarManager.PostDeleteAppointments(id, req).then((res) => {
        return res;
      });
    },
  };
};

const CalendarContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Calendar)
);

export default CalendarContainer;
