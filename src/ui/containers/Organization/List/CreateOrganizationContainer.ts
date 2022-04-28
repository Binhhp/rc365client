import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Create from "src/ui/components/Organization/List/Create";
import { ICreateOrganizationProps } from "src/ui/components/Organization/List/Create/CreateModels";
import { TypeConfirm } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    theme: settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    organizationList: state.Organization.organizationList,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: ICreateOrganizationProps
) => {
  return {
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
  };
};

const CreateContainer = connect(mapStateToProps, mapDispatchToProps)(Create);

export default CreateContainer;
