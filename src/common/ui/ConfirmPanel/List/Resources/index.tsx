import * as React from "react";
import { BuildRCAttribute } from "src/common/functions";
import { ResourceConfirmCreateWrapper } from "./ConfirmCreateResourceStyles";
import {
  IConfirmCreateResourceState,
  IRenderListResourceProps,
} from "./ConfirmCreateResourceModels";
import { Stack } from "aod-dependencies/Stack";

class ConfirmCreateResource extends React.Component<
  IRenderListResourceProps,
  IConfirmCreateResourceState
> {
  render() {
    let idItemConfirm = BuildRCAttribute(`cfm.item.${this.props.index}`);
    let idItemName = BuildRCAttribute(`cfm.item.name.${this.props.index}`);
    let idItemEmail = BuildRCAttribute(`cfm.item.email.${this.props.index}`);
    let idItemCapacity = BuildRCAttribute(
      `cfm.item.capacity.${this.props.index}`
    );
    let idItemTimezone = BuildRCAttribute(
      `cfm.item.timezone.${this.props.index}`
    );
    let idItemDName = BuildRCAttribute(`cfm.item.dname.${this.props.index}`);
    let idItemDeadline = BuildRCAttribute(
      `cfm.item.deadline.${this.props.index}`
    );
    let idItemMaxDelivery = BuildRCAttribute(
      `cfm.item.maxDelivery.${this.props.index}`
    );
    let idItemMinHours = BuildRCAttribute(
      `cfm.item.minHours.${this.props.index}`
    );
    let idItemDeadlineMsg = BuildRCAttribute(
      `cfm.item.deadlineMsg.${this.props.index}`
    );
    let idItemPhone = BuildRCAttribute(`cfm.item.phone.${this.props.index}`);
    let idItemMinHoursMsg = BuildRCAttribute(
      `cfm.item.minHoursMsg.${this.props.index}`
    );
    let { item } = this.props;
    return (
      <ResourceConfirmCreateWrapper theme={this.props.theme} {...idItemConfirm}>
        <h4 className="Tag__title" {...idItemDName}>
          {item.displayName}
        </h4>
        <Stack horizontal>
          <Stack.Item grow={3}>
            <span>
              Name: <span {...idItemName}>{item.name}</span>
            </span>
          </Stack.Item>
          <Stack.Item grow={3}>
            Email:{" "}
            <span {...idItemEmail}>
              {item.email}
              {/* {item.email}@{item.domain} */}
            </span>
          </Stack.Item>
        </Stack>
        <Stack horizontal>
          <Stack.Item grow={3}>
            <span>
              Time zone: <span {...idItemTimezone}>{item.timeZone}</span>
            </span>
          </Stack.Item>
          <Stack.Item grow={3}>
            <span>
              Capacity: <span {...idItemCapacity}>{item.capacity}</span>
            </span>
          </Stack.Item>
        </Stack>
        <div className="Tag__moreInfomation">
          <Stack horizontal>
            <Stack.Item grow={3}>
              <span>
                Phone: <span {...idItemPhone}>{item.phone}</span>
              </span>
            </Stack.Item>
            <Stack.Item grow={3}>
              <span>
                Max Delivery:{" "}
                <span {...idItemMaxDelivery}>{item.maxDelivery}</span>
              </span>
            </Stack.Item>
          </Stack>
          <Stack horizontal>
            <Stack.Item grow={3}>
              <span>
                Deadline:{" "}
                <span {...idItemDeadline}>
                  {item.deadline}{" "}
                  {item.deadline !== "" && item.deadlineTime !== "" && "-"}{" "}
                  {item.deadlineTime}{" "}
                </span>
              </span>
            </Stack.Item>
            <Stack.Item grow={3}>
              <span>
                Min Hours: <span {...idItemMinHours}>{item.minHours}</span>
              </span>
            </Stack.Item>
          </Stack>
          <Stack horizontal>
            <Stack.Item grow={3}>
              <span>Deadline Message:</span>
              <p className="Tag__message">
                <span {...idItemDeadlineMsg}>{item.deadlineMess}</span>
              </p>
            </Stack.Item>
            <Stack.Item grow={3}>
              <span>Minimum Hours Message:</span>
              <p className="Tag__message">
                <span {...idItemMinHoursMsg}>{item.minHoursMess}</span>
              </p>
            </Stack.Item>
          </Stack>
        </div>
      </ResourceConfirmCreateWrapper>
    );
  }
}

export default ConfirmCreateResource;
