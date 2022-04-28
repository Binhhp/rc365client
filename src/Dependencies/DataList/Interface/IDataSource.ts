export class Request {}

export interface IDataSource {
  GetData: (
    pageIndex: number,
    skipNumber: number,
    nextLink: string | null,
    endpoint?: string
  ) => Promise<any[]>;
}

export interface DataListDto {
  source?: any[];
  nextLink?: string;
  receiveBySinalR?: boolean;
}

export class DataListSource implements IDataSource {
  protected _source: any[];
  protected _nextLink: string;
  protected _receiveBySinalR: boolean;
  constructor(dto?: DataListDto) {
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
  public set source(v: any[]) {
    this._source = v;
  }
  public get source(): any[] {
    return this._source;
  }
  public set nextLink(v: string) {
    this._nextLink = v;
  }
  public get nextLink(): string {
    return this._nextLink;
  }
  public set receiveBySinalR(v: boolean) {
    this._receiveBySinalR = v;
  }
  public get receiveBySinalR(): boolean {
    return this._receiveBySinalR;
  }
  GetData: (
    pageIndex: number,
    skipNumber: number,
    nextLink: string | null,
    endpoint?: string
  ) => Promise<any[]>;
}
