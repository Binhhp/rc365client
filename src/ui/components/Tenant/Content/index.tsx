import * as React from "react";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { PanelStyle } from "src/common/style";
import { IconGeneralProps } from "src/common/style";
import { ITenantProps, ITenantStates } from "./ContentModel";
import { TenantWrapper, ActionButtonWrapper } from "./ContentStyles";
import TenantList from "src/ui/containers/Tenant/TenantListContainer";
import { BuildFunction, BuildRCAttribute } from "src/common/functions";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { TypeConfirm } from "src/entity/enums";
import Confirm from "src/common/ui/ConfirmPanel";
import { Redirect } from "react-router-dom";
import { toastNotify } from "src/common/ui/Toast";

class Tenant extends React.Component<ITenantProps, ITenantStates> {
  constructor(props: ITenantProps) {
    super(props);
    this.state = {
      cId: "",
      workflowId: "",
      tenantName: "root",
      isRedirect: false,
      numberTenants: 0,
    };
  }
  UNSAFE_componentWillMount() {
    let rootNode = {
      id: "1",
      text: "Tenant",
      isSelected: true,
      parentId: "#",
      url: "tenants",
    };
    let node = BuildFunction.buildNodeForBreadcrumb(rootNode);
    this._onHandleUpdateBreadCrumb([node]);
    this._HandleResetTenantStore();
    this._onHandleGetLicenceList();
  }

  componentDidMount() {
    let tenantInfo = localStorage.getItem("tenantId");
    if (tenantInfo) {
      this.setState({ tenantName: JSON.parse(tenantInfo).name });
    }
  }

  private _onHandleGetLicenceList = () => {
    if (this.props.OnGetLicenceList) {
      this.props.OnGetLicenceList();
    }
  };

  private _HandleResetTenantStore = () => {
    if (this.props.OnResetTenantStore) {
      this.props.OnResetTenantStore();
    }
  };

  private _onSwitchTenant = async () => {
    if (this.props.selectedTenants && this.props.selectedTenants.length === 1) {
      let tenantInfoObj = {
        name: this.props.selectedTenants[0].name,
        id: this.props.selectedTenants[0].id,
      };
      await localStorage.setItem("tenantId", JSON.stringify(tenantInfoObj));
      this.setState({ tenantName: this.props.selectedTenants[0].name });
      toastNotify.success({
        message: `Switched tenant ${tenantInfoObj.name}`,
        title: "Switch tenant",
      });
      this._onHandleResetSelectedTenant();
    }
  };

  private _onHandleSubmitConfirm = () => {
    this._onUpdatePanelVisibled(false);
    if (this.props.confirmType === TypeConfirm.Delete) {
      this._onDeleteTenant();
    }
    if (this.props.confirmType === TypeConfirm.Unavailable) {
      this._onSwitchTenant();
    }
  };

  private _onHandleUpdateBreadCrumb = (nodes: INodes[]) => {
    if (this.props.OnUpdateBeardCrumb) {
      this.props.OnUpdateBeardCrumb(nodes);
    }
  };
  private _onHandleResetSelectedTenant = () => {
    if (this.props.OnResetSelectedTenant) {
      this.props.OnResetSelectedTenant();
    }
  };

  private _onDeleteTenant = () => {
    if (this.props.OnDeleteTenant && this.props.selectedTenants) {
      this.props
        .OnDeleteTenant(this.props.selectedTenants[0].id)
        .then((res) => {
          if (res) {
            this._onHandleResetSelectedTenant();
            this.setState({
              cId: res.conversationId,
              workflowId: res.workflowId || "",
            });
          }
        });
    }
  };

  private _onHandleDeleteTenant = () => {
    this._onUpdatePanelVisibled(true);
    this._onHandleUpdateConfirmType(TypeConfirm.Delete);
  };

  private _onHandleCreateTenant = () => {
    this.setState({ isRedirect: true });
  };

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType && this.props.confirmType !== type) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onUpdatePanelVisibled = (val: boolean) => {
    if (this.props.OnUpdatePanelPage && val !== this.props.isPanelPageOpen) {
      this.props.OnUpdatePanelPage(val);
    }
  };

  private _onHandleCancelPanel = () => {
    let value = !this.props.isPanelPageOpen;
    if (value === false) {
      this._onHandleUpdateConfirmType(TypeConfirm.Null);
    }
    this._onUpdatePanelVisibled(value);
  };

  onHandleSwitchTenant = () => {
    if (this.props.selectedTenants && this.props.selectedTenants.length === 1) {
      this._onHandleUpdateConfirmType(TypeConfirm.Unavailable);
      this._onUpdatePanelVisibled(true);
    }
  };

  onHandleResetTenant = () => {
    let tenant = localStorage.getItem("tenantId");
    if (tenant) {
      this.setState({ tenantName: "root" });
      localStorage.removeItem("tenantId");
    }
  };

  onGetNumberTenants = (items: any[], numbers: number) => {
    this.setState({ numberTenants: numbers });
  }

  RenderPanelContent = () => {
    return (
      <Confirm
        onHandleSubmit={this._onHandleSubmitConfirm}
        onHandleCancel={() => this._onUpdatePanelVisibled(false)}
        theme={this.props.theme}
        type={this.props.confirmType}
        content={
          this.props.confirmType === TypeConfirm.Unavailable
            ? "Do you want to switch tenant?"
            : "Do you want to delete the selected tentant(s)?"
        }
      />
    );
  };

  render() {
    let wrapper = BuildRCAttribute("tenant.list");
    if (this.state.isRedirect) {
      return <Redirect to="/tenant/create" />;
    }
    return (
      <TenantWrapper
        {...wrapper}
        theme={this.props.theme}
        className="TenantWrapper"
      >
        <ActionButtonWrapper
          className="ActionButtonWrapper"
          theme={this.props.theme}
        >
          <div className="action__blk">
            <CommandBarButton
              onClick={this._onHandleCreateTenant}
              iconProps={IconGeneralProps.addIcon}
              text="Create"
              rcName="cre.tenant"
              darkMode={this.props.theme}
            />
            <CommandBarButton
              // disabled={!isDisabled}
              iconProps={IconGeneralProps.deleteIcon}
              text="Delete"
              rcName="del.tenant"
              darkMode={this.props.theme}
              onClick={this._onHandleDeleteTenant}
              disabled={
                !this.props.selectedTenants ||
                (this.props.selectedTenants &&
                  this.props.selectedTenants.length < 1)
              }
            />
            <CommandBarButton
              onClick={this.onHandleSwitchTenant}
              iconProps={IconGeneralProps.switchIcon}
              text="Switch tenant"
              rcName="switch.tenant"
              darkMode={this.props.theme}
              disabled={
                this.props.selectedTenants &&
                this.props.selectedTenants.length !== 1
              }
            />
            {this.state.tenantName !== "root" && (
              <CommandBarButton
                onClick={this.onHandleResetTenant}
                iconProps={IconGeneralProps.refreshIcon}
                text="Reset tenant"
                rcName="reset.tenant"
                darkMode={this.props.theme}
              />
            )}
          </div>
          <div className="tenant__info">
            <div className="tenant__name">
              <span>Working tenant: </span>
              <strong>{this.state.tenantName}</strong>
            </div>
            <div className="tenant__number">
              <span>Numbers: </span>
              <span>{this.state.numberTenants}</span>
            </div>
          </div>
        </ActionButtonWrapper>
        <TenantList
          OnGetNumberTenants={this.onGetNumberTenants}
          conversationId={this.state.cId}
          workflowId={this.state.workflowId}/>
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={this.props.isPanelPageOpen}
            hasCloseButton
            headerText={"Confirmation"}
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={this._onHandleCancelPanel}
            styles={PanelStyle(this.props.theme)}
            type={PanelType.smallFixedFar}
            rcName={`tenant`}
          >
            {this.RenderPanelContent()}
          </Panel>
        </Customizer>
      </TenantWrapper>
    );
  }
}

export default Tenant;
