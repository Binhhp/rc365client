import { ICloneable } from "src/common/interfaces";
import { IMinMaxLength } from "../interfaces/IMinMaxLength";

export class OwnerDto {
  name: string;
  phoneNumber: string;
  email: string;
}

export class BaseOwner implements ICloneable<BaseOwner> {
  protected _name: string;
  protected _phoneNumber: string;
  protected _email: string;
  constructor(dto?: OwnerDto) {
    if (dto) {
      this._name = dto.name || "";
      this._phoneNumber = dto.phoneNumber || "";
      this._email = dto.email || "";
    } else {
      this._name = "";
      this._phoneNumber = "";
      this._email = "";
    }
  }
  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }
  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(v: string) {
    this._phoneNumber = v;
  }
  public get email(): string {
    return this._email;
  }

  public set email(v: string) {
    this._email = v;
  }
  Clone(): BaseOwner {
    let dto = this.ToDto();
    return new BaseOwner(dto);
  }
  ToDto(): OwnerDto {
    return {
      name: this._name,
      email: this._email,
      phoneNumber: this._phoneNumber,
    };
  }
  UpdateByKey(key: string, value: string): BaseOwner {
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
    return new BaseOwner(resultTodo);
  }
  isHaveEmpty(): boolean {
    let thisStateDto = this.ToDto();
    return Object.entries(thisStateDto).some((item) => item[1] === "");
  }
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
}
