import * as React from "react";
import {
  IFilterProps,
  PanelWrapper,
  CalendarWrapper,
  PanelContentWrapper,
  OptionAndTextWrapper,
  IFilterState,
  ChoiceGroupWrapper,
} from "./ListStyle";
import { IDropdownOption } from "../Dropdown";
import CustomDropdown from "../Dropdown/CustomDropdown";
import Button from "../Button";
import CustomTextField from "../TextField/CustomTextField";
import CalenderInline from "../calendar-custom/CalenderInline";
import CustomChoiceGroup from "../ChoiceGroup/CustomChoiceGroup";
import { IChoiceGroupOption } from "../ChoiceGroup/ChoiceGroup.types";

class Breadcrumd extends React.Component<IFilterProps, IFilterState> {
  constructor(props: IFilterProps) {
    super(props);
    this.state = {
      type: undefined,
      value: undefined,
      result: [],
      resultColumns: [],
      operator: "",
      selectMode: undefined,
    };
  }

  onSelectDrop = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      this.setState({
        type: option.key,
        value: this.state.value ? this.state.value : "",
        operator:
          typeof option.key !== "string"
            ? JSON.stringify(option.key)
            : option.key,
      });
    }
  };

  onSelectDropdownCalendar = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      this.setState({
        type:
          typeof option.key !== "string"
            ? JSON.stringify(option.key)
            : option.key,
        operator:
          typeof option.key !== "string"
            ? JSON.stringify(option.key)
            : option.key,
      });
    }
  };

  onChangeInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string,
    type?: string
  ) => {
    let currentType = this.state.type;
    let val = newValue && type ? Number(newValue) : newValue;
    if (currentType) {
      this.setState({
        value: newValue ? val : "",
      });
    }
  };

  onCheckedBox = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    value?: boolean
  ) => {
    let currentValue = this.state.value;
    if (currentValue === value) {
      this.setState({ type: undefined, value: undefined });
    }
    if (currentValue !== value) {
      this.setState({ type: "boolean", value, operator: "eq" });
    }
  };

  onGetChoiceGroup = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ): void => {
    if (option) {
      this.setState({
        type: "boolean",
        value: option.key === "true" ? true : false,
        operator: "eq",
      });
    }
  };

  onGetDataCalendar = (val: Date | { date: Date }[]): void => {
    if (Array.isArray(val) && val.length >= 2) {
      this.setState({
        operator: this.state.operator === "" ? "contains" : this.state.operator,
        value: val,
      });
    }
    if (!Array.isArray(val)) {
      this.setState({
        operator: this.state.operator === "" ? "eq" : this.state.operator,
        value: val,
      });
    }
  };

  onApplyFilter = async () => {
    this.props.isOffline && (await this.onFilter());
    let val =
      this.state.value || this.state.value === false
        ? typeof this.state.value === "string"
          ? this.state.value.trim()
          : this.state.value
        : "";
    this.props.onGetFilterObject &&
      this.props.onGetFilterObject({
        columnKey: this.props.targetColumn.key,
        key: this.props.targetColumn.fieldName!,
        value: val,
        operator: this.state.operator,
      });
    this.props.onGetItem && this.props.onGetItem(this.state.result);
  };

  onSubmitText = (e: React.KeyboardEvent) => {
    let { keyCode } = e;
    if (keyCode === 13 && this.state.type && this.state.value !== undefined) {
      this.onApplyFilter();
    }
  };

  onRenderCheckBox = (type: string): JSX.Element => {
    const options: { key: string; text: string }[] = [
      { key: "eq", text: "Equal" },
      { key: "ne", text: "Does not equal" },
      { key: "contains", text: "Contains" },
      { key: "not", text: "Does not contain" },
    ];
    const optionsNumber: { key: string; text: string }[] = [
      { key: "eq", text: "Equal" },
      { key: "lt", text: "Less than" },
      { key: "gt", text: "Greater than" },
      { key: "le", text: "Less than or equal to" },
      { key: "ge", text: "Greater than or equal to" },
    ];
    const optionsCalendarSingle: { key: string; text: string }[] = [
      { key: "eq", text: "Equal" },
      { key: "lt", text: "Less than" },
      { key: "gt", text: "Greater than" },
      { key: "le", text: "Less than or equal to" },
      { key: "ge", text: "Greater than or equal to" },
    ];
    const optionsCalendarMultiple: { key: string; text: string }[] = [
      { key: "contains", text: "Within" },
      { key: "not", text: "Not within" },
    ];
    const optionsChoiceGroup: IChoiceGroupOption[] = [
      { key: "true", text: "Done" },
      { key: "false", text: "Processing" },
    ];
    switch (type) {
      case "boolean":
        return (
          <ChoiceGroupWrapper>
            <CustomChoiceGroup
              options={optionsChoiceGroup}
              darkMode={this.props.darkMode}
              onChange={this.onGetChoiceGroup}
              rcName={`${this.props.rcName}`}
              disabled={this.state.operator === "" ? true : false}
            />
          </ChoiceGroupWrapper>
        );

      case "date":
        return (
          <CalendarWrapper>
            <CustomDropdown
              label="Filter Condition"
              placeholder="Select filter"
              options={
                this.state.selectMode && this.state.selectMode === "multiple"
                  ? optionsCalendarMultiple
                  : optionsCalendarSingle
              }
              onChange={this.onSelectDropdownCalendar}
              darkMode={this.props.darkMode}
              styles={{ callout: { zIndex: 1 } }}
              rcName={`${this.props.rcName}`}
              selectedKey={this.state.operator}
            />
            <CalenderInline
              autoNavigateOnSelection={true}
              showGoToToday={false}
              highlightSelectedMonth={true}
              showMonthPickerAsOverlay={true}
              showWeekNumbers={false}
              showSixWeeksByDefault={false}
              onSelectChanged={this.onGetDataCalendar}
              switchMode={true}
              darkMode={this.props.darkMode}
              onGetSelectMode={(pickType: string) =>
                this.setState({ selectMode: pickType })
              }
              rcName={`${this.props.rcName}`}
            />
          </CalendarWrapper>
        );

      case "number":
        return (
          <OptionAndTextWrapper theme={this.props.darkMode}>
            <ul>
              <li>
                <CustomDropdown
                  label="Filter Condition"
                  placeholder="Select filter"
                  options={optionsNumber}
                  onChange={this.onSelectDrop}
                  darkMode={this.props.darkMode}
                  styles={{ callout: { zIndex: 1 } }}
                  rcName={`${this.props.rcName}`}
                  selectedKey={this.state.operator}
                />
              </li>
              <li>
                <CustomTextField
                  disabled={this.state.type ? false : true}
                  label="Value"
                  required
                  onChange={(e, newVal) =>
                    this.onChangeInput(e, newVal, "number")
                  }
                  value={this.state.value ? String(this.state.value) : ""}
                  onKeyDown={this.onSubmitText}
                  darkMode={this.props.darkMode}
                  type="number"
                  min={0}
                  rcName={`${this.props.rcName}`}
                />
              </li>
            </ul>
          </OptionAndTextWrapper>
        );

      default:
        return (
          <OptionAndTextWrapper theme={this.props.darkMode}>
            <ul>
              <li>
                <CustomDropdown
                  label="Filter Condition"
                  placeholder="Select filter"
                  options={options}
                  onChange={this.onSelectDrop}
                  darkMode={this.props.darkMode}
                  styles={{ callout: { zIndex: 1 } }}
                  selectedKey={this.state.operator}
                  rcName={`${this.props.rcName}`}
                />
              </li>
              <li>
                <CustomTextField
                  disabled={this.state.type ? false : true}
                  label="Value"
                  onChange={this.onChangeInput}
                  value={
                    this.state.value && typeof this.state.value === "string"
                      ? this.state.value
                      : ""
                  }
                  onKeyDown={this.onSubmitText}
                  darkMode={this.props.darkMode}
                  rcName={`${this.props.rcName}`}
                />
              </li>
            </ul>
          </OptionAndTextWrapper>
        );
    }
  };

  onClearFilter = () => {
    this.setState({
      // type: this.state.type === "boolean" ? undefined : this.state.type,
      type: undefined,
      value: undefined,
      result: [],
      operator: "",
    });
  };

  onFilter = async () => {
    let { targetColumn } = this.props;
    let items = [...this.props.items];
    let { type, value } = this.state;
    if (type && targetColumn?.fieldName) {
      let keyCol = targetColumn.fieldName;
      switch (type) {
        case "gt":
          if (typeof value === "string") {
            let resultGreater = items.filter((item) => {
              let itemValue = item[keyCol];
              if (typeof value === "string" && itemValue > parseInt(value)) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultGreater,
            });
          }
          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDateGreater = items.filter((item) => {
              let itemValue = item[keyCol];
              if (value && itemValue.valueOf() > value.valueOf()) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultDateGreater,
            });
          }
          break;

        case "lt":
          if (typeof value === "string") {
            let resultLessThan = items.filter((item) => {
              let itemValue = item[keyCol];
              if (typeof value === "string" && itemValue < parseInt(value)) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultLessThan,
            });
          }
          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDateLessThan = items.filter((item) => {
              let itemValue = item[keyCol];
              if (value && itemValue.valueOf() < value.valueOf()) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultDateLessThan,
            });
          }
          break;

        case "ge":
          if (typeof value === "string") {
            let resultGreaterOrEqual = items.filter((item) => {
              let itemValue = item[keyCol];
              if (typeof value === "string" && itemValue >= parseInt(value)) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultGreaterOrEqual,
            });
          }
          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDateGreaterOrEqual = items.filter((item) => {
              let itemValue = item[keyCol];
              if (value && itemValue.valueOf() >= value.valueOf()) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultDateGreaterOrEqual,
            });
          }
          break;

        case "le":
          if (typeof value === "string") {
            let resultLessThanOrEqual = items.filter((item) => {
              let itemValue = item[keyCol];
              if (typeof value === "string" && itemValue <= parseInt(value)) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultLessThanOrEqual,
            });
          }
          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDateLessThanOrEqual = items.filter((item) => {
              let itemValue = item[keyCol];
              if (value && itemValue.valueOf() <= value.valueOf()) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultDateLessThanOrEqual,
            });
          }
          break;

        case "eq":
          if (typeof value === "string") {
            let resultEqual = items.filter((item) => {
              let itemVal =
                typeof item[keyCol] === "string"
                  ? item[keyCol]
                  : item[keyCol].toString();
              if (itemVal === value) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultEqual,
            });
          }
          if (Object.prototype.toString.call(value) === "[object Date]") {
            let resultDate = items.filter((item) => {
              let selectedDate = new Date(item[keyCol]);
              if (
                selectedDate.setHours(0, 0, 0, 0).valueOf() === value?.valueOf()
              ) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultDate,
            });
          }
          break;

        case "ne":
          let resultNotEqual = items.filter((item) => {
            let itemVal =
              typeof item[keyCol] === "string"
                ? item[keyCol]
                : item[keyCol].toString();
            if (itemVal !== value) {
              return true;
            }
            return false;
          });
          await this.setState({
            result: resultNotEqual,
          });
          break;

        case "contains":
          if (typeof value === "string") {
            let resultContain = items.filter((item) => {
              let string =
                typeof item[keyCol] === "string"
                  ? item[keyCol]
                  : item[keyCol].toString();
              if (string.indexOf(value) !== -1) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultContain,
            });
          }
          if (Array.isArray(value)) {
            let resultDateContain = items.filter((item) => {
              let selectedDate = new Date(item[keyCol]);
              if (Array.isArray(value)) {
                let index = value?.findIndex(
                  (val: { date: Date }) =>
                    val.date.valueOf() ===
                    selectedDate.setHours(0, 0, 0, 0).valueOf()
                );
                if (index !== -1) {
                  return true;
                }
              }
              return false;
            });
            await this.setState({
              result: resultDateContain,
            });
          }
          break;

        case "not":
          if (typeof value === "string") {
            let resultNotContain = items.filter((item) => {
              let string =
                typeof item[keyCol] === "string"
                  ? item[keyCol]
                  : item[keyCol].toString();
              if (string.indexOf(value) === -1) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultNotContain,
            });
          }
          if (Array.isArray(value)) {
            let resultDateNotWithIn = items.filter((item) => {
              let selectedDate = new Date(item[keyCol]);
              if (
                (value &&
                  Array.isArray(value) &&
                  selectedDate.valueOf() < value[0].date.valueOf()) ||
                (value &&
                  Array.isArray(value) &&
                  selectedDate.valueOf() >
                    value[value.length - 1].date
                      .setHours(23, 59, 59, 0)
                      .valueOf())
              ) {
                return true;
              }
              return false;
            });
            await this.setState({
              result: resultDateNotWithIn,
            });
          }
          break;

        case "boolean":
          let resultBoolean = items.filter((item) => {
            if (item[keyCol] === value) {
              return true;
            }
            return false;
          });
          await this.setState({
            result: resultBoolean,
          });
          break;

        default:
          break;
      }
    }
  };

  render() {
    let { targetColumn } = this.props;
    // error when switch calendar and submit button
    const nameAttibute = "data-rc-id";
    let dataWrapper = {
      [nameAttibute]: `filter.frm.${this.props.rcName}`,
    };

    return (
      <PanelContentWrapper>
        <PanelWrapper theme={this.props.darkMode} {...dataWrapper}>
          {targetColumn &&
            targetColumn.data === "number" &&
            this.onRenderCheckBox("number")}
          {targetColumn &&
            targetColumn.data === "string" &&
            this.onRenderCheckBox("string")}
          {targetColumn &&
            targetColumn.data === "boolean" &&
            this.onRenderCheckBox("boolean")}
          {targetColumn &&
            targetColumn.data === "date" &&
            this.onRenderCheckBox("date")}
          <div className="btn-panel-group">
            <Button
              type="Primary"
              text="Apply"
              disabled={
                (typeof this.state.value === "string" &&
                  this.state.value !== "" &&
                  this.state.value.trim() !== "") ||
                (!["object", "string"].includes(typeof this.state.value) &&
                  this.state.value) ||
                typeof this.state.type === "boolean" ||
                (Array.isArray(this.state.value) &&
                  this.state.value.length > 0) ||
                (typeof this.state.value === "object" && this.state.value)
                  ? false
                  : true
              }
              onClick={
                this.state.type && this.state.value !== undefined
                  ? this.onApplyFilter
                  : undefined
              }
              darkMode={this.props.darkMode}
              rcName="dl.apply"
            />
            {targetColumn && targetColumn.data !== "boolean" && (
              <Button
                text="Clear all"
                onClick={this.onClearFilter}
                darkMode={this.props.darkMode}
                rcName="dl.clear"
                disabled={
                  this.state.operator || this.state.value ? false : true
                }
              />
            )}
          </div>
        </PanelWrapper>
      </PanelContentWrapper>
    );
  }
}

export default Breadcrumd;
