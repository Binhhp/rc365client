import * as React from "react";
import { BreadcrumbWrapper } from "./BreadcrumbStyle";
import { IBreadCrumbProps, IBreadCrumdStates } from "./BreadCrumbModel";
import BreadNode from "./BreadNode";
import { BaseNode } from "./models/NodeModel";
import { INodes } from "./models/NodeProps";

const nameAttibute = "data-rc-id";

class Breadcrumd extends React.Component<IBreadCrumbProps, IBreadCrumdStates> {
  constructor(props: IBreadCrumbProps) {
    super(props);
    this.state = {
      Nodes: [],
    };
  }

  componentDidMount() {
    if (this.props.nodes.length > 0) {
      this._BuildNodesState();
    }
  }

  componentDidUpdate(prevProps: IBreadCrumbProps) {
    if (this.props.nodes !== prevProps.nodes) {
      this._BuildNodesState();
    }
  }

  shouldComponentUpdate(
    nextProps: IBreadCrumbProps,
    nextState: IBreadCrumdStates
  ) {
    return (
      this.props.nodes !== nextProps.nodes ||
      this.props.darkMode !== nextProps.darkMode ||
      this.state.Nodes !== nextState.Nodes
    );
  }

  private _BuildNodesState = () => {
    let rs = this._onHandleBuildINodesToBaseNode(this.props.nodes);
    rs.forEach((n, i) => {
      let childs = rs.filter((c) => c.parentId === n.id);
      if (childs.length > 0) {
        n.hasChild = true;
        n.child = childs;
      }
      if (n.parentId !== "#") {
        let node = rs.find((item) => item.id === n.parentId);
        n.parentNode = node ? node : null;
      }
      n.node = n;
    });
    this.setState({ Nodes: rs });
  };

  private _onHandleBuildINodesToBaseNode = (nodes: INodes[]) => {
    let crtNodes = [...nodes];
    let result = crtNodes.map((node) => {
      let newNode = new BaseNode();
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

  private _onHandleBuildBaseNodeToINodes = () => {
    let crtNodes = [...this.state.Nodes];
    let result: INodes[] = crtNodes.map((n) => {
      let node = new INodes();
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

  private _onHandleChangeStatusAllChildById = (
    id: string,
    nodes?: BaseNode[]
  ) => {
    let crtNodes = nodes ? [...nodes] : [...this.state.Nodes];
    let idxNode = crtNodes.findIndex((n) => n.id === id);
    if (idxNode !== -1 && crtNodes[idxNode].parentId === id) {
      crtNodes[idxNode].isSelected = false;
    }
    if (
      idxNode !== -1 &&
      crtNodes[idxNode].parentId === id &&
      crtNodes[idxNode].hasChild
    ) {
      this._onHandleChangeStatusAllChildById(crtNodes[idxNode].id, crtNodes);
    }
    if (
      idxNode !== -1 &&
      crtNodes[idxNode].parentId === id &&
      !crtNodes[idxNode].hasChild
    ) {
      return crtNodes;
    }
    return crtNodes;
  };

  private _onHandleChangeChildNodes = (id: string) => {
    let crtNodes = [...this.state.Nodes];
    let node = crtNodes.find((n) => n.id === id);
    if (node) {
      // case click root
      if (node.parentId === "#") {
        let newNodes = crtNodes.map((n) => {
          n.isSelected = false;
          return n;
        });
        return newNodes;
      }
      // case not root
      if (node.parentId !== "#" && node.parentId === id) {
        let newNodes = this._onHandleChangeStatusAllChildById(id);
        return newNodes;
      }
    }
    return crtNodes;
  };

  private _onHandleChangeChildNode = (id: string) => {
    let crtNodes = [...this.state.Nodes];
    crtNodes.forEach((n) => {
      if (n.parentId === id) {
        n.isSelected = false;
      }
      if (n.parentId === id && n.child.length > 0) {
        this._onHandleChangeChildNode(id);
      }
    });
    return crtNodes;
  };

  onBuildAndSendNodes = async () => {
    if (this.props.onGetCurrentNodes) {
      let rs = await this._onHandleBuildBaseNodeToINodes();
      await this.props.onGetCurrentNodes(rs);
    }
  };

  onHandleSelectedNode = async (id: string) => {
    let crtNodes = [...this.state.Nodes];
    let index = crtNodes.findIndex((n) => n.id === id);
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
      this.setState({ Nodes: crtNodes }, () => this.onBuildAndSendNodes());
    }
  };

  render() {
    const breadWrapper = {
      [nameAttibute]: `bre${
        this.props.rcName ? `.${this.props.rcName}` : ""
      }.wrapper`,
    };
    return (
      <BreadcrumbWrapper {...breadWrapper} className="BreadcrumbWrapper">
        {this.state.Nodes.length > 0 &&
          this.state.Nodes.map((item) => {
            if (item.isRoot) {
              return (
                <BreadNode
                  numberNodes={this.state.Nodes.length}
                  node={item}
                  rcName={this.props.rcName}
                  darkMode={this.props.darkMode}
                  key={item.id}
                  onHandleSelectNode={this.onHandleSelectedNode}
                  isRedirect={this.props.isRedirect}
                />
              );
            } else {
              return <div key={item.id}></div>;
            }
          })}
      </BreadcrumbWrapper>
    );
  }
}

export default Breadcrumd;
