import * as React from "react";
import {
  ICreateSensorProps,
  ICreateSensorStates,
  SensorErrorType,
} from "./CreateModels";
import { CreateSensorWrapper, SearchResourceWrapper } from "./CreateStyle";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import Dropdown from "aod-dependencies/Dropdown/CustomDropdown";
import TextField from "aod-dependencies/TextField/CustomTextField";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BuildRCAttribute, ValidateFunctions } from "src/common/functions";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import Search from "src/ui/containers/Sensor/SensorSearchContainer";
import { BaseResource } from "src/common/classes/BaseResource";

const sampleOpt: IDropdownOption[] = [{ key: "LINAK", text: "LINAK" }];

class CreateSensor extends React.Component<
  ICreateSensorProps,
  ICreateSensorStates
> {
  constructor(props: ICreateSensorProps) {
    super(props);
    this.state = {
      sensor: new BaseSensor(),
      errors: [],
      opts: [],
      isCollapsed: true,
      cId: "",
    };
  }

  componentDidMount() {
    if (this.props.sensor) {
      let sensor = new BaseSensor();
      sensor.guid = this.props.sensor.guid;
      sensor.sensorType = this.props.sensor.sensorType;
      sensor.sensorControllerId = this.props.sensor.sensorControllerId;
      sensor.sensorId = this.props.sensor.sensorId;
      sensor.occupationStatus = this.props.sensor.occupationStatus;
      sensor.resourceId = this.props.sensor.resourceId;
      sensor.resourceName = this.props.sensor.resourceName;
      sensor.resourceInfo = this.props.sensor.resourceInfo;
      this.setState({
        sensor,
        opts:
          this.props.sensorTypeOpts && this.props.sensorTypeOpts.length > 0
            ? this.props.sensorTypeOpts
            : sampleOpt,
      });
    }
  }

  componentWillUnmount() {
    this.onHandleUpdateStore();
  }

  private _onHandleWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleFocusInFirstErrorField = (key: string) => {
    let item: HTMLElement = document.querySelectorAll(
      `[data-rc-id='txt.${key}.${this.props.rcName}']`
    )[0] as HTMLElement;
    if (item) {
      item.focus();
    }
  };

  onHandleCheckEmptyField = () => {
    let crtConfig = this.state.sensor.Clone() as BaseSensor;
    let errorArrs = Object.entries(crtConfig).filter(
      (c) => typeof c[1] === "string" && c[1].trim() === ""
    );
    let rs = errorArrs.map((e) => {
      if (e.length > 0) {
        return e[0].split("_")[1];
      }
      return "";
    });
    if (rs.length > 0) {
      this._onHandleFocusInFirstErrorField(rs[0]);
    }
    this.setState({ errors: rs });
  };

  onChangeText = async (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let currentData = this.state.sensor.Clone() as BaseSensor;
    if (newValue && nameInput !== null) {
      let rs = currentData.UpdateByKey(nameInput, newValue);
      let crtErrors = [...this.state.errors];
      crtErrors = crtErrors.filter(
        (e) => ![SensorErrorType.Id, SensorErrorType.Length].includes(e)
      );
      if (ValidateFunctions.isInvalidStringLength(newValue)) {
        crtErrors.push(SensorErrorType.Length);
      }
      this.setState({
        sensor: rs,
        errors: crtErrors,
      });
    }
    if (!newValue && nameInput !== null) {
      let rs = currentData.UpdateByKey(nameInput, "");
      // this._onHandleUpdateErrorLocal("", nameInput);
      let crtErrors = [...this.state.errors];
      crtErrors = crtErrors.filter(
        (e) => ![SensorErrorType.Id, SensorErrorType.Length].includes(e)
      );
      crtErrors.push(SensorErrorType.Id);
      this.setState({
        sensor: rs,
        errors: crtErrors,
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
      let crtErrors = [...this.state.errors];
      crtErrors = crtErrors.filter((e) => e !== "type");
      let crtConfig = this.state.sensor.Clone() as BaseSensor;
      crtConfig.sensorType = String(option.key);
      this._onHandleWorkingStatus(true);
      this.setState({ sensor: crtConfig, errors: crtErrors });
    }
  };

  onHandleTrim = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtConfig = this.state.sensor.Clone() as BaseSensor;
    if (nameInput !== null) {
      for (let [key, value] of Object.entries(crtConfig)) {
        if (key === `_${nameInput}` && typeof value === "string") {
          let rs = crtConfig.UpdateByKey(nameInput, value.trim());
          this.setState({ sensor: rs });
        }
      }
    }
  };

  onHandleUpdateStore = (sensor?: BaseSensor) => {
    if (this.props.OnUpdateSensor) {
      this.props.OnUpdateSensor(sensor ? sensor : this.state.sensor);
    }
  };

  onHandleValideField = () => {
    let crtErrors = [...this.state.errors];

    if (this.state.sensor.sensorId.trim() === "") {
      crtErrors = crtErrors.filter((e) => e !== SensorErrorType.Id);
      crtErrors.push(SensorErrorType.Id);
    } else {
      crtErrors = crtErrors.filter((e) => e !== SensorErrorType.Id);
    }

    if (this.state.sensor.sensorType.trim() === "") {
      crtErrors = crtErrors.filter((e) => e !== SensorErrorType.Type);
      crtErrors.push(SensorErrorType.Type);
    } else {
      crtErrors = crtErrors.filter((e) => e !== SensorErrorType.Type);
    }

    this.setState({ errors: crtErrors });
  };

  onHandleCId = (id: string) => {
    this.setState({ cId: id });
  };

  onHandleCollapseSearch = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  onHandleBuildErrorMsgTextLocal = (type: string): string => {
    let crtErrors = [...this.state.errors];
    if (
      type === "sensorId" &&
      crtErrors.some((e) => e === SensorErrorType.Id)
    ) {
      return "Enter sensor id.";
    }
    if (
      type === "sensorId" &&
      crtErrors.some((e) => e === SensorErrorType.Length)
    ) {
      return "Must be 256 characters or less.";
    }
    if (type === "type" && crtErrors.some((e) => e === SensorErrorType.Type)) {
      return "Select sensor type.";
    }
    return "";
  };

  onHandleSelectedItems = (items: any[]) => {
    if (items.length > 0 && this.props.OnUpdateWorkingResource) {
      let crtItems = [...items].map((i) => {
        let resource = new BaseResource();
        resource.id = i.guid;
        resource.capacity = i.capacity;
        resource.deadline = i.deadline;
        resource.deadlineMess = i.deadlineMess;
        resource.deadlineTime = i.deadlineTime;
        resource.department = i.department;
        resource.description = i.description;
        resource.displayName = i.displayName;
        resource.domain = i.domain;
        resource.email = i.email;
        resource.gallery = i.gallery;
        resource.location = i.location;
        resource.maxDelivery = i.maxDelivery;
        resource.minHours = i.minHours;
        resource.minHoursMess = i.minHoursMess;
        resource.name = i.name;
        resource.phone = i.phone;
        resource.resourceAdInfo = i.resourceAdInfo;
        resource.timeZone = i.timeZone;
        return resource;
      });
      this.props.OnUpdateWorkingResource(crtItems[0]);
      let crtSensor = this.state.sensor.Clone() as BaseSensor;
      crtSensor.resourceInfo = crtItems[0];
      crtSensor.resourceName = crtItems[0].name;
      crtSensor.resourceId = crtItems[0].id;
      this.onHandleUpdateStore(crtSensor);
    }
    if (items.length < 1 && this.props.OnUpdateWorkingResource) {
      this.props.OnUpdateWorkingResource();
    }
  };

  render() {
    let addRs = BuildRCAttribute("sp.addRs");
    let idSearchWrapper = BuildRCAttribute("blk.search.wrapper");
    return (
      <CreateSensorWrapper
        className="CreateSensorWrapper"
        theme={this.props.theme}
      >
        <TextField
          placeholder="Place Holder"
          onChange={this.onChangeText}
          name="sensorId"
          label="Sensor Id"
          darkMode={this.props.theme}
          value={this.state.sensor.sensorId}
          rcName={`sensorId.${this.props.workingTab}`}
          errorMessage={this.onHandleBuildErrorMsgTextLocal("sensorId")}
          onBlur={this.onHandleTrim}
          required
        />
        <Dropdown
          rcName={`type.${this.props.workingTab}`}
          onChange={this.onHandleSelectDropdown}
          placeholder="Select sensor type"
          options={this.state.opts}
          selectedKey={this.state.sensor.sensorType}
          errorMessage={this.onHandleBuildErrorMsgTextLocal("type")}
          darkMode={this.props.theme}
          label="Type"
          required
        />
        <div
          className="expand__header"
          onClick={this.onHandleCollapseSearch}
          {...addRs}
        >
          <Icon
            className="OC__icon"
            iconName={
              this.state.isCollapsed
                ? "CalculatorAddition"
                : "CalculatorSubtract"
            }
          />
          <span>Add Resource</span>
        </div>
        {!this.state.isCollapsed && (
          <SearchResourceWrapper
            {...idSearchWrapper}
            className="SearchResourceWrapper"
          >
            <Search
              onHandleConversationId={this.onHandleCId}
              OnGetSelectedItems={this.onHandleSelectedItems}
              typeSearch="resource"
            />
          </SearchResourceWrapper>
        )}
      </CreateSensorWrapper>
    );
  }
}

export default CreateSensor;
