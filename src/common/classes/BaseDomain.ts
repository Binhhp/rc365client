import { ICloneable } from "src/common/interfaces";

export class DomainDto {
  name: string;
  guid: string;
}

export class BaseDomain implements ICloneable<BaseDomain> {
  protected _name: string;
  protected _guid: string;
  constructor(dto?: DomainDto) {
    if (dto) {
      this._name = dto.name || "";
      this._guid = dto.guid || "";
    } else {
      this._name = "";
      this._guid = "";
    }
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  public get guid(): string {
    return this._guid;
  }

  public set guid(v: string) {
    this._guid = v;
  }

  Clone(): BaseDomain {
    let dto = this.ToDto();
    return new BaseDomain(dto);
  }

  ToDto(): DomainDto {
    return {
      name: this._name,
      guid: this._guid,
    };
  }
}
