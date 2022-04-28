import * as React from "react";
import {
  IConfigurationFormProps,
  IConfigurationFormStates,
} from "./FormModels";
import { ConfigurationFormWrapper } from "./FormStyle";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import Dropdown from "aod-dependencies/Dropdown/CustomDropdown";
import TextField from "aod-dependencies/TextField/CustomTextField";
import { Stack } from "aod-dependencies/Stack";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import {
  ErrorFieldItem,
  FieldValidateFunctions,
  IRenderErrorMessageField,
  IValidateStringAndReturnErrors,
} from "src/common/functions/FieldValidate";
import { NewErrorType, SensorTypeCst } from "src/common/constants";

class ConfigurationForm extends React.Component<
  IConfigurationFormProps,
  IConfigurationFormStates
> {
  constructor(props: IConfigurationFormProps) {
    super(props);
    this.state = {
      config: new BaseSensorType(),
      errors: [],
      opts: SensorTypeCst,
    };
  }

  componentDidMount() {
    if (this.props.configuration) {
      let configuration = new BaseSensorType();
      configuration.guid = this.props.configuration.guid;
      configuration.apiKey = this.props.configuration.apiKey;
      configuration.endpoint = this.props.configuration.endpoint;
      configuration.numberOfSensors = this.props.configuration.numberOfSensors;
      configuration.pushUrl = this.props.configuration.pushUrl;
      configuration.pullUrl = this.props.configuration.pullUrl;
      configuration.sensorType = this.props.configuration.sensorType;
      this.setState({
        config: configuration,
        // opts:
        //   this.props.sensorTypeOpts && this.props.sensorTypeOpts.length > 0
        //     ? this.props.sensorTypeOpts
        //     : SensorTypeCst,
      });
    }
  }

  componentWillUnmount() {
    if (this.props.isWorking) {
      this.onHandleUpdateStore();
    }
  }

  private _onHandleWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _focusInValidateField = (key: string) => {
    if (key === "sensorType") {
      let dropdown: HTMLElement = document.querySelectorAll(
        `[data-rc-id='ddl.${key}.${this.props.rcName}']`
      )[0] as HTMLElement;
      if (dropdown) {
        return dropdown.focus();
      }
    }
    let nameField: HTMLElement = document.querySelectorAll(
      `[data-rc-id='txt.${key}.${this.props.rcName}']`
    )[0] as HTMLElement;
    if (nameField) {
      return nameField.focus();
    }
  };

  private _mapKeyFieldWithCheckTypes = (key: string): NewErrorType[] => {
    if (key === "sensorType") {
      return [NewErrorType.Select];
    }
    return [NewErrorType.Empty, NewErrorType.Length];
  };

  private _onHandleErrorsCase = (
    str: string,
    key: string
  ): ErrorFieldItem[] => {
    let types = this._mapKeyFieldWithCheckTypes(key);
    let obj: IValidateStringAndReturnErrors = {
      errors: this.state.errors,
      key,
      str,
      types,
    };
    return FieldValidateFunctions.ValidateStringAndReturnErrors(obj);
  };

  onHandleUpdateStore = () => {
    if (this.props.OnUpdateConfiguration) {
      this.props.OnUpdateConfiguration(this.state.config);
    }
  };

  onChangeText = async (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let currentData = this.state.config.Clone() as BaseSensorType;
    if (newValue && nameInput !== null) {
      let rs = currentData.UpdateByKey(nameInput, newValue);
      let err = this._onHandleErrorsCase(newValue, nameInput);
      this.setState({
        config: rs,
        errors: err,
      });
    }
    if (!newValue && nameInput !== null) {
      let rs = currentData.UpdateByKey(nameInput, "");
      let err = this._onHandleErrorsCase("", nameInput);
      this.setState({
        config: rs,
        errors: err,
      });
    }
    this._onHandleWorkingStatus(true);
  };

  onHandleSelectDropdown = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      this._onHandleWorkingStatus(true);
      let crtConfig = this.state.config.Clone() as BaseSensorType;
      let err = this._onHandleErrorsCase(String(option.key), "sensorType");
      crtConfig.sensorType = String(option.key);
      this.setState({ config: crtConfig, errors: err });
    }
  };

  onHandleTrim = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtConfig = this.state.config.Clone() as BaseSensorType;
    if (nameInput !== null) {
      for (let [key, value] of Object.entries(crtConfig)) {
        if (key === `_${nameInput}` && typeof value === "string") {
          let rs = crtConfig.UpdateByKey(nameInput, value.trim());
          this.setState({ config: rs });
        }
      }
    }
  };

  onHandleValideField = () => {
    let crtController = this.state.config.Clone() as BaseSensorType;
    let crtErrors = [...this.state.errors];
    let arrConverted = Object.entries(crtController);
    arrConverted.forEach((i) => {
      if (typeof i[1] === "string" && i[0].split("_")[1] !== "guid") {
        let err = this._onHandleErrorsCase(i[1], i[0].split("_")[1]);
        this.setState({ errors: err });
      }
    });
    if (crtErrors.length > 0) {
      this._focusInValidateField(crtErrors[0].key);
    }
  };

  onHandleBuildErrorMsgTextLocal = (type: string): string => {
    let obj: IRenderErrorMessageField = {
      key: type,
      base: this.state.config,
      errors: this.state.errors,
    };
    return FieldValidateFunctions.RenderErrorMessageField(obj);
  };

  render() {
    return (
      <ConfigurationFormWrapper
        className="ConfigurationFormWrapper"
        theme={this.props.theme}
      >
        {this.props.isHaveSecretField ? (
          <>
            <Stack className="infomation__stack" horizontal wrap>
              <Stack.Item className="infomation__block" grow={3}>
                <Dropdown
                  rcName={`type.${this.props.rcName}`}
                  onChange={this.onHandleSelectDropdown}
                  className="infomation__license"
                  placeholder="Select sensor type"
                  options={this.state.opts}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal(
                    "sensorType"
                  )}
                  required
                  selectedKey={this.state.config.sensorType}
                  darkMode={this.props.theme}
                  label="Type"
                />
              </Stack.Item>
              <Stack.Item className="infomation__block" grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="apiKey"
                  label="Api Key"
                  darkMode={this.props.theme}
                  value={this.state.config.apiKey}
                  rcName={`apiKey.${this.props.rcName}`}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal("apiKey")}
                  required
                  onBlur={this.onHandleTrim}
                />
              </Stack.Item>
            </Stack>
            <Stack className="infomation__stack" horizontal wrap>
              <Stack.Item className="infomation__block" grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="pushUrl"
                  required
                  label="Push url"
                  darkMode={this.props.theme}
                  value={this.state.config.pushUrl}
                  rcName={`pushUrl.${this.props.rcName}`}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal("pushUrl")}
                  onBlur={this.onHandleTrim}
                />
              </Stack.Item>
              <Stack.Item className="infomation__block" grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="pullUrl"
                  required
                  label="Pull url"
                  darkMode={this.props.theme}
                  value={this.state.config.pullUrl}
                  rcName={`pullUrl.${this.props.rcName}`}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal("pullUrl")}
                  onBlur={this.onHandleTrim}
                />
              </Stack.Item>
            </Stack>
            <Stack className="infomation__stack" horizontal wrap>
              <Stack.Item className="infomation__block" grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  required
                  label="Endpoint"
                  name="endpoint"
                  darkMode={this.props.theme}
                  value={this.state.config.endpoint}
                  rcName={`endpoint.${this.props.rcName}`}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal("endpoint")}
                  onBlur={this.onHandleTrim}
                />
              </Stack.Item>
            </Stack>
          </>
        ) : (
          <>
            <Stack className="infomation__stack" horizontal wrap>
              <Stack.Item className="infomation__block" grow={3}>
                <Dropdown
                  rcName={`type.${this.props.rcName}`}
                  onChange={this.onHandleSelectDropdown}
                  className="infomation__license"
                  placeholder="Select sensor type"
                  options={this.state.opts}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal(
                    "sensorType"
                  )}
                  required
                  selectedKey={this.state.config.sensorType}
                  darkMode={this.props.theme}
                  label="Type"
                />
              </Stack.Item>
              <Stack.Item className="infomation__block" grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="pushUrl"
                  required
                  label="Push url"
                  darkMode={this.props.theme}
                  value={this.state.config.pushUrl}
                  rcName={`pushUrl.${this.props.rcName}`}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal("pushUrl")}
                  onBlur={this.onHandleTrim}
                />
              </Stack.Item>
            </Stack>
            <Stack className="infomation__stack" horizontal wrap>
              <Stack.Item className="infomation__block" grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  name="pullUrl"
                  required
                  label="Pull url"
                  darkMode={this.props.theme}
                  value={this.state.config.pullUrl}
                  rcName={`pullUrl.${this.props.rcName}`}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal("pullUrl")}
                  onBlur={this.onHandleTrim}
                />
              </Stack.Item>
              <Stack.Item className="infomation__block" grow={3}>
                <TextField
                  placeholder="Place Holder"
                  onChange={this.onChangeText}
                  required
                  label="Endpoint"
                  name="endpoint"
                  darkMode={this.props.theme}
                  value={this.state.config.endpoint}
                  rcName={`endpoint.${this.props.rcName}`}
                  errorMessage={this.onHandleBuildErrorMsgTextLocal("endpoint")}
                  onBlur={this.onHandleTrim}
                />
              </Stack.Item>
            </Stack>
          </>
        )}
      </ConfigurationFormWrapper>
    );
  }
}

export default ConfigurationForm;
