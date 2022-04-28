import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ConfirmWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .confirm__action {
    padding: 16px 24px;
    width: 100%;
    height: auto;
    max-height: 65px;
    display: flex;
    border-top: 1px solid
      ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
    .ms-Button--default {
      margin-right: 8px;
    }
  }
  .confirm__content {
    height: 100%;
    width: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .confirm__title {
      font-size: 16px;
      font-weight: 500;
      white-space: break-spaces;
    }
    .confirm__mainContent {
      height: 100%;
      width: 100%;
      position: relative;
    }
  }
`;

export const ConfirmItemsWrapper = styled.div`
  height: auto;
  max-height: 640px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 2px;
  &::-webkit-scrollbar {
    background-color: transparent;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme === "dark" ? "#c8c8c8" : "#c8c6c4")};
    border-radius: 10px;
    background-clip: content-box;
    border: solid 6px transparent;
    &:hover {
      background: #98a3a6;
      background-clip: content-box;
      border: solid 6px transparent;
    }
  }
`;
