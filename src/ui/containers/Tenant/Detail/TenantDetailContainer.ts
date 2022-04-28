import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Detail from "src/ui/components/Tenant/Detail/Content";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";
import { BaseTenant, TenantDto } from "src/common/classes/BaseTenant";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { TenantManager } from "src/services/implements/TenantManager";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import {
  OwnerRequest,
  UpdateTenantRequest,
} from "src/repositories/request/Tenants";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const onHandleGetParameterVal = (obj: any, childObj?: any): any => {
  if (!childObj) {
    for (const key in obj) {
      if (key === "Parameters") {
        return JSON.stringify(obj[key]);
      } else if (key !== "Parameters" && typeof obj[key] === "object") {
        return onHandleGetParameterVal(obj, obj[key]);
      } else {
        return "";
      }
    }
  }
  if (childObj && typeof childObj === "object" && !Array.isArray(childObj)) {
    for (const key in childObj) {
      if (key === "Parameters") {
        return JSON.stringify(childObj[key]);
      } else if (key !== "Parameters" && typeof childObj[key] === "object") {
        return onHandleGetParameterVal(obj, childObj);
      } else {
        return "";
      }
    }
  }
  if (childObj && typeof childObj === "object" && Array.isArray(childObj)) {
    childObj.forEach((i: any) => {
      if (typeof i === "object") {
        return onHandleGetParameterVal(obj, i);
      } else {
        return "";
      }
    });
  }
  return "";
};

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingTenant: state.Tenant.workingTenants,
    isDetailFeatureVisibled: state.Tenant.isDetailFeatureVisibled,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    confirmType: state.AppReducer.confirmType,
    isWorking: state.AppReducer.isWorking,
    workingContexts: state.Tenant.workingContext,
    configurationType: state.Tenant.configurationType,
    contexts: state.Tenant.contexts,
    sourceConfig: state.Tenant.sourceConfig,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _TenantManager = TenantManager.Instance;
  return {
    OnUpdateDetailFeatureVisibled: (val: boolean) => {
      dispatch(TenantReduxActionTS.onUpdateFeatureVisibledDetail(val));
    },
    OnUpdateWorkingFeature: (item: BaseFeatureContextTenant) => {
      dispatch(TenantReduxActionTS.onUpdateWorkingFeature(item));
      if (item.configuration && item.configuration.trim() !== "") {
        let source = "";
        try {
          source = JSON.parse(item.configuration.trim());
        } catch {}
        if (source) {
          let param = onHandleGetParameterVal(source);
          dispatch(TenantReduxActionTS.onUpdateWorkingFeatureParameter(param));
        }
      }
    },
    OnHandleUpdateBreadCrumb: (nodes: INodes[]) => {
      dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
    },
    OnGetContextsList: async (id: string) => {
      return await _TenantManager.GetContextsByTenantId(id).then((res) => {
        dispatch(TenantReduxActionTS.onUpdateContextsList());
      });
    },
    OnGetFeaturesList: async (tenantId: string) => {
      return await _TenantManager
        .GetFeaturesByTenantId(tenantId)
        .then((res) => {
          dispatch(TenantReduxActionTS.onUpdateFeatureList());
        });
    },
    OnGetTenantById: async (id: string) => {
      await _TenantManager.GetTenantDetailById(id).then((res: TenantDto) => {
        if (
          _TenantManager.workingTenant &&
          _TenantManager.workingTenant.id !== ""
        ) {
          dispatch(
            TenantReduxActionTS.onUpdateWorkingTenant(
              _TenantManager.workingTenant
            )
          );
        }
      });
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnHandleUpdateTenant: async (
      id: string,
      tenant: BaseTenant
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let owner = new OwnerRequest();
      owner.Name = tenant.tenantInfo.owner.name;
      owner.Email = `${tenant.tenantInfo.owner.email}`;
      owner.PhoneNumber = tenant.tenantInfo.owner.phoneNumber;
      let req = new UpdateTenantRequest();
      req.Name = tenant.name;
      req.LicenceType = tenant.tenantInfo.licenceInfo.licenceType;
      req.Owner = owner;
      return await _TenantManager.UpdateTenant(id, req).then((res) => {
        if (res) {
          dispatch(TenantReduxActionTS.onUpdateTenantCId(res.conversationId));
          dispatch(TenantReduxActionTS.onUpdateTenantWId(res.workflowId || ""));
        }
        return res;
      });
    },
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateSourceConfig: (config: string) => {
      dispatch(TenantReduxActionTS.onUpdateJsonConfig(config));
      dispatch(TenantReduxActionTS.onUpdateWorkingConfig(config));
    },
  };
};

const TenantDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);

export default TenantDetailContainer;
