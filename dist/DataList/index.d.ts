import * as React from "react";
import { IListProps, IListStates } from "./ListModel";
export default class ListCustom extends React.Component<IListProps, IListStates> {
    private Action;
    constructor(props: any);
    componentDidMount(): void;
    onHandleQueryDataByClassType: (isLazy?: boolean | undefined) => Promise<void>;
    onHandleUpdateDataCaseFirst: (source: any[]) => Promise<void>;
    onHandleUpdateDataCaseLazy: (source: any[], page?: number | undefined) => Promise<void>;
    onHandleQueryClassSource: (source: any[], page?: number | undefined, isLazy?: boolean | undefined) => Promise<void>;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map