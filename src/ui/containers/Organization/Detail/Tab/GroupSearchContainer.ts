import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import Search from "src/ui/components/Organization/Detail/DetailPanel/Groups/Tabs/Search";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    workingTab: state.Organization.workingTab,
    orgInfo: state.Organization.organizationInfomation,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRData: state.Organization.signalRData,
    group: state.Organization.group,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateSignalRActionType: () => {
      console.log("OnUpdateSignalRActionType");
    },
  };
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
