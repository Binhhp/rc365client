import { ICalloutProps } from "../@uifabric/utilities";
import { ICustomTextFieldProps } from "../TextField/CustomTextFieldStyle";
export interface IPickerProps {
    id: string;
    darkMode?: string;
    rcName?: string;
    value?: Date | string | number;
    textFieldProps?: ICustomTextFieldProps;
    calloutProps?: ICalloutProps;
    getDataType?: string;
    onGetValue?: (val: Date | string | number) => void;
}
export interface IPickerStates {
    isVisibledCallout?: boolean;
    value: string;
    hour: number;
    minute: number;
    second: number;
    date: Date | null;
}
//# sourceMappingURL=DateTimePickerModels.d.ts.map