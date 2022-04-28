import { ThemeEnums, TypeView } from "src/entity/enums";

export interface IAppSettingManager {
  UpdateApplicationTheme: (theme: ThemeEnums) => Promise<ThemeEnums>;
  readonly Theme: ThemeEnums;
  readonly GridView: TypeView | null;
}
