import { BaseDomain } from "src/common/classes/BaseDomain";
import { NewErrorType } from "src/common/constants/ErrorTypes";
import { ThemeEnums, TypeConfirm } from "src/entity/enums";

export interface IGeneralProps {
  theme?: ThemeEnums;
  isWorking?: boolean;
  confirmType?: TypeConfirm;
  domain?: BaseDomain;
  onUpdateConfirmType?: (type: TypeConfirm) => void;
  onUpdateWorkingStatus?: (val: boolean) => void;
  onUpdateEditDomain?: (domain: BaseDomain) => void;
}

export interface IGeneralStates {
  domain: BaseDomain;
  error: NewErrorType | null;
}
