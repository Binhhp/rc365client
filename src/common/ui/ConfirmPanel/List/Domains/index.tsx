import { Icon } from "aod-dependencies/@uifabric/icons";
import * as React from "react";
import { BuildRCAttribute } from "src/common/functions";
import { IConfirmCreateDomainProps } from "./ConfirmCreateDomainModel";
import { ConfirmCreateDomainWrapper } from "./ConfirmCreateDomainStyle";

class ConfirmCreateDomain extends React.Component<
  IConfirmCreateDomainProps,
  any
> {
  render() {
    let idItemConfirm = BuildRCAttribute(`cfm.item.${this.props.index}`);
    let idItemName = BuildRCAttribute(`cfm.item.name.${this.props.index}`);
    return (
      <ConfirmCreateDomainWrapper
        theme={this.props.theme}
        key={this.props.index}
        {...idItemConfirm}
      >
        <div className="item__title">
          <Icon iconName="PC1" rcName={`cfm.item.${this.props.index}`} />
          <span>{`Domain ${this.props.index + 1}`}</span>
        </div>
        <span className="item__value" {...idItemName}>
          {this.props.item.name}
        </span>
      </ConfirmCreateDomainWrapper>
    );
  }
}

export default ConfirmCreateDomain;
