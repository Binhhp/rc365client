import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums, TypeConfirm, TypePage, TypePanel } from "src/entity/enums";
import { UnRegisterUserResponse } from "src/repositories/response";

export interface ITenantListProps {
  onGetItemsSelected?: (item: any[]) => void;
  theme?: ThemeEnums;
  isWorking?: boolean;
  isConfirmCreate?: boolean;
  workingTab?: TypePage;
  specificedTab?: string | null;
  isOrganizationListLoading?: boolean;
  isPanelPageOpen?: boolean;
  isHaveMessageSignalR?: boolean;
  organizationInfomation?: BaseOrganization;
  ref?: any;
  workingOrgItem?: BaseUser[];
  confirmType?: TypeConfirm;
  panelType?: TypePanel;
  user?: BaseUser;
  group?: BaseGroup;
  resource?: BaseResource;
  domain?: BaseDomain;
  notifications?: NotificationItem[];
  isLoadingOrgInfomation?: boolean;
  isOrgDetailLoading?: boolean;
  isOrganizationDetailLoading?: boolean;
  conversationId?: string;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  signalRData?: any;
  selectedTenants?: BaseTenant[];
  workingTenant?: BaseTenant;
  tenantWId?: string;
  tenantCId?: string;
  workflowId?: string;
  OnClearCidAndWorkflowId: () => void;
  OnUpdatePagePanelStatus?: (val: boolean) => void;
  UpdateOrganizationDetailLoadingAct?: (val: boolean) => void;
  OnResetApplicationStore?: () => void;
  OnSelectUserEdit?: (item: any, tab: TypePage) => void;
  OnUpdateWorkingOrgItems?: (items: any[]) => void;
  OnHandleUnregister?: (
    orgId: string,
    Userid: string
  ) => Promise<UnRegisterUserResponse>;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnHandleUpdateNotifications?: (notifications: NotificationItem[]) => void;
  OnSelectTenants?: (items: any[]) => void;
  OnUpdateWorkingTenant?: (item: any) => void;
  OnResetSignalRInfomations?: () => void;
  OnGetNumberTenants?: (items: any[], numbers: number) => void;
}

export interface ITenantListState {
  item: any;
  cId: string;
  workflowId: string;
  isRedirect: boolean;
  isLoading: boolean;
}
