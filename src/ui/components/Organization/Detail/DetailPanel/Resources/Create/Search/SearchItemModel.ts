import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { ThemeEnums, TypeSearchList } from "src/entity/enums";

export interface ISearchItemProps {
  typeSearch: TypeSearchList;
  theme?: ThemeEnums;
  searchingText: string;
  orgInfo?: BaseOrganization;
  selectedItems: BaseResource[];
  sourceItems: BaseResource[];
  removeItems: BaseResource[];
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR?: boolean;
  signalRData?: any;
  onHandleSelectedItems: (items: any[]) => void;
  onSetSignalRGetData: (data: string | string[]) => void;
}

export interface ISearchItemState {
  conversationId: string;
  workflowId: string;
  type: TypeSearchList;
  items?: any[];
  data: any[];
}
