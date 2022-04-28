import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import {
  ThemeEnums,
  TypeConfirm,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response";

export interface ISensorListProps {
  isPanelPageOpen?: boolean;
  isWorking?: boolean;
  theme?: ThemeEnums;
  workingTab?: TypeSensorTabs;
  workingListItems?: any[];
  sensor: BaseSensor;
  controller: BaseController;
  config: BaseSensorType;
  confirmType?: TypeConfirm;
  panelType?: TypePanel;
  OnHandleVisiblePanel?: (val: boolean) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateWorkingItems?: (items: any[]) => void;
  OnHandleUpdateWorkingItems?: (
    items: any[],
    workingTabs: TypeSensorTabs
  ) => void;
  OnUpdateEditSensor: (sensor: BaseSensor) => void;
  OnUpdateEditController: (controller: BaseController) => void;
  OnUpdateEditConfiguration: (config: BaseSensorType) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnResetSensorStore?: () => void;
  cId: string;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR?: boolean;
  OnUpdateSensorTS?: (
    sensor: BaseSensor,
    isDisconnect?: boolean
  ) => Promise<ConversationIdResponse>;
  OnUpdateSensorControllerTS?: (
    controller: BaseController
  ) => Promise<ConversationIdResponse>;
  OnUpdateSensorTypeTS?: (
    type: BaseSensorType
  ) => Promise<ConversationIdResponse>;
  OnUnregisterSensorTS?: (
    sensor: BaseSensor
  ) => Promise<ConversationIdResponse>;
  OnUnregisterSensorControllerTS?: (
    controller: BaseController
  ) => Promise<ConversationIdResponse>;
  OnUnregisterSensorTypeTS?: (
    type: BaseSensorType
  ) => Promise<ConversationIdResponse>;
}

export interface ISensorListStates {
  cId: string;
  workflowId: string;
}
