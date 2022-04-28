import * as React from "react";
import { NodeWrapper } from "./BreadNodeStyle";
import { INodeProps, INodeStates } from "./BreadNodeModel";
import { Icon } from "../../@uifabric/icons/Icon";
import { BaseNode } from "../models/NodeModel";
import Button from "../../Button";
import Dropdown from "../../Dropdown/CustomDropdown";
import { IDropdownOption } from "../../Dropdown";
import { Redirect } from "react-router-dom";

class Node extends React.Component<INodeProps, INodeStates> {
  constructor(props: INodeProps) {
    super(props);
    this.state = {
      options: [],
      redirect: false,
    };
  }

  componentDidMount() {
    if (this.props.nodes) {
      let result: IDropdownOption[] = this.props.nodes.map((i) => {
        return { key: i.id, text: i.text, data: i.data };
      });
      this.setState({
        options: result,
      });
    }
  }

  componentDidUpdate(prevProps: INodeProps, prevState: INodeStates) {
    if (this.state.redirect) {
      this.setState({ redirect: false });
    }
  }

  private _onHandleDropdown = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option && option.id) {
      this.props.onHandleSelectNode(option.id);
      if (
        !this.state.redirect &&
        this.props.isRedirect &&
        this.props.node.child.length > 0
      ) {
        this.setState({ redirect: true });
      }
    }
  };

  onHandleSelectNode = async (id: string) => {
    await this.props.onHandleSelectNode(id);
    if (
      !this.state.redirect &&
      this.props.isRedirect &&
      this.props.node.child.length > 0
    ) {
      this.setState({ redirect: true });
    }
  };

  RenderChild = (child: BaseNode[]) => {
    let index = child.length > 0 ? child.findIndex((n) => n.isSelected) : -1;
    let childNode = index !== -1 ? child[index] : child[0];
    if (child.length > 0) {
      return (
        <Node
          numberNodes={this.props.numberNodes}
          node={childNode}
          nodes={child}
          rcName={this.props.rcName}
          darkMode={this.props.darkMode}
          key={childNode.id}
          onHandleSelectNode={this.props.onHandleSelectNode}
          isRedirect={this.props.isRedirect}
        />
      );
    }
  };

  RenderNode = (props: INodeProps) => {
    let crtNode = this.props.node.Clone() as BaseNode;
    let options = [...this.state.options];
    let index =
      this.props.nodes && this.props.nodes.length > 0
        ? this.props.nodes.findIndex((n) => n.isSelected)
        : -1;
    let text =
      this.props.nodes && this.props.nodes.length > 0 && index !== -1
        ? this.props.nodes[index].text
        : this.props.nodes && this.props.nodes.length > 0 && index === -1
        ? this.props.nodes[0].text
        : "";
    return (
      <div className="node__item">
        {!crtNode.isRoot && (
          <Icon iconName="ChevronRight" className="node__icon" />
        )}
        <div className="note__main">
          {this.props.nodes && this.props.nodes.length > 1 ? (
            <Dropdown
              className="selectDrop"
              placeholder={text}
              options={options}
              onChange={this._onHandleDropdown}
              darkMode={props.darkMode}
              rcName={`${props.rcName}.${text}`}
            />
          ) : (
            <Button
              className={`${
                this.props.node.isRoot || this.props.node.child.length > 0
                  ? "note__root"
                  : "note__child"
              }`}
              darkMode={this.props.darkMode}
              rcName={`${this.props.rcName}.${crtNode.text}`}
              text={crtNode.text}
              onClick={() => this.onHandleSelectNode(crtNode.id)}
            />
          )}
        </div>
        {crtNode.isSelected && this.RenderChild(crtNode.child)}
      </div>
    );
  };

  render() {
    if (
      this.state.redirect &&
      this.props.isRedirect &&
      this.props.node.child.length > 0
    ) {
      return <Redirect to={`/${this.props.node.url}`} />;
    }
    return (
      <NodeWrapper className="NodeWrapper" theme={this.props.darkMode}>
        {this.RenderNode(this.props)}
      </NodeWrapper>
    );
  }
}

export default Node;
