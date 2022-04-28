import { GetNotificationTypes, NotificationSignalRGet } from "../model/NotificationActionModel";
import { ActionNotificationTypeKeys } from "../enums";
import { NotificationManager } from "src/services/implements/NotificationManager";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";
//  TS : to store
// FS: from server

export class NotificationReduxActionTS {

  public static UpdateLoadingNotify = (isLoading: boolean = false) => {
    return {
      type: ActionNotificationTypeKeys.LOADING_WORKFLOW,
      payload: isLoading,
    };
  };

  public static OnSaveNotificationsTS = (): GetNotificationTypes => {
    let _notificationManager = NotificationManager.Instance.Notifications;
    return {
      type: ActionNotificationTypeKeys.GET_NOTIFICATONS,
      payload: _notificationManager,
    };
  };

  public static OnChangeLoadingNotification = (isLoading: boolean) => {
    return {
      type: ActionNotificationTypeKeys.CHANGE_NOTIFICATION_LOADING_STATUS,
      payload: isLoading,
    };
  };

  public static onRemoveAllNotificationTS = () => {
    return {
      type: ActionNotificationTypeKeys.REMOVE_ALL_NOTIFICATION_ITEM,
    };
  };

  public static onRemoveNotificationItemTS = (
    id: string
  ): GetNotificationTypes => {
    return {
      type: ActionNotificationTypeKeys.REMOVE_NOTIFICATION_ITEM,
      payload: id,
    };
  };

  public static onAddNotificationItemTS = (
    item: NotificationItem, 
    conversationId: string, 
    workflowId: string, 
    status: string, 
    code: number, 
    message?: string) => {
    return {
      type: ActionNotificationTypeKeys.ADD_A_NOTIFICATION_ITEM,
      payload: {
        item,
        conversationId,
        workflowId,
        status,
        code,
        message
      } as NotificationSignalRGet,
    };
  };

  public static onUpdateNotificationListTS = (
    notifications: NotificationItem[]
  ): GetNotificationTypes => {
    return {
      type: ActionNotificationTypeKeys.UPDATE_NOTIFICATION_LIST,
      payload: notifications,
    };
  };

  public static onUpdateSignalRGetData = (
    data: string | string[]
  ): GetNotificationTypes => {
    return {
      type: ActionNotificationTypeKeys.SIGNALR_GETDATA,
      payload: data,
    };
  };
}
