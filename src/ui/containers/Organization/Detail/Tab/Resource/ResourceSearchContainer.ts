import { appReducers } from "src/ui/reducers";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";
import Search from "src/ui/components/Organization/Detail/DetailPanel/Resources/Create/Search/SearchItem";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const mapStateToProps = (state: appReducers) => {
  return {
    signalRConversationId: state.AppReducer.signalRConversationId,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    signalRData: state.Organization.signalRData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSetSignalRGetData: (data: string | string[]) => {
      dispatch(NotificationReduxActionTS.onUpdateSignalRGetData(data));
    }
  };
};

const ProfileTabContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(Search)
);

export default ProfileTabContainer;
