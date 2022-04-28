"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupShowAllBase = void 0;

var React = _interopRequireWildcard(require("react"));

var _utilities = require("../@uifabric/utilities");

var _Link = require("../Link");

var _GroupSpacer = require("./GroupSpacer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getClassNames = (0, _utilities.classNamesFunction)();

var GroupShowAllBase = function GroupShowAllBase(props) {
  var group = props.group,
      groupLevel = props.groupLevel,
      _a = props.showAllLinkText,
      showAllLinkText = _a === void 0 ? "Show All" : _a,
      styles = props.styles,
      theme = props.theme,
      onToggleSummarize = props.onToggleSummarize;
  var classNames = getClassNames(styles, {
    theme: theme
  });
  var memoizedOnClick = (0, React.useCallback)(function (ev) {
    onToggleSummarize(group);
    ev.stopPropagation();
    ev.preventDefault();
  }, [onToggleSummarize, group]);

  if (group) {
    return /*#__PURE__*/React.createElement("div", {
      className: classNames.root
    }, /*#__PURE__*/React.createElement(_GroupSpacer.GroupSpacer, {
      count: groupLevel
    }), /*#__PURE__*/React.createElement(_Link.Link, {
      onClick: memoizedOnClick
    }, showAllLinkText));
  }

  return null;
};

exports.GroupShowAllBase = GroupShowAllBase;