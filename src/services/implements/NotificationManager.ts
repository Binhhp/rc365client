import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { NotificationRepository } from "src/repositories/implements/notificationRepository";
import { INotificationRepository } from "src/repositories/interface";
import { INotificationManager } from "../interface";

export class NotificationManager implements INotificationManager {
  private static _instance: NotificationManager;
  private _notifications: NotificationItem[];
  private _loadingNotification: boolean;
  private _notificationRepositories: INotificationRepository;

  constructor() {
    this._notifications = [];
    this._loadingNotification = false;
    this._notificationRepositories = new NotificationRepository();
  }

  public static get Instance(): NotificationManager {
    if (!this._instance) {
      this._instance = new NotificationManager();
    }
    return this._instance;
  }

  public get Notifications(): NotificationItem[] {
    return this._notifications;
  }

  LoadNotificationFirstTime = async (): Promise<any> => {
    this._notificationRepositories.GetNotificationItemsFS().then((response) => {
      if (response) {
        return (this._notifications = response);
      }
    });
    return;
  };
}
