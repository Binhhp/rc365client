import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { OrganizationUpdateNameResponse } from "src/repositories/response";

export interface IOrganizationCardProps {
  theme: string;
  data: BaseOrganization;
  index: number;
  isWorking?: boolean;
  breadCrumb?: INodes[];
  orgList?: BaseOrganization[];
  orgInfo?: BaseOrganization;
  onHandleRemoveItem?: (id: string) => void;
  OnHandleUpdateOrganizationName?: (
    id: string,
    name: string
  ) => Promise<OrganizationUpdateNameResponse>;
  OnHandleUpdateBreadCrumb?: (nodes: INodes[]) => void;
  onUpdateConversationId?: (id: string, wId?: string) => void;
}

export interface IOrganizationCardState {
  isChangeOrganizationName: boolean;
  organizationName: string;
  isRedirect: boolean;
  // conversationId: string;
}
