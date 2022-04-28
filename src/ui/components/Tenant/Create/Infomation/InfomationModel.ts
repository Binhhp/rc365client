import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseOwner } from "src/common/classes/BaseOwner";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { ThemeEnums, TypeConfirm, TypeOfError } from "src/entity/enums";

export interface IInfomationProps {
  theme?: ThemeEnums;
  rcName?: string;
  domainOptions?: IDropdownOption[];
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  confirmType?: TypeConfirm;
  isAssign: boolean;
  workingTenant: BaseTenant;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdatePanelVisible?: (val: boolean) => void;
  onGetTenantData: (tenant: BaseTenant, isAssign: boolean) => void;
  OnCreateTenant?: (tenant: BaseTenant, isAssign: boolean) => void;
  OnUpdateTenantCId?: (str: string) => void;
  OnUpdateTenantWId?: (str: string) => void;
}

export interface IInfomationStates {
  isAssign: boolean;
  isRedirect: boolean;
  tenant: BaseTenant;
}
