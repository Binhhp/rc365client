import * as React from "react";
import { INodes } from "./FinalTreeInterface";
declare class TreeNode extends React.Component<INodes> {
    onRenderChildNode: (props: INodes[], theme?: string | undefined, parentNode?: INodes | undefined, onExpands?: ((node: INodes) => void) | undefined, onChecked?: ((node: INodes) => void) | undefined, multilingual?: {
        textKey: string;
        context: string;
    }[] | undefined) => JSX.Element | undefined;
    onRenderNode: (props: INodes, theme?: string | undefined) => JSX.Element;
    render(): JSX.Element;
}
export default TreeNode;
