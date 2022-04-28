import EditResource from "src/ui/components/Organization/Detail/DetailPanel/Resources/Edit";
import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import { BaseResource } from "src/common/classes/BaseResource";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  let { userReducer } = state;
  return {
    userInfo: userReducer,
    isWorking: state.AppReducer.isWorking,
    theme: state.settingsReducer.theme,
    confirmType: state.AppReducer.confirmType,
    resource: state.Organization.resource,
    organizationInfomation: state.Organization.organizationInfomation,
    workingEditTab: state.Organization.workingEditTab,
    isSearchInPanel: state.AppReducer.isSearchInPanel,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnReloadOrganization: (isReload: boolean) => {
      dispatch(OrganizationReduxAction.ReloadOrganizationList(isReload));
    },

    OnClearCidAndWorkflowId: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify());
    },

    OnHandleUpdateResource: (resource: BaseResource) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditResource(resource));
    },
    OnHandleUpdateDisabledPanelPage: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Null));
    },
    OnResetOrganizationStore: () => {
      dispatch(OrganizationReduxAction.StoreResetWorkingData());
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateWorkingEditTab: (tab: WorkingEditTab) => {
      dispatch(OrganizationReduxAction.StoreUpdateWorkingEditTab(tab));
    },
  };
};

const EditResourceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditResource);

export default EditResourceContainer;
