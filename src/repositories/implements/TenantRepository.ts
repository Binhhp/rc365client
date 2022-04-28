import { ContextDto } from "src/common/classes/BaseContext";
import { FeatureContextTenantDto } from "src/common/classes/BaseFeature";
import { TenantContextDto } from "src/common/classes/BaseTenant";
import { axiosMethod } from "src/entity/enums";
import {
  ApiFromOData,
  BuildURLWithTenantId,
} from "../../common/constants/RootURL";
import { FetchDataFromServer } from "../../common/functions";
import { ITenantRepository } from "../interface";
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

export class TenantRepository implements ITenantRepository {
  // [Get]
  GetTenantById = async (id: string): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')`,
      method: axiosMethod.GET,
    });
    return response;
  };

  GetLicenceList = async (id: string): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API, true),
      endpoint: `tenants('${id}')/LicenceTypes`,
      method: axiosMethod.GET,
    });
    return response;
  };

  GetTenantContextById = async (
    contextId: string,
    tenantId: string
  ): Promise<TenantContextDto> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${tenantId}')/ConfigurationContexts('${contextId}')`,
      method: axiosMethod.GET,
    });
    return response;
  };

  GetFeaturesByTenantId = async (
    id: string
  ): Promise<FeatureContextTenantDto[]> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API, true),
      endpoint: `tenants('${id}')/ContextFeatures`,
      method: axiosMethod.GET,
    });
    return response.value;
  };

  GetContextsByTenantId = async (id: string): Promise<ContextDto[]> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API, true),
      endpoint: `tenants('${id}')/TenantContexts`,
      method: axiosMethod.GET,
    });
    return response.value;
  };

  // [Post]
  PostCreateTenant = async (
    req: CreateTenantRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostInitContextConfiguration = async (
    req: InitContextConfigurationRequest,
    id: string
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')/InitContextConfiguration`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostDeleteTenant = async (id: string): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')/DeleteTenant`,
      method: axiosMethod.POST,
    });
    return response;
  };

  PostUpdateStorageConfiguration = async (
    id: string,
    req: UpdateStorageConfigurationRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')/UpdateStorageConfiguration`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostUpdateConfiguration = async (
    id: string,
    req: UpdateConfigurationRequest
  ): Promise<any> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')/UpdateConfiguration`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };

  PostUpdateTenant = async (
    id: string,
    req: UpdateTenantRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')/UpdateTenant`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostConfigurationgContexts = async (
    id: string,
    req: IUpdateMultipleContextRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')/UpdateContextConfiguration`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostConfigurationgFeatures = async (
    id: string,
    req: IUpdateMultipleFeatureRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')/UpdateFeatureConfiguration`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  GetContextDatabases = async (
    id: string,
    req: GetContextConfigurationRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `tenants('${id}')/GetContextConfiguration`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
}
