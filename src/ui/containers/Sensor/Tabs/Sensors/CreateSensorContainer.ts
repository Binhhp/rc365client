import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import CreateSensor from "src/ui/components/Sensor/Panels/Sensors/Create";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { SensorReduxActionTS } from "src/ui/actions/implements/SensorAct";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { compose } from "redux";
import { BaseResource } from "src/common/classes/BaseResource";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    configuration: state.Sensor.config,
    sensor: state.Sensor.sensor,
    sensorTypeOpts: state.Sensor.sensorOpts,
    workingTab: state.Sensor.workingTab,
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
    OnUpdateSensor: (sensor: BaseSensor) => {
      dispatch(SensorReduxActionTS.SensorUpdateEditSensor(sensor));
    },
    OnUpdateWorkingResource: (rs?: any) => {
      let resource = new BaseResource();
      if (rs) {
        resource.id = rs.id;
        resource.name = rs.name;
        resource.phone = rs.phone;
        resource.timeZone = rs.timeZone;
        resource.capacity = rs.capacity;
        resource.deadline = rs.deadline;
        resource.deadlineMess = rs.deadlineMess;
        resource.deadlineTime = rs.deadlineTime;
        resource.department = rs.department;
        resource.description = rs.description;
        resource.displayName = rs.displayName;
        resource.domain = rs.email.split("@")[1];
        resource.email = rs.email.split("@")[0];
        resource.gallery = rs.gallery;
        resource.location = rs.location;
        resource.maxDelivery = rs.maxDelivery;
        resource.minHours = rs.minHours;
        resource.minHoursMess = rs.minHoursMess;
        resource.resourceAdInfo = rs.resourceAdInfo;
      }
      dispatch(OrganizationReduxAction.StoreUpdateEditResource(resource));
    },
  };
};

const CreateSensorContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(CreateSensor)
);

export default CreateSensorContainer;
