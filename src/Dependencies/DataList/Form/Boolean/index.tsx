import * as React from "react";
import { IBooleanFormProps, IBooleanFormStates } from "./BooleanFormModels";
import { BooleanFormWrapper } from "./BooleanFormStyle";
import Button from "../../../Button";
import { OperatorFilterNumberEnums } from "../../Interface/Common";
import { IChoiceGroupOption } from "../../../ChoiceGroup/ChoiceGroup.types";
import ChoiceGroup from "../../../ChoiceGroup/CustomChoiceGroup";

const defaultOpts: IChoiceGroupOption[] = [
  { key: "true", text: "True" },
  { key: "false", text: "False" },
];

export default class BooleanForm extends React.Component<
  IBooleanFormProps,
  IBooleanFormStates
> {
  constructor(props: IBooleanFormProps) {
    super(props);
    this.state = {
      operator: this._onHandleValueDefault(),
      options: [],
    };
  }

  UNSAFE_componentWillMount() {
    // case boolean
    if (
      this.props.column &&
      this.props.column.data === "boolean" &&
      this.props.column.booleanFormOpts &&
      this.props.column.booleanFormOpts.length > 0
    ) {
      let crtArr = [...this.props.column.booleanFormOpts];
      let indexTrueText = crtArr.findIndex(
        (o) => typeof o.key === "boolean" && o.key === true
      );
      let indexFalseText = crtArr.findIndex(
        (o) => typeof o.key === "boolean" && o.key === false
      );
      if (indexTrueText !== -1) {
        defaultOpts[0].text = crtArr[indexTrueText].text;
      }
      if (indexFalseText !== -1) {
        defaultOpts[1].text = crtArr[indexFalseText].text;
      }
      this.setState({ options: defaultOpts });
    }

    // case boolean|string
    if (
      this.props.column &&
      this.props.column.data === "boolean|string" &&
      this.props.column.booleanFormOpts &&
      this.props.column.booleanFormOpts.length > 0
    ) {
      let crtArr = [
        ...this.props.column.booleanFormOpts,
      ] as IChoiceGroupOption[];
      this.setState({ options: crtArr });
    }
  }

  private _onHandleValueDefault = (): string => {
    if (
      this.props.workingColumn &&
      this.props.filterQuery &&
      this.props.filterQuery.length > 0
    ) {
      let idx = this.props.filterQuery.findIndex(
        (q) => q.key === this.props.workingColumn?.key
      );
      if (idx !== -1) {
        return this.props.filterQuery[idx].value;
      }
    }
    return "";
  };

  private _onHandleSentFilterValue = () => {
    if (this.props.OnGetFilterValue) {
      if (this.props.column?.data === "boolean|string") {
        this.props.OnGetFilterValue("eq", this.state.operator);
      } else {
        this.props.OnGetFilterValue(
          "eq",
          this.state.operator === "true" ? true : false
        );
      }
    }
  };

  onHandleApplyFilter = () => {
    if (this.state.operator !== OperatorFilterNumberEnums.Null) {
      this._onHandleSentFilterValue();
    }
  };

  onGetChoiceGroup = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ): void => {
    if (option) {
      this.setState({
        operator: option.key,
      });
    }
  };

  render() {
    return (
      <BooleanFormWrapper className="BooleanFormWrapper">
        <ChoiceGroup
          options={this.state.options}
          darkMode={this.props.darkMode}
          onChange={this.onGetChoiceGroup}
          rcName="frm.filter"
          defaultSelectedKey={this.state.operator}
        />
        <div className="action__wrapper">
          <Button
            type="Primary"
            text="Apply"
            disabled={this.state.operator === ""}
            onClick={
              this.state.operator !== "" ? this.onHandleApplyFilter : undefined
            }
            darkMode={this.props.darkMode}
            rcName="frm.filter.apply"
          />
        </div>
      </BooleanFormWrapper>
    );
  }
}
