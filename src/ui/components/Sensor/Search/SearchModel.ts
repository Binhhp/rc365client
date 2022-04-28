import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";
import {
  ThemeEnums,
  TypePage,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";

export interface ISearchProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isHaveMessageSignalR?: boolean;
  signalRConversationId?: string;
  signalRData?: any;
  orgInfo?: BaseOrganization;
  group?: BaseGroup;
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
  OnGetSelectedItems: (items: any[]) => void;
  errorMsg?: string;
  typeSearch: string;
  orgId?: string;
  signalRWorkflowId?: string;
  isRequired?: boolean;
}
export interface ISearchStates {
  selectedItems: any[];
  type: TypePage;
  text: string;
  typingTimeout: number;
  isLoading: boolean;
  conversationId: string;
  errorMsg: string;
  workflowId: string;
  visibleText: string;
}
