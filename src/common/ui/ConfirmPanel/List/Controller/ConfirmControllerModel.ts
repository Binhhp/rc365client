import { BaseController } from "src/common/classes/BaseController";
import { BaseResource } from "src/common/classes/BaseResource";
import { ThemeEnums } from "src/entity/enums";

export interface IConfirmControllerProps {
  index?: number;
  item?: BaseController;
  theme?: ThemeEnums;
  rcName?: string;
  resource?: BaseResource;
}
