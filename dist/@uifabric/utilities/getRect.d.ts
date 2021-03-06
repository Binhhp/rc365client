import { IRectangle } from ".";
/**
 * Helper to get bounding client rect. Passing in window will get the window size.
 *
 * @public
 */
export declare function getRect(
  element: HTMLElement | Window | null
): IRectangle | undefined;
