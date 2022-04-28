"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuFilterWrapper = exports.MainWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const MainWrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  font-family: Segoe UI;\n  position: relative;\n  border: ", ";\n  img {\n    width: 18px;\n    height: 18px;\n    padding-right: 17px;\n  }\n  .ms-DetailsHeader-cellName {\n    font-weight: normal;\n    font-size: 12px;\n    display: inline-flex;\n    align-items: center;\n    justify-items: center;\n    height: 100%;\n  }\n  .ms-DetailsHeader {\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    padding-top: 0;\n    background-color: ", ";\n    .btn-closeFilter {\n      i {\n        padding-left: 0;\n      }\n      &:hover {\n        background: ", ";\n        i {\n          color: #c11818;\n        }\n      }\n    }\n    .ms-DetailsHeader-cell {\n      cursor: pointer;\n      height: 100%;\n      &:active {\n        background-color: ", ";\n      }\n      .ms-DetailsHeader-collapseButton {\n        color: ", ";\n      }\n      .ms-DetailsHeader-checkTooltip .ms-DetailsHeader-check {\n        .ms-Check {\n          .ms-Icon {\n            color: ", ";\n          }\n          &::before {\n            background: ", ";\n          }\n        }\n        .is-checked {\n          .ms-Icon {\n            color: ", " !important;\n          }\n          &::before {\n            background: ", " !important;\n          }\n        }\n      }\n      .settingCol-filter {\n        font-size: 12px !important;\n      }\n      &:hover {\n        background: ", ";\n      }\n      .ms-DetailsHeader-cellTitle {\n        height: 30px;\n        align-items: center;\n        color: ", ";\n        i {\n          font-size: 10px;\n          color: ", ";\n        }\n      }\n    }\n    .ms-DetailsHeader-cellSizer:last-of-type {\n      display: none;\n    }\n  }\n  .ms-DetailsRow {\n    cursor: pointer;\n    width: 100%;\n    .ms-DetailsRow-cell {\n      white-space: nowrap;\n      .ms-DetailsRow-check {\n        .ms-Check {\n          .ms-Icon {\n            color: ", ";\n          }\n          &::before {\n            background: ", ";\n          }\n        }\n        .is-checked {\n          .ms-Icon {\n            color: ", " !important;\n          }\n          &::before {\n            background: ", " !important;\n          }\n        }\n      }\n    }\n    .ms-DetailsRow-cellCheck {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n    .column-icon {\n      padding-left: 8px;\n    }\n    .name-col {\n      color: ", ";\n    }\n    &:hover {\n      background: ", " !important;\n      color: ", ";\n    }\n  }\n  .is-selected {\n    background: ", ";\n    span,\n    i {\n      color: ", " !important;\n    }\n  }\n  .ms-Check {\n    cursor: pointer;\n  }\n  .ms-ScrollablePane--contentContainer {\n    .ms-DetailsList {\n      overflow-x: hidden;\n      .ms-DetailsList-contentWrapper {\n        .ms-FocusZone {\n          color: ", ";\n          .ms-List-surface {\n            .ms-List-page:nth-last-child(2) {\n              .ms-GroupHeader {\n                border-bottom: 0;\n              }\n            }\n          }\n          .ms-GroupHeader {\n            background-color: ", ";\n            border-bottom: ", ";\n            cursor: pointer;\n            &:hover {\n              background-color: ", ";\n            }\n            .ms-GroupHeader-expand {\n              cursor: pointer;\n              &:hover {\n                background-color: ", ";\n              }\n              i {\n                color: ", ";\n              }\n            }\n            .ms-GroupHeader-check {\n              .ms-Check {\n                .ms-Icon {\n                  color: ", ";\n                }\n                &::before {\n                  background: ", ";\n                }\n              }\n              .is-checked {\n                .ms-Icon {\n                  color: ", " !important;\n                }\n                &::before {\n                  background: ", " !important;\n                }\n              }\n            }\n          }\n        }\n        .ms-DetailsRow {\n          background: ", " !important;\n          &:hover {\n            background: ", " !important;\n          }\n        }\n      }\n    }\n  }\n\n  .ms-ScrollablePane--contentContainer::-webkit-scrollbar {\n    background-color: ", ";\n    cursor: pointer;\n  }\n  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 10px;\n    background-clip: content-box;\n    border: solid 6px transparent;\n    &:hover {\n      background: #98a3a6;\n      background-clip: content-box;\n      border: solid 7px transparent;\n    }\n  }\n  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button,\n  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-corner {\n    background: transparent;\n  }\n  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:horizontal:increment {\n    background-image: url(https://dl.dropboxusercontent.com/u/55165267/icon2.png);\n  }\n  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:end:increment {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAi0lEQVQokWNgGAUkAUYY48SJE9n////nIaiBkfGzhYXFNAYGBgYWJHFHRkbGYCIsXMPAwDCNgYGBgQkmwsLCEvn////1BDRufffuXQyGsxkYGBjOnDnD+vv375WMjIyBODQGe3l5/cSqGY8BGBqxasZiAFaNODXDDPjz508MCwvLEhMTk9+41A1BAADmHz3RwatzCgAAAABJRU5ErkJggg==);\n    background-repeat: no-repeat;\n    background-position: center;\n  }\n  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:start:decrement {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAZ0lEQVQoke2MsQnDMBQF77k03kcgApkgK3g0F4HM4M7gRmgity+VGiMh9cmV/787+D3UeqSUnpLettcY4zks55wfwA4swCXpFUI4uvJNLFQDGhCbAQ2K1cBUrrY/HRFgtr11Nn9afAFsJydbydDm5gAAAABJRU5ErkJggg==);\n    background-repeat: no-repeat;\n    background-position: center;\n  }\n  .ms-Shimmer-shimmerWrapper {\n    border-color: ", ";\n    background: ", ";\n  }\n  .ms-ShimmerGap-root {\n    background-color: ", ";\n  }\n  .ms-ShimmerLine-topLeftCorner,\n  .ms-ShimmerLine-topRightCorner,\n  .ms-ShimmerLine-bottomRightCorner,\n  .ms-ShimmerLine-bottomLeftCorner {\n    fill: ", ";\n  }\n  .ms-Shimmer-shimmerGradient {\n    background: ", ";\n  }\n  .ms-ShimmerLine-root {\n    border-color: ", ";\n  }\n"])), _ref => {
  let {
    theme
  } = _ref;
  return theme.darkMode === "dark" ? "1px solid #000000" : "1px solid #edebe9";
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.darkMode === "dark" ? "#1d1d1d" : "#f9f9f9";
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.darkMode === "dark" ? "#000000" : "#f4f4f4";
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.darkMode === "dark" ? "#000000" : "#F4F4F4";
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.darkMode === "dark" ? "#ffffff" : "#333333";
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.darkMode === "dark" && "#ffffff";
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.darkMode === "dark" && "#212121";
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.darkMode === "dark" && "#212121";
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.darkMode === "dark" && "rgb(105, 175, 229)";
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.darkMode === "dark" ? "#000000" : "#F4F4F4";
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.darkMode === "dark" ? "#ffffff" : "#333333";
}, _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.darkMode === "dark" ? "#D5D5D5" : "#666666";
}, _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.darkMode === "dark" && "#ffffff";
}, _ref14 => {
  let {
    theme
  } = _ref14;
  return theme.darkMode === "dark" && "#212121";
}, _ref15 => {
  let {
    theme
  } = _ref15;
  return theme.darkMode === "dark" && "#212121";
}, _ref16 => {
  let {
    theme
  } = _ref16;
  return theme.darkMode === "dark" && "rgb(105, 175, 229)";
}, _ref17 => {
  let {
    theme
  } = _ref17;
  return theme.darkMode === "dark" ? "#ffffff" : "#212121";
}, _ref18 => {
  let {
    theme
  } = _ref18;
  return theme.darkMode === "dark" ? "#000000" : "#F4F4F4";
}, _ref19 => {
  let {
    theme
  } = _ref19;
  return theme.darkMode === "dark" && "#ffffff";
}, _ref20 => {
  let {
    theme
  } = _ref20;
  return theme.darkMode === "dark" ? "#454545" : "#ffffff";
}, _ref21 => {
  let {
    theme
  } = _ref21;
  return theme.darkMode === "dark" && "#ffffff";
}, _ref22 => {
  let {
    theme
  } = _ref22;
  return theme.darkMode === "dark" ? "#ffffff" : "#323130";
}, _ref23 => {
  let {
    theme
  } = _ref23;
  return theme.darkMode === "dark" ? "#212121" : "#ffffff";
}, _ref24 => {
  let {
    theme
  } = _ref24;
  return theme.darkMode === "dark" ? "1px solid #000000" : "1px solid #edebe9";
}, _ref25 => {
  let {
    theme
  } = _ref25;
  return theme.darkMode === "dark" ? "#000000" : "#f4f4f4";
}, _ref26 => {
  let {
    theme
  } = _ref26;
  return theme.darkMode === "dark" ? "#000000" : "#F4F4F4";
}, _ref27 => {
  let {
    theme
  } = _ref27;
  return theme.darkMode === "dark" ? "#ffffff" : "#323130";
}, _ref28 => {
  let {
    theme
  } = _ref28;
  return theme.darkMode === "dark" && "#ffffff";
}, _ref29 => {
  let {
    theme
  } = _ref29;
  return theme.darkMode === "dark" && "#212121";
}, _ref30 => {
  let {
    theme
  } = _ref30;
  return theme.darkMode === "dark" && "#212121";
}, _ref31 => {
  let {
    theme
  } = _ref31;
  return theme.darkMode === "dark" && "rgb(105, 175, 229)";
}, _ref32 => {
  let {
    theme
  } = _ref32;
  return theme.darkMode === "dark" ? "#393838" : "#ffffff";
}, _ref33 => {
  let {
    theme
  } = _ref33;
  return theme.darkMode === "dark" ? "#000" : "#f4f4f4";
}, _ref34 => {
  let {
    theme
  } = _ref34;
  return theme.darkMode === "dark" ? "#3c3c3c" : "#ffffff";
}, _ref35 => {
  let {
    theme
  } = _ref35;
  return theme.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4";
}, _ref36 => {
  let {
    theme
  } = _ref36;
  return theme.darkMode === "dark" && "#323130";
}, _ref37 => {
  let {
    theme
  } = _ref37;
  return theme.darkMode === "dark" && "#323130";
}, _ref38 => {
  let {
    theme
  } = _ref38;
  return theme.darkMode === "dark" && "#212121";
}, _ref39 => {
  let {
    theme
  } = _ref39;
  return theme.darkMode === "dark" && "#323130";
}, _ref40 => {
  let {
    theme
  } = _ref40;
  return theme.darkMode === "dark" && "#373737";
}, _ref41 => {
  let {
    theme
  } = _ref41;
  return theme.darkMode === "dark" && "#212121";
});

exports.MainWrapper = MainWrapper;

const MenuFilterWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 5px 0 5px 10px;\n  .ms-Checkbox {\n    .ms-Checkbox-label {\n      .ms-Checkbox-text {\n        color: ", ";\n      }\n    }\n  }\n  .is-checked {\n    .ms-Checkbox-label {\n      .ms-Checkbox-checkbox {\n        background-color: ", ";\n        border-color: ", ";\n        i {\n          color: ", ";\n        }\n      }\n    }\n    &:hover {\n      .ms-Checkbox-label {\n        .ms-Checkbox-checkbox {\n          background-color: ", ";\n          border-color: ", ";\n        }\n      }\n    }\n  }\n"])), _ref42 => {
  let {
    theme
  } = _ref42;
  return theme === "dark" ? "#ffffff" : "#333333";
}, _ref43 => {
  let {
    theme
  } = _ref43;
  return theme === "dark" && "#69afe5";
}, _ref44 => {
  let {
    theme
  } = _ref44;
  return theme === "dark" && "#69afe5";
}, _ref45 => {
  let {
    theme
  } = _ref45;
  return theme === "dark" && "#333333";
}, _ref46 => {
  let {
    theme
  } = _ref46;
  return theme === "dark" && "#b3d6fc";
}, _ref47 => {
  let {
    theme
  } = _ref47;
  return theme === "dark" && "#b3d6fc";
});

exports.MenuFilterWrapper = MenuFilterWrapper;