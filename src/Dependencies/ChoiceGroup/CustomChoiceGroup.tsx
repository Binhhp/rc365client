import * as React from "react";
import { ChoiceGroup } from "./ChoiceGroup";
import {
  ChoiceGroupWrapper,
  ICustomChoiceGroupProps,
} from "./CustomChoiceGroupStyle";

class CustomChoiceGroup extends React.Component<ICustomChoiceGroupProps> {
  render() {
    return (
      <ChoiceGroupWrapper theme={this.props.darkMode}>
        <ChoiceGroup
          {...this.props}
          styles={{
            label: {
              color: this.props.darkMode === "dark" ? "#ffffff" : "#323130",
            },
          }}
        />
      </ChoiceGroupWrapper>
    );
  }
}

export default CustomChoiceGroup;
