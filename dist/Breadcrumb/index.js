"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var React = _interopRequireWildcard(require("react"));

var _BreadcrumbStyle = require("./BreadcrumbStyle");

var _BreadNode = _interopRequireDefault(require("./BreadNode"));

var _NodeModel = require("./models/NodeModel");

var _NodeProps = require("./models/NodeProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const nameAttibute = "data-rc-id";

class Breadcrumd extends React.Component {
  constructor(props) {
    super(props);

    this._BuildNodesState = () => {
      let rs = this._onHandleBuildINodesToBaseNode(this.props.nodes);

      rs.forEach((n, i) => {
        let childs = rs.filter(c => c.parentId === n.id);

        if (childs.length > 0) {
          n.hasChild = true;
          n.child = childs;
        }

        if (n.parentId !== "#") {
          let node = rs.find(item => item.id === n.parentId);
          n.parentNode = node ? node : null;
        }

        n.node = n;
      });
      this.setState({
        Nodes: rs
      });
    };

    this._onHandleBuildINodesToBaseNode = nodes => {
      let crtNodes = [...nodes];
      let result = crtNodes.map(node => {
        let newNode = new _NodeModel.BaseNode();
        newNode.id = node.id;
        newNode.text = node.text;
        newNode.url = node.url || "";
        newNode.isSelected = node.isSelected;
        newNode.parentId = node.parentId;
        newNode.isRoot = node.parentId === "#" ? true : false;
        newNode.data = node.data ? node.data : null;
        return newNode;
      });
      return result;
    };

    this._onHandleBuildBaseNodeToINodes = () => {
      let crtNodes = [...this.state.Nodes];
      let result = crtNodes.map(n => {
        let node = new _NodeProps.INodes();
        node.id = n.id;
        node.isSelected = n.isSelected;
        node.data = n.data;
        node.url = n.url;
        node.text = n.text;
        node.parentId = n.parentId;
        return node;
      });
      return result;
    };

    this._onHandleChangeStatusAllChildById = (id, nodes) => {
      let crtNodes = nodes ? [...nodes] : [...this.state.Nodes];
      let idxNode = crtNodes.findIndex(n => n.id === id);

      if (idxNode !== -1 && crtNodes[idxNode].parentId === id) {
        crtNodes[idxNode].isSelected = false;
      }

      if (idxNode !== -1 && crtNodes[idxNode].parentId === id && crtNodes[idxNode].hasChild) {
        this._onHandleChangeStatusAllChildById(crtNodes[idxNode].id, crtNodes);
      }

      if (idxNode !== -1 && crtNodes[idxNode].parentId === id && !crtNodes[idxNode].hasChild) {
        return crtNodes;
      }

      return crtNodes;
    };

    this._onHandleChangeChildNodes = id => {
      let crtNodes = [...this.state.Nodes];
      let node = crtNodes.find(n => n.id === id);

      if (node) {
        // case click root
        if (node.parentId === "#") {
          let newNodes = crtNodes.map(n => {
            n.isSelected = false;
            return n;
          });
          return newNodes;
        } // case not root


        if (node.parentId !== "#" && node.parentId === id) {
          let newNodes = this._onHandleChangeStatusAllChildById(id);

          return newNodes;
        }
      }

      return crtNodes;
    };

    this._onHandleChangeChildNode = id => {
      let crtNodes = [...this.state.Nodes];
      crtNodes.forEach(n => {
        if (n.parentId === id) {
          n.isSelected = false;
        }

        if (n.parentId === id && n.child.length > 0) {
          this._onHandleChangeChildNode(id);
        }
      });
      return crtNodes;
    };

    this.onBuildAndSendNodes = async () => {
      if (this.props.onGetCurrentNodes) {
        let rs = await this._onHandleBuildBaseNodeToINodes();
        await this.props.onGetCurrentNodes(rs);
      }
    };

    this.onHandleSelectedNode = async id => {
      let crtNodes = [...this.state.Nodes];
      let index = crtNodes.findIndex(n => n.id === id);

      if (index !== -1) {
        let selectedNode = crtNodes[index];

        if (selectedNode.isSelected === true) {
          // check false for all child of this node
          // let newNodes = await this._onHandleChangeChildNode(selectedNode.id);
          let newNodes = this._onHandleChangeChildNodes(selectedNode.id);

          crtNodes = newNodes;
        }

        selectedNode.isSelected = !selectedNode.isSelected;
        crtNodes[index] = selectedNode;
        this.setState({
          Nodes: crtNodes
        }, () => this.onBuildAndSendNodes());
      }
    };

    this.state = {
      Nodes: []
    };
  }

  componentDidMount() {
    if (this.props.nodes.length > 0) {
      this._BuildNodesState();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.nodes !== prevProps.nodes) {
      this._BuildNodesState();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.nodes !== nextProps.nodes || this.props.darkMode !== nextProps.darkMode || this.state.Nodes !== nextState.Nodes;
  }

  render() {
    const breadWrapper = {
      [nameAttibute]: "bre".concat(this.props.rcName ? ".".concat(this.props.rcName) : "", ".wrapper")
    };
    return /*#__PURE__*/React.createElement(_BreadcrumbStyle.BreadcrumbWrapper, _extends({}, breadWrapper, {
      className: "BreadcrumbWrapper"
    }), this.state.Nodes.length > 0 && this.state.Nodes.map(item => {
      if (item.isRoot) {
        return /*#__PURE__*/React.createElement(_BreadNode.default, {
          numberNodes: this.state.Nodes.length,
          node: item,
          rcName: this.props.rcName,
          darkMode: this.props.darkMode,
          key: item.id,
          onHandleSelectNode: this.onHandleSelectedNode,
          isRedirect: this.props.isRedirect
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: item.id
        });
      }
    }));
  }

}

var _default = Breadcrumd;
exports.default = _default;