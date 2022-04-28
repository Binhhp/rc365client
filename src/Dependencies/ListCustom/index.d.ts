import * as React from "react";
import { IHOC } from "./ListStyle";
export declare class ListCustom extends React.Component<IHOC, {
    itemHeight: number;
}> {
    constructor(props: IHOC);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default ListCustom;
