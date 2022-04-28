import * as React from "react";
import { INodeProps, INodeStates } from "./BreadNodeModel";
import { BaseNode } from "../models/NodeModel";
declare class Node extends React.Component<INodeProps, INodeStates> {
    constructor(props: INodeProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: INodeProps, prevState: INodeStates): void;
    private _onHandleDropdown;
    onHandleSelectNode: (id: string) => Promise<void>;
    RenderChild: (child: BaseNode[]) => JSX.Element | undefined;
    RenderNode: (props: INodeProps) => JSX.Element;
    render(): JSX.Element;
}
export default Node;
//# sourceMappingURL=index.d.ts.map