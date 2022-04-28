import * as React from "react";
import { IStringFormProps, IStringFormStates } from "./StringFormModels";
import { IDropdownOption } from "../../../Dropdown";
export default class StringForm extends React.Component<IStringFormProps, IStringFormStates> {
    constructor(props: IStringFormProps);
    componentDidMount(): void;
    private _mapToOperatorFilterStringEnums;
    private _onHandleSentFilterValue;
    private _FocusInFieldValue;
    onSelectDrop: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => void;
    onSubmitText: (e: React.KeyboardEvent) => void;
    onHandleCheckValue: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, val?: string | undefined) => void;
    onClearFilter: () => void;
    onHandleApplyFilter: () => void;
    onHandleTrim: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map