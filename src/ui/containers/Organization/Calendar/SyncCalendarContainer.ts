import { connect } from "react-redux";
import { compose } from "redux";
import { TypePanel } from "src/entity/enums";
import { CalendarManager } from "src/services/implements/CalendarManager";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { CalendarReduxActionTS } from "src/ui/actions/implements/CalendarAct";
import Synchronized from "src/ui/components/Organization/Calendar/Panels/Sync";
import { appReducers } from "src/ui/reducers";
import { Dispatch } from "redux";
import { ISyncCalendarRequest } from "src/repositories/request";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    organizationInfomation: state.Organization.organizationInfomation,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    workingCalendar: state.Calendar.workingCalendar,
    resource: state.Organization.resource,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _calendarManager = CalendarManager.Instance;
  return {
    OnUpdateVisiblePagePanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      if (val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Create));
      } else {
        dispatch(CalendarReduxActionTS.ResetCalendarStore());
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Null));
      }
    },
    OnStartSync: async (id: string, rsId: string) => {
      console.log("call api sync calendar");
      let req = new ISyncCalendarRequest();
      req.ResourceId = rsId;
      await _calendarManager.PostSynchCalendar(id, req);
    },
    OnStopSync: async (id: string) => {
      console.log("call api stop sync calendar");
      await _calendarManager.PostStopSynchCalendar(id);
    },
  };
};

const SynchronizedCalendarContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Synchronized)
);

export default SynchronizedCalendarContainer;
