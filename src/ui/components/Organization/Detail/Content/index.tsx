import * as React from "react";
import {
  OrganizationWrapper,
  MainWrapper,
  PivotWrapper,
  ActionButtonWrapper,
  FooterPanelWrapper,
} from "./OrganizationStyle";
import { OrganizationState, OrganizationProps } from "./OrganizationModels";
import { TypeConfirm, TypePage, TypePanel } from "src/entity/enums";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { PivotItem } from "aod-dependencies/Pivot";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import CreateNewDomain from "src/ui/containers/Organization/Detail/CreateDomainContainer";
import Button from "aod-dependencies/Button";
import CreateNewUser from "src/ui/containers/Organization/Detail/CreateUserContainer";
import CreateNewGroup from "src/ui/containers/Organization/Detail/CreateGroupContainer";
import { Redirect } from "react-router-dom";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import CreateResource from "src/ui/containers/Organization/Detail/CreateResourceContainer";
import {
  BuildFunction,
  onHandleLocalStorageForPivot,
} from "src/common/functions";
import { IconGeneralProps, PanelStyle } from "src/common/style";
import { OrganizationPivotItems } from "src/common/constants";
import ApplicationTab from "src/ui/containers/Organization/Detail/ApplicationContainer";
import OrganizationTable from "src/ui/containers/Organization/Detail/OrganizationTableContainer";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";

export default class Organization extends React.Component<
  OrganizationProps,
  OrganizationState
> {
  private addDomain: React.RefObject<HTMLInputElement | any>;
  constructor(props: OrganizationProps) {
    super(props);
    this.state = {
      selectedItems: [],
      isPanelOpen: false,
      isConfirm: false,
      type: TypePage.Domains,
      currentType: TypePage.Domains,
      items: [],
      isAddingUsers: false,
      isSuccessUpdate: this.props.isHaveMessageSignalR
        ? this.props.isHaveMessageSignalR
        : false,
      isDontHaveOrgId: false,
      isConfirmUserAction: null,
      conversationId: "",
      workflowId: "",
      // isSomeUsersAlreadyAdded: false,
    };
    this.addDomain = React.createRef();
  }

  UNSAFE_componentWillMount() {
    // this._onHandleUpdateBreadNode();
    if (
      this.props.nations &&
      this.props.nations.length < 1 &&
      this.props.OnSetLocationSourceTS
    ) {
      this.props.OnSetLocationSourceTS();
    }
    this._FetchOrganizationTabItems();
    this._onHandleGetDomains();
  }

  shouldComponentUpdate(
    nextProps: OrganizationProps,
    nextState: OrganizationState
  ) {
    return (
      nextState !== this.state ||
      nextProps !== this.props ||
      nextProps.isConfirmCreate !== this.props.isConfirmCreate ||
      this.props.confirmType !== nextProps.confirmType
    );
  }

  componentWillUnmount() {
    this._onUpdateVisiblePagePanel(false);
  }

  private _onHandleUpdateBreadcrumb = (nodes: INodes[]) => {
    if (this.props.OnHandleUpdateBreadCrumb) {
      this.props.OnHandleUpdateBreadCrumb(nodes);
    }
  };

  private _onHandleGetDomains = () => {
    if (this.props.organizationInfomation && this.props.OnGetDomains) {
      this.props.OnGetDomains(this.props.organizationInfomation.id);
    }
  };

  private _onHandleRedirectToOrg = (org: BaseOrganization) => {
    let isExist = this.props.breadCrumb
      ? this.props.breadCrumb.some((b) => b.id === org.id)
      : false;
    if (
      this.props.OnHandleUpdateBreadCrumb &&
      !isExist &&
      this.props.breadCrumb &&
      this.props.breadCrumb.length > 0
    ) {
      let crtBreadcrumb = [...this.props.breadCrumb];
      let rootNode = {
        id: org.id,
        text: org.name,
        isSelected: false,
        parentId: "#",
        url: `?orgId=${org.id}`,
      };
      let node = BuildFunction.buildNodeForBreadcrumb(rootNode);
      if (crtBreadcrumb) {
        let index = crtBreadcrumb.findIndex(
          (b) => typeof b.parentId === "string"
        );
        if (index !== -1) {
          node.parentId = crtBreadcrumb[index].id;
        }
      }
      crtBreadcrumb[1] = node;
      this._onHandleUpdateBreadcrumb(crtBreadcrumb);
    } else {
      let rootNode = {
        id: "1",
        text: "Organizations",
        isSelected: true,
        parentId: "#",
        url: "organizations",
      };
      let Node = {
        id: org.id,
        text: org.name,
        isSelected: true,
        parentId: "1",
        url: `?orgId=${org.id}`,
      };
      let node = BuildFunction.buildNodeForBreadcrumb(Node);
      let root = BuildFunction.buildNodeForBreadcrumb(rootNode);
      this._onHandleUpdateBreadcrumb([root, node]);
    }
  };

  private _onUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdatePanelType) {
      this.props.OnUpdatePanelType(type);
    }
  };

  private _mapWorkingTab = (type?: TypePage): string | undefined => {
    if (type) {
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
    }
    return undefined;
  };

  private _onHandleVisiblePanel = () => {
    let isVisible = !this.props.isPanelPageOpen;
    if (isVisible) {
      this._onUpdateVisiblePagePanel(true);
    }
    if (!isVisible) {
      this.props.OnResetApplicationStore();
    }
  };

  private _onChangePivotItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item && this.props.OnUpdateWorkingTab) {
      let { headerText } = item.props;
      let tab = this._mapWithToTypePage(headerText);
      onHandleLocalStorageForPivot(
        "ORGANIZATION_LIST",
        this._mapWithToTypePage(headerText)
      );
      if (this.props.workingTab !== tab && !this.props.isWorking) {
        this.props.OnResetApplicationStore();
        return this.props.OnUpdateWorkingTab(tab);
      }
      if (this.props.workingTab !== tab && this.props.isWorking) {
        return this._onUpdateConfirmType(TypeConfirm.Cancel);
      }
    }
  };

  private _mapWithToTypePage = (str?: string) => {
    switch (str ? str.toLowerCase() : str) {
      case "groups":
        return TypePage.Groups;
      case "users":
        return TypePage.Users;
      case "resources":
        return TypePage.Resources;
      case "application":
        return TypePage.Applications;
      default:
        return TypePage.Domains;
    }
  };

  private _onHandleCancelPanel = async (isClose?: boolean) => {
    // still working but cancel => confirm cancel
    if (
      this.props.isWorking &&
      !this.props.isConfirmCreate &&
      this.props.confirmType === TypeConfirm.Null
    ) {
      this._onUpdateConfirmType(TypeConfirm.Cancel);
    }

    // in confirm => get back to first step
    if (
      (this.props.isWorking && this.props.isConfirmCreate && !isClose) ||
      (this.props.isWorking &&
        !this.props.isConfirmCreate &&
        this.props.confirmType !== TypeConfirm.Null)
    ) {
      this._onUpdateConfirmType(TypeConfirm.Null);
    }

    // not change any thing => close Panel
    if (!this.props.isWorking) {
      this._onHandleVisiblePanel();
      this._onUpdateConfirmType(TypeConfirm.Null);
    }
  };

  private _FetchOrganizationTabItems = async () => {
    let id = "";
    let urlArr = window.location.href.split("/");
    urlArr.forEach((item) => {
      if (item.includes("orgId")) {
        let result = item.split("=");
        return (id = result[result.length - 1]);
      }
    });
    if (this.props.OnGetOrganizationInfomationById && id !== "") {
      this.props
        .OnGetOrganizationInfomationById(id)
        .then((res) => {
          this._onHandleRedirectToOrg(res);
        })
        .catch(() => {
          this.setState({ isDontHaveOrgId: true });
        });
    } else {
      this.setState({ isDontHaveOrgId: true });
    }
  };

  private _onUpdateVisiblePagePanel = (val: boolean) => {
    if (
      this.props.OnUpdateVisiblePagePanel &&
      this.props.isPanelPageOpen !== val
    ) {
      this.props.OnUpdateVisiblePagePanel(val);
    }
  };

  private _onHandleDeleteItems = async () => {
    // let crtItem = await this._mapCurrentSelectedItem();
    if (!this.props.isWorking && !this.props.isPanelPageOpen) {
      this._onUpdateVisiblePagePanel(true);
    }
    if (
      !this.props.isWorking &&
      this.props.workingOrgItems &&
      this.props.workingOrgItems.length > 0
    ) {
      this._onUpdateConfirmType(TypeConfirm.Delete);
    }
    // return undefined;
  };

  private _onGetSelectedData = (items: any[]) => {
    if (
      this.props.workingOrgItems &&
      this.props.OnUpdateWorkingOrgItems &&
      this.props.workingTab
    ) {
      this.props.OnUpdateWorkingOrgItems(
        items,
        this.props.workingOrgItems,
        this.props.workingTab
      );
    }
  };

  private _onHandleCancelConfirm = async () => {
    if (this.props.confirmType === TypeConfirm.Delete) {
      await this._onUpdateVisiblePagePanel(false);
    }
    this._onUpdateConfirmType(TypeConfirm.Null);
  };

  private _onHandleRegisterGroups = (id: string, groups: BaseGroup[]) => {
    if (this.props.OnRegisterGroupToServer) {
      this.props.OnRegisterGroupToServer(id, groups).then((res) => {
        if (res) {
          this.setState({
            workflowId: res.workflowId || "",
            conversationId: res.conversationId,
          });
        }
      });
    }
  };

  private _onHandleUnregisterUser = () => {
    if (
      this.props.OnUnregistUserToServer &&
      this.props.workingOrgItems &&
      this.props.workingOrgItems.length > 0 &&
      this.props.organizationInfomation
    ) {
      let req = this.props.workingOrgItems.map((i) => {
        return i.guid;
      });
      this.props
        .OnUnregistUserToServer(this.props.organizationInfomation.id, req)
        .then((res) => {
          this.setState({
            workflowId: res.workflowId || "",
            conversationId: res.conversationId,
          });
        });
    }
  };

  private _onHandleUnregisterGroup = () => {
    if (
      this.props.OnUnregistGroupToServer &&
      this.props.workingOrgItems &&
      this.props.workingOrgItems.length > 0 &&
      this.props.organizationInfomation
    ) {
      let req = this.props.workingOrgItems.map((i) => {
        return i.guid;
      });
      this.props
        .OnUnregistGroupToServer(this.props.organizationInfomation.id, req)
        .then((res) => {
          this.setState({
            workflowId: res.workflowId || "",
            conversationId: res.conversationId,
          });
        });
    }
  };

  private _onHandleUnregisterResource = () => {
    if (
      this.props.OnUnregistResourceToServer &&
      this.props.workingOrgItems &&
      this.props.workingOrgItems.length > 0 &&
      this.props.organizationInfomation
    ) {
      let req = this.props.workingOrgItems.map((i) => {
        return i.guid;
      });
      this.props
        .OnUnregistResourceToServer(this.props.organizationInfomation.id, req)
        .then((res) => {
          if (res && res.conversationId) {
            this.setState({
              workflowId: res.workflowId || "",
              conversationId: res.conversationId,
            });
          }
        });
    }
  };

  private _onHandleUnregisterDomain = () => {
    if (
      this.props.OnUnregistDomainToServer &&
      this.props.workingOrgItems &&
      this.props.workingOrgItems.length > 0 &&
      this.props.organizationInfomation
    ) {
      let req = this.props.workingOrgItems.map((i) => {
        return i.guid;
      });
      this.props
        .OnUnregistDomainToServer(this.props.organizationInfomation.id, req)
        .then((res) => {
          if (res && res.conversationId) {
            this.setState({
              workflowId: res.workflowId || "",
              conversationId: res.conversationId,
            });
          }
        });
    }
  };

  private _onDeleteOrgSelectedItems = () => {
    if (this.props.workingTab) {
      switch (this.props.workingTab) {
        case TypePage.Users:
          return this._onHandleUnregisterUser();
        case TypePage.Groups:
          return this._onHandleUnregisterGroup();
        case TypePage.Domains:
          return this._onHandleUnregisterDomain();
        case TypePage.Resources:
          return this._onHandleUnregisterResource();

        default:
          break;
      }
    }
  };

  private _onHandleRegisterUsersToServer = () => {
    let crtData = this.props.workingUsers ? [...this.props.workingUsers] : [];
    if (this.props.OnRegistUserToServer && this.props.organizationInfomation) {
      this.props
        .OnRegistUserToServer(this.props.organizationInfomation.id, crtData)
        .then((res) => {
          this.setState({
            workflowId: res.workflowId || "",
            conversationId: res.conversationId,
          });
        });
    }
  };

  private _onHandleRegisterResourceToServer = () => {
    if (this.props.organizationInfomation && this.props.workingResources) {
      this.props
        .OnRegisterResourceToServer(
          this.props.organizationInfomation,
          this.props.workingResources,
          this.props.timeZones
        )
        .then((res) => {
          this.setState({
            workflowId: res.workflowId || "",
            conversationId: res.conversationId,
          });
        });
    }
  };

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.OnUpdateWorkingStatus && this.props.isWorking !== val) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleResetWorkflowIdAndCId = () => {
    if (this.state.conversationId !== "" || this.state.workflowId !== "") {
      this.setState({ conversationId: "", workflowId: "" });
    }
  };

  RenderAddNewContent = () => {
    if (
      !this.props.isConfirmCreate &&
      this.props.workingTab &&
      this.props.confirmType === TypeConfirm.Null
    ) {
      switch (this.props.workingTab) {
        case TypePage.Users:
          return <CreateNewUser ref={this.addDomain} />;
        case TypePage.Groups:
          return <CreateNewGroup ref={this.addDomain} />;
        case TypePage.Resources:
          return <CreateResource ref={this.addDomain} />;
        default:
          return <CreateNewDomain ref={this.addDomain} />;
      }
    }
    if (this.props.workingTab && this.props.confirmType !== TypeConfirm.Null) {
      return (
        <Confirm
          onHandleSubmit={this.onHandleSubmitConfirm}
          onHandleCancel={this._onHandleCancelConfirm}
          rcName={this.props.workingTab}
          content={
            this.props.confirmType === TypeConfirm.Delete
              ? "Are you sure you want to delete the selected records?"
              : undefined
          }
        />
      );
    }
  };

  RenderButtonInTabContent = () => {
    if (
      this.props.workingTab !== TypePage.Applications &&
      this.props.workingOrgItems
    ) {
      let isDisabled =
        this.props.workingOrgItems.length > 0 && !this.props.isWorking;
      return (
        <ActionButtonWrapper theme={this.props.theme}>
          <CommandBarButton
            onClick={this._onHandleVisiblePanel}
            iconProps={IconGeneralProps.addIcon}
            text="Add more"
            rcName={`addMore.${this.props.workingTab}`}
            darkMode={this.props.theme}
          />
          <CommandBarButton
            disabled={!isDisabled}
            iconProps={IconGeneralProps.deleteIcon}
            text="Delete"
            rcName={`delete.${this.props.workingTab}`}
            darkMode={this.props.theme}
            onClick={this._onHandleDeleteItems}
          />
        </ActionButtonWrapper>
      );
    }
    return null;
  };

  RenderTabContent = () => {
    if (
      // !this.props.isHaveMessageSignalR &&
      this.props.workingTab &&
      this.props.workingTab !== TypePage.Applications
    ) {
      return (
        <OrganizationTable
          ref={this.addDomain}
          onGetItemsSelected={this._onGetSelectedData}
          conversationId={this.state.conversationId}
          wId={this.state.workflowId}
          OnHandleResetWorkAndConversationId={
            this._onHandleResetWorkflowIdAndCId
          }
        />
      );
    }
    if (
      // !this.props.isHaveMessageSignalR &&
      this.props.workingTab &&
      this.props.workingTab === TypePage.Applications
    ) {
      return <ApplicationTab />;
    }
  };

  RenderFooterPanel = () => {
    return (
      <FooterPanelWrapper>
        <Button
          onClick={this.onHandleSubmitCreate}
          darkMode={this.props.theme}
          type="Primary"
          text="Create"
          rcName={`create.${this.props.workingTab}`}
          disabled={this.props.isLoadingFooterPanel}
        />
        <Button
          onClick={() => this._onHandleCancelPanel()}
          darkMode={this.props.theme}
          text="Cancel"
          rcName={`cancel.${this.props.workingTab}`}
        />
      </FooterPanelWrapper>
    );
  };

  onHandleSaveDataTS = async () => {
    if (!this.addDomain.current) {
      return;
    }
    await this.addDomain.current.onSentData();
  };

  onHandleSubmitConfirm = () => {
    if (this.props.isWorking && this.props.confirmType === TypeConfirm.Review) {
      return this.onHandleCallRegisterWithType();
    }
    if (this.props.confirmType === TypeConfirm.Delete) {
      this._onDeleteOrgSelectedItems();
    }
    return this._onHandleVisiblePanel();
  };

  onHandleSubmitCreate = async () => {
    if (!this.addDomain.current) {
      return;
    }
    await this.addDomain.current.onSentData();
  };

  onHandleCallRegisterWithType = () => {
    if (this.props.workingTab) {
      switch (this.props.workingTab) {
        case TypePage.Users:
          return this.onHandlePostUsersToServer();

        case TypePage.Resources:
          return this.onHandlePostResourcesToServer();

        case TypePage.Domains:
          return this.onHandlePostDomainsToServer();

        case TypePage.Groups:
          return this.onHandlePostGroupsToServer();

        default:
          return;
      }
    }
  };

  onHandlePostGroupsToServer = () => {
    if (this.props.workingGroups && this.props.organizationInfomation) {
      this._onHandleRegisterGroups(
        this.props.organizationInfomation.id,
        this.props.workingGroups
      );
    }
    this._onHandleUpdateWorkingStatus(false);
    this._onHandleVisiblePanel();
  };

  onHandlePostDomainsToServer = () => {
    this._onHandleVisiblePanel();
    this.onHandlePostDomainToServer();
  };

  onHandlePostDomainToServer = () => {
    if (
      this.props.organizationInfomation &&
      this.props.workingDomains &&
      this.props.OnRegisterDomainToServer
    ) {
      this.props
        .OnRegisterDomainToServer(
          this.props.organizationInfomation.id,
          this.props.workingDomains
        )
        .then((res) => {
          if (res) {
            this.setState({
              workflowId: res.workflowId || "",
              conversationId: res.conversationId,
            });
          }
        });
    }
  };

  onHandlePostResourcesToServer = async () => {
    this.setState({
      isPanelOpen: false,
      isConfirm: false,
      isConfirmUserAction: null,
    });
    this._onHandleRegisterResourceToServer();
    this._onHandleUpdateWorkingStatus(false);
    this._onHandleVisiblePanel();
  };

  onHandlePostUsersToServer = async () => {
    this._onHandleRegisterUsersToServer();
    this._onHandleUpdateWorkingStatus(false);
    this._onHandleVisiblePanel();
  };

  onHandleCreatedResource = () => {
    this._onHandleVisiblePanel();
  };

  render() {
    if (this.state.isDontHaveOrgId) {
      return <Redirect to="/organizations" />;
    }
    return (
      <>
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={
              this.props.isPanelPageOpen &&
              this.props.panelType === TypePanel.Create
            }
            hasCloseButton
            headerText={
              this.props.confirmType === TypeConfirm.Null
                ? `Create ${this.props.workingTab}`
                : "Confirmation"
            }
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={() => this._onHandleCancelPanel(true)}
            isLightDismiss={true}
            styles={PanelStyle(this.props.theme)}
            type={
              this.props.confirmType === TypeConfirm.Delete
                ? PanelType.smallFixedFar
                : PanelType.medium
            }
            onRenderFooterContent={
              !this.props.isSearchInPanel &&
              this.props.confirmType === TypeConfirm.Null
                ? this.RenderFooterPanel
                : undefined
            }
            isFooterAtBottom={true}
            rcName={`${this.props.workingTab}`}
          >
            {this.RenderAddNewContent()}
          </Panel>
        </Customizer>
        <OrganizationWrapper
          className="OrganizationWrapper"
          theme={this.props.theme}
        >
          <MainWrapper className="MainWrapper" theme={this.props.theme}>
            <PivotWrapper
              id="pivot-wrapper"
              theme={{
                darkMode: this.props.theme,
                isStillWorkingCreate: this.props.isWorking,
              }}
              className="PivotWrapper"
            >
              <Pivot
                onLinkClick={this._onChangePivotItem}
                styles={{
                  itemContainer: {
                    width: "100%",
                    height: "100%",
                  },
                }}
                rcName={`org`}
                darkMode={this.props.theme}
                selectedKey={this._mapWorkingTab(this.props.workingTab)}
                disableAction={true}
              >
                {OrganizationPivotItems.map((item, index) => {
                  return (
                    <PivotItem
                      key={index}
                      headerText={item.text}
                      itemIcon={item.iconName}
                      itemKey={String(index)}
                      style={{
                        padding: "20px",
                        backgroundColor:
                          this.props.theme === "dark" ? "#333333" : "#ffffff",
                      }}
                    >
                      {this.RenderButtonInTabContent()}
                      {this.RenderTabContent()}
                    </PivotItem>
                  );
                })}
              </Pivot>
            </PivotWrapper>
          </MainWrapper>
        </OrganizationWrapper>
      </>
    );
  }
}
