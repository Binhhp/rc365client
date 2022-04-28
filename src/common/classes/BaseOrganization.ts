import { ICloneable } from "src/common/interfaces";

export class OrganizationDto {
  id: string;
  name: string;
  domain: string[];
  domainNumber: number;
  userNumber: number;
  groupNumber: number;
  resourceNumber: number;
  isDeleted: boolean;
  sequenceNumber: number;
  version: number;
}

export class BaseOrganization implements ICloneable<BaseOrganization> {
  protected _id: string;
  protected _name: string;
  protected _domain: string[];
  protected _domainNumber: number;
  protected _userNumber: number;
  protected _groupNumber: number;
  protected _resourceNumber: number;
  protected _sequenceNumber: number;
  protected _version: number;
  private _isDeleted: boolean = false;
  constructor(dto?: OrganizationDto) {
    if (dto) {
      this._id = dto.id;
      this._name = dto.name;
      this._domain = dto.domain || [];
      this._domainNumber = dto.domainNumber || 0;
      this._userNumber = dto.userNumber || 0;
      this._resourceNumber = dto.resourceNumber || 0;
      this._groupNumber = dto.groupNumber || 0;
      this._sequenceNumber = dto.sequenceNumber || 0;
      this._version = dto.version || 0;
      this._isDeleted = dto.isDeleted;
    } else {
      this._id = "";
      this._name = "";
      this._domain = [];
      this._domainNumber = 0;
      this._userNumber = 0;
      this._resourceNumber = 0;
      this._groupNumber = 0;
      this._sequenceNumber = 0;
      this._version = 0;
      this._isDeleted = false;
    }
  }
  public get sequenceNumber(): number {
    return this._sequenceNumber;
  }
  public get version(): number {
    return this._version;
  }
  public get domainNumber(): number {
    return this._domainNumber;
  }
  public get userNumber(): number {
    return this._userNumber;
  }
  public get resourceNumber(): number {
    return this._resourceNumber;
  }
  public get groupNumber(): number {
    return this._groupNumber;
  }
  public get id(): string {
    return this._id;
  }
  public get domain(): string[] {
    return this._domain;
  }
  public get name(): string {
    return this._name;
  }
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  public set id(v: string) {
    this._id = v;
  }
  public set domain(v: string[]) {
    this._domain = v;
  }
  public set name(v: string) {
    this._name = v;
  }
  public set domainNumber(v: number) {
    this._domainNumber = v;
  }
  public set sequenceNumber(v: number) {
    this._sequenceNumber = v;
  }
  public set version(v: number) {
    this._version = v;
  }
  public set userNumber(v: number) {
    this._userNumber = v;
  }
  public set resourceNumber(v: number) {
    this._resourceNumber = v;
  }
  public set groupNumber(v: number) {
    this._groupNumber = v;
  }
  public set isDeleted(v: boolean) {
    this._isDeleted = v;
  }
  Clone(): BaseOrganization {
    let dto = this.ToDto();
    return new BaseOrganization(dto);
  }
  ToDto(): OrganizationDto {
    return {
      id: this._id,
      name: this._name,
      isDeleted: this._isDeleted,
      domain: this._domain,
      groupNumber: this._groupNumber,
      resourceNumber: this._resourceNumber,
      domainNumber: this._domainNumber,
      userNumber: this._userNumber,
      sequenceNumber: this._sequenceNumber,
      version: this._version,
    };
  }
}
