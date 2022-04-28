import { ICloneable } from "../interfaces";
import { IMinMaxLength } from "../interfaces/IMinMaxLength";

export class GroupDto {
  name: string;
  email: string;
  description: string;
  domain: string;
  isDeleted: boolean;
  parentId: string;
  sequenceNumber: number;
  version: number;
  id: string;
}

export class BaseGroup implements ICloneable<BaseGroup> {
  protected _name: string;
  protected _email: string;
  protected _description: string;
  protected _domain: string;
  protected _id: string;
  protected _isDeleted: boolean;
  protected _parentId: string;
  protected _sequenceNumber: number;
  protected _version: number;
  constructor(dto?: GroupDto) {
    if (dto) {
      this._id = dto.id || "";
      this._name = dto.name || "";
      this._email = dto.email || "";
      this._description = dto.description || "";
      this._isDeleted = dto.isDeleted || false;
      this._parentId = dto.parentId || "";
      this._sequenceNumber = dto.sequenceNumber || 0;
      this._version = dto.version || 0;
      this._domain = dto.domain || "";
    } else {
      this._id = "";
      this._name = "";
      this._email = "";
      this._description = "";
      this._domain = "";
      this._parentId = "";
      this._isDeleted = false;
      this._sequenceNumber = 0;
      this._version = 0;
    }
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
  public get parentId(): string {
    return this._parentId;
  }
  public set parentId(v: string) {
    this._parentId = v;
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
  public get domain(): string {
    return this._domain;
  }
  public set domain(v: string) {
    this._domain = v;
  }
  public get email(): string {
    return this._email;
  }
  public set email(v: string) {
    this._email = v;
  }
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }
  UpdateClassByKey(key: string, value: any): BaseGroup {
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
    return new BaseGroup(resultTodo);
  }

  Map = (response: any) => {
    this._id = response.id || "";
    this._name = response.name || "";
    this._email = response.email || "";
    this._description = response.description || "";
    this._isDeleted = response.isDeleted || false;
    this._parentId = response.parentId || "";
    this._sequenceNumber = response.sequenceNumber || 0;
    this._version = response.version || 0;
    this._domain = response.domain || "";
  }

  Clone(): BaseGroup {
    let dto = this.ToDto();
    return new BaseGroup(dto);
  }
  ToDto(): GroupDto {
    return {
      email: this._email,
      name: this._name,
      id: this._id,
      description: this._description,
      domain: this._domain,
      isDeleted: this._isDeleted,
      version: this._version,
      sequenceNumber: this._sequenceNumber,
      parentId: this._parentId,
    };
  }
  IsHaveInvalidLengthField(
    exceptKeys?: string[],
    minmax?: IMinMaxLength[]
  ): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some((item) => {
      let max = 256;
      if (minmax) {
        let idx = minmax.findIndex((i) => i.key === item[0]);
        if (idx !== -1) {
          max = minmax[idx].max;
        }
      }
      let condition =
        typeof item[1] === "string" && item[1].trim().length > max;
      if (exceptKeys) {
        condition =
          typeof item[1] === "string" &&
          item[1].trim().length > max &&
          !exceptKeys.some((k) => k === item[0]);
      }
      return condition;
    });
  }
}
