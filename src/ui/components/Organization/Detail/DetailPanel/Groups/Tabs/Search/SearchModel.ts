import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums, TypePage, TypePanel } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";

export interface ISearchProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  workingTab?: TypePage;
  isHaveMessageSignalR?: boolean;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  signalRData?: any;
  orgInfo?: BaseOrganization;
  group?: BaseGroup;
  onReloadList?: (val: boolean) => void;
  onHandleCidAndWorkflowId: (cid: string, workflowId: string) => void;
  onHandleConversationId: (cid: string) => void;
  OnUpdatePanelVisible?: (val: boolean, type: TypePanel) => void;
  UpdateSearchVisible?: () => void;
  OnUpdateSignalRActionType?: () => void;
  OnAddUserToGroup?: (
    items: string[],
    id: string,
    groupId: string
  ) => Promise<ConversationIdResponse>;
  OnAddGroupToGroup?: (
    items: string[],
    id: string,
    groupId: string
  ) => Promise<ConversationIdResponse>;
  OnAddResourceToGroup?: (
    items: string[],
    id: string,
    groupId: string
  ) => Promise<ConversationIdResponse>;
}
export interface ISearchStates {
  selectedMembers: any[];
  type: TypePage;
  visibleText: string;
  text: string;
  typingTimeout: number;
  isLoading: boolean;
  conversationId: string;
  workflowId: string;
  users: BaseUser[];
  groups: BaseGroup[];
  resources: BaseResource[];
}
