import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Feature from "src/ui/components/Tenant/Feature/List";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingTenant: state.Tenant.workingTenants,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const TenantDetailFeatureContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feature);

export default TenantDetailFeatureContainer;
