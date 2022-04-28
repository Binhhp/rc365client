import { BaseGroup } from "src/common/classes/BaseGroup";
import { ThemeEnums, TypeConfirm, TypePanel } from "src/entity/enums";

export interface IGeneralProps {
  isWorking?: boolean;
  theme?: ThemeEnums;
  group: BaseGroup;
  loading?: boolean;
  OnUpdateGroup?: (group: BaseGroup) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdatePanelVisible?: (val: boolean, type: TypePanel) => void;
}
export interface IGeneralStates {
  group: BaseGroup;
}
