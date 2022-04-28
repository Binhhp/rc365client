import styled from "styled-components";
import { IToggleProps } from "./Toggle.types";

export interface ICustomToggleProps extends IToggleProps {
  darkMode?: string;
}
// hover #92c5f2

export const ToggleWrapper = styled.div`
  .is-checked {
    .ms-Toggle-innerContainer .ms-Toggle-background {
      background: ${({ theme }) => (theme === "dark" ? "#62aaff" : "#0078d4")};
      border: none;
      &:hover {
        background: ${({ theme }) =>
          theme === "dark" ? "#a4d4ff" : "#106EBE"};
      }
      .ms-Toggle-thumb {
        background-color: ${({ theme }) =>
          theme === "dark" ? "#333333" : "#ffffff"};
      }
    }
  }
  .ms-Toggle-innerContainer .ms-Toggle-background {
    background: ${({ theme }) => (theme === "dark" ? "#333333" : "#ffffff")};
    border: 1px solid
      ${({ theme }) => (theme === "dark" ? "#ffffff" : "#212121")};
    .ms-Toggle-thumb {
      background-color: ${({ theme }) =>
        theme === "dark" ? "#ffffff" : "#333333"};
    }
  }
  .is-disabled {
    .ms-Toggle-innerContainer {
      opacity: 0.5;
    }
  }
`;
