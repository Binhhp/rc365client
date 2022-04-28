import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { ThemeEnums } from "src/entity/enums";

export interface IConfirmSensorProps {
  index?: number;
  item?: BaseSensorType;
  theme?: ThemeEnums;
  rcName?: string;
}
