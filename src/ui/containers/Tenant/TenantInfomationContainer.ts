import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Infomation from "src/ui/components/Tenant/Create/Infomation";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { TypeConfirm } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TenantManager } from "src/services/implements/TenantManager";
import {
  CreateTenantRequest,
  OwnerRequest,
} from "src/repositories/request/Tenants";
import { Dispatch } from "redux";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    domainOptions: state.Organization.domainOptions,
    isWorking: state.AppReducer.isWorking,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    confirmType: state.AppReducer.confirmType,
    licences: state.Tenant.licences,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _tenantManager = TenantManager.Instance;
  return {
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdatePanelVisible: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
    },
    OnCreateTenant: async (tenant: BaseTenant, isAssign: boolean) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new CreateTenantRequest();
      req.Name = tenant.name;
      req.LicenceType = tenant.tenantInfo.licenceInfo.licenceType;
      if (isAssign) {
        let owner = new OwnerRequest();
        owner.Email = tenant.tenantInfo.owner.email;
        owner.Name = tenant.tenantInfo.owner.name;
        owner.PhoneNumber = tenant.tenantInfo.owner.phoneNumber;
        req.Owner = owner;
      }
      await _tenantManager.CreateTenant(req).then((res) => {
        if (res) {
          dispatch(TenantReduxActionTS.onUpdateTenantCId(res.conversationId));
          dispatch(
            TenantReduxActionTS.onUpdateTenantWId(
              res.workflowId ? res.workflowId : ""
            )
          );
        }
        return res;
      });
    },
  };
};

const TenantInfomationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Infomation);

export default TenantInfomationContainer;
