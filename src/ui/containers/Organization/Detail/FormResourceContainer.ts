import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import { compose } from "redux";
import Form from "src/ui/components/Organization/Detail/DetailPanel/Resources/Form";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    workingResources: state.Organization.workingResources,
    isWorking: state.AppReducer.isWorking,
    domainOptions: state.Organization.domainOptions,
    timeZones: state.settingsReducer.timeZones,
    resource: state.Organization.resource
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
  };
};

const ResourceFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Form)
);

export default ResourceFormContainer;
