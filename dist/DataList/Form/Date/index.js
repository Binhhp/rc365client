"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _DateFormStyle = require("./DateFormStyle");

var _CustomDropdown = _interopRequireDefault(require("../../../Dropdown/CustomDropdown"));

var _Button = _interopRequireDefault(require("../../../Button"));

var _Common = require("../../Interface/Common");

var _CalenderInline = _interopRequireDefault(require("../../../calendar-custom/CalenderInline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const optionsCalendarSingle = [{
  key: _Common.OperatorFilterNumberEnums.Equal,
  text: "Equal"
}, {
  key: _Common.OperatorFilterNumberEnums.Less,
  text: "Less than"
}, {
  key: _Common.OperatorFilterNumberEnums.Greater,
  text: "Greater than"
}, {
  key: _Common.OperatorFilterNumberEnums.LessOrEqual,
  text: "Less than or equal to"
}, {
  key: _Common.OperatorFilterNumberEnums.GreaterOrEqual,
  text: "Greater than or equal to"
}];
const optionsCalendarMultiple = [{
  key: _Common.OperatorFilterStringEnums.Contain,
  text: "Within"
}, {
  key: _Common.OperatorFilterStringEnums.NotContain,
  text: "Not within"
}];

class DateForm extends React.Component {
  constructor(props) {
    super(props);

    this._mapToOperatorFilterStringEnums = str => {
      switch (str) {
        case "eq":
          return _Common.OperatorFilterNumberEnums.Equal;

        case "lt":
          return _Common.OperatorFilterNumberEnums.Less;

        case "gt":
          return _Common.OperatorFilterNumberEnums.Greater;

        case "le":
          return _Common.OperatorFilterNumberEnums.LessOrEqual;

        case "ge":
          return _Common.OperatorFilterNumberEnums.GreaterOrEqual;

        case "not":
          return _Common.OperatorFilterStringEnums.NotContain;

        case "contains":
          return _Common.OperatorFilterStringEnums.Contain;

        default:
          return _Common.OperatorFilterStringEnums.Null;
      }
    };

    this._onHandleSentFilterValue = () => {
      if (this.props.OnGetFilterValue && this.state.value) {
        this.props.OnGetFilterValue(this.state.operator, this.state.value);
      }
    };

    this.onSelectDrop = (event, option, index) => {
      if (option) {
        let newOperator = this._mapToOperatorFilterStringEnums(String(option.key));

        this.setState({
          operator: newOperator
        });
      }
    };

    this.onClearFilter = () => {
      this.setState({
        operator: _Common.OperatorFilterStringEnums.Null,
        value: null
      });
    };

    this.onHandleApplyFilter = () => {
      if (this.state.operator !== _Common.OperatorFilterStringEnums.Null && this.state.value !== null) {
        this._onHandleSentFilterValue();
      }
    };

    this.onGetDataCalendar = val => {
      this.setState({
        value: val
      });
    };

    this.state = {
      operator: _Common.OperatorFilterStringEnums.Null,
      selectMode: "single",
      value: null
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(_DateFormStyle.DateFormWrapper, {
      className: "DateFormWrapper"
    }, /*#__PURE__*/React.createElement(_CustomDropdown.default, {
      autoFocus: true,
      label: "Filter Condition",
      placeholder: "Select filter",
      options: this.state.selectMode && this.state.selectMode === "multiple" ? optionsCalendarMultiple : optionsCalendarSingle,
      onChange: this.onSelectDrop,
      darkMode: this.props.darkMode,
      selectedKey: this.state.operator,
      rcName: "frm.filter"
    }), /*#__PURE__*/React.createElement(_CalenderInline.default, {
      autoNavigateOnSelection: true,
      showGoToToday: false,
      highlightSelectedMonth: true,
      showMonthPickerAsOverlay: true,
      showWeekNumbers: false,
      showSixWeeksByDefault: false,
      onSelectChanged: this.onGetDataCalendar,
      switchMode: true,
      darkMode: this.props.darkMode,
      onGetSelectMode: pickType => this.setState({
        selectMode: pickType,
        operator: _Common.OperatorFilterStringEnums.Null
      }),
      rcName: "frm.filter"
    }), /*#__PURE__*/React.createElement("div", {
      className: "action__wrapper"
    }, /*#__PURE__*/React.createElement(_Button.default, {
      type: "Primary",
      text: "Apply",
      onClick: this.state.operator !== _Common.OperatorFilterStringEnums.Null && this.state.value !== null ? this.onHandleApplyFilter : undefined,
      darkMode: this.props.darkMode,
      rcName: "frm.filter.apply",
      disabled: !this.state.value || this.state.operator === _Common.OperatorFilterStringEnums.Null
    }), /*#__PURE__*/React.createElement(_Button.default, {
      text: "Clear all",
      onClick: this.onClearFilter,
      darkMode: this.props.darkMode,
      rcName: "frm.filter.clear",
      disabled: this.state.operator === _Common.OperatorFilterStringEnums.Null && !this.state.value
    })));
  }

}

exports.default = DateForm;