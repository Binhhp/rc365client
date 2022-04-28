import { Icon } from "aod-dependencies/@uifabric/icons";
import Picker from "aod-dependencies/MyPicker";
import { Separator } from "aod-dependencies/Separator";
import { IStackTokens, Stack } from "aod-dependencies/Stack";
import TextField from "aod-dependencies/TextField/CustomTextField";
import * as React from "react";
import { BaseUser } from "src/common/classes/BaseUser";
import { NewErrorType } from "src/common/constants/ErrorTypes";
import { BuildFunction } from "src/common/functions";
import {
  ErrorFieldItem,
  FieldValidateFunctions,
  IRenderErrorMessageField,
  IValidateStringAndReturnErrors,
} from "src/common/functions/FieldValidate";
import { IFormUserProps, IFormUserState } from "./FormModel";
import { FormWrapper, IconWrapper } from "./FormStyle";

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 15,
};

export default class FormUser extends React.Component<
  IFormUserProps,
  IFormUserState
> {
  constructor(props: IFormUserProps) {
    super(props);
    this.state = {
      user: new BaseUser(),
      type: "",
      isCollapsed: false,
      isSelect: false,
      isVisibledContacts: false,
      errors: [],
      domainOptions: [],
      selectedDomain: "",
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props.user) {
      let user = new BaseUser(this.props.user);
      this.setState({
        user: user,
        selectedDomain: user.domain,
      });
    }
  }

  componentDidMount() {
    if (
      this.props.numberImported &&
      this.props.numberImported > 0 &&
      this.props.user
    ) {
      this.FocusToFirstInvalidItemInEdit(true);
    }
  }
  componentWillUnmount() {
    this._onGetFormData();
  }

  UNSAFE_componentWillReceiveProps(nextProps: IFormUserProps) {
    let nextUser = JSON.stringify(nextProps.user);
    let thisUser = JSON.stringify(this.props.user);
    if (nextUser !== thisUser) {
      let user = new BaseUser(nextProps.user);
      this._onChangeUserState(user);
    }
    if (this.props.isHaveInvalid !== nextProps.isHaveInvalid) {
      this.FocusToFirstInvalidItemInEdit();
    }
    if (
      this.props.numberImported &&
      this.props.numberImported > 0 &&
      this.props.workingUsers &&
      this.props.workingUsers.length > 0
    ) {
      this.FocusToFirstInvalidItemInEdit(true);
    }
  }

  // private _buildAvaibleDomainToOption = () => {
  //   if (this.props.availableDomains) {
  //     let result = this.props.availableDomains.map((d) => {
  //       return {
  //         key: d.name,
  //         text: d.name,
  //       } as IDropdownOption;
  //     });
  //     this.setState({ domainOptions: result });
  //   }
  // };

  // private _onSetValueToInput = () => {
  //   let inputs = document
  //     .getElementById("frm.users")
  //     ?.getElementsByTagName("input");
  //   let obj = Object.entries(this.state.user);
  //   if (inputs) {
  //     for (let i = 0; i < inputs.length; i++) {
  //       let matchInput = obj.findIndex(
  //         (o) => o[0] === `_${inputs ? inputs[i].name : ""}`
  //       );
  //       if (matchInput !== -1) {
  //         // console.log(obj[matchInput][1]);
  //         inputs[i].value = obj[matchInput][1];
  //         // inputs[i].value = obj[matchInput][1];
  //       }
  //     }
  //   }
  // };

  private _onChangeUserState = async (user: BaseUser) => {
    await this.setState({ user });
  };

  private _onHandleWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleSpinBtn = async (val: string, type: string) => {
    let crtUser = new BaseUser(this.state.user);
    let zipCode = !isNaN(parseFloat(crtUser.zipOrPostalCode))
      ? parseFloat(crtUser.zipOrPostalCode)
      : 0;
    switch (type) {
      case "incre":
        zipCode++;
        break;
      case "decre":
        zipCode--;
        break;
      case "valid":
        zipCode = Number(val);
        break;
      default:
        break;
    }
    crtUser.zipOrPostalCode = String(zipCode < 0 ? 0 : zipCode);
    await this._onChangeUserState(crtUser);
    this._onGetFormData();
    this._onHandleWorkingStatus(true);
  };

  private _onHandleBuildErrorMsgTextLocal = (type: string) => {
    let conditions = this._mapMaxMinLengthByKey(type);
    let obj: IRenderErrorMessageField = {
      key: type,
      base: this.state.user,
      errors: this.state.errors,
      maxLength: conditions ? conditions[0] : undefined,
      minLength: conditions ? conditions[1] : undefined,
      existArray: this.props.workingUsers,
    };
    return FieldValidateFunctions.RenderErrorMessageField(obj);
  };

  private _onHandleTrim = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtUser = new BaseUser(this.state.user);
    if (nameInput !== null) {
      for (let [key, value] of Object.entries(crtUser)) {
        if (key === `_${nameInput}` && typeof value === "string") {
          let result = crtUser.UpdateClassByKey(nameInput, value.trim());
          this._onChangeUserState(result);
        }
      }
    }
  };

  private _onGetFormData = () => {
    if (this.props.OnGetFormData) {
      let crtUser = this.state.user.Clone() as BaseUser;
      this.props.OnGetFormData(crtUser, this.props.index);
    }
  };

  private _onCollapsedItem = () => {
    if (
      (this.props.index || this.props.index === 0) &&
      this.props.workingUsers
    ) {
      this.setState({ isCollapsed: !this.state.isCollapsed });
    }
  };

  private _onRemoveItem = async () => {
    if (
      (this.props.index || this.props.index === 0) &&
      this.props.workingUsers &&
      this.props.OnHandleRemove
    ) {
      if (this.props.workingUsers.length === 1) {
        this.setState({ errors: [] });
      }
      this.props.OnHandleRemove(this.props.index);
    }
  };

  private _mapKeyFieldWithCheckTypes = (key: string): NewErrorType[] => {
    switch (key) {
      case "name":
        return [NewErrorType.Empty, NewErrorType.Length];
      case "email":
        return [
          NewErrorType.Empty,
          NewErrorType.Email,
          NewErrorType.Exist,
          NewErrorType.Length,
        ];
      default:
        return [NewErrorType.Length];
    }
  };

  private _mapMaxMinLengthByKey = (key: string): number[] | undefined => {
    switch (key) {
      case "zipOrPostalCode":
        return [64, 0];
      case "faxNumber":
        return [64, 0];
      case "email":
        return [64, 0];
      case "department":
        return [64, 0];
      case "office":
        return [64, 0];
      case "streetAddress":
        return [1024, 0];
      case "countryOrRegion":
        return [128, 0];
      case "city":
        return [128, 0];
      case "stateOrProvince":
        return [128, 0];
      case "jobTitle":
        return [128, 0];
      case "mobilePhone":
        return [64, 0];
      case "officePhone":
        return [64, 0];
      default:
        return [];
    }
  };

  private _onHandleErrorsCase = (
    str: string,
    key: string
  ): ErrorFieldItem[] => {
    let types = this._mapKeyFieldWithCheckTypes(key);
    let conditions = this._mapMaxMinLengthByKey(key);
    let obj: IValidateStringAndReturnErrors = {
      errors: this.state.errors,
      key,
      str,
      types,
      maxLength: conditions ? conditions[0] : undefined,
      minLength: conditions ? conditions[1] : undefined,
      existArray: this.props.workingUsers,
    };
    return FieldValidateFunctions.ValidateStringAndReturnErrors(obj);
  };

  // this function call from parent component
  onUpdateUserEditToStore = async () => {
    this._onGetFormData();
  };

  onIncrementSpin = (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ): string | void => {
    this._onHandleSpinBtn(value, "incre");
  };

  onDecrementSpin = (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ): string | void => {
    this._onHandleSpinBtn(value, "decre");
  };

  onValidateSpin = (
    value: string,
    event?: React.SyntheticEvent<HTMLElement>
  ): string | void => {
    if (!isNaN(parseFloat(value))) {
      this._onHandleSpinBtn(value, "valid");
    }
  };

  onChangeText = async (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    this._onHandleWorkingStatus(true);
    let currentData = new BaseUser(this.state.user);
    if (newValue && nameInput !== null) {
      let updatedUser = currentData.UpdateClassByKey(nameInput, newValue);
      let err = this._onHandleErrorsCase(newValue, nameInput);
      await this.setState({
        user: updatedUser,
        errors: err,
      });
    }
    if (!newValue && nameInput !== null) {
      let updatedUser = currentData.UpdateClassByKey(nameInput, newValue);
      let err = this._onHandleErrorsCase("", nameInput);
      await this.setState({
        user: updatedUser,
        errors: err,
      });
    }
    this._onGetFormData();
  };

  FocusToFirstInvalidItemInEdit = async (isFocus: boolean = false) => {
    let crtErrors = [...this.state.errors];
    let fieldArr = [
      {
        key: "name",
        value: this.state.user.name,
      },
      {
        key: "email",
        value: this.state.user.email,
      },
      {
        key: "displayName",
        value: this.state.user.displayName,
      },
      {
        key: "office",
        value: this.state.user.office,
      },
      {
        key: "zipOrPostalCode",
        value: this.state.user.zipOrPostalCode,
      },
      {
        key: "faxNumber",
        value: this.state.user.faxNumber,
      },
      {
        key: "mobilePhone",
        value: this.state.user.mobilePhone,
      },
      {
        key: "officePhone",
        value: this.state.user.officePhone,
      },
      {
        key: "jobTitle",
        value: this.state.user.jobTitle,
      },
    ];
    fieldArr.forEach((i) => {
      let err = this._onHandleErrorsCase(i.value, i.key);
      err.forEach((e) => {
        let idx = crtErrors.findIndex((ce) => ce.key === e.key);
        if (idx === -1) {
          crtErrors.push(e);
        } else {
          crtErrors.splice(idx, 1, e);
        }
      });
      this.setState({ errors: crtErrors });
    });
    if (crtErrors.length > 0) {
      let field: HTMLElement = document.querySelectorAll(
        `[data-rc-id='txt.${crtErrors[0].key}.${this.props.rcName}']`
      )[0] as HTMLElement;
      if (field && !isFocus) {
        return field.focus();
      }
    }
  };

  onHandlePickerVal = (type: string, str?: string) => {
    this._onHandleWorkingStatus(true);
    let crtUser = this.state.user.Clone() as BaseUser;
    let updatedUser = crtUser.UpdateClassByKey(type, str ? str : "");
    this.setState({ user: updatedUser });
  };

  onHandleVisibleOfContacts = () => {
    this.setState({ isVisibledContacts: !this.state.isVisibledContacts });
  };

  render() {
    return (
      <FormWrapper
        theme={{
          theme: this.props.theme,
          isHaveError: this.state.errors && this.state.errors.length > 0,
        }}
        className="FormWrapper"
      >
        {(this.props.index || this.props.index === 0) &&
          this.props.workingUsers && (
            <div>
              <Separator
                styles={{
                  content: {
                    color: this.props.theme === "dark" ? "#ffffff" : "#212121",
                    backgroundColor:
                      this.props.theme === "dark" ? "#333333" : "#ffffff",
                  },
                }}
                className="form__hr"
                rcName={`${this.props.rcName}`}
              >{`User ${this.props.index + 1}`}</Separator>
              <IconWrapper theme={this.props.theme}>
                <Icon
                  iconName={
                    this.state.isCollapsed ? `ChevronLeft` : `ChevronDown`
                  }
                  onClick={() => this._onCollapsedItem()}
                  rcName={`${
                    this.state.isCollapsed ? "collapsed" : "expanded"
                  }.user.${this.props.index}`}
                />
                <Icon
                  onClick={() => this._onRemoveItem()}
                  iconName="Cancel"
                  rcName={`close.user.${this.props.index}`}
                />
              </IconWrapper>
            </div>
          )}
        {!this.state.isCollapsed && (
          <div id="frm.users" className="ConfirmWrapper-Edit">
            <Stack horizontal tokens={stackTokens}>
              <Stack.Item grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="name"
                  label="Name"
                  darkMode={this.props.theme}
                  value={this.state.user.name}
                  rcName={`name.${this.props.rcName}`}
                  errorMessage={this._onHandleBuildErrorMsgTextLocal("name")}
                  required
                  onBlur={this._onHandleTrim}
                />
              </Stack.Item>
              <Stack.Item grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="email"
                  label="Email"
                  darkMode={this.props.theme}
                  value={this.state.user.email}
                  rcName={`email.${this.props.rcName}`}
                  errorMessage={this._onHandleBuildErrorMsgTextLocal("email")}
                  required
                  onBlur={this._onHandleTrim}
                  // onRenderSuffix={() => {
                  //   return (
                  //     <Dropdown
                  //       rcName={`domain.${this.props.rcName}`}
                  //       onChange={this._onHandleSelectDomain}
                  //       placeholder="Domain"
                  //       options={this.props.domainOptions || []}
                  //       selectedKey={this.state.user.domain}
                  //       darkMode={this.props.theme}
                  //       styles={{
                  //         dropdown: { border: "none" },
                  //         title: {
                  //           borderRadius: 0,
                  //           fontWeight: "normal",
                  //           borderWidth: "1px",
                  //           border: "none",
                  //           background: "transparent",
                  //           color:
                  //             this.props.theme === ThemeEnums.Dark
                  //               ? "#ffffff !important"
                  //               : "#323130 !important",
                  //         },
                  //       }}
                  //       calloutProps={{
                  //         styles: { calloutMain: { width: "fit-content" } },
                  //       }}
                  //     />
                  //   );
                  // }}
                />
              </Stack.Item>
            </Stack>
            <Stack horizontal tokens={stackTokens}>
              <Stack.Item grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="displayName"
                  label="Display Name"
                  darkMode={this.props.theme}
                  value={this.state.user.displayName}
                  rcName={`displayName.${this.props.rcName}`}
                  errorMessage={this._onHandleBuildErrorMsgTextLocal(
                    "displayName"
                  )}
                  required
                  onBlur={this._onHandleTrim}
                />
              </Stack.Item>
              <Stack.Item grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="jobTitle"
                  label="Job Title"
                  errorMessage={this._onHandleBuildErrorMsgTextLocal(
                    "jobTitle"
                  )}
                  darkMode={this.props.theme}
                  value={this.state.user.jobTitle}
                  rcName={`job.${this.props.rcName}`}
                  onBlur={this._onHandleTrim}
                />
              </Stack.Item>
            </Stack>
            <Stack horizontal tokens={stackTokens}>
              <Stack.Item grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="department"
                  label="Department"
                  darkMode={this.props.theme}
                  value={this.state.user.department}
                  rcName={`department.${this.props.rcName}`}
                  onBlur={this._onHandleTrim}
                  errorMessage={this._onHandleBuildErrorMsgTextLocal(
                    "department"
                  )}
                />
              </Stack.Item>
              <Stack.Item grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="office"
                  label="Office"
                  darkMode={this.props.theme}
                  value={this.state.user.office}
                  rcName={`office.${this.props.rcName}`}
                  onBlur={this._onHandleTrim}
                  errorMessage={this._onHandleBuildErrorMsgTextLocal("office")}
                />
              </Stack.Item>
            </Stack>
            {this.state.isVisibledContacts && (
              <>
                <Stack horizontal tokens={stackTokens}>
                  <Stack.Item grow={3}>
                    <TextField
                      placeholder="Place Holder"
                      onChange={this.onChangeText}
                      name="streetAddress"
                      label="Street Address"
                      value={this.state.user.streetAddress}
                      darkMode={this.props.theme}
                      rcName={`address.${this.props.rcName}`}
                      onBlur={this._onHandleTrim}
                      errorMessage={this._onHandleBuildErrorMsgTextLocal(
                        "streetAddress"
                      )}
                    />
                  </Stack.Item>
                  <Stack.Item className="country__stack" grow={3}>
                    <Picker
                      darkMode={this.props.theme}
                      rcName="pik.country"
                      items={BuildFunction.buildNationForPicker()}
                      inputProps={{
                        placeholder: "Plance Holder",
                        label: "Country",
                      }}
                      onGetValueOfPicker={(str) =>
                        this.onHandlePickerVal("countryOrRegion", str)
                      }
                      value={this.state.user.countryOrRegion}
                      errorMessage={this._onHandleBuildErrorMsgTextLocal(
                        "countryOrRegion"
                      )}
                    />
                  </Stack.Item>
                </Stack>
                <Stack horizontal tokens={stackTokens}>
                  <Stack.Item className="country__stack" grow={2}>
                    <Picker
                      darkMode={this.props.theme}
                      rcName="pik.city"
                      items={BuildFunction.buildCityByCountryForPicker(
                        this.state.user.countryOrRegion
                      )}
                      inputProps={{
                        placeholder: "Plance Holder",
                        label: "City",
                      }}
                      onGetValueOfPicker={(str) =>
                        this.onHandlePickerVal("city", str)
                      }
                      value={this.state.user.city}
                      // errorMessage={this._onHandleBuildErrorMsgTextLocal("city")}
                    />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <TextField
                      placeholder="Place Holder"
                      onChange={this.onChangeText}
                      name="stateOrProvince"
                      label="State/Province"
                      darkMode={this.props.theme}
                      value={this.state.user.stateOrProvince}
                      rcName={`state.${this.props.rcName}`}
                      onBlur={this._onHandleTrim}
                      errorMessage={this._onHandleBuildErrorMsgTextLocal(
                        "stateOrProvince"
                      )}
                    />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <TextField
                      placeholder="Place Holder"
                      onChange={this.onChangeText}
                      name="zipOrPostalCode"
                      label="Zip Code"
                      darkMode={this.props.theme}
                      value={this.state.user.zipOrPostalCode}
                      rcName={`zip.${this.props.rcName}`}
                      onBlur={this._onHandleTrim}
                      errorMessage={this._onHandleBuildErrorMsgTextLocal(
                        "zipOrPostalCode"
                      )}
                    />
                  </Stack.Item>
                </Stack>
                <Stack horizontal tokens={stackTokens}>
                  <Stack.Item className="country__stack" grow={2}>
                    <TextField
                      placeholder="Place Holder"
                      onChange={this.onChangeText}
                      name="mobilePhone"
                      label="Mobile Phone"
                      value={this.state.user.mobilePhone}
                      darkMode={this.props.theme}
                      rcName={`mobile.${this.props.rcName}`}
                      onBlur={this._onHandleTrim}
                      errorMessage={this._onHandleBuildErrorMsgTextLocal(
                        "mobilePhone"
                      )}
                    />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <TextField
                      placeholder="Place Holder"
                      onChange={this.onChangeText}
                      name="officePhone"
                      label="Office Number"
                      darkMode={this.props.theme}
                      value={this.state.user.officePhone}
                      rcName={`officePhone.${this.props.rcName}`}
                      onBlur={this._onHandleTrim}
                      errorMessage={this._onHandleBuildErrorMsgTextLocal(
                        "officePhone"
                      )}
                    />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <TextField
                      placeholder="Place Holder"
                      onChange={this.onChangeText}
                      name="faxNumber"
                      label="Fax Number"
                      value={this.state.user.faxNumber}
                      darkMode={this.props.theme}
                      rcName={`fax.${this.props.rcName}`}
                      onBlur={this._onHandleTrim}
                      errorMessage={this._onHandleBuildErrorMsgTextLocal(
                        "faxNumber"
                      )}
                    />
                  </Stack.Item>
                </Stack>
              </>
            )}
            <span
              onClick={this.onHandleVisibleOfContacts}
              className="span__btn"
            >
              <Icon
                className="span__ico"
                iconName={
                  !this.state.isVisibledContacts
                    ? "CalculatorAddition"
                    : "CalculatorSubtract"
                }
              />{" "}
              <span>Information</span>
            </span>
          </div>
        )}
      </FormWrapper>
    );
  }
}
