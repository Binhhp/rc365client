"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));
var dom = React.createElement;

var _CustomCheckBox = _interopRequireDefault(
  require("../Checkbox/CustomCheckBox")
);

var _Icon = require("../@uifabric/icons/Icon");

var _FinalTreeInterface = require("./FinalTreeInterface");

var _TestLanguage = require("../TestLanguage");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

class TreeNode extends React.Component {
  constructor() {
    super(...arguments);

    this.onRenderChildNode = (
      props,
      theme,
      parentNode,
      onExpands,
      onChecked,
      multilingual
    ) => {
      if (props.length > 0) {
        return dom(
          "ul",
          null,
          props.map((item) => {
            if (item.childNodes.length >= 1) {
              let count = 0;
              let child = item.childNodes;
              let length = item.childNodes.length;

              for (let i = 0; i < child.length; i++) {
                if (child[i].isChecked) {
                  count++;
                }
              }

              if (count === length) {
                item.isChecked = true;
                item.isIndeterminate = false;
              }

              if (count < length && count > 0) {
                item.isChecked = false;
                item.isIndeterminate = true;
              }

              if (count === 0) {
                item.isChecked = false;
                item.isIndeterminate = false;
              }
            }

            let labelVal =
              multilingual && item.label
                ? (0, _TestLanguage.TestLanguage)(item.label, multilingual)
                : item.label;
            return dom(TreeNode, {
              isChecked: item.isChecked || false,
              isExpand: item.isExpand || false,
              isDisable: item.isDisable || false,
              label: labelVal,
              isAllChildSelected: item.isAllChildSelected || false,
              isIndeterminate: item.isIndeterminate || false,
              childNodes: item.childNodes,
              key: item.id,
              node: item,
              parentNode: parentNode || null,
              theme: theme || "",
              id: item.id,
              onExpands: onExpands,
              onChecked: onChecked,
              multilingual: multilingual,
            });
          })
        );
      }
    };

    this.onRenderNode = (props, theme) => {
      const onHandleExpands = (node) => {
        props.onExpands && props.onExpands(node);
      };

      const onHandleCheck = (node) => {
        props.onChecked && props.onChecked(node);
      };

      return dom(
        "div",
        null,
        dom(
          _FinalTreeInterface.ItemWrapper,
          {
            theme: {
              darkMode: props.theme,
              visibleIcon: props.childNodes.length >= 1 ? true : false,
            },
          },
          props.childNodes.length >= 1 &&
            dom(_Icon.Icon, {
              onClick: () => onHandleExpands(props),
              iconName: props.isExpand ? "ChevronRight" : "ChevronDown",
              className: "icon-rightArrow",
              rcName: "tre.".concat(this.props.rcName, ".").concat(props.label),
            }),
          dom(_CustomCheckBox.default, {
            checked: props.isChecked,
            indeterminate: props.isIndeterminate,
            title: props.label,
            label: props.label,
            disabled: props.isDisable,
            onChange: () => onHandleCheck(props),
            darkMode: this.props.theme,
            rcName: "tre.".concat(this.props.rcName, ".").concat(props.label),
          })
        ),
        props.isExpand &&
          this.onRenderChildNode(
            props.childNodes,
            theme,
            props,
            props.onExpands,
            props.onChecked,
            props.multilingual
          )
      );
    };
  }

  render() {
    return dom("div", null, this.onRenderNode(this.props, this.props.theme));
  }
}

var _default = TreeNode;
exports.default = _default;
