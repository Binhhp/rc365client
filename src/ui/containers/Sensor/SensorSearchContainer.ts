import { appReducers } from "src/ui/reducers";
import { compose } from "redux";
import { connect } from "react-redux";
import Search from "src/ui/components/Sensor/Search";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRData: state.Organization.signalRData,
    isSearchInPanel: state.AppReducer.isSearchInPanel,
    orgInfo: state.Organization.organizationInfomation,
    orgId: state.Sensor.workingOrg,
  };
};

const SearchGroupContainer = compose(
  connect(mapStateToProps, null, null, {
    forwardRef: true,
  })(Search)
);

export default SearchGroupContainer;
