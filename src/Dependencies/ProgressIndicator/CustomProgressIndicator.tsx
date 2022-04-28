import * as React from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { ProgressWrapper, ICustomProgressProps } from "./CustomProgressStyle";

class CustomProgressIndicator extends React.Component<ICustomProgressProps> {
  render() {
    return (
      <ProgressWrapper theme={this.props.darkMode}>
        <ProgressIndicator {...this.props} />
      </ProgressWrapper>
    );
  }
}

export default CustomProgressIndicator;
