import { BaseResource } from "src/common/classes/BaseResource";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { ThemeEnums } from "src/entity/enums";

export interface IConfirmSensorProps {
  index?: number;
  item?: BaseSensor;
  theme?: ThemeEnums;
  rcName?: string;
  resource?: BaseResource;
}
