import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import EditController from "src/ui/components/Sensor/Panels/Controllers/Edit";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { SensorReduxActionTS } from "src/ui/actions/implements/SensorAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    confirmType: state.AppReducer.confirmType,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    controller: state.Sensor.controller,
    workingTab: state.Sensor.workingTab,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateVisiblePagePanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
    },
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnResetSensorStore: () => {
      dispatch(SensorReduxActionTS.SensorResetStore());
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
  };
};

const EditControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditController);

export default EditControllerContainer;
