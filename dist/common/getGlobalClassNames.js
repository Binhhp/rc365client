"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobalClassNames = getGlobalClassNames;

var _styling = require("../@uifabric/styling");

var _utilities = require("../@uifabric/utilities");

/**
 * Internal memoized function which simply takes in the class map and the
 * disable boolean. These immutable values can be memoized.
 */
var _getGlobalClassNames = (0, _utilities.memoizeFunction)(function (classNames, disableGlobalClassNames) {
  var styleSheet = _styling.Stylesheet.getInstance();

  if (disableGlobalClassNames) {
    // disable global classnames
    return Object.keys(classNames).reduce(function (acc, className) {
      acc[className] = styleSheet.getClassName(classNames[className]);
      return acc;
    }, {});
  } // use global classnames


  return classNames;
});
/**
 * Checks for the `disableGlobalClassNames` property on the `theme` to determine if it should return `classNames`
 * Note that calls to this function are memoized.
 *
 * @param classNames - The collection of global class names that apply when the flag is false. Make sure to pass in
 * the same instance on each call to benefit from memoization.
 * @param theme - The theme to check the flag on
 * @param disableGlobalClassNames - Optional. Explicitly opt in/out of disabling global classnames. Defaults to false.
 */


function getGlobalClassNames(classNames, theme, disableGlobalClassNames) {
  return _getGlobalClassNames(classNames, disableGlobalClassNames !== undefined ? disableGlobalClassNames : theme.disableGlobalClassNames);
}