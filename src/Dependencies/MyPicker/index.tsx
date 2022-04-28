import * as React from "react";
import { PickerWrapper } from "./PickerStyle";
import { IPickerProps, IPickerStates } from "./PickerModels";
import TextField from "../TextField/CustomTextField";
import {
  IContextualMenuProps,
  DirectionalHint,
  ContextualMenu,
  IContextualMenuItem,
} from "../@uifabric/utilities/ContextualMenu";

class Picker extends React.Component<IPickerProps, IPickerStates> {
  constructor(props: IPickerProps) {
    super(props);
    this.state = {
      contextualMenu: undefined,
      value: "",
    };
  }

  componentDidMount() {
    if (this.props.value && this.props.value.trim() !== "") {
      this.setState({ value: this.props.value });
    }
  }

  private _onHandleChangeInput = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    val?: string
  ) => {
    if (val) {
      this.setState(
        {
          value: val,
          contextualMenu: this._getContextualMenuProps(ev, val),
        },
        () => this.onHandleSendValueToParent(val)
      );
    }
    if (!val) {
      this.setState(
        {
          value: "",
          contextualMenu: undefined,
        },
        () => this.onHandleSendValueToParent("")
      );
    }
  };

  private _onContextualMenuDismissed = () => {
    this.setState({ contextualMenu: undefined });
  };

  private _getContextualMenuProps = (
    ev: any,
    val: string
  ): IContextualMenuProps => {
    let crtItems = [...this.props.items];
    if (val.trim() !== "") {
      crtItems = crtItems.filter((i) =>
        i.text?.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      );
    }
    return {
      items: crtItems,
      target: ev.target as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      useTargetWidth: true,
      onDismiss: this._onContextualMenuDismissed,
    };
  };

  private _onHandleChoiceItemSort = (
    ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ) => {
    if (item) {
      this.setState({ value: item.text || "" }, () =>
        this.onHandleSendValueToParent(item.text || "")
      );
    }
  };

  onHandleSendValueToParent = (str?: string) => {
    if (this.props.onGetValueOfPicker) {
      this.props.onGetValueOfPicker(str ? str : this.state.value);
    }
  };

  render() {
    return (
      <PickerWrapper className="PickerWrapper" theme={this.props.darkMode}>
        <TextField
          onChange={this._onHandleChangeInput}
          className="picker__ipt"
          darkMode={this.props.darkMode}
          rcName={this.props.rcName}
          value={this.state.value}
          errorMessage={this.props.errorMessage}
          {...this.props.inputProps}
        />
        {this.state.contextualMenu && this.state.value.trim() !== "" && (
          <ContextualMenu
            onItemClick={this._onHandleChoiceItemSort}
            {...this.state.contextualMenu}
            rcName={this.props.rcName}
            styles={{
              root: {
                background:
                  this.props.darkMode === "dark" ? "#333333" : "#ffffff",
                border: "transparent",
              },
              container: {
                maxHeight: "200px",
                overflowY: "scroll",
                selectors: {
                  "::-webkit-scrollbar": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#333333" : "#ffffff",
                    cursor: "pointer",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background:
                      this.props.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4",
                    borderRadius: "10px",
                    backgroundClip: "content-box",
                    border: "solid 6px transparent",
                  },
                },
              },
              subComponentStyles: {
                menuItem: () => {
                  return {
                    root: [
                      {
                        color:
                          this.props.darkMode === "dark"
                            ? "#ffffff"
                            : "#212121",
                      },
                      {
                        selectors: {
                          ":hover": {
                            background:
                              this.props.darkMode === "dark"
                                ? "#445B6C"
                                : "#F4F4F4",
                            color:
                              this.props.darkMode === "dark"
                                ? "#ffffff"
                                : "#212121",
                          },
                          ":active": {
                            background:
                              this.props.darkMode === "dark"
                                ? "#445B6C"
                                : "#F4F4F4",
                            color:
                              this.props.darkMode === "dark"
                                ? "#ffffff"
                                : "#212121",
                          },
                        },
                      },
                    ],
                  };
                },
              },
            }}
            calloutProps={{
              styles: {
                root: { zIndex: 1 },
                calloutMain: { overflow: "hidden", opacity: 1 },
              },
            }}
            shouldFocusOnMount={false}
          />
        )}
      </PickerWrapper>
    );
  }
}

export default Picker;

// ":hover" :{
//   background: "#98a3a6",
//   backgroundClip: "content-box",
//   border: "solid 6px transparent",
// }
