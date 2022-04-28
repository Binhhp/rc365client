import { BaseContext, ContextDto } from "src/common/classes/BaseContext";
import {
  BaseFeatureContextTenant,
  FeatureContextTenantDto,
} from "src/common/classes/BaseFeature";
import {
  BaseTenant,
  BaseTenantContext,
  TenantContextDto,
} from "src/common/classes/BaseTenant";
import { TenantRepository } from "src/repositories/implements/TenantRepository";
import { ITenantRepository } from "src/repositories/interface";
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
import { ITenantManager } from "../interface";

export class TenantManager implements ITenantManager {
  private static _instance: TenantManager;
  private _tenantRepositories: ITenantRepository;
  private _workingTenant: BaseTenant;
  private _licence: string[];
  private _workingContext: BaseTenantContext;
  private _features: BaseFeatureContextTenant[];
  private _contexts: BaseContext[];
  private _contextDatabases: IContextDatabases[];

  constructor() {
    this._tenantRepositories = new TenantRepository();
    this._workingTenant = new BaseTenant();
    this._workingContext = new BaseTenantContext();
    this._licence = [];
    this._features = [];
    this._contexts = [];
    this._contextDatabases = [];
  }

  public static get Instance(): TenantManager {
    if (!this._instance) {
      this._instance = new TenantManager();
    }
    return this._instance;
  }

  public get contextDatabases(): IContextDatabases[] {
    return this._contextDatabases;
  }

  public set contextDatabases(v: IContextDatabases[]) {
    this._contextDatabases = v;
  }
  public get workingTenant(): BaseTenant {
    return this._workingTenant;
  }

  public set workingTenant(v: BaseTenant) {
    this._workingTenant = v;
  }

  public get workingContext(): BaseTenantContext {
    return this._workingContext;
  }

  public set workingContext(v: BaseTenantContext) {
    this._workingContext = v;
  }

  public get licence(): string[] {
    return this._licence;
  }

  public set licence(v: string[]) {
    this._licence = v;
  }
  public get features(): BaseFeatureContextTenant[] {
    return this._features;
  }

  public set features(v: BaseFeatureContextTenant[]) {
    this._features = v;
  }
  public get contexts(): BaseContext[] {
    return this._contexts;
  }

  public set contexts(v: BaseContext[]) {
    this._contexts = v;
  }

  GetTenantDetailById = async (id: string): Promise<any> => {
    let response = await this._tenantRepositories
      .GetTenantById(id)
      .then((res) => {
        let tenant = new BaseTenant();
        tenant.id = res.guid;
        tenant.isDeleted = res.isDeleted;
        tenant.isDisposed = res.isDisposed;
        tenant.name = res.name;
        tenant.sequenceNumber = res.sequenceNumber;
        tenant.status = res.status;
        tenant.tenantInfo = res.tenantInfo;
        tenant.version = res.version;
        this.workingTenant = tenant;
      });
    return response;
  };

  GetLicenceList = async (id: string): Promise<any> => {
    let response = await this._tenantRepositories
      .GetLicenceList(id)
      .then((res) => {
        this.licence = res.value;
      });
    return response;
  };

  GetTenantContextById = async (
    contextId: string,
    tenantId: string
  ): Promise<TenantContextDto> => {
    let res = await this._tenantRepositories
      .GetTenantContextById(contextId, tenantId)
      .then((res) => {
        if (res) {
          let context = new BaseTenantContext();
          context.contextKey = res.contextKey;
          context.isInitialized = res.isInitialized;
          context.stogareConfiguration = res.stogareConfiguration;
          this._workingContext = context;
        }
        return res;
      });
    return res;
  };

  GetFeaturesByTenantId = async (
    id: string
  ): Promise<FeatureContextTenantDto[]> => {
    let res = await this._tenantRepositories
      .GetFeaturesByTenantId(id)
      .then((res) => {
        if (res) {
          let rs = res.map((rs) => {
            let item = new BaseFeatureContextTenant(rs);
            return item;
          });
          this._features = rs;
        }
        return res;
      });
    return res;
  };

  GetContextsByTenantId = async (id: string): Promise<ContextDto[]> => {
    let res = await this._tenantRepositories
      .GetContextsByTenantId(id)
      .then((res) => {
        if (res) {
          let rs = res.map((rs) => {
            let item = new BaseContext(rs);
            return item;
          });
          this._contexts = rs;
        }
        return res;
      });
    return res;
  };

  CreateTenant = async (
    req: CreateTenantRequest
  ): Promise<ConversationIdResponse> => {
    let res = await this._tenantRepositories
      .PostCreateTenant(req)
      .then((res) => {
        return res;
      });
    return res;
  };

  DeleteTenant = async (id: string): Promise<ConversationIdResponse> => {
    let res = await this._tenantRepositories
      .PostDeleteTenant(id)
      .then((res) => {
        return res;
      });
    return res;
  };

  UpdateStorageConfiguration = async (
    id: string,
    req: UpdateStorageConfigurationRequest
  ): Promise<ConversationIdResponse> => {
    let res = await this._tenantRepositories
      .PostUpdateStorageConfiguration(id, req)
      .then((res) => {
        return res;
      });
    return res;
  };

  UpdateConfiguration = async (
    id: string,
    req: UpdateConfigurationRequest
  ): Promise<any> => {
    let res = await this._tenantRepositories
      .PostUpdateConfiguration(id, req)
      .then((res) => {
        return res;
      });
    return res;
  };

  UpdateTenant = async (
    id: string,
    req: UpdateTenantRequest
  ): Promise<ConversationIdResponse> => {
    let res = await this._tenantRepositories
      .PostUpdateTenant(id, req)
      .then((res) => {
        return res;
      });
    return res;
  };

  InitContextConfiguration = async (
    req: InitContextConfigurationRequest,
    id: string
  ): Promise<ConversationIdResponse> => {
    let res = await this._tenantRepositories
      .PostInitContextConfiguration(req, id)
      .then((res) => {
        return res;
      });
    return res;
  };

  GetContextDatabases = async (
    req: GetContextConfigurationRequest,
    id: string
  ): Promise<ConversationIdResponse> => {
    let res = await this._tenantRepositories
      .GetContextDatabases(id, req)
      .then((res) => {
        return res;
      });
    return res;
  };
  UpdateConfigurationgFeatures = async (
    id: string,
    req: IUpdateMultipleFeatureRequest
  ): Promise<ConversationIdResponse> => {
    let res = await this._tenantRepositories
      .PostConfigurationgFeatures(id, req)
      .then((res) => {
        return res;
      });
    return res;
  };
  UpdateConfigurationgContexts = async (
    id: string,
    req: IUpdateMultipleContextRequest
  ): Promise<ConversationIdResponse> => {
    let res = await this._tenantRepositories
      .PostConfigurationgContexts(id, req)
      .then((res) => {
        return res;
      });
    return res;
  };
}
