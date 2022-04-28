import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-left: 15px;
  border-left: 1px solid gray;
  overflow: hidden;
  .customList-wrapper {
    border: none;
    .ms-ScrollablePane .ms-ScrollablePane--contentContainer {
      .ms-DetailsRow {
        border: none;
        .ms-DetailsRow-fields {
          cursor: default;
          .ms-DetailsRow-cell {
            word-break: break-word;
          }
        }
      }
    }
  }
  .synch__actionBtn {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .disabled__btn {
      opacity: 0.8;
      cursor: default;
      pointer-events: none;
    }
    .actions__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 200px;
      height: 40px;
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
      width: 47%;
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
      }
      &:active {
        background-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.LightColor, theme)};
      }
      i {
        margin-right: 12px;
      }
    }
  }
  .progress__header {
    .progress__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      h4 {
        margin: 5px 0;
      }
      .is-disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
    .ms-ProgressIndicator .ms-ProgressIndicator-itemProgress {
      padding: 0;
    }
  }
  .progress__listItems {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
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
  }

  @media screen and (max-width: 850px) {
    border-left: none;
  }
`;
