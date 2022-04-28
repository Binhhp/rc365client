import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";
import { OrganizationRepository } from "src/repositories/implements/organizationRepository";
import { IOrganizationRepository } from "src/repositories/interface";
import {
  CreateOrganizationRequest,
  PostApplicationInfomationRequest,
  RegisterGroupsRequest,
  RegisterResourceRequest,
  RegisterUsersRequest,
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
} from "src/repositories/request";
import {
  AddMemberToGroupTGrRequest,
  AddMemberToGroupTRsRequest,
  AddMemberToGroupTUsRequest,
} from "src/repositories/request/Organizations/AddMemberToGroupRequests";
import {
  CreateDomainRequest,
  DeleteDomainRequest,
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
} from "src/repositories/response";
import { SensorControllerResponse } from "src/repositories/response/Sensors/SensorControllerResponse";
import { IOrganizationManager } from "../interface";

export class OrganizationManager implements IOrganizationManager {
  private static _instance: OrganizationManager;
  private _organizationRepositories: IOrganizationRepository;
  private _organizationList: BaseOrganization[];
  private _organizationInfomation: BaseOrganization;
  private _synchronizeInfomationList: any[];
  private _domains: BaseDomain[];
  private _domainOptions: IDropdownOption[];
  private _timeZones: IDropdownOption[];
  constructor() {
    this._organizationRepositories = new OrganizationRepository();
    this._organizationList = [];
    this._domains = [];
    this._domainOptions = [];
    this._timeZones = [];
    this._organizationInfomation = new BaseOrganization();
  }
  public get OrganizationList(): BaseOrganization[] {
    return this._organizationList;
  }
  public set OrganizationList(list: BaseOrganization[]) {
    this._organizationList = list;
  }
  public get timeZones(): IDropdownOption[] {
    return this._timeZones;
  }
  public set timeZones(timeZones: IDropdownOption[]) {
    this._timeZones = timeZones;
  }
  public get domains(): BaseDomain[] {
    return this._domains;
  }
  public set domains(domains: BaseDomain[]) {
    this._domains = domains;
  }
  public get domainOptions(): IDropdownOption[] {
    return this._domainOptions;
  }
  public set domainOptions(opts: IDropdownOption[]) {
    this._domainOptions = opts;
  }
  public get OrganizationInfomation(): BaseOrganization {
    return this._organizationInfomation;
  }
  public set OrganizationInfomation(org: BaseOrganization) {
    this._organizationInfomation = org;
  }
  public static get Instance(): OrganizationManager {
    if (!this._instance) {
      this._instance = new OrganizationManager();
    }
    return this._instance;
  }
  private _mapOrganization = (
    entity: OrganizationListRes
  ): BaseOrganization[] => {
    let BaseOrganizationDto = new Array<BaseOrganization>();
    if (entity.value && entity.value.length > 0) {
      entity.value.forEach((org) => {
        let organization = new BaseOrganization();
        organization.id = org.guid;
        organization.domain = org.domains;
        organization.domainNumber = org.domainNumber;
        organization.isDeleted = org.isDeleted;
        organization.name = org.name;
        organization.sequenceNumber = org.sequenceNumber;
        organization.version = org.version;
        organization.resourceNumber = org.resourceNumber;
        organization.groupNumber = org.groupNumber;
        organization.userNumber = org.userNumber;
        BaseOrganizationDto.push(organization);
      });
    }
    return BaseOrganizationDto;
  };

  GetOrganizationList = async (): Promise<BaseOrganization[]> => {
    let response = await this._organizationRepositories.GetOrganizationListFS();
    let result: BaseOrganization[] = await this._mapOrganization(response);
    this._organizationList = result;
    return result;
  };

  GetResourceSensorsById = async (id: string): Promise<boolean> => {
    let response = await this._organizationRepositories.GetResourceSensorsById(
      id
    );
    return response;
  };

  GetResourceControllerById = async (
    id: string
  ): Promise<SensorControllerResponse[]> => {
    let response =
      await this._organizationRepositories.GetResourceControllerById(id);
    return response;
  };

  GetTimeZoneList = async (): Promise<any> => {
    let response = await this._organizationRepositories.GetTimeZoneList(
      "timeZone"
    );
    if (response && response.length > 0) {
      let rs = response.map((d) => {
        return {
          key: d.standardName,
          text: d.displayName,
        } as IDropdownOption;
      });
      this._timeZones = rs;
    }
    return;
  };

  GetOrganizationDomains = async (id: string): Promise<BaseDomain[]> => {
    let response = await this._organizationRepositories.GetOrganizationDomains(
      id
    );
    let rs = response.map((d) => {
      return {
        key: d.name,
        text: d.name,
      } as IDropdownOption;
    });
    this._domainOptions = rs;
    this._domains = response;
    return response;
  };

  GetOrganizationInfomationById = async (
    id: string
  ): Promise<OrganizationResponse> => {
    let response = await this._organizationRepositories.GetOrganizationDetailFS(
      id
    );
    let organization = new BaseOrganization();
    organization.id = response.guid;
    organization.domain = response.domains;
    organization.domainNumber = response.domainNumber;
    organization.isDeleted = response.isDeleted;
    organization.name = response.name;
    organization.sequenceNumber = response.sequenceNumber;
    organization.version = response.version;
    organization.resourceNumber = response.resourceNumber;
    organization.groupNumber = response.groupNumber;
    organization.userNumber = response.userNumber;
    this._organizationInfomation = organization;
    return response;
  };

  GetGroupById = async (
    orgId: string,
    groupId: string
  ): Promise<BaseGroup> => {
    let response = await this._organizationRepositories.GetGroupById(
      orgId,
      groupId
    );
    const resource = new BaseGroup();
    resource.Map(response);
    return resource;
  };

  GetResourceById = async (
    orgId: string,
    resourceId: string
  ): Promise<BaseResource> => {
    let response = await this._organizationRepositories.GetResourceById(
      orgId,
      resourceId
    );
    const resource = new BaseResource();
    resource.Map(response);
    return resource;
  };

  GetDetailUserById = async (
    orgId: string,
    userId: string
  ): Promise<BaseUser> => {
    let response = await this._organizationRepositories.GetDetailUser(
      orgId,
      userId
    );
    const user = new BaseUser();
    user.Map(response, userId, orgId);
    return user;
  };

  GetSynchronizeInfomationList = async (
    id: string
  ): Promise<OrgSyncUserResourceItem[]> => {
    let response =
      await this._organizationRepositories.GetOrganizationSyncInfomationFS(id);
    this._synchronizeInfomationList = response;
    return response;
  };

  GetLazySearchingItems = async (lazyUrl: string): Promise<any[]> => {
    let response = await this._organizationRepositories.GetLazyItems(lazyUrl);
    return response;
  };

  GetDetailUser = async (orgId: string, userId: string): Promise<BaseUser> => {
    let response = await this._organizationRepositories.GetDetailUser(
      orgId,
      userId
    );
    return response;
  };

  GetApplicationInfomation = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response =
      await this._organizationRepositories.GetApplicationInfomationFS(id);
    return response;
  };

  RegistUsers = async (
    id: string,
    req: RegisterUsersRequest
  ): Promise<RegisterUserResponse> => {
    return await this._organizationRepositories.PostRegisterUsersTS(id, req);
  };

  RegistResources = async (
    id: string,
    req: RegisterResourceRequest
  ): Promise<ConversationIdResponse> => {
    return await this._organizationRepositories.PostRegisterResourcesTS(
      id,
      req
    );
  };

  RegistGroups = async (
    id: string,
    req: RegisterGroupsRequest
  ): Promise<ConversationIdResponse> => {
    return await this._organizationRepositories.PostRegisterGroupsTS(id, req);
  };

  CreateOrganizationTS = async (
    req: CreateOrganizationRequest
  ): Promise<CreateOrganizationResponse> => {
    return await this._organizationRepositories.PostCreateOrganizationTS(req);
  };

  DeleteOrganization = async (
    id: string
  ): Promise<DeleteOrganizationResponse> => {
    return await this._organizationRepositories.DeleteOrganizationTS(id);
  };

  UnregisterUsers = async (
    id: string,
    req: UnRegisterUsersRequest
  ): Promise<UnRegisterUserResponse> => {
    return await this._organizationRepositories.PatchUnregisterUsers(id, req);
  };

  UnregisterGroups = async (
    id: string,
    groups: string[]
  ): Promise<ConversationIdResponse> => {
    let req = new UnRegisterGroupsRequest();
    req.UnsynchronizeGroups = groups;
    return await this._organizationRepositories.PostUnregisterGroups(id, req);
  };

  UpdateNameOrganization = async (
    id: string,
    req: UpdateNameOrganizationRequest
  ): Promise<OrganizationUpdateNameResponse> => {
    return await this._organizationRepositories
      .PatchUpdateNameOrganization(id, req)
      .then(async (res) => {
        return res;
      });
  };

  UpdateGroup = async (
    id: string,
    group: BaseGroup
  ): Promise<UpdateGroupResponse> => {
    let req = new UpdateGroupRequest();
    req.Description = group.description;
    req.Email = group.email;
    // req.Email = `${group.email}@${group.domain}`;
    req.Name = group.name;
    req.Guid = group.id;
    return await this._organizationRepositories
      .PostUpdateGroupsTS(id, req)
      .then((res) => {
        return res;
      });
  };

  UpdateApplicationInfomationTS = async (
    id: string,
    req: PostApplicationInfomationRequest
  ): Promise<ConversationIdResponse> => {
    return await this._organizationRepositories.PostApplicationInfomationTS(
      id,
      req
    );
  };

  SyncAllUsers = async (id: string): Promise<ConversationIdResponse> => {
    return await this._organizationRepositories.PostSyncAllUsersTS(id);
  };

  StopSyncAllUsers = async (id: string): Promise<ConversationIdResponse> => {
    return await this._organizationRepositories.PostStopSyncAllUsersTS(id);
  };

  SyncSelectedItems = async (
    id: string,
    req: SyncSelectedUserRequest
  ): Promise<ConversationIdResponse> => {
    return await this._organizationRepositories.PostSyncSelectedUsersTS(
      id,
      req
    );
  };

  StopSyncSelectedItems = async (
    id: string,
    req: StopSyncSelectedUserRequest
  ): Promise<ConversationIdResponse> => {
    return await this._organizationRepositories.PostStopSyncSelectedUsersTS(
      id,
      req
    );
  };

  SearchingUsersByName = async (
    id: string,
    endpoint: string
  ): Promise<any[]> => {
    let response = this._organizationRepositories.SearchUsersById(id, endpoint);
    return response;
  };

  UpdateUser = async (
    id: string,
    req: UpdateUserRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostUpdateUser(id, req);
    return response;
  };

  UpdateResource = async (
    id: string,
    req: UpdateResourceRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostUpdateResource(id, req);
    return response;
  };
  UnregisterResources = async (
    id: string,
    req: UnregisterResourceRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostUnregisterResource(
      id,
      req
    );
    return response;
  };

  RegisterDomain = async (
    id: string,
    req: CreateDomainRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostRegisterDomain(id, req);
    return response;
  };

  UpdateDomain = async (
    id: string,
    domain: BaseDomain
  ): Promise<ConversationIdResponse> => {
    let req = new UpdateDomainRequest();
    req.Guid = domain.guid;
    req.Name = domain.name;
    let response = this._organizationRepositories.PostUpdateDomain(id, req);
    return response;
  };

  DeleteDomain = async (
    id: string,
    domainIds: string[]
  ): Promise<ConversationIdResponse> => {
    let req = new DeleteDomainRequest();
    req.DomainIds = domainIds;
    let response = this._organizationRepositories.PostDeleteDomain(id, req);
    return response;
  };

  // Actions Member in edt group tab
  AddMemberToGroupTGr = async (
    id: string,
    req: AddMemberToGroupTGrRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostAddMemberToGroupTGr(
      id,
      req
    );
    return response;
  };

  AddMemberToGroupTUs = async (
    id: string,
    req: AddMemberToGroupTUsRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostAddMemberToGroupTUs(
      id,
      req
    );
    return response;
  };

  AddMemberToGroupTRs = async (
    id: string,
    req: AddMemberToGroupTRsRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostAddMemberToGroupTRs(
      id,
      req
    );
    return response;
  };

  RemoveMemberToGroupTGr = async (
    id: string,
    req: RemoveMemberFromGroupTGrRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostRemoveMemberToGroupTGr(
      id,
      req
    );
    return response;
  };

  RemoveMemberToGroupTUs = async (
    id: string,
    req: RemoveMemberFromGroupTUsRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostRemoveMemberToGroupTUs(
      id,
      req
    );
    return response;
  };

  RemoveMemberToGroupTRs = async (
    id: string,
    req: RemoveMemberFromGroupTRsRequest
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostRemoveMemberToGroupTRs(
      id,
      req
    );
    return response;
  };

  // Actions leave & join in tabs
  JoinAsMemberOfGroupsTGr = async (
    id: string,
    req: JoinAsMemberOfGroupsTGrRequests
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostJoinAsMemberOfGroupsTGr(
      id,
      req
    );
    return response;
  };

  JoinAsMemberOfGroupsTUs = async (
    id: string,
    req: JoinAsMemberOfGroupsTUsRequests
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostJoinAsMemberOfGroupsTUs(
      id,
      req
    );
    return response;
  };

  JoinAsMemberOfGroupsTRs = async (
    id: string,
    req: JoinAsMemberOfGroupsTRsRequests
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostJoinAsMemberOfGroupsTRs(
      id,
      req
    );
    return response;
  };

  LeaveGroupsTGr = async (
    id: string,
    req: LeaveGroupsTGrRequests
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostLeaveGroupsTGr(id, req);
    return response;
  };

  LeaveGroupsTUs = async (
    id: string,
    req: LeaveGroupsTUsRequests
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostLeaveGroupsTUs(id, req);
    return response;
  };

  LeaveGroupsTRs = async (
    id: string,
    req: LeaveGroupsTRsRequests
  ): Promise<ConversationIdResponse> => {
    let response = this._organizationRepositories.PostLeaveGroupsTRs(id, req);
    return response;
  };
}
