import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";

export class SignalRSearchUserResponse {
  nextLink: string | null;
  searchUserResponse: BaseUser[];
}

export class SignalRSearchResourceResponse {
  nextLink: string | null;
  searchResourceResponse: BaseResource[];
}
export class SignalRSearchGroupResponse {
  nextLink: string | null;
  searchGroupResponse: BaseGroup[];
}
