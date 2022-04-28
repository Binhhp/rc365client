import { ICloneable } from "src/common/interfaces";
import { IMinMaxLength } from "../interfaces/IMinMaxLength";
import { GalleryItem } from "./GalleryItem";

export const OnHandleMapDataToBaseResource = (item: any): BaseResource => {
  let resource = new BaseResource();
  resource.capacity = item.capacity;
  resource.deadline = item.deadline;
  resource.deadlineMess = item.deadlineMess;
  resource.deadlineTime = item.deadlineTime;
  resource.department = item.department;
  resource.description = item.description;
  resource.displayName = item.displayName;
  resource.domain = item.domain;
  resource.email = item.email;
  resource.gallery = item.gallery;
  resource.id = item.id || item.guid;
  resource.location = item.location;
  resource.maxDelivery = item.maxDelivery;
  resource.minHours = item.minHours;
  resource.minHoursMess = item.minHoursMess;
  resource.name = item.name;
  resource.phone = item.phone;
  resource.resourceAdInfo = item.resourceAdInfo;
  resource.timeZone = item.timeZone;
  return resource;
};

export class ResourceDto {
  id: string;
  email: string;
  name: string;
  displayName: string;
  timeZone: string;
  location: string;
  phone: string;
  capacity: number;
  department: string;
  minHours: number;
  description: string;
  maxDelivery: number;
  deadline: string;
  deadlineTime: string;
  deadlineMess: string;
  minHoursMess: string;
  gallery: GalleryItem[];
  domain: string;
  resourceAdInfo: ResourceAdInfo;
}

export class ResourceAdInfo {
  adId: string;
  lastTimeSynchronize: string;
}

export class BaseResource implements ICloneable<BaseResource> {
  protected _id: string;
  protected _email: string;
  protected _name: string;
  protected _location: string;
  protected _phone: string;
  protected _capacity: number;
  protected _department: string;
  protected _minHours: number;
  protected _maxDelivery: number;
  protected _deadline: string;
  protected _deadlineTime: string;
  protected _deadlineMess: string;
  protected _minHoursMess: string;
  protected _displayName: string;
  protected _timeZone: string;
  protected _description: string;
  protected _gallery: GalleryItem[];
  protected _domain: string;
  protected _resourceAdInfo: ResourceAdInfo;
  constructor(dto?: ResourceDto) {
    if (dto) {
      this._id = dto.id || "";
      this._email = dto.email || "";
      this._name = dto.name || "";
      this._location = dto.location || "";
      this._phone = dto.phone || "";
      this._capacity = dto.capacity || 0;
      this._department = dto.department || "";
      this._minHours = dto.minHours || 0;
      this._maxDelivery = dto.maxDelivery || 0;
      this._deadline = dto.deadline || "";
      this._deadlineTime = dto.deadlineTime || "";
      this._deadlineMess = dto.deadlineMess || "";
      this._minHoursMess = dto.minHoursMess || "";
      this._displayName = dto.displayName || "";
      this._timeZone = dto.timeZone || "";
      this._description = dto.description || "";
      this._gallery = dto.gallery || [];
      this._domain = dto.domain || "";
      this._resourceAdInfo = dto.resourceAdInfo || new ResourceAdInfo();
    } else {
      this._id = "";
      this._email = "";
      this._name = "";
      this._location = "";
      this._phone = "";
      this._capacity = 0;
      this._department = "";
      this._minHours = 0;
      this._maxDelivery = 0;
      this._deadline = "";
      this._deadlineTime = "";
      this._displayName = "";
      this._deadlineMess = "";
      this._minHoursMess = "";
      this._displayName = "";
      this._timeZone = "";
      this._description = "";
      this._domain = "";
      this._resourceAdInfo = new ResourceAdInfo();
      this._gallery = [];
    }
  }
  public get resourceAdInfo(): ResourceAdInfo {
    return this._resourceAdInfo;
  }
  public set resourceAdInfo(v: ResourceAdInfo) {
    this._resourceAdInfo = v;
  }
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }
  public get displayName(): string {
    return this._displayName;
  }
  public set displayName(v: string) {
    this._displayName = v;
  }
  public get timeZone(): string {
    return this._timeZone;
  }
  public set timeZone(v: string) {
    this._timeZone = v;
  }
  public get domain(): string {
    return this._domain;
  }
  public set domain(v: string) {
    this._domain = v;
  }
  public get gallery(): GalleryItem[] {
    return this._gallery;
  }
  public set gallery(v: GalleryItem[]) {
    this._gallery = v;
  }
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
  }
  public get email(): string {
    return this._email;
  }
  public set email(v: string) {
    this._email = v;
  }
  public get location(): string {
    return this._location;
  }
  public set location(v: string) {
    this._location = v;
  }
  public get phone(): string {
    return this._phone;
  }
  public set phone(v: string) {
    this._phone = v;
  }
  public get capacity(): number {
    return this._capacity;
  }
  public set capacity(v: number) {
    this._capacity = v;
  }
  public get department(): string {
    return this._department;
  }
  public set department(v: string) {
    this._department = v;
  }
  public get minHours(): number {
    return this._minHours;
  }
  public set minHours(v: number) {
    this._minHours = v;
  }
  public get maxDelivery(): number {
    return this._maxDelivery;
  }
  public set maxDelivery(v: number) {
    this._maxDelivery = v;
  }
  public get deadline(): string {
    return this._deadline;
  }
  public set deadline(v: string) {
    this._deadline = v;
  }
  public get deadlineTime(): string {
    return this._deadlineTime;
  }
  public set deadlineTime(v: string) {
    this._deadlineTime = v;
  }
  public get deadlineMess(): string {
    return this._deadlineMess;
  }
  public set deadlineMess(v: string) {
    this._deadlineMess = v;
  }
  public get minHoursMess(): string {
    return this._minHoursMess;
  }
  public set minHoursMess(v: string) {
    this._minHoursMess = v;
  }

  Map = (response: any) => {
    this._id = response.id;
    this._email = response.email;
    this._name = response.name;
    this._location = response.location;
    this._phone = response.phone;
    this._capacity = response.capacity;
    this._department = response.department;
    this._minHours = response.minHours;
    this._maxDelivery = response.maxDelivery;
    this._deadline = response.deadline;
    this._deadlineTime = response.deadlineTime;
    this._deadlineMess = response.deadlineMess;
    this._minHoursMess = response.minHoursMess;
    this._displayName = response.displayName;
    this._timeZone = response.timeZone;
    this._description = response.description;
    this._gallery = response.gallery;
    this._domain = "";
    this._resourceAdInfo = response.resourceAdInfo;
  };

  UpdateClassByKey = (key: string, value: any) => {
    switch (key) {
      case "name":
        return (this._name = value);
      case "email":
        return (this._email = value);
      case "location":
        return (this._location = value);
      case "phone":
        return (this._phone = value);
      case "capacity":
      case "Capacity":
        return (this._capacity = value);
      case "department":
        return (this._department = value);
      case "minHours":
      case "MinHours":
        return (this._minHours = value);
      case "maxDelivery":
      case "MaxDelivery":
        return (this._maxDelivery = value);
      case "deadline":
        return (this._deadline = value);
      case "deadlineTime":
        return (this._deadlineTime = value);
      case "deadlineMess":
        return (this._deadlineMess = value);
      case "minHoursMess":
        return (this._minHoursMess = value);
      case "gallery":
        return (this._gallery = value);
      case "domain":
        return (this._domain = value);
      case "displayName":
        return (this._displayName = value);
      case "timeZone":
        return (this._timeZone = value);
      case "description":
        return (this._description = value);
      default:
        return;
    }
  };
  IsHaveInvalidLengthField(
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
  Clone(): BaseResource {
    let dto = this.ToDto();
    return new BaseResource(dto);
  }
  ToDto(): ResourceDto {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      location: this._location,
      phone: this._phone,
      capacity: this._capacity,
      department: this._department,
      minHours: this._minHours,
      maxDelivery: this._maxDelivery,
      deadline: this._deadline,
      deadlineTime: this._deadlineTime,
      deadlineMess: this._deadlineMess,
      minHoursMess: this._minHoursMess,
      gallery: this._gallery,
      domain: this._domain,
      displayName: this._displayName,
      timeZone: this._timeZone,
      description: this._description,
      resourceAdInfo: this._resourceAdInfo,
    };
  }
}
