import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";

export interface ITenantDetailProps {
  theme?: ThemeEnums;
  rcName?: string;
  workingTenant?: BaseTenant;
  breadCrumb?: INodes[];
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  confirmType?: TypeConfirm;
  OnUpdatePanelVisible?: (val: boolean) => void;
  onHandleOpenPanel?: (val?: boolean) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnHandleUpdateBreadCrumb?: (node: INodes[]) => void;
  OnUpdateWorkingTenant?: (tenant: BaseTenant) => void;
}

export interface ITenantDetailStates {
  tenant: BaseTenant;
  isAssign: boolean;
  isRedirect: boolean;
}
