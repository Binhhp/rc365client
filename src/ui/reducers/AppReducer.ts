import { IDropdownOption } from "aod-dependencies/Dropdown";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { TypeConfirm, TypePanel, TypeView } from "src/entity/enums";
import { ApplicationStoreModel } from "src/entity/model/ApplicationStoreModel";
import { ActionApplicationTypeKeys } from "../actions/enums";
import { ApplicationActionTypes } from "../actions/model/ApplicationActionModel";

const UpdateSearchLoading = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isSearchingLoading = val;
  return copyState;
};
const UpdateOrganizationDetailLoading = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isOrganizationDetailLoading = val;
  return copyState;
};
const UpdateOrganizationListLoading = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isOrganizationListLoading = val;
  return copyState;
};
const UpdateApplicationInfomationLoading = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isApplicationInfomationLoading = val;
  return copyState;
};
const UpdateApplicationTabLoading = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isApplicationTabLoading = val;
  return copyState;
};
const UpdateSignalRLoading = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isHaveMessageSignalR = val;
  return copyState;
};
const UpdateUserInfomationLoading = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isUserInfomationLoading = val;
  return copyState;
};
const UpdateConfirmCreate = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isConfirmCreate = val;
  return copyState;
};
const UpdateVisibleHeaderPanel = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isPanelHeaderOpen = val;
  return copyState;
};
const UpdateVisiblePagePanel = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isPanelPageOpen = val;
  return copyState;
};
const UpdateWorkingStatus = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isWorking = val;
  return copyState;
};
const ResetApplicationStore = (
  state: ApplicationStoreModel
): ApplicationStoreModel => {
  let copyState = new ApplicationStoreModel();
  copyState.nations = state.nations;
  copyState.breadCrumb = state.breadCrumb;
  copyState.isOrganizationDetailLoading = state.isOrganizationDetailLoading;
  return copyState;
};
const UpdateIsSearchInPanel = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isSearchInPanel = val;
  return copyState;
};
const UpdateLoadingFooterPanel = (
  state: ApplicationStoreModel,
  val: boolean
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.isLoadingFooterPanel = val;
  return copyState;
};
const UpdatePanelType = (
  state: ApplicationStoreModel,
  type: TypePanel
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.panelType = type;
  return copyState;
};
const UpdateLocationSource = (
  state: ApplicationStoreModel,
  options: IDropdownOption[]
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.nations = options;
  return copyState;
};
const UpdateGalleryView = (
  state: ApplicationStoreModel,
  type: TypeView
): ApplicationStoreModel => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.galleryView = type;
  return copyState;
};
const onHandleUpdateSpecificTab = (
  state: ApplicationStoreModel,
  tab: string | null
) => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.specificedTab = tab;
  return copyState;
};
const UpdateConfirmType = (state: ApplicationStoreModel, type: TypeConfirm) => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.confirmType = type;
  return copyState;
};
const UpdateBreadCrumb = (state: ApplicationStoreModel, nodes: INodes[]) => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.breadCrumb = nodes;
  return copyState;
};
const UpdateSignalRConversationId = (
  state: ApplicationStoreModel,
  id: string
) => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.signalRConversationId = id;
  return copyState;
};
const UpdateSignalRWorkflowId = (state: ApplicationStoreModel, id: string) => {
  let copyState = state.Clone() as ApplicationStoreModel;
  copyState.signalRWorkflowId = id;
  return copyState;
};
const ApplicationSetting = (
  state: ApplicationStoreModel = new ApplicationStoreModel(),
  action: ApplicationActionTypes
): ApplicationStoreModel => {
  switch (action.type) {
    case ActionApplicationTypeKeys.UPDATE_SEARCH_LOADING:
      return UpdateSearchLoading(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_BREADCRUM:
      return UpdateBreadCrumb(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_SIGNALR_CONVERSATION_ID:
      return UpdateSignalRConversationId(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_SIGNALR_WORKFLOW_ID:
      return UpdateSignalRWorkflowId(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_ORGANIZATION_DETAIL_LOADING:
      return UpdateOrganizationDetailLoading(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_ORGANIZATION_LIST_LOADING:
      return UpdateOrganizationListLoading(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_APPLICATION_INFOMATION_LOADING:
      return UpdateApplicationInfomationLoading(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_APPLICATION_TAB_LOADING:
      return UpdateApplicationTabLoading(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_SIGNALR_MESSAGE:
      return UpdateSignalRLoading(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_USER_INFOMATION_LOADING:
      return UpdateUserInfomationLoading(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_CONFIRM_CREATE:
      return UpdateConfirmCreate(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_VISIBLE_HEADER_PANEL:
      return UpdateVisibleHeaderPanel(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_VISIBLE_PAGE_PANEL:
      return UpdateVisiblePagePanel(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_WORKING_STATUS:
      return UpdateWorkingStatus(state, action.payload);
    case ActionApplicationTypeKeys.RESET_APPLICATION_STORE:
      return ResetApplicationStore(state);
    case ActionApplicationTypeKeys.UPDATE_SEARCH_IN_ORGANIZATON_PANEL:
      return UpdateIsSearchInPanel(state, action.payload);
    case ActionApplicationTypeKeys.LOADING_FOOTER_PANEL:
      return UpdateLoadingFooterPanel(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_PANEL_TYPE:
      return UpdatePanelType(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_CONFIRMT_TYPE:
      return UpdateConfirmType(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_LOCATION_SOURCE:
      return UpdateLocationSource(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_GALLERY_VIEW:
      return UpdateGalleryView(state, action.payload);
    case ActionApplicationTypeKeys.UPDATE_SPECIFIC_TAB:
      return onHandleUpdateSpecificTab(state, action.payload);
    default:
      return state;
  }
};

export default ApplicationSetting;
