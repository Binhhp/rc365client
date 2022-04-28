import * as React from "react";
import { TextField } from "./TextField";
import {
  TextFieldWrapper,
  ICustomTextFieldProps,
} from "./CustomTextFieldStyle";

class CustomTextField extends React.Component<ICustomTextFieldProps> {
  render() {
    let borderColor = this.props.darkMode === "dark" ? "#ffffff" : "#a6a6a6";
    if (this.props.errorMessage) {
      borderColor = this.props.darkMode === "dark" ? "#F1707B" : "#A80000";
    }
    return (
      <TextFieldWrapper
        className="TextFieldWrapper-comp"
        theme={{
          darkMode: this.props.darkMode,
          errorMessage: this.props.errorMessage,
        }}
      >
        <TextField
          {...this.props}
          styles={{
            field: {
              border: `1px solid ${borderColor}`,
              borderRadius: 0,
              backgroundColor:
                this.props.darkMode === "dark" ? "#333333" : "#ffffff",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#323130",
              height: this.props.multiline ? "auto" : "32px",
            },
            fieldGroup: {
              border: "none",
              borderRadius: 0,
            },
            errorMessage: {
              color: this.props.darkMode === "dark" ? "#F1707B" : "#A80000",
              paddingTop: 0,
            },
            suffix: {
              borderLeft: "none !important",
              border: `1px solid ${borderColor}`,
              background:
                this.props.darkMode === "dark" ? "#333333" : "#f3f2f1",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#CCCCCC",
              maxWidth: 150,
              width: "fit-content",
              padding: "0 5px",
            },
            ...this.props.styles,
          }}
        />
      </TextFieldWrapper>
    );
  }
}

export default CustomTextField;
