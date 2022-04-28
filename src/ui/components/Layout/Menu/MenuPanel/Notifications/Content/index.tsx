import * as React from "react";
import { NottificationListWrapper, EmptyContent } from "./NotificationStyle";
import { INotificationProps, INotificationState } from "./NotificationsModels";
import { BuildRCAttribute } from "src/common/functions";
import { LoadingSpinner } from "src/common/ui/Loading";
import Item from "../Item";
import EmptyIMG from "src/assets/notification/EmptyIllustration-c1bf49c43c40b275a1de765657894875.svg";
// import Toggle from "aod-dependencies/Toggle/CustomToggle";

export default class Notification extends React.Component<
  INotificationProps,
  INotificationState
> {
  constructor(props: INotificationProps) {
    super(props);
    this.state = {
      notifications: [],
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props.notifications) {
      this.setState({
        notifications: this.props.notifications,
      });
    }
  }

  componentDidUpdate(prevProps: INotificationProps) {
    if (
      ((this.props.isHaveMessageSyncSignalR !==
        prevProps.isHaveMessageSyncSignalR &&
        !prevProps.isHaveMessageSyncSignalR) ||
        (this.props.isHaveMessageSignalR !== prevProps.isHaveMessageSignalR &&
          !prevProps.isHaveMessageSignalR)) &&
      this.props.OnGetNotificationItems
    ) {
      this.props.OnGetNotificationItems();
    }
  }

  private _onHandleUpdateNotification = (id?: string) => {
    if (
      this.props.OnRemoveNotificationItems &&
      this.props.notifications.length > 0
    ) {
      let crtNotification = [...this.state.notifications];
      let index = crtNotification.findIndex((n) => n.id === id);
      if (index !== -1) {
        crtNotification.splice(index, 1);
        this.setState({ notifications: crtNotification });
      }
      this.props.OnRemoveNotificationItems(id);
    }
  };

  HandleClearAllNotification = () => {
    this._onHandleUpdateNotification();
  };

  HandleRemoveANotification = (id: string) => {
    this._onHandleUpdateNotification(id);
  };

  onScrollList = (event: React.MouseEvent<HTMLDivElement, UIEvent>): void => {
    if (this.props.notifications && this.props.notifications.length > 0) {
      let listItem: HTMLElement = document.getElementsByClassName(
        "notification-contain"
      )[0] as HTMLElement;
      if (
        listItem &&
        Math.ceil(listItem?.scrollTop) ===
          listItem?.scrollHeight - listItem?.offsetHeight &&
        this.props.OnGetNotificationItems
      ) {
        this.props.OnGetNotificationItems();
      }
    }
  };

  render() {
    let { theme } = this.props;
    let clientHeight = document.documentElement.clientHeight;
    let idClearBtn = BuildRCAttribute("notifications.clear");
    let idEmpty = BuildRCAttribute("notifications.empty");
    return (
      <NottificationListWrapper
        theme={{ darkMode: theme, maxHeight: clientHeight - 180 }}
      >
        <div
          style={{
            margin: "15px 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span
            className="btn__clear"
            onClick={this.HandleClearAllNotification}
            {...idClearBtn}
          >
            Clear all
          </span>
        </div>
        {this.props.isLoading ? (
          <div style={{ height: "100%" }}>
            <LoadingSpinner rcName="setting.notifications" darkMode={theme} />
          </div>
        ) : (
          <div
            id="notification-contain"
            onScroll={this.onScrollList}
            className="noti-list"
          >
            {this.state.notifications && this.state.notifications.length > 0 ? (
              this.state.notifications.map((item, index) => {
                return (
                  <Item
                    key={index}
                    notification={item}
                    darkMode={theme}
                    onRemoveNotificationItem={this.HandleRemoveANotification}
                    index={index}
                  />
                );
              })
            ) : (
              <EmptyContent {...idEmpty} theme={theme}>
                <img src={EmptyIMG} alt="empty_img" />
                <h3>You don't have any notifications</h3>
                <span>Please check back later</span>
              </EmptyContent>
            )}
          </div>
        )}
      </NottificationListWrapper>
    );
  }
}
