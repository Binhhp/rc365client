/// <reference types="react" />
import { IButtonProps } from "./Button.types";
export interface IButtonExampleProps extends IButtonProps {
  disabled?: boolean;
  checked?: boolean;
  text: string;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  darkMode?: string;
  icon?: string;
  className?: string;
  rcName?: string;
}
export declare const ButtonWrapper: import("styled-components").StyledComponent<
  "div",
  any,
  {},
  never
>;
