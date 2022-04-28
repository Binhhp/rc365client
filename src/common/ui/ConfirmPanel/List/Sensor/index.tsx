import { Icon } from "aod-dependencies/@uifabric/icons";
import * as React from "react";
import { BuildRCAttribute } from "src/common/functions";
import { IConfirmSensorProps } from "./ConfirmSensorModel";
import { ConfirmSensorWrapper } from "./ConfirmSensorStyle";

class ConfirmCreateSensor extends React.Component<IConfirmSensorProps, any> {
  render() {
    let idSensorId = BuildRCAttribute(`cfm.sensor.Id`);
    let idType = BuildRCAttribute(`cfm.sensor.type`);
    let idRsName = BuildRCAttribute(`cfm.resource.name`);
    let idRsEmail = BuildRCAttribute(`cfm.resource.email`);
    let idRsCapacity = BuildRCAttribute(`cfm.resource.cappacity`);
    let idRsTimeZone = BuildRCAttribute(`cfm.resource.timezone`);
    let idSensor = BuildRCAttribute(`cfm.sensor`);
    return (
      <ConfirmSensorWrapper
        theme={this.props.theme}
        key={this.props.index}
        {...idSensor}
      >
        <div className="block__content">
          <h4 {...idType}>{this.props.item?.sensorType}</h4>
          <p {...idSensorId}>{this.props.item?.sensorId}</p>
        </div>
        {this.props.resource &&
          this.props.resource.id &&
          this.props.resource.id.trim() !== "" && (
            <>
              <div className="block__icon">
                <Icon iconName="PlugDisconnected" rcName="cfm" />
              </div>
              <div className="block__content">
                <h4
                  className="wordBreak text-ellipsis-2"
                  title={this.props.resource?.displayName}
                >
                  <span {...idRsName}>{this.props.resource?.displayName}</span>
                </h4>
                <p className="wordBreak text-ellipsis-2">
                  Email:{" "}
                  <span {...idRsEmail}>{this.props.resource?.email}</span>
                </p>
                <p className="wordBreak text-ellipsis-2">
                  Capacity:{" "}
                  <span {...idRsCapacity}>{this.props.resource?.capacity}</span>
                </p>
                <p className="wordBreak text-ellipsis-2">
                  Timezone:{" "}
                  <span {...idRsTimeZone}>{this.props.resource?.timeZone}</span>
                </p>
              </div>
            </>
          )}
      </ConfirmSensorWrapper>
    );
  }
}

export default ConfirmCreateSensor;
