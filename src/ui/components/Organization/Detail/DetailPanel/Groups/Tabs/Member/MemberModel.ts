import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums, TypeConfirm, TypePage, TypePanel } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";

export interface IMemberProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  confirmType?: TypeConfirm;
  workingTab?: TypePage;
  isEdtGroupLoading?: boolean;
  organizationInfomation?: BaseOrganization;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR?: boolean;
  isPanelPageOpen?: boolean;
  group?: BaseGroup;
  isReload: boolean;
  OnReloadOrganization: (isReload: boolean) => void;
  OnClearCidAndWorkflowId: () => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdatePanelVisible?: (val: boolean, type: TypePanel) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnRemoveUserInGroup?: (
    items: string[],
    id: string,
    groupId: string
  ) => Promise<ConversationIdResponse>;
  OnRemoveGroupInGroup?: (
    items: string[],
    id: string,
    groupId: string
  ) => Promise<ConversationIdResponse>;
  OnRemoveResourceInGroup?: (
    items: string[],
    id: string,
    groupId: string
  ) => Promise<ConversationIdResponse>;
}
export interface IMemberStates {
  selectedMembers: any[];
  isSearch: boolean;
  cId: string;
  workflowId: string;
  isConfirm: boolean;
  loading: boolean;
  loadingQuery: boolean;
}
