import * as React from "react";
import styled from "styled-components";
import { Spinner, SpinnerSize } from "aod-dependencies/Spinner";
import { darkTheme, lightTheme } from "aod-dependencies/@uifabric/DefaultTheme";
import { Customizer } from "aod-dependencies/@uifabric/utilities";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoadingSpinner = (props: {
  darkMode?: string;
  size?: SpinnerSize;
  className?: string;
  rcName?: string;
}) => {
  const currentTheme = props.darkMode === "dark" ? darkTheme : lightTheme;
  return (
    <SpinnerWrapper className={`SpinnerWrapper ${props.className}`}>
      <Customizer {...currentTheme}>
        <Spinner size={props.size || SpinnerSize.large} rcName={props.rcName} />
      </Customizer>
    </SpinnerWrapper>
  );
};
