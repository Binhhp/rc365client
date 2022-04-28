"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.trim.js");

var React = _interopRequireWildcard(require("react"));

var _NumberFormStyle = require("./NumberFormStyle");

var _CustomDropdown = _interopRequireDefault(require("../../../Dropdown/CustomDropdown"));

var _CustomTextField = _interopRequireDefault(require("../../../TextField/CustomTextField"));

var _Button = _interopRequireDefault(require("../../../Button"));

var _Common = require("../../Interface/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const options = [{
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

class StringForm extends React.Component {
  constructor(props) {
    super(props);

    this._mapToOperatorFilterNumberEnums = str => {
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

        default:
          return _Common.OperatorFilterNumberEnums.Null;
      }
    };

    this._onHandleSentFilterValue = () => {
      console.log("sent");

      if (this.props.OnGetFilterValue) {
        this.props.OnGetFilterValue(this.state.operator, this.state.value);
      }
    };

    this._FocusInFieldValue = () => {
      let txt = document.getElementById("dl.filter.value");

      if (txt) {
        return txt.focus();
      }
    };

    this.onSelectDrop = (event, option, index) => {
      if (option) {
        let newOperator = this._mapToOperatorFilterNumberEnums(String(option.key));

        this.setState({
          operator: newOperator
        }, () => this._FocusInFieldValue());
      }
    };

    this.onSubmitText = e => {
      let {
        keyCode
      } = e;

      if (keyCode === 13 && this.state.operator !== _Common.OperatorFilterNumberEnums.Null) {
        this.onHandleApplyFilter();
      }
    };

    this.onHandleCheckValue = (event, val) => {
      if (val && val.trim() !== "") {
        let num = Number(val) ? Number(val) : 0;
        this.setState({
          value: num
        });
      }

      if (!val || val.trim() === "") {
        this.setState({
          value: 0
        });
      }
    };

    this.onClearFilter = () => {
      this.setState({
        operator: _Common.OperatorFilterNumberEnums.Null,
        value: 0
      });
    };

    this.onHandleApplyFilter = () => {
      if (this.state.operator !== _Common.OperatorFilterNumberEnums.Null) {
        this._onHandleSentFilterValue();
      }
    };

    this.state = {
      operator: _Common.OperatorFilterNumberEnums.Null,
      value: 0
    };
  }

  componentDidMount() {
    if (this.props.workingColumn && this.props.filterQuery && this.props.filterQuery.length > 0) {
      let idx = this.props.filterQuery.findIndex(q => {
        var _this$props$workingCo;

        return q.key === ((_this$props$workingCo = this.props.workingColumn) === null || _this$props$workingCo === void 0 ? void 0 : _this$props$workingCo.key);
      });

      if (idx !== -1) {
        let operator = this._mapToOperatorFilterNumberEnums(this.props.filterQuery[idx].operator);

        this.setState({
          value: this.props.filterQuery[idx].value,
          operator
        });
      }
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(_NumberFormStyle.NumberFormWrapper, {
      className: "NumberFormWrapper"
    }, /*#__PURE__*/React.createElement(_CustomDropdown.default, {
      autoFocus: true,
      label: "Filter Condition",
      placeholder: "Select filter",
      options: options,
      onChange: this.onSelectDrop,
      darkMode: this.props.darkMode,
      selectedKey: this.state.operator,
      rcName: "frm.filter.".concat(this.props.rcName)
    }), /*#__PURE__*/React.createElement(_CustomTextField.default, {
      label: "Value",
      id: "dl.filter.value",
      onKeyDown: this.onSubmitText,
      onChange: this.onHandleCheckValue,
      darkMode: this.props.darkMode,
      type: "number",
      value: String(this.state.value),
      min: this.props.min,
      rcName: "frm.filter.".concat(this.props.rcName),
      disabled: this.state.operator === _Common.OperatorFilterNumberEnums.Null
    }), /*#__PURE__*/React.createElement("div", {
      className: "action__wrapper"
    }, /*#__PURE__*/React.createElement(_Button.default, {
      type: "Primary",
      text: "Apply",
      disabled: this.state.operator === _Common.OperatorFilterNumberEnums.Null,
      onClick: this.state.operator !== _Common.OperatorFilterNumberEnums.Null ? this.onHandleApplyFilter : undefined,
      darkMode: this.props.darkMode,
      rcName: "frm.filter.apply"
    }), /*#__PURE__*/React.createElement(_Button.default, {
      text: "Clear all",
      onClick: this.onClearFilter,
      darkMode: this.props.darkMode,
      rcName: "frm.filter.clear",
      disabled: this.state.operator === _Common.OperatorFilterNumberEnums.Null && this.state.value < 1
    })));
  }

}

exports.default = StringForm;