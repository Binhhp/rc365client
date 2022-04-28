import * as React from "react";
import { IBreadCrumbProps, IBreadCrumdStates } from "./BreadCrumbModel";
declare class Breadcrumd extends React.Component<IBreadCrumbProps, IBreadCrumdStates> {
    constructor(props: IBreadCrumbProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IBreadCrumbProps): void;
    shouldComponentUpdate(nextProps: IBreadCrumbProps, nextState: IBreadCrumdStates): boolean;
    private _BuildNodesState;
    private _onHandleBuildINodesToBaseNode;
    private _onHandleBuildBaseNodeToINodes;
    private _onHandleChangeStatusAllChildById;
    private _onHandleChangeChildNodes;
    private _onHandleChangeChildNode;
    onBuildAndSendNodes: () => Promise<void>;
    onHandleSelectedNode: (id: string) => Promise<void>;
    render(): JSX.Element;
}
export default Breadcrumd;
//# sourceMappingURL=index.d.ts.map