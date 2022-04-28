import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ThemeEnums } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response";

export interface SyncTabProps {
  theme?: ThemeEnums;
  group?: BaseGroup;
  orgInfo?: BaseOrganization;
  isLoadingNotify: boolean;
  OnSetCIdAndWorkflowId?: (id: string, workflowId: string) => void;
  OnStartSynchGroup?: (
    id: string,
    group: BaseGroup
  ) => Promise<ConversationIdResponse>;
  OnStopSynchGroup?: (
    id: string,
    group: BaseGroup
  ) => Promise<ConversationIdResponse>;
}
