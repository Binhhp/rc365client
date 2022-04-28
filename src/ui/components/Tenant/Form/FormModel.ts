import { BaseTenant } from "src/common/classes/BaseTenant";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";
import { ErrorFieldItem } from "src/common/functions/FieldValidate";

export interface IFormProps {
  theme?: ThemeEnums;
  rcName?: string;
  domainOptions?: IDropdownOption[];
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  confirmType?: TypeConfirm;
  isAllVisibled: boolean;
  isAssign?: boolean;
  workingTenant?: BaseTenant;
  licenceTypes?: string[];
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdatePanelVisible?: (val: boolean) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  onGetTenantData: (tenant: BaseTenant, isAssign: boolean) => void;
  OnCreateTenant?: (tenant: BaseTenant) => void;
  OnGetLicenceList?: () => Promise<string[]>;
}

export interface IFormStates {
  // isAssign: boolean;
  isRedirect: boolean;
  // isAllVisibled: boolean;
  tenant: BaseTenant;
  options: IDropdownOption[];
  errors: ErrorFieldItem[];
}

export enum TenantErrors {
  Choose = "choose",
}
export enum TypeOfErrorTenant {
  Name = "name",
  License = "email",
  Owner = "owner",
  Email = "email",
  Phone = "phone",
  Length = "length",
  Choose = "choose",
  Domain = "domain",
  Invalid = "invalid",
}
