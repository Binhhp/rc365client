import {
  IContextualMenuProps,
  IContextualMenuItem,
} from "../@uifabric/utilities/ContextualMenu";
import { ICustomTextFieldProps } from "../TextField/CustomTextFieldStyle";

export interface IPickerProps {
  darkMode?: string;
  rcName?: string;
  inputProps?: ICustomTextFieldProps;
  items: IContextualMenuItem[];
  value?: string;
  onGetValueOfPicker?: (str?: string) => void;
  errorMessage?: string;
}

export interface IPickerStates {
  contextualMenu?: IContextualMenuProps;
  value: string;
}
