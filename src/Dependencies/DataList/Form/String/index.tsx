import * as React from "react";
import { IStringFormProps, IStringFormStates } from "./StringFormModels";
import { StringFormWrapper } from "./StringFormStyle";
import Dropdown from "../../../Dropdown/CustomDropdown";
import TextField from "../../../TextField/CustomTextField";
import { IDropdownOption } from "../../../Dropdown";
import Button from "../../../Button";
import { OperatorFilterStringEnums } from "../../Interface/Common";

const options: { key: string; text: string }[] = [
  { key: OperatorFilterStringEnums.Equal, text: "Equal" },
  { key: OperatorFilterStringEnums.NotEqual, text: "Does not equal" },
  { key: OperatorFilterStringEnums.Contain, text: "Contains" },
  { key: OperatorFilterStringEnums.NotContain, text: "Does not contain" },
];

export default class StringForm extends React.Component<
  IStringFormProps,
  IStringFormStates
> {
  constructor(props: IStringFormProps) {
    super(props);
    this.state = {
      value: "",
      operator: OperatorFilterStringEnums.Null,
    };
  }

  componentDidMount() {
    if (
      this.props.workingColumn &&
      this.props.filterQuery &&
      this.props.filterQuery.length > 0
    ) {
      let idx = this.props.filterQuery.findIndex(
        (q) => q.key === this.props.workingColumn?.key
      );
      if (idx !== -1) {
        let operator = this._mapToOperatorFilterStringEnums(
          this.props.filterQuery[idx].operator
        );
        this.setState({ value: this.props.filterQuery[idx].value, operator });
      }
    }
  }

  private _mapToOperatorFilterStringEnums = (
    str: string
  ): OperatorFilterStringEnums => {
    switch (str) {
      case "eq":
        return OperatorFilterStringEnums.Equal;
      case "ne":
        return OperatorFilterStringEnums.NotEqual;
      case "not":
        return OperatorFilterStringEnums.NotContain;
      case "contains":
        return OperatorFilterStringEnums.Contain;
      default:
        return OperatorFilterStringEnums.Null;
    }
  };

  private _onHandleSentFilterValue = () => {
    if (this.props.OnGetFilterValue) {
      this.props.OnGetFilterValue(this.state.operator, this.state.value);
    }
  };

  private _FocusInFieldValue = () => {
    let txt = document.getElementById("dl.filter.value") as HTMLInputElement;
    if (txt) {
      return txt.focus();
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
      this.setState(
        {
          operator: newOperator,
        },
        () => this._FocusInFieldValue()
      );
    }
  };

  onSubmitText = (e: React.KeyboardEvent) => {
    let { keyCode } = e;
    if (
      keyCode === 13 &&
      this.state.operator !== OperatorFilterStringEnums.Null
    ) {
      this.onHandleApplyFilter();
    }
  };

  onHandleCheckValue = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    val?: string
  ) => {
    this.setState({ value: val ? val : "" });
  };

  onClearFilter = () => {
    this.setState({
      operator: OperatorFilterStringEnums.Null,
      value: "",
    });
  };

  onHandleApplyFilter = () => {
    if (this.state.operator !== OperatorFilterStringEnums.Null) {
      this._onHandleSentFilterValue();
    }
  };

  onHandleTrim = () => {
    if (this.state.value.trim() !== "") {
      this.setState({ value: this.state.value.trim() });
    }
  };

  render() {
    return (
      <StringFormWrapper className="StringFormWrapper">
        <Dropdown
          defaultValue={this.state.operator}
          autoFocus={true}
          label="Filter Options"
          placeholder="Select filter"
          options={options}
          onChange={this.onSelectDrop}
          darkMode={this.props.darkMode}
          selectedKey={this.state.operator}
          rcName={`frm.filter.${this.props.rcName}`}
        />
        <TextField
          label="Value"
          id="dl.filter.value"
          value={this.state.value}
          onKeyDown={this.onSubmitText}
          onChange={this.onHandleCheckValue}
          darkMode={this.props.darkMode}
          rcName={`frm.filter.${this.props.rcName}`}
          disabled={this.state.operator === OperatorFilterStringEnums.Null}
          onBlur={this.onHandleTrim}
        />
        <div className="action__wrapper">
          <Button
            type="Primary"
            text="Apply"
            disabled={this.state.operator === OperatorFilterStringEnums.Null}
            onClick={
              this.state.operator !== OperatorFilterStringEnums.Null
                ? this.onHandleApplyFilter
                : undefined
            }
            darkMode={this.props.darkMode}
            rcName="frm.filter.apply"
          />
          <Button
            text="Clear all"
            onClick={this.onClearFilter}
            darkMode={this.props.darkMode}
            rcName="frm.filter.clear"
            disabled={
              this.state.operator === OperatorFilterStringEnums.Null &&
              this.state.value.trim() === ""
            }
          />
        </div>
      </StringFormWrapper>
    );
  }
}
