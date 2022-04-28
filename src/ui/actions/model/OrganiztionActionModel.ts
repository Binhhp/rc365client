import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseApplication } from "src/common/classes/BaseApplication";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";
import { GalleryItem } from "src/common/classes/GalleryItem";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { TypePage } from "src/entity/enums";
import { OrganizationTypeActEnum } from "../enums";

export interface ActGetOrganizationListFS {
  type: typeof OrganizationTypeActEnum.UPDATE_ORGANIZATION_LIST;
  payload: BaseOrganization[];
}
export interface ActGetOrganizationInfomationFS {
  type: typeof OrganizationTypeActEnum.UPDATE_ORGANIZATION_INFOMATION;
  payload: BaseOrganization;
}
export interface ActUpdateWoringCreateDomainsFS {
  type: typeof OrganizationTypeActEnum.UPDATE_WORKING_CREATE_DOMAINS_LST;
  payload: BaseDomain[];
}
export interface ActUpdateSignalRData {
  type: typeof OrganizationTypeActEnum.UPDATE_SIGNAL_R_DATA;
  payload: any;
}
export interface ActUpdateWoringCreateUsersFS {
  type: typeof OrganizationTypeActEnum.UPDATE_WORKING_CREATE_USER_LIST;
  payload: BaseUser[];
}
export interface ActUpdateWoringCreateResourcesFS {
  type: typeof OrganizationTypeActEnum.UPDATE_WORKING_CREATE_RESOURCE_LIST;
  payload: BaseResource[];
}
export interface ActUpdateWoringTabFS {
  type: typeof OrganizationTypeActEnum.UPDATE_WORKING_TAB;
  payload: TypePage;
}
export interface ActResetOrganizationTS {
  type: typeof OrganizationTypeActEnum.RESET_ORGANIZATION_STORE;
}
export interface ActUpdateEditUserTS {
  type: typeof OrganizationTypeActEnum.UPDATE_EDIT_USER;
  payload: BaseUser;
}
export interface ActUpdateEditDomainTS {
  type: typeof OrganizationTypeActEnum.UPDATE_EDIT_DOMAIN;
  payload: BaseDomain;
}
export interface ActAvailableDomainsTS {
  type: typeof OrganizationTypeActEnum.UPDATE_AVAILABLE_DOMAINS;
  payload: IDropdownOption[];
}
export interface ActUpdateEditResourceTS {
  type: typeof OrganizationTypeActEnum.UPDATE_EDIT_RESOURCE;
  payload: BaseResource;
}
export interface ActUpdateSelectedGalleryItemTS {
  type: typeof OrganizationTypeActEnum.UPDATE_SELECTED_GALLERY_ITEM;
  payload: GalleryItem[];
}
export interface ActUpdateUploadItemsTS {
  type: typeof OrganizationTypeActEnum.UPDATE_UPLOAD_ITEM;
  payload: GalleryItem[];
}
export interface ActUpdateApplicationTS {
  type: typeof OrganizationTypeActEnum.UPDATE_APPLICATION;
  payload: BaseApplication;
}
export interface ActUpdateWorkingApplicationItemTS {
  type: typeof OrganizationTypeActEnum.UPDATE_WORKING_APPLICATION_ITEMS;
  payload: any[];
}
export interface ActUpdateWorkingOrgItemTS {
  type: typeof OrganizationTypeActEnum.UPDATE_WORKING_ORGANIZATION_ITEMS;
  payload: string[];
}
export interface ActUpdateWorkinGroupsTS {
  type: typeof OrganizationTypeActEnum.UPDATE_WORKING_CREATE_GROUP_LIST;
  payload: BaseGroup[];
}
export interface ActUpdateEditGroupTS {
  type: typeof OrganizationTypeActEnum.UPDATE_EDIT_GROUP;
  payload: BaseGroup;
}
export interface ActUpdateWorkingEditTabTS {
  type: typeof OrganizationTypeActEnum.UPDATE_WORKING_EDIT_TAB;
  payload: WorkingEditTab;
}
export interface ActReloadOrganizationTS {
  type: typeof OrganizationTypeActEnum.RELOAD_ORGANIZATION_LIST;
  payload: boolean;
}
export type OrganizationTypes =
  | ActReloadOrganizationTS
  | ActGetOrganizationListFS
  | ActUpdateWorkingEditTabTS
  | ActUpdateEditGroupTS
  | ActUpdateSignalRData
  | ActUpdateWorkinGroupsTS
  | ActUpdateWorkingOrgItemTS
  | ActUpdateEditUserTS
  | ActAvailableDomainsTS
  | ActUpdateWorkingApplicationItemTS
  | ActUpdateApplicationTS
  | ActUpdateSelectedGalleryItemTS
  | ActUpdateUploadItemsTS
  | ActUpdateEditDomainTS
  | ActUpdateEditResourceTS
  | ActResetOrganizationTS
  | ActUpdateWoringTabFS
  | ActUpdateWoringCreateUsersFS
  | ActUpdateWoringCreateResourcesFS
  | ActUpdateWoringCreateDomainsFS
  | ActGetOrganizationInfomationFS;
