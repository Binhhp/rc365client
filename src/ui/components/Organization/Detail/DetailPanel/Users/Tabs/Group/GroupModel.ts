import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";

export interface GroupTabProps {
  theme?: ThemeEnums;
  width?: number;
  onAddMoreAct: () => void;
  orgInfo?: BaseOrganization;
  user?: BaseUser;
  OnAddUserToGroups?: (
    orgId: string,
    usId: string,
    groups: BaseGroup[]
  ) => Promise<ConversationIdResponse>;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR?: boolean;
  OnRemoveUserFromGroups?: (
    orgId: string,
    grId: string,
    groupIds: BaseGroup[]
  ) => Promise<ConversationIdResponse>;
  OnClearCidAndWorkflowId: () => void;
}

export interface GroupTabState {
  selectedItems: BaseGroup[];
  isSearch: boolean;
  isLoading: boolean;
  typingTimeout: number;
  skipNumber: number;
  searchingText: string;
  isSearchApi: boolean;
  cId: string;
  workflowId: string;
  isConfirm: boolean;
  typeConfirm: string;
  visibleText: string;
}
