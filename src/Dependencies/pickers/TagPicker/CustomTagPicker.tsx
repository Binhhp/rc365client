import * as React from "react";
import { TagPicker } from "./TagPicker";
import { Customizer } from "../../@uifabric/utilities";
import { darkTheme, lightTheme } from "../../@uifabric/DefaultTheme";
import { ICustomTagPickerProps } from "./CustomTagPickerStyle";

class CustomTagPicker extends React.Component<ICustomTagPickerProps, any> {
  render() {
    const currentTheme =
      this.props.darkMode === "dark" ? darkTheme : lightTheme;
    return (
      <Customizer {...currentTheme}>
        <TagPicker
          {...this.props}
          styles={{
            text: {
              borderRadius: 0,
              border: "none",
              selectors: {
                ":after": {
                  border: "none",
                },
              },
            },
            input: {
              borderRadius: 0,
              height: 32,
              border:
                this.props.darkMode === "dark"
                  ? "1px solid #ffffff !important"
                  : "1px solid #a6a6a6 !important",
            },
          }}
        />
      </Customizer>
    );
  }
}

export default CustomTagPicker;
