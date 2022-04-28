import * as React from "react";
import { Pivot } from "./Pivot";
import { Customizer } from "../@uifabric/utilities";
import { darkTheme, lightTheme } from "../@uifabric/DefaultTheme";
import { ICustomPivot, PivotWrapper } from "./CustomPivotStyle";

class CustomSearchBox extends React.Component<ICustomPivot> {
  onHandleMoveRight = () => {
    let wrapWidth = document.getElementById(
      `tabListWrapper${this.props.rcName ? `-${this.props.rcName}` : ""}`
    );
    if (wrapWidth) {
      wrapWidth.scrollLeft = wrapWidth.scrollLeft + 50;
    }
  };

  onHandleMoveLeft = () => {
    let wrapWidth = document.getElementById(
      `tabListWrapper${this.props.rcName ? `-${this.props.rcName}` : ""}`
    );
    if (wrapWidth) {
      wrapWidth.scrollLeft = wrapWidth.scrollLeft - 50;
    }
  };

  render() {
    const currentTheme =
      this.props.darkMode === "dark" ? darkTheme : lightTheme;
    return (
      <PivotWrapper className="PivotWrapper" theme={this.props.darkMode}>
        <Customizer {...currentTheme}>
          <Pivot
            {...this.props}
            onHandleMoveToLeft={this.onHandleMoveLeft}
            onHandleMoveToRight={this.onHandleMoveRight}
            styles={{
              root: {
                display: "flex",
                width: "100%",
                overflowX: "auto",
                overflowY: "hidden",
                paddingBottom: "5px",
              },
              text: {
                padding: "0 4px",
              },
            }}
          />
        </Customizer>
      </PivotWrapper>
    );
  }
}

export default CustomSearchBox;
