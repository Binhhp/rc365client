import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ThemeEnums, TypeConfirm, TypeSearchList } from "src/entity/enums";

export interface CreateNewGroupProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  workingGroups?: BaseGroup[];
  organizationInfomation?: BaseOrganization;
  confirmType?: TypeConfirm;
  isSearchInPanel?: boolean;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdateWorkingGroups?: (group: BaseGroup[]) => void;
  OnUpdateIsSearchInPanel?: (val: boolean) => void;
}
export interface CreateNewGroupState {
  groups: BaseGroup[];
  isHaveInvalid: boolean;
  typeList: TypeSearchList;
  selectedItems: BaseGroup[];
  sourceItems: BaseGroup[];
  removeItems: BaseGroup[];
  prevItems: BaseGroup[];
  isSomeResourceAlreadyAdded: boolean;
  visibleText: string;
  searchingText: string;
  typingTimeout: number;
  isSearching: boolean;
}

export interface RenderFormState {
  data: BaseGroup;
  isCollapsed: boolean;
}

export interface IRenderFormInputProps {
  dataInput: (data: BaseGroup, index: number) => void;
  index: number;
  data: BaseGroup;
  onRemoveItem: (index: number) => void;
  groupsLength: number;
  theme?: ThemeEnums;
}
