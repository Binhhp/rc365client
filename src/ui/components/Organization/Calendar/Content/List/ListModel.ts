import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { BaseCalendar } from "src/common/classes/BaseCalendar";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums, TypeConfirm, TypePage, TypePanel } from "src/entity/enums";
import { UpdateGroupResponse } from "src/repositories/response";
import {
  ConversationIdResponse,
  UnRegisterUserResponse,
} from "src/repositories/response";

export interface ICalendarListProps {
  onGetItemsSelected: (item: any[]) => void;
  theme?: ThemeEnums;
  isWorking?: boolean;
  isConfirmCreate?: boolean;
  workingTab?: TypePage;
  specificedTab?: string | null;
  isOrganizationListLoading?: boolean;
  isPanelPageOpen?: boolean;
  isHaveMessageSignalR?: boolean;
  organizationInfomation?: BaseOrganization;
  ref: any;
  workingOrgItems?: BaseUser[];
  confirmType?: TypeConfirm;
  panelType?: TypePanel;
  user?: BaseUser;
  group?: BaseGroup;
  resource?: BaseResource;
  domain?: BaseDomain;
  notifications?: NotificationItem[];
  isLoadingOrgInfomation?: boolean;
  isOrganizationDetailLoading?: boolean;
  conversationId: string;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  signalRData?: any;
  timeZones?: IDropdownOption[];
  workingAppointment?: BaseAppointment;
  workingCalendar?: BaseCalendar;
  selectedAppointments?: BaseAppointment[];
  OnUpdatePagePanelStatus?: (val: boolean) => void;
  UpdateOrganizationDetailLoadingAct?: (val: boolean) => void;
  OnResetApplicationStore?: () => void;
  OnSelectUserEdit?: (item: any, tab: TypePage) => void;
  OnUpdateWorkingOrgItems?: (items: any[]) => void;
  OnHandleUnregisterUser?: (
    orgId: string,
    Userid: string
  ) => Promise<UnRegisterUserResponse>;
  OnHandleUnregisterGroup?: (
    id: string,
    group: string
  ) => Promise<ConversationIdResponse>;
  OnHandleUnregisterResource?: (
    id: string,
    group: string
  ) => Promise<ConversationIdResponse>;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnHandleUpdateNotifications?: (notifications: NotificationItem[]) => void;
  OnHandleUpdateGroup?: (
    id: string,
    group: BaseGroup
  ) => Promise<UpdateGroupResponse>;
  OnHandleUpdateUser?: (
    id: string,
    group: BaseUser
  ) => Promise<ConversationIdResponse>;
  OnHandleUpdateResource?: (
    id: string,
    resource: BaseResource,
    timeZones?: IDropdownOption[]
  ) => Promise<ConversationIdResponse>;
  OnHandleUpdateDomain?: (
    id: string,
    domain: BaseDomain
  ) => Promise<ConversationIdResponse>;
  OnHandleUnregisterDomain?: (
    id: string,
    domain: BaseDomain
  ) => Promise<ConversationIdResponse>;
  OnUpdateWorkingAppointment?: (
    item: any,
    timeZones: IDropdownOption[]
  ) => void;
  OnUpdateSelectedAppointments?: (item: any[]) => void;
  OnEditAppointment?: (
    id: string,
    item: BaseAppointment,
    timeZones: IDropdownOption[]
  ) => void;
  OnDeleteAppointment?: (id: string, item: BaseAppointment) => void;
}

export interface ICalendarListState {
  item: any;
  cId: string;
  workflowId: string;
}
