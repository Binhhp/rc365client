"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lightTheme = exports.darkTheme = void 0;

var _styling = require("./styling");

const darkTheme = {
  settings: {
    theme: (0, _styling.createTheme)({
      palette: {
        themePrimary: "#69afe5",
        themeLighterAlt: "#040709",
        themeLighter: "#111c25",
        themeLight: "#203545",
        themeTertiary: "#3f698a",
        themeSecondary: "#5d9bca",
        themeDarkAlt: "#77b7e8",
        themeDark: "#8bc2ec",
        themeDarker: "#a8d1f1",
        neutralLighterAlt: "#3c3c3c",
        neutralLighter: "#212121",
        neutralLight: "#515151",
        neutralQuaternaryAlt: "#595959",
        neutralQuaternary: "#5f5f5f",
        neutralTertiaryAlt: "#7a7a7a",
        neutralTertiary: "#c8c8c8",
        neutralSecondary: "#d0d0d0",
        neutralPrimaryAlt: "#dadada",
        neutralPrimary: "#ffffff",
        neutralDark: "#f4f4f4",
        black: "#f8f8f8",
        white: "#333333"
      }
    })
  },
  scopedSettings: {}
};
exports.darkTheme = darkTheme;
const lightTheme = {
  settings: {
    theme: (0, _styling.createTheme)({
      palette: {
        themePrimary: "#0078d4",
        themeLighterAlt: "#eff6fc",
        themeLighter: "#deecf9",
        themeLight: "#c7e0f4",
        themeTertiary: "#71afe5",
        themeSecondary: "#2b88d8",
        themeDarkAlt: "#106ebe",
        themeDark: "#005a9e",
        themeDarker: "#004578",
        neutralLighterAlt: "#faf9f8",
        neutralLighter: "#f3f2f1",
        neutralLight: "#edebe9",
        neutralQuaternaryAlt: "#e1dfdd",
        neutralQuaternary: "#d0d0d0",
        neutralTertiaryAlt: "#c8c6c4",
        neutralTertiary: "#a19f9d",
        neutralSecondary: "#605e5c",
        neutralPrimaryAlt: "#3b3a39",
        neutralPrimary: "#323130",
        neutralDark: "#201f1e",
        black: "#000000",
        white: "#ffffff"
      }
    })
  },
  scopedSettings: {}
};
exports.lightTheme = lightTheme;