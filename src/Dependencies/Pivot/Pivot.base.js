import { __assign, __extends, __rest } from "tslib";
import * as React from "react";
import {
  warnDeprecations,
  KeyCodes,
  getId,
  getNativeProps,
  divProperties,
  classNamesFunction,
  warn,
  initializeComponentRef,
} from "../@uifabric/utilities";
import CommandButton from "../Button/CommandBarButton/CustomCommanBarButton";
import { FocusZone, FocusZoneDirection } from "../FocusZone";
import { PivotItem } from "./PivotItem";
import { PivotLinkFormat } from "./Pivot.types";
import { PivotLinkSize } from "./Pivot.types";
import { Icon } from "../@uifabric/icons/Icon";
var getClassNames = classNamesFunction();
var PivotName = "Pivot";
/**
 *  Usage:
 *
 *     <Pivot>
 *       <PivotItem headerText="Foo">
 *         <Label>Pivot #1</Label>
 *       </PivotItem>
 *       <PivotItem headerText="Bar">
 *         <Label>Pivot #2</Label>
 *       </PivotItem>
 *       <PivotItem headerText="Bas">
 *         <Label>Pivot #3</Label>
 *       </PivotItem>
 *     </Pivot>
 */
var PivotBase = /** @class */ (function (_super) {
  __extends(PivotBase, _super);
  function PivotBase(props) {
    var _this = _super.call(this, props) || this;
    _this._focusZone = React.createRef();
    _this._renderPivotLink = function (linkCollection, link, selectedKey) {
      var itemKey = link.itemKey,
        headerButtonProps = link.headerButtonProps;
      var tabId = linkCollection.keyToTabIdMapping[itemKey];
      var onRenderItemLink = link.onRenderItemLink;
      var linkContent;
      var isSelected = selectedKey === itemKey;
      let rcName = this.props.rcName;
      let headerText = String(link.headerText).toLocaleLowerCase();
      if (onRenderItemLink) {
        linkContent = onRenderItemLink(link, _this._renderLinkContent);
      } else {
        linkContent = _this._renderLinkContent(link, rcName, headerText);
      }
      var contentString = link.headerText || "";
      contentString += link.itemCount ? " (" + link.itemCount + ")" : "";
      // Adding space supplementary for icon
      contentString += link.itemIcon ? " xx" : "";
      return React.createElement(
        CommandButton,
        __assign(
          { rcName: rcName ? `pv.${rcName}.${headerText}` : undefined },
          headerButtonProps,
          {
            id: tabId,
            key: itemKey,
            className: isSelected
              ? _this._classNames.linkIsSelected
              : _this._classNames.link,
            onClick: _this._onLinkClick.bind(_this, itemKey),
            onKeyDown: _this._onKeyDown.bind(_this, itemKey),
            "aria-label": link.ariaLabel,
            role: "tab",
            "aria-selected": isSelected,
            name: link.headerText,
            keytipProps: link.keytipProps,
            "data-content": contentString,
            rcName: rcName ? `pv.${rcName}.${headerText}` : undefined,
          }
        ),
        linkContent
      );
    };
    _this._renderLinkContent = function (link, rcName, headerText) {
      var itemCount = link.itemCount,
        itemIcon = link.itemIcon,
        headerText = link.headerText;
      var classNames = _this._classNames;
      return React.createElement(
        "span",
        { className: classNames.linkContent },
        itemIcon !== undefined &&
          React.createElement(
            "span",
            { className: classNames.icon },
            React.createElement(Icon, { iconName: itemIcon, rcName })
          ),
        headerText !== undefined &&
          React.createElement(
            "span",
            {
              className: classNames.text,
              "data-rc-id": rcName
                ? `sp.text.${rcName}.${headerText}`
                : undefined,
            },
            " ",
            link.headerText
          ),
        itemCount !== undefined &&
          React.createElement(
            "span",
            {
              className: classNames.count,
              "data-rc-id": rcName
                ? `sp.text.${rcName}.${headerText}`
                : undefined,
            },
            " (",
            itemCount,
            ")"
          )
      );
    };
    _this.onHandleBtnMoveLeft = function () {
      _this.props.onHandleMoveToLeft();
    };
    _this.onHandleBtnMoveRight = function () {
      _this.props.onHandleMoveToRight();
    };
    initializeComponentRef(_this);
    if (process.env.NODE_ENV !== "production") {
      warnDeprecations(PivotName, props, {
        initialSelectedKey: "defaultSelectedKey",
        initialSelectedIndex: "defaultSelectedIndex",
      });
    }
    _this._pivotId = getId(PivotName);
    var links = _this._getPivotLinks(props).links;
    // tslint:disable-next-line:deprecation
    var _a = props.defaultSelectedKey,
      defaultSelectedKey = _a === void 0 ? props.initialSelectedKey : _a,
      _b = props.defaultSelectedIndex,
      defaultSelectedIndex = _b === void 0 ? props.initialSelectedIndex : _b;
    var selectedKey;
    if (defaultSelectedKey) {
      selectedKey = defaultSelectedKey;
    } else if (typeof defaultSelectedIndex === "number") {
      selectedKey = links[defaultSelectedIndex].itemKey;
    } else if (links.length) {
      selectedKey = links[0].itemKey;
    }
    _this.state = {
      selectedKey: selectedKey,
    };
    return _this;
  }
  /**
   * Sets focus to the first pivot tab.
   */
  PivotBase.prototype.focus = function () {
    if (this._focusZone.current) {
      this._focusZone.current.focus();
    }
  };
  PivotBase.prototype.render = function () {
    var _this = this;
    var linkCollection = this._getPivotLinks(this.props);
    var selectedKey = this._getSelectedKey(linkCollection);
    var divProps = getNativeProps(this.props, divProperties);
    this._classNames = this._getClassNames(this.props);
    return React.createElement(
      "div",
      __assign(
        {
          role: "toolbar",
          style: {
            overflow: "hidden",
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        },
        divProps
      ),
      this._renderPivotLinks(linkCollection, selectedKey),
      selectedKey &&
        linkCollection.links.map(function (link) {
          return (
            (link.alwaysRender === true || selectedKey === link.itemKey) &&
            _this._renderPivotItem(
              linkCollection,
              link.itemKey,
              selectedKey === link.itemKey
            )
          );
        })
    );
  };
  PivotBase.prototype._getSelectedKey = function (linkCollection) {
    var propsSelectedKey = this.props.selectedKey;
    if (
      this._isKeyValid(linkCollection, propsSelectedKey) ||
      propsSelectedKey === null
    ) {
      return propsSelectedKey;
    }
    var stateSelectedKey = this.state.selectedKey;
    if (this._isKeyValid(linkCollection, stateSelectedKey)) {
      return stateSelectedKey;
    }
    if (linkCollection.links.length) {
      return linkCollection.links[0].itemKey;
    }
    return undefined;
  };
  /**
   * Renders the set of links to route between pivots
   */

  PivotBase.prototype._renderPivotLinks = function (
    linkCollection,
    selectedKey
  ) {
    var _this = this;
    var rcName = _this.props.rcName;
    var darkMode = _this.props.darkMode;
    var items = linkCollection.links.map(function (l) {
      return _this._renderPivotLink(linkCollection, l, selectedKey);
    });
    let btnLeftIcon = React.createElement(
      "div",
      {
        className: "moveLeft-btn",
        style: {
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "0 6px",
          opacity: "0.3",
          position: "absolute",
          height: "100%",
          backgroundColor: darkMode === "dark" ? "#121212" : "#e6e6e6",
          top: 0,
          left: 0,
          zIndex: 1,
        },
        onClick: _this.onHandleBtnMoveLeft,
        "data-rc-id": "moveLeft-btn",
      },
      React.createElement(Icon, {
        iconName: "ChevronLeft",
        className: "left__icon",
      })
    );
    let btnRightIcon = React.createElement(
      "div",
      {
        className: "moveRight-btn",
        style: {
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "0 6px",
          opacity: "0.3",
          position: "absolute",
          height: "100%",
          backgroundColor: darkMode === "dark" ? "#121212" : "#e6e6e6",
          top: 0,
          right: 0,
          zIndex: 1,
        },
        onClick: _this.onHandleBtnMoveRight,
        "data-rc-id": "moveRight-btn",
      },
      React.createElement(Icon, {
        iconName: "ChevronRight",
        className: "right__icon",
      })
    );
    let a = React.createElement(
      "div",
      { className: "tab-wrapper", style: { position: "relative" } },
      btnLeftIcon,
      React.createElement(
        FocusZone,
        {
          id: rcName ? `tabListWrapper-${rcName}` : `tabListWrapper`,
          className: this._classNames.root,
          role: "tablist",
          componentRef: this._focusZone,
          direction: FocusZoneDirection.horizontal,
          style: { scrollBehavior: "smooth" },
        },
        items
      ),
      btnRightIcon
    );
    return a;
    // return (React.createElement(FocusZone, { className: this._classNames.root, role: "tablist", componentRef: this._focusZone, direction: FocusZoneDirection.horizontal,style:{position:"relative"} }, newItems));
  };
  /**
   * Renders a Pivot Item
   */
  PivotBase.prototype._renderPivotItem = function (
    linkCollection,
    itemKey,
    isActive
  ) {
    if (this.props.headersOnly || !itemKey) {
      return null;
    }
    var index = linkCollection.keyToIndexMapping[itemKey];
    var selectedTabId = linkCollection.keyToTabIdMapping[itemKey];
    return React.createElement(
      "div",
      {
        role: "tabpanel",
        style: { overflow: "hidden", height: "100%" },
        hidden: !isActive,
        key: itemKey,
        "aria-hidden": !isActive,
        "aria-labelledby": selectedTabId,
        className: `${this._classNames.itemContainer} tabContent`,
      },
      React.Children.toArray(this.props.children)[index]
    );
  };
  /**
   * Gets the set of PivotLinks as array of IPivotItemProps
   * The set of Links is determined by child components of type PivotItem
   */
  PivotBase.prototype._getPivotLinks = function (props) {
    var _this = this;
    var result = {
      links: [],
      keyToIndexMapping: {},
      keyToTabIdMapping: {},
    };
    React.Children.map(
      React.Children.toArray(props.children),
      function (child, index) {
        if (_isPivotItem(child)) {
          var pivotItem = child;
          var _a = pivotItem.props,
            linkText = _a.linkText,
            pivotItemProps = __rest(_a, ["linkText"]);
          var itemKey = pivotItem.props.itemKey || index.toString();
          result.links.push(
            __assign(
              __assign(
                {
                  // Use linkText (deprecated) if headerText is not provided
                  headerText: linkText,
                },
                pivotItemProps
              ),
              { itemKey: itemKey }
            )
          );
          result.keyToIndexMapping[itemKey] = index;
          result.keyToTabIdMapping[itemKey] = _this._getTabId(itemKey, index);
        } else {
          warn(
            "The children of a Pivot component must be of type PivotItem to be rendered."
          );
        }
      }
    );
    return result;
  };
  /**
   * Generates the Id for the tab button.
   */
  PivotBase.prototype._getTabId = function (itemKey, index) {
    if (this.props.getTabId) {
      return this.props.getTabId(itemKey, index);
    }
    return this._pivotId + ("-Tab" + index);
  };
  /**
   * whether the key exists in the pivot items.
   */
  PivotBase.prototype._isKeyValid = function (linkCollection, itemKey) {
    return (
      itemKey !== undefined &&
      itemKey !== null &&
      linkCollection.keyToIndexMapping[itemKey] !== undefined
    );
  };
  /**
   * Handles the onClick event on PivotLinks
   */
  PivotBase.prototype._onLinkClick = function (itemKey, ev) {
    ev.preventDefault();
    this._updateSelectedItem(itemKey, ev);
  };
  /**
   * Handle the onKeyDown event on the PivotLinks
   */
  PivotBase.prototype._onKeyDown = function (itemKey, ev) {
    if (ev.which === KeyCodes.enter) {
      ev.preventDefault();
      this._updateSelectedItem(itemKey);
    }
  };
  /**
   * Updates the state with the new selected index
   */
  PivotBase.prototype._updateSelectedItem = function (itemKey, ev) {
    this.setState({
      selectedKey: itemKey,
    });
    var linkCollection = this._getPivotLinks(this.props);
    if (
      this.props.onLinkClick &&
      linkCollection.keyToIndexMapping[itemKey] >= 0
    ) {
      var index = linkCollection.keyToIndexMapping[itemKey];
      // React.Element<any> cannot directly convert to PivotItem.
      var item = React.Children.toArray(this.props.children)[index];
      if (_isPivotItem(item)) {
        this.props.onLinkClick(item, ev);
      }
    }
  };
  PivotBase.prototype._getClassNames = function (props) {
    var theme = props.theme;
    var rootIsLarge = props.linkSize === PivotLinkSize.large;
    var rootIsTabs = props.linkFormat === PivotLinkFormat.tabs;
    return getClassNames(props.styles, {
      theme: theme,
      rootIsLarge: rootIsLarge,
      rootIsTabs: rootIsTabs,
    });
  };
  return PivotBase;
})(React.Component);
export { PivotBase };
function _isPivotItem(item) {
  // In theory, we should be able to just check item.type === PivotItem.
  // However, under certain unclear circumstances (see https://github.com/microsoft/fluentui/issues/10785),
  // the object identity is different despite the function implementation being the same.
  return (
    !!item &&
    typeof item === "object" &&
    !!item.type &&
    item.type.name === PivotItem.name
  );
}
//# sourceMappingURL=Pivot.base.js.map
