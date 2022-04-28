"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeDto = exports.BaseNode = void 0;

class NodeDto {}

exports.NodeDto = NodeDto;

class BaseNode {
  constructor(dto) {
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

  get id() {
    return this._id;
  }

  set id(v) {
    this._id = v;
  }

  get text() {
    return this._text;
  }

  set text(v) {
    this._text = v;
  }

  get url() {
    return this._url;
  }

  set url(v) {
    this._url = v;
  }

  get data() {
    return this._data;
  }

  set data(v) {
    this._data = v;
  }

  get isSelected() {
    return this._isSelected;
  }

  set isSelected(v) {
    this._isSelected = v;
  }

  get hasChild() {
    return this._hasChild;
  }

  set hasChild(v) {
    this._hasChild = v;
  }

  get parentNode() {
    return this._parentNode;
  }

  set parentNode(v) {
    this._parentNode = v;
  }

  get node() {
    return this._node;
  }

  set node(v) {
    this._node = v;
  }

  get isRoot() {
    return this._isRoot;
  }

  set isRoot(v) {
    this._isRoot = v;
  }

  get child() {
    return this._child;
  }

  set child(v) {
    this._child = v;
  }

  get parentId() {
    return this._parentId;
  }

  set parentId(v) {
    this._parentId = v;
  }

  Clone() {
    let dto = this.ToDto();
    return new BaseNode(dto);
  }

  ToDto() {
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
      node: this._node
    };
  }

}

exports.BaseNode = BaseNode;