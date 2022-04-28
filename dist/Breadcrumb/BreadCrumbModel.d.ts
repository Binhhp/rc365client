import { BaseNode } from "./models/NodeModel";
import { INodes } from "./models/NodeProps";
export interface IBreadCrumbProps {
    darkMode?: string;
    rcName?: string;
    nodes: INodes[];
    onGetCurrentNodes?: (nodes: INodes[]) => void;
    isRedirect?: boolean;
}
export interface IBreadCrumdStates {
    Nodes: BaseNode[];
}
//# sourceMappingURL=BreadCrumbModel.d.ts.map