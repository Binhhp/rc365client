import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { TypeConfirm } from "src/entity/enums";
import {
  CreateOrganizationResponse,
  DeleteOrganizationResponse,
} from "src/repositories/response";

export interface IListOrganizationsProps {
  theme?: string;
  isOrganizationListLoading?: boolean;
  isHaveMessageSignalR?: boolean;
  organizationList?: BaseOrganization[];
  isWorking?: boolean;
  confirmType?: TypeConfirm;
  breadCrumb?: INodes[];
  isOrgListLoading?: boolean;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  OnClearCidAndWorkflowId?: () => void;
  OnHandleDeleteOrganization?: (
    id: string
  ) => Promise<DeleteOrganizationResponse>;
  LoadOrganizationList?: () => Promise<void>;
  OnHandleResetApplicationStore?: () => void;
  OnHandleCreateOrganization?: (
    name: string,
    domains: string
  ) => Promise<CreateOrganizationResponse>;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnHandleUpdateBreadCrumb?: (nodes: INodes[]) => void;
}

export interface IListOrganizationsState {
  isPanelOpen: boolean;
  filterItems: BaseOrganization[] | null;
  idConfirm: string | null;
  isWorkingOnCreate: boolean;
  name: string;
  domain: string;
  conversationId: string;
  workflowId: string;
}
