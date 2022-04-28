import styled from "styled-components";
import { IPivotProps } from "./Pivot.types";

export interface ICustomPivot extends IPivotProps {
  darkMode?: string;
  disableAction?: boolean;
}

export const PivotWrapper = styled.div`
  height: 100%;
  width: 100%;
  .tab-wrapper {
    .moveLeft-btn,
    .moveRight-btn {
      display: none !important;
    }
    .ms-Pivot {
      display: flex;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        background-color: transparent;
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        background: ${({ theme }) =>
          theme.theme === "dark" ? "#c8c8c8" : "#c8c6c4"};
        border-radius: 10px;
        background-clip: content-box;
        border: solid 7px transparent;
        opacity: 0.6;
        &:hover {
          background: #98a3a6;
          background-clip: content-box;
          border: solid 7px transparent;
          opacity: 0.8;
        }
      }
      .ms-Button--action .ms-Button-flexContainer .ms-Pivot-linkContent {
        .ms-Pivot-icon,
        .ms-Pivot-text {
          padding: 0 4px;
        }
      }
    }
  }
  @media screen and (max-width: 850px) {
    .tab-wrapper {
      padding: 0 20px;
      .moveLeft-btn,
      .moveRight-btn {
        display: flex !important;
        &:hover {
          opacity: 1 !important;
        }
      }
    }
  }
`;
