import * as React from "react";
import { AccountWrapper } from "./AccountStyle";
import { IAccountStates, IWorkingTenant } from "./AccountModel";
import { BuildRCAttribute } from "src/common/functions";

export default class Account extends React.Component<any, IAccountStates> {
  constructor(props: IAccountStates) {
    super(props);
    this.state = {
      workingTenant: null,
    };
  }

  componentDidMount() {
    let storage = localStorage.getItem("tenantId");
    if (storage) {
      let obj: IWorkingTenant = JSON.parse(storage);
      this.setState({ workingTenant: obj });
    }
  }

  render() {
    let idTenantName = BuildRCAttribute("sp.working.tenant");
    return (
      <AccountWrapper className="AccountWrapper">
        {this.state.workingTenant && (
          <h3 {...idTenantName}>{this.state.workingTenant.name}</h3>
        )}
      </AccountWrapper>
    );
  }
}
