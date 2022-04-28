"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CustomCommandBar = _interopRequireDefault(require("aod-dependencies/CommandBar/CustomCommandBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <CommandBarImport>
const overflowProps = {
  ariaLabel: "More commands"
};

function App() {
  const _items = [{
    key: "newItem",
    text: "New",
    iconProps: {
      iconName: "Add"
    },
    subMenuProps: {
      items: [{
        key: "emailMessage" // text: "Email message",
        // iconProps: { iconName: "Mail" },
        // ["data-automation-id"]: "newEmailButton", // optional

      }, {
        key: "calendarEvent" // text: "Calendar event",
        // iconProps: { iconName: "Calendar" },

      }]
    }
  }, {
    key: "upload",
    text: "Upload",
    iconProps: {
      iconName: "Upload"
    },
    href: "https://developer.microsoft.com/en-us/fluentui"
  }, {
    key: "share",
    text: "Share",
    iconProps: {
      iconName: "Share"
    },
    onClick: () => console.log("Share")
  }, {
    key: "download",
    text: "Download",
    iconProps: {
      iconName: "Download"
    },
    onClick: () => console.log("Download")
  }]; // const _overflowItems: ICommandBarItemProps[] = [
  //   {
  //     key: "move",
  //     text: "Move to...",
  //     onClick: () => console.log("Move to"),
  //     iconProps: { iconName: "MoveToFolder" },
  //   },
  //   {
  //     key: "copy",
  //     text: "Copy to...",
  //     onClick: () => console.log("Copy to"),
  //     iconProps: { iconName: "Copy" },
  //   },
  //   {
  //     key: "rename",
  //     text: "Rename...",
  //     onClick: () => console.log("Rename"),
  //     iconProps: { iconName: "Edit" },
  //   },
  // ];
  // const _farItems: ICommandBarItemProps[] = [
  //   {
  //     key: "tile",
  //     text: "Grid view",
  //     // This needs an ariaLabel since it's icon-only
  //     ariaLabel: "Grid view",
  //     iconOnly: true,
  //     iconProps: { iconName: "Tiles" },
  //     onClick: () => console.log("Tiles"),
  //   },
  //   {
  //     key: "info",
  //     text: "Info",
  //     // This needs an ariaLabel since it's icon-only
  //     ariaLabel: "Info",
  //     iconOnly: true,
  //     iconProps: { iconName: "Info" },
  //     onClick: () => console.log("Info"),
  //   },
  // ];
  // <CommandBarExample>

  return dom("div", {
    className: "App"
  }, dom(_CustomCommandBar.default, {
    items: _items // overflowItems={_overflowItems}
    // overflowButtonProps={overflowProps}
    // farItems={_farItems}
    ,
    ariaLabel: "Use left and right arrow keys to navigate between commands" // <CommandBarDarkMode>
    ,
    darkMode: "dark" // </CommandBarDarkMode>

  })); // </CommandBarExample>
}

var _default = App;
exports.default = _default;