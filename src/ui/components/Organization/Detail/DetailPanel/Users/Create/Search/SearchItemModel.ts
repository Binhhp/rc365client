import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseUser } from "src/common/classes/BaseUser";
import { ThemeEnums, TypeSearchList } from "src/entity/enums";

export interface ISearchItemProps {
  typeSearch: TypeSearchList;
  theme?: ThemeEnums;
  searchingText: string;
  orgInfo?: BaseOrganization;
  selectedItems: BaseUser[];
  sourceItems: BaseUser[];
  removeItems: BaseUser[];
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR: boolean;
  signalRData?: any;
  onHandleSelectedItems: (items: any[]) => void;
  onHandleResetSignalRData?: () => void;
  onSetSignalRGetData: (data: string | string[]) => void;
}

export interface ISearchItemState {
  conversationId: string;
  workflowId: string;
  type: TypeSearchList;
  items?: any[];
  data: any[];
}
