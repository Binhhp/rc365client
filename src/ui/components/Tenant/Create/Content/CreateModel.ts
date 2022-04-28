import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { BaseFeatureDescriptor } from "src/common/classes/BaseFeature";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { ThemeEnums } from "src/entity/enums";

export interface ICreateProps {
  theme?: ThemeEnums;
  breadCrumb?: INodes[];
  OnHandleUpdateBreadCrumb?: (node: INodes[]) => void;
  OnResetApplicationStore?: () => void;
  OnUpdateWorkingTenant?: (tenant: BaseTenant) => void;
}

export interface ICreateStates {
  crtTab: string;
  workingTenant: BaseTenant;
  isAssign: boolean;
}
