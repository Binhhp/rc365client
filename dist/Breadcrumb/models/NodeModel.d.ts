export interface ICloneable<T> {
    Clone(): T;
    ToDto?: () => any;
}
export declare class NodeDto {
    id: string;
    text: string;
    parentId: number | string;
    parentNode: BaseNode | null;
    node: BaseNode | null;
    child: BaseNode[];
    url: string;
    data: any;
    isSelected: boolean;
    hasChild: boolean;
    isRoot: boolean;
}
export declare class BaseNode implements ICloneable<BaseNode> {
    protected _id: string;
    protected _text: string;
    protected _parentId: number | string;
    protected _parentNode: BaseNode | null;
    protected _node: BaseNode | null;
    protected _child: BaseNode[];
    protected _url: string;
    protected _data: any;
    protected _isSelected: boolean;
    protected _hasChild: boolean;
    protected _isRoot: boolean;
    constructor(dto?: NodeDto);
    get id(): string;
    set id(v: string);
    get text(): string;
    set text(v: string);
    get url(): string;
    set url(v: string);
    get data(): any;
    set data(v: any);
    get isSelected(): boolean;
    set isSelected(v: boolean);
    get hasChild(): boolean;
    set hasChild(v: boolean);
    get parentNode(): BaseNode | null;
    set parentNode(v: BaseNode | null);
    get node(): BaseNode | null;
    set node(v: BaseNode | null);
    get isRoot(): boolean;
    set isRoot(v: boolean);
    get child(): BaseNode[];
    set child(v: BaseNode[]);
    get parentId(): number | string;
    set parentId(v: number | string);
    Clone(): BaseNode;
    ToDto(): NodeDto;
}
//# sourceMappingURL=NodeModel.d.ts.map