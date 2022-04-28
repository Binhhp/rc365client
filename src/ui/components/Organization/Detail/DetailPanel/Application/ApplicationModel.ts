import { BaseApplication } from "src/common/classes/BaseApplication";
import { ThemeEnums } from "src/entity/enums";

export interface IApplicationProps {
  isApplicationTabLoading?: boolean;
  theme?: ThemeEnums;
  OnUpdateApplicationInfomationTS?: (application: BaseApplication) => void;
}
