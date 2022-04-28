import { BaseCalendar } from "src/common/classes/BaseCalendar";
import { BaseResource } from "src/common/classes/BaseResource";
import { ThemeEnums } from "src/entity/enums";

export interface ISynchronizedCalendarProps {
  theme?: ThemeEnums;
  resource?:BaseResource;
  isWorking?: boolean;
  workingCalendar?: BaseCalendar;
  isPanelPageOpen: boolean;
  signalRConversationId: string;
  isHaveMessageSignalR: boolean;
  OnUpdateVisiblePagePanel?: (val: boolean) => void;
  OnStartSync?: (id: string, rsId: string) => void;
  OnStopSync?: (id: string) => void;
}
export interface ISynchronizedCalendarStates {
  calendar: BaseCalendar;
}
