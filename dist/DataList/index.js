"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var React = _interopRequireWildcard(require("react"));

var _Main = require("./Main");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class ListCustom extends React.Component {
  constructor(props) {
    super(props);

    this.onHandleQueryDataByClassType = async isLazy => {
      if (!this.Action.current) {
        return;
      }

      await this.Action.current.onHandleQueryDataByClassType(isLazy);
    };

    this.onHandleUpdateDataCaseFirst = async source => {
      if (!this.Action.current) {
        return;
      }

      await this.Action.current.onHandleUpdateDataCaseFirst(source);
    };

    this.onHandleUpdateDataCaseLazy = async (source, page) => {
      if (!this.Action.current) {
        return;
      }

      await this.Action.current.onHandleUpdateDataCaseLazy(source, page);
    };

    this.onHandleQueryClassSource = async (source, page, isLazy) => {
      if (!this.Action.current) {
        return;
      }

      await this.Action.current.onHandleQueryClassSource(source, page, isLazy);
    };

    this.state = {
      itemHeight: 0,
      viewPort: 0
    };
    this.Action = /*#__PURE__*/React.createRef();
  }

  componentDidMount() {
    var _document$getElementB, _document$getElementB2;

    let nameDiv = "HOC-wrapper".concat(this.props.rcName ? "-".concat(this.props.rcName) : undefined);
    let itemHeight = (_document$getElementB = document.getElementById(nameDiv)) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.clientHeight;
    let viewPort = (_document$getElementB2 = document.getElementById(nameDiv)) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.clientWidth;
    let count = 0;

    if (itemHeight && viewPort) {
      count = this.props.groups ? Math.floor((itemHeight + 49 * this.props.groups.length) / 43 + 2) : Math.floor(itemHeight / 43 + 2);
      this.setState({
        itemHeight: count,
        viewPort: viewPort - 17
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "HOC-wrapper".concat(this.props.rcName ? "-".concat(this.props.rcName) : undefined),
      className: "HOC-wrapper ".concat(this.props.className || ""),
      style: {
        width: "100%",
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(_Main.MainList, _extends({}, this.props, {
      onHandleItems: this.props.onHandleItems,
      skipNumber: this.state.itemHeight,
      viewPort: this.state.viewPort,
      ref: this.Action
    })));
  }

}

exports.default = ListCustom;