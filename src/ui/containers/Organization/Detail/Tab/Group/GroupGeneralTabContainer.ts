import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import GeneralTab from "src/ui/components/Organization/Detail/DetailPanel/Groups/Tabs/General";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    workingGroups: state.Organization.workingGroups,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateGroup: (group: BaseGroup) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditGroup(group));
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

const GeneralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralTab);

export default GeneralContainer;
