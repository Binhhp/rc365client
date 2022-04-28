import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import EditConfiguration from "src/ui/components/Sensor/Panels/Configurations/Edit";
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
    configuration: state.Sensor.config,
    sensorTypeOpts: state.Sensor.sensorOpts,
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
    OnResetSensorStore: () => {
      dispatch(SensorReduxActionTS.SensorResetStore());
    },
  };
};

const EditConfigurationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditConfiguration);

export default EditConfigurationContainer;
