import * as React from "react";
import { IInfomationProps, IInfomationStates } from "./InfomationModel";
import {
  InfomationWrapper,
  ActionWrapper,
  ConfirmWrapper,
} from "./InfomationStyle";
import { TypeConfirm } from "src/entity/enums";
import { IconGeneralProps } from "src/common/style";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { Redirect } from "react-router-dom";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { BuildRCAttribute, ValidateFunctions } from "src/common/functions";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { PanelStyle } from "src/common/style";
import Confirm from "src/common/ui/ConfirmPanel";
import { Icon } from "aod-dependencies/@uifabric/icons1";
import Form from "src/ui/containers/Tenant/TenantFormContainer";

class Infomation extends React.Component<IInfomationProps, IInfomationStates> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IInfomationProps) {
    super(props);
    this.state = {
      isAssign: false,
      isRedirect: false,
      tenant: new BaseTenant(),
    };
    this.Action = React.createRef();
  }

  private _onHandleSaveDataTS = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.OnHandleFormData();
  };

  private _onHandleErrorFieldTS = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.OnHandleError();
    this.Action.current.OnFocusInErrorField();
  };

  componentDidMount() {
    this.setState({
      tenant: this.props.workingTenant,
      isAssign: this.props.isAssign,
    });
  }

  componentWillUnmount() {
    let crtTenant = this.state.tenant.Clone() as BaseTenant;
    this.props.onGetTenantData(crtTenant, this.state.isAssign);
  }

  private _onHandleCancelCreate = () => {
    if (this.props.isWorking) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
      this._onHandleUpdatePanelVisible(true);
    } else {
      this.setState({ isRedirect: true });
    }
  };

  private _onCheckIsHaveErrors = (): boolean => {
    let isInvalidTenant = this.state.tenant.isHaveEmpty(this.state.isAssign);
    if (
      !ValidateFunctions.onValidateIsEmail(
        this.state.tenant.tenantInfo.owner.email
      ) ||
      this.state.tenant.tenantInfo.owner.email.length > 64
    ) {
      return false;
    }
    return !isInvalidTenant;
  };

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };
  private _onHandleUpdatePanelVisible = (val: boolean) => {
    if (this.props.isPanelPageOpen !== val && this.props.OnUpdatePanelVisible) {
      this.props.OnUpdatePanelVisible(val);
    }
  };

  private _onHandleUpdateStorageIds = (cId: string, wId: string) => {
    if (this.props.OnUpdateTenantCId) {
      this.props.OnUpdateTenantCId(cId);
    }
    if (this.props.OnUpdateTenantWId) {
      this.props.OnUpdateTenantWId(wId);
    }
  };

  private _onHandleCreateTenant = () => {
    if (this.props.OnCreateTenant) {
      let crtTenant = this.state.tenant.Clone() as BaseTenant;
      this.props.OnCreateTenant(crtTenant, this.state.isAssign);
    }
  };

  private _onHandleSave = async () => {
    await this._onHandleSaveDataTS();
    let isDontHaveErrors = await this._onCheckIsHaveErrors();
    if (isDontHaveErrors && this.props.isWorking) {
      this._onHandleUpdatePanelVisible(true);
      this._onHandleUpdateConfirmType(TypeConfirm.Submit);
    } else {
      this._onHandleErrorFieldTS();
    }
  };

  private _onHandleSubmitConfirm = () => {
    this._onHandleUpdatePanelVisible(false);
    if (this.props.confirmType === TypeConfirm.Submit) {
      this._onHandleCreateTenant();
    }
    setTimeout(() => {
      this.setState({ isRedirect: true });
    }, 0);
  };

  private _onHandleCancelPanel = () => {
    let value = !this.props.isPanelPageOpen;
    if (value === false) {
      this._onHandleUpdateConfirmType(TypeConfirm.Null);
    }
    this._onHandleUpdatePanelVisible(value);
  };

  onHandleFormData = (tenant: BaseTenant, isAssign: boolean) => {
    this.setState(
      {
        tenant,
        isAssign,
      },
      () => this.props.onGetTenantData(tenant, this.state.isAssign)
    );
  };

  render() {
    let tenantName = BuildRCAttribute("cfm.tenant.name");
    let tenantLicence = BuildRCAttribute("cfm.tenant.licence");
    let tenantOwnerName = BuildRCAttribute("cfm.tenant.ownerName");
    let tenantOwnerEmail = BuildRCAttribute("cfm.tenant.ownerEmail");
    let tenantOwnerPhone = BuildRCAttribute("cfm.tenant.ownerPhone");
    if (this.state.isRedirect) {
      return <Redirect to={`/tenants`} />;
    }
    return (
      <InfomationWrapper theme={this.props.theme} className="InfomationWrapper">
        <ActionWrapper className="ActionWrapper" theme={this.props.theme}>
          <CommandBarButton
            onClick={this._onHandleSave}
            iconProps={IconGeneralProps.saveIcon}
            text="Save"
            rcName={`save.tenant`}
            darkMode={this.props.theme}
            disabled={!this.props.isWorking}
          />
          <CommandBarButton
            iconProps={IconGeneralProps.cancelIcon}
            text="Cancel"
            rcName={`cancel.tenant`}
            darkMode={this.props.theme}
            onClick={this._onHandleCancelCreate}
          />
        </ActionWrapper>
        <Form
          onGetTenantData={this.onHandleFormData}
          isAllVisibled={false}
          rcName={this.props.rcName}
          ref={this.Action}
          workingTenant={this.props.workingTenant}
        />
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
            type={
              this.props.confirmType === TypeConfirm.Submit
                ? PanelType.medium
                : PanelType.smallFixedFar
            }
            rcName={`tenant`}
          >
            <Confirm
              onHandleSubmit={this._onHandleSubmitConfirm}
              onHandleCancel={() => this._onHandleUpdatePanelVisible(false)}
              theme={this.props.theme}
              type={this.props.confirmType}
            >
              {this.props.confirmType === TypeConfirm.Submit && (
                <ConfirmWrapper
                  className="ConfirmWrapper"
                  theme={this.props.theme}
                >
                  <div className="item__tenant">
                    <h2 className="item__name">
                      <Icon
                        iconName="RecruitmentManagement"
                        style={{ paddingRight: 10 }}
                      />
                      <span {...tenantName}>{this.state.tenant.name}</span>
                    </h2>
                    <span {...tenantLicence} className="item__location">
                      {this.state.tenant.tenantInfo.licenceInfo.licenceType}
                    </span>
                  </div>
                  {this.state.isAssign && (
                    <div className="item__owner">
                      <h3 {...tenantOwnerName}>
                        {this.state.tenant.tenantInfo.owner.name}
                      </h3>
                      <p {...tenantOwnerEmail}>
                        {this.state.tenant.tenantInfo.owner.email}
                      </p>
                      <p {...tenantOwnerPhone}>
                        {this.state.tenant.tenantInfo.owner.phoneNumber}
                      </p>
                    </div>
                  )}
                </ConfirmWrapper>
              )}
            </Confirm>
          </Panel>
        </Customizer>
      </InfomationWrapper>
    );
  }
}

export default Infomation;
