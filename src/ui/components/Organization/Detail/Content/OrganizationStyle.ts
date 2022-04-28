import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const OrganizationWrapper = styled.div`
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
  height: 100%;
  display: flex;
  flex-direction: column;
  .page__title {
    font-size: 21px;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
    margin-bottom: 15px;
    margin-top: 0;
  }
`;

// border-left: ${({ theme }) =>
// theme === "dark" ? "1px solid #000000" : "1px solid #eaeaea"};
export const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 30px 15px 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  @media screen and (max-width: 850px) {
    padding: 0;
  }
`;

export const PivotWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .tab-wrapper .ms-Pivot .ms-Button--action {
    padding: 5px 10px;
    font-size: 15px;
    &:hover {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Background, theme)};
    }
  }
  .tabContent {
    div:not([class]) {
      height: 100%;
    }
  }
`;

// pointer-events: ${({ theme }) =>
//       theme.isStillWorkingCreate ? "none" : "auto"};

export const HeaderRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  .is-disabled {
    .ms-Button-flexContainer {
      .ms-Button-icon {
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(
            ThemeColor.TextDisabled,
            theme
          )} !important;
        font-size: 14px;
      }
      .ms-Button-textContainer {
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(
            ThemeColor.TextDisabled,
            theme
          )} !important;
        font-size: 12px;
      }
    }
  }

  .ms-Button--commandBar .ms-Button-flexContainer .ms-Button-icon {
    font-size: 14px;
  }
  .ms-Button--commandBar .ms-Button-flexContainer .ms-Button-textContainer {
    font-size: 13px;
  }

  @media screen and (max-width: 850px) {
    .ms-Button--commandBar {
      padding: 5px 0;
      .ms-Button-flexContainer .ms-Button-textContainer .ms-Button-label {
        font-size: inherit;
      }
    }
  }
`;

export const FooterPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .footer__actionBtn {
    display: flex;
    .ms-Button {
      margin-right: 12px;
    }
  }
`;

export const ProgressListWrapper = styled.div`
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
    margin-bottom: 10px;
    .disabled__btn {
      opacity: 0.5;
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
        BuildFunction.buildColorByTheme(ThemeColor.DarkColor, theme)};
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

export const ProgressItem = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  cursor: default;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#121212" : "#f4f4f4"};
  }
  .item__infomation {
    display: flex;
    width: 90%;
    align-items: center;
    .ms-TooltipHost {
      .item__iconStatus {
        border-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
      }
    }
    .item__name {
      width: auto;
      height: 100%;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
      max-width: 70%;
    }
  }
  .item__iconStatus {
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    border: 1px solid;
  }
`;
