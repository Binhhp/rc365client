import { ReactElement } from "react";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";
import {
  ThemeEnums,
  TypeConfirm,
  TypePage,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";

export interface IConfirmChangesProps {
  theme?: ThemeEnums;
  content?: string;
  rcName?: string;
  isDisabled?: boolean;
  type?: TypeConfirm;
  workingTab?: TypePage | TypeSensorTabs;
  workingUsers?: BaseUser[];
  workingResources?: BaseResource[];
  workingGroups?: BaseGroup[];
  workingDomains?: BaseDomain[];
  panelType?: TypePanel;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  onHandleSubmit?: () => void;
  onHandleCancel?: () => void;
  children?: React.ReactNode;
}
