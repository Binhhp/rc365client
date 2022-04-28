import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ErrorFieldItem } from "src/common/functions/FieldValidate";
import { TypeConfirm } from "src/entity/enums";

export interface IOrganizationCreate {
  name: string;
  domain: string;
}

export interface ICreateOrganizationProps {
  theme?: string;
  onHandleVisiblePanel: (val?: boolean) => void;
  onGetWorkingStatus: (
    val: boolean,
    organization?: IOrganizationCreate
  ) => void;
  isWorkingOnCreate: boolean;
  isWorking?: boolean;
  isHaveMessageSignalR?: boolean;
  OnHandleCreateOrganization?: (name: string, domais: string[]) => Promise<any>;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  onGetFormValue: (name: string, domain: string) => void;
  name: string;
  domain: string;
  organizationList?: BaseOrganization[];
}

export interface ICreateOrganizationState {
  name: string;
  domain: string;
  errors: ErrorFieldItem[];
}
