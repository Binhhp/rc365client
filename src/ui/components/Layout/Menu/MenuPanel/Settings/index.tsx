import * as React from "react";
import { ISettingProps } from "./SettingModel";
import { SettingsWrapper } from "./SettingStyle";
import Toggle from "aod-dependencies/Toggle/CustomToggle";
import { AnyRecord } from "dns";

export default class Settings extends React.Component<
  ISettingProps,
  AnyRecord
> {
  OnHandleChangeToggle = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    this.props.OnHandleChangeTheme &&
      this.props.OnHandleChangeTheme(checked || false);
  };

  render() {
    return (
      <SettingsWrapper className="SettingsWrapper" theme={this.props.theme}>
        <Toggle
          rcName="set.theme"
          label="Dark mode"
          darkMode={`${this.props.theme}`}
          checked={this.props.theme === "dark" ? true : false}
          onChange={this.OnHandleChangeToggle}
        />
      </SettingsWrapper>
    );
  }
}
