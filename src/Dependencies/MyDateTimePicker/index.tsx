import * as React from "react";
import { Icon } from "../@uifabric/icons";
import { Callout } from "../@uifabric/utilities/Callout";
import { DirectionalHint } from "../@uifabric/utilities/ContextualMenu";
import CalenderInline from "../calendar-custom/CalenderInline";
import SpinButton from "../SpinButton/CustomSpinButton";
import TextField from "../TextField/CustomTextField";
import { IPickerProps, IPickerStates } from "./DateTimePickerModels";
import { DateTimePickerWrapper } from "./DateTimePickerStyle";

class DateTimePicker extends React.Component<IPickerProps, IPickerStates> {
  constructor(props: IPickerProps) {
    super(props);
    this.state = {
      value: "",
      isVisibledCallout: false,
      hour: 0,
      minute: 0,
      second: 0,
      date: null,
    };
  }

  componentDidUpdate(pp: IPickerProps, ps: IPickerStates) {
    if (
      this.props.value !== pp.value &&
      typeof this.props.value !== "undefined" &&
      !this.state.date
    ) {
      this._onHandleConvertValueToData(this.props.value);
    }
  }

  private _onHandleConvertValueToData = (value?: string | number | Date) => {
    if (value) {
      let date = new Date(value);
      this.setState({
        date,
        value: date ? date.toLocaleString() : "",
        hour: date ? date.getHours() : 0,
        minute: date ? date.getMinutes() : 0,
        second: date ? date.getSeconds() : 0,
      });
    }
  };

  private _onHandleUpdateVisibleCallout = (
    val?: boolean,
    displayDate?: string
  ) => {
    if (typeof val === "undefined") {
      this.setState({
        isVisibledCallout: !this.state.isVisibledCallout,
        value: displayDate || this.state.value,
      });
    }
    if (typeof val !== "undefined") {
      this.setState({
        isVisibledCallout: val,
        value: displayDate || this.state.value,
        // date: this.state.value.trim() === "" ? null : this.state.date,
        // hour: this.state.value.trim() === "" ? 0 : this.state.hour,
        // minute: this.state.value.trim() === "" ? 0 : this.state.minute,
        // second: this.state.value.trim() === "" ? 0 : this.state.second,
      });
      // if (this.props.onGetValue) {
      //   this.props.onGetValue("");
      // }
    }
  };

  private _onHandleSentValue = () => {
    if (this.props.onGetValue) {
      let date = this._onHandleConvertToDisplayText();
      let result: Date | string | number = date.toLocaleString();
      if (this.props.getDataType) {
        switch (this.props.getDataType.toLocaleLowerCase()) {
          case "date":
            result = date;
            break;
          case "time":
            result = date.getTime();
            break;
          case "ticks":
            result = date.getTime() * 10000 + 621355968000000000;
            break;
          default:
            break;
        }
      }
      if (this.state.date) {
        this.props.onGetValue(result);
      } else {
        this.props.onGetValue("");
      }
    }
  };

  private _onHandleConvertToDisplayText = (date?: Date): Date => {
    let crtDate = date ? date : this.state.date;
    if (crtDate) {
      crtDate.setHours(this.state.hour);
      crtDate.setMinutes(this.state.minute);
      crtDate.setSeconds(this.state.second);
      return crtDate;
    }
    return new Date();
  };

  private _isValidDate(d: Date) {
    return d instanceof Date && !isNaN(Number(d));
  }

  onHandleOnFocusInMask = () => {
    this._onHandleUpdateVisibleCallout(true);
    return this.props.textFieldProps?.onFocus;
  };

  onHandleDismiss = () => {
    this._onHandleUpdateVisibleCallout();
    return this.props.calloutProps?.onDismiss;
  };

  onHandleCancel = () => {
    this.setState({
      hour: this.state.value.trim() === "" ? 0 : this.state.hour,
      minute: this.state.value.trim() === "" ? 0 : this.state.minute,
      second: this.state.value.trim() === "" ? 0 : this.state.second,
      date: this.state.value.trim() === "" ? null : this.state.date,
      value: this.state.value.trim() === "" ? "" : this.state.value,
      isVisibledCallout: false,
    });
    if (this.state.value.trim() === "") {
      this._onHandleSentValue();
    }
  };

  onHandleCheck = () => {
    if (this.state.date) {
      let displayDate = this._onHandleConvertToDisplayText();
      this._onHandleUpdateVisibleCallout(
        undefined,
        displayDate.toLocaleString()
      );
      this._onHandleSentValue();
    } else {
      this._onHandleUpdateVisibleCallout();
      this._onHandleSentValue();
    }
  };

  onValidateSpin = (
    value: string,
    event?: React.SyntheticEvent<HTMLElement>,
    type?: string
  ) => {
    let state: any = { ...this.state };
    state.isWorking = true;
    if (type === "hour" && !isNaN(Number(value))) {
      state[type] = Number(value);
      if (Number(value) <= 23) {
        return this.setState(state);
      }
      if (Number(value) >= 24) {
        return this.setState({ hour: 24, second: 0, minute: 0 });
      }
    }
    if (type && type !== "hour" && !isNaN(Number(value))) {
      if (Number(value) <= 59) {
        state[type] = Number(value);
      }
      if (Number(value) > 59 || this.state.hour === 24) {
        state[type] = 0;
      }
      return this.setState(state);
    }
  };

  onIncrementSpin = (value: string, type?: string) => {
    let state: any = { ...this.state };
    if (type === "hour" && !isNaN(Number(value)) && Number(value) <= 22) {
      this.setState({ hour: this.state.hour + 1 });
    }
    if (type === "hour" && !isNaN(Number(value)) && Number(value) === 23) {
      this.setState({ hour: 24, second: 0, minute: 0 });
    }
    if (
      type &&
      type !== "hour" &&
      !isNaN(Number(value)) &&
      Number(value) <= 58
    ) {
      state[type] = Number(state[type]) + 1;
      state.isWorking = true;
      this.setState(state);
    }
    if (
      type &&
      type !== "hour" &&
      !isNaN(Number(value)) &&
      Number(value) === 59
    ) {
      state[type] = 0;
      state.isWorking = true;
      this.setState(state);
    }
  };

  onDecrementSpin = (value: string, type?: string) => {
    let state: any = { ...this.state };
    state.isWorking = true;
    if (type && !isNaN(Number(value)) && Number(value) >= 1) {
      state[type] = Number(state[type]) - 1;
      this.setState(state);
    }
  };

  onGetDataCalendar = (val: Date | { date: Date }[]): void => {
    if (!Array.isArray(val)) {
      this.setState({ date: val });
    }
  };

  onHandleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (
      newValue &&
      !isNaN(Date.parse(newValue)) &&
      this._isValidDate(new Date(newValue))
    ) {
      let date = new Date(newValue);
      this.setState({
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        date,
        value: newValue,
      });
    } else {
      this.setState({ value: newValue ? newValue : "" });
    }
    return this.props.textFieldProps?.onChange;
  };

  render() {
    return (
      <DateTimePickerWrapper
        className="DateTimePickerWrapper"
        theme={this.props.darkMode}
      >
        <TextField
          onFocus={this.onHandleOnFocusInMask}
          onChange={this.onHandleChange}
          value={this.state.value}
          id={this.props.id}
          rcName={this.props.rcName}
          darkMode={this.props.darkMode}
          autoComplete="off"
          iconProps={{ iconName: "Calendar" }}
          {...this.props.textFieldProps}
        />
        {this.state.isVisibledCallout && (
          <Callout
            directionalHintFixed={
              this.props.calloutProps?.directionalHintFixed || true
            }
            beakWidth={this.props.calloutProps?.beakWidth || 0}
            gapSpace={this.props.calloutProps?.gapSpace || 0}
            directionalHint={
              this.props.calloutProps?.directionalHint ||
              DirectionalHint.bottomLeftEdge
            }
            target={`#${this.props.id}`}
            onDismiss={this._onHandleUpdateVisibleCallout}
            {...this.props.calloutProps}
          >
            <div
              className="blk__header__row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
                background: this.props.darkMode === "dark" ? "#1B1A19" : "#fff",
              }}
            >
              <div
                className="blk__time"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SpinButton
                  className="ipt__time hour"
                  min={0}
                  step={24}
                  value={String(this.state.hour)}
                  styles={{
                    root: {
                      minWidth: 0,
                    },
                    spinButtonWrapper: {
                      selectors: {
                        ":after": {
                          borderColor:
                            this.props.darkMode === "dark"
                              ? "#212121  !important"
                              : "#c4c4c4 !important",
                        },
                      },
                    },
                  }}
                  style={{ width: 50, minWidth: 0, margin: "0 5px" }}
                  inputProps={{
                    style: { minWidth: 0, width: 50, padding: "0 5px" },
                  }}
                  onValidate={(val: any, e: any) =>
                    this.onValidateSpin(val, e, "hour")
                  }
                  onDecrement={(val: any) => this.onDecrementSpin(val, "hour")}
                  onIncrement={(val: any) => this.onIncrementSpin(val, "hour")}
                  rcName={this.props.rcName}
                  darkMode={this.props.darkMode}
                />
                <SpinButton
                  className="ipt__time minute"
                  value={String(
                    this.state.minute === 0 ? "00" : this.state.minute
                  )}
                  min={0}
                  step={60}
                  styles={{
                    root: { minWidth: 0 },
                    spinButtonWrapper: {
                      selectors: {
                        ":after": {
                          borderColor:
                            this.props.darkMode === "dark"
                              ? "#212121  !important"
                              : "#c4c4c4 !important",
                        },
                      },
                    },
                  }}
                  style={{ width: 50, minWidth: 0, margin: "0 5px" }}
                  inputProps={{
                    style: { minWidth: 0, width: 50, padding: "0 5px" },
                  }}
                  onValidate={(val: any, e: any) =>
                    this.onValidateSpin(val, e, "minute")
                  }
                  onDecrement={(val: any) =>
                    this.onDecrementSpin(val, "minute")
                  }
                  onIncrement={(val: any) =>
                    this.onIncrementSpin(val, "minute")
                  }
                  rcName={this.props.rcName}
                  darkMode={this.props.darkMode}
                />
                <SpinButton
                  className="ipt__time second"
                  min={0}
                  value={String(
                    this.state.second === 0 ? "00" : this.state.second
                  )}
                  step={60}
                  styles={{
                    root: { minWidth: 0 },
                    spinButtonWrapper: {
                      selectors: {
                        ":after": {
                          borderColor:
                            this.props.darkMode === "dark"
                              ? "#212121  !important"
                              : "#c4c4c4 !important",
                        },
                      },
                    },
                  }}
                  style={{ width: 50, minWidth: 0, margin: "0 5px" }}
                  inputProps={{
                    style: { minWidth: 0, width: 50, padding: "0 5px" },
                  }}
                  onValidate={(val: any, e: any) =>
                    this.onValidateSpin(val, e, "second")
                  }
                  onDecrement={(val: any) =>
                    this.onDecrementSpin(val, "second")
                  }
                  onIncrement={(val: any) =>
                    this.onIncrementSpin(val, "second")
                  }
                  rcName={this.props.rcName}
                  darkMode={this.props.darkMode}
                />
              </div>
              <div
                className="blk__actions"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Icon
                  onClick={this.onHandleCancel}
                  className="cancel"
                  iconName="Cancel"
                  style={{ padding: "2px 5px", cursor: "pointer" }}
                  styles={{
                    root: {
                      selectors: {
                        ":hover": {
                          fontWeight: "600",
                        },
                      },
                    },
                  }}
                  rcName={this.props.rcName}
                />
                <Icon
                  onClick={this.onHandleCheck}
                  rcName={this.props.rcName}
                  className="check"
                  iconName="CheckMark"
                  style={{ padding: "2px 5px", cursor: "pointer" }}
                  styles={{
                    root: {
                      selectors: {
                        ":hover": {
                          fontWeight: "600",
                          color:
                            this.props.darkMode === "dark"
                              ? "#69afe5"
                              : "#0078d4",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <CalenderInline
              autoNavigateOnSelection={true}
              showGoToToday={false}
              highlightSelectedMonth={true}
              showMonthPickerAsOverlay={true}
              showWeekNumbers={false}
              showSixWeeksByDefault={false}
              switchMode={false}
              onSelectChanged={this.onGetDataCalendar}
              rcName={this.props.rcName}
              selectedDate={this.state.date || new Date()}
              darkMode={this.props.darkMode}
            />
          </Callout>
        )}
      </DateTimePickerWrapper>
    );
  }
}

export default DateTimePicker;
