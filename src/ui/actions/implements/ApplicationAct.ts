import { IDropdownOption } from "aod-dependencies/Dropdown";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { TypeConfirm, TypePanel, TypeView } from "src/entity/enums";
import { ActionApplicationTypeKeys } from "../enums";
import { ApplicationActionTypes } from "../model/ApplicationActionModel";

export class ApplicationReduxActionTS {
  public static UpdateLoadingSearchingAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_SEARCH_LOADING,
      payload: val,
    };
  };

  public static UpdateOrganizationDetailLoadingAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_ORGANIZATION_DETAIL_LOADING,
      payload: val,
    };
  };
  public static UpdateOrganizationListLoadingAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_ORGANIZATION_LIST_LOADING,
      payload: val,
    };
  };
  public static UpdateApplicationInfomationLoadingAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_APPLICATION_INFOMATION_LOADING,
      payload: val,
    };
  };
  public static UpdateApplicationTabLoadingAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_APPLICATION_TAB_LOADING,
      payload: val,
    };
  };
  public static UpdateSignalRLoadingAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_SIGNALR_MESSAGE,
      payload: val,
    };
  };
  public static UpdateSignalRConversations = (
    id: string
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_SIGNALR_CONVERSATION_ID,
      payload: id,
    };
  };
  public static UpdateSignalRWorkflowId = (
    id: string
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_SIGNALR_WORKFLOW_ID,
      payload: id,
    };
  };
  public static UpdateUserInfomationLoadingAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_USER_INFOMATION_LOADING,
      payload: val,
    };
  };
  public static UpdateConfirmCreateAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_CONFIRM_CREATE,
      payload: val,
    };
  };
  public static UpdateVisibleHeaderPanelAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_VISIBLE_HEADER_PANEL,
      payload: val,
    };
  };
  public static UpdateVisiblePagePanelAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_VISIBLE_PAGE_PANEL,
      payload: val,
    };
  };
  public static UpdateWorkingStatusAct = (
    val: boolean
  ): ApplicationActionTypes => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_WORKING_STATUS,
      payload: val,
    };
  };
  public static ResetApplicationStoreAct = () => {
    return {
      type: ActionApplicationTypeKeys.RESET_APPLICATION_STORE,
    };
  };
  public static UpdateIsSearchInPanelAct = (val: boolean) => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_SEARCH_IN_ORGANIZATON_PANEL,
      payload: val,
    };
  };
  public static UpdateLoadingFooterPanelAct = (val?: boolean) => {
    return {
      type: ActionApplicationTypeKeys.LOADING_FOOTER_PANEL,
      payload: val || false,
    };
  };
  public static UpdatePanelTypeAct = (type?: TypePanel) => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_PANEL_TYPE,
      payload: type || TypePanel.Null,
    };
  };
  public static UpdateConfirmType = (type: TypeConfirm) => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_CONFIRMT_TYPE,
      payload: type,
    };
  };
  public static StoreUpdateLocationSource = (locations: IDropdownOption[]) => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_LOCATION_SOURCE,
      payload: locations,
    };
  };
  public static StoreUpdateGalleryView = (type: TypeView) => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_GALLERY_VIEW,
      payload: type,
    };
  };
  public static UpdateSpecificTab = (tab?: string) => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_SPECIFIC_TAB,
      payload: tab || null,
    };
  };
  public static UpdateBreadCrumb = (nodes: INodes[]) => {
    return {
      type: ActionApplicationTypeKeys.UPDATE_BREADCRUM,
      payload: nodes,
    };
  };
}
