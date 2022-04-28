import { ThemeEnums, TypeConfirm, TypeSearchList } from "src/entity/enums";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseOrganization } from "src/common/classes/BaseOrganization";

export interface ICreateResourceProps {
  theme?: ThemeEnums;
  currentData?: BaseResource[];
  workingResources?: BaseResource[];
  organizationInfomation?: BaseOrganization;
  isWorking?: boolean;
  isConfirmCreate?: boolean;
  isSearchInPanel?: boolean;
  signalRWorkflowId?: string;
  OnGetDataResourcesFS?: (resources: BaseResource[]) => void;
  OnUpdateWorkingResource?: (resources: BaseResource[]) => Promise<void>;
  OnUpdateIsConfirmCreate?: (val: boolean) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdateIsSearchInPanel?: (val: boolean) => void;
}

export interface ICreateResourceState {
  isHaveInvalid: boolean;
  typeList: TypeSearchList;
  selectedItems: BaseResource[];
  sourceItems: BaseResource[];
  removeItems: BaseResource[];
  prevItems: BaseResource[];
  isSomeResourceAlreadyAdded: boolean;
  searchingText: string;
  visibleText: string;
  typingTimeout: number;
  isSearching: boolean;
  numberImported: number;
}
