"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var React = _interopRequireWildcard(require("react"));

var _PanelStyle = require("./PanelStyle");

var _String = _interopRequireDefault(require("../Form/String"));

var _Number = _interopRequireDefault(require("../Form/Number"));

var _Date = _interopRequireDefault(require("../Form/Date"));

var _Boolean = _interopRequireDefault(require("../Form/Boolean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class PanelContent extends React.Component {
  constructor() {
    super(...arguments);

    this._onHandleSendFilterObj = (operator, value) => {
      if (this.props.onGetFilterObj && this.props.targetColumn) {
        this.props.onGetFilterObj(operator, this.props.targetColumn.fieldName, value);
      }
    };

    this.onConvertBetweenDateAndTicks = (data, isOnlyDate) => {
      const epochTicks = 621355968000000000;
      const ticksPerMillisecond = 10000;
      const maxDateMilliseconds = 8640000000000000;
      let dateWithTime = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      let onlyDate = {
        year: "numeric",
        month: "short",
        day: "2-digit"
      }; // ticks to date

      if (typeof data === "number") {
        if (isNaN(data)) {
          return "";
        }

        const ticksSinceEpoch = data - epochTicks;
        const millisecondsSinceEpoch = ticksSinceEpoch / ticksPerMillisecond;

        if (millisecondsSinceEpoch > maxDateMilliseconds) {
          return "+WHOAWH-OA-ISTOO:FA:RA.WAYZ";
        }

        const date = new Date(millisecondsSinceEpoch);
        return date.toLocaleDateString("en-US", isOnlyDate ? onlyDate : dateWithTime);
      } // date to ticks


      if (Object.prototype.toString.call(data) === "[object Date]" && typeof data !== "string") {
        let ticks = data.getTime() * ticksPerMillisecond + epochTicks;
        return ticks;
      }

      return "";
    };

    this.OnGetFilterValueNumber = (operator, value) => {
      this._onHandleSendFilterObj(operator, value);
    };

    this.OnGetFilterValueString = (operator, value) => {
      this._onHandleSendFilterObj(operator, value);
    };

    this.OnGetFilterValueBoolean = (operator, value) => {
      this._onHandleSendFilterObj(operator, value);
    };

    this.OnGetFilterValueDate = (operator, value) => {
      if (this.props.filterWithTicks) {
        if (Array.isArray(value)) {
          let result = value.map(val => {
            let ticks = this.onConvertBetweenDateAndTicks(val.date);
            let item = {
              date: ticks
            };
            return item;
          });
          return this._onHandleSendFilterObj(operator, result);
        }

        if (!Array.isArray(value)) {
          let ticks = this.onConvertBetweenDateAndTicks(value);
          return this._onHandleSendFilterObj(operator, ticks);
        }
      }

      return this._onHandleSendFilterObj(operator, value);
    };

    this.RenderFormByType = () => {
      if (this.props.targetColumn && this.props.targetColumn.data) {
        switch (this.props.targetColumn.data) {
          case "number":
            return /*#__PURE__*/React.createElement(_Number.default, {
              rcName: this.props.rcName,
              darkMode: this.props.darkMode,
              OnGetFilterValue: this.OnGetFilterValueNumber,
              filterQuery: this.props.filterQuery,
              workingColumn: this.props.workingColumn
            });

          case "string":
            return /*#__PURE__*/React.createElement(_String.default, {
              rcName: this.props.rcName,
              darkMode: this.props.darkMode,
              OnGetFilterValue: this.OnGetFilterValueString,
              filterQuery: this.props.filterQuery,
              workingColumn: this.props.workingColumn
            });

          case "date":
            return /*#__PURE__*/React.createElement(_Date.default, {
              rcName: this.props.rcName,
              darkMode: this.props.darkMode,
              OnGetFilterValue: this.OnGetFilterValueDate
            });

          case "boolean":
            return /*#__PURE__*/React.createElement(_Boolean.default, {
              rcName: this.props.rcName,
              darkMode: this.props.darkMode,
              OnGetFilterValue: this.OnGetFilterValueBoolean,
              column: this.props.targetColumn,
              filterQuery: this.props.filterQuery,
              workingColumn: this.props.workingColumn
            });

          case "boolean|string":
            return /*#__PURE__*/React.createElement(_Boolean.default, {
              rcName: this.props.rcName,
              darkMode: this.props.darkMode,
              OnGetFilterValue: this.OnGetFilterValueBoolean,
              column: this.props.targetColumn,
              filterQuery: this.props.filterQuery,
              workingColumn: this.props.workingColumn
            });

          default:
            return;
        }
      }
    };
  }

  render() {
    const nameAttibute = "data-rc-id";
    let dataWrapper = {
      [nameAttibute]: "frm.filter.panel.".concat(this.props.rcName)
    };
    return /*#__PURE__*/React.createElement(_PanelStyle.PanelWrapper, _extends({
      className: "PanelWrapper"
    }, dataWrapper), this.RenderFormByType());
  }

}

exports.default = PanelContent;