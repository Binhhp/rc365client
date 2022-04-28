import { NotificationItem } from "src/common/classes/BaseNotificationItem";

export interface NotificationItemProps {
  key: string | number;
  notification: NotificationItem;
  darkMode?: string;
  onRemoveNotificationItem?: (id: string) => void;
  index: number;
}
