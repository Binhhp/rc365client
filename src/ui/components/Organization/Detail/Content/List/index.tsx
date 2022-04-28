import * as React from "react";
import { BuildRCAttribute, FetchDataFromServer } from "src/common/functions";
import { TypeConfirm, TypePage, TypePanel } from "src/entity/enums";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import EditResource from "src/ui/containers/Organization/Detail/EditResourceContainer";
import EditUser from "src/ui/containers/Organization/Detail/EditUserContainer";
import EditGroup from "src/ui/containers/Organization/Detail/EditGroupContainer";
// import EditDomain from "src/ui/containers/Organization/Detail/EditDomainContainer";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { PanelStyle } from "src/common/style";
import { IOrganizationListProps, IOrganizationListState } from "./ListModel";
import { OrganizationListWrapper } from "./ListStyle";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import buildQuery from "odata-query";
import { LoadingSpinner } from "src/common/ui/Loading";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

export default class RenderList extends React.Component<
  IOrganizationListProps,
  IOrganizationListState
> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IOrganizationListProps) {
    super(props);
    this.state = {
      item: null,
      cId: "",
      workflowId: "",
      loading: false,
    };
    this.Action = React.createRef();
    this._query = new DataListSource();
    this._query.GetData = async (
      pageIndex: number,
      skipNumber: number,
      nextLink: string | null,
      endpoint?: string
    ): Promise<any[]> => {
      this.setState({ loading: true });
      this._onHandleUpdateLoadingDataList(true);
      let top = skipNumber;
      let skip = skipNumber * (pageIndex - 1);
      let endpointBuilded = buildQuery({ top, skip });
      let url =
        nextLink && nextLink !== ""
          ? nextLink
          : `${`${BuildURLWithTenantId(
              ApiFromOData.ODATA_API
            )}organizations('${this._onGetOrganizationId()}')/${
              this.props.workingTab
            }`}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }`;
      await FetchDataFromServer({ url: url })
        .then((res) => {
          if (res) {
            this._query.source = res.value;
          }
          this._onHandleUpdateLoadingDataList(false);
          this.setState({ loading: false });
        })
        .catch(() => {
          this._onHandleUpdateLoadingDataList(false);
        });
      return [];
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: IOrganizationListProps) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    let isReloadProps = IsCanBeReload(
      nextProps.conversationId,
      this.props.signalRConversationId,
      nextProps.wId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReload || isReloadProps) {
      this._onHandleGetDataForm();
    }
  }

  componentDidUpdate(
    prevProps: IOrganizationListProps,
    prevState: IOrganizationListState
  ) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
    );
    if (isReload) {
      this._onHandleGetDataForm();
    } else {
      if (this.props.isReload) {
        this._onHandleGetDataForm();
        this.props.OnReloadOrganization(false);
      }
    }
  }

  private _onGetOrganizationId = (): string => {
    let id = "";
    if (
      this.props.organizationInfomation &&
      this.props.organizationInfomation.id !== ""
    ) {
      id = this.props.organizationInfomation.id;
    } else {
      let urlArr = window.location.search;
      let arr = urlArr.split("orgId=");
      if (arr.length >= 2) {
        id = arr[arr.length - 1];
      }
    }
    return id;
  };

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    this.props.OnClearCidAndWorkflowId();
    await this.Action.current.onHandleQueryDataByClassType();
    this._onHandleResetWorkflowAndConversationId();
  };

  private _onHandleResetWorkflowAndConversationId = () => {
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "" });
    }
    if (this.props.OnHandleResetWorkAndConversationId) {
      this.props.OnHandleResetWorkAndConversationId();
    }
  };

  private _onHandleUpdateLoadingDataList = (val: boolean) => {
    if (
      this.props.isOrganizationDetailLoading !== val &&
      this.props.UpdateOrganizationDetailLoadingAct
    ) {
      this.props.UpdateOrganizationDetailLoadingAct(val);
    }
  };

  private _onHandleSelection = (selectedItems: any[]) => {
    if (this.props.OnUpdateWorkingOrgItems) {
      this.props.OnUpdateWorkingOrgItems(selectedItems);
    }
  };

  private _onOpenPanel = (item: any) => {
    if (!this.props.isWorking && !this.props.isPanelPageOpen) {
      let val = !this.props.isPanelPageOpen;
      this._onUpdateVisiblePanel(val);
    }
  };

  private _onUpdateVisiblePanel = (val: boolean) => {
    if (
      this.props.OnUpdatePagePanelStatus &&
      this.props.isPanelPageOpen !== val
    ) {
      this.props.OnUpdatePagePanelStatus(val);
    }
  };

  private _onResetApplicationStore = () => {
    if (this.props.OnResetApplicationStore) {
      this.props.OnResetApplicationStore();
    }
  };

  private _onHandleRowClick = (item: any) => {
    if (
      this.props.OnSelectUserEdit &&
      this.props.workingTab &&
      !this.props.isPanelPageOpen &&
      this.props.timeZones
    ) {
      this.props.OnSelectUserEdit(
        item,
        this.props.workingTab,
        this.props.timeZones
      );
    }
  };

  private _onHandleCancelPanel = async () => {
    if (this.props.isWorking && this.props.confirmType === TypeConfirm.Null) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
    if (this.props.isWorking && this.props.confirmType !== TypeConfirm.Null) {
      this._onHandleUpdateConfirmType(TypeConfirm.Null);
    }
    if (!this.props.isWorking) {
      this._onResetApplicationStore();
    }
  };

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType && this.props.confirmType !== type) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleUnregisterGroup = () => {
    if (
      this.props.group &&
      this.props.organizationInfomation &&
      this.props.OnHandleUnregisterGroup
    ) {
      this.props
        .OnHandleUnregisterGroup(
          this.props.organizationInfomation.id,
          this.props.group.id
        )
        .then((res) => {
          this.setState({
            cId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        });
    }
  };
  private _onHandleUnregisterResource = () => {
    if (
      this.props.resource &&
      this.props.organizationInfomation &&
      this.props.OnHandleUnregisterResource
    ) {
      this.props
        .OnHandleUnregisterResource(
          this.props.organizationInfomation.id,
          this.props.resource.id
        )
        .then((res) => {
          this.setState({
            cId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        });
    }
  };
  private _onHandleUnregisterDomain = () => {
    if (
      this.props.domain &&
      this.props.organizationInfomation &&
      this.props.OnHandleUnregisterDomain
    ) {
      this.props
        .OnHandleUnregisterDomain(
          this.props.organizationInfomation.id,
          this.props.domain
        )
        .then((res) => {
          this.setState({
            cId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        });
    }
  };

  private _mapIconByWorkingTab = (): string => {
    switch (this.props.workingTab) {
      case TypePage.Users:
        return "Contact";
      case TypePage.Resources:
        return "RecruitmentManagement";
      case TypePage.Groups:
        return "Group";
      case TypePage.Domains:
        return "LinkedDatabase";
      default:
        return "Contact";
    }
  };

  private _onHandleUnregisterByWorkingTab = async () => {
    if (this.props.workingTab && this.props.organizationInfomation) {
      switch (this.props.workingTab) {
        case TypePage.Users:
          if (this.props.OnHandleUnregisterUser && this.props.user) {
            await this.props
              .OnHandleUnregisterUser(
                this.props.organizationInfomation.id,
                this.props.user.id
              )
              .then((res) => {
                this.setState({
                  cId: res.conversationId,
                  workflowId: res.workflowId || "",
                });
              });
          }
          return;

        case TypePage.Groups:
          this._onHandleUnregisterGroup();
          return;
        case TypePage.Resources:
          this._onHandleUnregisterResource();
          return;

        default:
          this._onHandleUnregisterDomain();
          return;
      }
    }
  };

  private _onHandleSubmitEdit = () => {
    if (this.props.confirmType === TypeConfirm.Delete) {
      this._onHandleUnregisterByWorkingTab();
    }
    if (
      this.props.OnUpdatePagePanelStatus &&
      this.props.confirmType === TypeConfirm.Cancel
    ) {
      this.props.OnUpdatePagePanelStatus(false);
    }

    if (this.props.confirmType === TypeConfirm.Submit) {
      this.onSubmitUpdate();
    }
    this._onResetApplicationStore();
  };

  private _onHandleCancelCfm = async () => {
    if (
      this.props.confirmType === TypeConfirm.Delete &&
      this.props.panelType !== TypePanel.Edit
    ) {
      this._onResetApplicationStore();
    }
    if (
      this.props.confirmType !== TypeConfirm.Submit ||
      this.props.panelType !== TypePanel.Edit
    ) {
      this._onHandleUpdateConfirmType(TypeConfirm.Null);
    }
  };

  private _onHandleUpdateGroup = () => {
    if (
      this.props.OnHandleUpdateGroup &&
      this.props.group &&
      this.props.organizationInfomation
    ) {
      this.props
        .OnHandleUpdateGroup(
          this.props.organizationInfomation.id,
          this.props.group
        )
        .then((res) => {
          if (res) {
            this.setState({
              cId: res.conversationId,
              workflowId: res.workflowId || "",
            });
          }
        });
    }
  };

  private _onHandleUpdateUser = () => {
    if (
      this.props.OnHandleUpdateUser &&
      this.props.user &&
      this.props.organizationInfomation
    ) {
      this.props
        .OnHandleUpdateUser(
          this.props.organizationInfomation.id,
          this.props.user
        )
        .then((res) => {
          if (res) {
            this.setState({
              cId: res.conversationId,
              workflowId: res.workflowId || "",
            });
          }
        });
    }
  };

  private _onHandleUpdateResource = () => {
    if (
      this.props.OnHandleUpdateResource &&
      this.props.resource &&
      this.props.organizationInfomation
    ) {
      this.props
        .OnHandleUpdateResource(
          this.props.organizationInfomation.id,
          this.props.resource,
          this.props.timeZones
        )
        .then((res) => {
          if (res) {
            this.setState({
              cId: res.conversationId,
              workflowId: res.workflowId || "",
            });
          }
        });
    }
  };
  private _onHandleUpdateDomain = () => {
    if (
      this.props.OnHandleUpdateDomain &&
      this.props.domain &&
      this.props.organizationInfomation
    ) {
      this.props
        .OnHandleUpdateDomain(
          this.props.organizationInfomation.id,
          this.props.domain
        )
        .then((res) => {
          if (res) {
            this.setState({
              cId: res.conversationId,
              workflowId: res.workflowId || "",
            });
          }
        });
    }
  };

  onSubmitUpdate = async () => {
    if (this.props.workingTab) {
      switch (this.props.workingTab) {
        case TypePage.Groups:
          return this._onHandleUpdateGroup();

        case TypePage.Users:
          this._onHandleUpdateUser();
          return;

        case TypePage.Resources:
          this._onHandleUpdateResource();
          return;

        case TypePage.Domains:
          this._onHandleUpdateDomain();
          return;

        default:
          return;
      }
    }
    this._onResetApplicationStore();
  };

  RenderContentEdit = () => {
    if (this.props.workingTab && this.props.confirmType === TypeConfirm.Null) {
      switch (this.props.workingTab) {
        case TypePage.Users:
          return <EditUser ref={this.props.ref} />;

        case TypePage.Resources:
          return <EditResource />;

        case TypePage.Groups:
          return <EditGroup ref={this.props.ref} />;

        // case TypePage.Domains:
        //   return <EditDomain />;

        default:
          return;
      }
    }
    if (this.props.confirmType !== TypeConfirm.Null) {
      return (
        <Confirm
          onHandleSubmit={this._onHandleSubmitEdit}
          onHandleCancel={this._onHandleCancelCfm}
          rcName={`edt.${this.props.workingTab}`}
          content={
            this.props.confirmType === TypeConfirm.Delete
              ? "Are you sure you want to delete the selected record?"
              : undefined
          }
        />
      );
    }
  };

  private _buildContentByWorkingTab = () => {
    if (this.props.workingTab) {
      switch (this.props.workingTab) {
        case TypePage.Domains:
          return "domain";
        case TypePage.Users:
          return "user";
        case TypePage.Resources:
          return "resource";
        case TypePage.Groups:
          return "group";
        default:
          return "";
      }
    }
    return "";
  };
  render() {
    const domainsColumnCustom = [
      {
        key: "IdDm",
        name: "ID",
        fieldName: "guid",
        minWidth: 80,
        priority: 2,
        data: "string",
        isNotFilter: true,
        onRender: (item: any) => {
          return <span>{item.guid}</span>;
        },
      },
      {
        key: "NameDm",
        name: "Domain",
        fieldName: "name",
        minWidth: 80,
        priority: 1,
        data: "string",
        onRender: (item: any) => {
          // let actionIdRc = BuildRCAttribute(`sp.${item.name}`);
          return (
            <span
            // {...actionIdRc}
            // className="column__action"
            // style={{ cursor: "pointer" }}
            // onClick={() => this._onOpenPanel(item)}
            >
              {item.name}
            </span>
          );
        },
      },
    ];

    const usersColumnCustom = [
      {
        key: "NameUs",
        name: "Name",
        fieldName: "name",
        priority: 2,
        minWidth: 80,
        maxWidth: 200,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.name}</span>;
        },
      },
      {
        key: "EmailUs",
        name: "Email",
        fieldName: "email",
        minWidth: 80,
        maxWidth: 250,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          let actionIdRc = BuildRCAttribute(`sp.${item.email}`);
          return (
            <span
              {...actionIdRc}
              className="column__action"
              style={{ cursor: "pointer" }}
              onClick={() => this._onOpenPanel(item)}
            >
              {item.email}
            </span>
          );
        },
      },
      {
        key: "JobUs",
        name: "Job Title",
        fieldName: "jobTitle",
        minWidth: 80,
        maxWidth: 150,
        priority: 4,
        data: "string",
        queryKey: "userProfile/jobTitle",
        onRender: (item: any) => {
          let text = "";
          if (item.userProfile && item.userProfile.jobTitle) {
            text = item.userProfile.jobTitle;
          }
          return <span>{text}</span>;
        },
      },
      {
        key: "OfficeUs",
        name: "Office",
        fieldName: "office",
        minWidth: 80,
        maxWidth: 200,
        priority: 5,
        data: "string",
        queryKey: "userProfile/office",
        onRender: (item: any) => {
          let text = "";
          if (item.userProfile && item.userProfile.office) {
            text = item.userProfile.office;
          }
          return <span>{text}</span>;
        },
      },
      {
        key: "DepartmentUs",
        name: "Department",
        fieldName: "department",
        minWidth: 80,
        maxWidth: 200,
        priority: 3,
        data: "string",
        queryKey: "userProfile/department",
        onRender: (item: any) => {
          let text = "";
          if (item.userProfile && item.userProfile.department) {
            text = item.userProfile.department;
          }
          return <span>{text}</span>;
        },
      },
    ];

    const resourcesColumnCustom = [
      {
        key: "NameRs",
        name: "Name",
        fieldName: "name",
        minWidth: 80,
        maxWidth: 200,
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.name}</span>;
        },
      },
      {
        key: "EmailRs",
        name: "Email",
        fieldName: "email",
        minWidth: 80,
        maxWidth: 250,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          let actionIdRc = BuildRCAttribute(`sp.${item.email}`);
          return (
            <span
              {...actionIdRc}
              className="column__action"
              style={{ cursor: "pointer" }}
              onClick={() => this._onOpenPanel(item)}
            >
              {item.email}
            </span>
          );
        },
      },

      {
        key: "DisplayNameRs",
        name: "Display Name",
        fieldName: "displayName",
        minWidth: 80,
        maxWidth: 200,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.displayName}</span>;
        },
      },
      {
        key: "CapacityRs",
        name: "Capacity",
        fieldName: "capacity",
        minWidth: 80,
        maxWidth: 100,
        priority: 4,
        data: "number",
        onRender: (item: any) => {
          return <span>{item.capacity}</span>;
        },
      },
      {
        key: "TimeZoneRs",
        name: "Time Zone",
        fieldName: "timeZone",
        minWidth: 80,
        maxWidth: 250,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.timeZone}</span>;
        },
      },
    ];

    const groupsColumnCustom = [
      {
        key: "NameGr",
        name: "Name",
        fieldName: "name",
        minWidth: 80,
        maxWidth: 300,
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          let actionIdRc = BuildRCAttribute(`sp.${item.name}`);
          return (
            <span
              {...actionIdRc}
              className="column__action"
              style={{ cursor: "pointer" }}
              onClick={() => this._onOpenPanel(item)}
            >
              {item.name}
            </span>
          );
        },
      },
      {
        key: "EmailGr",
        name: "Email",
        fieldName: "email",
        minWidth: 80,
        maxWidth: 400,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          return <span>{item.email}</span>;
        },
      },
      {
        key: "totalGr",
        name: "Total Member",
        fieldName: "members",
        minWidth: 80,
        data: "number",
        onRender: (item: any) => {
          return <span className="text-ellipsis-2">{item.members.length}</span>;
        },
      },
    ];

    const _BuildWorkingColumn = () => {
      if (this.props.workingTab) {
        switch (this.props.workingTab) {
          case TypePage.Users:
            return usersColumnCustom;

          case TypePage.Domains:
            return domainsColumnCustom;

          case TypePage.Groups:
            return groupsColumnCustom;

          case TypePage.Resources:
            return resourcesColumnCustom;

          default:
            return [];
        }
      }
      return [];
    };
    return (
      <OrganizationListWrapper
        className="OrganizationListWrapper"
        theme={this.props.theme}
      >
        <div
          className="renderListWrapper"
          style={{
            height: `95%`,
            width: "100%",
            position: "relative",
            margin: "20px 0",
          }}
        >
          <ListCustom
            customLoading={
              <LoadingSpinner
                rcName="loading"
                darkMode={this.props.theme}
              ></LoadingSpinner>
            }
            isLoading={this.state.loading}
            rcName={`org.${this.props.workingTab}`}
            columns={_BuildWorkingColumn()}
            isOffline={false}
            darkMode={this.props.theme}
            onGetSelectionItem={this._onHandleSelection}
            onRowClick={(item: any) => this._onHandleRowClick(item)}
            iconName={this._mapIconByWorkingTab()}
            selectedItems={this.props.workingOrgItems}
            queryClass={this._query}
            ref={this.Action}
          />
        </div>
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={
              this.props.isPanelPageOpen &&
              this.props.panelType === TypePanel.Edit
            }
            hasCloseButton
            headerText={
              this.props.confirmType === TypeConfirm.Null
                ? `Edit ${this._buildContentByWorkingTab()}`
                : "Confirmation"
            }
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={this._onHandleCancelPanel}
            styles={PanelStyle(this.props.theme)}
            customWidth={"750px"}
            type={PanelType.custom}
            rcName={`edit.${this.props.workingTab}`}
          >
            {this.RenderContentEdit()}
          </Panel>
        </Customizer>
      </OrganizationListWrapper>
    );
  }
}
