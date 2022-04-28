import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import FeatureTemplete from "src/ui/components/Tenant/Feature/Tabs/Templete";
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
    sourceConfig: state.Tenant.sourceConfig,
    workingConfig: state.Tenant.workingConfig,
    loggingConfig: state.Tenant.loggingConfig,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    confirmType: state.AppReducer.confirmType,
    workingParameter: state.Tenant.workingParameter,
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
    OnUpdateWorkingConfig: (value: string) => {
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

const FeatureTempleteContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(FeatureTemplete)
);

export default FeatureTempleteContainer;
