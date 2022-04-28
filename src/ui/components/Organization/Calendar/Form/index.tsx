import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { IContextualMenuItem } from "aod-dependencies/@uifabric/utilities";
import { Dropdown, IDropdownOption } from "aod-dependencies/Dropdown";
import Picker from "aod-dependencies/MyPicker";
import { Stack } from "aod-dependencies/Stack";
import TextField from "aod-dependencies/TextField/CustomTextField";
import * as React from "react";
import {
  BaseAppointment,
  DatetimeAndTimezone,
  mapBetweenEnumAndValueOfShowAs,
  OnHandleMapDataToBaseAppointment,
} from "src/common/classes/BaseAppointments";
import { BuildRCAttribute } from "src/common/functions";
import MyDateTimePicker from "aod-dependencies/MyDateTimePicker";
import { ErrorTypes, IFormProps, IFormStates } from "./FormModel";
import { FormWrapper } from "./FormStyle";

const AppointmentShowAs: IDropdownOption[] = [
  { key: 0, text: "Free" },
  { key: 1, text: "Tentative" },
  { key: 2, text: "Busy" },
  { key: 3, text: "Out of Office" },
  { key: 4, text: "Working Elsewhere" },
];

class Form extends React.Component<IFormProps, IFormStates> {
  constructor(props: IFormProps) {
    super(props);
    this.state = {
      appointment: new BaseAppointment(),
      errors: [],
      isSelectTimezone: false,
      startTime: new DatetimeAndTimezone(),
      endTime: new DatetimeAndTimezone(),
    };
  }

  componentDidMount() {
    if (this.props.workingAppointment) {
      let defaultTimeZone = this.onGetDefaultTimeZone(this.props.timeZones);
      let apt = OnHandleMapDataToBaseAppointment(this.props.workingAppointment);
      apt.startTime.timeZone = apt.startTime.timeZone || defaultTimeZone;
      apt.endTime.timeZone = apt.endTime.timeZone || defaultTimeZone;
      this.setState({
        appointment: apt,
        startTime: apt.startTime,
        endTime: apt.endTime,
      });
    }
  }

  componentWillUnmount() {
    this.OnHandleGetFormValues();
  }

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleUpdateErrorLocal = (
    value: string | DatetimeAndTimezone,
    key: string
  ): ErrorTypes[] => {
    let crtErrors = [...this.state.errors];
    if (key === "subject" && typeof value === "string" && value.trim() === "") {
      crtErrors = crtErrors.filter((e) => e !== ErrorTypes.Subject);
      crtErrors.push(ErrorTypes.Subject);
    }
    if (key === "subject" && typeof value === "string" && value.trim() !== "") {
      crtErrors = crtErrors.filter((e) => e !== ErrorTypes.Subject);
    }
    if (
      key === "startTime" &&
      ((typeof value !== "string" &&
        (!value.dateTime || value.dateTime.trim() === "")) ||
        (typeof value === "string" && value.trim() === ""))
    ) {
      crtErrors = crtErrors.filter((e) => e !== ErrorTypes.Start);
      crtErrors.push(ErrorTypes.Start);
    }
    if (
      key === "startTime" &&
      ((typeof value !== "string" &&
        value.dateTime &&
        value.dateTime.trim() !== "") ||
        (typeof value === "string" && value.trim() !== ""))
    ) {
      crtErrors = crtErrors.filter((e) => e !== ErrorTypes.Start);
    }
    if (
      key === "endTime" &&
      ((typeof value !== "string" &&
        (!value.dateTime || value.dateTime.trim() === "")) ||
        (typeof value === "string" && value.trim() === ""))
    ) {
      crtErrors = crtErrors.filter((e) => e !== ErrorTypes.End);
      crtErrors.push(ErrorTypes.End);
    }
    if (
      key === "endTime" &&
      ((typeof value !== "string" &&
        value.dateTime &&
        value.dateTime.trim() !== "") ||
        (typeof value === "string" && value.trim() !== ""))
    ) {
      crtErrors = crtErrors.filter((e) => e !== ErrorTypes.End);
    }
    return crtErrors;
  };

  private _FocusInErrorField = () => {
    let fieldSubject: HTMLInputElement = document.querySelectorAll(
      `[data-rc-id='txt.subject.${this.props.rcName}']`
    )[0] as HTMLInputElement;
    let fieldStartTime: HTMLInputElement = document.querySelectorAll(
      `[data-rc-id='txt.startTime.${this.props.rcName}']`
    )[0] as HTMLInputElement;
    let fieldEndTime: HTMLInputElement = document.querySelectorAll(
      `[data-rc-id='txt.endTime.${this.props.rcName}']`
    )[0] as HTMLInputElement;
    if (fieldSubject && fieldSubject.value.trim() === "") {
      fieldSubject.focus();
    } else if (fieldStartTime && fieldStartTime.value.trim() === "") {
      fieldStartTime.focus();
    } else if (fieldEndTime && fieldEndTime.value.trim() === "") {
      fieldEndTime.focus();
    }
  };

  onHandleBuildErrorMsgTextLocal = (type: ErrorTypes, errors: ErrorTypes[]) => {
    if (errors.length > 0 && errors.some((e) => e === type)) {
      return "This is required.";
    }
    return "";
  };

  OnHandleGetFormValues = (index?: number) => {
    if (this.props.OnGetFormValues) {
      let crtAppointment = this.state.appointment.Clone() as BaseAppointment;
      crtAppointment.startTime = this.state.startTime;
      crtAppointment.endTime = this.state.endTime;
      this.props.OnGetFormValues(crtAppointment);
    }
  };

  onHandleChangeTextField = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtAppointment = this.state.appointment.Clone() as BaseAppointment;
    this._onHandleUpdateWorkingStatus(true);
    if (newValue && nameInput !== null) {
      let newAppointment = crtAppointment.UpdateByKey(nameInput, newValue);
      let errors = this._onHandleUpdateErrorLocal(newValue, nameInput);
      return this.setState({ appointment: newAppointment, errors });
    }
    if (!newValue && nameInput !== null) {
      let newAppointment = crtAppointment.UpdateByKey(nameInput, "");
      let errors = this._onHandleUpdateErrorLocal("", nameInput);
      return this.setState({ appointment: newAppointment, errors });
    }
  };

  OnCheckAndFocusErrorField = () => {
    let arr = [
      ["subject", this.state.appointment.subject],
      ["endTime", this.state.endTime],
      ["startTime", this.state.startTime],
    ];
    if (arr.length > 0) {
      this._FocusInErrorField();
      for (let i = 0; i < arr.length; i++) {
        let errors = this._onHandleUpdateErrorLocal(
          arr[i][1],
          String(arr[i][0])
        );
        this.setState({ errors });
      }
    }
  };

  onGetDefaultTimeZone = (timezones?: IDropdownOption[]): string => {
    if (timezones) {
      let offset = new Date().getTimezoneOffset(),
        o = Math.abs(offset);
      let tz =
        (offset < 0 ? "+" : "-") +
        ("00" + Math.floor(o / 60)).slice(-2) +
        ":" +
        ("00" + (o % 60)).slice(-2);
      let timeZone = [...timezones].find((t) => t.text.indexOf(tz) !== -1);
      if (timeZone) {
        return timeZone.text;
      }
      return "";
    }
    return "";
  };

  onHandleSelectTimezone = () => {
    this.setState({ isSelectTimezone: !this.state.isSelectTimezone });
  };

  onHandleSelectDate = (val: Date | { date: Date }[], type: string): void => {
    let crtAppointment = this.state.appointment.Clone() as BaseAppointment;
    this._onHandleUpdateWorkingStatus(true);
    if (!Array.isArray(val)) {
      let dateStr = val.toDateString();
      if (type === "start") {
        crtAppointment.startTime.dateTime = dateStr;
      }
      if (type === "end") {
        crtAppointment.endTime.dateTime = dateStr;
      }
      this.setState({ appointment: crtAppointment });
    }
  };

  onHandleSelectTime = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    type?: string
  ) => {
    console.log(item);
  };

  onHandlePickerVal = (str?: string, type?: string) => {
    let crtStart = { ...this.state.startTime } as DatetimeAndTimezone;
    let crtEnd = { ...this.state.endTime } as DatetimeAndTimezone;
    let value = str || "";
    this._onHandleUpdateWorkingStatus(true);
    if (type === "start" && crtStart) {
      crtStart.timeZone = value;
    }
    if (type === "end" && crtEnd) {
      crtEnd.timeZone = value;
    }
    return this.setState({ startTime: crtStart, endTime: crtEnd });
  };

  RenderTimezonePicker = (value: string, type: string) => {
    let opts: IContextualMenuItem[] = [];
    if (this.props.timeZones) {
      opts = this.props.timeZones.map((t) => {
        return {
          key: t.key,
          text: t.text,
          name: t.text,
        } as IContextualMenuItem;
      });
    }
    return (
      <Picker
        darkMode={this.props.theme}
        rcName={`pik.${type}.timeZone`}
        items={opts}
        inputProps={{
          placeholder: "Plance Holder",
          label: `Time Zone ${type}`,
        }}
        onGetValueOfPicker={(str) => this.onHandlePickerVal(str, type)}
        value={value}
      />
    );
  };

  onHandleValueDateTime = (val: Date | string | number, type?: string) => {
    let crtStart = { ...this.state.startTime } as DatetimeAndTimezone;
    let crtEnd = { ...this.state.endTime } as DatetimeAndTimezone;
    let crtErrors = [...this.state.errors];
    if (type) {
      this._onHandleUpdateWorkingStatus(true);
      switch (type) {
        case "start":
          crtStart.dateTime = String(val);
          crtErrors = this._onHandleUpdateErrorLocal(String(val), "startTime");
          break;
        case "end":
          crtEnd.dateTime = String(val);
          crtErrors = this._onHandleUpdateErrorLocal(String(val), "endTime");
          break;

        default:
          break;
      }
    }
    this.setState({ startTime: crtStart, endTime: crtEnd, errors: crtErrors });
  };

  onHandleChangeDrop = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      this._onHandleUpdateWorkingStatus(true);
      let crtAppointment = this.state.appointment.Clone() as BaseAppointment;
      crtAppointment.showAs = mapBetweenEnumAndValueOfShowAs(option.key);
      this.setState({ appointment: crtAppointment });
    }
  };

  render() {
    let idSelectTimezone = BuildRCAttribute("sp.selectTimezone");
    return (
      <FormWrapper className="FormWrapper" theme={this.props.theme}>
        <Stack className="infomation__stack" horizontal wrap>
          <Stack.Item className="flexColumn" grow={3}>
            <TextField
              rcName={`subject.${this.props.rcName}`}
              darkMode={this.props.theme}
              className="m-b-10"
              label="Subject"
              name="subject"
              required
              value={this.state.appointment.subject}
              placeholder="Place holder"
              onChange={this.onHandleChangeTextField}
              errorMessage={this.onHandleBuildErrorMsgTextLocal(
                ErrorTypes.Subject,
                this.state.errors
              )}
              autoFocus
            />
          </Stack.Item>
          <Stack.Item className="infomation__block flexColumn" grow={3}>
            <Dropdown
              label="Show as"
              placeholder="Select"
              options={AppointmentShowAs}
              onChange={this.onHandleChangeDrop}
              selectedKey={this.state.appointment.showAs}
              darkMode={this.props.theme}
              rcName={`showAs.${this.props.rcName}`}
              required
            />
          </Stack.Item>
        </Stack>
        <Stack className="infomation__stack" horizontal wrap>
          <Stack.Item className="flexColumn" grow={3}>
            <MyDateTimePicker
              darkMode={this.props.theme}
              rcName={`startTime.${this.props.rcName}`}
              id="startTime"
              textFieldProps={{
                placeholder: "Select date",
                label: "Start Time",
                errorMessage: this.onHandleBuildErrorMsgTextLocal(
                  ErrorTypes.Start,
                  this.state.errors
                ),
                required: true,
              }}
              value={this.state.startTime.dateTime}
              onGetValue={(val) => this.onHandleValueDateTime(val, "start")}
            />
          </Stack.Item>
          <Stack.Item className="infomation__block flexColumn" grow={3}>
            <MyDateTimePicker
              darkMode={this.props.theme}
              rcName={`endTime.${this.props.rcName}`}
              id="endTime"
              value={this.state.endTime.dateTime}
              textFieldProps={{
                placeholder: "Select date",
                label: "End Time",
                errorMessage: this.onHandleBuildErrorMsgTextLocal(
                  ErrorTypes.End,
                  this.state.errors
                ),
                required: true,
              }}
              onGetValue={(val) => this.onHandleValueDateTime(val, "end")}
            />
          </Stack.Item>
        </Stack>
        {this.state.isSelectTimezone && (
          <Stack className="infomation__stack" horizontal>
            <Stack.Item grow={3}>
              {this.RenderTimezonePicker(this.state.endTime.timeZone, "start")}
            </Stack.Item>
            <Stack.Item className="infomation__block" grow={3}>
              {this.RenderTimezonePicker(this.state.endTime.timeZone, "end")}
            </Stack.Item>
          </Stack>
        )}
        <span
          {...idSelectTimezone}
          onClick={this.onHandleSelectTimezone}
          className="act__timeZone"
        >
          <Icon
            className="OC__icon"
            iconName={
              !this.state.isSelectTimezone
                ? "CalculatorAddition"
                : "CalculatorSubtract"
            }
          />
          {this.state.isSelectTimezone
            ? "Use client timezone"
            : "Select other timezone"}
        </span>
      </FormWrapper>
    );
  }
}

export default Form;
