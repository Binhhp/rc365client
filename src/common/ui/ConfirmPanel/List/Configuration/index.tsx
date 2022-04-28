import * as React from "react";
import { BuildRCAttribute } from "src/common/functions";
import { IConfirmSensorProps } from "./ConfirmSensorModel";
import { ConfirmSensorWrapper } from "./ConfirmSensorStyle";

class ConfirmCreateDomain extends React.Component<IConfirmSensorProps, any> {
  render() {
    let idType = BuildRCAttribute(`cfm.configuration.type`);
    let idApiKey = BuildRCAttribute(`cfm.configuration.apiKey`);
    let idPushUrl = BuildRCAttribute(`cfm.configuration.pushUrl`);
    let idPullUrl = BuildRCAttribute(`cfm.configuration.pullUrl`);
    let idEndpoint = BuildRCAttribute(`cfm.configuration.endpoint`);
    let idWrapper = BuildRCAttribute(`cfm.configuration`);
    return (
      <ConfirmSensorWrapper
        theme={this.props.theme}
        key={this.props.index}
        {...idWrapper}
      >
        <h4 {...idType}>{this.props.item?.sensorType}</h4>
        {this.props.item && this.props.item.apiKey && (
          <p>
            Api key: <span {...idApiKey}>{this.props.item?.apiKey}</span>
          </p>
        )}
        <p>
          Pull url: <span {...idPullUrl}>{this.props.item?.pullUrl}</span>
        </p>
        <p>
          Push url: <span {...idPushUrl}>{this.props.item?.pushUrl}</span>
        </p>
        <p>
          Endpoint: <span {...idEndpoint}>{this.props.item?.endpoint}</span>
        </p>
      </ConfirmSensorWrapper>
    );
  }
}

export default ConfirmCreateDomain;
