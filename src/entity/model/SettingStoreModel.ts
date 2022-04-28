import { SettingsStore } from "../../ui/actions/model/SettingActionModel";
import { ThemeEnums, TypeView } from "../enums";
import { IDropdownOption } from "aod-dependencies/Dropdown";

export class SettingStoreModelDto {
  theme: ThemeEnums;
  gridView: TypeView | null;
  timeZones: IDropdownOption[];
}

export class SettingStoreModel implements SettingsStore {
  protected _theme: ThemeEnums;
  protected _gridView: TypeView | null;
  protected _timeZones: IDropdownOption[];

  constructor(dto?: SettingStoreModelDto) {
    this._gridView = null;
    this._timeZones = [];
    if (dto) {
      this._gridView = dto.gridView || null;
      this._theme = dto.theme || ThemeEnums.Light;
      this._timeZones = dto.timeZones || [];
    } else {
      this._gridView = null;
      this._theme = ThemeEnums.Light;
      this._timeZones = [];
    }
  }

  public get timeZones(): IDropdownOption[] {
    return this._timeZones;
  }

  public set timeZones(timeZone: IDropdownOption[]) {
    this._timeZones = timeZone;
  }

  public get theme(): ThemeEnums {
    return this._theme;
  }

  public set theme(theme: ThemeEnums) {
    this._theme = theme;
  }

  public get gridView(): TypeView | null {
    return this._gridView;
  }

  public set gridView(type: TypeView | null) {
    this._gridView = type;
  }

  Clone(): SettingStoreModel {
    let dto = this.ToDto();
    return new SettingStoreModel(dto);
  }

  ToDto(): SettingStoreModelDto {
    return {
      timeZones: this._timeZones,
      theme: this._theme,
      gridView: this._gridView,
    };
  }
}
