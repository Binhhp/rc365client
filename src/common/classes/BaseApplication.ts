import { ICloneable } from "../interfaces";

export class ApplicationDto {
  appId: string;
  appSecret: string;
  tenantId: string;
}

export class BaseApplication implements ICloneable<BaseApplication> {
  protected _appId: string;
  protected _appSecret: string;
  protected _tenantId: string;
  constructor(dto?: ApplicationDto) {
    if (dto) {
      this._appId = dto.appId || "";
      this._appSecret = dto.appSecret || "";
      this._tenantId = dto.tenantId || "";
    } else {
      this._appId = "";
      this._appSecret = "";
      this._tenantId = "";
    }
  }
  public get appId(): string {
    return this._appId;
  }
  public set appId(v: string) {
    this._appId = v;
  }
  public get appSecret(): string {
    return this._appSecret;
  }
  public set appSecret(v: string) {
    this._appSecret = v;
  }
  public get tenantId(): string {
    return this._tenantId;
  }
  public set tenantId(v: string) {
    this._tenantId = v;
  }
  Clone(): BaseApplication {
    let dto = this.ToDto();
    return new BaseApplication(dto);
  }
  ToDto(): ApplicationDto {
    return {
      appSecret: this._appSecret,
      appId: this._appId,
      tenantId: this._tenantId,
    };
  }
  isHaveEmpty(): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some(
      (item) => typeof item[1] === "string" && item[1] === ""
    );
  }
}
