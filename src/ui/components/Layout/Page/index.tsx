import * as React from "react";
import {
  PageWrapper,
  OrganizationNameWrapper,
  MainPageWrapper,
} from "./PageStyle";
import { ISubHeaderProps } from "./PageModels";
import Organization from "src/ui/containers/Organization/Detail/OrganizationContainer";
import { LayerHost } from "aod-dependencies/@uifabric/utilities/Layer";
import { mergeStyles } from "aod-dependencies/@uifabric/styling";
import { Route, Switch } from "react-router-dom";
import ListOrganizations from "src/ui/containers/Organization/List/ListOrganizationContainer";
import TenantManagement from "src/ui/containers/Tenant/TenantContainer";
import SensorManagement from "src/ui/containers/Sensor/SensorContainer";
import TenantDetail from "src/ui/containers/Tenant/Detail/TenantDetailContainer";
import TenantCreate from "src/ui/containers/Tenant/TenantCreateContainer";
import CalendarManagement from "src/ui/containers/Organization/Calendar/CalendarContainer";
import BreadCrumb from "aod-dependencies/Breadcrumb";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";

const layerHostClass = mergeStyles({
  position: "relative",
  height: 400,
  overflow: "hidden",
  border: "1px solid #ccc",
});

const RenderBreadCrumb = (props: { theme: string; breadNode?: INodes[] }) => {
  const [nodes, setNodes] = React.useState<INodes[]>([]);
  React.useEffect(() => {
    if (props.breadNode) {
      setNodes(props.breadNode);
    }
  }, [props.breadNode]);
  return (
    <OrganizationNameWrapper theme={props.theme}>
      <BreadCrumb
        rcName="org"
        darkMode={props.theme}
        nodes={nodes}
        isRedirect={true}
      />
    </OrganizationNameWrapper>
  );
};

export default class SubHeader extends React.Component<ISubHeaderProps, any> {
  shouldComponentUpdate(nextProps: ISubHeaderProps) {
    return (
      this.props.breadCrumb !== nextProps.breadCrumb ||
      this.props.theme !== nextProps.theme
    );
  }

  render() {
    return (
      <PageWrapper className="PageWrapperRoute" theme={this.props.theme}>
        <RenderBreadCrumb
          theme={this.props.theme || "light"}
          breadNode={this.props.breadCrumb}
        />
        <LayerHost
          id="main-panel"
          className={layerHostClass}
          style={{
            border: 0,
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MainPageWrapper className="MainPageWrapper" theme={this.props.theme}>
            <Switch>
              <Route path={`/`} component={Organization} exact />
              <Route
                path={`/organizations`}
                component={ListOrganizations}
                exact
              />
              <Route path={`/calendar`} component={CalendarManagement} exact />
              <Route path={`/tenants`} component={TenantManagement} exact />
              <Route path={`/sensors`} component={SensorManagement} exact />
              <Route path={`/tenant/create`} component={TenantCreate} />
              <Route path={`/tenant/:id`} component={TenantDetail} />
            </Switch>
          </MainPageWrapper>
        </LayerHost>
      </PageWrapper>
    );
  }
}
