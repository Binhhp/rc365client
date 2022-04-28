import { NotificationItem } from "src/common/classes/BaseNotificationItem";

export interface INotificationRepository {
  GetNotificationItemsFS: (val?: string) => Promise<NotificationItem[]>;
}
