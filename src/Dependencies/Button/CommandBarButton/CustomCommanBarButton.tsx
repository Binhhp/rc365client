import * as React from "react";
import { CommandBarButton } from "./CommandBarButton";
import {
  CommandBarButtonWrapper,
  ICustomCommandBarButtonProps,
} from "./CustomCommandBarButtonStyle";
import { Customizer } from "../../@uifabric/utilities";
import { darkTheme, lightTheme } from "../../@uifabric/DefaultTheme";

class CustomCommandBarButton extends React.Component<ICustomCommandBarButtonProps> {
  render() {
    const currentTheme =
      this.props.darkMode === "dark" ? { ...darkTheme } : { ...lightTheme };

    return (
      <CommandBarButtonWrapper
        className="CommandBarButtonWrapper"
        theme={this.props.darkMode}
      >
        <Customizer {...currentTheme}>
          <CommandBarButton {...this.props} />
        </Customizer>
      </CommandBarButtonWrapper>
    );
  }
}

export default CustomCommandBarButton;
