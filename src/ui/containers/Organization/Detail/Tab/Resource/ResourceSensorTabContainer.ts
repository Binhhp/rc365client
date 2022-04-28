import { connect } from "react-redux";
import { Dispatch } from "redux";
import { BaseController } from "src/common/classes/BaseController";
import { TypeSensorTabs } from "src/entity/enums";
import { UpdateControllerRequest } from "src/repositories/request/Sensors/UpdateRequest";
import { SensorControllerResponse } from "src/repositories/response/Sensors/SensorControllerResponse";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { SensorManager } from "src/services/implements/SensorManager";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import { SensorReduxActionTS } from "src/ui/actions/implements/SensorAct";
import Sensor from "src/ui/components/Organization/Detail/DetailPanel/Resources/Tabs/Sensor";
import { appReducers } from "src/ui/reducers";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    resource: state.Organization.resource,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _sensorManager = SensorManager.Instance;
  let _organziationManager = OrganizationManager.Instance;
  return {
    OnGetControllerByResourceId: async (
      id: string
    ): Promise<SensorControllerResponse[]> => {
      return await _organziationManager
        .GetResourceControllerById(id)
        .then((res) => {
          return res;
        });
    },
    OnGetResourceSensorsById: async (id: string): Promise<boolean> => {
      return await _organziationManager
        .GetResourceSensorsById(id)
        .then((res) => {
          return res;
        });
    },
    OnUpdateOccupationStatus: async (
      controller: BaseController,
      val: boolean
    ) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new UpdateControllerRequest();
      req.ConfigDefaultReservationTime = controller.reservationTime;
      req.ConfigDefaultSensorTimeFrame = controller.sensorTime;
      req.ResourceId = controller.resourceId;
      req.ControllerStatus = val;
      await _sensorManager
        .UpdateSensorController(controller.guid, req)
        .then((res) => {
          return res;
        });
    },
    OnUpdateWorkingTabSensor: () => {
      dispatch(
        SensorReduxActionTS.SensorUpdateWorkingTab(TypeSensorTabs.Sensors)
      );
    },
  };
};

const SensorTabContainer = connect(mapStateToProps, mapDispatchToProps)(Sensor);

export default SensorTabContainer;
