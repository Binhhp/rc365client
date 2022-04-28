import * as React from "react";
import { Icon, FontIcon } from "../../icons";
import { classNamesFunction } from "../index";
var getClassNames = classNamesFunction();
export var CheckBase = function (props) {
  var _a = props.checked,
    checked = _a === void 0 ? false : _a,
    className = props.className,
    theme = props.theme,
    styles = props.styles,
    rcName = props.rcName,
    _b = props.useFastIcons,
    useFastIcons = _b === void 0 ? true : _b;
  var classNames = getClassNames(styles, {
    theme: theme,
    className: className,
    checked: checked,
  });
  var IconComponent = useFastIcons ? FontIcon : Icon;
  return React.createElement(
    "div",
    {
      className: classNames.root,
    },
    React.createElement(IconComponent, {
      iconName: "CircleRing",
      className: classNames.circle,
      "data-rc-id": rcName ? `rb.ring.${rcName}` : undefined,
    }),
    React.createElement(IconComponent, {
      iconName: "StatusCircleCheckmark",
      className: classNames.check,
      "data-rc-id": rcName ? `rb.check.${rcName}` : undefined,
    })
  );
};
//# sourceMappingURL=Check.base.js.map
