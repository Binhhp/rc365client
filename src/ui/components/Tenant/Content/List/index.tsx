import * as React from "react";
import { FetchDataFromServer, BuildRCAttribute } from "src/common/functions";
import { TypeConfirm, TypePage } from "src/entity/enums";
import { DataListSource } from "src/Dependencies/DataList/Interface";
import ListCustom from "src/Dependencies/DataList";
// import { DataListSource } from "aod-dependencies/DataList/Interface";
// import ListCustom from "aod-dependencies/DataList";
import EditResource from "src/ui/containers/Organization/Detail/EditResourceContainer";
import EditUser from "src/ui/containers/Organization/Detail/EditUserContainer";
import EditGroup from "src/ui/containers/Organization/Detail/EditGroupContainer";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { ITenantListProps, ITenantListState } from "./ListModel";
import { TenantListWrapper } from "./ListStyle";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import buildQuery from "odata-query";
import { LoadingSpinner } from "src/common/ui/Loading";
import { Redirect } from "react-router-dom";
import { SelectionMode } from "aod-dependencies/@uifabric/utilities/selection";
import { IconGeneralProps } from "src/common/style";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

class RenderList extends React.Component<ITenantListProps, ITenantListState> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ITenantListProps) {
    super(props);
    this.state = {
      item: null,
      cId: "",
      workflowId: "",
      isRedirect: false,
      isLoading: false,
    };
    this.Action = React.createRef();
    this._query = new DataListSource();
    this._query.GetData = async (
      pageIndex: number,
      skipNumber: number,
      nextLink: string | null,
      endpoint?: string
    ): Promise<any[]> => {
      this._onHandleUpdateLoadingDataList(true);
      let top = skipNumber;
      let skip = skipNumber * (pageIndex - 1);
      let endpointBuilded = buildQuery({ top, skip });
      let url =
        nextLink && nextLink !== ""
          ? nextLink
          : `${`${BuildURLWithTenantId(
              ApiFromOData.ODATA_API,
              true
            )}tenants`}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }`;
      // if (url.indexOf("licenceType") !== -1) {
      //   url = url.replace("licenceType", "tenantInfo/licenceInfo/licenceType");
      // }
      this.setState({ ...this.state, isLoading: true });
      await FetchDataFromServer({
        url: url,
      })
        .then((res) => {
          if (res) {
            this._query.source = res.value;
          }
          this._onHandleUpdateLoadingDataList(false);
        })
        .catch(() => {
          this._onHandleUpdateLoadingDataList(false);
        });
      this.setState({ ...this.state, isLoading: false });
      return [];
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ITenantListProps) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      nextProps.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    let isReloadProps = IsCanBeReload(
      this.props.conversationId || "",
      this.props.signalRConversationId,
      nextProps.workflowId,
      nextProps.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    let isReloadStorage = IsCanBeReload(
      this.props.tenantCId || "",
      this.props.signalRConversationId,
      this.props.tenantWId,
      nextProps.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReload || isReloadProps || isReloadStorage) {
      this._onHandleGetDataForm();
    }
  }

  private _onHandleUpdateSelectedTenantTS = (items: any[]) => {
    if (this.props.OnSelectTenants) {
      this.props.OnSelectTenants(items);
    }
  };
  private _onHandleResetSignalRInfomations = () => {
    if (this.props.OnResetSignalRInfomations) {
      this.props.OnResetSignalRInfomations();
    }
  };

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    this._onHandleResetSignalRInfomations();
    this.props.OnClearCidAndWorkflowId();
    await this.Action.current.onHandleQueryDataByClassType();
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "" });
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
    let crtSelectedItems = [...selectedItems];
    if (selectedItems.length > 1) {
      crtSelectedItems = [crtSelectedItems[crtSelectedItems.length - 1]];
    }
    this._onHandleUpdateSelectedTenantTS(crtSelectedItems);
  };

  private _onResetApplicationStore = () => {
    if (this.props.OnResetApplicationStore) {
      this.props.OnResetApplicationStore();
    }
  };

  private _onHandleUnregisterByWorkingTab = async () => {
    if (this.props.workingTab && this.props.organizationInfomation) {
      switch (this.props.workingTab) {
        case TypePage.Users:
          if (this.props.OnHandleUnregister && this.props.user) {
            await this.props
              .OnHandleUnregister(
                this.props.organizationInfomation.id,
                this.props.user.id
              )
              .then((res) => {
                this.setState({
                  workflowId: res.workflowId || "",
                  cId: res.conversationId,
                });
              });
          }
          return;

        case TypePage.Groups:
          console.log("Unregister Group");
          return;
        case TypePage.Resources:
          console.log("Unregister Resources");
          return;

        default:
          console.log("Unregister domain");
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

  private _onOpenPanel = async (item: any) => {
    if (this.props.OnUpdateWorkingTenant) {
      this.props.OnUpdateWorkingTenant(item);
    }
    return this.setState({ isRedirect: true });
  };

  onSubmitUpdate = async () => {
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
          return <EditGroup />;

        default:
          return;
      }
    }
    if (this.props.confirmType !== TypeConfirm.Null) {
      return (
        <Confirm
          onHandleSubmit={this._onHandleSubmitEdit}
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

  render() {
    const StatusOpts = [
      { key: "Active", text: "Active" },
      { key: "InActive", text: "InActive" },
    ];
    const TenantColumn = [
      {
        key: "nameTn",
        name: "Name",
        fieldName: "name",
        minWidth: 80,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          let actionIdRc = BuildRCAttribute(`sp.${item.name}`);
          return (
            <span
              {...actionIdRc}
              className="column__action text-ellipsis-3"
              style={{ cursor: "pointer" }}
              onClick={() => this._onOpenPanel(item)}
            >
              {item.name}
            </span>
          );
        },
      },
      {
        key: "ownerTn",
        name: "Owner",
        fieldName: "ownerInfo",
        minWidth: 80,
        priority: 3,
        data: "string",
        queryMultipleKeys: ["tenantInfo/owner/name", "tenantInfo/owner/email"],
        queryKey: "tenantInfo/owner/name",
        onRender: (item: any) => {
          let name = "";
          let email = "";
          if (item.tenantInfo && item.tenantInfo.owner) {
            name = item.tenantInfo.owner.name;
          }
          if (item.tenantInfo && item.tenantInfo.owner) {
            email = item.tenantInfo.owner.email;
          }
          return (
            <span className="text-ellipsis-3">{`${name} (${email})`}</span>
          );
        },
      },
      {
        key: "licenseTn",
        name: "License Type",
        fieldName: "licenceType",
        minWidth: 80,
        priority: 2,
        data: "string",
        queryKey: "tenantInfo/licenceInfo/licenceType",
        onRender: (item: any) => {
          let text = "";
          if (item.tenantInfo && item.tenantInfo.licenceInfo) {
            text = item.tenantInfo.licenceInfo.licenceType;
          }
          return <span className="text-ellipsis-3">{text}</span>;
        },
      },
      {
        key: "statusTn",
        name: "Status",
        fieldName: "status",
        minWidth: 80,
        data: "boolean|string",
        booleanFormOpts: StatusOpts,
        onRender: (item: any) => {
          return <span className="text-ellipsis-3">{item.status}</span>;
        },
      },
    ];

    if (this.state.isRedirect && this.props.workingTenant) {
      return <Redirect to={`/tenant/${this.props.workingTenant.id}`} />;
    }
    return (
      <TenantListWrapper className="TenantListWrapper" theme={this.props.theme}>
        <div
          className="renderListWrapper"
          style={{
            height: `95%`,
            width: "100%",
            position: "relative",
            margin: "20px 0",
          }}
        >
          {!this.props.isLoadingOrgInfomation ? (
            <ListCustom
              customLoading={
                <LoadingSpinner
                  rcName="loading"
                  darkMode={this.props.theme}
                ></LoadingSpinner>
              }
              onHandleItems={this.props.OnGetNumberTenants}
              isLoading={this.state.isLoading}
              rcName={`tenant`}
              columns={TenantColumn}
              isOffline={false}
              darkMode={this.props.theme}
              onGetSelectionItem={this._onHandleSelection}
              iconName={IconGeneralProps.tenantIcon.iconName}
              selectionMode={SelectionMode.single}
              selectedItems={this.props.selectedTenants}
              queryClass={this._query}
              ref={this.Action}
            />
          ) : (
            <LoadingSpinner rcName="org" darkMode={this.props.theme} />
          )}
        </div>
      </TenantListWrapper>
    );
  }
}

export default RenderList;
