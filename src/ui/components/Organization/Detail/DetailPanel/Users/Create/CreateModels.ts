import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseUser } from "src/common/classes/BaseUser";
import {
  TypeSearchList,
  TypeOfError,
  ThemeEnums,
  TypeConfirm,
} from "src/entity/enums";
import { UserStoreModel } from "src/entity/model/UserStoreModel";

export interface CreateNewProps {
  theme?: ThemeEnums;
  workingUsers?: BaseUser[];
  OnGetLazySeachingItems?(lazyUrl: string): Promise<any[]>;
  OnUpdateWorkingUsers?(users: BaseUser[]): Promise<void>;
  OnUpdateIsConfirmCreate?: (val: boolean) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateIsSearchInPanel?: (val: boolean) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  organizationInfomation?: BaseOrganization;
  confirmType?: TypeConfirm;
  isWorking?: boolean;
  isConfirmCreate?: boolean;
  isSearchInPanel?: boolean;
  isHaveMessageSignalR?: boolean;
  signalRConversationId?: string;
  signalRWorkflowId?: string;
  signalRData?: any;
  availableDomains?: BaseDomain[];
}

export interface CreateNewListState {
  users: BaseUser[];
  typingTimeout: number;
  searchingText: string;
  skipNumber: number;
  // isSearch: boolean;
  isSearching: boolean;
  typeList: TypeSearchList;
  isSomeUsersAlreadyAdded: boolean;
  sourceItems: BaseUser[];
  selectedItems: BaseUser[];
  prevItems: BaseUser[];
  removeItems: BaseUser[];
  isHaveInvalid: boolean;
  visibleText: string;
  numberImported: number;
}

export interface IArrayError {
  index: number;
  list: TypeOfError[];
}

export interface IErrorDetails {
  type: TypeOfError;
  index: number;
}

export interface IRenderListItemSearchProps {
  typeSearch: TypeSearchList;
  theme: string;
  searchingText: string;
  orgInfo?: UserStoreModel;
  selectedItems: BaseUser[];
  sourceItems: BaseUser[];
  onHandleSelectedItems?: (items: any[]) => void;
}
