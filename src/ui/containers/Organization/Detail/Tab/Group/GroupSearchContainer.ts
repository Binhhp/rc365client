import { appReducers } from "src/ui/reducers";
import { compose } from "redux";
import { connect } from "react-redux";
import Search from "src/ui/components/Organization/Detail/DetailPanel/Groups/Create/Search/SearchItem";

const mapStateToProps = (state: appReducers) => {
  return {
    signalRConversationId: state.AppReducer.signalRConversationId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRData: state.Organization.signalRData,
    isSearchInPanel: state.AppReducer.isSearchInPanel,
  };
};

const SearchGroupContainer = compose(
  connect(mapStateToProps, null, null, {
    forwardRef: true,
  })(Search)
);

export default SearchGroupContainer;
