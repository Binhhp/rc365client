import { ThemeEnums } from "src/entity/enums/TypeEnums";

export interface ISettingProps {
  theme?: ThemeEnums;
  OnHandleChangeTheme?: (checked: boolean) => void;
}
