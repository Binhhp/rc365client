import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { ErrorFieldItem } from "src/common/functions/FieldValidate";
import { ThemeEnums, TypeOfError } from "src/entity/enums";

export interface IRenderFormStates {
  group: BaseGroup;
  isCollapsed: boolean;
  errors: ErrorFieldItem[];
}

export interface IRenderFormInputProps {
  index?: number;
  group: BaseGroup;
  workingGroups?: BaseGroup[];
  theme?: ThemeEnums;
  rcName?: string;
  isWorking?: boolean;
  isHaveInvalid?: boolean;
  domainOptions?: IDropdownOption[];
  OnGetFormData?: (group: BaseGroup, index?: number) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateWorkingGroup?: (groups: BaseGroup[]) => void;
  OnHandleRemove?: (index: number) => void;
}
