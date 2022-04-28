import { IDropdownOption } from "aod-dependencies/Dropdown";
import { ICloneable } from "src/common/interfaces";
import { TypeConfirm, TypePanel, TypeView } from "../enums";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";

export class ApplicationStoreModelDto {
  isSearchingLoading: boolean;
  isApplicationTabLoading: boolean;
  isOrganizationDetailLoading: boolean;
  isApplicationInfomationLoading: boolean;
  isUserInfomationLoading: boolean;
  isOrganizationListLoading: boolean;
  specificedTab: string | null;
  isConfirmCreate: boolean;
  isPanelHeaderOpen: boolean;
  isPanelPageOpen: boolean;
  isWorking: boolean;
  isSearchInPanel: boolean;
  isLoadingFooterPanel: boolean;
  panelType: TypePanel;
  confirmType: TypeConfirm;
  nations: IDropdownOption[];
  galleryView: TypeView;
  breadCrumb: INodes[];

  signalRConversationId: string;
  signalRWorkflowId: string;
  signalRSyncConversationId: string;
  isHaveMessageSignalR: boolean;
  isHaveMessageSyncSignalR: boolean;
  isOrgListLoading: boolean;
  isOrgDetailLoading: boolean;
  isEdtGroupLoading: boolean;
  isApplicationLoading: boolean;
}

export class ApplicationStoreModel
  implements ICloneable<ApplicationStoreModel>
{
  protected _isSearchingLoading: boolean;
  protected _isApplicationTabLoading: boolean;
  protected _isHaveMessageSignalR: boolean;
  protected _isHaveMessageSyncSignalR: boolean;
  protected _isOrganizationDetailLoading: boolean;
  protected _isApplicationInfomationLoading: boolean;
  protected _isUserInfomationLoading: boolean;
  protected _isOrganizationListLoading: boolean;
  protected _specificedTab: string | null;
  protected _isConfirmCreate: boolean;
  protected _isPanelHeaderOpen: boolean;
  protected _isPanelPageOpen: boolean;
  protected _isWorking: boolean;
  protected _isSearchInPanel: boolean;
  protected _isLoadingFooterPanel: boolean;
  protected _panelType: TypePanel;
  protected _confirmType: TypeConfirm;
  protected _nations: IDropdownOption[];
  protected _galleryView: TypeView;
  protected _breadCrumb: INodes[];

  protected _signalRConversationId: string;
  protected _signalRWorkflowId: string;
  protected _signalRSyncConversationId: string;
  protected _isOrgListLoading: boolean;
  protected _isOrgDetailLoading: boolean;
  protected _isEdtGroupLoading: boolean;
  protected _isApplicationLoading: boolean;
  constructor(dto?: ApplicationStoreModelDto) {
    if (dto) {
      this._isSearchingLoading = dto.isSearchingLoading;
      this._isApplicationTabLoading = dto.isApplicationTabLoading;
      this._isHaveMessageSyncSignalR = dto.isHaveMessageSyncSignalR;
      this._signalRSyncConversationId = dto.signalRSyncConversationId;
      this._signalRWorkflowId = dto.signalRWorkflowId;
      this._isHaveMessageSignalR = dto.isHaveMessageSignalR;
      this._isOrganizationDetailLoading = dto.isOrganizationDetailLoading;
      this._isApplicationInfomationLoading = dto.isApplicationInfomationLoading;
      this._isUserInfomationLoading = dto.isUserInfomationLoading;
      this._isOrganizationListLoading = dto.isOrganizationListLoading;
      this._specificedTab = dto.specificedTab;
      this._isConfirmCreate = dto.isConfirmCreate;
      this._isPanelPageOpen = dto.isPanelPageOpen;
      this._isPanelHeaderOpen = dto.isPanelHeaderOpen;
      this._isWorking = dto.isWorking;
      this._isSearchInPanel = dto.isSearchInPanel;
      this._isLoadingFooterPanel = dto.isLoadingFooterPanel;
      this._panelType = dto.panelType;
      this._confirmType = dto.confirmType;
      this._nations = dto.nations;
      this._galleryView = dto.galleryView;
      this._breadCrumb = dto.breadCrumb;
      this._isOrgListLoading = dto.isOrgListLoading;
      this._isOrgDetailLoading = dto.isOrgDetailLoading;
      this._isEdtGroupLoading = dto.isEdtGroupLoading;
      this._isApplicationLoading = dto.isApplicationLoading;
      this._signalRConversationId = dto.signalRConversationId;
    } else {
      this._isSearchingLoading = false;
      this._isApplicationTabLoading = false;
      this._isHaveMessageSignalR = false;
      this._isOrganizationDetailLoading = false;
      this._isApplicationInfomationLoading = false;
      this._isUserInfomationLoading = false;
      this._isConfirmCreate = false;
      this._specificedTab = null;
      this._isOrganizationListLoading = true;
      this._isPanelPageOpen = false;
      this._isPanelHeaderOpen = false;
      this._isWorking = false;
      this._isSearchInPanel = false;
      this._isLoadingFooterPanel = false;
      this._panelType = TypePanel.Null;
      this._confirmType = TypeConfirm.Null;
      this._nations = [];
      this._breadCrumb = [];
      this._galleryView = TypeView.Large;
      this._isOrgListLoading = false;
      this._isOrgDetailLoading = false;
      this._isEdtGroupLoading = false;
      this._isApplicationLoading = false;
      this._isHaveMessageSyncSignalR = false;
      this._signalRSyncConversationId = "";
      this._signalRWorkflowId = "";
      this._signalRConversationId = "";
    }
  }
  public get isHaveMessageSyncSignalR(): boolean {
    return this._isHaveMessageSyncSignalR;
  }
  public set isHaveMessageSyncSignalR(v: boolean) {
    this._isHaveMessageSyncSignalR = v;
  }
  public get signalRWorkflowId(): string {
    return this._signalRWorkflowId;
  }
  public set signalRWorkflowId(v: string) {
    this._signalRWorkflowId = v;
  }
  public get signalRSyncConversationId(): string {
    return this._signalRSyncConversationId;
  }
  public set signalRSyncConversationId(v: string) {
    this._signalRSyncConversationId = v;
  }
  public get signalRConversationId(): string {
    return this._signalRConversationId;
  }
  public set signalRConversationId(v: string) {
    this._signalRConversationId = v;
  }
  public get isApplicationLoading(): boolean {
    return this._isApplicationLoading;
  }
  public set isApplicationLoading(v: boolean) {
    this._isApplicationLoading = v;
  }
  public get isEdtGroupLoading(): boolean {
    return this._isEdtGroupLoading;
  }
  public set isEdtGroupLoading(v: boolean) {
    this._isEdtGroupLoading = v;
  }
  public get isOrgDetailLoading(): boolean {
    return this._isOrgDetailLoading;
  }
  public set isOrgDetailLoading(v: boolean) {
    this._isOrgDetailLoading = v;
  }
  public get isOrgListLoading(): boolean {
    return this._isOrgListLoading;
  }
  public set isOrgListLoading(v: boolean) {
    this._isOrgListLoading = v;
  }
  public get galleryView(): TypeView {
    return this._galleryView;
  }
  public set galleryView(v: TypeView) {
    this._galleryView = v;
  }
  public get nations(): IDropdownOption[] {
    return this._nations;
  }
  public set nations(v: IDropdownOption[]) {
    this._nations = v;
  }
  public get breadCrumb(): INodes[] {
    return this._breadCrumb;
  }
  public set breadCrumb(v: INodes[]) {
    this._breadCrumb = v;
  }
  public get confirmType(): TypeConfirm {
    return this._confirmType;
  }
  public set confirmType(v: TypeConfirm) {
    this._confirmType = v;
  }
  public get panelType(): TypePanel {
    return this._panelType;
  }
  public set panelType(v: TypePanel) {
    this._panelType = v;
  }
  public get isSearchInPanel(): boolean {
    return this._isSearchInPanel;
  }
  public set isSearchInPanel(v: boolean) {
    this._isSearchInPanel = v;
  }
  public get isLoadingFooterPanel(): boolean {
    return this._isLoadingFooterPanel;
  }
  public set isLoadingFooterPanel(v: boolean) {
    this._isLoadingFooterPanel = v;
  }
  public get isWorking(): boolean {
    return this._isWorking;
  }
  public set isWorking(v: boolean) {
    this._isWorking = v;
  }
  public get isPanelHeaderOpen(): boolean {
    return this._isPanelHeaderOpen;
  }
  public set isPanelHeaderOpen(v: boolean) {
    this._isPanelHeaderOpen = v;
  }
  public get isPanelPageOpen(): boolean {
    return this._isPanelPageOpen;
  }
  public set isPanelPageOpen(v: boolean) {
    this._isPanelPageOpen = v;
  }
  public get specificedTab(): string | null {
    return this._specificedTab;
  }
  public set specificedTab(v: string | null) {
    this._specificedTab = v;
  }
  public get isConfirmCreate(): boolean {
    return this._isConfirmCreate;
  }
  public set isConfirmCreate(v: boolean) {
    this._isConfirmCreate = v;
  }
  public get isSearchingLoading(): boolean {
    return this._isSearchingLoading;
  }
  public set isSearchingLoading(v: boolean) {
    this._isSearchingLoading = v;
  }
  public get isOrganizationDetailLoading(): boolean {
    return this._isOrganizationDetailLoading;
  }
  public set isOrganizationDetailLoading(v: boolean) {
    this._isOrganizationDetailLoading = v;
  }
  public get isApplicationInfomationLoading(): boolean {
    return this._isApplicationInfomationLoading;
  }
  public set isApplicationInfomationLoading(v: boolean) {
    this._isApplicationInfomationLoading = v;
  }
  public get isUserInfomationLoading(): boolean {
    return this._isUserInfomationLoading;
  }
  public set isUserInfomationLoading(v: boolean) {
    this._isUserInfomationLoading = v;
  }
  public get isHaveMessageSignalR(): boolean {
    return this._isHaveMessageSignalR;
  }
  public set isHaveMessageSignalR(v: boolean) {
    this._isHaveMessageSignalR = v;
  }
  public get isApplicationTabLoading(): boolean {
    return this._isApplicationTabLoading;
  }
  public set isApplicationTabLoading(v: boolean) {
    this._isApplicationTabLoading = v;
  }
  public get isOrganizationListLoading(): boolean {
    return this._isOrganizationListLoading;
  }
  public set isOrganizationListLoading(v: boolean) {
    this._isOrganizationListLoading = v;
  }
  Clone(): ApplicationStoreModel {
    let dto = this.ToDto();
    return new ApplicationStoreModel(dto);
  }
  ToDto(): ApplicationStoreModelDto {
    return {
      isSearchingLoading: this._isSearchingLoading,
      signalRWorkflowId: this._signalRWorkflowId,
      signalRConversationId: this._signalRConversationId,
      isHaveMessageSyncSignalR: this._isHaveMessageSyncSignalR,
      signalRSyncConversationId: this._signalRSyncConversationId,
      isApplicationTabLoading: this._isApplicationTabLoading,
      isHaveMessageSignalR: this._isHaveMessageSignalR,
      isOrganizationDetailLoading: this._isOrganizationDetailLoading,
      isApplicationInfomationLoading: this._isApplicationInfomationLoading,
      isUserInfomationLoading: this._isUserInfomationLoading,
      isOrganizationListLoading: this._isOrganizationListLoading,
      specificedTab: this._specificedTab,
      isConfirmCreate: this._isConfirmCreate,
      isPanelHeaderOpen: this._isPanelHeaderOpen,
      isPanelPageOpen: this._isPanelPageOpen,
      isWorking: this._isWorking,
      isSearchInPanel: this._isSearchInPanel,
      isLoadingFooterPanel: this._isLoadingFooterPanel,
      panelType: this._panelType,
      confirmType: this._confirmType,
      nations: this._nations,
      galleryView: this._galleryView,
      breadCrumb: this._breadCrumb,
      isOrgListLoading: this._isOrgListLoading,
      isOrgDetailLoading: this._isOrgDetailLoading,
      isEdtGroupLoading: this._isEdtGroupLoading,
      isApplicationLoading: this._isApplicationLoading,
    };
  }
}
