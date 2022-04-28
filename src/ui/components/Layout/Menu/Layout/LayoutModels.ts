import { IIconProps } from "aod-dependencies/@uifabric/icons";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { ThemeEnums } from "src/entity/enums";

export interface LayoutProps {
  isLoadingNotify?: boolean;
  content: ContentHeader;
  onSaveNotificationsTS?: (notifications: NotificationItem[]) => void;
  onRemoveNotificationItemTS?: (id: string) => void;
  onStartGetNotificationsFS?: () => void;
  onEndGetNotificationsFS?: () => void;
  onRemoveAllNotificationTS?: () => void;
  OnGetTimeZones?: () => void;
  OnHandleChangeTheme?: (checked: boolean) => void;
  OnGetNotificationItems?: (type?: boolean) => void;
  notifications?: NotificationItem[];
  loading?: boolean;
  theme?: ThemeEnums;
  OnUpdateNotificationsList?: (items: NotificationItem[]) => void;
}

export interface ContentHeader {
  title: string;
  name: string;
  titleLink: string;
}

export interface LayoutState {
  isPanelOpen: boolean;
  targetButton?: TargetButtonEx;
  isCollapsedLeftBar: boolean;
}

export interface TargetButtonEx {
  key: string;
  text?: string;
  iconProps?: IIconProps;
}
