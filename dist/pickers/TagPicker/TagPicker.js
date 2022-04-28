"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagPicker = exports.TagPickerBase = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../../@uifabric/utilities");

var _BasePicker = require("../BasePicker");

var _BasePicker2 = require("../BasePicker.styles");

var _TagItemSuggestion = require("./TagItemSuggestion");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { __assign, __extends } from "tslib";

/* tslint:disable */

/* tslint:enable */
// import { TagItem } from './TagItem';

/**
 * {@docCategory TagPicker}
 */
var TagPickerBase =
/** @class */
function (_super) {
  var propsFromBase = {};
  (0, _tslib.__extends)(TagPickerBase, _super);

  function TagPickerBase(props) {
    var _this = _super.call(this, props) || this;

    propsFromBase = props;
    (0, _utilities.initializeComponentRef)(_this);
    return _this;
  }

  TagPickerBase.defaultProps = {
    onRenderItem: function onRenderItem(props) {
      return; // React.createElement(TagItem, __assign({}, props), props.item.name);
    },
    onRenderSuggestionsItem: function onRenderSuggestionsItem(props) {
      let dataItem = {
        name: props.name,
        data: props.data ? props.data : ""
      };
      return /*#__PURE__*/React.createElement(_TagItemSuggestion.TagItemSuggestion, {
        data: dataItem,
        propsFromBase
      }, props.name);
    }
  };
  return TagPickerBase;
}(_BasePicker.BasePicker);

exports.TagPickerBase = TagPickerBase;
var TagPicker = (0, _utilities.styled)(TagPickerBase, _BasePicker2.getStyles, undefined, {
  scope: "TagPicker"
});
exports.TagPicker = TagPicker;