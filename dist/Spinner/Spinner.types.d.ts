import * as React from "react";
import { ITheme, IStyle } from "../@uifabric/styling";
import { IRefObject, IStyleFunctionOrObject } from "../@uifabric/utilities";
/**
 * {@docCategory Spinner}
 */
export interface ISpinner {}
/**
 * Spinner component props.
 * {@docCategory Spinner}
 */
export interface ISpinnerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the ISpinner interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ISpinner>;
  /**
   * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize` instead.
   * @deprecated Use `SpinnerSize` instead.
   */
  type?: SpinnerType;
  /**
   * The size of Spinner to render. \{ extraSmall, small, medium, large \}
   * @defaultvalue SpinnerType.medium
   */
  size?: SpinnerSize;
  /**
   * The label to show next to the Spinner. Label updates will be announced to the screen readers.
   * Use ariaLive to control politeness level.
   */
  label?: string;
  /**
   * Additional CSS class(es) to apply to the Spinner.
   */
  className?: string;
  /**
   * Politeness setting for label update announcement.
   * @defaultvalue polite
   */
  ariaLive?: "assertive" | "polite" | "off";
  /**
   * Alternative status label for screen reader
   */
  ariaLabel?: string;
  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;
  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles>;
  /**
   * The position of the label in regards of the spinner animation.
   * @defaultvalue SpinnerLabelPosition.bottom
   */
  labelPosition?: SpinnerLabelPosition;
  rcName?: string;
}
/**
 * Possible variations of the spinner circle size.
 * {@docCategory Spinner}
 */
export declare enum SpinnerSize {
  /**
   * 12px Spinner diameter
   */
  xSmall = 0,
  /**
   * 16px Spinner diameter
   */
  small = 1,
  /**
   * 20px Spinner diameter
   */
  medium = 2,
  /**
   * 28px Spinner diameter
   */
  large = 3,
}
/**
 * Possible locations of the label in regards to the spinner
 * @defaultvalue bottom
 * {@docCategory Spinner}
 */
export declare type SpinnerLabelPosition = "top" | "right" | "bottom" | "left";
/**
 * Deprecated at v2.0.0, use `SpinnerSize` instead.
 * @deprecated Use `SpinnerSize` instead.
 * {@docCategory Spinner}
 */
export declare enum SpinnerType {
  /**
   * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize.medium` instead.
   * @deprecated Use `SpinnerSize.medium` instead.
   */
  normal = 0,
  /**
   * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize.large` instead.
   * @deprecated Use `SpinnerSize.large` instead.
   */
  large = 1,
}
/**
 * The props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory Spinner}
 */
export interface ISpinnerStyleProps {
  /** Theme provided by High-Order Component. */
  theme: ITheme;
  /** Size of the spinner animation. */
  size?: SpinnerSize;
  /** CSS class name for the component attached to the root stylable area. */
  className?: string;
  /** Position of the label in regards to the spinner animation. */
  labelPosition?: SpinnerLabelPosition;
}
/**
 * Represents the stylable areas of the control.
 * {@docCategory Spinner}
 */
export interface ISpinnerStyles {
  /** Styles for the root element. Refers to the wrapper containing both the circle and the label. */
  root?: IStyle;
  /** Styles for the spinner circle animation. */
  circle?: IStyle;
  /** Styles for the label accompanying the circle. */
  label?: IStyle;
  /** Styles for the hidden helper element to aid with screen readers. */
  screenReaderText?: IStyle;
}
