import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Detail from "src/ui/components/Tenant/Detail/Infomation";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingTenant: state.Tenant.workingTenants,
    isWorking: state.AppReducer.isWorking,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdatePanelVisible: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
    },
    OnUpdateWorkingTenant: (tenant: BaseTenant) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingTenant(tenant));
    },
  };
};

const TenantDetailInfomationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);

export default TenantDetailInfomationContainer;
