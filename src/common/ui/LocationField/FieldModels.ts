import { INodes } from "aod-dependencies/TreeView/FinalTreeInterface";
import { ICustomTextFieldProps } from "aod-dependencies/TextField/CustomTextFieldStyle";

export interface ILocationFieldProps {
  theme?: string;
  rcName?: string;
  onGetSeletedItemsTree?: (value: string) => void;
  treeNode: INodes[];
  textFieldProps?: ICustomTextFieldProps;
  defaultVal?: string;
}

export interface ILocationFieldState {
  isFocus: boolean;
  valueInput: string;
}
