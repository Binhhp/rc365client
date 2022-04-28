import * as React from "react";
import { BuildRCAttribute } from "src/common/functions";
import { ConfirmItemUserWrapper } from "./ConfirmCreateUserStyles";
import { IRenderListUserProps } from "./ConfirmCreateUserModels";
import { Stack } from "aod-dependencies/Stack";

class ConfirmCreateUser extends React.Component<IRenderListUserProps, any> {
  onCollapse = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  render() {
    let idItemConfirm = BuildRCAttribute(`cfm.item.${this.props.index}`);
    let idItemName = BuildRCAttribute(`cfm.item.name.${this.props.index}`);
    let idDisplayName = BuildRCAttribute(`cfm.item.dname.${this.props.index}`);
    let idItemEmail = BuildRCAttribute(`cfm.item.email.${this.props.index}`);
    let idItemDepart = BuildRCAttribute(
      `cfm.item.department.${this.props.index}`
    );
    let idItemCountry = BuildRCAttribute(
      `cfm.item.country.${this.props.index}`
    );
    let idItemCity = BuildRCAttribute(`cfm.item.city.${this.props.index}`);
    let idItemFax = BuildRCAttribute(`cfm.item.fax.${this.props.index}`);
    let idItemPhone = BuildRCAttribute(`cfm.item.phone.${this.props.index}`);
    let { item, theme } = this.props;
    return (
      <ConfirmItemUserWrapper {...idItemConfirm} theme={theme}>
        <h2
          {...idDisplayName}
          className="item__name text-ellipsis-2 wordBreak"
          title={item.displayName}
        >
          {item.displayName}
        </h2>
        <h5 className="item__contract">Contact</h5>
        <Stack horizontal>
          <Stack.Item grow={3}>
            <ul className="item__listContract ">
              <li>
                <span className="text-ellipsis-2" title={item.email}>
                  Name:{" "}
                  <span className="wordBreak" {...idItemName}>
                    {item.name}
                  </span>
                </span>
              </li>
              <li>
                <span className="text-ellipsis-2" title={item.faxNumber}>
                  Fax: <span {...idItemFax}>{item.faxNumber}</span>
                </span>
              </li>
              <li>
                <span className="text-ellipsis-2" title={item.mobilePhone}>
                  Phone: <span {...idItemPhone}>{item.mobilePhone}</span>
                </span>
              </li>
            </ul>
          </Stack.Item>
          <Stack.Item grow={3}>
            <ul className="item__listContract">
              <li>
                <span className="text-ellipsis-2 wordBreak" title={item.email}>
                  Email:{" "}
                  <span className="wordBreak" {...idItemEmail}>
                    {item.email}
                    {/* {item.email}@{item.domain} */}
                  </span>
                </span>
              </li>
              <li>
                <span
                  className="text-ellipsis-2 wordBreak"
                  title={item.department}
                >
                  {" "}
                  Department: <span {...idItemDepart}>{item.department}</span>
                </span>
              </li>
              <li>
                <span
                  className="text-ellipsis-2 wordBreak"
                  title={`${item.city}${
                    item.city && item.countryOrRegion && ","
                  }${item.countryOrRegion}`}
                >
                  Location: <span {...idItemCity}>{item.city}</span>
                  {item.city && `,`}
                  <span {...idItemCountry}>{item.countryOrRegion}</span>
                </span>
              </li>
            </ul>
          </Stack.Item>
        </Stack>
      </ConfirmItemUserWrapper>
    );
  }
}

export default ConfirmCreateUser;
