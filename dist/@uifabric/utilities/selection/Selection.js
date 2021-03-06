import { SELECTION_CHANGE, SelectionMode } from "./Selection.types";
import { EventGroup } from "../EventGroup";
/**
 * {@docCategory Selection}
 */
var Selection = /** @class */ (function () {
  /**
   * Create a new Selection. If `TItem` does not have a `key` property, you must provide an options
   * object with a `getKey` implementation. Providing options is optional otherwise.
   * (At most one `options` object is accepted.)
   */
  function Selection() {
    var options = []; // Otherwise, arguments require options with `getKey`.
    for (
      var _i = 0; // Otherwise, arguments require options with `getKey`.
      _i < arguments.length; // Otherwise, arguments require options with `getKey`.
      _i++ // Otherwise, arguments require options with `getKey`.
    ) {
      options[_i] = arguments[_i]; // Otherwise, arguments require options with `getKey`.
    }
    var _a = options[0] || {},
      onSelectionChanged = _a.onSelectionChanged,
      getKey = _a.getKey,
      _b = _a.canSelectItem,
      canSelectItem =
        _b === void 0
          ? function () {
              return true;
            }
          : _b,
      items = _a.items,
      _c = _a.selectionMode,
      selectionMode = _c === void 0 ? SelectionMode.multiple : _c;
    this.mode = selectionMode;
    this._getKey = getKey || defaultGetKey;
    this._changeEventSuppressionCount = 0;
    this._exemptedCount = 0;
    this._anchoredIndex = 0;
    this._unselectableCount = 0;
    this._onSelectionChanged = onSelectionChanged;
    this._canSelectItem = canSelectItem;
    this._isModal = false;
    this.setItems(items || [], true);
    this.count = this.getSelectedCount();
  }
  Selection.prototype.canSelectItem = function (item, index) {
    if (typeof index === "number" && index < 0) {
      return false;
    }
    return this._canSelectItem(item, index);
  };
  Selection.prototype.getKey = function (item, index) {
    var key = this._getKey(item, index);
    return typeof key === "number" || key ? "" + key : "";
  };
  Selection.prototype.setChangeEvents = function (isEnabled, suppressChange) {
    this._changeEventSuppressionCount += isEnabled ? -1 : 1;
    if (this._changeEventSuppressionCount === 0 && this._hasChanged) {
      this._hasChanged = false;
      if (!suppressChange) {
        this._change();
      }
    }
  };
  Selection.prototype.isModal = function () {
    return this._isModal;
  };
  Selection.prototype.setModal = function (isModal) {
    if (this._isModal !== isModal) {
      this.setChangeEvents(false);
      this._isModal = isModal;
      if (!isModal) {
        this.setAllSelected(false);
      }
      this._change();
      this.setChangeEvents(true);
    }
  };
  /**
   * Selection needs the items, call this method to set them. If the set
   * of items is the same, this will re-evaluate selection and index maps.
   * Otherwise, shouldClear should be set to true, so that selection is
   * cleared.
   */
  Selection.prototype.setItems = function (items, shouldClear) {
    if (shouldClear === void 0) {
      shouldClear = true;
    }
    var newKeyToIndexMap = {};
    var newUnselectableIndices = {};
    var hasSelectionChanged = false;
    this.setChangeEvents(false);
    // Reset the unselectable count.
    this._unselectableCount = 0;
    // Build lookup table for quick selection evaluation.
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item) {
        var key = this.getKey(item, i);
        if (key) {
          newKeyToIndexMap[key] = i;
        }
      }
      newUnselectableIndices[i] = item && !this.canSelectItem(item);
      if (newUnselectableIndices[i]) {
        this._unselectableCount++;
      }
    }
    if (shouldClear || items.length === 0) {
      this._setAllSelected(false, true);
    }
    // Check the exemption list for discrepencies.
    var newExemptedIndicies = {};
    var newExemptedCount = 0;
    for (var indexProperty in this._exemptedIndices) {
      if (this._exemptedIndices.hasOwnProperty(indexProperty)) {
        var index = Number(indexProperty);
        var item1 = this._items[index];
        var exemptKey = item1 ? this.getKey(item1, Number(index)) : undefined;
        var newIndex = exemptKey ? newKeyToIndexMap[exemptKey] : index;
        if (newIndex === undefined) {
          // The item1 has likely been replaced or removed.
          hasSelectionChanged = true;
        } else {
          // We know the new index of the item1. update the existing exemption table.
          newExemptedIndicies[newIndex] = true;
          newExemptedCount++;
          hasSelectionChanged = hasSelectionChanged || newIndex !== index;
        }
      }
    }
    if (
      this._items &&
      this._exemptedCount === 0 &&
      items.length !== this._items.length &&
      this._isAllSelected
    ) {
      // If everything was selected but the number of items has changed, selection has changed.
      hasSelectionChanged = true;
    }
    this._exemptedIndices = newExemptedIndicies;
    this._exemptedCount = newExemptedCount;
    this._keyToIndexMap = newKeyToIndexMap;
    this._unselectableIndices = newUnselectableIndices;
    this._items = items;
    this._selectedItems = null;
    if (hasSelectionChanged) {
      this._updateCount();
      this._change();
    }
    this.setChangeEvents(true);
  };
  Selection.prototype.getItems = function () {
    return this._items;
  };
  Selection.prototype.getSelection = function () {
    if (!this._selectedItems) {
      this._selectedItems = [];
      var items = this._items;
      if (items) {
        for (var i = 0; i < items.length; i++) {
          if (this.isIndexSelected(i)) {
            this._selectedItems.push(items[i]);
          }
        }
      }
    }
    return this._selectedItems;
  };
  Selection.prototype.getSelectedCount = function () {
    return this._isAllSelected
      ? this._items.length - this._exemptedCount - this._unselectableCount
      : this._exemptedCount;
  };
  Selection.prototype.getSelectedIndices = function () {
    if (!this._selectedIndices) {
      this._selectedIndices = [];
      var items = this._items;
      if (items) {
        for (var i = 0; i < items.length; i++) {
          if (this.isIndexSelected(i)) {
            this._selectedIndices.push(i);
          }
        }
      }
    }
    return this._selectedIndices;
  };
  Selection.prototype.isRangeSelected = function (fromIndex, count) {
    if (count === 0) {
      return false;
    }
    var endIndex = fromIndex + count;
    for (var i = fromIndex; i < endIndex; i++) {
      if (!this.isIndexSelected(i)) {
        return false;
      }
    }
    return true;
  };
  Selection.prototype.isAllSelected = function () {
    var selectableCount = this._items.length - this._unselectableCount;
    // In single mode, we can only have a max of 1 item.
    if (this.mode === SelectionMode.single) {
      selectableCount = Math.min(selectableCount, 1);
    }
    return (
      (this.count > 0 && this._isAllSelected && this._exemptedCount === 0) ||
      (!this._isAllSelected &&
        this._exemptedCount === selectableCount &&
        selectableCount > 0)
    );
  };
  Selection.prototype.isKeySelected = function (key) {
    var index = this._keyToIndexMap[key];
    return this.isIndexSelected(index);
  };
  Selection.prototype.isIndexSelected = function (index) {
    return !!(
      (this.count > 0 &&
        this._isAllSelected &&
        !this._exemptedIndices[index] &&
        !this._unselectableIndices[index]) ||
      (!this._isAllSelected && this._exemptedIndices[index])
    );
  };
  Selection.prototype.setAllSelected = function (isAllSelected) {
    if (isAllSelected && this.mode !== SelectionMode.multiple) {
      return;
    }
    var selectableCount = this._items
      ? this._items.length - this._unselectableCount
      : 0;
    this.setChangeEvents(false);
    if (
      selectableCount > 0 &&
      (this._exemptedCount > 0 || isAllSelected !== this._isAllSelected)
    ) {
      this._exemptedIndices = {};
      if (isAllSelected !== this._isAllSelected || this._exemptedCount > 0) {
        this._exemptedCount = 0;
        this._isAllSelected = isAllSelected;
        this._change();
      }
      this._updateCount();
    }
    this.setChangeEvents(true);
  };
  Selection.prototype.setKeySelected = function (
    key,
    isSelected,
    shouldAnchor
  ) {
    var index = this._keyToIndexMap[key];
    if (index >= 0) {
      this.setIndexSelected(index, isSelected, shouldAnchor);
    }
  };
  Selection.prototype.setIndexSelected = function (
    index,
    isSelected,
    shouldAnchor
  ) {
    if (this.mode === SelectionMode.none) {
      return;
    }
    // Clamp the index.
    index = Math.min(Math.max(0, index), this._items.length - 1);
    // No-op on out of bounds selections.
    if (index < 0 || index >= this._items.length) {
      return;
    }
    this.setChangeEvents(false);
    var isExempt = this._exemptedIndices[index];
    var canSelect = !this._unselectableIndices[index];
    if (canSelect) {
      if (isSelected && this.mode === SelectionMode.single) {
        // If this is single-select, the previous selection should be removed.
        this._setAllSelected(false, true);
      }
      // Determine if we need to remove the exemption.
      if (
        isExempt &&
        ((isSelected && this._isAllSelected) ||
          (!isSelected && !this._isAllSelected))
      ) {
        delete this._exemptedIndices[index];
        this._exemptedCount--;
      }
      // Determine if we need to add the exemption.
      if (
        !isExempt &&
        ((isSelected && !this._isAllSelected) ||
          (!isSelected && this._isAllSelected))
      ) {
        this._exemptedIndices[index] = true;
        this._exemptedCount++;
      }
      if (shouldAnchor) {
        this._anchoredIndex = index;
      }
    }
    this._updateCount();
    this.setChangeEvents(true);
  };
  Selection.prototype.selectToKey = function (key, clearSelection) {
    this.selectToIndex(this._keyToIndexMap[key], clearSelection);
  };
  Selection.prototype.selectToIndex = function (index, clearSelection) {
    if (this.mode === SelectionMode.none) {
      return;
    }
    if (this.mode === SelectionMode.single) {
      this.setIndexSelected(index, true, true);
      return;
    }
    var anchorIndex = this._anchoredIndex || 0;
    var startIndex = Math.min(index, anchorIndex);
    var endIndex = Math.max(index, anchorIndex);
    this.setChangeEvents(false);
    if (clearSelection) {
      this._setAllSelected(false, true);
    }
    for (; startIndex <= endIndex; startIndex++) {
      this.setIndexSelected(startIndex, true, false);
    }
    this.setChangeEvents(true);
  };
  Selection.prototype.toggleAllSelected = function () {
    this.setAllSelected(!this.isAllSelected());
  };
  Selection.prototype.toggleKeySelected = function (key) {
    this.setKeySelected(key, !this.isKeySelected(key), true);
  };
  Selection.prototype.toggleIndexSelected = function (index) {
    this.setIndexSelected(index, !this.isIndexSelected(index), true);
  };
  Selection.prototype.toggleRangeSelected = function (fromIndex, count) {
    if (this.mode === SelectionMode.none) {
      return;
    }
    var isRangeSelected = this.isRangeSelected(fromIndex, count);
    var endIndex = fromIndex + count;
    if (this.mode === SelectionMode.single && count > 1) {
      return;
    }
    this.setChangeEvents(false);
    for (var i = fromIndex; i < endIndex; i++) {
      this.setIndexSelected(i, !isRangeSelected, false);
    }
    this.setChangeEvents(true);
  };
  Selection.prototype._updateCount = function (preserveModalState) {
    if (preserveModalState === void 0) {
      preserveModalState = false;
    }
    var count = this.getSelectedCount();
    if (count !== this.count) {
      this.count = count;
      this._change();
    }
    if (!this.count && !preserveModalState) {
      this.setModal(false);
    }
  };
  Selection.prototype._setAllSelected = function (
    isAllSelected,
    preserveModalState
  ) {
    if (preserveModalState === void 0) {
      preserveModalState = false;
    }
    if (isAllSelected && this.mode !== SelectionMode.multiple) {
      return;
    }
    var selectableCount = this._items
      ? this._items.length - this._unselectableCount
      : 0;
    this.setChangeEvents(false);
    if (
      selectableCount > 0 &&
      (this._exemptedCount > 0 || isAllSelected !== this._isAllSelected)
    ) {
      this._exemptedIndices = {};
      if (isAllSelected !== this._isAllSelected || this._exemptedCount > 0) {
        this._exemptedCount = 0;
        this._isAllSelected = isAllSelected;
        this._change();
      }
      this._updateCount(preserveModalState);
    }
    this.setChangeEvents(true);
  };
  Selection.prototype._change = function () {
    if (this._changeEventSuppressionCount === 0) {
      this._selectedItems = null;
      this._selectedIndices = undefined;
      EventGroup.raise(this, SELECTION_CHANGE);
      if (this._onSelectionChanged) {
        this._onSelectionChanged();
      }
    } else {
      this._hasChanged = true;
    }
  };
  return Selection;
})();
export { Selection };
function defaultGetKey(item, index) {
  // 0 may be used as a key
  var _a = (item || {}).key,
    key = _a === void 0 ? "" + index : _a;
  return key;
}
//# sourceMappingURL=Selection.js.map
