import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import SensorTab from "src/ui/components/Sensor/Panels/Controllers/Tabs/Sensors";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { SensorManager } from "src/services/implements/SensorManager";
import { ConversationIdResponse } from "src/repositories/response";
import {
  AddSensorToControllerRequest,
  RemoveSensorInControllerRequest,
} from "src/repositories/request/Sensors/ActionSensorWithControllerRequest";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    controller: state.Sensor.controller,
    workingTab: state.Sensor.workingTab,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _sensorManager = SensorManager.Instance;
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnAddSensorToController: async (
      id: string,
      items: any[]
    ): Promise<ConversationIdResponse> => {
      let req = new AddSensorToControllerRequest();
      return _sensorManager.AddSensorToController(id, req).then((res) => {
        return res;
      });
    },
    OnRemoveSensorToController: async (
      id: string,
      items: any[]
    ): Promise<ConversationIdResponse> => {
      let req = new RemoveSensorInControllerRequest();
      return _sensorManager.RemoveSensorInController(id, req).then((res) => {
        return res;
      });
    },
  };
};

const SensorTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SensorTab);

export default SensorTabContainer;
