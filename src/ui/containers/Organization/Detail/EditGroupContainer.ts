import EditGroup from "src/ui/components/Organization/Detail/DetailPanel/Groups/Edit";
import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import { BaseResource } from "src/common/classes/BaseResource";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
// import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { compose } from "redux";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    isWorking: state.AppReducer.isWorking,
    confirmType: state.AppReducer.confirmType,
    group: state.Organization.group,
    organizationInfomation: state.Organization.organizationInfomation,
    theme: state.settingsReducer.theme,
    workingEditTab: state.Organization.workingEditTab,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  // let _organizationManager = OrganizationManager.Instance;
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

const EditGroupContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(EditGroup)
);

export default EditGroupContainer;
