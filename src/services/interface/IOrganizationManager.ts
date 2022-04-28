import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import {
  BaseOrganization,
} from "src/common/classes/BaseOrganization";
import {
  CreateOrganizationRequest,
  PostApplicationInfomationRequest,
  RegisterUsersRequest,
  StopSyncSelectedUserRequest,
  SyncSelectedUserRequest,
  UnRegisterUsersRequest,
  UpdateNameOrganizationRequest,
  UpdateUserRequest,
} from "src/repositories/request";
import {
  AddMemberToGroupTGrRequest,
  AddMemberToGroupTRsRequest,
  AddMemberToGroupTUsRequest,
} from "src/repositories/request/Organizations/AddMemberToGroupRequests";
import {
  CreateDomainRequest,
} from "src/repositories/request/Organizations/DomainRequest";
import {
  JoinAsMemberOfGroupsTGrRequests,
  JoinAsMemberOfGroupsTRsRequests,
  JoinAsMemberOfGroupsTUsRequests,
} from "src/repositories/request/Organizations/JoinAsMemberOfGroupsRequests";
import {
  LeaveGroupsTGrRequests,
  LeaveGroupsTRsRequests,
  LeaveGroupsTUsRequests,
} from "src/repositories/request/Organizations/LeaveGroupRequests";
import {
  RemoveMemberFromGroupTGrRequest,
  RemoveMemberFromGroupTRsRequest,
  RemoveMemberFromGroupTUsRequest,
} from "src/repositories/request/Organizations/RemoveMemberFromGroupRequests";
import {
  RegisterGroupsRequest,
  RegisterResourceRequest,
  UpdateResourceRequest,
  UnregisterResourceRequest,
} from "src/repositories/request";
import {
  ConversationIdResponse,
  OrgSyncUserResourceItem,
  DeleteOrganizationResponse,
  RegisterUserResponse,
  UnRegisterUserResponse,
  CreateOrganizationResponse,
  UpdateGroupResponse,
  OrganizationResponse,
} from "src/repositories/response";
import { SensorControllerResponse } from "src/repositories/response/Sensors/SensorControllerResponse";
import { BaseUser } from "src/common/classes/BaseUser";
import { BaseResource } from "src/common/classes/BaseResource";

export interface IOrganizationManager {
  GetGroupById: (
    orgId: string,
    groupId: string
  ) => Promise<BaseGroup>;

  GetResourceById: (
    orgId: string,
    resourceId: string
  ) => Promise<BaseResource>;

  GetDetailUserById: (
    orgId: string,
    userId: string
  ) => Promise<BaseUser>;

  GetResourceSensorsById?: (id: string) => Promise<boolean>;
  GetResourceControllerById?: (
    id: string
  ) => Promise<SensorControllerResponse[]>;
  UpdateNameOrganization?: (
    id: string,
    req: UpdateNameOrganizationRequest
  ) => Promise<any>;
  GetOrganizationList?: () => Promise<BaseOrganization[]>;
  GetTimeZoneList?: () => Promise<any>;
  CreateOrganizationTS: (
    req: CreateOrganizationRequest
  ) => Promise<CreateOrganizationResponse>;
  GetOrganizationInfomationById: (id: string) => Promise<OrganizationResponse>;
  RegistUsers: (
    id: string,
    req: RegisterUsersRequest
  ) => Promise<RegisterUserResponse>;
  RegistGroups: (
    id: string,
    req: RegisterGroupsRequest
  ) => Promise<ConversationIdResponse>;
  RegistResources: (
    id: string,
    req: RegisterResourceRequest
  ) => Promise<ConversationIdResponse>;
  UnregisterUsers: (
    id: string,
    req: UnRegisterUsersRequest
  ) => Promise<UnRegisterUserResponse>;
  UnregisterGroups: (
    id: string,
    req: string[]
  ) => Promise<ConversationIdResponse>;
  SyncAllUsers: (id: string) => Promise<ConversationIdResponse>;
  StopSyncAllUsers(id: string): Promise<ConversationIdResponse>;
  SyncSelectedItems(
    id: string,
    req: SyncSelectedUserRequest
  ): Promise<ConversationIdResponse>;
  StopSyncSelectedItems(
    id: string,
    req: StopSyncSelectedUserRequest
  ): Promise<ConversationIdResponse>;
  UpdateApplicationInfomationTS(
    id: string,
    req: PostApplicationInfomationRequest
  ): Promise<ConversationIdResponse>;
  SearchingUsersByName(id: string, endpoint: string): Promise<any[]>;
  GetLazySearchingItems(lazyUrl: string): Promise<any[]>;
  GetSynchronizeInfomationList(id: string): Promise<OrgSyncUserResourceItem[]>;
  GetApplicationInfomation(id: string): Promise<ConversationIdResponse>;
  DeleteOrganization(id: string): Promise<DeleteOrganizationResponse>;
  GetOrganizationDomains(id: string): Promise<BaseDomain[]>;
  UpdateGroup(id: string, req: BaseGroup): Promise<UpdateGroupResponse>;
  UpdateUser(
    id: string,
    req: UpdateUserRequest
  ): Promise<ConversationIdResponse>;
  UpdateResource(
    id: string,
    req: UpdateResourceRequest
  ): Promise<ConversationIdResponse>;
  UnregisterResources(
    id: string,
    req: UnregisterResourceRequest
  ): Promise<ConversationIdResponse>;
  RegisterDomain(
    id: string,
    req: CreateDomainRequest
  ): Promise<ConversationIdResponse>;
  UpdateDomain(id: string, domain: BaseDomain): Promise<ConversationIdResponse>;
  DeleteDomain(
    id: string,
    domainIds: string[]
  ): Promise<ConversationIdResponse>;
  AddMemberToGroupTGr(
    id: string,
    req: AddMemberToGroupTGrRequest
  ): Promise<ConversationIdResponse>;
  AddMemberToGroupTUs(
    id: string,
    req: AddMemberToGroupTUsRequest
  ): Promise<ConversationIdResponse>;
  AddMemberToGroupTRs(
    id: string,
    req: AddMemberToGroupTRsRequest
  ): Promise<ConversationIdResponse>;
  RemoveMemberToGroupTGr(
    id: string,
    req: RemoveMemberFromGroupTGrRequest
  ): Promise<ConversationIdResponse>;
  RemoveMemberToGroupTUs(
    id: string,
    req: RemoveMemberFromGroupTUsRequest
  ): Promise<ConversationIdResponse>;
  RemoveMemberToGroupTRs(
    id: string,
    req: RemoveMemberFromGroupTRsRequest
  ): Promise<ConversationIdResponse>;
  JoinAsMemberOfGroupsTGr(
    id: string,
    req: JoinAsMemberOfGroupsTGrRequests
  ): Promise<ConversationIdResponse>;
  JoinAsMemberOfGroupsTUs(
    id: string,
    req: JoinAsMemberOfGroupsTUsRequests
  ): Promise<ConversationIdResponse>;
  JoinAsMemberOfGroupsTRs(
    id: string,
    req: JoinAsMemberOfGroupsTRsRequests
  ): Promise<ConversationIdResponse>;
  LeaveGroupsTGr(
    id: string,
    req: LeaveGroupsTGrRequests
  ): Promise<ConversationIdResponse>;
  LeaveGroupsTUs(
    id: string,
    req: LeaveGroupsTUsRequests
  ): Promise<ConversationIdResponse>;
  LeaveGroupsTRs(
    id: string,
    req: LeaveGroupsTRsRequests
  ): Promise<ConversationIdResponse>;
}
