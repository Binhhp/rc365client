import { ICloneable } from "../interfaces";
import { IMinMaxLength } from "../interfaces/IMinMaxLength";

export class UserDto {
  name: string;
  displayName: string;
  email: string;
  jobTitle: string;
  office: string;
  officePhone: string;
  mobilePhone: string;
  faxNumber: string;
  streetAddress: string;
  stateOrProvince: string;
  city: string;
  countryOrRegion: string;
  zipOrPostalCode: string;
  department: string;
  organizationId: string;
  domain: string;
  id: string;
  adId: string;
  lastTimeSynchronize: string;
  parentId: string;
  sequenceNumber: number;
  version: number;
  isDeleted: boolean;
}

export class BaseUser implements ICloneable<BaseUser> {
  protected _name: string;
  protected _displayName: string;
  protected _email: string;
  protected _jobTitle: string;
  protected _office: string;
  protected _officePhone: string;
  protected _mobilePhone: string;
  protected _faxNumber: string;
  protected _streetAddress: string;
  protected _stateOrProvince: string;
  protected _city: string;
  protected _countryOrRegion: string;
  protected _zipOrPostalCode: string;
  protected _department: string;
  protected _organizationId: string;
  protected _domain: string;
  protected _id: string;
  protected _adId: string;
  protected _lastTimeSynchronize: string;
  protected _parentId: string;
  protected _sequenceNumber: number;
  protected _version: number;
  protected _isDeleted: boolean;
  constructor(dto?: UserDto) {
    if (dto) {
      this._name = dto.name || "";
      this._displayName = dto.displayName || "";
      this._email = dto.email || "";
      this._jobTitle = dto.jobTitle || "";
      this._office = dto.office || "";
      this._officePhone = dto.officePhone || "";
      this._mobilePhone = dto.mobilePhone || "";
      this._faxNumber = dto.faxNumber || "";
      this._streetAddress = dto.streetAddress || "";
      this._stateOrProvince = dto.stateOrProvince || "";
      this._city = dto.city || "";
      this._countryOrRegion = dto.countryOrRegion || "";
      this._zipOrPostalCode = dto.zipOrPostalCode || "";
      this._department = dto.department || "";
      this._organizationId = dto.organizationId || "";
      this._domain = dto.domain || "";
      this._id = dto.id || "";
      this._adId = dto.adId || "";
      this._lastTimeSynchronize = dto.lastTimeSynchronize || "";
      this._parentId = dto.parentId || "";
      this._sequenceNumber = dto.sequenceNumber || 0;
      this._version = dto.version || 0;
      this._isDeleted = dto.isDeleted || false;
    } else {
      this._name = "";
      this._displayName = "";
      this._email = "";
      this._jobTitle = "";
      this._office = "";
      this._officePhone = "";
      this._mobilePhone = "";
      this._faxNumber = "";
      this._streetAddress = "";
      this._stateOrProvince = "";
      this._city = "";
      this._countryOrRegion = "";
      this._zipOrPostalCode = "";
      this._department = "";
      this._organizationId = "";
      this._domain = "";
      this._id = "";
      this._adId = "";
      this._lastTimeSynchronize = "";
      this._parentId = "";
      this._sequenceNumber = 0;
      this._version = 0;
      this._isDeleted = false;
    }
  }
  public set isDeleted(v: boolean) {
    this._isDeleted = v;
  }
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  public set version(v: number) {
    this._version = v;
  }
  public get version(): number {
    return this._version;
  }
  public set sequenceNumber(v: number) {
    this._sequenceNumber = v;
  }
  public get sequenceNumber(): number {
    return this._sequenceNumber;
  }
  public set parentId(v: string) {
    this._parentId = v;
  }
  public get parentId(): string {
    return this._parentId;
  }
  public set lastTimeSynchronize(v: string) {
    this._lastTimeSynchronize = v;
  }
  public get lastTimeSynchronize(): string {
    return this._lastTimeSynchronize;
  }
  public set adId(v: string) {
    this._adId = v;
  }
  public get adId(): string {
    return this._adId;
  }
  public set displayName(v: string) {
    this._displayName = v;
  }
  public get displayName(): string {
    return this._displayName;
  }
  public set name(v: string) {
    this._name = v;
  }
  public get name(): string {
    return this._name;
  }
  public set domain(v: string) {
    this._domain = v;
  }
  public get domain(): string {
    return this._domain;
  }
  public set email(v: string) {
    this._email = v;
  }
  public get email(): string {
    return this._email;
  }
  public set jobTitle(v: string) {
    this._jobTitle = v;
  }
  public get jobTitle(): string {
    return this._jobTitle;
  }
  public set office(v: string) {
    this._office = v;
  }
  public get office(): string {
    return this._office;
  }
  public set officePhone(v: string) {
    this._officePhone = v;
  }
  public get officePhone(): string {
    return this._officePhone;
  }
  public set faxNumber(v: string) {
    this._faxNumber = v;
  }
  public get faxNumber(): string {
    return this._faxNumber;
  }
  public set streetAddress(v: string) {
    this._streetAddress = v;
  }
  public get streetAddress(): string {
    return this._streetAddress;
  }
  public set stateOrProvince(v: string) {
    this._stateOrProvince = v;
  }
  public get stateOrProvince(): string {
    return this._stateOrProvince;
  }
  public set zipOrPostalCode(v: string) {
    this._zipOrPostalCode = v;
  }
  public get zipOrPostalCode(): string {
    return this._zipOrPostalCode;
  }
  public set department(v: string) {
    this._department = v;
  }
  public get department(): string {
    return this._department;
  }
  public set mobilePhone(v: string) {
    this._mobilePhone = v;
  }
  public get mobilePhone(): string {
    return this._mobilePhone;
  }
  public set organizationId(v: string) {
    this._organizationId = v;
  }
  public get organizationId(): string {
    return this._organizationId;
  }
  public set id(v: string) {
    this._id = v;
  }
  public get id(): string {
    return this._id;
  }
  public set countryOrRegion(v: string) {
    this._countryOrRegion = v;
  }
  public get countryOrRegion(): string {
    return this._countryOrRegion;
  }
  public set city(v: string) {
    this._city = v;
  }
  public get city(): string {
    return this._city;
  }
  public Map(response: any, userId: string, organizationId: string):void {  
    this._name = response.name || "";
    this._displayName = response.displayName || "";
    this._email = response.email || "";
    if(response?.userProfile){
      this._jobTitle = response.userProfile.jobTitle || "";
      this._office = response.userProfile.office || "";
      this._officePhone = response.userProfile.officePhone || "";
      this._mobilePhone = response.userProfile.mobilePhone || "";
      this._faxNumber = response.userProfile.faxNumber || "";
      this._streetAddress = response.userProfile.streetAddress || "";
      this._stateOrProvince = response.userProfile.stateOrProvince || "";
      this._city = response.userProfile.city || "";
      this._countryOrRegion = response.userProfile.countryOrRegion || "";
      this._zipOrPostalCode = response.userProfile.zipOrPostalCode || "";
      this._department = response.userProfile.department || "";
    }
    this._organizationId = organizationId || "";
    this._domain = "";
    this._id = userId || "";
    if(response?.userAdInfo){
      this._adId = response.userAdInfo.adId || "";
      this._lastTimeSynchronize = response.userAdInfo.lastTimeSynchronize || "";
    }
    this._parentId = response.parentId || "";
    this._sequenceNumber = response.sequenceNumber || 0;
    this._version = response.version || 0;
    this._isDeleted = response.isDeleted || false;
  }
  public UpdateClassByKey = (key: string, value: any) => {
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
    return new BaseUser(resultTodo);
  };
  public IsHaveInvalidLengthField(
    exceptKeys?: string[],
    minmax?: IMinMaxLength[]
  ): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some((item) => {
      let max = 256;
      let min = 0;
      if (minmax) {
        let idx = minmax.findIndex((i) => i.key === item[0]);
        if (idx !== -1) {
          max = minmax[idx].max;
          min = minmax[idx].min!;
        }
      }
      let condition =
        typeof item[1] === "string" &&
        (item[1].trim().length > max || item[1].trim().length < min);
      if (exceptKeys) {
        condition =
          typeof item[1] === "string" &&
          (item[1].trim().length > max || item[1].trim().length < min) &&
          !exceptKeys.some((k) => k === item[0]);
      }
      return condition;
    });
  }
  Clone(): BaseUser {
    let dto = this.ToDto();
    return new BaseUser(dto);
  }
  ToDto(): UserDto {
    return {
      name: this._name,
      email: this._email,
      jobTitle: this._jobTitle,
      office: this._office,
      officePhone: this._officePhone,
      mobilePhone: this._mobilePhone,
      faxNumber: this._faxNumber,
      streetAddress: this._streetAddress,
      stateOrProvince: this._stateOrProvince,
      city: this._city,
      countryOrRegion: this._countryOrRegion,
      zipOrPostalCode: this._zipOrPostalCode,
      department: this._department,
      organizationId: this._organizationId,
      id: this._id,
      domain: this._domain,
      lastTimeSynchronize: this._lastTimeSynchronize,
      adId: this._adId,
      sequenceNumber: this._sequenceNumber,
      version: this._version,
      isDeleted: this._isDeleted,
      parentId: this._parentId,
      displayName: this._displayName,
    };
  }
}
