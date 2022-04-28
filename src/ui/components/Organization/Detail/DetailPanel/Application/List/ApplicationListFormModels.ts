import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ThemeEnums, TypeSynchronize } from "src/entity/enums";
import { UserStoreModel } from "src/entity/model/UserStoreModel";
import {
  ConversationIdResponse,
  OrgSyncUserResourceItem,
} from "src/repositories/response";

export interface IApplicationListProps {
  theme?: ThemeEnums;
  userInfo?: UserStoreModel;
  OnGetSynchronizeInfomationList?: (
    id: string
  ) => Promise<OrgSyncUserResourceItem[]>;
  OnSyncAllUsers?: (id: string) => Promise<ConversationIdResponse>;
  OnStopSyncAllUsers?: (id: string) => Promise<ConversationIdResponse>;
  OnSyncSelectedItems?: (
    id: string,
    selectedItems: any[]
  ) => Promise<ConversationIdResponse>;
  OnStopSyncSelectedItems?: (
    id: string,
    selectedItems: any[]
  ) => Promise<ConversationIdResponse>;
  OnUpdateWorkingAppItems?: (Items: OrgSyncUserResourceItem[]) => void;
  OnClearCidAndWorkflowId: () => void;
  workingAppItems?: any[];
  org?: BaseOrganization;
  isLoadingNotify?: boolean;
  isHaveMessageSyncSignalR?: boolean;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
}

export interface IApplicationListState {
  selectedItemSync: any[];
  syncList: any[];
  loading: boolean;
  successLoadingSync: boolean;
  typeSync: TypeSynchronize;
  conversationId: string;
  workflowId: string;
}
