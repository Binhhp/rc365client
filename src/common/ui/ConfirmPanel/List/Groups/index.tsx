import { Icon } from "aod-dependencies/@uifabric/icons";
import * as React from "react";
import { BuildRCAttribute } from "src/common/functions";
import { ConfirmCreateGroupWrapper } from "./ConfirmCreateGroupStyles";
import {
  IConfirmCreateDomainState,
  IConfirmCreateDomainProps,
} from "./ConfirmCreateGroupModels";

class ConfirmCreateDomain extends React.Component<
  IConfirmCreateDomainProps,
  IConfirmCreateDomainState
> {
  constructor(props: IConfirmCreateDomainProps) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  onCollapse = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  render() {
    let idItemConfirm = BuildRCAttribute(`cfm.item.${this.props.index}`);
    let idItemEmail = BuildRCAttribute(`cfm.item.email.${this.props.index}`);
    let idItemName = BuildRCAttribute(`cfm.item.name.${this.props.index}`);
    let idItemDescription = BuildRCAttribute(
      `cfm.item.descript.${this.props.index}`
    );
    return (
      <ConfirmCreateGroupWrapper
        {...idItemConfirm}
        theme={this.props.theme}
        onClick={this.onCollapse}
      >
        <div className="itemGroup__title">
          <Icon iconName="Group" />
          <p className="itemGroup__name" {...idItemName}>
            {this.props.item.name}
          </p>
        </div>
        <span className="itemGroup__email" {...idItemEmail}>
          {this.props.item.email}
          {/* {this.props.item.email}@{this.props.item.domain} */}
        </span>
        <p
          className={
            this.state.isCollapsed
              ? `itemGroup__description text-ellipsis-3`
              : `itemGroup__description`
          }
          {...idItemDescription}
        >
          {this.props.item.description}
        </p>
      </ConfirmCreateGroupWrapper>
    );
  }
}

export default ConfirmCreateDomain;
