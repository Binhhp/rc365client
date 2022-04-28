import * as React from "react";
import {
  ICustomMaskedTextFieldProps,
  MaskedTextFieldWrapper,
} from "./CustomMaskedTextFieldStyle";
import { Customizer } from "../../@uifabric/utilities";
import { darkTheme, lightTheme } from "../../@uifabric/DefaultTheme";
import { MaskedTextField } from "..";

class CustomMaskedTextField extends React.Component<ICustomMaskedTextFieldProps> {
  render() {
    const currentTheme =
      this.props.darkMode === "dark" ? darkTheme : lightTheme;
    let borderColor = this.props.darkMode === "dark" ? "#ffffff" : "#a6a6a6";
    if (this.props.errorMessage) {
      borderColor = this.props.darkMode === "dark" ? "#F1707B" : "#A80000";
    }
    return (
      <MaskedTextFieldWrapper
        className="MaskedTextFieldWrapper"
        theme={{
          darkMode: this.props.darkMode,
          errorMessage: this.props.errorMessage,
        }}
      >
        <Customizer {...currentTheme}>
          <MaskedTextField
            {...this.props}
            styles={{
              fieldGroup: {
                borderColor: borderColor,
                borderRadius: 0,
                selectors: {
                  ":hover": {
                    borderColor: borderColor,
                  },
                },
              },
              ...this.props.styles,
            }}
          />
        </Customizer>
      </MaskedTextFieldWrapper>
    );
  }
}

export default CustomMaskedTextField;
