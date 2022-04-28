import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { TypeConfirm } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import EditUser from "src/ui/components/Organization/Detail/DetailPanel/Users/Edit";
import { appReducers } from "src/ui/reducers";

const mapStateToProps = (state: appReducers) => {
  let { userReducer } = state;

  return {
    userInfo: userReducer,
    theme: state.settingsReducer.theme,
    isUserInfomationLoading: state.AppReducer.isUserInfomationLoading,
    isWorking: state.AppReducer.isWorking,
    workingTab: state.Organization.workingTab,
    specificedTab: state.AppReducer.specificedTab,
    user: state.Organization.user,
    confirmType: state.AppReducer.confirmType,
    organizationInfomation: state.Organization.organizationInfomation,
    nations: state.AppReducer.nations,
    workingEditTab: state.Organization.workingEditTab,
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
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateWorkingEditTab: (tab: WorkingEditTab) => {
      dispatch(OrganizationReduxAction.StoreUpdateWorkingEditTab(tab));
    },
  };
};

const EditUserContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(EditUser)
);

export default EditUserContainer;
