import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";

export interface IEditGroupProps {
  organizationInfomation?: BaseOrganization;
  theme?: ThemeEnums;
  group?: BaseGroup;
  workingEditTab?: WorkingEditTab;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  OnReloadOrganization: (isReload: boolean) => void;
  OnClearCidAndWorkflowId: () => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdateWorkingEditTab?: (tab: WorkingEditTab) => void;
  ref?: any;
}
export interface IEditGroupState {
  group: BaseGroup;
  cId: string;
  workflowId: string;
  loading?: boolean;
  groupId?: string;
}
