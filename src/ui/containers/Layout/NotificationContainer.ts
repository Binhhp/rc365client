import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Notifications from "src/ui/components/Layout/Menu/MenuPanel/Notifications/Content";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import { NotificationManager } from "src/services/implements/NotificationManager";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    isLoading: state.NotificationsReducer.isLoading,
    notifications: state.NotificationsReducer.notifications,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    isHaveMessageSyncSignalR: state.AppReducer.isHaveMessageSyncSignalR,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnGetNotificationItems: async () => {
      await dispatch(
        NotificationReduxActionTS.OnChangeLoadingNotification(true)
      );
      let _notificationManager = new NotificationManager();
      await _notificationManager.LoadNotificationFirstTime().then((res) => {
        dispatch(NotificationReduxActionTS.OnSaveNotificationsTS());
        dispatch(NotificationReduxActionTS.OnChangeLoadingNotification(false));
      });
    },
    OnRemoveNotificationItems: async (id?: string) => {
      if (!id) {
        dispatch(NotificationReduxActionTS.onRemoveAllNotificationTS());
      } else {
        dispatch(NotificationReduxActionTS.onRemoveNotificationItemTS(id));
      }
    },
  };
};

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default NotificationContainer;
