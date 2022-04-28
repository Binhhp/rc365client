import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseResource } from "src/common/classes/BaseResource";
import { ThemeEnums, TypeResourceForm } from "src/entity/enums";
import { ErrorFieldItem } from "src/common/functions/FieldValidate";

export interface IFormInputProps {
  theme?: ThemeEnums;
  index?: number;
  resource: BaseResource;
  isWorking?: boolean;
  workingResources?: BaseResource[];
  rcName?: string;
  OnGetFormData?: (resource: BaseResource, index?: number) => void;
  OnHandleRemove?: (index: number) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  type: TypeResourceForm;
  isHaveInvalid?: boolean;
  domainOptions?: IDropdownOption[];
  timeZones?: IDropdownOption[];
  numberImported?: number;
}

export interface IFormInputState {
  isExpandingOC: boolean;
  isCollapsed: boolean;
  resource: BaseResource;
  type: string;
  errors: ErrorFieldItem[];
}

export interface IDeadlineProps {
  theme?: ThemeEnums;
  onChangeResourceDataFieldTS: (key: string, value: string) => void;
  isWorking?: boolean;
  resource: BaseResource;
  rcName?: string;
}
