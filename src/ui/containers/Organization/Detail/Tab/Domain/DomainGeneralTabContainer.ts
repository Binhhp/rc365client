import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import GeneralTab from "src/ui/components/Organization/Detail/DetailPanel/Domains/Tabs/General";
import { TypeConfirm } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    domain: state.Organization.domain,
    isWorking: state.AppReducer.isWorking,
    confirmType: state.AppReducer.confirmType,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    onUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    onUpdateEditDomain: (domain: BaseDomain) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditDomain(domain));
    },
  };
};

const GeneralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralTab);

export default GeneralContainer;
