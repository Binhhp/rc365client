import * as React from "react";
import { SyncTabWrapper, ContentWrapper, ActionsWrapper } from "./SyncStyle";
import { SyncTabProps } from "./SyncModels";
import Button from "aod-dependencies/Button";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { BuildRCAttribute, TimeFunction } from "src/common/functions";

export default class SyncTab extends React.Component<SyncTabProps> {
  private _onHandleStartSynch = async () => {
    if ( this.props.OnStartSynchResource && this.props.resource && this.props.orgInfo
    ) {
      const response = await this.props.OnStartSynchResource(
        this.props.orgInfo.id,
        this.props.resource
      );
      if (
        response.workflowId !== "" &&
        response.conversationId !== "" &&
        this.props.OnSetCIdAndWorkflowId
      ) {
        this.props.OnSetCIdAndWorkflowId(
          response.conversationId,
          response.workflowId || ""
        );
      }
    }
  };

  private _onHandleStopSynch = async () => {
    if (
      this.props.OnStopSynchResource &&
      this.props.resource &&
      this.props.orgInfo
    ) {
      const response = await this.props.OnStopSynchResource(
        this.props.orgInfo.id,
        this.props.resource
      );
      if (
        response.workflowId !== "" &&
        response.conversationId !== "" &&
        this.props.OnSetCIdAndWorkflowId
      ) {
        this.props.OnSetCIdAndWorkflowId(
          response.conversationId,
          response.workflowId || ""
        );
      }
    }
  };

  onStartSync = () => {
    this._onHandleStartSynch();
  };
  onStopSync = () => {
    this._onHandleStopSynch();
  };

  render() {
    let idSyncAll = BuildRCAttribute(`btn.syncAll`);
    let idStopSync = BuildRCAttribute(`btn.stopSyncAll`);
    let idSyncTime = BuildRCAttribute(`sp.synch.time`);
    let time = "";
    if (this.props.resource && this.props.resource.resourceAdInfo) {
      time = TimeFunction.onFormatDateTimeUTC(
        this.props.resource.resourceAdInfo.lastTimeSynchronize
      );
    }
    return (
      <SyncTabWrapper className="SyncTabWrapper" theme={this.props.theme}>
        <ActionsWrapper className="ActionsWrapper" theme={this.props.theme}>
          <div {...idSyncAll} className="actions__btn">
            <Icon iconName="FabricSyncFolder" />
            <span>Sync All</span>
          </div>
          <div {...idStopSync} className="actions__btn">
            <Icon iconName="FabricUnsyncFolder" />
            <span>Stop Sync</span>
          </div>
        </ActionsWrapper>
        <ContentWrapper className="ContentWrapper" theme={this.props.theme}>
          <p className="content__title">Identity Sync</p>
          <p className="content__detail">
            Last sync from Azure Active Directory:{" "}
            <span {...idSyncTime}>{time}</span>
          </p>
          <div className="content__btnGr">
            <Button
              disabled={this.props.isLoadingNotify}
              type="Primary"
              className="content__btn"
              darkMode={this.props.theme}
              text="Sync now"
              rcName="syncNow.Identity"
              onClick={this.onStartSync}
            />
            <Button
              disabled={this.props.isLoadingNotify}
              type="Primary"
              className="content__btn ml"
              darkMode={this.props.theme}
              text="Stop sync"
              rcName="stopSync.Identity"
              onClick={this.onStopSync}
            />
          </div>
        </ContentWrapper>
      </SyncTabWrapper>
    );
  }
}
