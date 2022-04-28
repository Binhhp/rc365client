import * as React from "react";
import {
  ItemWrapper,
  NotificationHeader,
  ActionWrapper,
  ListError,
  ErrorDetail,
} from "./ItemStyle";
import { NotificationItemProps } from "./ItemModels";
import { Icon } from "aod-dependencies/@uifabric/icons";
import { TimeFunction, BuildRCAttribute } from "src/common/functions";
import { TypeNotification } from "src/entity/enums";
import { IconGeneralProps } from "src/common/style";
import { IIconProps } from "aod-dependencies/@uifabric/icons1";

const RenderDetailError = (props: any) => {
  let { item, index } = props;
  let [isExpanded, setIsExpanded] = React.useState<boolean>(true);

  const onExpandError = () => {
    setIsExpanded(!isExpanded);
  };

  let idErrorItem = BuildRCAttribute(`errDetail.${index}`);
  return (
    <ErrorDetail theme={props.darkMode}>
      <p {...idErrorItem} onClick={onExpandError} className="error__item-title">
        {item.title}
      </p>
      {item.detail && !isExpanded && (
        <span className="error__item-detail">{item.detail}</span>
      )}
    </ErrorDetail>
  );
};

class Item extends React.Component<NotificationItemProps, any> {
  constructor(props: NotificationItemProps) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  private _mapIconByNotificationType = (type: TypeNotification): IIconProps => {
    switch (type) {
      case TypeNotification.Error:
        return IconGeneralProps.errorIcon;
      case TypeNotification.Success:
        return IconGeneralProps.successIcon;
      default:
        return IconGeneralProps.infoIcon;
    }
  };

  private _onHandleRemoveNotificationItem = () => {
    if (this.props.onRemoveNotificationItem) {
      this.props.onRemoveNotificationItem(this.props.notification.id);
    }
  };

  onRenderActionBtn = () => {
    let { type } = this.props.notification;
    let { darkMode, index } = this.props;
    let idReply = BuildRCAttribute(`btn.reply.${index}`);
    let idMore = BuildRCAttribute(`btn.collapse.${index}`);
    switch (type) {
      case "message":
        return (
          <ActionWrapper theme={darkMode}>
            <span {...idReply} className="action__btn">
              Reply
            </span>
          </ActionWrapper>
        );

      case "error":
        return (
          <ActionWrapper theme={darkMode}>
            <span
              {...idMore}
              className="action__btn"
              onClick={() => this.onExpandNotification()}
            >
              {this.state.isCollapsed ? "More" : "Less"}
            </span>
          </ActionWrapper>
        );

      default:
        break;
    }
  };

  onExpandNotification = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  render() {
    let icon = this._mapIconByNotificationType(this.props.notification.type);
    return (
      <ItemWrapper theme={this.props.darkMode}>
        <Icon
          onClick={this._onHandleRemoveNotificationItem}
          className="removeBtn"
          iconName="Cancel"
          rcName={`remove.${this.props.index}`}
        />
        <NotificationHeader
          theme={{
            darkMode: this.props.darkMode,
            type: this.props.notification.type,
          }}
        >
          <div className="header__title">
            <Icon iconName={icon.iconName} />
            <h3>{this.props.notification.title}</h3>
          </div>
          <span className="header__time">
            {this.props.notification.createdAt &&
              TimeFunction.onRenderTime(this.props.notification.createdAt)}
          </span>
        </NotificationHeader>
        <span className="item__description">
          {this.props.notification.description}
        </span>

        {/* Action Button Render */}
        {this.onRenderActionBtn()}

        {/** Detail Error List render */}
        {!this.state.isCollapsed && (
          <ListError theme={this.props.darkMode}>
            <ul>
              {this.props.notification.messages &&
                this.props.notification.messages.length > 0 &&
                this.props.notification.messages.map((item, index) => {
                  return (
                    <li className="error__item" key={item.id}>
                      <RenderDetailError
                        darkMode={this.props.darkMode}
                        item={item}
                        index={index}
                      />
                    </li>
                  );
                })}
            </ul>
          </ListError>
        )}
      </ItemWrapper>
    );
  }
}

export default Item;
