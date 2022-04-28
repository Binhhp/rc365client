import Confirm from "src/common/ui/ConfirmPanel";
import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    workingTab: state.Organization.workingTab,
    workingDomains: state.Organization.workingDomains,
    workingUsers: state.Organization.workingUsers,
    workingResources: state.Organization.workingResources,
    workingGroups: state.Organization.workingGroups,
    type: state.AppReducer.confirmType,
    sensor: state.Sensor.sensor,
    controller: state.Sensor.controller,
    configuration: state.Sensor.config,
    resource: state.Organization.resource,
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

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
