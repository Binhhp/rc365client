import {
  GetSettingTypes,
  // RemoveNotificationItemAct,
} from "../actions/model/SettingActionModel";
import { ActionSettingTypeKeys } from "../actions/enums";
import { SettingStoreModel } from "src/entity/model/SettingStoreModel";
import { ThemeEnums, TypeView } from "src/entity/enums";
import { IDropdownOption } from "aod-dependencies/Dropdown";

const onHandleUpdateTheme = (
  state: SettingStoreModel,
  newTheme: ThemeEnums
) => {
  let copyState = { ...state } as SettingStoreModel;
  copyState.theme = newTheme;
  return copyState;
};
const onHandleUpdateTimeZone = (
  state: SettingStoreModel,
  timeZones: IDropdownOption[]
) => {
  let copyState = { ...state } as SettingStoreModel;
  copyState.timeZones = timeZones;
  return copyState;
};
const onHandleUpdateGrid = (
  state: SettingStoreModel,
  type: TypeView | null
) => {
  let copyState = { ...state } as SettingStoreModel;
  copyState.gridView = type;
  return copyState;
};
const AppSettings = (
  state: SettingStoreModel = new SettingStoreModel(),
  action: GetSettingTypes
): SettingStoreModel => {
  switch (action.type) {
    case ActionSettingTypeKeys.SET_THEME:
      return onHandleUpdateTheme(state, action.payload);
    case ActionSettingTypeKeys.UPDATE_TIME_ZONES:
      return onHandleUpdateTimeZone(state, action.payload);
    case ActionSettingTypeKeys.SET_TYPE_GRID_VIEW:
      return onHandleUpdateGrid(state, action.payload);
    default:
      return state;
  }
};

export default AppSettings;
