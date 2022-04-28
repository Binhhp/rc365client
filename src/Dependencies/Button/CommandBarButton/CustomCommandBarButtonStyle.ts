import styled from "styled-components";
import { IButtonProps } from "../Button.types";

export interface ICustomCommandBarButtonProps extends IButtonProps {
  darkMode?: string;
}
// 69afe5
export const CommandBarButtonWrapper = styled.div`
  height: 100%;
  .ms-Button--commandBar {
    height: 100%;
    background-color: transparent;
    .ms-Button-flexContainer {
      margin: auto 0;
      .ms-Button-textContainer {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#212121")};
      }
      .ms-Button-icon {
        color: ${({ theme }) => (theme === "dark" ? "#b3d6fc" : "#2B569A")};
      }
      .ms-Button-menuIcon {
        color: ${({ theme }) => (theme === "dark" ? "#a19f9d" : "#c4c4c4")};
      }
    }

    &:hover {
      background-color: transparent;
      .ms-Button-flexContainer {
        .ms-Button-textContainer {
          color: ${({ theme }) => (theme === "dark" ? "#69afe5" : "#0078d4")};
        }
        .ms-Button-icon {
          color: ${({ theme }) => (theme === "dark" ? "#69afe5" : "#0078d4")};
        }
        .ms-Button-menuIcon {
          color: ${({ theme }) => (theme === "dark" ? "#69afe5" : "#0078d4")};
          background-color: transparent;
        }
      }
    }
    &:active {
      .ms-Button-flexContainer {
        .ms-Button-textContainer {
          color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
        }
        .ms-Button-icon {
          color: ${({ theme }) => (theme === "dark" ? "#b3d6fc" : "#2B569A")};
        }
        .ms-Button-menuIcon {
          color: ${({ theme }) => (theme === "dark" ? "#b3d6fc" : "#eaeaea")};
        }
      }
    }
  }
  .is-disabled {
    .ms-Button-textContainer,
    i {
      color: ${({ theme }) =>
        theme === "dark" ? "#A19F9D" : "#A6A6A6"} !important;
    }
  }
  .is-expanded {
    .ms-Button-flexContainer {
      .ms-Button-textContainer {
        color: ${({ theme }) =>
          theme === "dark" ? "#69afe5" : "#0078d4"} !important;
      }
      .ms-Button-icon {
        color: ${({ theme }) =>
          theme === "dark" ? "#69afe5" : "#0078d4"} !important;
      }
      .ms-Button-menuIcon {
        color: ${({ theme }) =>
          theme === "dark" ? "#69afe5" : "#0078d4"} !important;
      }
    }
  }
`;
