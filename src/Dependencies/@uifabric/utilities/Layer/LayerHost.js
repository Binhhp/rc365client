import { __assign, __extends } from "tslib";
import * as React from "react";
import { css } from "../index";
import { notifyHostChanged } from "./Layer.notification";
var LayerHost = /** @class */ (function (_super) {
  __extends(LayerHost, _super);
  function LayerHost() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  LayerHost.prototype.shouldComponentUpdate = function () {
    return false;
  };
  LayerHost.prototype.componentDidMount = function () {
    notifyHostChanged(this.props.id);
  };
  LayerHost.prototype.componentWillUnmount = function () {
    notifyHostChanged(this.props.id);
  };
  LayerHost.prototype.render = function () {
    let rcName = this.props.rcName;
    return React.createElement(
      "div",
      __assign(
        { "data-rc-id": rcName ? `lah.${rcName}` : undefined },
        this.props,
        {
          className: css("ms-LayerHost", this.props.className),
        }
      )
    );
  };
  return LayerHost;
})(React.Component);
export { LayerHost };
//# sourceMappingURL=LayerHost.js.map
