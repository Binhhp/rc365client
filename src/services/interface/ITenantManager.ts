import { TenantContextDto } from "src/common/classes/BaseTenant";
import {
  CreateTenantRequest,
  GetContextConfigurationRequest,
  InitContextConfigurationRequest,
  IUpdateMultipleContextRequest,
  IUpdateMultipleFeatureRequest,
  UpdateConfigurationRequest,
  UpdateStorageConfigurationRequest,
  UpdateTenantRequest,
} from "src/repositories/request/Tenants";
import { ConversationIdResponse } from "src/repositories/response/ConversationIdResponse";
import { IContextDatabases } from "src/repositories/response/Tenants/TenantContextResponse";

export interface ITenantManager {
  GetTenantDetailById: (id: string) => Promise<any>;
  GetLicenceList: (id: string) => Promise<any>;
  CreateTenant: (req: CreateTenantRequest) => Promise<ConversationIdResponse>;
  DeleteTenant: (id: string, req: any) => Promise<ConversationIdResponse>;
  UpdateStorageConfiguration: (
    id: string,
    req: UpdateStorageConfigurationRequest
  ) => Promise<ConversationIdResponse>;
  UpdateConfiguration: (
    id: string,
    req: UpdateConfigurationRequest
  ) => Promise<any>;
  UpdateTenant: (
    id: string,
    req: UpdateTenantRequest
  ) => Promise<ConversationIdResponse>;
  InitContextConfiguration: (
    req: InitContextConfigurationRequest,
    id: string
  ) => Promise<ConversationIdResponse>;
  GetTenantContextById: (
    contextId: string,
    tenantId: string
  ) => Promise<TenantContextDto>;
  GetContextDatabases: (
    req: GetContextConfigurationRequest,
    id: string
  ) => Promise<ConversationIdResponse>;
  UpdateConfigurationgFeatures: (
    id: string,
    req: IUpdateMultipleFeatureRequest
  ) => Promise<ConversationIdResponse>;
  UpdateConfigurationgContexts: (
    id: string,
    req: IUpdateMultipleContextRequest
  ) => Promise<ConversationIdResponse>;
}
