import { IDropdownOption } from "aod-dependencies/Dropdown";
import { BaseApplication } from "src/common/classes/BaseApplication";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseUser } from "src/common/classes/BaseUser";
import { GalleryItem } from "src/common/classes/GalleryItem";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { UISettingKey } from "src/common/functions";
import { ICloneable } from "src/common/interfaces";
import { OrgSyncUserResourceItem } from "src/repositories/response";
import { TypePage } from "../enums";

export class OrganizationStoreModelDto {
  application: BaseApplication;
  domainOptions: IDropdownOption[];
  organizationList: BaseOrganization[];
  organizationInfomation: BaseOrganization;
  workingDomains: BaseDomain[];
  domain: BaseDomain;
  workingUsers: BaseUser[];
  user: BaseUser;
  workingResources: BaseResource[];
  resource: BaseResource;
  workingGroups: BaseGroup[];
  workingEditItems: BaseGroup[];
  group: BaseGroup;
  workingTab: TypePage;
  uploadItems: GalleryItem[];
  selectedGallery: GalleryItem[];
  workingAppItems: OrgSyncUserResourceItem[];
  workingOrgItems: string[];
  workingEditTab: WorkingEditTab;
  signalRData: any;
  isReload: boolean;
}

const mapStringToWorkingTab = (str: string): TypePage => {
  switch (str) {
    case "users":
      return TypePage.Users;
    case "resources":
      return TypePage.Resources;
    case "groups":
      return TypePage.Groups;
    default:
      return TypePage.Domains;
  }
};

const onGetWorkingTabFromLocalStorage = () => {
  let settings = localStorage.getItem("UISettings");
  if (settings) {
    let Obj = JSON.parse(settings);
    if (Array.isArray(Obj)) {
      let idxStorage = Obj.findIndex(
        (o) => o.name === UISettingKey.ORGANIZATION_LIST
      );
      if (idxStorage !== -1) {
        return mapStringToWorkingTab(Obj[idxStorage].workingTab);
      }
    }
  }
  return TypePage.Domains;
};

export class OrganizationStoreModel
  implements ICloneable<OrganizationStoreModel>
{
  protected _application: BaseApplication;
  protected _domainOptions: IDropdownOption[];
  protected _organizationList: BaseOrganization[];
  protected _organizationInfomation: BaseOrganization;
  protected _workingDomains: BaseDomain[];
  protected _domain: BaseDomain;
  protected _workingUsers: BaseUser[];
  protected _user: BaseUser;
  protected _workingResources: BaseResource[];
  protected _resource: BaseResource;
  protected _workingGroups: BaseGroup[];
  protected _group: BaseGroup;
  protected _workingTab: TypePage;
  protected _uploadItems: GalleryItem[];
  protected _selectedGallery: GalleryItem[];
  protected _workingAppItems: OrgSyncUserResourceItem[];
  protected _workingOrgItems: string[];
  protected _workingEditTab: WorkingEditTab;
  protected _workingEditItems: BaseGroup[];
  protected _signalRData: any;
  protected _isReload: boolean;
  constructor(dto?: OrganizationStoreModelDto) {
    if (dto) {
      this._organizationList = dto.organizationList;
      this._domainOptions = dto.domainOptions;
      this._organizationInfomation = dto.organizationInfomation;
      this._workingDomains = dto.workingDomains;
      this._domain = dto.domain;
      this._workingUsers = dto.workingUsers;
      this._user = dto.user;
      this._workingResources = dto.workingResources;
      this._resource = dto.resource;
      this._workingGroups = dto.workingGroups;
      this._group = dto.group;
      this._workingTab = dto.workingTab;
      this._uploadItems = dto.uploadItems;
      this._selectedGallery = dto.selectedGallery;
      this._application = dto.application;
      this._workingAppItems = dto.workingAppItems;
      this._workingOrgItems = dto.workingOrgItems;
      this._workingEditTab = dto.workingEditTab;
      this._workingEditItems = dto.workingEditItems;
      this._signalRData = dto.signalRData;
      this._isReload = dto.isReload;
    } else {
      this._organizationInfomation = new BaseOrganization();
      this._workingDomains = [];
      this._domainOptions = [];
      this._domain = new BaseDomain();
      this._workingUsers = [];
      this._user = new BaseUser();
      this._workingResources = [];
      this._resource = new BaseResource();
      this._workingGroups = [];
      this._group = new BaseGroup();
      this._workingTab = onGetWorkingTabFromLocalStorage();
      this._uploadItems = [];
      this._selectedGallery = [];
      this._workingAppItems = [];
      this._workingOrgItems = [];
      this._workingEditItems = [];
      this._application = new BaseApplication();
      this._workingEditTab = new WorkingEditTab();
      this._signalRData = null;
      this._isReload = false;
    }
  }
  public get signalRData(): any {
    return this._signalRData;
  }
  public set signalRData(v: any) {
    this._signalRData = v;
  }
  public get domainOptions(): IDropdownOption[] {
    return this._domainOptions;
  }
  public set domainOptions(v: IDropdownOption[]) {
    this._domainOptions = v;
  }
  public get workingEditTab(): WorkingEditTab {
    return this._workingEditTab;
  }
  public set workingEditTab(v: WorkingEditTab) {
    this._workingEditTab = v;
  }
  public get workingOrgItems(): any[] {
    return this._workingOrgItems;
  }
  public set workingOrgItems(v: any[]) {
    this._workingOrgItems = v;
  }
  public get workingEditItems(): BaseGroup[] {
    return this._workingEditItems;
  }
  public set workingEditItems(v: BaseGroup[]) {
    this._workingEditItems = v;
  }
  public get workingAppItems(): OrgSyncUserResourceItem[] {
    return this._workingAppItems;
  }
  public set workingAppItems(v: OrgSyncUserResourceItem[]) {
    this._workingAppItems = v;
  }
  public get application(): BaseApplication {
    return this._application;
  }
  public set application(v: BaseApplication) {
    this._application = v;
  }
  public get selectedGallery(): GalleryItem[] {
    return this._selectedGallery;
  }
  public set selectedGallery(v: GalleryItem[]) {
    this._selectedGallery = v;
  }
  public get uploadItems(): GalleryItem[] {
    return this._uploadItems;
  }
  public set uploadItems(v: GalleryItem[]) {
    this._uploadItems = v;
  }
  public get domain(): BaseDomain {
    return this._domain;
  }
  public set domain(v: BaseDomain) {
    this._domain = v;
  }
  public get user(): BaseUser {
    return this._user;
  }
  public set user(v: BaseUser) {
    this._user = v;
  }
  public get resource(): BaseResource {
    return this._resource;
  }
  public set resource(v: BaseResource) {
    this._resource = v;
  }
  public get workingTab(): TypePage {
    return this._workingTab;
  }
  public set workingTab(v: TypePage) {
    this._workingTab = v;
  }
  public get group(): BaseGroup {
    return this._group;
  }
  public set group(v: BaseGroup) {
    this._group = v;
  }
  public get workingGroups(): BaseGroup[] {
    return this._workingGroups;
  }
  public set workingGroups(v: BaseGroup[]) {
    this._workingGroups = v;
  }
  public get organizationList(): BaseOrganization[] {
    return this._organizationList;
  }
  public set organizationList(v: BaseOrganization[]) {
    this._organizationList = v;
  }
  public get organizationInfomation(): BaseOrganization {
    return this._organizationInfomation;
  }
  public set organizationInfomation(v: BaseOrganization) {
    this._organizationInfomation = v;
  }
  public get workingDomains(): BaseDomain[] {
    return this._workingDomains;
  }
  public set workingDomains(v: BaseDomain[]) {
    this._workingDomains = v;
  }
  public get workingUsers(): BaseUser[] {
    return this._workingUsers;
  }
  public set workingUsers(v: BaseUser[]) {
    this._workingUsers = v;
  }
  public get workingResources(): BaseResource[] {
    return this._workingResources;
  }
  public set workingResources(v: BaseResource[]) {
    this._workingResources = v;
  }
  public get isReload(): boolean {
    return this._isReload;
  }
  public set isReload(v: boolean) {
    this._isReload = v;
  }
  Clone(): OrganizationStoreModel {
    let dto = this.ToDto();
    return new OrganizationStoreModel(dto);
  }
  ToDto(): OrganizationStoreModelDto {
    return {
      signalRData: this._signalRData,
      workingEditTab: this._workingEditTab,
      workingEditItems: this._workingEditItems,
      organizationList: this._organizationList,
      organizationInfomation: this._organizationInfomation,
      workingDomains: this._workingDomains,
      workingUsers: this._workingUsers,
      workingResources: this._workingResources,
      workingGroups: this._workingGroups,
      domainOptions: this._domainOptions,
      workingTab: this._workingTab,
      user: this._user,
      domain: this._domain,
      resource: this._resource,
      group: this._group,
      uploadItems: this._uploadItems,
      selectedGallery: this._selectedGallery,
      application: this._application,
      workingAppItems: this._workingAppItems,
      workingOrgItems: this._workingOrgItems,
      isReload: this._isReload,
    };
  }
}
