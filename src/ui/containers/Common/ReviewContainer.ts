import Review from "src/common/ui/ConfirmPanel/Review";
import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    workingTab: state.Organization.workingTab,
    sensorWorkingTab: state.Sensor.workingTab,
    workingDomains: state.Organization.workingDomains,
    workingUsers: state.Organization.workingUsers,
    workingResources: state.Organization.workingResources,
    workingGroups: state.Organization.workingGroups,
    user: state.Organization.user,
    domain: state.Organization.domain,
    resource: state.Organization.resource,
    group: state.Organization.group,
    sensor: state.Sensor.sensor,
    controller: state.Sensor.controller,
    configuration: state.Sensor.config,
    panelType: state.AppReducer.panelType,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
