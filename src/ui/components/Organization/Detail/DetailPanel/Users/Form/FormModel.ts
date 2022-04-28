import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseUser } from "src/common/classes/BaseUser";
import { ErrorFieldItem } from "src/common/functions/FieldValidate";
import { ThemeEnums, TypeConfirm, TypeOfError } from "src/entity/enums";

export interface IFormUserProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  isConfirmCreate?: boolean;
  confirmType?: TypeConfirm;
  user?: BaseUser;
  nations?: IDropdownOption[];
  rcName: string;
  workingUsers?: BaseUser[];
  index?: number;
  isHaveInvalid?: boolean;
  domainOptions?: IDropdownOption[];
  numberImported?: number;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateIsConfirm?: (val: boolean) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnGetFormData?: (user: BaseUser, index?: number) => void;
  OnHandleRemove?: (index: number) => void;
  onHandleChangeVisiblePanel?: () => void;
  onHandleConfirmChanges?: (type: TypeConfirm | null) => void;
}

export interface IFormUserState {
  isVisibledContacts: boolean;
  user: BaseUser;
  type: string;
  isCollapsed: boolean;
  isSelect: boolean;
  domainOptions: IDropdownOption[];
  selectedDomain: string;
  errors: ErrorFieldItem[];
}

export interface countryInterface {
  key: string;
  text: string;
}
