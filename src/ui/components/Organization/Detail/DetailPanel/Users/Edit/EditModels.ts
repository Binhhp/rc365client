import { TypeConfirm, ThemeEnums } from "src/entity/enums";
import { BaseUser } from "src/common/classes/BaseUser";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";

export interface EditUserProps {
  theme?: ThemeEnums;
  ref?: any;
  isUserInfomationLoading?: boolean;
  specificedTab?: string | null;
  isWorking?: boolean;
  user?: BaseUser;
  typeConfirm?: TypeConfirm;
  organizationInfomation?: BaseOrganization;
  workingEditTab?: WorkingEditTab;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  OnReloadOrganization: (isReload: boolean) => void;
  OnClearCidAndWorkflowId: () => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdateWorkingEditTab?: (tab: WorkingEditTab) => void;
}
export interface EditUserState {
  user: BaseUser;
  cId: string;
  workflowId: string;
  loading?: boolean;
  userId?: string;
}
