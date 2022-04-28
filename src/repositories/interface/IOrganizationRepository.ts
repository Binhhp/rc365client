import { BaseApplication } from "src/common/classes/BaseApplication";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { OrganizationDto } from "src/common/classes/BaseOrganization";
import {
  PostApplicationInfomationRequest,
  RegisterUsersRequest,
  UnRegisterUsersRequest,
  UpdateNameOrganizationRequest,
  CreateOrganizationRequest,
  SyncSelectedUserRequest,
  UpdateGroupRequest,
  UnRegisterGroupsRequest,
  UpdateUserRequest,
  UnregisterResourceRequest,
  UpdateResourceRequest,
  StopSyncSelectedUserRequest,
} from "../request";
import {
  AddMemberToGroupTGrRequest,
  AddMemberToGroupTRsRequest,
  AddMemberToGroupTUsRequest,
} from "../request/Organizations/AddMemberToGroupRequests";
import {
  CreateDomainRequest,
  DeleteDomainRequest,
} from "../request/Organizations/DomainRequest";
import {
  JoinAsMemberOfGroupsTGrRequests,
  JoinAsMemberOfGroupsTRsRequests,
  JoinAsMemberOfGroupsTUsRequests,
} from "../request/Organizations/JoinAsMemberOfGroupsRequests";
import {
  LeaveGroupsTGrRequests,
  LeaveGroupsTRsRequests,
  LeaveGroupsTUsRequests,
} from "../request/Organizations/LeaveGroupRequests";
import {
  RemoveMemberFromGroupTGrRequest,
  RemoveMemberFromGroupTRsRequest,
  RemoveMemberFromGroupTUsRequest,
} from "../request/Organizations/RemoveMemberFromGroupRequests";
import {
  RegisterGroupsRequest,
  RegisterResourceRequest,
  UpdateDomainRequest,
} from "../request";
import {
  ConversationIdResponse,
  OrgSyncUserResourceItem,
  StopSyncAllResponse,
  SyncUsersResponse,
  StopSyncUsersResponse,
  DeleteOrganizationResponse,
  RegisterUserResponse,
  UnRegisterUserResponse,
  OrganizationUpdateNameResponse,
  OrganizationResponse,
  TimeZoneResponse,
} from "../response";
import { OrganizationListRes, UpdateGroupResponse } from "../response";
import { SensorControllerResponse } from "../response/Sensors/SensorControllerResponse";

export interface IOrganizationRepository {
  GetGroupById: (organizationId: string, groupId: string) => Promise<any>;
  GetResourceById: (organizationId: string, resourceId: string) => Promise<any>;
  GetDetailUser: (organizationId: string, userId: string) => Promise<any>;
  GetResourceSensorsById: (id: string) => Promise<boolean>;
  GetResourceControllerById: (
    id: string
  ) => Promise<SensorControllerResponse[]>;
  GetOrganizationListFS: () => Promise<OrganizationListRes>;
  GetTimeZoneList: (id: string) => Promise<TimeZoneResponse[]>;
  GetOrganizationDetailFS: (id: string) => Promise<OrganizationResponse>;
  GetApplicationInfomationFS: (id: string) => Promise<ConversationIdResponse>;
  GetOrganizationSyncInfomationFS: (
    id: string
  ) => Promise<any>;
  PostSyncSelectedUsersTS: (
    id: string,
    request: SyncSelectedUserRequest
  ) => Promise<ConversationIdResponse>;
  PostSyncAllUsersTS: (id: string) => Promise<ConversationIdResponse>;
  PostStopSyncAllUsersTS: (id: string) => Promise<ConversationIdResponse>;
  PostStopSyncSelectedUsersTS: (
    id: string,
    req: StopSyncSelectedUserRequest
  ) => Promise<ConversationIdResponse>;
  PostApplicationInfomationTS: (
    id: string,
    req: PostApplicationInfomationRequest
  ) => Promise<ConversationIdResponse>;
  PostRegisterUsersTS: (
    id: string,
    req: RegisterUsersRequest
  ) => Promise<RegisterUserResponse>;
  PostRegisterResourcesTS: (
    id: string,
    req: RegisterResourceRequest
  ) => Promise<ConversationIdResponse>;
  PatchUnregisterUsers: (
    id: string,
    req: UnRegisterUsersRequest
  ) => Promise<UnRegisterUserResponse>;
  PostUnregisterGroups: (
    id: string,
    req: UnRegisterGroupsRequest
  ) => Promise<ConversationIdResponse>;
  PatchUpdateNameOrganization: (
    id: string,
    req: UpdateNameOrganizationRequest
  ) => Promise<OrganizationUpdateNameResponse>;
  PostCreateOrganizationTS(req: CreateOrganizationRequest): Promise<any>;
  DeleteOrganizationTS(id: string): Promise<DeleteOrganizationResponse>;
  SearchUsersById(id: string, endpoint: string): Promise<any>;
  GetLazyItems(lazyUrl: string): Promise<any[]>;
  PostRegisterGroupsTS(
    id: string,
    req: RegisterGroupsRequest
  ): Promise<ConversationIdResponse>;
  GetOrganizationDomains(id: string): Promise<BaseDomain[]>;
  PostUpdateGroupsTS(
    id: string,
    req: UpdateGroupRequest
  ): Promise<UpdateGroupResponse>;
  PostUpdateUser(
    id: string,
    req: UpdateUserRequest
  ): Promise<ConversationIdResponse>;
  PostUpdateResource(
    id: string,
    req: UpdateResourceRequest
  ): Promise<ConversationIdResponse>;
  PostUnregisterResource(
    id: string,
    req: UnregisterResourceRequest
  ): Promise<ConversationIdResponse>;
  PostRegisterDomain(
    id: string,
    req: CreateDomainRequest
  ): Promise<ConversationIdResponse>;
  PostUpdateDomain(
    id: string,
    req: UpdateDomainRequest
  ): Promise<ConversationIdResponse>;
  PostDeleteDomain(
    id: string,
    req: DeleteDomainRequest
  ): Promise<ConversationIdResponse>;

  // Actions Member in edt group tab
  PostAddMemberToGroupTGr(
    id: string,
    req: AddMemberToGroupTGrRequest
  ): Promise<ConversationIdResponse>;
  PostAddMemberToGroupTUs(
    id: string,
    req: AddMemberToGroupTUsRequest
  ): Promise<ConversationIdResponse>;
  PostAddMemberToGroupTRs(
    id: string,
    req: AddMemberToGroupTRsRequest
  ): Promise<ConversationIdResponse>;
  PostRemoveMemberToGroupTGr(
    id: string,
    req: RemoveMemberFromGroupTGrRequest
  ): Promise<ConversationIdResponse>;
  PostRemoveMemberToGroupTUs(
    id: string,
    req: RemoveMemberFromGroupTUsRequest
  ): Promise<ConversationIdResponse>;
  PostRemoveMemberToGroupTRs(
    id: string,
    req: RemoveMemberFromGroupTRsRequest
  ): Promise<ConversationIdResponse>;

  // Actions leave & join in tabs
  PostJoinAsMemberOfGroupsTGr(
    id: string,
    req: JoinAsMemberOfGroupsTGrRequests
  ): Promise<ConversationIdResponse>;
  PostJoinAsMemberOfGroupsTUs(
    id: string,
    req: JoinAsMemberOfGroupsTUsRequests
  ): Promise<ConversationIdResponse>;
  PostJoinAsMemberOfGroupsTRs(
    id: string,
    req: JoinAsMemberOfGroupsTRsRequests
  ): Promise<ConversationIdResponse>;
  PostLeaveGroupsTGr(
    id: string,
    req: LeaveGroupsTGrRequests
  ): Promise<ConversationIdResponse>;
  PostLeaveGroupsTUs(
    id: string,
    req: LeaveGroupsTUsRequests
  ): Promise<ConversationIdResponse>;
  PostLeaveGroupsTRs(
    id: string,
    req: LeaveGroupsTRsRequests
  ): Promise<ConversationIdResponse>;
}
