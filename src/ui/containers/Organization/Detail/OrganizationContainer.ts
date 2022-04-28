import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import { UserReduxActionTS } from "src/ui/actions/implements/UserAct";
import Organization from "src/ui/components/Organization/Detail/Content";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseUser } from "src/common/classes/BaseUser";
import {
  CreateDomainRequest,
  RegisterUsersRequest,
  SynchronizeUserInfomation,
  SynchronizeUsersRegister,
  UnRegisterUsersRequest,
} from "src/repositories/request";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TypeConfirm, TypePage, TypePanel } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { BuildFunction, TimeFunction } from "src/common/functions";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { OrganizationProps } from "src/ui/components/Organization/Detail/Content/OrganizationModels";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseResource } from "src/common/classes/BaseResource";
import {
  RegisterResourceRequest,
  SynchronizeResourceInfomation,
  RegisterGroupsRequest,
  SynchronizeGroupsRegister,
} from "src/repositories/request";
import {
  ConversationIdResponse,
  UnRegisterUserResponse,
  RegisterUserResponse,
} from "src/repositories/response";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { UnregisterResourceRequest } from "src/repositories/request";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { Dispatch } from "redux";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";

const _mapSpecificTab = (type: TypePage): string => {
  switch (type) {
    case TypePage.Users:
      return "1";
    case TypePage.Resources:
      return "2";
    case TypePage.Groups:
      return "3";
    case TypePage.Applications:
      return "4";
    default:
      return "0";
  }
};

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer, userReducer, AppReducer } = state;
  return {
    theme: settingsReducer.theme,
    userInfo: userReducer,
    organizationInfomation: state.Organization.organizationInfomation,
    confirmType: state.AppReducer.confirmType,
    isWorking: AppReducer.isWorking,
    workingUsers: state.Organization.workingUsers,
    workingResources: state.Organization.workingResources,
    workingDomains: state.Organization.workingDomains,
    workingGroups: state.Organization.workingGroups,
    workingTab: state.Organization.workingTab,
    isConfirmCreate: AppReducer.isConfirmCreate,
    isPanelPageOpen: AppReducer.isPanelPageOpen,
    isOrganizationDetailLoading: AppReducer.isOrganizationDetailLoading,
    isSearchInPanel: AppReducer.isSearchInPanel,
    isLoadingFooterPanel: AppReducer.isLoadingFooterPanel,
    panelType: state.AppReducer.panelType,
    nations: state.AppReducer.nations,
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    workingOrgItems: state.Organization.workingOrgItems,
    user: state.Organization.user,
    group: state.Organization.group,
    resource: state.Organization.resource,
    domain: state.Organization.domain,
    breadCrumb: state.AppReducer.breadCrumb,
    signalRConversationId: state.AppReducer.signalRConversationId,
    signalRWorkflowId: state.AppReducer.signalRWorkflowId,
    timeZones: state.settingsReducer.timeZones,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: OrganizationProps) => {
  let _organizationManager = OrganizationManager.Instance;
  return {
    OnGetOrganizationInfomationById: async (
      id: string
    ): Promise<BaseOrganization> => {
      let org = new BaseOrganization();
      dispatch(UserReduxActionTS.onStartLoadingUserInfoTS());
      await _organizationManager
        .GetOrganizationInfomationById(id)
        .then((res) => {
          if (res) {
            org.id = res.guid;
            org.domain = res.domains;
            org.domainNumber = res.domainNumber;
            org.isDeleted = res.isDeleted;
            org.name = res.name;
            org.sequenceNumber = res.sequenceNumber;
            org.version = res.version;
            org.resourceNumber = res.resourceNumber;
            org.groupNumber = res.groupNumber;
            org.userNumber = res.userNumber;
            dispatch(OrganizationReduxAction.StoreOrganizationsInfomation());
            dispatch(UserReduxActionTS.onEndLoadingUserInfoTS());
          }
        });
      return org;
    },
    OnRegisterDomainToServer: async (
      id: string,
      domains: BaseDomain[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new CreateDomainRequest();
      req.DomainNames = domains.map((d) => {
        return d.name;
      });
      return await _organizationManager.RegisterDomain(id, req).then((res) => {
        return res;
      });
    },
    OnRegistUserToServer: async (
      id: string,
      users: BaseUser[]
    ): Promise<RegisterUserResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      dispatch(ApplicationReduxActionTS.UpdateLoadingFooterPanelAct(true));
      dispatch(
        ApplicationReduxActionTS.UpdateOrganizationDetailLoadingAct(true)
      );
      let SynchronizeUsers: SynchronizeUsersRegister[] = await users.map(
        (us) => {
          let synchronizeUser = new SynchronizeUsersRegister();
          let UserInfomation = new SynchronizeUserInfomation();
          // synchronizeUser.WillConnect = true;
          UserInfomation.Name = us.name;
          UserInfomation.Email = us.email;
          // UserInfomation.Email = `${us.email}@${us.domain}`;
          UserInfomation.JobTitle = us.jobTitle;
          UserInfomation.Department = us.department;
          UserInfomation.Office = us.office;
          UserInfomation.OfficePhone = us.officePhone;
          UserInfomation.FaxNumber = us.faxNumber;
          UserInfomation.MobilePhone = us.mobilePhone;
          UserInfomation.StreetAddress = us.streetAddress;
          UserInfomation.City = us.city;
          UserInfomation.DisplayName = us.displayName;
          UserInfomation.StateOrProvince = us.stateOrProvince;
          UserInfomation.ZipOrPostalCode = us.zipOrPostalCode;
          UserInfomation.CountryOrRegion = us.countryOrRegion;
          synchronizeUser.UserInfo = UserInfomation;
          return synchronizeUser;
        }
      );
      let registerUsersRequest = new RegisterUsersRequest();
      registerUsersRequest.SynchronizeUsers = SynchronizeUsers;
      return await _organizationManager
        .RegistUsers(id, registerUsersRequest)
        .then((res) => {
          if (res) {
            dispatch(
              ApplicationReduxActionTS.UpdateLoadingFooterPanelAct(false)
            );
          }
          return res;
        });
    },
    OnRegisterGroupToServer: async (
      id: string,
      groups: BaseGroup[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      dispatch(
        ApplicationReduxActionTS.UpdateOrganizationDetailLoadingAct(true)
      );
      let req = new RegisterGroupsRequest();
      let reqData: SynchronizeGroupsRegister[] = groups.map((gr) => {
        let item = new SynchronizeGroupsRegister();
        item.Name = gr.name;
        item.Email = gr.email;
        // item.Email = `${gr.email}@${gr.domain}`;
        item.Description = gr.description;
        return item;
      });
      req.SynchronizeGroups = reqData;
      return await _organizationManager.RegistGroups(id, req).then((res) => {
        return res;
      });
    },
    OnRegisterResourceToServer: async (
      org: BaseOrganization,
      resouces: BaseResource[],
      timeZones?: IDropdownOption[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      dispatch(
        ApplicationReduxActionTS.UpdateOrganizationDetailLoadingAct(true)
      );
      let req = new RegisterResourceRequest();
      let SynchronizeResources: SynchronizeResourceInfomation[] = resouces.map(
        (rs) => {
          let ResourceInfomation = new SynchronizeResourceInfomation();
          ResourceInfomation.Timezone = rs.timeZone;
          if (timeZones && rs.timeZone) {
            let tz = timeZones.find((t) => t.text === rs.timeZone);
            if (tz) {
              ResourceInfomation.Timezone = String(tz.key);
            }
          }
          if ((!rs.timeZone || rs.timeZone.trim() === "") && timeZones) {
            let clientTimeZone = TimeFunction.GetClientTimeZone();
            let timeZone = timeZones.find((tz) =>
              tz.text.includes(clientTimeZone)
            );
            if (timeZone) {
              ResourceInfomation.Timezone = String(timeZone.key);
            }
          }
          ResourceInfomation.Id = rs.id;
          ResourceInfomation.Email = rs.email;
          // ResourceInfomation.Email = `${rs.email}@${rs.domain}`;
          ResourceInfomation.Name = rs.name;
          ResourceInfomation.Capacity = rs.capacity;
          ResourceInfomation.DisplayName = rs.displayName;
          ResourceInfomation.Location = rs.location;
          ResourceInfomation.Phone = rs.phone;
          ResourceInfomation.Description = rs.description;
          ResourceInfomation.ImageURLs = [];
          ResourceInfomation.Groups = [];
          return ResourceInfomation;
        }
      );
      req.SynchronizeResources = SynchronizeResources;
      return await _organizationManager
        .RegistResources(org.id, req)
        .then((res) => {
          return res;
        });
    },
    OnUnregistUserToServer: async (
      id: string,
      users: string[]
    ): Promise<UnRegisterUserResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let unRegisterUsersRequest = new UnRegisterUsersRequest();
      unRegisterUsersRequest.UnsynchronizeUsers = users;
      dispatch(
        ApplicationReduxActionTS.UpdateOrganizationDetailLoadingAct(true)
      );
      return await _organizationManager
        .UnregisterUsers(id, unRegisterUsersRequest)
        .then((res) => {
          return res;
        });
    },
    OnUnregistGroupToServer: async (
      id: string,
      groups: string[]
    ): Promise<ConversationIdResponse> => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      dispatch(
        ApplicationReduxActionTS.UpdateOrganizationDetailLoadingAct(true)
      );
      return await _organizationManager
        .UnregisterGroups(id, groups)
        .then((res) => {
          return res;
        });
    },
    OnUpdateWorkingTab: (tab: TypePage) => {
      let crtTab = _mapSpecificTab(tab);
      dispatch(ApplicationReduxActionTS.UpdateSpecificTab(crtTab));
      dispatch(OrganizationReduxAction.StoreUpdateWorkingTab(tab));
    },
    OnUpdateConfirmCreate: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmCreateAct(val));
    },
    OnUpdateVisiblePagePanel: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateVisiblePagePanelAct(val));
      if (val) {
        dispatch(ApplicationReduxActionTS.UpdatePanelTypeAct(TypePanel.Create));
      }
    },
    OnResetApplicationStore: () => {
      dispatch(ApplicationReduxActionTS.ResetApplicationStoreAct());
      dispatch(OrganizationReduxAction.StoreResetWorkingData());
    },
    OnSetLocationSourceTS: async () => {
      let result = await BuildFunction.buildNation();
      dispatch(ApplicationReduxActionTS.StoreUpdateLocationSource(result));
    },
    OnUpdatePanelType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
    OnUpdateWorkingOrgItems: (
      items: any[],
      workingOrgItems: any[],
      type: TypePage
    ) => {
      dispatch(
        OrganizationReduxAction.StoreUpdateWorkingOrgItems(items)
        // dispatch(
        //   OrganizationReduxAction.StoreUpdateWorkingOrgItems([
        //     ...req,
        //     ...newItems,
        //   ])
      );
    },
    OnHandleUpdateBreadCrumb: async (nodes: INodes[]) => {
      dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
    },
    OnUpdateWorkingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnGetDomains: async (id: string) => {
      return await _organizationManager
        .GetOrganizationDomains(id)
        .then((res) => {
          dispatch(OrganizationReduxAction.StoreUpdateAvailableDomains());
        });
    },
    OnUnregistResourceToServer: async (id: string, resources: string[]) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      let req = new UnregisterResourceRequest();
      req.ResourceIds = resources;
      return await _organizationManager
        .UnregisterResources(id, req)
        .then((res) => {
          return res;
        });
    },
    OnUnregistDomainToServer: async (id: string, domains: string[]) => {
      dispatch(NotificationReduxActionTS.UpdateLoadingNotify(true));
      return await _organizationManager
        .DeleteDomain(id, domains)
        .then((res) => {
          return res;
        });
    },
  };
};

const OrganizationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Organization);

export default OrganizationContainer;
