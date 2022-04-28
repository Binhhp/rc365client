import EditDomain from "src/ui/components/Organization/Detail/DetailPanel/Domains/Edit";
import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    isWorking: state.AppReducer.isWorking,
    theme: state.settingsReducer.theme,
    org: state.Organization.organizationInfomation,
    domain: state.Organization.domain,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const EditDomainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDomain);

export default EditDomainContainer;
