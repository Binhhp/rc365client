import * as React from "react";
import { IPickerProps, IPickerStates } from "./PickerModels";
declare class Picker extends React.Component<IPickerProps, IPickerStates> {
    constructor(props: IPickerProps);
    componentDidMount(): void;
    private _onHandleChangeInput;
    private _onContextualMenuDismissed;
    private _getContextualMenuProps;
    private _onHandleChoiceItemSort;
    onHandleSendValueToParent: (str?: string | undefined) => void;
    render(): JSX.Element;
}
export default Picker;
//# sourceMappingURL=index.d.ts.map