import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import OrderTab from "src/ui/components/Organization/Detail/DetailPanel/Resources/Tabs/Order";
import { BaseResource } from "src/common/classes/BaseResource";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
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

const OrderTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTab);

export default OrderTabContainer;
