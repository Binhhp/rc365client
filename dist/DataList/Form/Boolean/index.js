"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var React = _interopRequireWildcard(require("react"));

var _BooleanFormStyle = require("./BooleanFormStyle");

var _Button = _interopRequireDefault(require("../../../Button"));

var _Common = require("../../Interface/Common");

var _CustomChoiceGroup = _interopRequireDefault(require("../../../ChoiceGroup/CustomChoiceGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultOpts = [{
  key: "true",
  text: "True"
}, {
  key: "false",
  text: "False"
}];

class BooleanForm extends React.Component {
  constructor(props) {
    super(props);

    this._onHandleValueDefault = () => {
      if (this.props.workingColumn && this.props.filterQuery && this.props.filterQuery.length > 0) {
        let idx = this.props.filterQuery.findIndex(q => {
          var _this$props$workingCo;

          return q.key === ((_this$props$workingCo = this.props.workingColumn) === null || _this$props$workingCo === void 0 ? void 0 : _this$props$workingCo.key);
        });

        if (idx !== -1) {
          return this.props.filterQuery[idx].value;
        }
      }

      return "";
    };

    this._onHandleSentFilterValue = () => {
      if (this.props.OnGetFilterValue) {
        var _this$props$column;

        if (((_this$props$column = this.props.column) === null || _this$props$column === void 0 ? void 0 : _this$props$column.data) === "boolean|string") {
          this.props.OnGetFilterValue("eq", this.state.operator);
        } else {
          this.props.OnGetFilterValue("eq", this.state.operator === "true" ? true : false);
        }
      }
    };

    this.onHandleApplyFilter = () => {
      if (this.state.operator !== _Common.OperatorFilterNumberEnums.Null) {
        this._onHandleSentFilterValue();
      }
    };

    this.onGetChoiceGroup = (ev, option) => {
      if (option) {
        this.setState({
          operator: option.key
        });
      }
    };

    this.state = {
      operator: this._onHandleValueDefault(),
      options: []
    };
  }

  UNSAFE_componentWillMount() {
    // case boolean
    if (this.props.column && this.props.column.data === "boolean" && this.props.column.booleanFormOpts && this.props.column.booleanFormOpts.length > 0) {
      let crtArr = [...this.props.column.booleanFormOpts];
      let indexTrueText = crtArr.findIndex(o => typeof o.key === "boolean" && o.key === true);
      let indexFalseText = crtArr.findIndex(o => typeof o.key === "boolean" && o.key === false);

      if (indexTrueText !== -1) {
        defaultOpts[0].text = crtArr[indexTrueText].text;
      }

      if (indexFalseText !== -1) {
        defaultOpts[1].text = crtArr[indexFalseText].text;
      }

      this.setState({
        options: defaultOpts
      });
    } // case boolean|string


    if (this.props.column && this.props.column.data === "boolean|string" && this.props.column.booleanFormOpts && this.props.column.booleanFormOpts.length > 0) {
      let crtArr = [...this.props.column.booleanFormOpts];
      this.setState({
        options: crtArr
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(_BooleanFormStyle.BooleanFormWrapper, {
      className: "BooleanFormWrapper"
    }, /*#__PURE__*/React.createElement(_CustomChoiceGroup.default, {
      options: this.state.options,
      darkMode: this.props.darkMode,
      onChange: this.onGetChoiceGroup,
      rcName: "frm.filter",
      defaultSelectedKey: this.state.operator
    }), /*#__PURE__*/React.createElement("div", {
      className: "action__wrapper"
    }, /*#__PURE__*/React.createElement(_Button.default, {
      type: "Primary",
      text: "Apply",
      disabled: this.state.operator === "",
      onClick: this.state.operator !== "" ? this.onHandleApplyFilter : undefined,
      darkMode: this.props.darkMode,
      rcName: "frm.filter.apply"
    })));
  }

}

exports.default = BooleanForm;