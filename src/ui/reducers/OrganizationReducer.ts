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
import { OrganizationStoreModel } from "src/entity/model/OrganizationStoreModel";
import { OrgSyncUserResourceItem } from "src/repositories/response";
import { OrganizationTypeActEnum } from "../actions/enums";
import { OrganizationTypes } from "../actions/model/OrganiztionActionModel";

const onHandleOrganizationList = (
  state: OrganizationStoreModel,
  list: BaseOrganization[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.organizationList = list;
  return copyState;
};
const onHandleOrganizationInfomation = (
  state: OrganizationStoreModel,
  info: BaseOrganization
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.organizationInfomation = info;
  return copyState;
};
const onHandleWorkingCreateDomain = (
  state: OrganizationStoreModel,
  domains: BaseDomain[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingDomains = domains;
  return copyState;
};
const onHandleWorkingCreateUser = (
  state: OrganizationStoreModel,
  users: BaseUser[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingUsers = users;
  return copyState;
};

const onHandleWorkingCreateResource = (
  state: OrganizationStoreModel,
  resources: BaseResource[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingResources = resources;
  return copyState;
};
const onHandleWorkingCreateGroup = (
  state: OrganizationStoreModel,
  groups: BaseGroup[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingGroups = groups;
  return copyState;
};
const onHandleWorkingTab = (state: OrganizationStoreModel, tab: TypePage) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingTab = tab;
  return copyState;
};

const onHandleSelectedGalleryItems = (
  state: OrganizationStoreModel,
  items: GalleryItem[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.selectedGallery = items;
  return copyState;
};
const onHandleUploadItems = (
  state: OrganizationStoreModel,
  items: GalleryItem[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.uploadItems = items;
  return copyState;
};
const onHandleUpdateApplication = (
  state: OrganizationStoreModel,
  application: BaseApplication
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.application = application;
  return copyState;
};

const onHandleUpdateWorkingApplicationItems = (
  state: OrganizationStoreModel,
  items: OrgSyncUserResourceItem[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingAppItems = items;
  return copyState;
};
const onHandleUpdateWorkingEditTab = (
  state: OrganizationStoreModel,
  tab: WorkingEditTab
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingEditTab = tab;
  return copyState;
};
const onHandleUpdateAvailableDomains = (
  state: OrganizationStoreModel,
  domains: IDropdownOption[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.domainOptions = domains;
  return copyState;
};
const onHandleUpdateSignalRData = (
  state: OrganizationStoreModel,
  data: any
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.signalRData = data;
  return copyState;
};
const onHandleUpdateWorkingOrgItems = (
  state: OrganizationStoreModel,
  items: string[]
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingOrgItems = items;
  return copyState;
};
const onResetWorkingOrganizationStore = (state: OrganizationStoreModel) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.workingAppItems = [];
  copyState.workingOrgItems = [];
  copyState.workingDomains = [];
  copyState.workingUsers = [];
  copyState.workingResources = [];
  copyState.workingGroups = [];
  copyState.selectedGallery = [];
  copyState.uploadItems = [];
  copyState.user = new BaseUser();
  copyState.domain = new BaseDomain();
  copyState.resource = new BaseResource();
  copyState.group = new BaseGroup();
  return copyState;
};
const onHandleUpdateEditData = (
  state: OrganizationStoreModel,
  action: OrganizationTypes
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  switch (action.type) {
    case OrganizationTypeActEnum.UPDATE_EDIT_USER:
      copyState.user = action.payload;
      return copyState;
    case OrganizationTypeActEnum.UPDATE_EDIT_RESOURCE:
      copyState.resource = action.payload;
      return copyState;
    case OrganizationTypeActEnum.UPDATE_EDIT_DOMAIN:
      copyState.domain = action.payload;
      return copyState;
    case OrganizationTypeActEnum.UPDATE_EDIT_GROUP:
      copyState.group = action.payload;
      return copyState;
    default:
      return copyState;
  }
};
const onHandleReloadOrganization = (
  state: OrganizationStoreModel,
  isReload: any
) => {
  let copyState = state.Clone() as OrganizationStoreModel;
  copyState.isReload = isReload;
  return copyState;
};

const Organizations = (
  state: OrganizationStoreModel = new OrganizationStoreModel(),
  action: OrganizationTypes
): OrganizationStoreModel => {
  switch (action.type) {
    case OrganizationTypeActEnum.UPDATE_ORGANIZATION_LIST:
      return onHandleOrganizationList(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_ORGANIZATION_INFOMATION:
      return onHandleOrganizationInfomation(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_WORKING_CREATE_DOMAINS_LST:
      return onHandleWorkingCreateDomain(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_WORKING_CREATE_USER_LIST:
      return onHandleWorkingCreateUser(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_WORKING_CREATE_RESOURCE_LIST:
      return onHandleWorkingCreateResource(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_SIGNAL_R_DATA:
      return onHandleUpdateSignalRData(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_WORKING_CREATE_GROUP_LIST:
      return onHandleWorkingCreateGroup(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_WORKING_TAB:
      return onHandleWorkingTab(state, action.payload);
    case OrganizationTypeActEnum.RESET_ORGANIZATION_STORE:
      return onResetWorkingOrganizationStore(state);
    case OrganizationTypeActEnum.UPDATE_SELECTED_GALLERY_ITEM:
      return onHandleSelectedGalleryItems(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_UPLOAD_ITEM:
      return onHandleUploadItems(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_AVAILABLE_DOMAINS:
      return onHandleUpdateAvailableDomains(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_APPLICATION:
      return onHandleUpdateApplication(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_WORKING_APPLICATION_ITEMS:
      return onHandleUpdateWorkingApplicationItems(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_WORKING_ORGANIZATION_ITEMS:
      return onHandleUpdateWorkingOrgItems(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_WORKING_EDIT_TAB:
      return onHandleUpdateWorkingEditTab(state, action.payload);
    case OrganizationTypeActEnum.RELOAD_ORGANIZATION_LIST:
      return onHandleReloadOrganization(state, action.payload);
    case OrganizationTypeActEnum.UPDATE_EDIT_GROUP:
    case OrganizationTypeActEnum.UPDATE_EDIT_USER:
    case OrganizationTypeActEnum.UPDATE_EDIT_RESOURCE:
    case OrganizationTypeActEnum.UPDATE_EDIT_DOMAIN:
      return onHandleUpdateEditData(state, action);

    default:
      return state;
  }
};

export default Organizations;
