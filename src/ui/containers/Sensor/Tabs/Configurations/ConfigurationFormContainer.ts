import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import ConfigurationForm from "src/ui/components/Sensor/Panels/Configurations/Form";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { SensorReduxActionTS } from "src/ui/actions/implements/SensorAct";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { compose } from "redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    sensorTypeOpts: state.Sensor.sensorOpts,
    configuration: state.Sensor.config,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateConfiguration: (configuration: BaseSensorType) => {
      dispatch(
        SensorReduxActionTS.SensorUpdateEditConfiguration(configuration)
      );
    },
  };
};

const ConfigurationFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(ConfigurationForm)
);

export default ConfigurationFormContainer;
