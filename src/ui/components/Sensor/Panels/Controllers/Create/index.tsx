import * as React from "react";
import {
  ICreateControllerProps,
  ICreateControllerStates,
} from "./CreateModels";
import { CreateSensorWrapper, SearchResourceWrapper } from "./CreateStyle";
import { Stack } from "aod-dependencies/Stack";
import Search from "src/ui/containers/Sensor/SensorSearchContainer";
import { BaseController } from "src/common/classes/BaseController";
import { BaseResource } from "src/common/classes/BaseResource";
import MaskedTextField from "aod-dependencies/TextField/MaskedTextField/CustomMaskedTextField";

class CreateController extends React.Component<
  ICreateControllerProps,
  ICreateControllerStates
> {
  constructor(props: ICreateControllerProps) {
    super(props);
    this.state = {
      controller: new BaseController(),
      errors: [],
      selectedItems: [],
      isCollapsed: true,
      cId: "",
    };
  }

  componentDidMount() {
    if (this.props.controller) {
      let controller = new BaseController();
      controller.sensorControllerId = this.props.controller.sensorControllerId;
      controller.occupationStatus = this.props.controller.occupationStatus;
      controller.sensors = this.props.controller.sensors;
      controller.timeZone = this.props.controller.timeZone;
      controller.totalSensors = this.props.controller.totalSensors;
      controller.reservationTime = this.props.controller.reservationTime;
      controller.sensorTime = this.props.controller.sensorTime;
      controller.sensorTimeTick = this.props.controller.sensorTimeTick;
      controller.guid = this.props.controller.guid;
      controller.resourceId = this.props.controller.resourceId;
      controller.resourceName = this.props.controller.resourceName;
      controller.resourceInfo = this.props.controller.resourceInfo;
      controller.reservationTimeTick =
        this.props.controller.reservationTimeTick;
      this.setState({
        controller: controller,
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

  private _UpdateIsSearch = () => {
    console.log("in func");
    // this.setState({
    //   isSearch: !this.state.isSearch,
    // });
  };

  private _onHandleUpdateErrorLocal = (str: string, key: string) => {
    let crtErrors = [...this.state.errors];
    let value = str.split(":");
    let minute = value[1];
    let second = value[2];
    if (
      minute &&
      second &&
      (Number(minute) > 59 ||
        Number(second) > 59 ||
        str === "00:00:00" ||
        str.indexOf("-") !== -1) &&
      ["reservationTime", "sensorTime"].includes(key)
    ) {
      crtErrors = crtErrors.filter((e) => e !== key);
      crtErrors.push(key);
    }
    if (
      str.indexOf("-") === -1 &&
      minute &&
      second &&
      Number(minute) < 60 &&
      Number(second) < 60 &&
      str !== "00:00:00" &&
      ["reservationTime", "sensorTime"].includes(key)
    ) {
      crtErrors = crtErrors.filter((e) => e !== key);
    }
    return crtErrors;
  };

  onHandleChangeMask = async (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let currentData = this.state.controller.Clone() as BaseController;
    if (newValue && nameInput !== null && newValue !== "00:00:00") {
      let rs = currentData.UpdateByKey(nameInput, newValue);
      let errs = this._onHandleUpdateErrorLocal(newValue, nameInput);
      this.setState({
        controller: rs,
        errors: errs,
      });
    }
    if ((!newValue || newValue === "00:00:00") && nameInput !== null) {
      let rs = currentData.UpdateByKey(nameInput, "00:00:00");
      let errs = this._onHandleUpdateErrorLocal("00:00:00", nameInput);
      this.setState({
        controller: rs,
        errors: errs,
      });
    }
    // this._onGetFormData();
    this._onHandleWorkingStatus(true);
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

  onHandleUpdateStore = () => {
    if (this.props.OnUpdateController) {
      let crtController = this.state.controller.Clone() as BaseController;
      if (this.state.selectedItems.length > 0) {
        crtController.timeZone = this.state.selectedItems[0].timeZone;
        crtController.resourceId = this.state.selectedItems[0].id;
      }
      this.props.OnUpdateController(crtController);
    }
  };

  onHandleCId = (id: string) => {
    this.setState({ cId: id });
  };

  onHandleCollapseSearch = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
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
    if (this.state.selectedItems.length < 1) {
      crtErrors = crtErrors.filter((e) => e !== "resource");
      crtErrors.push("resource");
    }
    this.setState({ errors: crtErrors });
  };

  onHandleSelectedItems = (items: any[]) => {
    let crtErrors = [...this.state.errors];
    if (items.length > 0) {
      this._onHandleWorkingStatus(true);
      crtErrors = crtErrors.filter((e) => e !== "resource");
      let rs: BaseResource[] = items.map((i) => {
        let resource = new BaseResource();
        resource.id = i.guid;
        resource.name = i.name;
        resource.phone = i.phone;
        resource.timeZone = i.timeZone;
        resource.capacity = i.capacity;
        resource.deadline = i.deadline;
        resource.deadlineMess = i.deadlineMess;
        resource.deadlineTime = i.deadlineTime;
        resource.department = i.department;
        resource.description = i.description;
        resource.displayName = i.displayName;
        resource.domain = i.email ? i.email.split("@")[1] : "";
        resource.email = i.email ? i.email.split("@")[0] : "";
        resource.gallery = i.gallery;
        resource.location = i.location;
        resource.maxDelivery = i.maxDelivery;
        resource.minHours = i.minHours;
        resource.minHoursMess = i.minHoursMess;
        resource.resourceAdInfo = i.resourceAdInfo;
        return resource;
      });
      let crtController = this.state.controller.Clone() as BaseController;
      if (items.length === 1) {
        crtController.resourceInfo = rs[0];
        crtController.resourceId = rs[0].id;
        crtController.resourceName = rs[0].name;
      }
      this.setState({
        selectedItems: rs,
        errors: crtErrors,
        controller: crtController,
      });
    }
  };

  render() {
    return (
      <CreateSensorWrapper
        className="CreateSensorWrapper"
        theme={this.props.theme}
      >
        <Stack className="infomation__stack" horizontal wrap>
          <Stack.Item className="infomation__block padding__right" grow={3}>
            <MaskedTextField
              label="Reservation time (hh:mm:ss)"
              mask="99:99:99"
              maskChar="0"
              defaultValue="00:00:00"
              onChange={(
                event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                newValue?: string
              ) => this.onHandleChangeMask(event, newValue)}
              name="reservationTime"
              darkMode={this.props.theme}
              value={this.state.controller.reservationTime}
              rcName={`reservationTime.${this.props.workingTab}`}
              errorMessage={this.onHandleBuildErrorMsgTextLocal(
                "reservationTime"
              )}
              required
              onBlur={this.onHandleTrim}
              isDisableFocusToLeftUnfilled
            />
          </Stack.Item>
          <Stack.Item className="infomation__block" grow={3}>
            <MaskedTextField
              label="Sensor time frame (hh:mm:ss)"
              mask="99:99:99"
              name="sensorTime"
              defaultValue="00:00:00"
              maskChar="0"
              darkMode={this.props.theme}
              value={this.state.controller.sensorTime}
              onChange={this.onHandleChangeMask}
              required
              rcName={`sensorTime.${this.props.workingTab}`}
              errorMessage={this.onHandleBuildErrorMsgTextLocal("sensorTime")}
              onBlur={this.onHandleTrim}
              isDisableFocusToLeftUnfilled
            />
          </Stack.Item>
        </Stack>
        <SearchResourceWrapper className="SearchResourceWrapper">
          <Search
            onHandleConversationId={this.onHandleCId}
            UpdateSearchVisible={this._UpdateIsSearch}
            OnGetSelectedItems={this.onHandleSelectedItems}
            typeSearch="resource"
            errorMsg={
              this.state.errors.some((e) => e === "resource")
                ? "Select a resource."
                : undefined
            }
            isRequired
          />
        </SearchResourceWrapper>
      </CreateSensorWrapper>
    );
  }
}

export default CreateController;
