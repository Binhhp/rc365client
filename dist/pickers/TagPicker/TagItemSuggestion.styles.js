"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = getStyles;

var _styling = require("../../@uifabric/styling");

var GlobalClassNames = {
  suggestionTextOverflow: 'ms-TagItem-TextOverflow'
};

function getStyles(props) {
  var className = props.className,
      theme = props.theme;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  return {
    suggestionTextOverflow: [classNames.suggestionTextOverflow, {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '60vw',
      padding: '6px 12px 7px',
      whiteSpace: 'nowrap'
    }, className]
  };
}