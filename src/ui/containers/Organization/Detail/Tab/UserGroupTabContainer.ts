import { appReducers } from "src/ui/reducers";
import { compose } from "redux";
import { connect } from "react-redux";
import GroupTab from "src/ui/components/Organization/Detail/DetailPanel/Users/Tabs/Group";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { BaseUser } from "src/common/classes/BaseUser";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    user: state.Organization.user,
    confirmType: state.AppReducer.confirmType,
    isWorking: state.AppReducer.isWorking,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateIsConfirm: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmCreateAct(val));
    },
    OnUpdateUser: (user: BaseUser) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditUser(user));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdatePanelVisible: (val: boolean, type: TypePanel) => {
      dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(type));
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      dispatch(OrganizationReduxAction.StoreResetWorkingData());
    },
  };
};

const GroupTabContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(GroupTab)
);

export default GroupTabContainer;
