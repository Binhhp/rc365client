import * as React from "react";
import { IDateFormProps, IDateFormStates } from "./DateFormModels";
import { DateFormWrapper } from "./DateFormStyle";
import Dropdown from "../../../Dropdown/CustomDropdown";
import { IDropdownOption } from "../../../Dropdown";
import Button from "../../../Button";
import {
  OperatorFilterNumberEnums,
  OperatorFilterStringEnums,
} from "../../Interface/Common";
import CalenderInline from "../../../calendar-custom/CalenderInline";

const optionsCalendarSingle: { key: string; text: string }[] = [
  { key: OperatorFilterNumberEnums.Equal, text: "Equal" },
  { key: OperatorFilterNumberEnums.Less, text: "Less than" },
  { key: OperatorFilterNumberEnums.Greater, text: "Greater than" },
  { key: OperatorFilterNumberEnums.LessOrEqual, text: "Less than or equal to" },
  {
    key: OperatorFilterNumberEnums.GreaterOrEqual,
    text: "Greater than or equal to",
  },
];
const optionsCalendarMultiple: { key: string; text: string }[] = [
  { key: OperatorFilterStringEnums.Contain, text: "Within" },
  { key: OperatorFilterStringEnums.NotContain, text: "Not within" },
];

export default class DateForm extends React.Component<
  IDateFormProps,
  IDateFormStates
> {
  constructor(props: IDateFormProps) {
    super(props);
    this.state = {
      operator: OperatorFilterStringEnums.Null,
      selectMode: "single",
      value: null,
    };
  }

  private _mapToOperatorFilterStringEnums = (
    str: string
  ): OperatorFilterStringEnums | OperatorFilterNumberEnums => {
    switch (str) {
      case "eq":
        return OperatorFilterNumberEnums.Equal;
      case "lt":
        return OperatorFilterNumberEnums.Less;
      case "gt":
        return OperatorFilterNumberEnums.Greater;
      case "le":
        return OperatorFilterNumberEnums.LessOrEqual;
      case "ge":
        return OperatorFilterNumberEnums.GreaterOrEqual;
      case "not":
        return OperatorFilterStringEnums.NotContain;
      case "contains":
        return OperatorFilterStringEnums.Contain;
      default:
        return OperatorFilterStringEnums.Null;
    }
  };

  private _onHandleSentFilterValue = () => {
    if (this.props.OnGetFilterValue && this.state.value) {
      this.props.OnGetFilterValue(this.state.operator, this.state.value);
    }
  };

  onSelectDrop = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      let newOperator = this._mapToOperatorFilterStringEnums(
        String(option.key)
      );
      this.setState({ operator: newOperator });
    }
  };

  onClearFilter = () => {
    this.setState({
      operator: OperatorFilterStringEnums.Null,
      value: null,
    });
  };

  onHandleApplyFilter = () => {
    if (
      this.state.operator !== OperatorFilterStringEnums.Null &&
      this.state.value !== null
    ) {
      this._onHandleSentFilterValue();
    }
  };

  onGetDataCalendar = (val: Date | { date: Date }[]): void => {
    this.setState({
      value: val,
    });
  };

  render() {
    return (
      <DateFormWrapper className="DateFormWrapper">
        <Dropdown
          autoFocus={true}
          label="Filter Condition"
          placeholder="Select filter"
          options={
            this.state.selectMode && this.state.selectMode === "multiple"
              ? optionsCalendarMultiple
              : optionsCalendarSingle
          }
          onChange={this.onSelectDrop}
          darkMode={this.props.darkMode}
          selectedKey={this.state.operator}
          rcName="frm.filter"
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
            this.setState({
              selectMode: pickType,
              operator: OperatorFilterStringEnums.Null,
            })
          }
          rcName="frm.filter"
        />
        <div className="action__wrapper">
          <Button
            type="Primary"
            text="Apply"
            onClick={
              this.state.operator !== OperatorFilterStringEnums.Null &&
              this.state.value !== null
                ? this.onHandleApplyFilter
                : undefined
            }
            darkMode={this.props.darkMode}
            rcName="frm.filter.apply"
            disabled={
              !this.state.value ||
              this.state.operator === OperatorFilterStringEnums.Null
            }
          />
          <Button
            text="Clear all"
            onClick={this.onClearFilter}
            darkMode={this.props.darkMode}
            rcName="frm.filter.clear"
            disabled={
              this.state.operator === OperatorFilterStringEnums.Null &&
              !this.state.value
            }
          />
        </div>
      </DateFormWrapper>
    );
  }
}
