import { GetUserTypes, IUserInfomations } from "../model/UserActionModel";
import { ActUserTypeKeys } from "../enums";
import { BaseOrganization } from "src/common/classes/BaseOrganization";

export class UserReduxActionTS {
  public static onSaveUserInfoTS = (user: IUserInfomations): GetUserTypes => {
    return {
      type: ActUserTypeKeys.GET_ORGANIZATION_INFORMATION,
      payload: user,
    };
  };

  public static onStartLoadingUserInfoTS = (): GetUserTypes => {
    return {
      type: ActUserTypeKeys.START_GET_USER,
    };
  };
  public static onEndLoadingUserInfoTS = (): GetUserTypes => {
    return {
      type: ActUserTypeKeys.END_GET_USER,
    };
  };
  public static onUpdateOrganizationTS = (
    org: BaseOrganization
  ): GetUserTypes => {
    return {
      type: ActUserTypeKeys.UPDATE_ORGANIZATION,
      payload: org,
    };
  };
}
