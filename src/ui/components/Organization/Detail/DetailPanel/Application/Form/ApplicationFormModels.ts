import { BaseApplication } from "src/common/classes/BaseApplication";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ErrorFieldItem } from "src/common/functions/FieldValidate";
import { ThemeEnums } from "src/entity/enums";
import { UserStoreModel } from "src/entity/model/UserStoreModel";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";

export interface IApplicationFormProps {
  theme?: ThemeEnums;
  applicationInfo?: BaseApplication | null;
  user?: UserStoreModel;
  application?: BaseApplication;
  OnResetSignalRData?: () => void;
  OnUpdateApplicationInfomation?: (
    id: string,
    application: BaseApplication
  ) => Promise<ConversationIdResponse>;
  OnGetApplicationInfomation?: (id: string) => Promise<ConversationIdResponse>;
  OnUpdateApplicationTabLoading?: (val: boolean) => void;
  OnUpdateApplicationInfomationTS?: (application: BaseApplication) => void;
  organizationInfomation?: BaseOrganization;
  isLoading?: boolean;
  isHaveMessageSyncSignalR?: boolean;
  signalRSyncConversationId?: string;
  signalRSyncWorkflowId?: string;
  signalRData?: any;
}

export interface IApplicationFormState {
  application: BaseApplication;
  conversationId: string;
  workflowId: string;
  errors: ErrorFieldItem[];
  chars: string;
}
