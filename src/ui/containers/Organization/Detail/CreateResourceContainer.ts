import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import { compose } from "redux";
import CreateResource from "src/ui/components/Organization/Detail/DetailPanel/Resources/Create";
import { TypeConfirm } from "src/entity/enums";
import { BaseResource } from "src/common/classes/BaseResource";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    workingResources: state.Organization.workingResources,
    organizationInfomation: state.Organization.organizationInfomation,
    isWorking: state.AppReducer.isWorking,
    isConfirmCreate: state.AppReducer.isConfirmCreate,
    isSearchInPanel: state.AppReducer.isSearchInPanel,
    confirmType: state.AppReducer.confirmType,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    signalRData: state.Organization.signalRData,
    organizationInfo: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateWorkingResource: async (
      resources: BaseResource[]
    ): Promise<void> => {
      dispatch(
        OrganizationReduxAction.StoreUpdateWorkingCreateResources(resources)
      );
    },
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateIsConfirmCreate: async (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmCreateAct(val));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateIsSearchInPanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateIsSearchInPanelAct(val));
    },
  };
};

const CreateResourceContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(CreateResource)
);

export default CreateResourceContainer;
