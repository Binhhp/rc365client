import { connect } from "react-redux";
import { compose } from "redux";
import { BaseApplication } from "src/common/classes/BaseApplication";
import {
  ApplicationInfomation,
  PostApplicationInfomationRequest,
} from "src/repositories/request";
import { ConversationIdResponse } from "src/repositories/response";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { IOrganizationManager } from "src/services/interface";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import Form from "src/ui/components/Organization/Detail/DetailPanel/Application/Form";
import { appReducers } from "src/ui/reducers";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  let crtApplication =
    state.Organization.application.Clone() as BaseApplication;
  if (
    state.Organization.application.appId !== "" ||
    state.Organization.application.tenantId !== ""
  ) {
    crtApplication.appSecret = "1234567890";
  }
  return {
    theme: state.settingsReducer.theme,
    application: crtApplication,
    organizationInfomation: state.Organization.organizationInfomation,
    isLoading: state.AppReducer.isApplicationInfomationLoading,
    signalRSyncConversationId: state.AppReducer.signalRSyncConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSyncSignalR: state.AppReducer.isHaveMessageSyncSignalR,
    signalRData: state.Organization.signalRData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager: IOrganizationManager = OrganizationManager.Instance;
  return {
    OnResetSignalRData: async () => {
      dispatch(OrganizationReduxAction.StoreUpdateSignalRData(null));
    },
    OnGetApplicationInfomation: async (
      id: string
    ): Promise<ConversationIdResponse> => {
      dispatch(ApplicationReduxActionTS.UpdateApplicationTabLoadingAct(true));
      return await _organizationManager
        .GetApplicationInfomation(id)
        .then((res) => {
          dispatch(NotificationReduxActionTS.onUpdateSignalRGetData(res.conversationId));
          return res;
        });
    },
    OnUpdateApplicationInfomationTS: async (application: BaseApplication) => {
      dispatch(OrganizationReduxAction.StoreUpdateApplication(application));
    },
    OnUpdateApplicationInfomation: async (
      id: string,
      application: BaseApplication
    ): Promise<ConversationIdResponse> => {
      let req = new PostApplicationInfomationRequest();
      let appInfo = new ApplicationInfomation();
      appInfo.appId = application.appId || "";
      appInfo.appSecret = application.appSecret || "";
      appInfo.tenantId = application.tenantId || "";
      req.aadApplication = appInfo;
      req.tenantId = "TenantId";
      req.ResourceLimit = 300;
      dispatch(
        ApplicationReduxActionTS.UpdateApplicationInfomationLoadingAct(true)
      );
      return await _organizationManager
        .UpdateApplicationInfomationTS(id, req)
        .then((res) => {
          if (res) {
            dispatch(
              OrganizationReduxAction.StoreUpdateApplication(application)
            );
            dispatch(
              ApplicationReduxActionTS.UpdateApplicationInfomationLoadingAct(
                false
              )
            );
          }
          return res;
        })
        .catch((res) => {
          dispatch(
            ApplicationReduxActionTS.UpdateApplicationInfomationLoadingAct(
              false
            )
          );
          return res;
        });
    },
    OnUpdateApplicationTabLoading: async (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateApplicationTabLoadingAct(val));
    },
  };
};

const ApplicationFromContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Form)
);

export default ApplicationFromContainer;
