import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { ThemeEnums } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";

export interface IGroupTabProps {
  theme?: ThemeEnums;
  resource?: BaseResource;
  org?: BaseOrganization;
  workingEditItems?: BaseGroup[];
  isSearchInPanel?: boolean;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR?: boolean;
  OnHandleUpdateSearchInPanel?: (val: boolean) => void;
  OnHandleLeaveGroup?: (
    orgId: string,
    rsId: string,
    groups: BaseGroup[]
  ) => Promise<any>;
  OnHandleAddResourceToGroup?: (
    orgId: string,
    rsId: string,
    groups: BaseGroup[]
  ) => Promise<ConversationIdResponse>;
}
export interface IGroupTabStates {
  cId: string;
  workflowId: string;
  isSearch: boolean;
  searchText: string;
  typingTimeout: number;
  isSearching: boolean;
  selectedItems: BaseGroup[];
  sourceItems: BaseGroup[];
  removeItems: BaseGroup[];
  prevItems: BaseGroup[];
  isConfirm: boolean;
  visibleText: string;
}
