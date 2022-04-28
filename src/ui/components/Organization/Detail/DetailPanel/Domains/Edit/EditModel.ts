import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ThemeEnums } from "src/entity/enums";

export interface IEditProps {
  theme?: ThemeEnums;
  org?: BaseOrganization;
  isWorking?: boolean;
  domain?: BaseDomain;
}

export interface IEditStates {
  crtTab: string;
}
