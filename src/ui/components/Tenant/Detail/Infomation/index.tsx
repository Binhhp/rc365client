import * as React from "react";
import { BaseTenant, TenantDto } from "src/common/classes/BaseTenant";
import { ITenantDetailProps, ITenantDetailStates } from "./InfomationModel";
import { DetailWrapper, ActionWrapper } from "./InfomationStyle";
import Form from "src/ui/containers/Tenant/TenantFormContainer";
import { IconGeneralProps } from "src/common/style";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { TypeConfirm } from "src/entity/enums";
import { Redirect } from "react-router-dom";
import { ValidateFunctions } from "src/common/functions";

class Detail extends React.Component<ITenantDetailProps, ITenantDetailStates> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ITenantDetailProps) {
    super(props);
    this.state = {
      tenant: new BaseTenant(),
      isAssign: false,
      isRedirect: false,
    };
    this.Action = React.createRef();
  }

  UNSAFE_componentWillMount() {
    if (this.props.workingTenant) {
      let tenant = this._BuildNewTenant();
      this.setState({ tenant });
    }
  }

  private _BuildNewTenant = (): BaseTenant => {
    let newTenant = new BaseTenant();
    if (this.props.workingTenant) {
      let tenantDto = new TenantDto();
      tenantDto.id = this.props.workingTenant.id;
      tenantDto.name = this.props.workingTenant.name;
      tenantDto.status = this.props.workingTenant.status;
      tenantDto.isDisposed = this.props.workingTenant.isDisposed;
      tenantDto.sequenceNumber = this.props.workingTenant.sequenceNumber;
      tenantDto.version = this.props.workingTenant.version;
      tenantDto.isDeleted = this.props.workingTenant.isDeleted;
      return new BaseTenant(tenantDto);
    }
    return newTenant;
  };

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

  private _onHandleOpenDetailPanel = (val: boolean) => {
    if (this.props.onHandleOpenPanel) {
      this.props.onHandleOpenPanel(val);
    }
  };
  private _onHandleUpdateWorkingTenant = (tenant: BaseTenant) => {
    if (this.props.OnUpdateWorkingTenant) {
      this.props.OnUpdateWorkingTenant(tenant);
    }
  };

  onHandleSave = async () => {
    await this._onHandleSaveDataTS();
    let isHaveErrors = await this._onCheckIsHaveErrors();
    if (isHaveErrors && this.props.isWorking) {
      this._onHandleOpenDetailPanel(true);
      this._onHandleUpdateConfirmType(TypeConfirm.Submit);
    } else {
      await this._onHandleErrorFieldTS();
    }
  };

  onHandleCancelCreate = () => {
    if (this.props.isWorking) {
      this._onHandleOpenDetailPanel(true);
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
    if (!this.props.isWorking) {
      this.setState({ isRedirect: true });
    }
  };

  onHandleFormData = (tenant: BaseTenant, isAssign: boolean) => {
    this.setState({ isAssign, tenant });
    if (tenant.id !== "") {
      this._onHandleUpdateWorkingTenant(tenant);
    }
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/tenants" />;
    }
    return (
      <DetailWrapper theme={this.props.theme} className="DetailWrapper">
        <ActionWrapper className="ActionWrapper" theme={this.props.theme}>
          <CommandBarButton
            onClick={this.onHandleSave}
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
            onClick={this.onHandleCancelCreate}
          />
        </ActionWrapper>
        <Form
          onGetTenantData={this.onHandleFormData}
          isAllVisibled={true}
          workingTenant={this.props.workingTenant}
          rcName={this.props.rcName}
          ref={this.Action}
        />
      </DetailWrapper>
    );
  }
}

export default Detail;
