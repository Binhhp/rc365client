import * as React from "react";
import { MainList } from "./Main";
import { IListProps, IListStates } from "./ListModel";

export default class ListCustom extends React.Component<
  IListProps,
  IListStates
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: any) {
    super(props);
    this.state = {
      itemHeight: 0,
      viewPort: 0,
    };
    this.Action = React.createRef();
  }

  componentDidMount() {
    let nameDiv: string = `HOC-wrapper${
      this.props.rcName ? `-${this.props.rcName}` : undefined
    }`;
    let itemHeight = document.getElementById(nameDiv)?.clientHeight;
    let viewPort = document.getElementById(nameDiv)?.clientWidth;
    let count = 0;
    if (itemHeight && viewPort) {
      count = this.props.groups
        ? Math.floor((itemHeight + 49 * this.props.groups.length) / 43 + 2)
        : Math.floor(itemHeight / 43 + 2);
      this.setState({
        itemHeight: count,
        viewPort: viewPort - 17,
      });
    }
  }

  onHandleQueryDataByClassType = async (isLazy?: boolean) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType(isLazy);
  };

  onHandleUpdateDataCaseFirst = async (source: any[]) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleUpdateDataCaseFirst(source);
  };

  onHandleUpdateDataCaseLazy = async (source: any[], page?: number) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleUpdateDataCaseLazy(source, page);
  };

  onHandleQueryClassSource = async (
    source: any[],
    page?: number,
    isLazy?: boolean
  ) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryClassSource(source, page, isLazy);
  };

  render() {
    return (
      <div
        id={`HOC-wrapper${
          this.props.rcName ? `-${this.props.rcName}` : undefined
        }`}
        className={`HOC-wrapper ${this.props.className || ""}`}
        style={{ width: "100%", height: "100%" }}
      >
        <MainList
          {...this.props}
          onHandleItems={this.props.onHandleItems}
          skipNumber={this.state.itemHeight}
          viewPort={this.state.viewPort}
          ref={this.Action}
        />
      </div>
    );
  }
}
