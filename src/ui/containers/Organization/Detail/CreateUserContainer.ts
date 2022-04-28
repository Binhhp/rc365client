import { appReducers } from "src/ui/reducers";
import { compose } from "redux";
import { connect } from "react-redux";
import CreateNewUser from "src/ui/components/Organization/Detail/DetailPanel/Users/Create";
import { IOrganizationManager } from "src/services/interface";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { BaseUser } from "src/common/classes/BaseUser";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { userReducer } = state;
  return {
    organizationInfo: userReducer,
    workingUsers: state.Organization.workingUsers,
    organizationInfomation: state.Organization.organizationInfomation,
    isWorking: state.AppReducer.isWorking,
    isConfirmCreate: state.AppReducer.isConfirmCreate,
    isSearchInPanel: state.AppReducer.isSearchInPanel,
    confirmType: state.AppReducer.confirmType,
    theme: state.settingsReducer.theme,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    signalRData: state.Organization.signalRData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager: IOrganizationManager = OrganizationManager.Instance;
  return {
    OnGetLazySeachingItems: async (lazyUrl: string): Promise<any[]> => {
      let items = await _organizationManager.GetLazySearchingItems(lazyUrl);
      return items;
    },
    // OnSearchUserByText:async (id:string,endpoint:string)=>{
    //   let users = await _organizationManager.SearchingUsersByName(id,endpoint);
    // },
    OnUpdateWorkingUsers: async (users: BaseUser[]): Promise<void> => {
      dispatch(OrganizationReduxAction.StoreUpdateWorkingCreateUsers(users));
    },
    OnUpdateIsConfirmCreate: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmCreateAct(val));
    },
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateIsSearchInPanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateIsSearchInPanelAct(val));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
  };
};

const CreateUserContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(CreateNewUser)
);

export default CreateUserContainer;
