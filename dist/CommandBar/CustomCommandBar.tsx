import * as React from "react";
import { CommandBar } from "./CommandBar";
import {
  CommandBarWrapper,
  ICustomCommandBarProps,
} from "./CustomCommandBarStyle";
import { Customizer } from "../@uifabric/utilities";
import { darkTheme, lightTheme } from "../@uifabric/DefaultTheme";

class CustomCommandBar extends React.Component<ICustomCommandBarProps> {
  render() {
    const currentTheme =
      this.props.darkMode === "dark" ? darkTheme : lightTheme;
    return (
      <CommandBarWrapper theme={this.props.darkMode}>
        <Customizer {...currentTheme}>
          <CommandBar {...this.props} />
        </Customizer>
      </CommandBarWrapper>
    );
  }
}

export default CustomCommandBar;
