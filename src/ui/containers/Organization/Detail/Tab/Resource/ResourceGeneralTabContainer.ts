import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import GeneralTab from "src/ui/components/Organization/Detail/DetailPanel/Resources/Tabs/General";
import { BaseResource } from "src/common/classes/BaseResource";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { compose } from "redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    resource: state.Organization.resource,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnHandleUpdateResource: (resource: BaseResource) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditResource(resource));
    },
  };
};

const GeneralTabContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(GeneralTab)
);

export default GeneralTabContainer;
