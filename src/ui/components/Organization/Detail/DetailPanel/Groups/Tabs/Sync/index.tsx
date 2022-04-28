import * as React from "react";
import { SyncTabWrapper, ContentWrapper, ActionsWrapper } from "./SyncStyle";
import { SyncTabProps } from "./SyncModels";
import Button from "aod-dependencies/Button";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { BuildRCAttribute } from "src/common/functions";

export default class SyncTab extends React.Component<SyncTabProps> {
  onSyncAll = () => {
    console.log("sync all");
  };

  onStopSyncAll = () => {
    console.log("stop sync all");
  };

  onHandleSyncGroup = async () => {
    if (
      this.props.OnStartSynchGroup &&
      this.props.group &&
      this.props.orgInfo
    ) {
      const response = await this.props.OnStartSynchGroup(this.props.orgInfo.id, this.props.group);
      if(response.conversationId !== "" && response.workflowId !== "" && this.props.OnSetCIdAndWorkflowId){
        this.props.OnSetCIdAndWorkflowId(
          response.conversationId,
          response.workflowId || ""
        );
      }
    }
  };

  onHandleStopSyncGroup = async () => {
    if (this.props.OnStopSynchGroup && this.props.group && this.props.orgInfo) {
      const response = await this.props.OnStopSynchGroup(this.props.orgInfo.id, this.props.group);
      if(response.conversationId !== "" && response.workflowId !== "" && this.props.OnSetCIdAndWorkflowId){
        this.props.OnSetCIdAndWorkflowId(
          response.conversationId,
          response.workflowId || ""
        );
      }
    }
  };

  render() {
    let idSyncAll = BuildRCAttribute(`btn.syncAll`);
    let idStopSync = BuildRCAttribute(`btn.stopSyncAll`);
    let idSyncTime = BuildRCAttribute(`sp.synch.time`);
    return (
      <SyncTabWrapper className="SyncTabWrapper" theme={this.props.theme}>
        <ActionsWrapper className="ActionsWrapper" theme={this.props.theme}>
          <div onClick={this.onSyncAll} {...idSyncAll} className="actions__btn">
            <Icon iconName="FabricSyncFolder" />
            <span>Sync All</span>
          </div>
          <div
            onClick={this.onStopSyncAll}
            {...idStopSync}
            className="actions__btn"
          >
            <Icon iconName="FabricUnsyncFolder" />
            <span>Stop Sync</span>
          </div>
        </ActionsWrapper>
        <ContentWrapper className="ContentWrapper" theme={this.props.theme}>
          <p className="content__title">Identity Sync</p>
          <p className="content__detail">
            Last sync from Azure Active Directory:{" "}
            <span {...idSyncTime}>13:00 25/12/2020</span>
          </p>
          <div className="content__btnGr">
            <Button
              disabled={this.props.isLoadingNotify}
              type="Primary"
              className="content__btn"
              darkMode={this.props.theme}
              text="Sync now"
              rcName="syncNow.Identity"
              onClick={this.onHandleSyncGroup}
            />
            <Button
              disabled={this.props.isLoadingNotify}
              type="Primary"
              className="content__btn ml"
              darkMode={this.props.theme}
              text="Stop sync"
              rcName="stopSync.Identity"
              onClick={this.onHandleStopSyncGroup}
            />
          </div>
        </ContentWrapper>
      </SyncTabWrapper>
    );
  }
}
