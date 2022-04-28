import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums, TypeConfirm, TypePage, TypePanel } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";

export interface IMemberOfProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  confirmType?: TypeConfirm;
  workingTab?: TypePage;
  isHaveMessageSignalR?: boolean;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  orgInfo?: BaseOrganization;
  group?: BaseGroup;
  OnClearCidAndWorkflowId: () => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdatePanelVisible?: (val: boolean, type: TypePanel) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnLeaveGroup?: (
    orgId: string,
    grId: string,
    groups: BaseGroup[]
  ) => Promise<ConversationIdResponse>;
  OnHandleAddGroupToGroups?: (
    orgId: string,
    grId: string,
    groups: BaseGroup[]
  ) => Promise<ConversationIdResponse>;
}
export interface IMemberOfStates {
  isConfirm: boolean;
  isSearch: boolean;
  visibleText: string;
  searchText: string;
  typingTimeout: number;
  isSearching: boolean;
  selectedItems: BaseGroup[];
  sourceItems: BaseGroup[];
  cId: string;
  workflowId: string;
  skipNumber: number;
  loading: boolean;
  loadingQuery: boolean;
}

