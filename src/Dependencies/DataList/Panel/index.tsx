import * as React from "react";
import { IPanelProps, IPanelStates } from "./PanelModels";
import { PanelWrapper } from "./PanelStyle";
import StringForm from "../Form/String";
import NumberForm from "../Form/Number";
import DateForm from "../Form/Date";
import BooleanForm from "../Form/Boolean";
import {
  OperatorFilterNumberEnums,
  OperatorFilterStringEnums,
} from "../Interface/Common";

export default class PanelContent extends React.Component<
  IPanelProps,
  IPanelStates
> {
  private _onHandleSendFilterObj = (operator: string, value?: any) => {
    if (this.props.onGetFilterObj && this.props.targetColumn) {
      this.props.onGetFilterObj(
        operator,
        this.props.targetColumn.fieldName,
        value
      );
    }
  };

  private onConvertBetweenDateAndTicks = (
    data: Date | number,
    isOnlyDate?: boolean
  ): string | number => {
    const epochTicks = 621355968000000000;
    const ticksPerMillisecond = 10000;
    const maxDateMilliseconds = 8640000000000000;
    let dateWithTime: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    let onlyDate: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    // ticks to date
    if (typeof data === "number") {
      if (isNaN(data)) {
        return "";
      }
      const ticksSinceEpoch = data - epochTicks;
      const millisecondsSinceEpoch = ticksSinceEpoch / ticksPerMillisecond;
      if (millisecondsSinceEpoch > maxDateMilliseconds) {
        return "+WHOAWH-OA-ISTOO:FA:RA.WAYZ";
      }
      const date = new Date(millisecondsSinceEpoch);
      return date.toLocaleDateString(
        "en-US",
        isOnlyDate ? onlyDate : dateWithTime
      );
    }

    // date to ticks
    if (
      Object.prototype.toString.call(data) === "[object Date]" &&
      typeof data !== "string"
    ) {
      let ticks = data.getTime() * ticksPerMillisecond + epochTicks;
      return ticks;
    }
    return "";
  };

  OnGetFilterValueNumber = (
    operator: OperatorFilterNumberEnums,
    value: number
  ) => {
    this._onHandleSendFilterObj(operator, value);
  };

  OnGetFilterValueString = (
    operator: OperatorFilterStringEnums,
    value: string
  ) => {
    this._onHandleSendFilterObj(operator, value);
  };

  OnGetFilterValueBoolean = (operator: string, value: boolean | string) => {
    this._onHandleSendFilterObj(operator, value);
  };

  OnGetFilterValueDate = (operator: string, value: Date | { date: Date }[]) => {
    if (this.props.filterWithTicks) {
      if (Array.isArray(value)) {
        let result = value.map((val) => {
          let ticks = this.onConvertBetweenDateAndTicks(val.date);
          let item = {
            date: ticks,
          };
          return item;
        });
        return this._onHandleSendFilterObj(operator, result);
      }
      if (!Array.isArray(value)) {
        let ticks = this.onConvertBetweenDateAndTicks(value);
        return this._onHandleSendFilterObj(operator, ticks);
      }
    }
    return this._onHandleSendFilterObj(operator, value);
  };

  RenderFormByType = () => {
    if (this.props.targetColumn && this.props.targetColumn.data) {
      switch (this.props.targetColumn.data) {
        case "number":
          return (
            <NumberForm
              rcName={this.props.rcName}
              darkMode={this.props.darkMode}
              OnGetFilterValue={this.OnGetFilterValueNumber}
              filterQuery={this.props.filterQuery}
              workingColumn={this.props.workingColumn}
            />
          );
        case "string":
          return (
            <StringForm
              rcName={this.props.rcName}
              darkMode={this.props.darkMode}
              OnGetFilterValue={this.OnGetFilterValueString}
              filterQuery={this.props.filterQuery}
              workingColumn={this.props.workingColumn}
            />
          );
        case "date":
          return (
            <DateForm
              rcName={this.props.rcName}
              darkMode={this.props.darkMode}
              OnGetFilterValue={this.OnGetFilterValueDate}
            />
          );
        case "boolean":
          return (
            <BooleanForm
              rcName={this.props.rcName}
              darkMode={this.props.darkMode}
              OnGetFilterValue={this.OnGetFilterValueBoolean}
              column={this.props.targetColumn}
              filterQuery={this.props.filterQuery}
              workingColumn={this.props.workingColumn}
            />
          );
        case "boolean|string":
          return (
            <BooleanForm
              rcName={this.props.rcName}
              darkMode={this.props.darkMode}
              OnGetFilterValue={this.OnGetFilterValueBoolean}
              column={this.props.targetColumn}
              filterQuery={this.props.filterQuery}
              workingColumn={this.props.workingColumn}
            />
          );
        default:
          return;
      }
    }
  };

  render() {
    const nameAttibute = "data-rc-id";
    let dataWrapper = {
      [nameAttibute]: `frm.filter.panel.${this.props.rcName}`,
    };
    return (
      <PanelWrapper className="PanelWrapper" {...dataWrapper}>
        {this.RenderFormByType()}
      </PanelWrapper>
    );
  }
}
