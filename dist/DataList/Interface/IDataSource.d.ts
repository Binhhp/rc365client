export declare class Request {
}
export interface IDataSource {
    GetData: (pageIndex: number, skipNumber: number, nextLink: string | null, endpoint?: string) => Promise<any[]>;
}
export interface DataListDto {
    source?: any[];
    nextLink?: string;
    receiveBySinalR?: boolean;
}
export declare class DataListSource implements IDataSource {
    protected _source: any[];
    protected _nextLink: string;
    protected _receiveBySinalR: boolean;
    constructor(dto?: DataListDto);
    set source(v: any[]);
    get source(): any[];
    set nextLink(v: string);
    get nextLink(): string;
    set receiveBySinalR(v: boolean);
    get receiveBySinalR(): boolean;
    GetData: (pageIndex: number, skipNumber: number, nextLink: string | null, endpoint?: string) => Promise<any[]>;
}
//# sourceMappingURL=IDataSource.d.ts.map