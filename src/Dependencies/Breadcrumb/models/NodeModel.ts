export interface ICloneable<T> {
  Clone(): T;
  ToDto?: () => any;
}

export class NodeDto {
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

export class BaseNode implements ICloneable<BaseNode> {
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
  constructor(dto?: NodeDto) {
    if (dto) {
      this._id = dto.id || "";
      this._text = dto.text || "";
      this._parentId = dto.parentId || "#";
      this._parentNode = dto.parentNode || null;
      this._node = dto.node || null;
      this._child = dto.child || [];
      this._url = dto.url || "";
      this._data = dto.data || "";
      this._isSelected = dto.isSelected || false;
      this._hasChild = dto.hasChild || false;
      this._isRoot = dto.isRoot || false;
    } else {
      this._id = "";
      this._text = "";
      this._parentId = "#";
      this._parentNode = null;
      this._node = null;
      this._child = [];
      this._url = "";
      this._data = "";
      this._isSelected = false;
      this._hasChild = false;
      this._isRoot = false;
    }
  }
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
  }
  public get text(): string {
    return this._text;
  }
  public set text(v: string) {
    this._text = v;
  }
  public get url(): string {
    return this._url;
  }
  public set url(v: string) {
    this._url = v;
  }
  public get data(): any {
    return this._data;
  }
  public set data(v: any) {
    this._data = v;
  }
  public get isSelected(): boolean {
    return this._isSelected;
  }
  public set isSelected(v: boolean) {
    this._isSelected = v;
  }
  public get hasChild(): boolean {
    return this._hasChild;
  }
  public set hasChild(v: boolean) {
    this._hasChild = v;
  }
  public get parentNode(): BaseNode | null {
    return this._parentNode;
  }
  public set parentNode(v: BaseNode | null) {
    this._parentNode = v;
  }
  public get node(): BaseNode | null {
    return this._node;
  }
  public set node(v: BaseNode | null) {
    this._node = v;
  }
  public get isRoot(): boolean {
    return this._isRoot;
  }
  public set isRoot(v: boolean) {
    this._isRoot = v;
  }
  public get child(): BaseNode[] {
    return this._child;
  }
  public set child(v: BaseNode[]) {
    this._child = v;
  }
  public get parentId(): number | string {
    return this._parentId;
  }
  public set parentId(v: number | string) {
    this._parentId = v;
  }
  Clone(): BaseNode {
    let dto = this.ToDto();
    return new BaseNode(dto);
  }
  ToDto(): NodeDto {
    return {
      id: this._id,
      text: this._text,
      parentId: this._parentId,
      parentNode: this._parentNode,
      child: this._child,
      url: this._url,
      data: this._data,
      isSelected: this._isSelected,
      hasChild: this._hasChild,
      isRoot: this._isRoot,
      node: this._node,
    };
  }
}
