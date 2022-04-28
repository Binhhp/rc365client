import { GetSettingTypes } from "../model/SettingActionModel";
import { ActionSettingTypeKeys } from "../enums";
import { ThemeEnums, TypeView } from "src/entity/enums";
import { IDropdownOption } from "aod-dependencies/Dropdown";
//  TS : to store
// FS: from server

export class SettingReduxActionTS {
  public static onSetThemeTS = (theme: ThemeEnums): GetSettingTypes => {
    return {
      type: ActionSettingTypeKeys.SET_THEME,
      payload: theme,
    };
  };

  public static onUpdateTimeZoneTS = (
    timezones: IDropdownOption[]
  ): GetSettingTypes => {
    return {
      type: ActionSettingTypeKeys.UPDATE_TIME_ZONES,
      payload: timezones,
    };
  };

  public static onSetGridViewTS = (type?: TypeView): GetSettingTypes => {
    return {
      type: ActionSettingTypeKeys.SET_TYPE_GRID_VIEW,
      payload: type || null,
    };
  };
}
