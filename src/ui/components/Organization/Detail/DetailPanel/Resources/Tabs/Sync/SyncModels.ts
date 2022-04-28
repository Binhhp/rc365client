import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { ThemeEnums } from "src/entity/enums";
import {  ConversationIdResponse } from "src/repositories/response";

export interface SyncTabProps {
  theme?: ThemeEnums;
  resource: BaseResource;
  orgInfo?: BaseOrganization;
  isLoadingNotify?: boolean;
  OnSetCIdAndWorkflowId?: (id: string, workflowId: string) => void;
  OnStartSynchResource?: (
    id: string,
    resource: BaseResource
  ) => Promise<ConversationIdResponse>;
  OnStopSynchResource?: (
    id: string,
    resource: BaseResource
  ) => Promise<ConversationIdResponse>;
}
