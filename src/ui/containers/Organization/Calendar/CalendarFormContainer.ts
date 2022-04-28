import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import Form from "src/ui/components/Organization/Calendar/Form";
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
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    timeZones: state.settingsReducer.timeZones,
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
  };
};

const FormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Form)
);

export default FormContainer;
