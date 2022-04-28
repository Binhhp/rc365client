import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const NottificationListWrapper = styled.div`
  height: 100%;
  .btn__clear {
    text-align: end;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme.darkMode)};
    cursor: pointer;
    padding: 0 15px;
  }
  .noti-list {
    height: 100%;
    max-height: ${({ theme }) => `${theme.maxHeight}px`};
    overflow-y: auto;
    padding: 0 10px;
    &::-webkit-scrollbar {
      background-color: transparent;
      cursor: pointer;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) =>
        theme.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4"};
      border-radius: 10px;
      background-clip: content-box;
      border: solid 6px transparent;
      &:hover {
        background: #98a3a6;
        background-clip: content-box;
        border: solid 6px transparent;
      }
    }
  }
`;

export const EmptyContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
`;
