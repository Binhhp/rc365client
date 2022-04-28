import * as React from "react";
import { SearchBox } from "./SearchBox";
import { ICustomSearchBox, SearchBoxWrapper } from "./CustomSearchBoxStyle";
import { Customizer } from "../@uifabric/utilities";
import { darkTheme, lightTheme } from "../@uifabric/DefaultTheme";

class CustomSearchBox extends React.Component<ICustomSearchBox> {
  render() {
    const currentTheme =
      this.props.darkMode === "dark" ? darkTheme : lightTheme;
    return (
      <SearchBoxWrapper
        theme={this.props.darkMode}
        className="SearchBoxWrapper"
      >
        <Customizer {...currentTheme}>
          <SearchBox
            {...this.props}
            styles={{
              root: {
                borderColor:
                  this.props.darkMode === "dark" ? "#ffffff" : "#a6a6a6",
                borderRadius: 0,
                selectors: {
                  ":hover": {
                    borderColor:
                      this.props.darkMode === "dark" ? "#fff" : "#747474",
                  },
                },
              },
              field: {
                color: this.props.darkMode === "dark" ? "#ffffff" : "#323130",
              },
            }}
          />
        </Customizer>
      </SearchBoxWrapper>
    );
  }
}

export default CustomSearchBox;
