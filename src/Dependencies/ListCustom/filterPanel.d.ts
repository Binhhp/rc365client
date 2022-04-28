import * as React from "react";
import { IFilterProps, IFilterState } from "./ListStyle";
import { IDropdownOption } from "../Dropdown";
declare class Breadcrumd extends React.Component<IFilterProps, IFilterState> {
    constructor(props: IFilterProps);
    onSelectDrop: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => void;
    onChangeInput: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => void;
    onCheckedBox: (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, value?: boolean | undefined) => void;
    onGetDataCalendar: (val: Date | {
        date: Date;
    }[]) => void;
    onApplyFilter: () => Promise<void>;
    onSubmitText: (e: React.KeyboardEvent) => void;
    onRenderCheckBox: (type: string) => JSX.Element;
    onClearFilter: () => void;
    onSortByFilter: () => Promise<void>;
    render(): JSX.Element;
}
export default Breadcrumd;
