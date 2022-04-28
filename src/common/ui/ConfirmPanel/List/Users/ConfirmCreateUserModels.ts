import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums } from "src/entity/enums";

export interface IRenderListUserProps {
  item: BaseUser;
  theme?: ThemeEnums;
  index: number;
  rcName?: string;
}
