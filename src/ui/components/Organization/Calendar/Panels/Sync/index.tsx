import * as React from "react";
import {
  ISynchronizedCalendarProps,
  ISynchronizedCalendarStates,
} from "./SyncModel";
import {
  SynchronizedCalendarWrapper,
  ContentWrapper,
  LastSyncWrapper,
} from "./SyncStyle";
import Button from "aod-dependencies/Button";
import { Icon } from "aod-dependencies/@uifabric/icons";
import { BuildRCAttribute } from "src/common/functions";
import { BaseCalendar } from "src/common/classes/BaseCalendar";
import { CalendarData } from "src/common/Data/CalendarData";

class SynchronizedCalendar extends React.Component<
  ISynchronizedCalendarProps,
  ISynchronizedCalendarStates
> {
  constructor(props: ISynchronizedCalendarProps) {
    super(props);
    this.state = {
      calendar: new BaseCalendar(),
    };
  }

  componentDidMount() {
    let item = new BaseCalendar();
    item.adResourceId = CalendarData.adResourceId;
    item.appointments = CalendarData.appointments;
    item.cannotSyncAppointments = CalendarData.cannotSyncAppointments;
    item.lastProcessResult = CalendarData.lastProcessResult;
    item.onPremise = CalendarData.onPremise;
    item.orgId = CalendarData.orgId;
    item.removeAppointments = CalendarData.removeAppointments;
    item.resourceId = CalendarData.resourceId;
    item.subcriptionId = CalendarData.subcriptionId;
    item.syncProcessData = CalendarData.syncProcessData;
    item.syncStatus = CalendarData.syncStatus;
    item.timeZone = CalendarData.timeZone;
    item.resourceName = CalendarData.resourceName;
    this.setState({ calendar: item });
  }

  onHandleSync = () => {
    if (
      !this.props.isHaveMessageSignalR &&
      this.props.workingCalendar &&
      this.props.OnStartSync && this.props.resource
    ) {
      this.props.OnStartSync(
        this.props.resource.id,
        this.props.resource.id
      );
    }
  };
  onHandleStopSync = () => {
    if (
      !this.props.isHaveMessageSignalR &&
      this.props.workingCalendar &&
      this.props.OnStopSync  && this.props.resource
    ) {
      this.props.OnStopSync(this.props.resource.id);
    }
  };
  render() {
    let idTime = BuildRCAttribute("sp.lastSyncTime");
    let idStatus = BuildRCAttribute("sp.lastSyncStatus");
    let idSource = BuildRCAttribute("sp.lastSyncSource");
    let idCalendarStatus = BuildRCAttribute("sp.status");
    let idResource = BuildRCAttribute("sp.resource");
    let idTimezone = BuildRCAttribute("sp.timezone");
    return (
      <SynchronizedCalendarWrapper
        className="SynchronizedCalendarWrapper"
        theme={this.props.theme}
      >
        <ContentWrapper className="ContentWrapper" theme={this.props.theme}>
          <div className="infomation">
            <h3 {...idResource}>{this.state.calendar.resourceName}</h3>
            <span {...idTimezone}>{this.state.calendar.timeZone}</span>
          </div>
          {this.state.calendar.syncStatus && (
            <div className="status">
              <Icon
                className="ico__status"
                rcName="status"
                iconName="SyncOccurence"
              />
              <span {...idCalendarStatus}>
                {this.state.calendar.syncStatus}
              </span>
            </div>
          )}
        </ContentWrapper>
        <LastSyncWrapper className="LastSyncWrapper">
          <p className="title">Last Synchronized</p>
          <p className="info">
            Time:{" "}
            <span {...idTime}>
              {this.state.calendar.lastProcessResult.syncedTime}
            </span>
          </p>
          <p className="info">
            Status:{" "}
            <span {...idStatus}>
              {this.state.calendar.lastProcessResult.status}
            </span>
          </p>
          <p className="info">
            Source:{" "}
            <span {...idSource}>
              {this.state.calendar.lastProcessResult.syncTriggerSource}
            </span>
          </p>
          <div className="action__gr">
            <Button
              type="Primary"
              rcName="sync.calendar"
              text="Sync"
              className="btn__action"
              darkMode={this.props.theme}
              onClick={this.onHandleSync}
            />
            <Button
              type="Primary"
              rcName="stopSync.calendar"
              text="Stop sync"
              className="btn__action"
              darkMode={this.props.theme}
              onClick={this.onHandleStopSync}
            />
          </div>
        </LastSyncWrapper>
      </SynchronizedCalendarWrapper>
    );
  }
}

export default SynchronizedCalendar;
