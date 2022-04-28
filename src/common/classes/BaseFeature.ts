import { ICloneable } from "src/common/interfaces";

export class FeatureDescriptorDto {
  key: string;
  name: string;
  context: string;
  description: string;
}

export class FeatureContextTenantDto {
  featureName: string;
  description: string;
  contextKey: string;
  featureKey: string;
  version: string;
  isEnabled: boolean;
  configuration: string;
  isAlreadyHaveConfig: boolean;
}

export class BaseFeatureDescriptor
  implements ICloneable<BaseFeatureDescriptor>
{
  protected _key: string;
  protected _name: string;
  protected _context: string;
  protected _description: string;
  constructor(dto?: FeatureDescriptorDto) {
    if (dto) {
      this._name = dto.name || "";
      this._key = dto.key || "";
      this._context = dto.context || "";
      this._description = dto.description || "";
    } else {
      this._name = "";
      this._key = "";
      this._context = "";
      this._description = "";
    }
  }
  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }
  public get key(): string {
    return this._key;
  }

  public set key(v: string) {
    this._key = v;
  }
  public get context(): string {
    return this._context;
  }

  public set context(v: string) {
    this._context = v;
  }

  public get description(): string {
    return this._description;
  }

  public set description(v: string) {
    this._description = v;
  }

  Clone(): BaseFeatureDescriptor {
    let dto = this.ToDto();
    return new BaseFeatureDescriptor(dto);
  }
  ToDto(): FeatureDescriptorDto {
    return {
      name: this._name,
      description: this._description,
      key: this._key,
      context: this._context,
    };
  }
  UpdateByKey(key: string, value: string): BaseFeatureDescriptor {
    let thisStateDto = this.ToDto();
    let resultTodo = this.ToDto();
    Object.entries(thisStateDto).map((item) => {
      if (item[0] === key) {
        let itemKey = item[0];
        Object.assign(resultTodo, { [itemKey]: value });
        item[1] = value;
        return item;
      }
      return item;
    });
    return new BaseFeatureDescriptor(resultTodo);
  }
  isHaveEmpty(): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some((item) => item[1] === "");
  }
}

export class BaseFeatureContextTenant
  implements ICloneable<BaseFeatureContextTenant>
{
  protected _featureName: string;
  protected _description: string;
  protected _contextKey: string;
  protected _featureKey: string;
  protected _version: string;
  protected _isEnabled: boolean;
  protected _configuration: string;
  protected _isAlreadyHaveConfig: boolean;
  constructor(dto?: FeatureContextTenantDto) {
    if (dto) {
      this._featureName = dto.featureName || "";
      this._description = dto.description || "";
      this._contextKey = dto.contextKey || "";
      this._featureKey = dto.featureKey || "";
      this._version = dto.version || "";
      this._configuration = dto.configuration || "";
      this._isEnabled = dto.isEnabled || false;
      this._isAlreadyHaveConfig = dto.isAlreadyHaveConfig || false;
    } else {
      this._featureName = "";
      this._description = "";
      this._contextKey = "";
      this._featureKey = "";
      this._version = "";
      this._configuration = "";
      this._isEnabled = false;
      this._isAlreadyHaveConfig = false;
    }
  }
  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  public set isEnabled(v: boolean) {
    this._isEnabled = v;
  }

  public get isAlreadyHaveConfig(): boolean {
    return this._isAlreadyHaveConfig;
  }

  public set isAlreadyHaveConfig(v: boolean) {
    this._isAlreadyHaveConfig = v;
  }

  public get featureName(): string {
    return this._featureName;
  }

  public set featureName(v: string) {
    this._featureName = v;
  }

  public get description(): string {
    return this._description;
  }

  public set description(v: string) {
    this._description = v;
  }

  public get contextKey(): string {
    return this._contextKey;
  }

  public set contextKey(v: string) {
    this._contextKey = v;
  }

  public get featureKey(): string {
    return this._featureKey;
  }

  public set featureKey(v: string) {
    this._featureKey = v;
  }

  public get version(): string {
    return this._version;
  }

  public set version(v: string) {
    this._version = v;
  }
  public get configuration(): string {
    return this._configuration;
  }

  public set configuration(v: string) {
    this._configuration = v;
  }

  Clone(): BaseFeatureContextTenant {
    let dto = this.ToDto();
    return new BaseFeatureContextTenant(dto);
  }

  ToDto(): FeatureContextTenantDto {
    return {
      featureKey: this._featureKey,
      contextKey: this._contextKey,
      version: this._version,
      isEnabled: this._isEnabled,
      featureName: this._featureName,
      description: this._description,
      configuration: this._configuration,
      isAlreadyHaveConfig: this._isAlreadyHaveConfig,
    };
  }

  isHaveEmpty(): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some(
      (item) => typeof item[1] === "string" && item[1] === ""
    );
  }

  UpdateByKey(key: string, value: string): BaseFeatureContextTenant {
    let thisStateDto = this.ToDto();
    let resultTodo = this.ToDto();
    Object.entries(thisStateDto).map((item) => {
      if (item[0] === key) {
        let itemKey = item[0];
        Object.assign(resultTodo, { [itemKey]: value });
        item[1] = value;
        return item;
      }
      return item;
    });
    return new BaseFeatureContextTenant(resultTodo);
  }
}
