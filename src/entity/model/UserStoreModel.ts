import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ICloneable } from "src/common/interfaces";

export class UserStoreModelDto {
  id: string;
  name: string;
  isLoading: boolean;
  org: BaseOrganization;
}

export class UserStoreModel implements ICloneable<UserStoreModel> {
  protected _id: string;
  protected _name: string;
  protected _isLoading: boolean;
  protected _org: BaseOrganization;
  constructor(dto?: UserStoreModelDto) {
    if (dto) {
      this._id = dto.id;
      this._name = dto.name;
      this._isLoading = dto.isLoading;
      this._org = dto.org;
    } else {
      this._id = "";
      this._name = "";
      this._isLoading = true;
      this._org = new BaseOrganization();
    }
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
  public get org(): BaseOrganization {
    return this._org;
  }
  public set org(v: BaseOrganization) {
    this._org = v;
  }
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set isLoading(v: boolean) {
    this._isLoading = v;
  }
  Clone(): UserStoreModel {
    let dto = this.ToDto();
    return new UserStoreModel(dto);
  }
  ToDto(): UserStoreModelDto {
    return {
      id: this._id,
      name: this._name,
      isLoading: this._isLoading,
      org: this._org,
    };
  }
}
