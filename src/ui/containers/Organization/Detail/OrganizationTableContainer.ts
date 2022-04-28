import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import List from "src/ui/components/Organization/Detail/Content/List";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { TypeConfirm, TypePage, TypePanel } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { BaseUser } from "src/common/classes/BaseUser";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BaseResource } from "src/common/classes/BaseResource";
import {
  SynchronizeUserInfomation,
  UnRegisterUsersRequest,
  UpdateUserRequest,
} from "src/repositories/request";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import {
  UnRegisterUserResponse,
  ConversationIdResponse,
} from "src/repositories/response";
import { UpdateGroupResponse } from "src/repositories/response";
import {
  SynchronizeResourceInfomation,
  UnregisterResourceRequest,
  UpdateResourceRequest,
} from "src/repositories/request";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { TimeFunction } from "src/common/functions";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    isConfirmCreate: state.AppReducer.isConfirmCreate,
    workingTab: state.Organization.workingTab,
    specificedTab: state.AppReducer.specificedTab,
    isOrganizationListLoading: state.AppReducer.isOrganizationListLoading,
    isOrganizationDetailLoading: state.AppReducer.isOrganizationDetailLoading,
    isPanelPageOpen: state.AppReducer.isPanelPageOpen,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    organizationInfomation: state.Organization.organizationInfomation,
    confirmType: state.AppReducer.confirmType,
    panelType: state.AppReducer.panelType,
    nations: state.AppReducer.nations,
    user: state.Organization.user,
    group: state.Organization.group,
    domain: state.Organization.domain,
    resource: state.Organization.resource,
    workingOrgItems: state.Organization.workingOrgItems,
    isLoadingOrgInfomation: state.userReducer.isLoading,
    notifications: state.NotificationsReducer.notifications,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    signalRData: state.Organization.signalRData,
    timeZones: state.settingsReducer.timeZones,
    isReload: state.Organization.isReload,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  let _organizationManager = OrganizationManager.Instance;
  return {
    OnReloadOrganization: (isReload: boolean) => {
      dispatch(OrganizationReduxAction.ReloadOrganizationList(isReload));
    },

    OnClearCidAndWorkflowId: () => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
      dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify());
    },
    OnUpdatePagePanelStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      if (val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Edit));
      } else {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Null));
      }
    },
    OnResetApplicationStore: () => {
      let workingTabs = new WorkingEditTab();
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
      dispatch(OrganizationReduxAction.StoreUpdateWorkingEditTab(workingTabs));
    },
    OnSelectUserEdit: (
      item: any,
      tab: TypePage,
      timeZones: IDropdownOption[]
    ) => {
      switch (tab) {
        case TypePage.Users:
          let us = new BaseUser(item);
          us.id = item.guid || item.id;
          us.name = item.name;
          us.displayName = item.displayName;
          us.email = item.email;
          us.parentId = item.parentId;
          us.sequenceNumber = item.sequenceNumber;
          us.version = item.version;
          us.isDeleted = item.isDeleted;
          if (item.userProfile) {
            us.city = item.userProfile.city;
            us.countryOrRegion = item.userProfile.countryOrRegion;
            us.department = item.userProfile.department;
            us.faxNumber = item.userProfile.faxNumber;
            us.jobTitle = item.userProfile.jobTitle;
            us.mobilePhone = item.userProfile.mobilePhone;
            us.office = item.userProfile.office;
            us.officePhone = item.userProfile.officePhone;
            us.stateOrProvince = item.userProfile.stateOrProvince;
            us.streetAddress = item.userProfile.streetAddress;
            us.zipOrPostalCode = item.userProfile.zipOrPostalCode;
          }
          if (item.userAdInfo) {
            us.adId = item.userAdInfo.adId;
            us.lastTimeSynchronize = item.userAdInfo.lastTimeSynchronize;
          }

          if (us.email.indexOf("@") !== -1) {
            let arr = us.email.split("@");
            // us.email = arr[0];
            us.domain = arr[1];
          }
          return dispatch(OrganizationReduxAction.StoreUpdateEditUser(us));
        case TypePage.Domains:
          let dm = new BaseDomain(item);
          return dispatch(OrganizationReduxAction.StoreUpdateEditDomain(dm));
        case TypePage.Resources:
          let rs = new BaseResource(item);
          rs.id = item.guid || item.id;
          if (rs.email.indexOf("@") !== -1) {
            let arr = rs.email.split("@");
            // rs.email = arr[0];
            rs.domain = arr[1];
          }
          return dispatch(OrganizationReduxAction.StoreUpdateEditResource(rs));
        case TypePage.Groups:
          let gr = new BaseGroup(item);
          gr.id = item.guid  || item.id;
          if (gr.email.indexOf("@") !== -1) {
            let arr = gr.email.split("@");
            // gr.email = arr[0];
            gr.domain = arr[1];
          }
          return dispatch(OrganizationReduxAction.StoreUpdateEditGroup(gr));
        default:
          return;
      }
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateWorkingOrgItems: (items: any[]) => {
      dispatch(OrganizationReduxAction.StoreUpdateWorkingOrgItems(items));
    },
    OnHandleUnregisterUser: async (
      orgId: string,
      userId: string
    ): Promise<UnRegisterUserResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let unRegisterUsersRequest = new UnRegisterUsersRequest();
      unRegisterUsersRequest.UnsynchronizeUsers = [userId];
      return await _organizationManager
        .UnregisterUsers(orgId, unRegisterUsersRequest)
        .then((res) => {
          return res;
        });
    },
    OnHandleUnregisterGroup: async (id: string, groupId: string) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      return await _organizationManager
        .UnregisterGroups(id, [groupId])
        .then((res) => {
          return res;
        });
    },
    OnHandleUnregisterDomain: async (
      id: string,
      domainId: BaseDomain
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      return await _organizationManager
        .DeleteDomain(id, [domainId.guid])
        .then((res) => {
          return res;
        });
    },
    OnHandleUpdateNotifications: (notifications: NotificationItem[]) => {
      dispatch(
        NotificationReduxActionTS.onUpdateNotificationListTS(notifications)
      );
    },
    UpdateOrganizationDetailLoadingAct: (val: boolean) => {
      dispatch(
        ApplicationReduxActionTS.UpdateOrganizationDetailLoadingAct(val)
      );
    },
    OnHandleUpdateGroup: async (
      id: string,
      group: BaseGroup
    ): Promise<UpdateGroupResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      return await _organizationManager.UpdateGroup(id, group).then((res) => {
        return res;
      });
    },
    OnHandleUpdateDomain: async (
      id: string,
      domain: BaseDomain
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      return await _organizationManager.UpdateDomain(id, domain).then((res) => {
        return res;
      });
    },
    OnHandleUpdateUser: async (id: string, user: BaseUser) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new UpdateUserRequest();
      let userInfo = new SynchronizeUserInfomation();
      userInfo.Name = user.name;
      userInfo.Email = user.email;
      userInfo.City = user.city;
      userInfo.CountryOrRegion = user.countryOrRegion;
      userInfo.Department = user.department;
      userInfo.FaxNumber = user.faxNumber;
      userInfo.JobTitle = user.jobTitle;
      userInfo.MobilePhone = user.mobilePhone;
      userInfo.Office = user.office;
      userInfo.OfficePhone = user.officePhone;
      userInfo.StateOrProvince = user.stateOrProvince;
      userInfo.StreetAddress = user.streetAddress;
      userInfo.ZipOrPostalCode = user.zipOrPostalCode;
      userInfo.DisplayName = user.displayName;
      req.Guid = user.id;
      req.Name = user.name;
      req.Email = user.email;
      // req.Email = `${user.email}@${user.domain}`;
      req.DisplayName = user.displayName;
      req.UserProfile = userInfo;
      return await _organizationManager.UpdateUser(id, req).then((res) => {
        return res;
      });
    },
    OnHandleUpdateResource: async (
      id: string,
      resource: BaseResource,
      timeZones?: IDropdownOption[]
    ) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let rs = new SynchronizeResourceInfomation();
      rs.Timezone = resource.timeZone;
      if (timeZones && resource.timeZone) {
        let tz = timeZones.find((t) => t.text === resource.timeZone);
        if (tz) {
          rs.Timezone = String(tz.key);
        }
      }
      if (
        (!resource.timeZone || resource.timeZone.trim() === "") &&
        timeZones
      ) {
        let clientTimeZone = TimeFunction.GetClientTimeZone();
        let timeZone = timeZones.find((tz) => tz.text.includes(clientTimeZone));
        if (timeZone) {
          rs.Timezone = timeZone.text;
        }
      }
      rs.Id = resource.id;
      rs.Email = resource.email;
      // rs.Email = `${resource.email}@${resource.domain}`;
      rs.Name = resource.name;
      rs.Capacity = resource.capacity;
      rs.DisplayName = resource.displayName;
      rs.Location = resource.location;
      rs.Phone = resource.phone;
      rs.Description = resource.description;
      rs.ImageURLs = [];
      rs.Groups = [];
      let req = new UpdateResourceRequest();
      req.Resource = rs;
      return await _organizationManager.UpdateResource(id, req).then((res) => {
        return res;
      });
    },
    OnHandleUnregisterResource: async (id: string, resource: string) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new UnregisterResourceRequest();
      req.ResourceIds = [resource];
      return await _organizationManager
        .UnregisterResources(id, req)
        .then((res) => {
          return res;
        });
    },
  };
};

const OrganizationTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default OrganizationTableContainer;
