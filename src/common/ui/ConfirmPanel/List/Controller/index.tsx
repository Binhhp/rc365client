import * as React from "react";
import { BuildRCAttribute } from "src/common/functions";
import { IConfirmControllerProps } from "./ConfirmControllerModel";
import { ConfirmControllerWrapper } from "./ConfirmControllerStyle";
import { Icon } from "aod-dependencies/@uifabric/icons";

class ConfirmCreateDomain extends React.Component<
  IConfirmControllerProps,
  any
> {
  render() {
    let idRsName = BuildRCAttribute(`cfm.resource.name`);
    let idRsDName = BuildRCAttribute(`cfm.resource.displayName`);
    let idRsEmail = BuildRCAttribute(`cfm.resource.email`);
    let idRsCapacity = BuildRCAttribute(`cfm.resource.cappacity`);
    let idRsTimeZone = BuildRCAttribute(`cfm.resource.timezone`);
    let idRsPhone = BuildRCAttribute(`cfm.resource.phone`);
    let idReservationTime = BuildRCAttribute(`cfm.reservationTime`);
    let idRsSensorTime = BuildRCAttribute(`cfm.sensorTime`);
    let idCfmItem = BuildRCAttribute(`cfm.controller`);
    return (
      <ConfirmControllerWrapper
        theme={this.props.theme}
        key={this.props.index}
        className="ConfirmControllerWrapper"
        {...idCfmItem}
      >
        <div className="rs__content">
          <Icon iconName="RecruitmentManagement" rcName="cfm" />
          <div className="rs__infomation">
            <h4 {...idRsDName}>{this.props.item?.resourceInfo.displayName}</h4>
            <p {...idRsName}>{this.props.item?.resourceInfo.name}</p>
            <p>
              Reservation time:{" "}
              <span {...idReservationTime}>
                {this.props.item?.reservationTime}
              </span>
            </p>
            <p>
              Sensor time frame:{" "}
              <span {...idRsSensorTime}>{this.props.item?.sensorTime}</span>
            </p>
          </div>
        </div>
        <div className="rs__details">
          <div className="rs__group">
            <p>
              Email:{" "}
              <span {...idRsEmail}>{this.props.item?.resourceInfo.email}</span>
            </p>
            <p>
              Phone:{" "}
              <span {...idRsPhone}>{this.props.item?.resourceInfo.phone}</span>
            </p>
          </div>
          <div className="rs__group">
            <p>
              Capacity:{" "}
              <span {...idRsCapacity}>
                {this.props.item?.resourceInfo.capacity}
              </span>
            </p>
            <p>
              Timezone:{" "}
              <span {...idRsTimeZone}>
                {this.props.item?.resourceInfo.timeZone}
              </span>
            </p>
          </div>
        </div>
      </ConfirmControllerWrapper>
    );
  }
}

export default ConfirmCreateDomain;
