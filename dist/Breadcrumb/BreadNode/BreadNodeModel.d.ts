import { BaseNode } from "../models/NodeModel";
import { IDropdownOption } from "../../Dropdown";
export interface INodeProps {
    darkMode?: string;
    rcName?: string;
    node: BaseNode;
    nodes?: BaseNode[];
    onHandleSelectNode: (id: string) => void;
    isRedirect?: boolean;
    numberNodes: number;
}
export interface INodeStates {
    options: IDropdownOption[];
    redirect: boolean;
}
//# sourceMappingURL=BreadNodeModel.d.ts.map