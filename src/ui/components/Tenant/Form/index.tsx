import { Icon } from "aod-dependencies/@uifabric/icons1";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import Dropdown from "aod-dependencies/Dropdown/CustomDropdown";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { Stack } from "aod-dependencies/Stack";
import TextField from "aod-dependencies/TextField/CustomTextField";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { BaseTenant, TenantDto } from "src/common/classes/BaseTenant";
import { NewErrorType } from "src/common/constants/ErrorTypes";
import { BuildRCAttribute } from "src/common/functions";
import {
  ErrorFieldItem,
  FieldValidateFunctions,
  IRenderErrorMessageField,
  IValidateStringAndReturnErrors,
} from "src/common/functions/FieldValidate";
import { PanelStyle } from "src/common/style";
import Confirm from "src/common/ui/ConfirmPanel";
import { TypeConfirm } from "src/entity/enums";
import { IFormProps, IFormStates } from "./FormModel";
import { ConfirmWrapper, FormWrapper } from "./FormStyle";

class Infomation extends React.Component<IFormProps, IFormStates> {
  constructor(props: IFormProps) {
    super(props);
    this.state = {
      // isAssign: false,
      isRedirect: false,
      // isAllVisibled: false,
      tenant: new BaseTenant(),
      options: [],
      errors: [],
    };
  }

  componentDidMount() {
    this._onFocusInFirstInput();
    if (this.props.workingTenant) {
      let tenant = this._BuildNewTenant();
      this.setState({
        tenant: tenant,
        // isAssign: this.props.isAssign || false,
        // isAllVisibled: this.props.isAllVisibled,
      });
    } else {
      this.setState({
        // isAllVisibled: this.props.isAllVisibled,
      });
    }
    if (
      !this.props.licenceTypes ||
      (this.props.licenceTypes && this.props.licenceTypes.length < 1)
    ) {
      this._onHandleGetLicences();
    } else {
      this._BuildOptionByLicences();
    }
  }

  componentWillUnmount() {
    this.OnHandleFormData();
  }

  componentDidUpdate(prevProps: IFormProps, prevState: IFormStates) {
    if (
      (!prevProps.workingTenant || !prevProps.workingTenant.id) &&
      this.props.workingTenant &&
      this.props.workingTenant.id &&
      this.state.tenant.id === ""
    ) {
      let tenant = this._BuildNewTenant();
      this.setState({ tenant: tenant });
    }
  }

  OnHandleFormData = () => {
    let crtTenant = this.state.tenant.Clone() as BaseTenant;
    // let val = this.props.isAllVisibled || this.state.isAssign ? true : false;

    this.props.onGetTenantData(crtTenant, true);
  };

  private _onFocusInFirstInput = () => {
    let itemEmpty: HTMLElement = document.querySelectorAll(
      `[data-rc-id='txt.name.${this.props.rcName}']`
    )[0] as HTMLElement;
    if (itemEmpty) {
      return itemEmpty.focus();
    }
  };

  private _onHandleGetLicences = () => {
    if (this.props.OnGetLicenceList) {
      this.props.OnGetLicenceList().then((res) => {
        if (res) {
          this._BuildOptionByLicences(res);
        }
      });
    }
  };

  private _BuildOptionByLicences = (licence?: string[]) => {
    let licenceTypes = licence ? licence : this.props.licenceTypes;
    if (licenceTypes && licenceTypes.length > 0) {
      let opts = licenceTypes
        .sort((a, b) => a.localeCompare(b))
        .map((l) => {
          return { key: l, text: l } as IDropdownOption;
        });
      this.setState({ options: opts });
    }
  };

  private _BuildNewTenant = (): BaseTenant => {
    let newTenant = new BaseTenant();
    if (this.props.workingTenant) {
      let tenantDto = new TenantDto();
      tenantDto.id = this.props.workingTenant.id;
      tenantDto.name = this.props.workingTenant.name;
      tenantDto.isDisposed = this.props.workingTenant.isDisposed;
      tenantDto.tenantInfo = this.props.workingTenant.tenantInfo;
      tenantDto.sequenceNumber = this.props.workingTenant.sequenceNumber;
      tenantDto.version = this.props.workingTenant.version;
      tenantDto.isDeleted = this.props.workingTenant.isDeleted;
      return new BaseTenant(tenantDto);
    }
    return newTenant;
  };

  private _mapKeyFieldWithCheckTypes = (key: string): NewErrorType[] => {
    switch (key) {
      case "ownerName":
      case "name":
        return [NewErrorType.Empty, NewErrorType.Length];
      case "licenceType":
        return [NewErrorType.Select];
      case "ownerEmail":
        return [NewErrorType.Empty, NewErrorType.Email, NewErrorType.Length];
      case "ownerPhoneNumber":
        return [NewErrorType.Empty, NewErrorType.Length];
      default:
        return [];
    }
  };

  private _mapMaxMinLengthByKey = (key: string): number[] | undefined => {
    switch (key) {
      case "ownerPhoneNumber":
        return [64, 0];
      case "ownerEmail":
        return [64, 0];
      default:
        return undefined;
    }
  };

  private _onHandleErrorsCase = (
    str: string,
    key: string,
    test?: ErrorFieldItem[]
  ): ErrorFieldItem[] => {
    let types = this._mapKeyFieldWithCheckTypes(key);
    let condition = this._mapMaxMinLengthByKey(key);
    let obj: IValidateStringAndReturnErrors = {
      errors: test ? test : this.state.errors,
      key,
      str,
      types,
      maxLength: condition ? condition[0] : undefined,
      minLength: condition ? condition[1] : undefined,
    };
    return FieldValidateFunctions.ValidateStringAndReturnErrors(obj);
  };

  private onChangeText = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtTenant = this.state.tenant.Clone() as BaseTenant;
    this._onHandleUpdateWorkingStatus(true);
    // tenant
    if (newValue && nameInput !== null) {
      let newTenant = crtTenant.UpdateByKey(nameInput, newValue);
      let errors = this._onHandleErrorsCase(newValue, nameInput);
      return this.setState({ tenant: newTenant, errors });
    }
    if (!newValue && nameInput !== null) {
      let newTenant = crtTenant.UpdateByKey(nameInput, "");
      let errors = this._onHandleErrorsCase("", nameInput);
      return this.setState({ tenant: newTenant, errors });
    }
  };

  private _onHandleSelectDropdown = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number,
    type?: string
  ) => {
    this._onHandleUpdateWorkingStatus(true);
    if (option && type) {
      let crtTenant = this.state.tenant.Clone() as BaseTenant;
      let errors = this._onHandleErrorsCase(String(option.key), type);
      crtTenant = crtTenant.UpdateByKey(type, String(option.key));
      this.setState(
        {
          tenant: crtTenant,
          errors,
        },
        () => this.OnHandleFormData()
      );
    }
  };

  private _onHandleBuildErrorMsgTextLocal = (type: string) => {
    let condition = this._mapMaxMinLengthByKey(type);
    let baseFromTenant = {
      _name: this.state.tenant.name,
      _licenceType: this.state.tenant.tenantInfo.licenceInfo.licenceType,
      _ownerName: this.state.tenant.tenantInfo.owner.name,
      _ownerEmail: this.state.tenant.tenantInfo.owner.email,
      _ownerPhoneNumber: this.state.tenant.tenantInfo.owner.phoneNumber,
    };
    let obj: IRenderErrorMessageField = {
      key: type,
      base: baseFromTenant,
      errors: this.state.errors,
      maxLength: condition ? condition[0] : undefined,
      minLength: condition ? condition[1] : undefined,
    };
    return FieldValidateFunctions.RenderErrorMessageField(obj);
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

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleCreateTenant = () => {
    if (this.props.OnCreateTenant) {
      let crtTenant = this.state.tenant.Clone() as BaseTenant;
      this.props.OnCreateTenant(crtTenant);
    }
  };

  // private _onHandleCheck = () => {
  //   let value = !this.state.isAssign;
  //   this.setState({ isAssign: value });
  // };

  private _onHandleTrim = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtTenant = this.state.tenant.Clone() as BaseTenant;
    if (nameInput !== null) {
      crtTenant.name = crtTenant.name.trim();
      crtTenant.tenantInfo.owner.name = crtTenant.tenantInfo.owner.name.trim();
      crtTenant.tenantInfo.owner.email =
        crtTenant.tenantInfo.owner.email.trim();
      crtTenant.tenantInfo.owner.phoneNumber =
        crtTenant.tenantInfo.owner.phoneNumber.trim();
      return this.setState({ tenant: crtTenant });
    }
  };

  private _onHandleSubmitConfirm = () => {
    this._onHandleUpdatePanelVisible(false);
    this._onHandleCreateTenant();
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

  OnFocusInErrorField = () => {
    let crtErrors = [...this.state.errors];
    if (crtErrors.length > 0) {
      let itemEmpty: HTMLElement = document.querySelectorAll(
        `[data-rc-id='txt.${crtErrors[0].key}.${this.props.rcName}']`
      )[0] as HTMLElement;
      if (itemEmpty) {
        return itemEmpty.focus();
      }
    }
  };

  OnHandleError = async () => {
    let crtTenant = this.state.tenant.Clone() as BaseTenant;
    let name = crtTenant.name;
    let crtErrors = [...this.state.errors];
    let licence = crtTenant.tenantInfo.licenceInfo.licenceType;
    let reqArr = [
      { key: "name", value: name },
      { key: "licenceType", value: licence },
      { key: "ownerName", value: crtTenant.tenantInfo.owner.name },
      { key: "ownerEmail", value: crtTenant.tenantInfo.owner.email },
      {
        key: "ownerPhoneNumber",
        value: crtTenant.tenantInfo.owner.phoneNumber,
      },
    ];
    // if (!this.state.isAssign || this.props.isAllVisibled) {
    //   reqArr = reqArr.filter(
    //     (i) => !["ownerName", "ownerEmail", "ownerPhoneNumber"].includes(i.key)
    //   );
    // }
    reqArr.forEach((i) => {
      let err = this._onHandleErrorsCase(i.value, i.key, crtErrors);
      crtErrors = err;
    });
    this.setState({ errors: crtErrors });
  };

  render() {
    let idTenantName = BuildRCAttribute("sp.tenant.name");
    let idTenantLincence = BuildRCAttribute("sp.tenant.licence");
    let idOwnerName = BuildRCAttribute("sp.owner.name");
    let idOwnerEmail = BuildRCAttribute("sp.owner.email");
    let idOwnerPhone = BuildRCAttribute("sp.owner.phone");
    let idOwnerCfmWrapper = BuildRCAttribute("blk.cfm.owner.wrapper");
    let idOwnerWrapper = BuildRCAttribute("blk.owner.wrapper");
    if (this.state.isRedirect) {
      return <Redirect to={`/tenants`} />;
    }
    return (
      <FormWrapper theme={this.props.theme} className="FormWrapper">
        <Stack className="infomation__stack" horizontal wrap>
          <Stack.Item className="infomation__block" grow={3}>
            <h3 className="infomation__title">Information</h3>
            <TextField
              placeholder="Place Holder"
              onChange={this.onChangeText}
              name="name"
              label="Name"
              darkMode={this.props.theme}
              value={this.state.tenant.name}
              rcName={`name.${this.props.rcName}`}
              errorMessage={this._onHandleBuildErrorMsgTextLocal("name")}
              required
              onBlur={this._onHandleTrim}
            />
            <Dropdown
              rcName={`license.${this.props.rcName}`}
              onChange={(
                event: React.FormEvent<HTMLDivElement>,
                option?: IDropdownOption,
                index?: number
              ) =>
                this._onHandleSelectDropdown(
                  event,
                  option,
                  index,
                  "licenceType"
                )
              }
              className="infomation__license"
              placeholder="License"
              options={this.state.options}
              errorMessage={this._onHandleBuildErrorMsgTextLocal("licenceType")}
              selectedKey={this.state.tenant.tenantInfo.licenceInfo.licenceType}
              darkMode={this.props.theme}
              label="License"
              required
            />
            {/* {!this.state.isAllVisibled && (
              <div {...idAssignWrapper} className="AssignWrapper">
                <p>
                  You are the default owner if you do not assign for someone.
                </p>
                <Checkbox
                  darkMode={this.props.theme}
                  label="Assign Owner"
                  checked={this.state.isAssign}
                  onChange={this._onHandleCheck}
                  rcName="tenant.assign"
                />
              </div>
            )} */}
          </Stack.Item>
          <Stack.Item className="infomation__block" grow={3}>
            {/* {(this.state.isAssign || this.state.isAllVisibled) && ( */}
            <div {...idOwnerWrapper} className="OwnerWrapper">
              <h3 className="infomation__title">Owner</h3>
              <TextField
                placeholder="Place Holder"
                onChange={this.onChangeText}
                name="ownerName"
                label="Name"
                darkMode={this.props.theme}
                value={this.state.tenant.tenantInfo.owner.name}
                rcName={`ownerName.${this.props.rcName}`}
                errorMessage={this._onHandleBuildErrorMsgTextLocal("ownerName")}
                required
                onBlur={this._onHandleTrim}
              />
              <TextField
                placeholder="Place Holder"
                onChange={this.onChangeText}
                name="ownerEmail"
                label="Email"
                darkMode={this.props.theme}
                value={this.state.tenant.tenantInfo.owner.email}
                rcName={`ownerEmail.${this.props.rcName}`}
                errorMessage={this._onHandleBuildErrorMsgTextLocal(
                  "ownerEmail"
                )}
                required
                onBlur={this._onHandleTrim}
              />
              <TextField
                placeholder="Place Holder"
                onChange={this.onChangeText}
                name="ownerPhoneNumber"
                label="Phone Number"
                darkMode={this.props.theme}
                value={this.state.tenant.tenantInfo.owner.phoneNumber}
                required
                rcName={`ownerPhoneNumber.${this.props.rcName}`}
                errorMessage={this._onHandleBuildErrorMsgTextLocal(
                  "ownerPhoneNumber"
                )}
                onFocus={this._onHandleTrim}
                onBlur={this._onHandleTrim}
              />
            </div>
            {/* )} */}
          </Stack.Item>
        </Stack>
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
                      <Icon iconName="D365TalentHRCore" rcName="tenant" />
                      <span {...idTenantName}>{this.state.tenant.name}</span>
                    </h2>
                    <span {...idTenantLincence} className="item__location">
                      {this.state.tenant.tenantInfo.licenceInfo.licenceType}
                    </span>
                  </div>
                  {/* {(this.state.isAssign || this.props.isAllVisibled) && ( */}
                  <div {...idOwnerCfmWrapper} className="item__owner">
                    <h3 {...idOwnerName}>
                      {this.state.tenant.tenantInfo.owner.name}
                    </h3>
                    <p {...idOwnerEmail}>
                      {this.state.tenant.tenantInfo.owner.email}
                    </p>
                    <p {...idOwnerPhone}>
                      {this.state.tenant.tenantInfo.owner.phoneNumber}
                    </p>
                  </div>
                  {/* )} */}
                </ConfirmWrapper>
              )}
            </Confirm>
          </Panel>
        </Customizer>
      </FormWrapper>
    );
  }
}

export default compose(
  connect(null, null, null, {
    forwardRef: true,
  })(Infomation)
);
