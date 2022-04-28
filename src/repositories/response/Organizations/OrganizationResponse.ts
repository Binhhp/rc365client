import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";

export class CreateOrganizationResponse {
  conversationId: string;
  workflowId: string;
}
export class DeleteOrganizationResponse {
  conversationId: string;
  workflowId: string;
  resposeCode: number;
  status: string;
}
export class OrganizationListResponse {
  id: string;
  name: string;
  isDeleted: boolean;
}

export class OrganizationResponse {
  domains: string[];
  guid: string;
  isDeleted: boolean;
  name: string;
  sequenceNumber: number;
  version: number;
  resourceNumber: number;
  userNumber: number;
  groupNumber: number;
  domainNumber: number;
  users?: BaseUser[];
  resources?: BaseResource[];
  groups?: BaseGroup[];
}

export class OrganizationListRes {
  value: OrganizationResponse[];
}

export class OrganizationUpdateNameResponse {
  name: string;
  status: boolean;
  conversationId: string;
  workflowId?: string;
}

export type OrganizationListItemResponse = OrganizationListRes;
