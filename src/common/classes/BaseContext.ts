import { ICloneable } from "src/common/interfaces";
import { FeatureContextTenantDto } from "./BaseFeature";

export class ContextDto {
  stogareConfiguration: string;
  contextKey: string;
  isInitialized: boolean;
  guid: string;
  isDeleted: boolean;
  features: FeatureContextTenantDto[];
}

export class BaseContext implements ICloneable<BaseContext> {
  protected _stogareConfiguration: string;
  protected _contextKey: string;
  protected _isInitialized: boolean;
  protected _guid: string;
  protected _isDeleted: boolean;
  protected _features: FeatureContextTenantDto[];
  constructor(dto?: ContextDto) {
    if (dto) {
      this._stogareConfiguration = dto.stogareConfiguration || "";
      this._contextKey = dto.contextKey || "";
      this._guid = dto.guid || "";
      this._isInitialized = dto.isInitialized || false;
      this._isDeleted = dto.isDeleted || false;
      this._features = dto.features || [];
    } else {
      this._stogareConfiguration = "";
      this._contextKey = "";
      this._guid = "";
      this._isInitialized = false;
      this._isDeleted = false;
      this._features = [];
    }
  }
  public get stogareConfiguration(): string {
    return this._stogareConfiguration;
  }
  public set stogareConfiguration(v: string) {
    this._stogareConfiguration = v;
  }
  public get contextKey(): string {
    return this._contextKey;
  }
  public set contextKey(v: string) {
    this._contextKey = v;
  }
  public get guid(): string {
    return this._guid;
  }
  public set guid(v: string) {
    this._guid = v;
  }
  public get isInitialized(): boolean {
    return this._isInitialized;
  }
  public set isInitialized(v: boolean) {
    this._isInitialized = v;
  }
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  public set isDeleted(v: boolean) {
    this._isDeleted = v;
  }
  public get features(): FeatureContextTenantDto[] {
    return this._features;
  }
  public set features(v: FeatureContextTenantDto[]) {
    this._features = v;
  }
  Clone(): BaseContext {
    let dto = this.ToDto();
    return new BaseContext(dto);
  }
  ToDto(): ContextDto {
    return {
      contextKey: this._contextKey,
      features: this._features,
      guid: this._guid,
      isDeleted: this._isDeleted,
      isInitialized: this._isInitialized,
      stogareConfiguration: this._stogareConfiguration,
    };
  }
  UpdateByKey(key: string, value: string): BaseContext {
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
    return new BaseContext(resultTodo);
  }
  isHaveEmpty(): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some(
      (item) => typeof item[1] === "string" && item[1] === ""
    );
  }
}
