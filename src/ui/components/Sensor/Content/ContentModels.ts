import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import {
  ThemeEnums,
  TypeConfirm,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { ConversationIdResponse } from "src/repositories/response";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { SensorTypeResponse } from "src/repositories/response/Sensors/SensorTypeResponse";
import { IDropdownOption } from "aod-dependencies/Dropdown";

export interface ISensorContentProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  isSearchInPanel?: boolean;
  workingTab?: TypeSensorTabs;
  workingListItem?: any[];
  confirmType?: TypeConfirm;
  sensorTypes?: any[];
  panelType?: TypePanel;
  configuration?: BaseSensorType;
  sensor?: BaseSensor;
  controller?: BaseController;
  orgInfo?: BaseOrganization;
  resource?: BaseResource;
  sensorTypeOpts?: IDropdownOption[];
  OnUpdateVisiblePagePanel?: (val: boolean) => void;
  OnUpdateWorkingTab?: (type: TypeSensorTabs) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnResetSensorStore?: () => void;
  OnUpdateBeardCrumb?: (nodes: INodes[]) => void;
  OnRegisterSensor?: (
    sensor: BaseSensor,
    resource?: BaseResource
  ) => Promise<ConversationIdResponse>;
  OnRegisterSensorController?: (
    controller: BaseController
  ) => Promise<ConversationIdResponse>;
  OnRegisterSensorType?: (
    type: BaseSensorType
  ) => Promise<ConversationIdResponse>;
  OnUpdateStoreController?: (controller: BaseController) => void;
  OnUpdateWorkingOrganization: (id: string) => Promise<any>;
  OnGetSensorType?: () => Promise<SensorTypeResponse[]>;
}

export interface ISensorContentStates {
  cId: string;
  isRedirect: boolean;
  isDisabled: boolean;
}
