import { ICloneable } from "src/common/interfaces";
import { BaseFeatureDescriptor } from "./BaseFeature";
import { BaseOwner } from "./BaseOwner";

export class TenantDto {
  name: string;
  isDisposed: boolean;
  status: string;
  id: string;
  sequenceNumber: number;
  version: number;
  isDeleted: boolean;
  tenantInfo: BaseTenantInfomation;
}

export class TenantContextDto {
  contextKey: string;
  stogareConfiguration: string;
  isInitialized: boolean;
}

export class LicenceInfomationDto {
  licenceType: string;
  featureDescriptors: BaseFeatureDescriptor[];
}

export class TenantInfomationDto {
  name: string;
  owner: BaseOwner;
  licenceInfo: BaseLicenceInfomation;
}

export class BaseTenant implements ICloneable<BaseTenant> {
  protected _name: string;
  protected _isDisposed: boolean;
  protected _status: string;
  protected _id: string;
  protected _sequenceNumber: number;
  protected _version: number;
  protected _isDeleted: boolean;
  protected _tenantInfo: BaseTenantInfomation;
  constructor(dto?: TenantDto) {
    if (dto) {
      this._id = dto.id || "";
      this._name = dto.name || "";
      this._status = dto.status || "";
      this._sequenceNumber = dto.sequenceNumber || 0;
      this._version = dto.version || 0;
      this._isDeleted = dto.isDeleted || false;
      this._isDisposed = dto.isDisposed || false;
      this._tenantInfo = dto.tenantInfo || new BaseTenantInfomation();
    } else {
      this._id = "";
      this._name = "";
      this._status = "";
      this._sequenceNumber = 0;
      this._version = 0;
      this._isDeleted = false;
      this._isDisposed = false;
      this._tenantInfo = new BaseTenantInfomation();
    }
  }
  public get tenantInfo(): BaseTenantInfomation {
    return this._tenantInfo;
  }

  public set tenantInfo(v: BaseTenantInfomation) {
    this._tenantInfo = v;
  }

  public get isDisposed(): boolean {
    return this._isDisposed;
  }

  public set isDisposed(v: boolean) {
    this._isDisposed = v;
  }

  public get isDeleted(): boolean {
    return this._isDeleted;
  }

  public set isDeleted(v: boolean) {
    this._isDeleted = v;
  }
  public get version(): number {
    return this._version;
  }

  public set version(v: number) {
    this._version = v;
  }

  public get sequenceNumber(): number {
    return this._sequenceNumber;
  }

  public set sequenceNumber(v: number) {
    this._sequenceNumber = v;
  }

  public get status(): string {
    return this._status;
  }

  public set status(v: string) {
    this._status = v;
  }

  public get id(): string {
    return this._id;
  }

  public set id(v: string) {
    this._id = v;
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  Clone(): BaseTenant {
    let dto = this.ToDto();
    return new BaseTenant(dto);
  }

  ToDto(): TenantDto {
    return {
      name: this._name,
      isDeleted: this._isDeleted,
      id: this._id,
      status: this._status,
      sequenceNumber: this._sequenceNumber,
      version: this._version,
      isDisposed: this._isDisposed,
      tenantInfo: this._tenantInfo,
    };
  }

  UpdateByKey(key: string, value: string): BaseTenant {
    let ownerType = [
      "ownerEmail",
      "ownerName",
      "ownerPhoneNumber",
      "licenceType",
    ];
    let thisStateDto = this.ToDto();
    let resultTodo = this.ToDto();
    Object.entries(thisStateDto).map((item) => {
      if (item[0] === key && !ownerType.includes(key)) {
        let itemKey = item[0];
        Object.assign(resultTodo, { [itemKey]: value });
        item[1] = value;
        if (item[0] === "name") {
          this.tenantInfo.name = value;
        }
        return item;
      }
      if (ownerType.includes(key) && item[0] === "tenantInfo") {
        let infomation = item[1];
        switch (key) {
          case "ownerName":
            infomation.owner.name = value;
            break;
          case "ownerEmail":
            infomation.owner.email = value;
            break;
          case "ownerPhoneNumber":
            infomation.owner.phoneNumber = value;
            break;
          case "licenceType":
            infomation.licenceInfo.licenceType = value;
            break;
          default:
            break;
        }
        Object.assign(resultTodo, { tenantInfo: infomation });
        return item;
      }
      return item;
    });
    return new BaseTenant(resultTodo);
  }

  isHaveEmpty(isAssign: boolean): boolean {
    let licence = this.tenantInfo.licenceInfo.licenceType;
    let name = this.tenantInfo.name;
    let phone = this.tenantInfo.owner.phoneNumber;
    let arr: string[] = [];
    if (isAssign) {
      if (phone.trim() !== "" && (phone.length < 9 || phone.length > 16)) {
        return true;
      }
      arr = Object.entries(this.tenantInfo.owner).map((i) => {
        return i[1];
      });
      arr.push(name);
      arr.push(licence);
      return arr.some((i) => i.trim() === "" || i.trim().length > 256);
    }
    if (!isAssign) {
      arr = [name, licence];
      return arr.some((i) => i.trim() === "" || i.trim().length > 256);
    }
    return false;
  }
}

export class BaseLicenceInfomation
  implements ICloneable<BaseLicenceInfomation>
{
  protected _licenceType: string;
  protected _featureDescriptors: BaseFeatureDescriptor[];
  constructor(dto?: LicenceInfomationDto) {
    if (dto) {
      this._licenceType = dto.licenceType || "";
      this._featureDescriptors = dto.featureDescriptors || [];
    } else {
      this._licenceType = "";
      this._featureDescriptors = [];
    }
  }
  public get featureDescriptors(): BaseFeatureDescriptor[] {
    return this._featureDescriptors;
  }

  public set featureDescriptors(v: BaseFeatureDescriptor[]) {
    this._featureDescriptors = v;
  }
  public get licenceType(): string {
    return this._licenceType;
  }

  public set licenceType(v: string) {
    this._licenceType = v;
  }

  Clone(): BaseLicenceInfomation {
    let dto = this.ToDto();
    return new BaseLicenceInfomation(dto);
  }

  ToDto(): LicenceInfomationDto {
    return {
      licenceType: this._licenceType,
      featureDescriptors: this._featureDescriptors,
    };
  }
}

export class BaseTenantContext implements ICloneable<BaseTenantContext> {
  protected _contextKey: string;
  protected _stogareConfiguration: string;
  protected _isInitialized: boolean;
  constructor(dto?: TenantContextDto) {
    if (dto) {
      this._contextKey = dto.contextKey || "";
      this._stogareConfiguration = dto.stogareConfiguration || "";
      this._isInitialized = dto.isInitialized || false;
    } else {
      this._contextKey = "";
      this._stogareConfiguration = "";
      this._isInitialized = false;
    }
  }

  public get contextKey(): string {
    return this._contextKey;
  }

  public set contextKey(v: string) {
    this._contextKey = v;
  }

  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  public set isInitialized(v: boolean) {
    this._isInitialized = v;
  }

  public get stogareConfiguration(): string {
    return this._stogareConfiguration;
  }

  public set stogareConfiguration(v: string) {
    this._stogareConfiguration = v;
  }

  Clone(): BaseTenantContext {
    let dto = this.ToDto();
    return new BaseTenantContext(dto);
  }

  ToDto(): TenantContextDto {
    return {
      contextKey: this._contextKey,
      stogareConfiguration: this._stogareConfiguration,
      isInitialized: this._isInitialized,
    };
  }

  UpdateByKey(key: string, value: string): BaseTenantContext {
    let thisStateDto = this.ToDto();
    let resultTodo = this.ToDto();
    Object.entries(thisStateDto).map((item) => {
      if (item[0] === key) {
        let itemKey = item[0];
        Object.assign(resultTodo, { [itemKey]: value });
        console.log(resultTodo);
        item[1] = value;
        return item;
      }
      return item;
    });
    return new BaseTenantContext(resultTodo);
  }

  isHaveEmpty(): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some(
      (item) => typeof item[1] === "string" && item[1] === ""
    );
  }
}

export class BaseTenantInfomation implements ICloneable<BaseTenantInfomation> {
  protected _name: string;
  protected _owner: BaseOwner;
  protected _licenceInfo: BaseLicenceInfomation;
  constructor(dto?: TenantInfomationDto) {
    if (dto) {
      this._name = dto.name || "";
      this._owner = dto.owner || new BaseOwner();
      this._licenceInfo = dto.licenceInfo || new BaseLicenceInfomation();
    } else {
      this._name = "";
      this._owner = new BaseOwner();
      this._licenceInfo = new BaseLicenceInfomation();
    }
  }
  public get licenceInfo(): BaseLicenceInfomation {
    return this._licenceInfo;
  }

  public set licenceInfo(v: BaseLicenceInfomation) {
    this._licenceInfo = v;
  }

  public get owner(): BaseOwner {
    return this._owner;
  }

  public set owner(v: BaseOwner) {
    this._owner = v;
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  Clone(): BaseTenantInfomation {
    let dto = this.ToDto();
    return new BaseTenantInfomation(dto);
  }

  ToDto(): TenantInfomationDto {
    return {
      name: this._name,
      owner: this._owner,
      licenceInfo: this._licenceInfo,
    };
  }
}
