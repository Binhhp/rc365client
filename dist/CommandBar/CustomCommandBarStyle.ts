import styled from "styled-components";
import { ICommandBarProps } from "./CommandBar.types";

// <CommandBarProps>
export interface ICustomCommandBarProps extends ICommandBarProps {
  darkMode?: string;
}
// </CommandBarProps>

export const CommandBarWrapper = styled.div`
  width: 100%;
  .ms-CommandBar,
  .ms-CommandBar-secondaryCommand,
  .ms-CommandBar-primaryCommand {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#333333" : "#ffffff"};
  }
`;
