"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionActionType = void 0;

/**
 * Enum to help identify which suggestions action button is selected.
 * {@docCategory Pickers}
 */
var SuggestionActionType;
exports.SuggestionActionType = SuggestionActionType;

(function (SuggestionActionType) {
  /** None of the actions is selected. */
  SuggestionActionType[SuggestionActionType["none"] = 0] = "none";
  /** ForceResolve action is selected. */

  SuggestionActionType[SuggestionActionType["forceResolve"] = 1] = "forceResolve";
  /** SearchMore action is selected. */

  SuggestionActionType[SuggestionActionType["searchMore"] = 2] = "searchMore";
})(SuggestionActionType || (exports.SuggestionActionType = SuggestionActionType = {}));