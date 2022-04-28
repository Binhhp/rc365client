import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import ConfigurationTab from "src/ui/components/Sensor/Panels/Controllers/Tabs/Configuration";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { BaseController } from "src/common/classes/BaseController";
import { SensorReduxActionTS } from "src/ui/actions/implements/SensorAct";
import { compose } from "redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    confirmType: state.AppReducer.confirmType,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    configuration: state.Sensor.config,
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
    OnHandleUpdateController: (controller: BaseController) => {
      dispatch(SensorReduxActionTS.SensorUpdateEditController(controller));
    },
  };
};

const ConfigurationTabContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(ConfigurationTab)
);

export default ConfigurationTabContainer;
