import * as React from "react";
import { FormWrapper, IconWrapper } from "./FormStyles";
import { Stack, IStackTokens } from "aod-dependencies/Stack";
// import { Stack, IStackTokens } from "office-ui-fabric-react";
import TextField from "aod-dependencies/TextField/CustomTextField";
import { Separator } from "aod-dependencies/Separator";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { IRenderFormInputProps, IRenderFormStates } from "./FormModels";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { ValidateFunctions } from "src/common/functions";
// import { IDropdownOption } from "aod-dependencies/Dropdown";
import {
  ErrorFieldItem,
  FieldValidateFunctions,
  IRenderErrorMessageField,
  IValidateStringAndReturnErrors,
} from "src/common/functions/FieldValidate";
import { NewErrorType } from "src/common/constants/ErrorTypes";

const stackTokens: IStackTokens = {
  childrenGap: 15,
};

class FormGroup extends React.Component<
  IRenderFormInputProps,
  IRenderFormStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      group: new BaseGroup(),
      isCollapsed: false,
      errors: [],
    };
  }
  UNSAFE_componentWillMount() {
    if (this.props.group) {
      let group = new BaseGroup(this.props.group);
      this.setState({
        group,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IRenderFormInputProps) {
    let nextUser = JSON.stringify(nextProps.group);
    let thisUser = JSON.stringify(this.props.group);
    if (nextUser !== thisUser) {
      let group = new BaseGroup(nextProps.group);
      this._UpdateGroupState(group);
    }
    if (this.props.isHaveInvalid !== nextProps.isHaveInvalid) {
      this._onCheckValueOfForm();
    }
  }
  componentWillUnmount() {
    this._onGetFormData();
  }

  private _onCheckValueOfForm = () => {
    let crtErrors = [...this.state.errors];
    let fieldArr = [
      {
        key: "name",
        value: this.state.group.name,
      },
      {
        key: "email",
        value: this.state.group.email,
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
  };

  private _onGetFormData = () => {
    if (this.props.OnGetFormData) {
      this.props.OnGetFormData(this.state.group, this.props.index);
    }
  };

  private _UpdateWorkingStatus = (val: boolean) => {
    if (this.props.OnUpdateWorkingStatus && this.props.isWorking !== val) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _UpdateGroupState = (group: BaseGroup, errors?: ErrorFieldItem[]) => {
    this.setState({ group, errors: errors ? errors : this.state.errors });
  };

  private _onHandleBuildErrorMsgTextLocal = (type: string) => {
    let condition = this._mapMaxMinLengthByKey(type);
    let baseFromGroup = {
      _name: this.state.group.name,
      _email: this.state.group.email,
    };
    let obj: IRenderErrorMessageField = {
      key: type,
      base: baseFromGroup,
      errors: this.state.errors,
      maxLength: condition ? condition[0] : undefined,
      minLength: condition ? condition[1] : undefined,
      existArray: this.props.workingGroups,
    };
    return FieldValidateFunctions.RenderErrorMessageField(obj);
  };

  private _onHandleTrim = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtGroup = new BaseGroup(this.state.group);
    if (nameInput !== null) {
      for (let [key, value] of Object.entries(crtGroup)) {
        if (key === `_${nameInput}` && typeof value === "string") {
          let newGr = crtGroup.UpdateClassByKey(nameInput, value.trim());
          this._UpdateGroupState(newGr);
        }
      }
    }
  };
  private _onRemoveItem = () => {
    if (
      (this.props.index || this.props.index === 0) &&
      this.props.workingGroups &&
      this.props.OnHandleRemove
    ) {
      if (this.props.workingGroups.length === 1) {
        // this.setState({ errorss: [] });
      }
      this.props.OnHandleRemove(this.props.index);
    }
  };

  private _mapKeyFieldWithCheckTypes = (
    key: string,
    str: string
  ): NewErrorType[] => {
    if (key === "name") {
      return [NewErrorType.Empty, NewErrorType.Length];
    }
    if (str.trim() !== "") {
      return [
        NewErrorType.Empty,
        NewErrorType.Email,
        NewErrorType.Exist,
        NewErrorType.Length,
      ];
    }
    return [NewErrorType.Length];
  };

  private _mapMaxMinLengthByKey = (key: string): number[] | undefined => {
    switch (key) {
      case "email":
        return [64, 0];
      case "description":
        return [1024, 0];
      default:
        return [];
    }
  };

  private _onHandleErrorsCase = (
    str: string,
    key: string
  ): ErrorFieldItem[] => {
    let types = this._mapKeyFieldWithCheckTypes(key, str);
    let condition = this._mapMaxMinLengthByKey(key);
    let obj: IValidateStringAndReturnErrors = {
      errors: this.state.errors,
      key,
      str,
      types,
      maxLength: condition ? condition[0] : undefined,
      minLength: condition ? condition[1] : undefined,
      existArray: this.props.workingGroups,
    };
    return FieldValidateFunctions.ValidateStringAndReturnErrors(obj);
  };

  private _onChangeText = async (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtGroup = new BaseGroup(this.state.group);
    if (newValue && nameInput !== null) {
      let newGr = crtGroup.UpdateClassByKey(nameInput, newValue);
      let err = this._onHandleErrorsCase(newValue, nameInput);
      await this.setState({ group: newGr, errors: err });
    }
    if (!newValue && nameInput !== null) {
      let newGr = crtGroup.UpdateClassByKey(nameInput, "");
      let err = this._onHandleErrorsCase("", nameInput);
      await this.setState({ group: newGr, errors: err });
    }
    this._UpdateWorkingStatus(true);
    this._onGetFormData();
  };

  // private _onHandleSelectDomain = (
  //   event: React.FormEvent<HTMLDivElement>,
  //   option?: IDropdownOption,
  //   index?: number
  // ) => {
  //   let crtErrors = [...this.state.errors];
  //   if (option) {
  //     let index = crtErrors.findIndex((err) => err === TypeOfError.Choose);
  //     if (index !== -1) {
  //       crtErrors.splice(index, 1);
  //     }
  //     let crtGroup = this.state.group.Clone() as BaseGroup;
  //     crtGroup.domain = String(option.key);
  //     this.setState({ group: crtGroup, errors: crtErrors }, () =>
  //       this._onGetFormData()
  //     );
  //   }
  // };

  FocusToFirstInvalidItemInEdit = async () => {
    let crtErrors = [...this.state.errors];
    let nameField: HTMLElement = document.querySelectorAll(
      `[data-rc-id='txt.name.${this.props.rcName}']`
    )[0] as HTMLElement;
    let emailField: HTMLElement = document.querySelectorAll(
      `[data-rc-id='txt.email.${this.props.rcName}']`
    )[0] as HTMLElement;
    if (
      crtErrors.some((e) => e.key === "name") &&
      this.state.group.name.trim() === "" &&
      nameField
    ) {
      return nameField.focus();
    }
    if (
      crtErrors.some((e) => e.key === "email") &&
      (this.state.group.email.trim() === "" ||
        // this.state.group.domain === "" ||
        !ValidateFunctions.onValidateIsEmail(this.state.group.email.trim())) &&
      // !ValidateFunction.IsValidEmailName(this.state.group.email.trim())) &&
      emailField
    ) {
      return emailField.focus();
    }
  };

  onUpdateGroupEditToStore = async () => {
    this._onGetFormData();
  };

  onCollapseContent = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  };

  render() {
    return (
      <FormWrapper className="FormWrapper" theme={this.props.theme}>
        {(this.props.index || this.props.index === 0) &&
          this.props.workingGroups && (
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
                darkMode={this.props.theme}
                rcName={`${this.props.rcName}`}
              >{`Group ${this.props.index + 1}`}</Separator>
              <IconWrapper className="IconWrapper" theme={this.props.theme}>
                <Icon
                  iconName={
                    this.state.isCollapsed ? `ChevronLeft` : `ChevronDown`
                  }
                  onClick={this.onCollapseContent}
                  rcName={`${
                    this.state.isCollapsed ? "collapsed" : "expanded"
                  }.group.${this.props.index}`}
                />
                <Icon
                  rcName={`close.group.${this.props.index}`}
                  onClick={this._onRemoveItem}
                  iconName="Cancel"
                />
              </IconWrapper>
            </div>
          )}
        {!this.state.isCollapsed && (
          <>
            <Stack horizontal tokens={stackTokens}>
              <Stack.Item grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this._onChangeText}
                  name="name"
                  label="Name"
                  value={this.state.group.name}
                  darkMode={this.props.theme}
                  rcName={`name.${this.props.rcName}`}
                  errorMessage={this._onHandleBuildErrorMsgTextLocal("name")}
                  required
                  onBlur={this._onHandleTrim}
                />
              </Stack.Item>
              <Stack.Item grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this._onChangeText}
                  name="email"
                  label="Email"
                  value={this.state.group.email}
                  darkMode={this.props.theme}
                  errorMessage={this._onHandleBuildErrorMsgTextLocal("email")}
                  // required
                  rcName={`email.${this.props.rcName}`}
                  onBlur={this._onHandleTrim}
                  // onRenderSuffix={() => {
                  //   return (
                  //     <Dropdown
                  //       rcName={`domain.${this.props.rcName}`}
                  //       onChange={this._onHandleSelectDomain}
                  //       placeholder="Domain"
                  //       options={this.props.domainOptions || []}
                  //       selectedKey={this.state.group.domain}
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
              <Stack.Item grow={6}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this._onChangeText}
                  name="description"
                  label="Description"
                  darkMode={this.props.theme}
                  multiline
                  rows={5}
                  value={this.state.group.description}
                  errorMessage={this._onHandleBuildErrorMsgTextLocal(
                    "description"
                  )}
                  rcName={`description.${this.props.rcName}`}
                  onBlur={this._onHandleTrim}
                />
              </Stack.Item>
            </Stack>
          </>
        )}
      </FormWrapper>
    );
  }
}

export default FormGroup;
