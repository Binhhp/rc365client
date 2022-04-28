import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response";

export interface ITenantProps {
  isHaveMessageSignalR?: boolean;
  theme?: ThemeEnums;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  selectedTenants?: BaseTenant[];
  confirmType?: TypeConfirm;
  organizationInfomation?: BaseOrganization;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdateBeardCrumb?: (nodes: INodes[]) => void;
  OnUpdatePanelPage?: (val: boolean) => void;
  OnGetDomains?: (id: string) => void;
  OnResetTenantStore?: () => void;
  OnDeleteTenant?: (id: string) => Promise<ConversationIdResponse>;
  OnGetLicenceList?: () => void;
  OnResetSelectedTenant: () => void;
}

export interface ITenantStates {
  isRedirect: boolean;
  cId: string;
  workflowId: string;
  tenantName: string;
  numberTenants: number;
}
