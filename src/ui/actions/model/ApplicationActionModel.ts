import { IDropdownOption } from "aod-dependencies/Dropdown";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { TypeConfirm, TypePanel, TypeView } from "src/entity/enums";
import { ActionApplicationTypeKeys } from "../enums";

export interface UpdateLoadingTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_SEARCH_LOADING;
  payload: boolean;
}
export interface UpdateOrganizationDetailLoadingTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_ORGANIZATION_DETAIL_LOADING;
  payload: boolean;
}
export interface UpdateOrganizationListLoadingTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_ORGANIZATION_LIST_LOADING;
  payload: boolean;
}
export interface UpdateApplicationInfomationLoadingTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_APPLICATION_INFOMATION_LOADING;
  payload: boolean;
}
export interface UpdateApplicationTabLoadingTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_APPLICATION_TAB_LOADING;
  payload: boolean;
}
export interface UpdateSignalRLoadingTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_SIGNALR_MESSAGE;
  payload: boolean;
}
export interface UpdateUserInfomationLoadingTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_USER_INFOMATION_LOADING;
  payload: boolean;
}
export interface UpdateConfirmCreateTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_CONFIRM_CREATE;
  payload: boolean;
}
export interface UpdateVisibleHeaderPanelTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_VISIBLE_HEADER_PANEL;
  payload: boolean;
}
export interface UpdateVisiblePagePanelTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_VISIBLE_PAGE_PANEL;
  payload: boolean;
}
export interface UpdateWorkingStatusTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_WORKING_STATUS;
  payload: boolean;
}
export interface ResetApplicationTS {
  type: typeof ActionApplicationTypeKeys.RESET_APPLICATION_STORE;
}
export interface UpdateSearchInPanelTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_SEARCH_IN_ORGANIZATON_PANEL;
  payload: boolean;
}
export interface UpdateLoadingFooterPanelTS {
  type: typeof ActionApplicationTypeKeys.LOADING_FOOTER_PANEL;
  payload: boolean;
}
export interface UpdatePanelTypeTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_PANEL_TYPE;
  payload: TypePanel;
}

export interface ActUpdateConfirmTypeTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_CONFIRMT_TYPE;
  payload: TypeConfirm;
}
export interface ActUpdateLocationSourceTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_LOCATION_SOURCE;
  payload: IDropdownOption[];
}
export interface ActUpdateGalleryViewTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_GALLERY_VIEW;
  payload: TypeView;
}

export interface ActUpdateSpecificTabTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_SPECIFIC_TAB;
  payload: string | null;
}
export interface ActUpdateBreadCrumbTS {
  type: typeof ActionApplicationTypeKeys.UPDATE_BREADCRUM;
  payload: INodes[];
}
export interface ActUpdateSignalRConversationId {
  type: typeof ActionApplicationTypeKeys.UPDATE_SIGNALR_CONVERSATION_ID;
  payload: string;
}
export interface ActUpdateSignalRWorkflowId {
  type: typeof ActionApplicationTypeKeys.UPDATE_SIGNALR_WORKFLOW_ID;
  payload: string;
}
export interface ActUpdateSignalRLoading {
  type: typeof ActionApplicationTypeKeys.UPDATE_SIGNALR_LOADING_TYPE;
  payload: string;
  value: boolean;
}

export type ApplicationActionTypes =
  | UpdateLoadingTS
  | ActUpdateSignalRWorkflowId
  | ActUpdateSignalRConversationId
  | ActUpdateBreadCrumbTS
  | ActUpdateSpecificTabTS
  | ActUpdateGalleryViewTS
  | ActUpdateLocationSourceTS
  | ActUpdateConfirmTypeTS
  | UpdateLoadingFooterPanelTS
  | UpdatePanelTypeTS
  | UpdateSearchInPanelTS
  | ResetApplicationTS
  | UpdateWorkingStatusTS
  | UpdateVisibleHeaderPanelTS
  | UpdateVisiblePagePanelTS
  | UpdateConfirmCreateTS
  | UpdateSignalRLoadingTS
  | UpdateUserInfomationLoadingTS
  | UpdateOrganizationListLoadingTS
  | UpdateApplicationInfomationLoadingTS
  | UpdateApplicationTabLoadingTS
  | UpdateOrganizationDetailLoadingTS;
