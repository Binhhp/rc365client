import * as React from "react";
import { INodes, ITreeState, ITreeProps } from "./FinalTreeInterface";
declare class Tree extends React.Component<ITreeProps, ITreeState> {
    constructor(props: ITreeProps);
    componentDidMount(): void;
    onCheckDefaultChecked: (rootData?: INodes[] | undefined) => Promise<void>;
    onFindNodeInState: (node: INodes, loopData?: INodes[] | undefined) => void;
    onExpandsTree: (node: INodes) => Promise<void>;
    onCheckedNode: (node: INodes) => Promise<void>;
    onCheckAllChild: (node: INodes, repo?: INodes[] | undefined) => Promise<void>;
    onCheckParentState: (node: INodes) => Promise<boolean[] | undefined>;
    onCheckedParent: (node: INodes, rootData?: INodes[] | undefined) => Promise<void>;
    onSetStateCurrentNodes: (node: INodes, type?: string | undefined) => Promise<void>;
    render(): JSX.Element;
}
export default Tree;
