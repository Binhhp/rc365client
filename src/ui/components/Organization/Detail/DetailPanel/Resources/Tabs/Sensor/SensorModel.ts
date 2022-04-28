import { ThemeEnums } from "src/entity/enums";
import {
  BaseController,
  ControllerDto,
} from "src/common/classes/BaseController";
import { BaseResource } from "src/common/classes/BaseResource";
import { SensorControllerResponse } from "src/repositories/response/Sensors/SensorControllerResponse";

export interface ISensorTabProps {
  theme?: ThemeEnums;
  controller?: BaseController;
  resource?: BaseResource;
  OnGetResourceSensorsById?: (id: string) => Promise<boolean>;
  OnGetControllerByResourceId?: (
    id: string
  ) => Promise<SensorControllerResponse[]>;
  OnUpdateWorkingTabSensor?: () => void;
  OnUpdateOccupationStatus?: (controller: BaseController, val: boolean) => void;
}

export interface ISensorTabStates {
  status: boolean;
  controller: BaseController;
  isRedirect: boolean;
  isHaveSensors: boolean;
}
