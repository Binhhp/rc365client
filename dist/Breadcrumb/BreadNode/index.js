"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

var React = _interopRequireWildcard(require("react"));

var _BreadNodeStyle = require("./BreadNodeStyle");

var _Icon = require("../../@uifabric/icons/Icon");

var _Button = _interopRequireDefault(require("../../Button"));

var _CustomDropdown = _interopRequireDefault(require("../../Dropdown/CustomDropdown"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Node extends React.Component {
  constructor(_props) {
    super(_props);

    this._onHandleDropdown = (event, option, index) => {
      if (option && option.id) {
        this.props.onHandleSelectNode(option.id);

        if (!this.state.redirect && this.props.isRedirect && this.props.node.child.length > 0) {
          this.setState({
            redirect: true
          });
        }
      }
    };

    this.onHandleSelectNode = async id => {
      await this.props.onHandleSelectNode(id);

      if (!this.state.redirect && this.props.isRedirect && this.props.node.child.length > 0) {
        this.setState({
          redirect: true
        });
      }
    };

    this.RenderChild = child => {
      let index = child.length > 0 ? child.findIndex(n => n.isSelected) : -1;
      let childNode = index !== -1 ? child[index] : child[0];

      if (child.length > 0) {
        return /*#__PURE__*/React.createElement(Node, {
          numberNodes: this.props.numberNodes,
          node: childNode,
          nodes: child,
          rcName: this.props.rcName,
          darkMode: this.props.darkMode,
          key: childNode.id,
          onHandleSelectNode: this.props.onHandleSelectNode,
          isRedirect: this.props.isRedirect
        });
      }
    };

    this.RenderNode = props => {
      let crtNode = this.props.node.Clone();
      let options = [...this.state.options];
      let index = this.props.nodes && this.props.nodes.length > 0 ? this.props.nodes.findIndex(n => n.isSelected) : -1;
      let text = this.props.nodes && this.props.nodes.length > 0 && index !== -1 ? this.props.nodes[index].text : this.props.nodes && this.props.nodes.length > 0 && index === -1 ? this.props.nodes[0].text : "";
      return /*#__PURE__*/React.createElement("div", {
        className: "node__item"
      }, !crtNode.isRoot && /*#__PURE__*/React.createElement(_Icon.Icon, {
        iconName: "ChevronRight",
        className: "node__icon"
      }), /*#__PURE__*/React.createElement("div", {
        className: "note__main"
      }, this.props.nodes && this.props.nodes.length > 1 ? /*#__PURE__*/React.createElement(_CustomDropdown.default, {
        className: "selectDrop",
        placeholder: text,
        options: options,
        onChange: this._onHandleDropdown,
        darkMode: props.darkMode,
        rcName: "".concat(props.rcName, ".").concat(text)
      }) : /*#__PURE__*/React.createElement(_Button.default, {
        className: "".concat(this.props.node.isRoot || this.props.node.child.length > 0 ? "note__root" : "note__child"),
        darkMode: this.props.darkMode,
        rcName: "".concat(this.props.rcName, ".").concat(crtNode.text),
        text: crtNode.text,
        onClick: () => this.onHandleSelectNode(crtNode.id)
      })), crtNode.isSelected && this.RenderChild(crtNode.child));
    };

    this.state = {
      options: [],
      redirect: false
    };
  }

  componentDidMount() {
    if (this.props.nodes) {
      let result = this.props.nodes.map(i => {
        return {
          key: i.id,
          text: i.text,
          data: i.data
        };
      });
      this.setState({
        options: result
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.redirect) {
      this.setState({
        redirect: false
      });
    }
  }

  render() {
    if (this.state.redirect && this.props.isRedirect && this.props.node.child.length > 0) {
      return /*#__PURE__*/React.createElement(_reactRouterDom.Redirect, {
        to: "/".concat(this.props.node.url)
      });
    }

    return /*#__PURE__*/React.createElement(_BreadNodeStyle.NodeWrapper, {
      className: "NodeWrapper",
      theme: this.props.darkMode
    }, this.RenderNode(this.props));
  }

}

var _default = Node;
exports.default = _default;