import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Sensor from "src/ui/components/Sensor/Content";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm, TypePanel, TypeSensorTabs } from "src/entity/enums";
import { SensorReduxActionTS } from "src/ui/actions/implements/SensorAct";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseController } from "src/common/classes/BaseController";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { ConversationIdResponse } from "src/repositories/response";
import {
  RegisterControllerRequest,
  RegisterSensorRequest,
  RegisterSensorTypeRequest,
} from "src/repositories/request/Sensors/RegisterRequest";
import { BaseResource } from "src/common/classes/BaseResource";
import { SensorManager } from "src/services/implements/SensorManager";
import { SensorTypeResponse } from "src/repositories/response/Sensors/SensorTypeResponse";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    workingTab: state.Sensor.workingTab,
    workingListItem: state.Sensor.workingListItem,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    isWorking: state.AppReducer.isWorking,
    panelType: state.AppReducer.panelType,
    isSearchInPanel: state.AppReducer.isSearchInPanel,
    confirmType: state.AppReducer.confirmType,
    sensor: state.Sensor.sensor,
    controller: state.Sensor.controller,
    configuration: state.Sensor.config,
    resource: state.Organization.resource,
    orgInfo: state.Organization.organizationInfomation,
    sensorTypeOpts: state.Sensor.sensorOpts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _sensorManager = SensorManager.Instance;
  return {
    OnUpdateVisiblePagePanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      if (val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Create));
      }
      if (!val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Null));
        dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      }
    },
    OnUpdateWorkingTab: (type: TypeSensorTabs) => {
      dispatch(SensorReduxActionTS.SensorUpdateWorkingTab(type));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnResetSensorStore: () => {
      dispatch(SensorReduxActionTS.SensorResetStore());
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
    OnUpdateBeardCrumb: (nodes: INodes[]) => {
      dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
    },
    OnRegisterSensor: async (
      sensor: BaseSensor,
      resource?: BaseResource
    ): Promise<ConversationIdResponse> => {
      let req = new RegisterSensorRequest();
      req.ResourceId = resource ? resource.id : "";
      req.SensorId = sensor.sensorId;
      req.SensorType = sensor.sensorType;
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager.RegisterSensor(req).then((res) => {
        return res;
      });
    },
    OnRegisterSensorController: async (
      controller: BaseController
    ): Promise<ConversationIdResponse> => {
      let req = new RegisterControllerRequest();
      req.TimeZone = controller.timeZone;
      req.ResourceId = controller.resourceId;
      req.ConfigDefaultReservationTime = controller.reservationTime;
      req.ConfigDefaultSensorTimeFrame = controller.sensorTime;
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager.RegisterSensorController(req).then((res) => {
        return res;
      });
    },
    OnRegisterSensorType: async (
      type: BaseSensorType
    ): Promise<ConversationIdResponse> => {
      let req = new RegisterSensorTypeRequest();
      req.ApiKey = type.apiKey;
      req.PullUrl = type.pullUrl;
      req.PushUrl = type.pushUrl;
      req.PushUrlEndPoint = type.endpoint;
      req.SensorType = type.sensorType;
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(TypeConfirm.Null));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(false));
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(false));
      dispatch(SensorReduxActionTS.SensorResetStore());
      return await _sensorManager.RegisterSensorType(req).then((res) => {
        return res;
      });
    },
    OnUpdateWorkingOrganization: async (id: string) => {
      dispatch(SensorReduxActionTS.SensorUpdateWorkingOrg(id));
    },
    OnGetSensorType: async (): Promise<SensorTypeResponse[]> => {
      return await _sensorManager.GetSensorTypeList().then((res) => {
        if (res && res.length > 0) {
          dispatch(SensorReduxActionTS.SensorUpdateSensorTypeOpts());
          return res;
        }
        return res;
      });
    },
    OnUpdateStoreController: (controller: BaseController) => {
      controller.resourceId = "";
      controller.resourceName = "";
      controller.resourceInfo = new BaseResource();
      dispatch(SensorReduxActionTS.SensorUpdateEditController(controller));
    },
  };
};

const SensorContainer = connect(mapStateToProps, mapDispatchToProps)(Sensor);

export default SensorContainer;
