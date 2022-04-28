import { BaseDomain } from "src/common/classes/BaseDomain";
import {
  ApiFromOData,
  BuildURLWithTenantId,
} from "../../common/constants/RootURL";
import { FetchDataFromServer } from "../../common/functions";
import { axiosMethod } from "../../entity/enums";
import { IOrganizationRepository } from "../interface";
import {
  AddMemberToGroupTGrRequest,
  AddMemberToGroupTRsRequest,
  AddMemberToGroupTUsRequest,
  CreateDomainRequest,
  CreateOrganizationRequest,
  DeleteDomainRequest,
  JoinAsMemberOfGroupsTGrRequests,
  JoinAsMemberOfGroupsTRsRequests,
  JoinAsMemberOfGroupsTUsRequests,
  LeaveGroupsTGrRequests,
  LeaveGroupsTRsRequests,
  LeaveGroupsTUsRequests,
  PostApplicationInfomationRequest,
  RegisterGroupsRequest,
  RegisterResourceRequest,
  RegisterUsersRequest,
  RemoveMemberFromGroupTGrRequest,
  RemoveMemberFromGroupTRsRequest,
  RemoveMemberFromGroupTUsRequest,
  StopSyncSelectedUserRequest,
  SyncSelectedUserRequest,
  UnRegisterGroupsRequest,
  UnregisterResourceRequest,
  UnRegisterUsersRequest,
  UpdateDomainRequest,
  UpdateGroupRequest,
  UpdateNameOrganizationRequest,
  UpdateResourceRequest,
  UpdateUserRequest,
} from "../request";
import {
  ConversationIdResponse,
  CreateOrganizationResponse,
  DeleteOrganizationResponse,
  OrganizationListRes,
  OrganizationResponse,
  OrganizationUpdateNameResponse,
  OrgSyncUserResourceItem,
  RegisterUserResponse,
  UnRegisterUserResponse,
  UpdateGroupResponse,
} from "../response";
import { SensorControllerResponse } from "../response/Sensors/SensorControllerResponse";
import { TimeZoneResponse } from "../response/SettingResponse";

export class OrganizationRepository implements IOrganizationRepository {
  // [GET] ======================================
  GetGroupById = async (
    organizationId: string,
    groupId: string
  ): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${organizationId}')/groups('${groupId}')`,
    });
    return response;
  };

  GetResourceById = async (
    organizationId: string,
    resourceId: string
  ): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${organizationId}')/resources('${resourceId}')`,
    });
    return response;
  };

  GetDetailUser = async (
    organizationId: string,
    userId: string
  ): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${organizationId}')/users('${userId}')`,
    });
    return response;
  };

  GetTimeZoneList = async (id: string): Promise<TimeZoneResponse[]> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `TimeZones`,
    });
    return response;
  };

  GetResourceSensorsById = async (id: string): Promise<boolean> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `resources('${id}')/sensors`,
    });
    if (response.value && response.value.length > 0) {
      return true;
    }
    return false;
  };

  GetResourceControllerById = async (
    id: string
  ): Promise<SensorControllerResponse[]> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `resources('${id}')/SensorControllers`,
    });
    return response.value;
  };

  GetOrganizationDomains = async (id: string): Promise<BaseDomain[]> => {
    let gmail = new BaseDomain({
      name: "gmail.com",
      guid: "23um123m2i3m21i3m123mih",
    });
    let yahoo = new BaseDomain({
      name: "yahoo.com",
      guid: "808fx0vi0v00xv0mmn0rrtt",
    });
    let rc365 = new BaseDomain({
      name: "365rc.onmicrosoft.com",
      guid: "77z6b6cbm291mmmi1u2hy791",
    });
    // let response = await FetchDataFromServer({
    //   type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
    //   endpoint: `/organizations('${id}')/domains`,
    // });
    return [gmail, yahoo, rc365];
  };

  GetOrganizationListFS = async (): Promise<OrganizationListRes> => {
    let result = new OrganizationListRes();
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations`,
      // endpoint: `organizations?$expand=resources,users,groups`,
    });
    result.value = response.value;
    return result as OrganizationListRes;
  };

  GetOrganizationDetailFS = async (
    id: string
  ): Promise<OrganizationResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')`,
    });
    return response as OrganizationResponse;
  };

  GetApplicationInfomationFS = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/aadorganization`,
    });
    return response;
  };

  GetOrganizationSyncInfomationFS = async (
    id: string
  ): Promise<OrgSyncUserResourceItem[]> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/LoadSynchronizeInfo`,
    });
    return response.loadSynchronizeUsers;
  };

  GetLazyItems = async (lazyUrl: string): Promise<any[]> => {
    let response = await FetchDataFromServer({
      url: lazyUrl,
    });
    return response.data;
  };

  SearchUsersById = async (id: string, endpoint: string): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `aadusers${endpoint}&organizationId=${id}`,
    });
    return response.data;
  };

  // [POST] ======================================

  // [GROUP]
  PostLeaveGroupsTGr = async (
    id: string,
    req: LeaveGroupsTGrRequests
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Organizations('${id}')/RemoveGroupFromGroups`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostJoinAsMemberOfGroupsTGr = async (
    id: string,
    req: JoinAsMemberOfGroupsTGrRequests
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/AddChildGroupToGroups`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostAddMemberToGroupTGr = async (
    id: string,
    req: AddMemberToGroupTGrRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/AddGroupsToGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostAddMemberToGroupTUs = async (
    id: string,
    req: AddMemberToGroupTUsRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/AddUsersToGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostAddMemberToGroupTRs = async (
    id: string,
    req: AddMemberToGroupTRsRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/AddResourcesToGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostRemoveMemberToGroupTGr = async (
    id: string,
    req: RemoveMemberFromGroupTGrRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveGroupsFromGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostRemoveMemberToGroupTUs = async (
    id: string,
    req: RemoveMemberFromGroupTUsRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveUsersFromGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostRemoveMemberToGroupTRs = async (
    id: string,
    req: RemoveMemberFromGroupTRsRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveResourcesFromGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostRegisterGroupsTS = async (
    id: string,
    req: RegisterGroupsRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RegisterGroups`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostUpdateGroupsTS = async (
    id: string,
    req: UpdateGroupRequest
  ): Promise<UpdateGroupResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/UpdateGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostUnregisterGroups = async (
    id: string,
    req: UnRegisterGroupsRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveGroups`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  // [USER]
  PostJoinAsMemberOfGroupsTUs = async (
    id: string,
    req: JoinAsMemberOfGroupsTUsRequests
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/AddUserToGroups`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostLeaveGroupsTUs = async (
    id: string,
    req: LeaveGroupsTUsRequests
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveUserFromGroups`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostUpdateUser = async (
    id: string,
    req: UpdateUserRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/UpdateUser`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostSyncSelectedUsersTS = async (
    id: string,
    req: SyncSelectedUserRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/Sync`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostSyncAllUsersTS = async (id: string): Promise<ConversationIdResponse> => {
    let response: ConversationIdResponse = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/SyncAll`,
      method: axiosMethod.POST,
    });
    return response;
  };

  PostStopSyncAllUsersTS = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/StopSyncAll`,
      method: axiosMethod.POST,
    });
    return response;
  };

  PostStopSyncSelectedUsersTS = async (
    id: string,
    req: StopSyncSelectedUserRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/StopSync`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostRegisterUsersTS = async (
    id: string,
    req: RegisterUsersRequest
  ): Promise<RegisterUserResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RegisterUsers`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  // [RESOURCE]

  PostJoinAsMemberOfGroupsTRs = async (
    id: string,
    req: JoinAsMemberOfGroupsTRsRequests
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/AddMemberOfResources`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostLeaveGroupsTRs = async (
    id: string,
    req: LeaveGroupsTRsRequests
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveMemberOfResources`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostUpdateResource = async (
    id: string,
    req: UpdateResourceRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/UpdateResources`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostUnregisterResource = async (
    id: string,
    req: UnregisterResourceRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveResources`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostRegisterResourcesTS = async (
    id: string,
    req: RegisterResourceRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RegisterResources`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  // [DOMAIN]

  PostApplicationInfomationTS = async (
    id: string,
    req: PostApplicationInfomationRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/aadorganization`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostCreateOrganizationTS = async (
    req: CreateOrganizationRequest
  ): Promise<CreateOrganizationResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostRegisterDomain = async (
    id: string,
    req: CreateDomainRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RegisterDomains`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostUpdateDomain = async (
    id: string,
    req: UpdateDomainRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/UpdateDomain`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostDeleteDomain = async (
    id: string,
    req: DeleteDomainRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveDomains`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  // PostUnregisterGroups = async (
  //   id: string,
  //   req: UnRegisterGroupsRequest
  // ): Promise<ConversationIdResponse> => {
  //   let response = await FetchDataFromServer({
  //     type: ApiFromOData.ORGANIZATION_API,
  //     endpoint: `organizations('${id}')/RemoveGroups`,
  //     method: axiosMethod.POST,
  //     body: req,
  //   });
  //   return response;
  // };

  PostAddUserToGroup = async (id: string, req: any): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/AddUsersToGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostAddGroupToGroup = async (id: string, req: any): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/AddGroupsToGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostRemoveUserToGroup = async (id: string, req: any): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveUsersFromGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostRemoveGroupToGroup = async (id: string, req: any): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/RemoveGroupsFromGroup`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  // [PATCH] ==============================================

  PatchUnregisterUsers = async (
    id: string,
    req: UnRegisterUsersRequest
  ): Promise<UnRegisterUserResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/DeleteUsers`,
      method: axiosMethod.PATCH,
      body: req,
    });
    return response;
  };

  PatchUpdateNameOrganization = async (
    id: string,
    req: UpdateNameOrganizationRequest
  ): Promise<OrganizationUpdateNameResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/UpdateNameOrganization`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  // [DELETE] ==============================================

  DeleteOrganizationTS = async (
    id: string
  ): Promise<DeleteOrganizationResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `organizations('${id}')/DeleteOrganization`,
      method: axiosMethod.DELETE,
    });
    return response;
  };
}
