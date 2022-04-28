import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { CalendarReduxActionTS } from "src/ui/actions/implements/CalendarAct";
import EditAppointment from "src/ui/components/Organization/Calendar/Panels/Edit";
import { appReducers } from "src/ui/reducers";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    selectedAppointments: state.Calendar.selectedAppointments,
    workingAppointment: state.Calendar.workingAppointment,
    organizationInfomation: state.Organization.organizationInfomation,
    confirmType: state.AppReducer.confirmType,
    isWorking: state.AppReducer.isWorking,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    panelType: state.AppReducer.panelType,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    signalRConversationId: state.AppReducer.signalRConversationId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
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
    OnUpdateWorkingAppointment: (apm: BaseAppointment) => {
      dispatch(CalendarReduxActionTS.UpdateWorkingAppointment(apm));
    },
  };
};

const EditAppointmentContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(EditAppointment)
);

export default EditAppointmentContainer;
