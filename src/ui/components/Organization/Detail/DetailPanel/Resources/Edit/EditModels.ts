import {
  TypeConfirm,
  TypeConfirmContent,
  EditResourceTabs,
  ThemeEnums,
} from "src/entity/enums";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";

export interface IEditResourceProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  confirmType?: TypeConfirm;
  typeConfirm?: TypeConfirmContent;
  resource?: BaseResource;
  workingEditTab?: WorkingEditTab;
  organizationInfomation?: BaseOrganization;
  isSearchInPanel?: boolean;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  OnReloadOrganization: (isReload: boolean) => void;
  OnClearCidAndWorkflowId: () => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnResetOrganizationStore?: () => void;
  OnHandleUpdateResource?: (resource: BaseResource) => void;
  OnHandleUpdateDisabledPanelPage?: (val: boolean) => void;
  OnUpdateWorkingEditTab?: (tab: WorkingEditTab) => void;
}

export interface IEditResourceState {
  crtTab: EditResourceTabs;
  isConfirm: boolean;
  selectedKey: number | null;
  isRedirect: boolean;
  resourceId?: string;
  resource: BaseResource;
  cId: string;
  workflowId: string;
  loading: boolean;
}
