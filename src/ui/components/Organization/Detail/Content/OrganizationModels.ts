import { TypeConfirm, TypePage, ThemeEnums, TypePanel } from "src/entity/enums";
import { BaseUser } from "src/common/classes/BaseUser";
import { BaseResource } from "src/common/classes/BaseResource";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { BaseGroup } from "src/common/classes/BaseGroup";
import {
  ConversationIdResponse,
  RegisterUserResponse,
  UnRegisterUserResponse,
} from "src/repositories/response";

export interface OrganizationState {
  selectedItems: any[];
  isPanelOpen: boolean;
  isConfirm: boolean;
  type: TypePage;
  items: any[];
  isAddingUsers: boolean;
  isSuccessUpdate: boolean;
  isDontHaveOrgId: boolean;
  isConfirmUserAction: TypeConfirm | null;
  currentType: TypePage;
  // isSomeUsersAlreadyAdded: boolean;
  conversationId: string;
  workflowId: string;
}

export interface OrganizationProps {
  theme?: ThemeEnums;
  organizationInfomation: BaseOrganization;
  isHaveMessageSignalR?: boolean;
  signalRConversationId?: string;
  panelType?: TypePanel;
  workingResources?: BaseResource[];
  workingDomains?: BaseDomain[];
  workingUsers?: BaseUser[];
  workingGroups?: BaseGroup[];
  workingTab?: TypePage;
  isConfirmCreate?: boolean;
  isPanelPageOpen?: boolean;
  isWorking?: boolean;
  isSearchInPanel?: boolean;
  isLoadingFooterPanel?: boolean;
  nations?: IDropdownOption[];
  workingOrgItems?: any[];
  confirmType?: TypeConfirm;
  breadCrumb?: INodes[];
  timeZones: IDropdownOption[];
  onHandleResetStoreUpdate?: () => void;
  OnHandleUpdateBreadCrumb?: (nodes: INodes[]) => void;
  onResetCreateDataTS?: () => void;
  onChangeResourceDataTS?: (resources: BaseResource) => void;
  OnGetOrganizationInfomationById: (id: string) => Promise<BaseOrganization>;
  OnRegistUserToServer: (
    id: string,
    users: BaseUser[]
  ) => Promise<RegisterUserResponse>;
  OnUnregistUserToServer?: (
    id: string,
    users: string[]
  ) => Promise<UnRegisterUserResponse>;
  OnUnregistGroupToServer?: (
    id: string,
    users: string[]
  ) => Promise<ConversationIdResponse>;
  OnUpdateWorkingTab: (tab: TypePage) => void;
  OnUpdateConfirmCreate: (val: boolean) => void;
  OnUpdateVisiblePagePanel: (val: boolean) => void;
  OnResetApplicationStore: () => void;
  OnSetLocationSourceTS: () => void;
  OnUpdatePanelType: (type: TypeConfirm) => void;
  OnUpdateWorkingOrgItems: (
    items: any[],
    workingOrgItems: BaseUser[],
    type: TypePage
  ) => void;
  OnRegisterGroupToServer: (
    id: string,
    groups: BaseGroup[]
  ) => Promise<ConversationIdResponse>;
  OnRegisterResourceToServer: (
    org: BaseOrganization,
    resources: BaseResource[],
    timeZones?: IDropdownOption[]
  ) => Promise<ConversationIdResponse>;
  OnUpdateWorkingStatus: (val: boolean) => void;
  OnGetDomains: (id: string) => void;
  OnRegisterDomainToServer?: (
    id: string,
    domains: BaseDomain[]
  ) => Promise<ConversationIdResponse>;
  OnUnregistResourceToServer?: (
    id: string,
    resources: string[]
  ) => Promise<any>;
  OnUnregistDomainToServer?: (
    id: string,
    domains: string[]
  ) => Promise<ConversationIdResponse>;
}

export interface RenderListProps {
  onGetItemsSelected: (items: any[]) => void;
  loadingList: boolean;
  typeList: TypePage;
  theme?: ThemeEnums;
  onFirstQueryItems?: (endpoint: string) => void;
  idUser: string;
  onChangeStatusPanelTS?: () => void;
  isSuccessUpdate: boolean;
  isPanelOrganizationOpen?: boolean;
  onChangeVisibleAddPanel: () => void;
  onHandleRerenderContentPivot?: () => void;
  ref?: any;
}
