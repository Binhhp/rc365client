import * as React from "react";
import { BarWrapper, CollapseButton, LeftMenuWrapper } from "./SideBarStyle";
import { ILeftSideBarProps, ILeftSideBarStates } from "./SideBarModels";
import { IconButton } from "aod-dependencies/Button/IconButton/IconButton";
import { IIconProps } from "aod-dependencies/@uifabric/icons";
import { Nav, INavStyles, INavLinkGroup, INavLink } from "aod-dependencies/Nav";
import { Layer, LayerHost } from "aod-dependencies/@uifabric/utilities/Layer";
import { ThemeEnums } from "src/entity/enums";

const CollapseBtn: IIconProps = { iconName: "GlobalNavButton" };

const navStyles: Partial<INavStyles> = {
  root: { width: "15%" },
};

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        key: "organizations",
        name: "Organizations",
        url: "/organizations",
        isExpanded: true,
        // links: [
        //   {
        //     key: "calendar",
        //     name: "Calendar",
        //     url: "/calendar",
        //   },
        // ],
      },

      {
        key: "sensors",
        name: "Sensor Management",
        url: "/sensors",
      },
      {
        key: "tenants",
        name: "Tenant Management",
        url: "/tenants",
      },
    ],
  },
];

const navContent = (
  <Nav
    styles={navStyles}
    ariaLabel="Nav example similiar to one found in this demo page"
    groups={navLinkGroups}
  />
);

export default class SideBar extends React.Component<
  ILeftSideBarProps,
  ILeftSideBarStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isCollapsed: false,
      showLayer: false,
      layerHeight: 0,
      crtKey: "",
    };
  }

  componentDidMount() {
    let mobileHight = document.getElementById("leftMenu-wrapper")?.clientHeight;
    let viewPortWidth = document.getElementById("root")?.clientWidth;
    let key = this._onHandleCheckURL();
    if (mobileHight && viewPortWidth && viewPortWidth > 600) {
      this.setState({
        layerHeight: mobileHight - 46,
        crtKey: key,
      });
    } else if (mobileHight && viewPortWidth && viewPortWidth <= 600) {
      this.setState({
        layerHeight: mobileHight - 46,
        isCollapsed: true,
        crtKey: key,
      });
    } else {
      this.setState({
        crtKey: key,
      });
    }
  }

  private _onHandleCheckURL = (): string => {
    let url = window.location.href;
    if (url.indexOf("sensors") !== -1) {
      return "sensors";
    }
    if (url.indexOf("tenants") !== -1 || url.indexOf("tenant") !== -1) {
      return "tenants";
    }
    if (url.indexOf("organizations") !== -1 || url.indexOf("orgId") !== -1) {
      return "organizations";
    }
    if (url.indexOf("calendar") !== -1) {
      return "calendar";
    }
    return "";
  };

  onHandleSelectLink = (
    ev?: React.MouseEvent<HTMLElement>,
    item?: INavLink
  ) => {
    if (item && item.key) {
      this.setState({ crtKey: item.key });
    }
    // localStorage.setItem("test", JSON.stringify(item));
  };

  onShowSideBar = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
    this.props.onGetCollapsedStatus();
  };

  render() {
    let { isCollapsed } = this.state;
    return (
      <LeftMenuWrapper
        id="leftMenu-wrapper"
        theme={{
          darkMode: this.props.theme,
          width: isCollapsed ? "40px" : "270px",
          layerHeight: this.state.layerHeight,
          isCollapsed: isCollapsed,
        }}
        style={{
          borderRight: !isCollapsed
            ? `${this.props.theme ? "1px solid #000000" : "1px solid #ecece9"}`
            : "none",
        }}
        className="LeftMenuWrapper"
      >
        <BarWrapper
          className="BarWrapper"
          theme={{ darkMode: this.props.theme }}
        >
          <CollapseButton
            className="CollapseButton"
            theme={{ darkMode: this.props.theme }}
          >
            <IconButton
              rcName="collapseLeftBar-btn"
              onClick={this.onShowSideBar}
              iconProps={CollapseBtn}
            />
          </CollapseButton>
        </BarWrapper>
        <div className="is-pc">
          {!isCollapsed && (
            <Nav
              styles={navStyles}
              groups={navLinkGroups}
              rcName="leftSideBar"
              darkMode={ThemeEnums.Dark}
              onLinkClick={this.onHandleSelectLink}
              selectedKey={this.state.crtKey}
            />
          )}
        </div>
        <div className="is-mobile">
          {!isCollapsed ? (
            <>
              <LayerHost id="sideBar__layer" className="layerHost" />
              <Layer hostId={"sideBar__layer"}>{navContent}</Layer>
            </>
          ) : null}
        </div>
      </LeftMenuWrapper>
    );
  }
}
