import * as React from "react";
import {
  LayoutWrapper,
  HeaderTittle,
  HeaderName,
  BtnWrapper,
  UserButtonWrapper,
  BtnMobile,
  ContentWrapper,
  PageWrapper,
  LoadingNotification,
} from "./LayoutStyle";
import { LayoutProps, LayoutState } from "./LayoutModels";
import { IconButton } from "aod-dependencies/Button/IconButton/IconButton";
import { IIconProps } from "aod-dependencies/@uifabric/icons";
import CustomToolTip from "aod-dependencies/Tooltip/CustomToolTip";
import {
  Persona,
  PersonaSize,
  PersonaPresence,
  PersonaInitialsColor,
} from "aod-dependencies/Persona";
import { Link } from "aod-dependencies/Link";
import { IContextualMenuProps } from "aod-dependencies/@uifabric/utilities/ContextualMenu";
import { darkTheme, lightTheme } from "aod-dependencies/@uifabric/DefaultTheme";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import SideBar from "src/ui/containers/Layout/SideBarContainer";
import Page from "src/ui/containers/Layout/PageContainer";
import { LayerHost } from "aod-dependencies/@uifabric/utilities/Layer";
import { Panel } from "aod-dependencies/Panel";
import { mergeStyles } from "aod-dependencies/@uifabric/styling";
import { Stack } from "aod-dependencies/Stack";
import { BuildRCAttribute } from "src/common/functions";
import { PanelStyle } from "src/common/style";
import SettingContainer from "src/ui/containers/Layout/SettingContainer";
import NotificationContainer from "src/ui/containers/Layout/NotificationContainer";
import Help from "../MenuPanel/Help";
import Account from "../MenuPanel/Account";
import { IconGeneralProps } from "src/common/style";
import { ProgressIndicator } from "aod-dependencies/ProgressIndicator/ProgressIndicator";

const layerHostClass = mergeStyles({
  position: "relative",
  height: 400,
  overflow: "hidden",
  border: "1px solid #ccc",
});

export default class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    this.state = {
      isPanelOpen: false,
      isCollapsedLeftBar: false,
      targetButton: undefined,
    };
  }

  componentDidMount() {
    this._onHandleGetTimezones();
  }

  private _onHandleGetTimezones = () => {
    if (this.props.OnGetTimeZones) {
      this.props.OnGetTimeZones();
    }
  };

  private _onHandleUpdateNotification = () => {
    if (this.props.OnUpdateNotificationsList && this.props.notifications) {
      let crtNotification = [...this.props.notifications].map((n) => {
        n.isReaded = true;
        return n;
      });
      this.props.OnUpdateNotificationsList(crtNotification);
    }
  };

  onClickIconHeader = (value: {
    key: string;
    text?: string;
    iconProps?: IIconProps;
  }) => {
    this.setState({
      isPanelOpen: true,
      targetButton: value,
    });
    if (
      value.key === "notifications" &&
      this.props.notifications &&
      this.props.notifications.length > 0
    ) {
      this._onHandleUpdateNotification();
    }
    if (
      this.props.notifications &&
      this.props.notifications.length < 1 &&
      this.props.OnGetNotificationItems
    ) {
      this.props.OnGetNotificationItems(true);
    }
  };

  onRemovePanel = () => {
    this.setState({
      isPanelOpen: false,
      targetButton: undefined,
    });
  };

  onRenderContentPanel = (key: string) => {
    switch (key) {
      case "settings":
        return <SettingContainer />;
      case "help":
        return <Help />;
      case "notifications":
        return <NotificationContainer />;
      default:
        return <Account />;
    }
  };

  onHandleCollapsedStatus = () => {
    this.setState({
      isCollapsedLeftBar: !this.state.isCollapsedLeftBar,
    });
  };

  render() {
    const { isPanelOpen, targetButton } = this.state;
    let idUserBtn = BuildRCAttribute("btn.Header.Account");
    let idMoreBtn = BuildRCAttribute("btn.Header.More");
    let idNotification = BuildRCAttribute("notification.count");
    let idNotificationNumber = BuildRCAttribute("notification.number");
    const currentTheme =
      this.props.theme === "dark" ? { ...darkTheme } : { ...lightTheme };
    const menuProps: IContextualMenuProps = {
      items: [
        {
          key: "settings",
          text: "Settings",
          iconProps: IconGeneralProps.settingIcon,
          onClick: () =>
            this.onClickIconHeader({ key: "settings", text: "Settings" }),
        },
        {
          key: "notifications",
          text: "Notifications",
          iconProps: IconGeneralProps.ringerIcon,
          onClick: () =>
            this.onClickIconHeader({
              key: "notifications",
              text: "Notifications",
            }),
        },
        {
          key: "help",
          text: "Help",
          iconProps: IconGeneralProps.helpIcon,
          onClick: () => this.onClickIconHeader({ key: "help", text: "Help" }),
        },
      ],
      directionalHintFixed: true,
    };
    return (
      <PageWrapper
        theme={{
          darkMode: this.props.theme,
          isCollapsedLeftBar: this.state.isCollapsedLeftBar,
        }}
        className="PageWrapper"
      >
        <LayoutWrapper className="LayoutWrapper">
          <ContentWrapper className="LayoutWrContentWrapperapper">
            <HeaderTittle className="HeaderTittle">
              <Link href={this.props.content.titleLink}>
                {this.props.content.title}
              </Link>
            </HeaderTittle>
            <HeaderName className="HeaderName">
              <span>{this.props.content.name}</span>
            </HeaderName>
          </ContentWrapper>
          <BtnWrapper theme={this.props.theme} className="is-pc BtnWrapper">
            {menuProps.items.map((item, index) => {
              let isVisibled =
                item.iconProps === IconGeneralProps.ringerIcon &&
                this.props.notifications &&
                this.props.notifications.filter((n) => !n.isReaded).length > 0;
              return (
                <CustomToolTip key={index} content={item.text}>
                  <IconButton
                    className={
                      targetButton && targetButton.key === item.key
                        ? "selected"
                        : ""
                    }
                    onClick={() => this.onClickIconHeader(item)}
                    title={item.text}
                    iconProps={item.iconProps}
                    rcName={`Header.${item.text}`}
                  />
                  {item.iconProps === IconGeneralProps.ringerIcon &&
                    this.props.isLoadingNotify && (
                      <LoadingNotification>
                        <ProgressIndicator
                          styles={{
                            progressTrack: {
                              backgroundColor: "rgba(255, 255, 255, 0)",
                            },
                            progressBar: {
                              background: `#00bcf2`,
                            },
                          }}
                        />
                      </LoadingNotification>
                    )}
                  {item.iconProps === IconGeneralProps.ringerIcon &&
                    this.props.notifications &&
                    this.props.notifications.filter((n) => !n.isReaded).length >
                      0 && (
                      <div
                        className="notification-count"
                        style={{ opacity: `${isVisibled ? "1" : "0"}` }}
                        {...idNotification}
                      >
                        <span {...idNotificationNumber}>
                          {this.props.notifications
                            ? this.props.notifications.filter(
                                (n) => !n.isReaded
                              ).length
                            : "0"}
                        </span>
                      </div>
                    )}
                </CustomToolTip>
              );
            })}
            <UserButtonWrapper
              theme={this.props.theme}
              onClick={() =>
                this.onClickIconHeader({ key: "profile", text: "My Account" })
              }
              className={
                targetButton && targetButton.key === "profile" ? "selected" : ""
              }
              {...idUserBtn}
            >
              <Persona
                initialsColor={PersonaInitialsColor.black}
                size={PersonaSize.size32}
                presence={PersonaPresence.online}
                text="Minh Duc"
                hidePersonaDetails
              />
            </UserButtonWrapper>
          </BtnWrapper>
          <BtnMobile theme={this.props.theme} className="is-mobile">
            <Customizer {...currentTheme}>
              <IconButton
                {...idMoreBtn}
                iconProps={IconGeneralProps.moreIcon}
                menuProps={menuProps}
              />
            </Customizer>
          </BtnMobile>
        </LayoutWrapper>
        <Customizer scopedSettings={{ Layer: { hostId: "layerHeader" } }}>
          {/* {isPanelOpen && ( */}
          <Panel
            isOpen={isPanelOpen}
            hasCloseButton
            headerText={
              targetButton && targetButton.text ? targetButton.text : ""
            }
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={this.onRemovePanel}
            isLightDismiss={true}
            styles={PanelStyle(this.props.theme)}
            rcName="header"
          >
            {targetButton && this.onRenderContentPanel(targetButton.key)}
          </Panel>
          {/* )} */}
        </Customizer>
        <LayerHost
          id="layerHeader"
          className={layerHostClass}
          style={{ zIndex: 999, border: 0, height: "100%" }}
        >
          <Stack
            styles={{
              root: {
                width: "100%",
                height: "100%",
                position: "relative",
              },
            }}
            horizontal
          >
            <Stack.Item
              className="left__bar"
              styles={{ root: { height: "100%" } }}
              grow={1}
            >
              <SideBar onGetCollapsedStatus={this.onHandleCollapsedStatus} />
            </Stack.Item>
            <Stack.Item
              styles={{
                root: { width: "100%", height: "100%", overflow: "auto" },
              }}
              className="main__content"
              grow={5}
            >
              <Page />
            </Stack.Item>
          </Stack>
        </LayerHost>
      </PageWrapper>
    );
  }
}
