import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  ApiFromOData,
  BuildURLWithTenantId,
} from "src/common/constants/RootURL";
import { SettingReduxActionTS } from "src/ui/actions/implements/SettingsAct";
import LayoutContainer from "src/ui/containers/Layout/LayoutContainer";
import { appReducers } from "src/ui/reducers";
import "./App.css";
import ToastContainer from "./common/ui/Toast/components/ToastContainer";
import { SignalRLoadingStep, ThemeEnums } from "./entity/enums";
import { SignalRManager } from "./services/implements/SignalRManager";
import { ApplicationReduxActionTS } from "./ui/actions/implements/ApplicationAct";

export interface AppProps {
  isLoading?: boolean;
  theme?: string;
  onChangeLocalTheme?: (theme: ThemeEnums) => void;
  onHandleUpdateSignalRLoading?: (val: boolean) => void;
  onHandleUpdateBreadCrumb?: (nodes: INodes[]) => void;
}
function App(props: AppProps) {
  let _signalR = new SignalRManager();
  const onHandleChangeSignalRLoading = (val: boolean) => {
    if (props.onHandleUpdateSignalRLoading) {
      props.onHandleUpdateSignalRLoading(val);
    }
  };

  const onRenderTitle = (): {
    title: string;
    name: string;
    titleLink: string;
  } => {
    let pathName = window.location.href;
    const headerContent = {
      title: "Resource Central 365",
      name: "Organizations",
      titleLink: "",
    };

    if (pathName.includes("organizations") || pathName.includes("orgId")) {
      headerContent.name = "Organizations";
      return headerContent;
    }
    if (pathName.includes("sensors") || pathName.includes("sensor")) {
      headerContent.name = "Sensors";
      return headerContent;
    }
    if (pathName.includes("tenants") || pathName.includes("tenant")) {
      headerContent.name = "Tenants";
      return headerContent;
    }
    return headerContent;
  };

  React.useEffect(() => {
    let userSetting = JSON.parse(localStorage.getItem("userInfo")!);
    if (props.onChangeLocalTheme) {
      props.onChangeLocalTheme(userSetting ? userSetting.darkMode : "light");
    }
    const promises = [
      new Promise(() =>
        _signalR.setupSignalRConnection(
          `${BuildURLWithTenantId(ApiFromOData.CONNECTION_API)}organizationHub`
        )
      ),
      new Promise(() =>
        _signalR.setupSignalRConnection(
          `${BuildURLWithTenantId(ApiFromOData.CONNECTION_API)}tenantHub`
        )
      ),
      new Promise(() =>
        _signalR.setupSignalRConnection(
          `${BuildURLWithTenantId(
            ApiFromOData.CONNECTION_API
          )}notificationViewbuilderHub`
        )
      ),
      new Promise(() =>
        _signalR.setupSignalRConnection(
          `${BuildURLWithTenantId(ApiFromOData.CONNECTION_API)}sensorHub`
        )
      ),
      new Promise(() =>
        _signalR.setupSignalRConnection(
          `${BuildURLWithTenantId(ApiFromOData.CONNECTION_API)}calendarHub`
        )
      ),
      new Promise(() =>
        _signalR.setupSignalRConnection(
          `${BuildURLWithTenantId(
            ApiFromOData.CONNECTION_API
          )}organizationSynchronizeHub`
        )
      ),
    ];
    Promise.all(promises).then((prm1) => {
      if (
        [SignalRLoadingStep.Success, SignalRLoadingStep.Failure].includes(
          _signalR.signalRStatus
        )
      ) {
        onHandleChangeSignalRLoading(false);
      }
    });
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        width: "100%",
        position: "relative",
      }}
    >
      <LayoutContainer content={onRenderTitle()} />
      <ToastContainer></ToastContainer>
    </div>
  );
}
const mapStateToProps = (state: appReducers) => {
  let { userReducer, settingsReducer } = state;
  return {
    isLoading: userReducer.isLoading,
    theme: settingsReducer.theme,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeLocalTheme: (theme: ThemeEnums) => {
      dispatch(SettingReduxActionTS.onSetThemeTS(theme));
    },
    onHandleUpdateSignalRLoading: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateSignalRLoadingAct(val));
    },
    onHandleUpdateBreadCrumb: (nodes: INodes[]) => {
      if (nodes.length > 0) {
        dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
