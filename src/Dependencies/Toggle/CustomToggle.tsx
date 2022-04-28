import * as React from "react";
import { Toggle } from "./Toggle";
import { ToggleWrapper, ICustomToggleProps } from "./CustomToggleStyle";
import { Customizer } from "../@uifabric/utilities";
import { darkTheme, lightTheme } from "../@uifabric/DefaultTheme";

class CustomToggle extends React.Component<ICustomToggleProps> {
  render() {
    const currentTheme =
      this.props.darkMode === "dark" ? darkTheme : lightTheme;
    return (
      <ToggleWrapper className="ToggleWrapper" theme={this.props.darkMode}>
        <Customizer {...currentTheme}>
          <Toggle {...this.props} />
        </Customizer>
      </ToggleWrapper>
    );
  }
}

export default CustomToggle;
