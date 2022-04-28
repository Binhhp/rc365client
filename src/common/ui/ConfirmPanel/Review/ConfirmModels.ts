import { BaseController } from "src/common/classes/BaseController";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { BaseUser } from "src/common/classes/BaseUser";
import {
  ThemeEnums,
  TypeConfirm,
  TypeConfirmContent,
  TypePage,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";

export interface ConfirmStepProps {
  confirmData?: BaseDomain[];
  theme?: ThemeEnums;
  typeConfirm?: TypeConfirmContent;
  onResetSignalRLoadingAct?: () => void;
  onHandleAction?: (val: boolean) => void;
  onSetTabSelectedListTS?: (val?: number) => void;
  workingTab?: TypePage;
  workingDomains?: BaseDomain[];
  workingResources?: BaseResource[];
  workingUsers?: BaseUser[];
  workingGroups?: BaseGroup[];
  domain?: BaseDomain;
  resource?: BaseResource;
  user?: BaseUser;
  group?: BaseGroup;
  sensor?: BaseSensor;
  controller?: BaseController;
  configuration?: BaseSensorType;
  type: TypeConfirm;
  sensorWorkingTab?: TypeSensorTabs;
  panelType?: TypePanel;
}

export interface RenderListGroupProps {
  item: BaseGroup;
  theme?: ThemeEnums;
  index: number;
}

export interface RenderListUserProps {
  item: BaseUser;
  theme?: ThemeEnums;
  index: number;
}
export interface RenderListResourceProps {
  item: BaseResource;
  theme?: ThemeEnums;
  index: number;
}
