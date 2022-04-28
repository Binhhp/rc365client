import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ActUserTypeKeys } from "../enums";

export interface IUserInfomations {
  id: string;
  name: string;
}
export interface GetUserInfoAct {
  type: typeof ActUserTypeKeys.GET_ORGANIZATION_INFORMATION;
  payload: IUserInfomations;
}
export interface StartGetUserAct {
  type: typeof ActUserTypeKeys.START_GET_USER;
}
export interface EndGetUserAct {
  type: typeof ActUserTypeKeys.END_GET_USER;
}
export interface UpdateORGAct {
  type: typeof ActUserTypeKeys.UPDATE_ORGANIZATION;
  payload: BaseOrganization;
}

export type GetUserTypes =
  | GetUserInfoAct
  | UpdateORGAct
  | StartGetUserAct
  | EndGetUserAct;
