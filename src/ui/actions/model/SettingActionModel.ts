import { ThemeEnums, TypeView } from "src/entity/enums";
import { ActionSettingTypeKeys } from "../enums";
import { IDropdownOption } from "aod-dependencies/Dropdown";

export interface SettingsStore {
  theme: ThemeEnums;
  gridView: TypeView | null;
}

export interface SetThemeAct {
  type: typeof ActionSettingTypeKeys.SET_THEME;
  payload: ThemeEnums;
}

export interface UpdateTimeZoneAct {
  type: typeof ActionSettingTypeKeys.UPDATE_TIME_ZONES;
  payload: IDropdownOption[];
}

export interface SetGridViewAct {
  type: typeof ActionSettingTypeKeys.SET_TYPE_GRID_VIEW;
  payload: TypeView | null;
}

export type GetSettingTypes = SetThemeAct | SetGridViewAct | UpdateTimeZoneAct;
