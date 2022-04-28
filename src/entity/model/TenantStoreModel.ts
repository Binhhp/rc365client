import { BaseContext } from "src/common/classes/BaseContext";
import {
  BaseFeatureContextTenant,
  BaseFeatureDescriptor,
} from "src/common/classes/BaseFeature";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { ICloneable } from "src/common/interfaces";
import { IContextDatabases } from "src/repositories/response/Tenants/TenantContextResponse";

export class TenantStoreModelDto {
  tenants: BaseTenant[];
  contexts: BaseContext[];
  features: BaseFeatureContextTenant[];
  selectedTenants: BaseTenant[];
  isDetailFeatureVisibled: boolean;
  sourceConfig: string;
  licences: string[];
  configurationType: string;
  workingTenants: BaseTenant;
  workingFeature: BaseFeatureContextTenant;
  workingContext: BaseContext;
  workingConfig: string;
  workingParameter: string;
  selectedFeatures: BaseFeatureContextTenant[];
  selectedContexts: BaseContext[];
  contextDatabases: IContextDatabases[];
  loggingConfig: string;
  tenantCId: string;
  tenantWId: string;
  contextKeys: string[];
}

export class TenantStoreModel implements ICloneable<TenantStoreModel> {
  protected _tenants: BaseTenant[];
  protected _contexts: BaseContext[];
  protected _selectedTenants: BaseTenant[];
  protected _features: BaseFeatureContextTenant[];
  protected _contextDatabases: IContextDatabases[];
  protected _workingTenants: BaseTenant;
  protected _workingFeature: BaseFeatureContextTenant;
  protected _isDetailFeatureVisibled: boolean;
  protected _workingConfig: string;
  protected _sourceConfig: string;
  protected _licences: string[];
  protected _configurationType: string;
  protected _loggingConfig: string;
  protected _workingParameter: string;
  protected _tenantCId: string;
  protected _tenantWId: string;
  protected _workingContext: BaseContext;
  protected _selectedContexts: BaseContext[];
  protected _selectedFeatures: BaseFeatureContextTenant[];
  protected _contextKeys: string[];
  constructor(dto?: TenantStoreModelDto) {
    if (dto) {
      this._contextKeys = dto.contextKeys || [];
      this._tenants = dto.tenants || [];
      this._features = dto.features || [];
      this._contexts = dto.contexts || [];
      this._selectedFeatures = dto.selectedFeatures || [];
      this._selectedContexts = dto.selectedContexts || [];
      this._isDetailFeatureVisibled = dto.isDetailFeatureVisibled || false;
      this._selectedTenants = dto.selectedTenants || [];
      this._workingTenants = dto.workingTenants || new BaseTenant();
      this._workingFeature = dto.workingFeature || new BaseFeatureDescriptor();
      this._workingConfig = dto.workingConfig || "";
      this._sourceConfig = dto.sourceConfig || "";
      this._configurationType = dto.configurationType || "";
      this._loggingConfig = dto.loggingConfig || "";
      this._workingParameter = dto.workingParameter || "";
      this._tenantCId = dto.tenantCId || "";
      this._tenantWId = dto.tenantWId || "";
      this._workingContext = dto.workingContext || new BaseContext();
      this._licences = dto.licences || [];
      this._contextDatabases = dto.contextDatabases || [];
    } else {
      this._tenants = [];
      this._features = [];
      this._contexts = [];
      this._selectedFeatures = [];
      this._selectedContexts = [];
      this._selectedTenants = [];
      this._isDetailFeatureVisibled = false;
      this._workingTenants = new BaseTenant();
      this._workingFeature = new BaseFeatureContextTenant();
      this._sourceConfig = "";
      this._configurationType = "";
      this._workingConfig = "";
      this._loggingConfig = "";
      this._workingParameter = "";
      this._tenantCId = "";
      this._tenantWId = "";
      this._licences = [];
      this._contextDatabases = [];
      this._workingContext = new BaseContext();
    }
  }
  public get contextKeys(): string[] {
    return this._contextKeys;
  }
  public set contextKeys(v: string[]) {
    this._contextKeys = v;
  }
  public get selectedFeatures(): BaseFeatureContextTenant[] {
    return this._selectedFeatures;
  }
  public set selectedFeatures(v: BaseFeatureContextTenant[]) {
    this._selectedFeatures = v;
  }
  public get contextDatabases(): IContextDatabases[] {
    return this._contextDatabases;
  }
  public set contextDatabases(v: IContextDatabases[]) {
    this._contextDatabases = v;
  }
  public get selectedContexts(): BaseContext[] {
    return this._selectedContexts;
  }
  public set selectedContexts(v: BaseContext[]) {
    this._selectedContexts = v;
  }
  public get workingContext(): BaseContext {
    return this._workingContext;
  }
  public set workingContext(v: BaseContext) {
    this._workingContext = v;
  }
  public get tenants(): BaseTenant[] {
    return this._tenants;
  }
  public set tenants(v: BaseTenant[]) {
    this._tenants = v;
  }
  public get licences(): string[] {
    return this._licences;
  }
  public set licences(v: string[]) {
    this._licences = v;
  }
  public get tenantCId(): string {
    return this._tenantCId;
  }
  public set tenantCId(v: string) {
    this._tenantCId = v;
  }
  public get tenantWId(): string {
    return this._tenantWId;
  }
  public set tenantWId(v: string) {
    this._tenantWId = v;
  }
  public get configurationType(): string {
    return this._configurationType;
  }
  public set configurationType(v: string) {
    this._configurationType = v;
  }
  public get loggingConfig(): string {
    return this._loggingConfig;
  }
  public set loggingConfig(v: string) {
    this._loggingConfig = v;
  }
  public get workingParameter(): string {
    return this._workingParameter;
  }
  public set workingParameter(v: string) {
    this._workingParameter = v;
  }
  public get workingConfig(): string {
    return this._workingConfig;
  }
  public set workingConfig(v: string) {
    this._workingConfig = v;
  }
  public get sourceConfig(): string {
    return this._sourceConfig;
  }
  public set sourceConfig(v: string) {
    this._sourceConfig = v;
  }
  public get workingFeature(): BaseFeatureContextTenant {
    return this._workingFeature;
  }
  public set workingFeature(v: BaseFeatureContextTenant) {
    this._workingFeature = v;
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
  public get isDetailFeatureVisibled(): boolean {
    return this._isDetailFeatureVisibled;
  }
  public set isDetailFeatureVisibled(v: boolean) {
    this._isDetailFeatureVisibled = v;
  }
  public get workingTenants(): BaseTenant {
    return this._workingTenants;
  }
  public set workingTenants(v: BaseTenant) {
    this._workingTenants = v;
  }
  public get selectedTenants(): BaseTenant[] {
    return this._selectedTenants;
  }
  public set selectedTenants(v: BaseTenant[]) {
    this._selectedTenants = v;
  }
  Clone(): TenantStoreModel {
    let dto = this.ToDto();
    return new TenantStoreModel(dto);
  }
  ToDto(): TenantStoreModelDto {
    return {
      tenants: this._tenants,
      selectedTenants: this._selectedTenants,
      workingContext: this._workingContext,
      sourceConfig: this._sourceConfig,
      workingTenants: this._workingTenants,
      workingFeature: this._workingFeature,
      isDetailFeatureVisibled: this._isDetailFeatureVisibled,
      workingConfig: this._workingConfig,
      licences: this._licences,
      configurationType: this._configurationType,
      loggingConfig: this._loggingConfig,
      features: this._features,
      contexts: this._contexts,
      workingParameter: this._workingParameter,
      selectedFeatures: this._selectedFeatures,
      selectedContexts: this._selectedContexts,
      contextDatabases: this._contextDatabases,
      tenantCId: this._tenantCId,
      tenantWId: this._tenantWId,
      contextKeys: this._contextKeys,
    };
  }
}
