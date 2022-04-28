import * as React from "react";
import {
  CreateOrganizationWrapper,
  FormWrapper,
  FooterWrapper,
} from "./CreateStyle";
import {
  ICreateOrganizationProps,
  ICreateOrganizationState,
} from "./CreateModels";
import Button from "aod-dependencies/Button";
import TextField from "aod-dependencies/TextField/CustomTextField";
import { TypeConfirm } from "src/entity/enums";
import {
  FieldValidateFunctions,
  IRenderErrorMessageField,
  IValidateStringAndReturnErrors,
} from "src/common/functions/FieldValidate";
import { NewErrorType } from "src/common/constants/ErrorTypes";

class CreateOrganization extends React.Component<
  ICreateOrganizationProps,
  ICreateOrganizationState
> {
  constructor(props: ICreateOrganizationProps) {
    super(props);
    this.state = {
      name: "",
      domain: "",
      errors: [],
    };
  }

  componentDidMount() {
    if (this.props.domain !== "" || this.props.name !== "") {
      this.setState({
        name: this.props.name,
        domain: this.props.domain,
      });
    }
  }

  private _onUpdateTypeConfirm = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _FocusInvalidField = () => {
    let key = "name";
    if (this.state.name.trim() !== "") {
      key = "domain";
    }
    let fieldInput: HTMLElement = document.querySelectorAll(
      `[data-rc-id='txt.${key}Org']`
    )[0] as HTMLElement;
    if (fieldInput) {
      return fieldInput.focus();
    }
  };

  private _onUpdateIsWorkingCreate = (val: boolean) => {
    this.props.onGetWorkingStatus(val);
  };

  private _mapTypesByKey = (key: string): NewErrorType[] => {
    if (key === "name") {
      return [NewErrorType.Empty, NewErrorType.Length];
    }
    return [NewErrorType.Empty, NewErrorType.Domain, NewErrorType.Length];
  };

  private _onHandleErrorsCase = (str: string, key: string) => {
    let types = this._mapTypesByKey(key);
    let obj: IValidateStringAndReturnErrors = {
      errors: this.state.errors,
      key,
      str,
      types,
    };
    return FieldValidateFunctions.ValidateStringAndReturnErrors(obj);
  };

  private _onChangeTextField = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtState = { ...this.state } as ICreateOrganizationState;
    this._onUpdateIsWorkingCreate(true);
    if (nameInput && newValue) {
      let newData = { [nameInput]: newValue };
      let newState = Object.assign(crtState, newData);
      let err = this._onHandleErrorsCase(newValue, nameInput);
      newState.errors = err;
      this.setState(newState);
    }
    if (nameInput && !newValue) {
      let newData = { [nameInput]: "" };
      let newState = Object.assign(crtState, newData);
      let err = this._onHandleErrorsCase("", nameInput);
      newState.errors = err;
      this.setState(newState);
    }
  };

  private _onRenderErrorMessage = (type: string): string | undefined => {
    let baseOrg = {
      _name: this.state.name,
      _domain: this.state.domain,
    };
    let obj: IRenderErrorMessageField = {
      key: type,
      base: baseOrg,
      errors: this.state.errors,
    };
    return FieldValidateFunctions.RenderErrorMessageField(obj);
  };

  private _onHandleTrim = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    if (nameInput !== null) {
      let name = this.state.name.trim();
      let domain = this.state.domain.trim();
      this.setState({ name, domain });
    }
  };

  _onHandleSubmitForm = async () => {
    let crtErrors = [...this.state.errors];
    let errName = this._onHandleErrorsCase(this.state.name, "name");
    let errDomain = this._onHandleErrorsCase(this.state.domain, "domain");
    if (crtErrors.length < 1) {
      crtErrors = [...new Set([...errName, ...errDomain])];
    } else {
      crtErrors = errDomain;
    }
    this.props.onGetFormValue(this.state.name.trim(), this.state.domain.trim());
    if (crtErrors.length > 0) {
      this.setState({ errors: crtErrors });
      return this._FocusInvalidField();
    }
    if (this.props.isWorkingOnCreate && crtErrors.length < 1) {
      return this._onUpdateTypeConfirm(TypeConfirm.Review);
    }
  };

  _onHandleCancelCreate = () => {
    this.props.onGetFormValue(this.state.name.trim(), this.state.domain.trim());
    if (this.props.isWorkingOnCreate) {
      return this._onUpdateTypeConfirm(TypeConfirm.Cancel);
    } else {
      return this.props.onHandleVisiblePanel(false);
    }
  };

  onHandleCreateOrganization = async () => {
    if (this.props.OnHandleCreateOrganization && this.props.isWorkingOnCreate) {
      this.props
        .OnHandleCreateOrganization(this.state.name, [this.state.domain])
        .then((res) => {
          if (res) {
            this.props.onHandleVisiblePanel();
          }
        })
        .catch(() => {
          this.props.onHandleVisiblePanel();
        });
    }
  };

  render() {
    return (
      <CreateOrganizationWrapper
        className="CreateOrganizationWrapper"
        theme={this.props.theme}
      >
        <FormWrapper className="FormWrapper" theme={this.props.theme}>
          <TextField
            darkMode={this.props.theme}
            placeholder="Name"
            label="Name"
            name="name"
            required
            onChange={this._onChangeTextField}
            errorMessage={this._onRenderErrorMessage("name")}
            value={this.state.name}
            rcName="nameOrg"
            onBlur={this._onHandleTrim}
          />
          <TextField
            darkMode={this.props.theme}
            placeholder="Domain"
            label="Primary domain"
            name="domain"
            required
            onChange={this._onChangeTextField}
            errorMessage={this._onRenderErrorMessage("domain")}
            value={this.state.domain}
            rcName="domainOrg"
            onBlur={this._onHandleTrim}
          />
        </FormWrapper>
        <FooterWrapper className="FooterWrapper" theme={this.props.theme}>
          <Button
            onClick={this._onHandleSubmitForm}
            darkMode={this.props.theme}
            text="Create"
            type="Primary"
            rcName="create.org"
          />
          <Button
            onClick={this._onHandleCancelCreate}
            darkMode={this.props.theme}
            text="Cancel"
            rcName="cancel.org"
          />
        </FooterWrapper>
      </CreateOrganizationWrapper>
    );
  }
}

export default CreateOrganization;
