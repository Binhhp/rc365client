import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { ActionNotificationTypeKeys } from "../enums";

export interface LoadingStore {
  notifications: boolean;
}

export interface NotificationStore {
  notifications: NotificationItem[];
  loading: LoadingStore;
}

export interface NotificationSignalRGet{
  item: NotificationItem,
  conversationId: string,
  workflowId: string,
  status: string,
  code: number,
  message?: string
}

export interface GetNotificationsAct {
  type: typeof ActionNotificationTypeKeys.GET_NOTIFICATONS;
  payload: NotificationItem[];
}

export interface RemoveAllNotificationsAct {
  type: typeof ActionNotificationTypeKeys.REMOVE_ALL_NOTIFICATION_ITEM;
}

export interface RemoveNotificationItemAct {
  type: typeof ActionNotificationTypeKeys.REMOVE_NOTIFICATION_ITEM;
  payload: string;
}

export interface ChangeLoadingNotificationAct {
  type: ActionNotificationTypeKeys.CHANGE_NOTIFICATION_LOADING_STATUS;
  payload: boolean;
}
export interface UpdateNotificationListAct {
  type: ActionNotificationTypeKeys.UPDATE_NOTIFICATION_LIST;
  payload: NotificationItem[];
}
export interface UpdateAddNotificationItemAct {
  type: ActionNotificationTypeKeys.ADD_A_NOTIFICATION_ITEM;
  payload: NotificationSignalRGet;
}
export interface UpdateLoadingWorkflow {
  type: ActionNotificationTypeKeys.LOADING_WORKFLOW;
  payload: boolean;
}
export interface UpdateSignalRGetData {
  type: ActionNotificationTypeKeys.SIGNALR_GETDATA;
  payload: string | string[];
}

export type GetNotificationTypes =
  | UpdateSignalRGetData
  | UpdateLoadingWorkflow
  | GetNotificationsAct
  | UpdateAddNotificationItemAct
  | UpdateNotificationListAct
  | RemoveNotificationItemAct
  | ChangeLoadingNotificationAct
  | RemoveAllNotificationsAct;
