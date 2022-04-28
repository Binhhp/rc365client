import { __extends } from "tslib";
// import { __assign, __extends } from "tslib";
/* tslint:disable */
import * as React from "react";
/* tslint:enable */
import { styled, initializeComponentRef } from "../../@uifabric/utilities";
import { BasePicker } from "../BasePicker";
import { getStyles } from "../BasePicker.styles";
// import { TagItem } from './TagItem';
import { TagItemSuggestion } from "./TagItemSuggestion";
/**
 * {@docCategory TagPicker}
 */
var TagPickerBase = /** @class */ (function (_super) {
  var propsFromBase = {};
  __extends(TagPickerBase, _super);
  function TagPickerBase(props) {
    var _this = _super.call(this, props) || this;
    propsFromBase = props;
    initializeComponentRef(_this);
    return _this;
  }
  TagPickerBase.defaultProps = {
    onRenderItem: function (props) {
      return;
      // React.createElement(TagItem, __assign({}, props), props.item.name);
    },
    onRenderSuggestionsItem: function (props) {
      let dataItem = { name: props.name, data: props.data ? props.data : "" };
      return React.createElement(
        TagItemSuggestion,
        { data: dataItem, propsFromBase },
        props.name
      );
    },
  };
  return TagPickerBase;
})(BasePicker);
export { TagPickerBase };
export var TagPicker = styled(TagPickerBase, getStyles, undefined, {
  scope: "TagPicker",
});
//# sourceMappingURL=TagPicker.js.map
