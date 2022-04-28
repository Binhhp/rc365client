import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import FeatureEditor from "src/ui/components/Tenant/Feature/Tabs/Editor";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { compose } from "redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingFeature: state.Tenant.workingFeature,
    isWorking: state.AppReducer.isWorking,
    editorValue: state.Tenant.sourceConfig,
    workingConfig: state.Tenant.workingConfig,
    workingContext: state.Tenant.workingContext,
    loggingConfig: state.Tenant.loggingConfig,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    confirmType: state.AppReducer.confirmType,
    workingParameter: state.Tenant.workingParameter,
    configurationType: state.Tenant.configurationType,
    signalRData: state.Organization.signalRData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnResetApplicationStore: () => {
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
    onUpdateWorkingConfig: (value: string) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingConfig(value));
    },
    onUpdateWorkingLogging: (str: string) => {
      dispatch(TenantReduxActionTS.onUpdateLoggingConfiguration(str));
    },
    onUpdateWorkingParameter: (str: string) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingFeatureParameter(str));
    },
  };
};

const FeatureDetailContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(FeatureEditor)
);

export default FeatureDetailContainer;
