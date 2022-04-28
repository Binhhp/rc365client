import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Create from "src/ui/components/Tenant/Create/Content";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnHandleUpdateBreadCrumb: (nodes: INodes[]) => {
      dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
    },
    OnResetApplicationStore: () => {
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
    },
  };
};

const TenantCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);

export default TenantCreateContainer;
