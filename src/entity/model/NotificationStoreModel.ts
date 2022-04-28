import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { ICloneable } from "src/common/interfaces";

export class NotificationStoreModelDto {
  notifications: NotificationItem[];
  isLoading: boolean;
  isLoadingWorkflow: boolean;
  signalRGetData: string[];
}

export class NotificationStoreModel
  implements ICloneable<NotificationStoreModel>
{
  protected _notifications: NotificationItem[];
  protected _isLoading: boolean;
  protected _isLoadingWorkflow: boolean;
  protected _signalRGetData: string[];
  
  constructor(dto?: NotificationStoreModelDto) {
    if (dto) {
      this._isLoadingWorkflow = dto.isLoadingWorkflow;
      this._isLoading = dto.isLoading || false;
      this._notifications = dto.notifications || [];
      this._signalRGetData = dto.signalRGetData || [];
    } else {
      this._isLoadingWorkflow = false;
      this._isLoading = false;
      this._notifications = [];
      this._signalRGetData = [];
    }
  }

  public set signalRGetData(val: string[]) {
    this._signalRGetData = val;
  }
  public get signalRGetData():  string[] {
    return this._signalRGetData;
  }

  public get notifications(): NotificationItem[] {
    return this._notifications;
  }
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set notifications(newList: NotificationItem[]) {
    this._notifications = newList;
  }
  public set isLoading(val: boolean) {
    this._isLoading = val;
  }
  public get isLoadingWorkflow(): boolean {
    return this._isLoadingWorkflow;
  }
  public set isLoadingWorkflow(val: boolean) {
    this._isLoadingWorkflow = val;
  }
  Clone(): NotificationStoreModel {
    let dto = this.ToDto();
    return new NotificationStoreModel(dto);
  }
  ToDto(): NotificationStoreModelDto {
    return {
      notifications: this._notifications,
      isLoading: this._isLoading,
      isLoadingWorkflow: this._isLoadingWorkflow,
      signalRGetData: this._signalRGetData,
    };
  }
}
