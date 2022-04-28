import * as React from "react";
import { IDateFormProps, IDateFormStates } from "./DateFormModels";
import { IDropdownOption } from "../../../Dropdown";
export default class DateForm extends React.Component<IDateFormProps, IDateFormStates> {
    constructor(props: IDateFormProps);
    private _mapToOperatorFilterStringEnums;
    private _onHandleSentFilterValue;
    onSelectDrop: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => void;
    onClearFilter: () => void;
    onHandleApplyFilter: () => void;
    onGetDataCalendar: (val: Date | {
        date: Date;
    }[]) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map