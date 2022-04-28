import { ThemeEnums } from "src/entity/enums";
import { BaseResource } from "src/common/classes/BaseResource";

export interface IGeneralTabProps {
  theme?: ThemeEnums;
  resource: BaseResource;
  ref?: any;
  loading?: boolean;
  OnHandleUpdateResource?: (rs: BaseResource) => void;
}
