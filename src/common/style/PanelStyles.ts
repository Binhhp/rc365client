import { IStyleFunctionOrObject } from "aod-dependencies/@uifabric/styling";
import {
  IPanelStyleProps,
  IPanelStyles,
} from "aod-dependencies/Panel/Panel.types";
import { ThemeEnums } from "src/entity/enums";

export const PanelStyle = (
  darkMode?: ThemeEnums | string
): IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles> => {
  let Theme = ThemeEnums.Light;
  if (darkMode && typeof darkMode === "string") {
    if (darkMode === "dark") {
      Theme = ThemeEnums.Dark;
    }
  }

  return {
    headerText: {
      fontSize: "21px",
      color: Theme === ThemeEnums.Dark ? "#ffffff" : "#000000",
      fontWeight: "300",
    },
    header: {
      height: "auto",
      padding: "5px 20px",
    },
    subComponentStyles: {
      closeButton: {
        icon: {
          fontSize: "15px",
          color: Theme === ThemeEnums.Dark ? "#ffffff" : "#000000",
          fontWeight: "normal",
        },
        rootHovered: {
          background: Theme === ThemeEnums.Dark ? "#000000" : "#F4F4F4",
          color: Theme === ThemeEnums.Dark ? "#ffffff" : "#000000",
        },
        rootPressed: {
          backgroundColor: Theme === ThemeEnums.Dark ? "#333333" : "#c8c8c8",
        },
      },
    },
    content: {
      padding: 0,
      height: "100%",
      background: Theme === ThemeEnums.Dark ? "#333333" : "#ffffff",
      color: Theme === ThemeEnums.Dark ? "#ffffff" : "#212121",
    },
    contentInner: {
      height: "100%",
    },
    scrollableContent: {
      height: "100%",
      overflow: "hidden",
      background: Theme === ThemeEnums.Dark ? "#333333" : "#ffffff",
    },
    commands: {
      margin: 0,
      paddingTop: "10px",
      background: Theme === ThemeEnums.Dark ? "#333333" : "#ffffff",
    },
    main: {
      zIndex: 1,
    },
    footer: {
      borderTop:
        Theme === ThemeEnums.Dark ? "1px solid #000000" : "1px solid #eaeaea",
      background: Theme === ThemeEnums.Dark ? "#333333" : "#ffffff",
    },
  };
};
