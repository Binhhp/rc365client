import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { UserStoreModel } from "src/entity/model/UserStoreModel";
import {
  GetUserTypes,
  IUserInfomations,
} from "src/ui/actions/model/UserActionModel";
import { ActUserTypeKeys } from "../actions/enums";

const OnHandleUpdateUserInfomation = (
  state: UserStoreModel,
  info: IUserInfomations
): UserStoreModel => {
  let copyState = state.Clone() as UserStoreModel;
  copyState.id = info.id;
  copyState.name = info.name;
  return copyState;
};
const OnHandleLoadingUser = (
  state: UserStoreModel,
  val: boolean
): UserStoreModel => {
  let copyState = state.Clone() as UserStoreModel;
  copyState.isLoading = val;
  return copyState;
};
const OnHandleUpdateOrg = (
  state: UserStoreModel,
  org: BaseOrganization
): UserStoreModel => {
  let copyState = state.Clone() as UserStoreModel;
  copyState.org = org;
  return copyState;
};
const user = (
  state = new UserStoreModel(),
  action: GetUserTypes
): UserStoreModel => {
  switch (action.type) {
    case ActUserTypeKeys.GET_ORGANIZATION_INFORMATION:
      return OnHandleUpdateUserInfomation(state, action.payload);
    case ActUserTypeKeys.START_GET_USER:
      return OnHandleLoadingUser(state, true);
    case ActUserTypeKeys.UPDATE_ORGANIZATION:
      return OnHandleUpdateOrg(state, action.payload);
    case ActUserTypeKeys.END_GET_USER:
      return OnHandleLoadingUser(state, false);
    default:
      return state;
  }
};

export default user;
