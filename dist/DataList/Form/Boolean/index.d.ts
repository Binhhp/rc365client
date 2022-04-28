import * as React from "react";
import { IBooleanFormProps, IBooleanFormStates } from "./BooleanFormModels";
import { IChoiceGroupOption } from "../../../ChoiceGroup/ChoiceGroup.types";
export default class BooleanForm extends React.Component<IBooleanFormProps, IBooleanFormStates> {
    constructor(props: IBooleanFormProps);
    UNSAFE_componentWillMount(): void;
    private _onHandleValueDefault;
    private _onHandleSentFilterValue;
    onHandleApplyFilter: () => void;
    onGetChoiceGroup: (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map