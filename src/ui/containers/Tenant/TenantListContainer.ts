import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import List from "src/ui/components/Tenant/Content/List";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { Dispatch } from "redux";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    signalRConversationId: state.AppReducer.signalRConversationId,
    theme: settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    selectedTenants: state.Tenant.selectedTenants,
    workingTenant: state.Tenant.workingTenants,
    tenantCId: state.Tenant.tenantCId,
    tenantWId: state.Tenant.tenantWId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnClearCidAndWorkflowId: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify());
    },
    OnSelectTenants: (items: any[]) => {
      let tenants = items.map((i) => {
        let tenant = new BaseTenant();
        tenant.id = i.guid;
        tenant.isDeleted = i.isDeleted;
        tenant.isDisposed = i.isDisposed;
        tenant.name = i.name;
        tenant.sequenceNumber = i.sequenceNumber;
        tenant.status = i.status;
        tenant.tenantInfo = i.tenantInfo;
        tenant.version = i.version;
        return tenant;
      });
      dispatch(TenantReduxActionTS.onUpdateSelectedTenants(tenants));
    },
    OnUpdateWorkingTenant: (item: any) => {
      let tenant = new BaseTenant();
      tenant.id = item.guid;
      tenant.isDeleted = item.isDeleted;
      tenant.isDisposed = item.isDisposed;
      tenant.name = item.name;
      tenant.sequenceNumber = item.sequenceNumber;
      tenant.status = item.status;
      tenant.version = item.version;
      tenant.tenantInfo = item.tenantInfo;
      dispatch(TenantReduxActionTS.onUpdateWorkingTenant(tenant));
    },
    OnResetSignalRInfomations: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
    },
  };
};

const TenantListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default TenantListContainer;
