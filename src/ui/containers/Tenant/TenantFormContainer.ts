import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Form from "src/ui/components/Tenant/Form";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { TenantManager } from "src/services/implements/TenantManager";
import { compose } from "redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    licenceTypes: state.Tenant.licences,
    isWorking: state.AppReducer.isWorking,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _tenantManager = TenantManager.Instance;
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnGetLicenceList: async (): Promise<string[]> => {
      let storage = localStorage.getItem("tenantId");
      await _tenantManager
        .GetLicenceList(storage ? JSON.parse(storage) : "root")
        .then((res) => {
          dispatch(
            TenantReduxActionTS.onGetLicenceList(_tenantManager.licence)
          );
        });
      return await _tenantManager.licence;
    },
  };
};

const FormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Form)
);

export default FormContainer;
