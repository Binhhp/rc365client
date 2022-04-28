import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import SensorList from "src/ui/components/Sensor/Content/List";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { SensorReduxActionTS } from "src/ui/actions/implements/SensorAct";
import { TypeConfirm, TypePanel, TypeSensorTabs } from "src/entity/enums";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseController } from "src/common/classes/BaseController";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { SensorManager } from "src/services/implements/SensorManager";
import { ConversationIdResponse } from "src/repositories/response";
import {
  UpdateControllerRequest,
  UpdateSensorRequest,
  UpdateSensorTypeRequest,
} from "src/repositories/request/Sensors/UpdateRequest";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    workingTab: state.Sensor.workingTab,
    workingListItem: state.Sensor.workingListItem,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    panelType: state.AppReducer.panelType,
    isWorking: state.AppReducer.isWorking,
    confirmType: state.AppReducer.confirmType,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    sensor: state.Sensor.sensor,
    controller: state.Sensor.controller,
    config: state.Sensor.config,
    workingListItems: state.Sensor.workingListItem,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _sensorManager = SensorManager.Instance;
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnResetApplicationStore: () => {
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
    OnHandleVisiblePanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      if (val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Edit));
      }
      if (!val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Null));
      }
    },
    OnHandleUpdateWorkingItems: (items: any[], workingTabs: TypeSensorTabs) => {
      dispatch(SensorReduxActionTS.SensorUpdateWorkingList(items));
    },
    OnUpdateEditSensor: (sensor: BaseSensor) => {
      dispatch(SensorReduxActionTS.SensorUpdateEditSensor(sensor));
    },
    OnUpdateEditController: (controller: BaseController) => {
      dispatch(SensorReduxActionTS.SensorUpdateEditController(controller));
    },
    OnUpdateEditConfiguration: (config: BaseSensorType) => {
      dispatch(SensorReduxActionTS.SensorUpdateEditConfiguration(config));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnResetSensorStore: () => {
      dispatch(SensorReduxActionTS.SensorResetStore());
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
    OnUpdateSensorTS: async (
      sensor: BaseSensor,
      isDisconnect?: boolean
    ): Promise<ConversationIdResponse> => {
      let req = new UpdateSensorRequest();
      req.SensorControllerId = isDisconnect ? "" : sensor.sensorControllerId;
      req.SensorId = sensor.guid;
      req.SensorType = sensor.sensorType;
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager
        .UpdateSensor(req.SensorId, req)
        .then((res) => {
          return res;
        });
    },
    OnUpdateSensorControllerTS: async (
      controller: BaseController
    ): Promise<ConversationIdResponse> => {
      let req = new UpdateControllerRequest();
      req.ControllerStatus = controller.controllerStatus;
      req.ResourceId = controller.resourceId;
      req.ConfigDefaultReservationTime = controller.reservationTime;
      req.ConfigDefaultSensorTimeFrame = controller.sensorTime;
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager
        .UpdateSensorController(controller.guid, req)
        .then((res) => {
          return res;
        });
    },
    OnUpdateSensorTypeTS: async (
      type: BaseSensorType
    ): Promise<ConversationIdResponse> => {
      let req = new UpdateSensorTypeRequest();
      // req.ApiKey = type.apiKey;
      req.PullUrl = type.pullUrl;
      req.PushUrl = type.pushUrl;
      req.PushUrlEndPoint = type.endpoint;
      req.SensorType = type.sensorType;
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager
        .UpdateSensorType(type.sensorType, req)
        .then((res) => {
          return res;
        });
    },
    OnUnregisterSensorTS: async (
      sensor: BaseSensor
    ): Promise<ConversationIdResponse> => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager.UnregisterSensor(sensor.guid).then((res) => {
        return res;
      });
    },
    OnUnregisterSensorControllerTS: async (
      controller: BaseController
    ): Promise<ConversationIdResponse> => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager
        .UnregisterSensorController(controller.guid)
        .then((res) => {
          return res;
        });
    },
    OnUnregisterSensorTypeTS: async (
      type: BaseSensorType
    ): Promise<ConversationIdResponse> => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager
        .UnregisterSensorType(type.sensorType)
        .then((res) => {
          return res;
        });
    },
  };
};

const SensorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SensorList);

export default SensorContainer;
