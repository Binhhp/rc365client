import * as React from "react";
import { SyncTabWrapper, ContentWrapper, ActionsWrapper } from "./SyncStyle";
import { SyncTabProps } from "./SyncModels";
import Button from "aod-dependencies/Button";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { BuildRCAttribute } from "src/common/functions";

export default class SyncTab extends React.Component<SyncTabProps> {
  private _onHandleSyncDomain = () => {
    if (this.props.domain && this.props.OnSyncDomain) {
      this.props.OnSyncDomain(this.props.domain.guid);
    }
  };
  private _onHandleStopSyncDomain = () => {
    if (this.props.domain && this.props.OnStopSyncDomain) {
      this.props.OnStopSyncDomain(this.props.domain.guid);
    }
  };

  onSyncAll = () => {
    console.log("sync all");
  };
  onStopSyncAll = () => {
    console.log("stop sync all");
  };

  render() {
    let idSyncAll = BuildRCAttribute(`btn.syncAll`);
    let idStopSync = BuildRCAttribute(`btn.stopSyncAll`);
    let idSyncTime = BuildRCAttribute(`sp.sync.time`);
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
              type="Primary"
              className="content__btn"
              darkMode={this.props.theme}
              text="Sync now"
              rcName="syncNow.Identity"
              onClick={this._onHandleSyncDomain}
            />
            <Button
              type="Primary"
              className="content__btn"
              darkMode={this.props.theme}
              text="Stop sync"
              rcName="stopSync.Identity"
              onClick={this._onHandleStopSyncDomain}
            />
          </div>
        </ContentWrapper>
      </SyncTabWrapper>
    );
  }
}
