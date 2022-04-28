import * as React from "react";
import { INumberFormProps, INumberFormStates } from "./NumberFormModels";
import { NumberFormWrapper } from "./NumberFormStyle";
import Dropdown from "../../../Dropdown/CustomDropdown";
import TextField from "../../../TextField/CustomTextField";
import { IDropdownOption } from "../../../Dropdown";
import Button from "../../../Button";
import { OperatorFilterNumberEnums } from "../../Interface/Common";

const options: { key: string; text: string }[] = [
  { key: OperatorFilterNumberEnums.Equal, text: "Equal" },
  { key: OperatorFilterNumberEnums.Less, text: "Less than" },
  { key: OperatorFilterNumberEnums.Greater, text: "Greater than" },
  { key: OperatorFilterNumberEnums.LessOrEqual, text: "Less than or equal to" },
  {
    key: OperatorFilterNumberEnums.GreaterOrEqual,
    text: "Greater than or equal to",
  },
];

export default class StringForm extends React.Component<
  INumberFormProps,
  INumberFormStates
> {
  constructor(props: INumberFormProps) {
    super(props);
    this.state = {
      operator: OperatorFilterNumberEnums.Null,
      value: 0,
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
        let operator = this._mapToOperatorFilterNumberEnums(
          this.props.filterQuery[idx].operator
        );
        this.setState({ value: this.props.filterQuery[idx].value, operator });
      }
    }
  }

  private _mapToOperatorFilterNumberEnums = (
    str: string
  ): OperatorFilterNumberEnums => {
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
      default:
        return OperatorFilterNumberEnums.Null;
    }
  };

  private _onHandleSentFilterValue = () => {
    console.log("sent");
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
      let newOperator = this._mapToOperatorFilterNumberEnums(
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
      this.state.operator !== OperatorFilterNumberEnums.Null
    ) {
      this.onHandleApplyFilter();
    }
  };

  onHandleCheckValue = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    val?: string
  ) => {
    if (val && val.trim() !== "") {
      let num = Number(val) ? Number(val) : 0;
      this.setState({ value: num });
    }
    if (!val || val.trim() === "") {
      this.setState({ value: 0 });
    }
  };

  onClearFilter = () => {
    this.setState({
      operator: OperatorFilterNumberEnums.Null,
      value: 0,
    });
  };

  onHandleApplyFilter = () => {
    if (this.state.operator !== OperatorFilterNumberEnums.Null) {
      this._onHandleSentFilterValue();
    }
  };

  render() {
    return (
      <NumberFormWrapper className="NumberFormWrapper">
        <Dropdown
          autoFocus={true}
          label="Filter Condition"
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
          onKeyDown={this.onSubmitText}
          onChange={this.onHandleCheckValue}
          darkMode={this.props.darkMode}
          type="number"
          value={String(this.state.value)}
          min={this.props.min}
          rcName={`frm.filter.${this.props.rcName}`}
          disabled={this.state.operator === OperatorFilterNumberEnums.Null}
        />
        <div className="action__wrapper">
          <Button
            type="Primary"
            text="Apply"
            disabled={this.state.operator === OperatorFilterNumberEnums.Null}
            onClick={
              this.state.operator !== OperatorFilterNumberEnums.Null
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
              this.state.operator === OperatorFilterNumberEnums.Null &&
              this.state.value < 1
            }
          />
        </div>
      </NumberFormWrapper>
    );
  }
}
