import * as React from "react";
import { ConfirmWrapper, ConfirmItemsWrapper } from "./ConfirmStyle";
import { ConfirmStepProps } from "./ConfirmModels";
// import { onSetTabSelectedListTS } from "../src/ui/action/organizationAct";
import {
  TypeConfirm,
  TypePage,
  TypePanel,
  TypeSensorTabs,
} from "src/entity/enums";
import DomainItem from "../List/Domains";
import ResourceItem from "../List/Resources";
import UserItem from "../List/Users";
import GroupItem from "../List/Groups";
import SensorItem from "../List/Sensor";
import ControllerItem from "../List/Controller";
import ConfigurationItem from "../List/Configuration";

export default class Review extends React.Component<ConfirmStepProps> {
  private _RenderItemListByCrtTab = () => {
    if (
      this.props.workingTab &&
      (this.props.type === TypeConfirm.Review ||
        (this.props.type === TypeConfirm.Submit &&
          this.props.panelType === TypePanel.Edit))
    ) {
      switch (this.props.workingTab) {
        case TypePage.Users:
          return this.RenderUserItem();
        case TypePage.Groups:
          return this.onRenderGroupItem();
        case TypePage.Resources:
          return this.RenderResourceItem();
        case TypePage.Domains:
          return this.RenderDomainItem();
        default:
          return null;
      }
    }
    if (
      this.props.sensorWorkingTab &&
      this.props.type === TypeConfirm.ReviewSS
    ) {
      switch (this.props.sensorWorkingTab) {
        case TypeSensorTabs.Sensors:
          return this.RenderSensorItem();
        case TypeSensorTabs.Controllers:
          return this.RenderControllerItem();
        case TypeSensorTabs.Configurations:
          return this.RenderConfigurationItem();
        default:
          return null;
      }
    }
  };

  RenderControllerItem = (): React.ReactNode => {
    return (
      <ConfirmItemsWrapper theme={this.props.theme}>
        <ControllerItem
          item={this.props.controller}
          resource={this.props.resource}
          theme={this.props.theme}
        />
      </ConfirmItemsWrapper>
    );
  };

  RenderConfigurationItem = (): React.ReactNode => {
    return (
      <ConfirmItemsWrapper theme={this.props.theme}>
        <ConfigurationItem
          item={this.props.configuration}
          theme={this.props.theme}
        />
      </ConfirmItemsWrapper>
    );
  };

  RenderSensorItem = (): React.ReactNode => {
    return (
      <ConfirmItemsWrapper theme={this.props.theme}>
        <SensorItem
          item={this.props.sensor}
          resource={this.props.resource}
          theme={this.props.theme}
        />
      </ConfirmItemsWrapper>
    );
  };

  RenderUserItem = (): React.ReactNode => {
    let crtUsers = this.props.workingUsers ? [...this.props.workingUsers] : [];
    if (
      this.props.user &&
      this.props.type === TypeConfirm.Submit &&
      this.props.panelType === TypePanel.Edit
    ) {
      crtUsers = [this.props.user];
    }
    return (
      <ConfirmItemsWrapper theme={this.props.theme}>
        {crtUsers.length > 0 &&
          crtUsers.map((us, i) => {
            return (
              <UserItem
                key={us.id}
                index={i}
                item={us}
                theme={this.props.theme}
              />
            );
          })}
      </ConfirmItemsWrapper>
    );
  };
  RenderDomainItem = (): React.ReactNode => {
    let crtDomains = this.props.workingDomains
      ? [...this.props.workingDomains]
      : [];
    if (
      this.props.domain &&
      this.props.type === TypeConfirm.Submit &&
      this.props.panelType === TypePanel.Edit
    ) {
      crtDomains = [this.props.domain];
    }
    return (
      <ConfirmItemsWrapper theme={this.props.theme}>
        {crtDomains.length > 0 &&
          crtDomains.map((dm, i) => {
            return (
              <DomainItem
                key={i}
                index={i}
                item={dm}
                theme={this.props.theme}
              />
            );
          })}
      </ConfirmItemsWrapper>
    );
  };
  RenderResourceItem = (): React.ReactNode => {
    let crtResources = this.props.workingResources
      ? [...this.props.workingResources]
      : [];
    if (
      this.props.resource &&
      this.props.type === TypeConfirm.Submit &&
      this.props.panelType === TypePanel.Edit
    ) {
      crtResources = [this.props.resource];
    }
    return (
      <ConfirmItemsWrapper theme={this.props.theme}>
        {crtResources.length > 0 &&
          crtResources.map((rs, i) => {
            return (
              <ResourceItem
                key={rs.id}
                index={i}
                item={rs}
                theme={this.props.theme}
              />
            );
          })}
      </ConfirmItemsWrapper>
    );
  };
  // [Group]
  onRenderGroupItem = (): React.ReactNode => {
    let crtGroups = this.props.workingGroups
      ? [...this.props.workingGroups]
      : [];
    if (
      this.props.group &&
      this.props.type === TypeConfirm.Submit &&
      this.props.panelType === TypePanel.Edit
    ) {
      crtGroups = [this.props.group];
    }
    return (
      <ConfirmItemsWrapper theme={this.props.theme}>
        {crtGroups.length > 0 &&
          crtGroups.map((gr, i) => {
            return <GroupItem index={i} item={gr} theme={this.props.theme} />;
          })}
      </ConfirmItemsWrapper>
    );
  };

  onHandleClickNo = () => {
    this.props.onSetTabSelectedListTS && this.props.onSetTabSelectedListTS(1);
    this.props.onHandleAction && this.props.onHandleAction(false);
  };

  render() {
    return (
      <ConfirmWrapper className="ConfirmWrapper">
        {this._RenderItemListByCrtTab()}
      </ConfirmWrapper>
    );
  }
}
