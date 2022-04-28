import { BaseResource } from "src/common/classes/BaseResource";
import { ThemeEnums } from "src/entity/enums";

export interface IRenderListResourceProps {
  item: BaseResource;
  theme?: ThemeEnums;
  index: number;
  rcName?: string;
}

export interface IConfirmCreateResourceState {}
