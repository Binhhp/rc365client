import { BaseDomain } from "src/common/classes/BaseDomain";
import { ThemeEnums } from "src/entity/enums";

export interface IConfirmCreateDomainProps {
  index: number;
  item: BaseDomain;
  theme?: ThemeEnums;
  rcName?: string;
}
