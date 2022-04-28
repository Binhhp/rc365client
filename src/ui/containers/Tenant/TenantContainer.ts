import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Tenant from "src/ui/components/Tenant/Content";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { TypeConfirm } from "src/entity/enums";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { TenantManager } from "src/services/implements/TenantManager";
import { Dispatch } from "redux";
import { ConversationIdResponse } from "src/repositories/response";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    theme: settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    selectedTenants: state.Tenant.selectedTenants,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    confirmType: state.AppReducer.confirmType,
    organizationInfomation: state.Organization.organizationInfomation,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager = OrganizationManager.Instance;
  let _tenantManager = TenantManager.Instance;
  return {
    OnUpdateBeardCrumb: (nodes: INodes[]) => {
      dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
    },
    OnUpdatePanelPage: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnGetDomains: async (id: string) => {
      return await _organizationManager
        .GetOrganizationDomains(id)
        .then((res) => {
          dispatch(OrganizationReduxAction.StoreUpdateAvailableDomains());
        });
    },
    OnResetTenantStore: () => {
      dispatch(TenantReduxActionTS.onResetTenantStore());
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
    OnDeleteTenant: async (id: string): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      return await _tenantManager.DeleteTenant(id).then((res) => {
        return res;
      });
    },
    OnResetSelectedTenant: async () => {
      dispatch(TenantReduxActionTS.onUpdateSelectedTenants([]));
    },
    OnGetLicenceList: async () => {
      let storage = localStorage.getItem("tenantId");
      await _tenantManager
        .GetLicenceList(storage ? JSON.parse(storage) : "root")
        .then((res) => {
          dispatch(
            TenantReduxActionTS.onGetLicenceList(_tenantManager.licence)
          );
        });
    },
  };
};

const TenantContainer = connect(mapStateToProps, mapDispatchToProps)(Tenant);

export default TenantContainer;
