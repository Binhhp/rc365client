import * as React from "react";
import { IPickerProps, IPickerStates } from "./DateTimePickerModels";
declare class DateTimePicker extends React.Component<IPickerProps, IPickerStates> {
    constructor(props: IPickerProps);
    componentDidUpdate(pp: IPickerProps, ps: IPickerStates): void;
    private _onHandleConvertValueToData;
    private _onHandleUpdateVisibleCallout;
    private _onHandleSentValue;
    private _onHandleConvertToDisplayText;
    private _isValidDate;
    onHandleOnFocusInMask: () => ((event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined;
    onHandleDismiss: () => ((ev?: any) => void) | undefined;
    onHandleCancel: () => void;
    onHandleCheck: () => void;
    onValidateSpin: (value: string, event?: React.SyntheticEvent<HTMLElement, Event> | undefined, type?: string | undefined) => void;
    onIncrementSpin: (value: string, type?: string | undefined) => void;
    onDecrementSpin: (value: string, type?: string | undefined) => void;
    onGetDataCalendar: (val: Date | {
        date: Date;
    }[]) => void;
    onHandleChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => ((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => void) | undefined;
    render(): JSX.Element;
}
export default DateTimePicker;
//# sourceMappingURL=index.d.ts.map