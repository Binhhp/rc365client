import { ICloneable } from "src/common/interfaces";
import { TypeNotification } from "src/entity/enums";

export class DetailNotificationItem {
  title: string;
  detail?: string;
  notificationId: string;
  id: string;
}

export abstract class NotificationDto {
  id: string;
  type: TypeNotification;
  title: string;
  description: string;
  createdAt: string | Date;
  isReaded: boolean;
  messages: DetailNotificationItem[];
}

export class NotificationItem implements ICloneable<NotificationItem> {
  protected _id: string;
  protected _type: TypeNotification;
  protected _title: string;
  protected _description: string;
  protected _createdAt: string | Date;
  protected _details: DetailNotificationItem[];
  protected _isReaded: boolean;
  protected _messages: DetailNotificationItem[];

  constructor(dto?: NotificationDto) {
    if (dto) {
      this._id = dto.id || "";
      this._type = dto.type || "";
      this._title = dto.title || "";
      this._createdAt = dto.createdAt || "";
      this._description = dto.description || "";
      this._isReaded = dto.isReaded || false;
      this._messages = dto.messages || [];
    } else {
      this._id = "";
      this._type = TypeNotification.Message;
      this._title = "";
      this._createdAt = "";
      this._description = "";
      this._isReaded = false;
      this._details = [];
      this._messages = [];
    }
  }
  public get messages(): DetailNotificationItem[] {
    return this._messages;
  }
  public set messages(v: DetailNotificationItem[]) {
    this._messages = v;
  }
  public get isReaded(): boolean {
    return this._isReaded;
  }
  public set isReaded(v: boolean) {
    this._isReaded = v;
  }
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
  }
  public get type(): TypeNotification {
    return this._type;
  }
  public set type(v: TypeNotification) {
    this._type = v;
  }
  public get title(): string {
    return this._title;
  }
  public set title(v: string) {
    this._title = v;
  }
  public get createdAt(): string | Date {
    return this._createdAt;
  }
  public set createdAt(v: string | Date) {
    this._createdAt = v;
  }
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }
  public get details(): DetailNotificationItem[] {
    return this._details;
  }
  public set details(v: DetailNotificationItem[]) {
    this._details = v;
  }

  Clone(): NotificationItem {
    let dto = this.ToDto();
    return new NotificationItem(dto);
  }

  ToDto(): NotificationDto {
    return {
      id: this._id,
      messages: this._messages,
      title: this._title,
      type: this._type,
      isReaded: this._isReaded,
      description: this._description,
      createdAt: this._createdAt,
    };
  }
}
