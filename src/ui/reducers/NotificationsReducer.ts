import { GetNotificationTypes, NotificationSignalRGet } from "src/ui/actions/model/NotificationActionModel";
import { ActionNotificationTypeKeys } from "../actions/enums";
import { NotificationStoreModel } from "src/entity/model/NotificationStoreModel";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";

const OnHandleGetNewNotifications = (
  state: NotificationStoreModel,
  items: NotificationItem[]
): NotificationStoreModel => {
  let copyState = state.Clone() as NotificationStoreModel;
  let crtNotifications = [...copyState.notifications, ...items];
  copyState.notifications = crtNotifications;
  return copyState;
};
const OnHandleRemoveNotification = (
  state: NotificationStoreModel,
  id: string
): NotificationStoreModel => {
  let copyState = state.Clone() as NotificationStoreModel;
  let currentList = copyState.notifications;
  let index = currentList.findIndex((item) => item.id === id);
  if (index !== -1) {
    currentList.splice(index, 1);
    copyState.notifications = currentList;
    return copyState;
  }
  return copyState;
};
const OnHandleResetNotificationList = (state: NotificationStoreModel) => {
  let copyState = state.Clone() as NotificationStoreModel;
  copyState.notifications = [];
  return copyState;
};
const OnHandleAddNotifications = (
  state: NotificationStoreModel,
  notifications: NotificationItem[]
) => {
  let copyState = state.Clone() as NotificationStoreModel;
  copyState.notifications = notifications;
  return copyState;
};
const OnHandleAddNotificationItem = (
  state: NotificationStoreModel,
  payload: NotificationSignalRGet
) => {
  let copyState = state.Clone() as NotificationStoreModel;
  if(copyState.signalRGetData.every(x => x !== payload.conversationId)){
    let result: NotificationItem[] = [...copyState.notifications];
    result.push(payload.item);
    copyState.notifications = result;
  }
  return copyState;
};
const OnHandleChangeLoadingNotification = (
  state: NotificationStoreModel,
  val: boolean
) => {
  let copyState = state.Clone() as NotificationStoreModel;
  copyState.isLoading = val;
  return copyState;
};

const OnHandleLoadingWorkflow = (
  state: NotificationStoreModel,
  val: boolean
) => {
  let copyState = state.Clone() as NotificationStoreModel;
  copyState.isLoadingWorkflow = val;
  return copyState;
};

const OnSetSignalRGetData = (
  state: NotificationStoreModel,
  val: string | string[],
) => {
  let copyState = state.Clone() as NotificationStoreModel;
  if(Array.isArray(val)) {
    copyState.signalRGetData = val;
  }
  else{
    if(copyState.signalRGetData.every(x => x !== val)){
      copyState.signalRGetData.push(val);
    }
    else if(val && val !== "" && copyState.signalRGetData.some(x => x === val)){
      copyState.signalRGetData = [...copyState.signalRGetData].filter(x => x !== val);
    }
  }
  return copyState;
};

const Notification = (
  state: NotificationStoreModel = new NotificationStoreModel(),
  action: GetNotificationTypes
): NotificationStoreModel => {
  switch (action.type) {
    case ActionNotificationTypeKeys.GET_NOTIFICATONS:
      return OnHandleGetNewNotifications(state, action.payload);
    case ActionNotificationTypeKeys.ADD_A_NOTIFICATION_ITEM:
      return OnHandleAddNotificationItem(state, action.payload);
    case ActionNotificationTypeKeys.REMOVE_NOTIFICATION_ITEM:
      return OnHandleRemoveNotification(state, action.payload);
    case ActionNotificationTypeKeys.REMOVE_ALL_NOTIFICATION_ITEM:
      return OnHandleResetNotificationList(state);
    case ActionNotificationTypeKeys.UPDATE_NOTIFICATION_LIST:
      return OnHandleAddNotifications(state, action.payload);
    case ActionNotificationTypeKeys.CHANGE_NOTIFICATION_LOADING_STATUS:
      return OnHandleChangeLoadingNotification(state, action.payload);
    case ActionNotificationTypeKeys.LOADING_WORKFLOW:
      return OnHandleLoadingWorkflow(state, action.payload);
    case ActionNotificationTypeKeys.SIGNALR_GETDATA:
      return OnSetSignalRGetData(state, action.payload);
    default:
      return state;
  }
};

export default Notification;
