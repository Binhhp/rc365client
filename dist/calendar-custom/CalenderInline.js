"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

var React = _interopRequireWildcard(require("react"));

var _Calendar = require("./Calendar");

var _dateMath = require("../dateMath/dateMath");

var _CalenderStyle = require("./CalenderStyle");

var _Toggle = require("../Toggle");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const dayPickerStrings = {
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["S", "M", "T", "W", "T", "F", "S"],
  goToToday: "Go to today",
  weekNumberFormatString: "Week number {0}",
  prevMonthAriaLabel: "Previous month",
  nextMonthAriaLabel: "Next month",
  prevYearAriaLabel: "Previous year",
  nextYearAriaLabel: "Next year",
  prevYearRangeAriaLabel: "Previous year range",
  nextYearRangeAriaLabel: "Next year range",
  closeButtonAriaLabel: "Close"
};
const divStyle = {
  height: "auto",
  display: "flex"
};
const dateTimeFormatterCallbacks = {
  formatMonthDayYear: (date, strings) => (strings === null || strings === void 0 ? void 0 : strings.months[date.getMonth()]) + " " + date.getDate() + ", " + date.getFullYear(),
  formatMonthYear: (date, strings) => date.getFullYear() + " " + (strings === null || strings === void 0 ? void 0 : strings.months[date.getMonth()]),
  formatDay: date => date.getDate().toString(),
  formatYear: date => date.getFullYear().toString()
};

class CalendarInline extends React.Component {
  constructor(props) {
    super(props);

    this.onHighLightClass = (day, rangeDate) => {
      let {
        rangeBetween,
        userEvent
      } = rangeDate;
      let classHighLightIn = "ms-DatePicker-day--infocus ";
      let classHighLightOut = "ms-DatePicker-day--outfocus "; // high light event

      if (userEvent) {
        for (let i = 0; i < userEvent.length; i++) {
          if (day.key === userEvent[i].date.toString()) {
            switch (userEvent[i].event) {
              case 1:
                classHighLightIn = "".concat(classHighLightIn, " eventType1-highLight ");
                break;

              case 2:
                classHighLightIn = "".concat(classHighLightIn, " eventType2-highLight ");
                break;

              case 3:
                classHighLightIn = "".concat(classHighLightIn, " eventType3-highLight ");
                break;

              default:
                break;
            }
          }
        }
      } // high light select date


      if (rangeBetween.length > 0 && rangeBetween) {
        for (let i = 0; i < rangeBetween.length; i++) {
          if (day.key === rangeBetween[i].date.toString()) {
            classHighLightIn = "multiple-highlight ".concat(classHighLightIn, " ");
            classHighLightOut = "multiple-highlight ".concat(classHighLightOut, " ");
          }
        }
      }

      return [classHighLightIn, classHighLightOut];
    };

    this.onSelectDate = async (date, dateRangeArray) => {
      let {
        selectedDateRange
      } = this.state;
      let arrDateRange = [...selectedDateRange];
      let currentVal = dateRangeArray && dateRangeArray[0];
      let firstDate = Date.parse(selectedDateRange[0]);
      let currentDate = Date.parse(dateRangeArray.toLocaleString());
      let condition = currentDate < firstDate ? true : false;

      if (selectedDateRange.length === 0) {
        arrDateRange.push(currentVal);
        await this.setState({
          selectedDate: date,
          selectedDateRange: arrDateRange
        });
      }

      if (selectedDateRange.length === 1 && condition) {
        arrDateRange.unshift(currentVal);
        await this.setState({
          selectedDate: date,
          selectedDateRange: arrDateRange
        });
      }

      if (selectedDateRange.length > 0 && selectedDateRange.length < 2) {
        let arrConverted = [];
        arrDateRange.push(currentVal);
        let dateRange = this.getMoreDate(arrDateRange[0], arrDateRange[1]);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric"
        };

        for (let i = 0; i < dateRange.length; i++) {
          let defaulVal = dateRange[i].date.toLocaleDateString(undefined, options);
          arrConverted.push(defaulVal);
        }

        await this.setState({
          selectedDate: date,
          selectedDateRange: arrDateRange,
          rangeBetween: dateRange
        });
      }

      if (selectedDateRange.length >= 2) {
        let emptyArry = [];
        emptyArry.push(currentVal);
        await this.setState({
          selectedDate: date,
          rangeBetween: [],
          selectedDateRange: emptyArry
        });
      }

      this.sentDate();
    };

    this.onSelectSingleDate = async (date, dateRangeArray) => {
      await this.setState({
        selectedDate: date,
        selectedDateRange: dateRangeArray,
        rangeBetween: []
      });
      this.sentDate();
    };

    this.getMoreDate = (start, end) => {
      for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push({
          date: new Date(dt)
        });
      }

      return arr;
    };

    this.goPrevious = () => {
      const goPreviousSelectedDate = this.state.selectedDate || new Date();
      const dateRangeArray = (0, _dateMath.getDateRangeArray)(goPreviousSelectedDate, 0, _CalenderStyle.DayOfWeek.Sunday);
      let subtractFrom = dateRangeArray[0];
      let daysToSubtract = dateRangeArray.length;

      if (0 === _CalenderStyle.DateRangeType.Month) {
        subtractFrom = new Date(subtractFrom.getFullYear(), subtractFrom.getMonth(), 1);
        daysToSubtract = 1;
      }

      const newSelectedDate = (0, _dateMath.addDays)(subtractFrom, -daysToSubtract);
      return {
        goPreviousSelectedDate: newSelectedDate
      };
    };

    this.goNext = () => {
      const goNextSelectedDate = this.state.selectedDate || new Date();
      const dateRangeArray = (0, _dateMath.getDateRangeArray)(goNextSelectedDate, 0, _CalenderStyle.DayOfWeek.Sunday);
      const newSelectedDate = (0, _dateMath.addDays)(dateRangeArray.pop(), 1);
      return {
        goNextSelectedDate: newSelectedDate
      };
    };

    this.onDismiss = () => {
      return this.state.selectedDate;
    };

    this.sentDate = () => {
      this.props.onSelectChanged && this.props.onSelectChanged(this.state.pickType === "multiple" ? this.state.rangeBetween : this.state.selectedDate);
    };

    this.onGetMode = async () => {
      await this.setState({
        pickType: this.state.pickType === "single" ? "multiple" : "single",
        rangeBetween: []
      });
      this.props.onGetSelectMode && this.props.onGetSelectMode(this.state.pickType);
      this.sentDate();
    };

    this.onHighLightSelectionRange = async (startDate, endDate) => {
      let dateRange = [];

      if (startDate.valueOf() < endDate.valueOf()) {
        dateRange = this.getMoreDate(startDate, endDate);
        await this.setState({
          rangeBetween: dateRange,
          selectedDate: endDate,
          selectedDateRange: [startDate, endDate]
        });
        this.sentDate();
      } else {
        dateRange = this.getMoreDate(endDate, startDate);
        await this.setState({
          rangeBetween: dateRange,
          selectedDate: endDate,
          selectedDateRange: [endDate, startDate]
        });
        this.sentDate();
      }
    };

    let state = {
      selectedDate: "",
      selectedDateRange: [],
      rangeBetween: [],
      //range between date
      pickType: "single",
      userEvent: this.props.userEvent
    };
    this.state = state;
  }

  componentDidMount() {
    if (this.props.selectedDate) {
      this.setState({
        selectedDate: this.props.selectedDate
      });
    }
  }

  render() {
    let {
      selectedDate,
      pickType
    } = this.state;
    const nameAttibute = "data-rc-id";
    let CalendarWrapper = {
      [nameAttibute]: "cal.".concat(this.props.rcName)
    };
    return /*#__PURE__*/React.createElement("div", _extends({
      className: "CalendarWrapper"
    }, CalendarWrapper, {
      style: divStyle
    }), /*#__PURE__*/React.createElement(_CalenderStyle.CalenderDarkMode, {
      theme: this.props
    }, this.props.switchMode === true && /*#__PURE__*/React.createElement(_CalenderStyle.ToggleWrapper, {
      theme: this.props.darkMode
    }, /*#__PURE__*/React.createElement(_Toggle.Toggle, {
      rcName: this.props.rcName,
      label: "Choose multiple days",
      onChange: this.onGetMode
    })), /*#__PURE__*/React.createElement(_Calendar.Calendar, {
      onSelectDate: pickType === "single" ? this.onSelectSingleDate : this.onSelectDate,
      onDismiss: this.onDismiss,
      isMonthPickerVisible: this.props.isMonthPickerVisible,
      autoNavigateOnSelection: this.props.autoNavigateOnSelection,
      showGoToToday: this.props.showGoToToday,
      value: selectedDate,
      firstDayOfWeek: this.props.firstDayOfWeek ? this.props.firstDayOfWeek : _CalenderStyle.DayOfWeek.Sunday,
      strings: this.props.multilingual || dayPickerStrings,
      highlightCurrentMonth: this.props.highlightCurrentMonth,
      highlightSelectedMonth: this.props.highlightSelectedMonth,
      isDayPickerVisible: this.props.isDayPickerVisible,
      showMonthPickerAsOverlay: this.props.showMonthPickerAsOverlay,
      showWeekNumbers: this.props.showWeekNumbers,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      restrictedDates: this.props.restrictedDates,
      showSixWeeksByDefault: this.props.showSixWeeksByDefault,
      workWeekDays: this.props.workWeekDays,
      dateTimeFormatter: dateTimeFormatterCallbacks,
      onHighLight: this.onHighLightClass,
      calendarData: this.state,
      onGetSelectionDate: this.onHighLightSelectionRange,
      rcName: this.props.rcName
    })));
  }

}

var _default = CalendarInline;
exports.default = _default;