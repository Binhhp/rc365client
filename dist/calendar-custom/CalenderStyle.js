"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypePick = exports.ToggleWrapper = exports.MonthOfYear = exports.FirstWeekOfYear = exports.DayOfWeek = exports.DateRangeType = exports.DAYS_IN_WEEK = exports.CalenderDarkMode = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import { DayOfWeek } from "calendar-custom";
let DayOfWeek;
/**
 * The months
 * {@docCategory MonthOfYear}
 */

exports.DayOfWeek = DayOfWeek;

(function (DayOfWeek) {
  DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
  DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
  DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
  DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
  DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
  DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
  DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek || (exports.DayOfWeek = DayOfWeek = {}));

let MonthOfYear;
/**
 * First week of the year settings types
 * {@docCategory FirstWeekOfYear}
 */

exports.MonthOfYear = MonthOfYear;

(function (MonthOfYear) {
  MonthOfYear[MonthOfYear["January"] = 0] = "January";
  MonthOfYear[MonthOfYear["February"] = 1] = "February";
  MonthOfYear[MonthOfYear["March"] = 2] = "March";
  MonthOfYear[MonthOfYear["April"] = 3] = "April";
  MonthOfYear[MonthOfYear["May"] = 4] = "May";
  MonthOfYear[MonthOfYear["June"] = 5] = "June";
  MonthOfYear[MonthOfYear["July"] = 6] = "July";
  MonthOfYear[MonthOfYear["August"] = 7] = "August";
  MonthOfYear[MonthOfYear["September"] = 8] = "September";
  MonthOfYear[MonthOfYear["October"] = 9] = "October";
  MonthOfYear[MonthOfYear["November"] = 10] = "November";
  MonthOfYear[MonthOfYear["December"] = 11] = "December";
})(MonthOfYear || (exports.MonthOfYear = MonthOfYear = {}));

let FirstWeekOfYear;
/**
 * The supported date range types
 * {@docCategory DateRangeType}
 */

exports.FirstWeekOfYear = FirstWeekOfYear;

(function (FirstWeekOfYear) {
  FirstWeekOfYear[FirstWeekOfYear["FirstDay"] = 0] = "FirstDay";
  FirstWeekOfYear[FirstWeekOfYear["FirstFullWeek"] = 1] = "FirstFullWeek";
  FirstWeekOfYear[FirstWeekOfYear["FirstFourDayWeek"] = 2] = "FirstFourDayWeek";
})(FirstWeekOfYear || (exports.FirstWeekOfYear = FirstWeekOfYear = {}));

let DateRangeType;
exports.DateRangeType = DateRangeType;

(function (DateRangeType) {
  DateRangeType[DateRangeType["Day"] = 0] = "Day";
  DateRangeType[DateRangeType["Week"] = 1] = "Week";
  DateRangeType[DateRangeType["Month"] = 2] = "Month";
  DateRangeType[DateRangeType["WorkWeek"] = 3] = "WorkWeek";
})(DateRangeType || (exports.DateRangeType = DateRangeType = {}));

const DAYS_IN_WEEK = 7; // <EventProps>

exports.DAYS_IN_WEEK = DAYS_IN_WEEK;
// </EventProps>
// <EventValue>
var EventValue; // </EventValue>
// <ExampleProps>

(function (EventValue) {
  EventValue[EventValue["eventType1"] = 1] = "eventType1";
  EventValue[EventValue["eventType2"] = 2] = "eventType2";
  EventValue[EventValue["eventType3"] = 3] = "eventType3";
})(EventValue || (EventValue = {}));

let TypePick;
exports.TypePick = TypePick;

(function (TypePick) {
  TypePick["single"] = "single";
  TypePick["multiple"] = "multiple";
})(TypePick || (exports.TypePick = TypePick = {}));

// [Styled-component]
const CalenderDarkMode = _styledComponents.default.div.attrs(props => ({
  className: "dayPicker_4cbef05b"
}))(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);\n  .ms-DatePicker-wrap{\n    padding: ", ";\n    margin:0;\n  }\n  .ms-DatePicker-picker{\n    height: auto;\n    // max-height: 224px;\n  }\n\n  .goToday_4cbef05b{\n    right: ", ";\n  } \n  .ms-DatePicker-goToday{\n    color:", ";\n  };\n  box-sizing: border-box;\n  .ms-DatePicker-dayPicker,\n  .ms-DatePicker-frame,\n  .ms-DatePicker-holder{\n    background-color: ", ";\n      @media screen and (min-width: 460px){\n        overflow: visible;\n      }\n      \n  }\n  .ms-DatePicker-frame, \n  .wrap_4cbef05b {\n    min-height: 190px;\n  }\n  th,\n  i {\n    color: ", ";\n  }\n  .weekday_4cbef05b {\n    cursor: default;\n  }\n  .ms-DatePicker-day-button {\n    cursor: pointer;\n  }\n  .ms-DatePicker-monthAndYear {\n    width: 100%;\n    text-align: left;\n    padding: 4px 5px;\n  }\n  .js-showYearPicker {\n    text-align: left;\n  }\n  .ms-DatePicker-holder {\n    min-height: 210px;\n    height:auto;\n    padding: 12px;\n  }\n  .dayBackground_4cbef05b {\n    border-radius: 0;\n  }\n  .currentYear_4cbef05b{\n    padding 0 5px;\n  }\n  .monthAndYear_4cbef05b{\n    padding:0;\n  }\n  .monthOption_4cbef05b:hover,\n  .yearOption_4cbef05b:hover,\n  .currentDecade_4cbef05b:hover,\n  .currentYear_4cbef05b:hover,\n  .monthAndYear_4cbef05b:hover,\n  .nextMonth_4cbef05b:hover,\n  .prevMonth_4cbef05b:hover,\n  .prevYear_4cbef05b:hover, \n  .nextYear_4cbef05b:hover {\n    border-radius: 0;\n    background-color: ", ";\n    color: ", " !important;\n  }\n  .monthOption_4cbef05b:active,\n  .yearOption_4cbef05b:active,\n  .currentDecade_4cbef05b:active,\n  .currentYear_4cbef05b:active,\n  .monthAndYear_4cbef05b:active,\n  .nextMonth_4cbef05b:active,\n  .prevMonth_4cbef05b:active,\n  .prevYear_4cbef05b:active, \n  .nextYear_4cbef05b:active {\n    border-radius: 0;\n    background-color: ", ";\n    color: ", " !important;\n  }\n  .ms-DatePicker-day--highlighted.dayIsHighlighted_4cbef05b {\n    background-color: ", ";\n    color: ", ";\n    border-radius: 0;\n    font-weight:bold;\n  }\n  .monthIsHighlighted_4cbef05b {\n    background-color: ", ";\n  }\n  .headerToggleView_4cbef05b,\n  .monthOption_4cbef05b,\n  .monthAndYear_4cbef05b,\n  .yearOption_4cbef05b,\n  .ms-DatePicker-day--infocus,\n  .headerToggleView_4cbef05b:hover {\n    color: ", ";\n  }\n  .dayWrapper_4cbef05b:hover {\n    cursor: pointer;\n    color: ", ";\n    background-color: ", ";\n  }\n  .dayWrapper_4cbef05b:active{\n    cursor: pointer;\n    color: ", ";\n    background-color: ", ";\n  }\n  .multiple-highlight {\n    background-color: ", " !important;\n    color: ", ";\n    font-weight:bold;\n  }\n  .eventType1-highLight{\n    &:after{\n      content:\"\";\n      left:50%;\n      bottom:2px;\n      width:4px;\n      height:4px;\n      transform: translate(-50%);\n      position:absolute;\n      border-radius:50%;\n      background-color: #05FF00;\n    }\n  }\n  .eventType3-highLight{\n    &:after{\n      content:\"\";\n      left:50%;\n      bottom:2px;\n      width:4px;\n      height:4px;\n      transform: translate(-50%);\n      position:absolute;\n      border-radius:50%;\n      background-color: #FF0000;\n    }\n  }\n  .eventType2-highLight{\n    &:after{\n      content:\"\";\n      left:50%;\n      bottom:2px;\n      width:4px;\n      height:4px;\n      transform: translate(-50%);\n      position:absolute;\n      border-radius:50%;\n      background-color: #FFE500;\n    }\n  }\n  .is-checked{\n    .ms-Checkbox-checkmark{\n      color:white;\n    }\n  }\n  .ms-DatePicker-day.ms-DatePicker-day--today{\n    background-color: red;\n  }\n  .ms-DatePicker-Toggle{\n    .ms-Checkbox-checkbox{\n      border-color: ", ";\n    }\n  }\n"])), props => !props.theme.showGoToToday && "0", props => props.theme.showGoToToday && "0", props => props.theme.darkMode === "dark" && "#ffffff", props => props.theme.darkMode === "dark" ? "rgb(27, 26, 25)" : "", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121", props => props.theme.darkMode === "dark" ? "#000000" : "#F4F4F4", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121", props => props.theme.darkMode === "dark" ? "#000000" : "#F4F4F4", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121", props => props.theme.darkMode === "dark" ? "#445b6c" : "#DEECF9", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121", props => props.theme.darkMode === "dark" ? "#445B6C" : "#DEECF9", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121", props => props.theme.darkMode === "dark" ? "#000000" : "#DEECF9", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121", props => props.theme.darkMode === "dark" ? "#000000" : "#DEECF9", props => props.theme.darkMode === "dark" ? "#445b6c" : "#DEECF9", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121", props => props.theme.darkMode === "dark" ? "#ffffff" : "#212121");

exports.CalenderDarkMode = CalenderDarkMode;

const ToggleWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  .ms-Toggle {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-bottom: 1px solid;\n    border-color: ", ";\n    padding: 15px 14px 14px 12px;\n    background-color: ", ";\n    margin-bottom: 0;\n    .ms-Label {\n      padding: 0;\n      color: ", ";\n      font-weight: normal;\n    }\n  }\n"])), props => props.theme === "dark" ? "#000000" : "#ECECEC", props => props.theme === "dark" ? "rgb(27, 26, 25)" : "", props => props.theme === "dark" ? "#ffffff" : "#333333");

exports.ToggleWrapper = ToggleWrapper;