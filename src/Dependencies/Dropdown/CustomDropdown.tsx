import * as React from "react";
import { Dropdown } from "./Dropdown";
import { DropdownWrapper, ICustomDropdownProps } from "./CustomDropdownStyle";
import { IDropdown } from "office-ui-fabric-react";

class CustomDropdown extends React.Component<ICustomDropdownProps> {
  private _dropdown = React.createRef<IDropdown>();
  public componentDidMount() {
    if (this.props.autoFocus) (this._dropdown.current as any).focus();
  }
  render() {
    let borderColor =
      this.props.darkMode === "dark"
        ? "1px solid #ffffff"
        : "1px solid #a6a6a6";
    if (this.props.errorMessage) {
      borderColor =
        this.props.darkMode === "dark"
          ? "1px solid #F1707B"
          : "1px solid #A80000";
    }
    return (
      <DropdownWrapper className="DropdownWrapper" theme={this.props.darkMode}>
        <Dropdown
          componentRef={this._dropdown}
          {...this.props}
          styles={{
            dropdownOptionText: {
              color: this.props.darkMode === "dark" ? "#ffffff " : "#323130 ",
            },
            label: {
              selectors: {
                ":after": {
                  color: this.props.darkMode === "dark" ? "#F1707B" : "#A80000",
                },
              },
            },
            dropdownItemsWrapper: {
              maxHeight: 500,
            },
            errorMessage: {
              color: this.props.darkMode === "dark" ? "#F1707B" : "#A80000",
              paddingTop: 0,
              position: "absolute",
            },
            dropdown: {
              border: borderColor,
              // height: 32,
              selectors: {
                ":hover": {
                  border: borderColor,
                },
              },
            },
            title: {
              borderRadius: 0,
              fontWeight: "normal",
              border: "none !important",
              background: "transparent",
              color:
                this.props.darkMode === "dark"
                  ? "#ffffff !important"
                  : "#323130 !important",
            },
            dropdownItemSelected: [
              {
                backgroundColor:
                  this.props.darkMode === "dark" ? "#000000" : "#edebe9",
                color: this.props.darkMode === "dark" ? "#ffffff" : "#333333",
              },
              {
                selectors: {
                  ":hover:focus": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                  ":focus": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                  },
                  ":active": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                },
              },
            ],
            dropdownItem: [
              {
                color: this.props.darkMode === "dark" ? "#ffffff" : "#212121",
              },
              {
                selectors: {
                  ":hover:focus": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#212121" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                  ":active": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                  ":hover": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#212121" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                },
              },
            ],
            dropdownItemDisabled: [
              {
                color: this.props.darkMode === "dark" ? "#eaeaea" : "#A6A6A6",
                opacity: this.props.darkMode === "dark" ? "0.5" : "1",
              },
            ],
            ...this.props.styles,
          }}
          calloutProps={{
            backgroundColor:
              this.props.darkMode === "dark" ? "#333333" : "#ffffff",
            styles: {
              calloutMain: [
                {
                  border:
                    this.props.darkMode === "dark"
                      ? "1px solid #212121"
                      : "1px solid #f7f7f7",
                  selectors: {
                    "&::-webkit-scrollbar": {
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background:
                        this.props.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4",
                      borderRadius: " 10px",
                      backgroundClip: "content-box",
                      border: "solid 6px transparent",
                    },
                  },
                },
              ],
            },
            ...this.props.calloutProps,
          }}
          onRenderPlaceholder={() => {
            return (
              <span
                className="ddl.placeHolder"
                style={{
                  opacity: "0.6",
                }}
              >
                {this.props.placeholder}
              </span>
            );
          }}
        />
      </DropdownWrapper>
    );
  }
}

export default CustomDropdown;
