import * as React from "react";
import { IHOC } from "./ListStyle";
import { DetailsListDocumentsExample } from "./ListCustom";
import { IDataSource } from "./interface/IDataSource";

export default class ListCustom extends React.Component<
  IHOC,
  { itemHeight: number; viewPort: number }
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IHOC) {
    super(props);
    this.state = {
      itemHeight: 0,
      viewPort: 0,
    };
    this.Action = React.createRef();
  }

  componentDidMount() {
    let nameDiv: string = `HOC-wrapper-${
      this.props.rcName ? this.props.rcName : undefined
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

  onHandleQueryDataByClassType = async (
    isLazy?: boolean,
    isReplace?: boolean
  ) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType(isLazy, isReplace);
  };

  onHandleQueryClassSource = async (source: any[], index: number) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryClassSource(source, index);
  };

  render() {
    return (
      <div
        id={`HOC-wrapper-${this.props.rcName ? this.props.rcName : undefined}`}
        style={{ width: "100%", height: "100%" }}
      >
        {this.state.itemHeight > 0 && (
          <DetailsListDocumentsExample
            {...this.props}
            itemCount={this.state.itemHeight}
            viewPort={this.state.viewPort}
            ref={this.Action}
          />
        )}
      </div>
    );
  }
}
