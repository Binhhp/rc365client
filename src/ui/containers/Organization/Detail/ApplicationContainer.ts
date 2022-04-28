import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { BaseApplication } from "src/common/classes/BaseApplication";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import Application from "src/ui/components/Organization/Detail/DetailPanel/Application";
import { appReducers } from "src/ui/reducers";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isApplicationInfomationLoading:
      state.AppReducer.isApplicationInfomationLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateApplicationInfomationTS: (application: BaseApplication) => {
      dispatch(OrganizationReduxAction.StoreUpdateApplication(application));
    }
  }
}
const ApplicationContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Application)
);

export default ApplicationContainer;
