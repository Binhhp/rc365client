import * as React from "react";
import { IContextualMenuItemProps } from "./ContextualMenuItem.types";
export declare class ContextualMenuItemBase extends React.Component<
  IContextualMenuItemProps,
  {}
> {
  constructor(props: IContextualMenuItemProps);
  render(): JSX.Element;
  openSubMenu: () => void;
  dismissSubMenu: () => void;
  dismissMenu: (dismissAll?: boolean | undefined) => void;
  darkMode?: string;
}
