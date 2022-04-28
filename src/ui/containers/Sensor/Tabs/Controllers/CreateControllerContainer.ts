import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import CreateController from "src/ui/components/Sensor/Panels/Controllers/Create";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { SensorReduxActionTS } from "src/ui/actions/implements/SensorAct";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { compose } from "redux";
import { BaseController } from "src/common/classes/BaseController";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    configuration: state.Sensor.config,
    sensor: state.Sensor.sensor,
    controller: state.Sensor.controller,
    workingTab: state.Sensor.workingTab,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateController: (controller: BaseController) => {
      dispatch(SensorReduxActionTS.SensorUpdateEditController(controller));
    },
    OnUpdateSensor: (sensor: BaseSensor) => {
      dispatch(SensorReduxActionTS.SensorUpdateEditSensor(sensor));
    },
  };
};

const CreateControllerContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(CreateController)
);

export default CreateControllerContainer;
