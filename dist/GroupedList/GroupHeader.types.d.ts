import * as React from "react";
import {
  IStyleFunctionOrObject,
  IRenderFunction,
} from "../@uifabric/utilities";
import { IGroupDividerProps, IGroup } from "./GroupedList.types";
import { IStyle, ITheme } from "../@uifabric/styling";
/**
 * {@docCategory GroupedList}
 */
export interface IGroupHeaderProps extends IGroupDividerProps {
  /** Style function to be passed in to override the themed or default styles */
  styles?: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles>;
  /** GroupedList id for aria-controls */
  groupedListId?: string;
  /** Native props for the GroupHeader expand and collapse button */
  expandButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
  /** Defines the name of a custom icon to be used for group headers. If not set, the default icon will be used */
  expandButtonIcon?: string;
  /** Native props for the GroupHeader select all button */
  selectAllButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
  /** Defines the number of items in the current set of listitems or treeitems */
  ariaSetSize?: number;
  /** Defines an element's number or position in the current set of listitems or treeitems */
  ariaPosInSet?: number;
  /**
   * If provided, can be used to render a custom checkbox
   */
  onRenderGroupHeaderCheckbox?: IRenderFunction<IGroupHeaderCheckboxProps>;
  /**
   * Whether to use fast icon and check components. The icons can't be targeted by customization
   * but are still customizable via class names.
   * @defaultvalue true
   */
  useFastIcons?: boolean;
  onTitleClick?: () => void;
  onHandleClickGroupTitle?: (group: IGroup | IGroup[]) => void;
  rcName?: string;
}
/**
 * {@docCategory GroupedList}
 */
export declare type IGroupHeaderStyleProps = Required<
  Pick<IGroupHeaderProps, "theme">
> &
  Pick<IGroupHeaderProps, "selected" | "className"> & {
    /** Is Header collapsed */
    isCollapsed?: boolean;
    /** Whether the group header is in compact mode or not */
    compact?: boolean;
  };
/**
 * {@docCategory GroupedList}
 */
export interface IGroupHeaderStyles {
  root: IStyle;
  groupHeaderContainer: IStyle;
  headerCount: IStyle;
  check: IStyle;
  dropIcon: IStyle;
  expand: IStyle;
  expandIsCollapsed: IStyle;
  title: IStyle;
}
/**
 * {@docCategory GroupedList}
 */
export interface IGroupHeaderCheckboxProps {
  checked: boolean;
  theme?: ITheme;
}
