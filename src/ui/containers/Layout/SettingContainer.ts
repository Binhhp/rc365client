import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Settings from "src/ui/components/Layout/Menu/MenuPanel/Settings";
import { ThemeEnums } from "src/entity/enums/TypeEnums";
import { AppSettingManager } from "src/services/implements/AppSettingManager";
import { SettingReduxActionTS } from "src/ui/actions/implements/SettingsAct";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnHandleChangeTheme: async (checked: boolean) => {
      let theme = checked ? ThemeEnums.Dark : ThemeEnums.Light;
      let _appSettingManager = new AppSettingManager();
      await _appSettingManager.UpdateApplicationTheme(theme).then((res) => {
        if (res) {
          dispatch(SettingReduxActionTS.onSetThemeTS(res));
        }
      });
    },
  };
};

const SettingContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default SettingContainer;
