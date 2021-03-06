import { IIconStyleProps, IIconStyles } from "./Icon.types";
/** Class names used in themeable and non-themeable Icon components */
export declare const classNames: import("../styling/IStyleSet").IProcessedStyleSet<{
  root: {
    display: string;
  };
  placeholder: (
    | string
    | {
        width: string;
      }
  )[];
  image: (
    | string
    | {
        overflow: string;
      }
  )[];
}>;
/** Class name used only in non-themeable Icon components */
export declare const MS_ICON = "ms-Icon";
export declare const getStyles: (props: IIconStyleProps) => IIconStyles;
