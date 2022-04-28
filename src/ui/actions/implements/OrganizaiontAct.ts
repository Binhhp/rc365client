import { BaseApplication } from "src/common/classes/BaseApplication";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";
import { GalleryItem } from "src/common/classes/GalleryItem";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { TypePage } from "src/entity/enums";
import { OrgSyncUserResourceItem } from "src/repositories/response";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { OrganizationTypeActEnum } from "../enums";

let org = OrganizationManager.Instance;
export class OrganizationReduxAction {
  public static ReloadOrganizationList = (isReload: boolean) => {
    return {
      type: OrganizationTypeActEnum.RELOAD_ORGANIZATION_LIST,
      payload: isReload,
    };
  };
  public static StoreOrganizationsList = () => {
    let _organizationManager = OrganizationManager.Instance;
    return {
      type: OrganizationTypeActEnum.UPDATE_ORGANIZATION_LIST,
      payload: _organizationManager.OrganizationList,
    };
  };
  public static StoreOrganizationsInfomation = () => {
    let _organizationManager = OrganizationManager.Instance;
    return {
      type: OrganizationTypeActEnum.UPDATE_ORGANIZATION_INFOMATION,
      payload: _organizationManager.OrganizationInfomation,
    };
  };
  public static StoreUpdateWorkingCreateDomains = (domains: BaseDomain[]) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_WORKING_CREATE_DOMAINS_LST,
      payload: domains,
    };
  };
  public static StoreUpdateWorkingCreateUsers = (uers: BaseUser[]) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_WORKING_CREATE_USER_LIST,
      payload: uers,
    };
  };
  public static StoreUpdateWorkingCreateResources = (
    resources: BaseResource[]
  ) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_WORKING_CREATE_RESOURCE_LIST,
      payload: resources,
    };
  };
  public static StoreUpdateWorkingTab = (tab: TypePage) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_WORKING_TAB,
      payload: tab,
    };
  };
  public static StoreResetWorkingData = () => {
    return {
      type: OrganizationTypeActEnum.RESET_ORGANIZATION_STORE,
    };
  };
  public static StoreUpdateEditUser = (user: BaseUser) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_EDIT_USER,
      payload: user,
    };
  };
  public static StoreUpdateEditResource = (rs: BaseResource) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_EDIT_RESOURCE,
      payload: rs,
    };
  };
  public static StoreUpdateEditDomain = (domain: BaseDomain) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_EDIT_DOMAIN,
      payload: domain,
    };
  };
  public static StoreSelectedGalleryItem = (items?: GalleryItem[]) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_SELECTED_GALLERY_ITEM,
      payload: items || [],
    };
  };
  public static StoreUploadItems = (gallery?: GalleryItem[]) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_UPLOAD_ITEM,
      payload: gallery || [],
    };
  };
  public static StoreUpdateApplication = (application: BaseApplication) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_APPLICATION,
      payload: application,
    };
  };
  public static StoreUpdateWorkingApplicationItems = (
    items: OrgSyncUserResourceItem[]
  ) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_WORKING_APPLICATION_ITEMS,
      payload: items,
    };
  };
  public static StoreUpdateWorkingOrgItems = (items: string[]) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_WORKING_ORGANIZATION_ITEMS,
      payload: items,
    };
  };
  public static StoreUpdateWorkingGroups = (groups: BaseGroup[]) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_WORKING_CREATE_GROUP_LIST,
      payload: groups,
    };
  };
  public static StoreUpdateEditGroup = (group: BaseGroup) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_EDIT_GROUP,
      payload: group,
    };
  };

  public static StoreChangeLoadingOrganizatonList = () => {
    return {
      type: OrganizationTypeActEnum.UPDATE_LOADING_GET_ORGANIZATION_LIST,
    };
  };
  public static StoreUpdateWorkingEditTab = (tab: WorkingEditTab) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_WORKING_EDIT_TAB,
      payload: tab,
    };
  };
  public static StoreUpdateSignalRData = (data: any) => {
    return {
      type: OrganizationTypeActEnum.UPDATE_SIGNAL_R_DATA,
      payload: data,
    };
  };
  public static StoreUpdateAvailableDomains = () => {
    return {
      type: OrganizationTypeActEnum.UPDATE_AVAILABLE_DOMAINS,
      payload: org.domainOptions,
    };
  };
}
