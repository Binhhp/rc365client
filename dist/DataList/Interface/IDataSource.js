"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = exports.DataListSource = void 0;

class Request {}

exports.Request = Request;

class DataListSource {
  constructor(dto) {
    if (dto) {
      this._source = dto.source || [];
      this._nextLink = dto.nextLink || "";
      this._receiveBySinalR = dto.receiveBySinalR || false;
    } else {
      this._source = [];
      this._nextLink = "";
      this._receiveBySinalR = false;
    }
  }

  set source(v) {
    this._source = v;
  }

  get source() {
    return this._source;
  }

  set nextLink(v) {
    this._nextLink = v;
  }

  get nextLink() {
    return this._nextLink;
  }

  set receiveBySinalR(v) {
    this._receiveBySinalR = v;
  }

  get receiveBySinalR() {
    return this._receiveBySinalR;
  }

}

exports.DataListSource = DataListSource;