import * as React from "react";
import { IEditConfigurationProps } from "./EditModels";
import { EditConfigurationWrapper, FooterWrapper } from "./EditStyle";
import ConfigurationForm from "src/ui/containers/Sensor/Tabs/Configurations/ConfigurationFormContainer";
import Button from "aod-dependencies/Button";
import { TypeConfirm } from "src/entity/enums";

class CreateConfiguration extends React.Component<
  IEditConfigurationProps,
  any
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IEditConfigurationProps) {
    super(props);
    this.state = {};
    this.Action = React.createRef();
  }

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };
  private _onHandleResetSensorStore = () => {
    if (this.props.OnResetSensorStore) {
      this.props.OnResetSensorStore();
    }
  };

  private _onHandleUpdateVisiblePagePanel = (val: boolean) => {
    if (
      this.props.isPanelPageOpen !== val &&
      this.props.OnUpdateVisiblePagePanel
    ) {
      this.props.OnUpdateVisiblePagePanel(val);
    }
  };

  private _onHandleRef = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleUpdateStore();
  };

  private _onHandleValidateField = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleValideField();
  };
  private _CheckFieldErrorByWorkingTab = () => {
    if (
      this.props.configuration &&
      this.props.configuration.IsHaveInvalidLengthField(["apiKey", "guid"])
    ) {
      return true;
    }
    if (this.props.configuration) {
      let arrConfig = Object.entries(this.props.configuration).some(
        (c) =>
          typeof c[1] === "string" &&
          c[1].trim() === "" &&
          !["_apiKey", "_guid"].includes(c[0])
      );
      return arrConfig;
    }
    return false;
  };

  onSubmitUpdate = async () => {
    await this._onHandleRef();
    let isHaveErrors = this._CheckFieldErrorByWorkingTab();
    if (isHaveErrors && this.props.isWorking) {
      this._onHandleValidateField();
    }
    if (!isHaveErrors && this.props.isWorking) {
      this._onHandleUpdateConfirmType(TypeConfirm.ReviewSS);
    }
  };

  onHandleDelete = () => {
    this._onHandleUpdateConfirmType(TypeConfirm.Delete);
  };

  onHandleCancelPanel = () => {
    if (!this.props.isWorking) {
      this._onHandleUpdateVisiblePagePanel(false);
      this._onHandleResetSensorStore();
    }
    if (this.props.isWorking) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
  };

  render() {
    return (
      <EditConfigurationWrapper
        theme={this.props.theme}
        className="EditConfigurationWrapper"
      >
        <div className="form__container">
          <ConfigurationForm
            isHaveSecretField={false}
            ref={this.Action}
            rcName="edt.config"
          />
        </div>
        <FooterWrapper className="FooterWrapper" theme={this.props.theme}>
          <div className="footer__actionBtn">
            <Button
              onClick={this.onSubmitUpdate}
              darkMode={this.props.theme}
              type="Primary"
              text="Update"
              rcName="edtResource.Update"
              disabled={this.props.isWorking ? false : true}
            />
            <Button
              onClick={this.onHandleDelete}
              darkMode={this.props.theme}
              text="Delete"
              rcName="edtResource.delete"
            />
          </div>
          <Button
            onClick={this.onHandleCancelPanel}
            darkMode={this.props.theme}
            text="Cancel"
            rcName="CancelInPanel-Btn"
          />
        </FooterWrapper>
      </EditConfigurationWrapper>
    );
  }
}

export default CreateConfiguration;
