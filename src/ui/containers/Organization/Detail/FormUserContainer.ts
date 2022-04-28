import { appReducers } from "src/ui/reducers";
import { compose } from "redux";
import { connect } from "react-redux";
import Form from "src/ui/components/Organization/Detail/DetailPanel/Users/Form";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    confirmType: state.AppReducer.confirmType,
    isWorking: state.AppReducer.isWorking,
    isConfirmCreate: state.AppReducer.isConfirmCreate,
    nations: state.AppReducer.nations,
    domainOptions: state.Organization.domainOptions,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateIsConfirm: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmCreateAct(val));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
  };
};

const FormUserContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Form)
);

export default FormUserContainer;
