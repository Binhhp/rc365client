import { ThemeEnums } from "src/entity/enums";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";

export interface INotificationProps {
  theme?: ThemeEnums;
  isLoading: boolean;
  isHaveMessageSyncSignalR?: boolean;
  isHaveMessageSignalR?: boolean;
  notifications: NotificationItem[];
  OnGetNotificationItems?: () => void;
  OnRemoveNotificationItems?: (id?: string) => void;
}

export interface INotificationState {
  notifications: NotificationItem[];
}
