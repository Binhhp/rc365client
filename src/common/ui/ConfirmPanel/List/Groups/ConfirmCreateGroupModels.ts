import { BaseGroup } from "src/common/classes/BaseGroup";
import { ThemeEnums } from "src/entity/enums";

export interface IConfirmCreateDomainProps {
  theme?: ThemeEnums;
  item: BaseGroup;
  index: number;
  rcName?: string;
}

export interface IConfirmCreateDomainState {
  isCollapsed: boolean;
}
