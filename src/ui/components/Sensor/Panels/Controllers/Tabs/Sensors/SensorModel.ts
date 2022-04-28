import { BaseController } from "src/common/classes/BaseController";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { ThemeEnums, TypeSensorTabs } from "src/entity/enums";
import { ConversationIdResponse } from "src/repositories/response";

export interface ISensorTabProps {
  theme?: ThemeEnums;
  workingTab?: TypeSensorTabs;
  isWorking?: boolean;
  controller?: BaseController;
  isHaveMessageSignalR?: boolean;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnAddSensorToController?: (
    id: string,
    items: any[]
  ) => Promise<ConversationIdResponse>;
  OnRemoveSensorToController?: (
    id: string,
    items: any[]
  ) => Promise<ConversationIdResponse>;
}

export interface ISensorTabState {
  selectedItems: BaseSensor[];
  isConfirm: boolean;
  isSearch: boolean;
  text: string;
  workflowId: string;
  typingTimeout: number;
  isLoading: boolean;
  cId: string;
  confirmType: string;
  visibleText: string;
}
