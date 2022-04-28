import { IObjectFilter, IObjectSort } from "../ListStyle";

export class Request {}

export interface IDataSource {
  GetData: (
    pageIndex: number,
    skipNumber: number,
    nextLink: string | null,
    defaultURL: string,
    endpoint?: string
  ) => Promise<any[]>;
}

export class StaticDataSource implements IDataSource {
  protected _source: any[];
  constructor(source?: any[]) {
    if (source) {
      this._source = source;
    } else {
      this._source = [];
    }
  }
  public set source(v: any[]) {
    this._source = v;
  }
  public get source(): any[] {
    return this._source;
  }
  GetData: (
    pageIndex: number,
    skipNumber: number,
    nextLink: string | null,
    defaultURL: string,
    endpoint?: string
  ) => Promise<any[]>;
}

export class RestApiDataSource implements IDataSource {
  protected _source: any[];
  constructor(source?: any[]) {
    if (source) {
      this._source = source;
    } else {
      this._source = [];
    }
  }
  public set source(v: any[]) {
    this._source = v;
  }
  public get source(): any[] {
    return this._source;
  }
  GetData: (
    pageIndex: number,
    skipNumber: number,
    nextLink: string | null,
    defaultURL: string,
    endpoint?: string
  ) => Promise<any[]>;
  protected _url: string;
}

export class SignalRDataSource implements IDataSource {
  protected _source: any[];
  constructor(source?: any[]) {
    if (source) {
      this._source = source;
    } else {
      this._source = [];
    }
  }
  public set source(v: any[]) {
    this._source = v;
  }
  public get source(): any[] {
    return this._source;
  }
  GetData: (
    pageIndex: number,
    skipNumber: number,
    nextLink: string | null,
    defaultURL: string,
    endpoint?: string
  ) => Promise<any[]>;
}
