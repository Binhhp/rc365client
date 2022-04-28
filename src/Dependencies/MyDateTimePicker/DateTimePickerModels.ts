import { ICalloutProps } from "../@uifabric/utilities";
import { IContextualMenuProps } from "../@uifabric/utilities/ContextualMenu";
import { ICustomTextFieldProps } from "../TextField/CustomTextFieldStyle";

export interface IPickerProps {
  id: string;
  darkMode?: string;
  rcName?: string;
  value?: Date | string | number;
  textFieldProps?: ICustomTextFieldProps;
  calloutProps?: ICalloutProps;
  // define what type of data you get from this component (Date, string, ticks, time)
  // default is string
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
