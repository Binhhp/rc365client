import { BaseUser } from "src/common/classes/BaseUser";

import {
  ThemeEnums,
  TypeConfirm,
  TypePanel,
} from "src/entity/enums";

export interface ProfileTabProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  confirmType?: TypeConfirm;
  user?: BaseUser;
  loading?: boolean;
  OnUpdateIsConfirm?: (val: boolean) => void;
  OnUpdateUser?: (user: BaseUser) => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdatePanelVisible?: (val: boolean, type: TypePanel) => void;
}

export interface countryInterface {
  key: string;
  text: string;
}
