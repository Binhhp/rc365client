import * as React from "react";
import {
  IEditConfigurationProps,
  IEditConfigurationStates,
} from "./ConfigurationTabModels";
import { ConfigurationTabWrapper } from "./ConfigurationTabStyle";
import { Stack } from "aod-dependencies/Stack";
import MaskedTextField from "aod-dependencies/TextField/MaskedTextField/CustomMaskedTextField";
import { BaseController } from "src/common/classes/BaseController";

class ConfigurationTab extends React.Component<
  IEditConfigurationProps,
  IEditConfigurationStates
> {
  constructor(props: IEditConfigurationProps) {
    super(props);
    this.state = {
      controller: new BaseController(),
      errors: [],
    };
  }

  componentDidMount() {
    if (this.props.controller) {
      let controller = new BaseController();
      controller.sensorControllerId = this.props.controller.sensorControllerId;
      controller.occupationStatus = this.props.controller.occupationStatus;
      controller.resourceId = this.props.controller.resourceId;
      controller.resourceName = this.props.controller.resourceName;
      controller.sensors = this.props.controller.sensors;
      controller.timeZone = this.props.controller.timeZone;
      controller.totalSensors = this.props.controller.totalSensors;
      controller.reservationTime = this.props.controller.reservationTime;
      controller.sensorTime = this.props.controller.sensorTime;
      controller.resourceInfo = this.props.controller.resourceInfo;
      controller.sensorTimeTick = this.props.controller.sensorTimeTick;
      controller.guid = this.props.controller.guid;
      controller.reservationTimeTick =
        this.props.controller.reservationTimeTick;
      this.setState({
        controller,
      });
    }
  }

  componentWillUnmount() {
    if (this.props.isPanelPageOpen) {
      this.onHandleUpdateStore();
    }
  }

  private _onHandleWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleUpdateErrorLocal = (val: string, key: string): string[] => {
    let crtErrors = [...this.state.errors];
    let value = val.split(":");
    let minute = value[1];
    let second = value[2];
    if (
      minute &&
      second &&
      (Number(minute) > 59 ||
        Number(second) > 59 ||
        val === "00:00:00" ||
        val.indexOf("-") !== -1) &&
      ["reservationTime", "sensorTime"].includes(key)
    ) {
      crtErrors = crtErrors.filter((e) => e !== key);
      crtErrors.push(key);
    }
    if (
      val.indexOf("-") === -1 &&
      minute &&
      second &&
      Number(minute) < 60 &&
      Number(second) < 60 &&
      val !== "00:00:00" &&
      ["reservationTime", "sensorTime"].includes(key)
    ) {
      crtErrors = crtErrors.filter((e) => e !== key);
    }
    return crtErrors;
  };

  onHandleUpdateStore = () => {
    if (this.props.OnHandleUpdateController) {
      let crtController = this.state.controller.Clone() as BaseController;
      crtController.controllerStatus = this.props.status;
      this.props.OnHandleUpdateController(crtController);
    }
  };

  onHandleTrim = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtConfig = this.state.controller.Clone() as BaseController;
    if (nameInput !== null) {
      for (let [key, value] of Object.entries(crtConfig)) {
        if (key === `_${nameInput}` && typeof value === "string") {
          let rs = crtConfig.UpdateByKey(nameInput, value.trim());
          let errs = this._onHandleUpdateErrorLocal(value.trim(), nameInput);
          this.setState({ controller: rs, errors: errs });
        }
      }
    }
  };

  onHandleBuildErrorMsgTextLocal = (type: string) => {
    let crtErrors = [...this.state.errors];
    if (
      type === "reservationTime" &&
      crtErrors.some((e) => e === "reservationTime")
    ) {
      return "Invalid Reservation time.";
    }
    if (type === "sensorTime" && crtErrors.some((e) => e === "sensorTime")) {
      return "Invalid Sensor time.";
    }
    return "";
  };

  onHandleValideField = () => {
    let crtController = this.state.controller.Clone() as BaseController;
    let crtErrors = [...this.state.errors];
    let arrConverted = Object.entries(crtController);
    arrConverted.forEach((i) => {
      if (
        ["_reservationTime", "_sensorTime"].includes(i[0]) &&
        i[1].trim() === ""
      ) {
        let str = i[0].split("_")[1];
        crtErrors = crtErrors.filter((e) => e !== str);
        crtErrors.push(str);
      }
    });
    this.setState({ errors: crtErrors });
  };

  onHandleChangeMask = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let currentData = this.state.controller.Clone() as BaseController;
    if (newValue && nameInput !== null && newValue !== "00:00:00") {
      let rs = currentData.UpdateByKey(nameInput, newValue);
      let err = this._onHandleUpdateErrorLocal(newValue, nameInput);
      this.setState({
        controller: rs,
        errors: err,
      });
    }
    if ((!newValue || newValue === "00:00:00") && nameInput !== null) {
      let rs = currentData.UpdateByKey(nameInput, "00:00:00");
      let err = this._onHandleUpdateErrorLocal("00:00:00", nameInput);
      this.setState({
        controller: rs,
        errors: err,
      });
    }
    // this._onGetFormData();
    this._onHandleWorkingStatus(true);
  };

  render() {
    return (
      <ConfigurationTabWrapper className="ConfigurationTabWrapper">
        <Stack horizontal wrap>
          <Stack.Item className="padding__right" grow={3}>
            <MaskedTextField
              label="Reservation time (hh:mm:ss)"
              mask="99:99:99"
              defaultValue="00:00:00"
              maskChar="0"
              onChange={this.onHandleChangeMask}
              name="reservationTime"
              darkMode={this.props.theme}
              value={this.state.controller.reservationTime}
              rcName={`reservationTime.${this.props.workingTab}`}
              errorMessage={this.onHandleBuildErrorMsgTextLocal(
                "reservationTime"
              )}
              required
              isDisableFocusToLeftUnfilled
              onBlur={this.onHandleTrim}
            />
          </Stack.Item>
          <Stack.Item grow={3}>
            <MaskedTextField
              label="Sensor time frame (hh:mm:ss)"
              mask="99:99:99"
              name="sensorTime"
              defaultValue="00:00:00"
              maskChar="0"
              darkMode={this.props.theme}
              value={this.state.controller.sensorTime}
              onChange={this.onHandleChangeMask}
              rcName={`sensorTime.${this.props.workingTab}`}
              errorMessage={this.onHandleBuildErrorMsgTextLocal("sensorTime")}
              required
              isDisableFocusToLeftUnfilled
              onBlur={this.onHandleTrim}
            />
          </Stack.Item>
        </Stack>
      </ConfigurationTabWrapper>
    );
  }
}

export default ConfigurationTab;
