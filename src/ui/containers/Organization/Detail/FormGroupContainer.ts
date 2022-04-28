import { compose } from "redux";
import { connect } from "react-redux";
import Form from "src/ui/components/Organization/Detail/DetailPanel/Groups/Form";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { appReducers } from "src/ui/reducers";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    isWorking: state.AppReducer.isWorking,
    theme: state.settingsReducer.theme,
    confirmType: state.AppReducer.confirmType,
    // workingGroups: state.Organization.workingGroups,
    organizationInfomation: state.Organization.organizationInfomation,
    domainOptions: state.Organization.domainOptions,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateWorkingGroup: (groups: BaseGroup[]) => {
      dispatch(OrganizationReduxAction.StoreUpdateWorkingGroups(groups));
    },
  };
};

const FormGroup = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Form)
);

export default FormGroup;
