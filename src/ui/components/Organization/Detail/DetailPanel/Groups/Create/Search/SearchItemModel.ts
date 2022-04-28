import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { ThemeEnums, TypeSearchList } from "src/entity/enums";

export interface ISearchItemProps {
  typeSearch: TypeSearchList;
  theme?: ThemeEnums;
  searchingText: string;
  orgInfo?: BaseOrganization;
  selectedItems: BaseGroup[];
  sourceItems: BaseGroup[];
  removeItems: BaseGroup[];
  onHandleSelectedItems: (items: any[]) => void;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  isHaveMessageSignalR?: boolean;
  signalRData?: any;
}

export interface ISearchItemState {
  conversationId: string;
  workflowId: string;
  type: TypeSearchList;
  items?: any[];
  data: any[];
}
