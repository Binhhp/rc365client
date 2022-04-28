import { compose } from "redux";
import { connect } from "react-redux";
import CreateNewGroup from "src/ui/components/Organization/Detail/DetailPanel/Groups/Create";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { appReducers } from "src/ui/reducers";
import { TypeConfirm } from "src/entity/enums";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    workingGroups: state.Organization.workingGroups,
    confirmType: state.AppReducer.confirmType,
    isWorking: state.AppReducer.isWorking,
    organizationInfomation: state.Organization.organizationInfomation,
    isSearchInPanel: state.AppReducer.isSearchInPanel,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateWorkingGroups: async (groups: BaseGroup[]): Promise<void> => {
      dispatch(OrganizationReduxAction.StoreUpdateWorkingGroups(groups));
    },
    OnUpdateIsSearchInPanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateIsSearchInPanelAct(val));
    },
  };
};

const CreateGroupContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(CreateNewGroup)
);

export default CreateGroupContainer;
