import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { NewErrorType } from "src/common/constants/ErrorTypes";
import { TypeConfirm } from "src/entity/enums";

export interface CreateNewDomainState {
  domains: BaseDomain[];
  index: number;
  errors: ErrorOfDomain[];
  cId: string;
}

export interface ErrorOfDomain {
  index: number;
  error: NewErrorType;
}

export interface CreateNewDomainProps {
  theme?: string;
  organizationInfomation?: BaseOrganization;
  workingDomains?: BaseDomain[];
  isWorking?: boolean;
  isConfirmCreate?: boolean;
  confirmType?: TypeConfirm;
  OnStoreWorkingCreateDomains?: (domains: BaseDomain[]) => void;
  OnUpdateIsConfirmCreate?: (val: boolean) => Promise<void>;
  OnUpdateWorkingStatus?: (val: boolean) => Promise<void>;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
}
