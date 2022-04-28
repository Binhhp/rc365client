import { connect } from "react-redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import { SettingReduxActionTS } from "src/ui/actions/implements/SettingsAct";
import { appReducers } from "src/ui/reducers";
import Layout from "src/ui/components/Layout/Menu/Layout";
import { LayoutProps } from "src/ui/components/Layout/Menu/Layout/LayoutModels";
import { ThemeEnums } from "src/entity/enums";
import { NotificationManager } from "src/services/implements/NotificationManager";
import { AppSettingManager } from "src/services/implements/AppSettingManager";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { NotificationsReducer, settingsReducer } = state;
  return {
    isLoadingNotify: NotificationsReducer.isLoadingWorkflow,
    loading: NotificationsReducer.isLoading,
    notifications: NotificationsReducer.notifications,
    theme: settingsReducer.theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: LayoutProps) => {
  let _organizationManager = OrganizationManager.Instance;
  return {
    OnHandleChangeTheme: async (checked: boolean) => {
      let theme = checked ? ThemeEnums.Dark : ThemeEnums.Light;
      let _appSettingManager = new AppSettingManager();
      await _appSettingManager.UpdateApplicationTheme(theme).then((res) => {
        if (res) {
          dispatch(SettingReduxActionTS.onSetThemeTS(res));
        }
      });
    },
    OnGetTimeZones: async () => {
      await _organizationManager.GetTimeZoneList().then(() => {
        dispatch(
          SettingReduxActionTS.onUpdateTimeZoneTS(
            _organizationManager.timeZones
          )
        );
      });
    },
    OnGetNotificationItems: async (type?: boolean) => {
      await dispatch(
        NotificationReduxActionTS.OnChangeLoadingNotification(true)
      );
      let _notificationManager = new NotificationManager();
      await _notificationManager.LoadNotificationFirstTime().then((res) => {
        dispatch(NotificationReduxActionTS.OnSaveNotificationsTS());
        dispatch(NotificationReduxActionTS.OnChangeLoadingNotification(false));
      });
    },
    OnUpdateNotificationsList: (items: NotificationItem[]) => {
      dispatch(NotificationReduxActionTS.onUpdateNotificationListTS(items));
    },
  };
};

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default LayoutContainer;
