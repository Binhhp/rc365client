import Button from "aod-dependencies/Button";
import TextField from "aod-dependencies/TextField/CustomTextField";
import * as React from "react";
import { BaseApplication } from "src/common/classes/BaseApplication";
import { NewErrorType } from "src/common/constants/ErrorTypes";
import {
  ErrorFieldItem,
  FieldValidateFunctions,
  IRenderErrorMessageField,
  IValidateStringAndReturnErrors,
} from "src/common/functions/FieldValidate";
import {
  IApplicationFormProps,
  IApplicationFormState,
} from "./ApplicationFormModels";
import { FormWrapper } from "./ApplicationFormStyle";

export default class RenderApplicationForm extends React.Component<
  IApplicationFormProps,
  IApplicationFormState
> {
  constructor(props: IApplicationFormProps) {
    super(props);
    this.state = {
      application: new BaseApplication(),
      conversationId: "",
      workflowId: "",
      chars: "",
      errors: [],
    };
  }

  UNSAFE_componentWillMount() {
    if (
      this.props.OnResetSignalRData &&
      this.props.OnGetApplicationInfomation &&
      this.props.organizationInfomation &&
      this.props.application &&
      this.props.application.appId === ""
    ) {
      this.props.OnResetSignalRData();
      this.props
        .OnGetApplicationInfomation(this.props.organizationInfomation.id)
        .then((res) => {
          this.setState({
            conversationId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        });
    }
  }

  componentDidMount() {
    if (this.props.application) {
      let radPassworkChar = String(Math.floor(Math.random() * 10000000000));
      this.setState({
        application: this.props.application,
        chars: radPassworkChar,
      });
    }
  }

  componentDidUpdate(prevProps: IApplicationFormProps) {
    if (
      prevProps.signalRData !== this.props.signalRData &&
      this.props.signalRData
    ) {
      let crtApplication = new BaseApplication();
      crtApplication.appId = this.props.signalRData.appId || "";
      crtApplication.tenantId = this.props.signalRData.tenantId || "";
      crtApplication.appSecret = this.state.chars;
      if (this.props.OnUpdateApplicationInfomationTS) {
        this.props.OnUpdateApplicationInfomationTS(crtApplication);
        this._onHandleUpdateTabLoading(false);
        this.setState({
          application: crtApplication,
          conversationId: "",
          workflowId: "",
        });
        if (this.state.conversationId !== "" || this.state.workflowId !== "") {
          this.setState({
            application: crtApplication,
            conversationId: "",
            workflowId: "",
          });
        } else {
          this.setState({ application: crtApplication });
        }
      }
    }
  }

  private _onHandleUpdateTabLoading = (val: boolean) => {
    if (
      this.props.isLoading !== val &&
      this.props.OnUpdateApplicationTabLoading
    ) {
      this.props.OnUpdateApplicationTabLoading(val);
    }
  };

  private _onHandleCheckFieldErrors = () => {
    let crtErrors = [...this.state.errors];
    let crtApplication = this.state.application.Clone() as BaseApplication;
    let appArr = Object.entries(crtApplication);
    if (appArr.length > 0) {
      appArr.forEach((i) => {
        let err = this._onHandleErrorsCase(i[1], i[0]);
        let index = crtErrors.findIndex((er) => er.key === i[0]);
        if (index === -1) {
          crtErrors = [...crtErrors, ...err];
        }
        if (index !== -1) {
          crtErrors = crtErrors.splice(index, 1);
          crtErrors = [...crtErrors, ...err];
        }
      });
    }
    this.setState({ errors: [...new Set(crtErrors)] });
    if (this.state.errors.length > 0) {
      let field: HTMLElement = document.querySelectorAll(
        `[data-rc-id='txt.app.${this.state.errors[0].key.split("_")[1]}']`
      )[0] as HTMLElement;
      if (field) {
        return field.focus();
      }
    }
  };

  private _onSubmitUpdateCreate = async () => {
    let crtApplication = this.state.application.Clone() as BaseApplication;
    let isHaveEmpty = crtApplication.isHaveEmpty();
    if (!isHaveEmpty && crtApplication.appSecret !== this.state.chars) {
      if (
        this.props.OnUpdateApplicationInfomation &&
        this.props.organizationInfomation
      ) {
        this.props
          .OnUpdateApplicationInfomation(
            this.props.organizationInfomation.id,
            this.state.application
          )
          .then((res) => {
            this.setState({
              conversationId: res.conversationId,
              workflowId: res.workflowId || "",
            });
          });
      }
    } else {
      this._onHandleCheckFieldErrors();
    }
  };

  private _onHandleErrorsCase = (
    str: string,
    key: string
  ): ErrorFieldItem[] => {
    let types = [NewErrorType.Empty, NewErrorType.Length];
    let obj: IValidateStringAndReturnErrors = {
      errors: this.state.errors,
      key,
      str,
      types,
    };
    return FieldValidateFunctions.ValidateStringAndReturnErrors(obj);
  };

  private _onChangeText = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    if (nameInput !== null) {
      let crtApplication = this.state.application.Clone() as BaseApplication;
      let value = { [`_${nameInput}`]: newValue };
      let newApplication = Object.assign(crtApplication, value);
      let err = this._onHandleErrorsCase(newValue ? newValue : "", nameInput);
      this.setState({ application: newApplication, errors: err });
    }
  };

  private _onHandleBuildErrorMsgTextLocal = (type: string) => {
    let obj: IRenderErrorMessageField = {
      key: type,
      base: this.state.application,
      errors: this.state.errors,
    };
    return FieldValidateFunctions.RenderErrorMessageField(obj);
  };

  render() {
    let { application } = this.state;
    return (
      <FormWrapper className="FormWrapper" theme={this.props.theme}>
        <h4>Tenant name (e.g. domain.onmicrosoft.com)</h4>
        <div className="application__form">
          <TextField
            placeholder="Place Holder"
            onChange={this._onChangeText}
            label="Tenant name"
            name="tenantId"
            value={application.tenantId}
            disabled={this.props.isLoading}
            darkMode={this.props.theme}
            rcName="app.tenantName"
            errorMessage={this._onHandleBuildErrorMsgTextLocal("tenantId")}
          />
          <TextField
            placeholder="Place Holder"
            onChange={this._onChangeText}
            label="App principal ID"
            name="appId"
            disabled={this.props.isLoading}
            value={application.appId}
            darkMode={this.props.theme}
            rcName="app.principalID"
            errorMessage={this._onHandleBuildErrorMsgTextLocal("appId")}
          />
          <TextField
            placeholder="Place Holder"
            onChange={this._onChangeText}
            label="Password"
            name="appSecret"
            disabled={this.props.isLoading}
            value={application.appSecret}
            darkMode={this.props.theme}
            rcName="app.password"
            type="password"
            errorMessage={this._onHandleBuildErrorMsgTextLocal("appSecret")}
          />
          <div className="application__submitGr">
            <Button
              disabled={this.props.isLoading}
              rcName="Create/Update"
              onClick={this._onSubmitUpdateCreate}
              text="Create / Update"
              darkMode={this.props.theme}
              type="Primary"
            />
          </div>
        </div>
      </FormWrapper>
    );
  }
}
