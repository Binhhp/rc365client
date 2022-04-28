import * as React from "react";
import { Checkbox } from "./Checkbox";
import { CheckBoxWrapper, ICustomCheckBoxProps } from "./CustomCheckBoxStyle";

class CustomCheckBox extends React.Component<ICustomCheckBoxProps> {
  render() {
    return (
      <CheckBoxWrapper theme={this.props.darkMode}>
        <Checkbox
          {...this.props}
          styles={{
            checkbox: {
              borderRadius: 0,
              borderColor:
                this.props.darkMode === "dark" ? "#ffffff" : "#333333",
            },
            checkmark: {
              color: this.props.darkMode === "dark" ? "#333333" : "#ffffff",
            },
            text: {
              color: this.props.darkMode === "dark" ? "#ffffff" : "#333333",
            },
            label: {
              fontWeight: "normal",
              padding: "0 5px",
              color: this.props.darkMode === "dark" ? "#69afe5" : "#1196D1",
            },
          }}
        />
      </CheckBoxWrapper>
    );
  }
}

export default CustomCheckBox;
