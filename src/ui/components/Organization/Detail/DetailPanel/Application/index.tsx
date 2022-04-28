import * as React from "react";
import { IApplicationProps } from "./ApplicationModel";
import { ApplicationWrapper } from "./ApplicationStyle";
import Form from "src/ui/containers/Organization/Detail/Tab/Application/ApplicationFormContainer";
import List from "src/ui/containers/Organization/Detail/Tab/Application/ApplicationListContainer";
import { Stack } from "aod-dependencies/Stack";
import { LoadingSpinner } from "src/common/ui/Loading";
import { BaseApplication } from "src/common/classes/BaseApplication";

class Application extends React.Component<IApplicationProps> {

  UNSAFE_componentWillMount() {
    if(this.props.OnUpdateApplicationInfomationTS){
      this.props.OnUpdateApplicationInfomationTS(new BaseApplication());
    }
  }

  render() {
    return (
      <ApplicationWrapper className="ApplicationWrapper">
        {!this.props.isApplicationTabLoading ? (
          <>
            <Stack horizontal wrap>
              <Stack.Item className="Application__Form" grow={4}>
                <Form />
              </Stack.Item>
              <Stack.Item className="Application__List" grow={2}>
                <List />
              </Stack.Item>
            </Stack>
          </>
        ) : (
          <LoadingSpinner rcName="app.loading" darkMode={this.props.theme} />
        )}
      </ApplicationWrapper>
    );
  }
}

export default Application;
