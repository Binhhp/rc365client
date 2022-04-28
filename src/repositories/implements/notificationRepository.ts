import { ApiFromOData } from "../../common/constants/RootURL";
import { INotificationRepository } from "../interface";
import { FetchDataFromServer } from "../../common/functions";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";

export class NotificationRepository implements INotificationRepository {
  GetNotificationItemsFS = async (
    val: string = "details"
  ): Promise<NotificationItem[]> => {
    let response = await FetchDataFromServer({
      type: ApiFromOData.ODATA_API,
      endpoint: `notifications?$expand=${val}`,
    });
    return response.data as NotificationItem[];
  };
}
