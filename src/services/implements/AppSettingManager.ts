import { ThemeEnums, TypeView } from "src/entity/enums";
import { IAppSettingManager } from "../interface";

export class AppSettingManager implements IAppSettingManager {
  private _theme: ThemeEnums;
  private _gridView: TypeView | null;

  constructor() {
    this._gridView = null;
    this._theme = ThemeEnums.Light;
  }

  public get Theme(): ThemeEnums {
    return this._theme;
  }

  public set Theme(v: ThemeEnums) {
    this._theme = v;
  }
  public get GridView(): TypeView | null {
    return this._gridView;
  }

  public set GridView(v: TypeView | null) {
    this._gridView = v;
  }

  UpdateApplicationTheme = async (theme: ThemeEnums): Promise<ThemeEnums> => {
    let userInfo = { darkMode: theme };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    this._theme = theme;
    return theme;
  };
}
