import { ThemeEnums } from "src/entity/enums";
import { BaseResource } from "src/common/classes/BaseResource";

export interface IOrderTabProps {
  theme?: ThemeEnums;
  OnHandleUpdateResource?: (rs: BaseResource) => void;
  resource?: BaseResource;
}

export interface IOrderTabState {
  resource: BaseResource;
}
