import { ICheckboxProps } from "./index";
import { IIconProps } from "../@uifabric/icons/Icon.types";
export interface ICustomCheckBoxProps extends ICheckboxProps {
    darkMode?: string;
    icon?: IIconProps;
}
export declare const CheckBoxWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
