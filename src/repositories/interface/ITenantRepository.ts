import { ContextDto } from "src/common/classes/BaseContext";
import { FeatureContextTenantDto } from "src/common/classes/BaseFeature";
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
} from "../request/Tenants";
import { ConversationIdResponse } from "../response/ConversationIdResponse";
import { IContextDatabases } from "../response/Tenants/TenantContextResponse";

export interface ITenantRepository {
  GetTenantById: (id: string) => Promise<any>;
  GetLicenceList: (id: string) => Promise<any>;
  GetTenantContextById: (
    contextId: string,
    tenantId: string
  ) => Promise<TenantContextDto>;
  PostCreateTenant: (
    req: CreateTenantRequest
  ) => Promise<ConversationIdResponse>;
  PostDeleteTenant: (id: string) => Promise<ConversationIdResponse>;
  PostUpdateStorageConfiguration: (
    id: string,
    req: UpdateStorageConfigurationRequest
  ) => Promise<ConversationIdResponse>;
  PostUpdateConfiguration: (
    id: string,
    req: UpdateConfigurationRequest
  ) => Promise<any>;
  PostUpdateTenant: (
    id: string,
    req: UpdateTenantRequest
  ) => Promise<ConversationIdResponse>;
  PostInitContextConfiguration: (
    req: InitContextConfigurationRequest,
    id: string
  ) => Promise<ConversationIdResponse>;
  GetFeaturesByTenantId: (id: string) => Promise<FeatureContextTenantDto[]>;
  GetContextsByTenantId: (id: string) => Promise<ContextDto[]>;
  GetContextDatabases: (
    id: string,
    req: GetContextConfigurationRequest
  ) => Promise<ConversationIdResponse>;
  PostConfigurationgFeatures: (
    id: string,
    req: IUpdateMultipleFeatureRequest
  ) => Promise<ConversationIdResponse>;
  PostConfigurationgContexts: (
    id: string,
    req: IUpdateMultipleContextRequest
  ) => Promise<ConversationIdResponse>;
}
