import * as React from "react";
import { INumberFormProps, INumberFormStates } from "./NumberFormModels";
import { IDropdownOption } from "../../../Dropdown";
export default class StringForm extends React.Component<INumberFormProps, INumberFormStates> {
    constructor(props: INumberFormProps);
    componentDidMount(): void;
    private _mapToOperatorFilterNumberEnums;
    private _onHandleSentFilterValue;
    private _FocusInFieldValue;
    onSelectDrop: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => void;
    onSubmitText: (e: React.KeyboardEvent) => void;
    onHandleCheckValue: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, val?: string | undefined) => void;
    onClearFilter: () => void;
    onHandleApplyFilter: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map