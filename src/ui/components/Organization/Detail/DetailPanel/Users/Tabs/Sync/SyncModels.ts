import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums } from "src/entity/enums";
import {
  ConversationIdResponse,
} from "src/repositories/response";

export interface SyncTabProps {
  theme?: ThemeEnums;
  user?: BaseUser;
  orgInfo?: BaseOrganization;
  isLoadingNotify: boolean;
  OnSetCIdAndWorkflowId?: (id: string, workflowId: string) => void;
  OnStartSynchUser?: (
    id: string,
    user: BaseUser
  ) => Promise<ConversationIdResponse>;
  OnStopSynchUser?: (
    id: string,
    user: BaseUser
  ) => Promise<ConversationIdResponse>;
}