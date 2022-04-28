export interface ITreeProps {
    childNodes: INodes[];
    darkMode?: string;
    onGetChecked?: (value: INodes[]) => void;
    multilingual?: {
        textKey: string;
        context: string;
    }[];
}
export interface ITreeState {
    NodesList: INodes[];
    myNodes: INodes | null;
    currentNodes: INodes[];
}
export interface INodes {
    childNodes: INodes[];
    label: string;
    id: string;
    isIndeterminate?: boolean;
    isAllChildSelected?: boolean;
    isChecked?: boolean;
    isDisable?: boolean;
    isExpand?: boolean;
    parentNode?: INodes | null;
    theme?: string;
    node?: INodes;
    onExpands?: (node: INodes) => void;
    onChecked?: (node: INodes) => void;
    multilingual?: {
        textKey: string;
        context: string;
    }[];
}
export declare const ItemWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
