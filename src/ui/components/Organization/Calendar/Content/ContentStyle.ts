import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background, theme)};
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

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .blk__synchronized {
    padding: 0 10px;
    height: 32px;
    cursor: pointer;
    background-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.LightColor, theme)};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease-in 0.2s;
    .ico__synchronized {
      padding: 6px;
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    }
    span {
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
    }
    &:hover {
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
    }
  }
`;

export const PanelCreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 10vh 30px 0 30px;
  .exist__message {
    color: #f1707b;
    margin: 5px;
  }
`;

export const PivotWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .is-disabled {
    opacity: 0.6;
  }
  .tab-wrapper .ms-Pivot .ms-Button--action {
    padding: 5px 10px;
    font-size: 15px;
    &:hover {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.LightColor, theme.darkMode)};
    }
  }
  .tabContent {
    div:not([class]) {
      height: 100%;
    }
  }
  .main__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  .is-disabled {
    .ms-Button-flexContainer {
      .ms-Button-icon {
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(
            ThemeColor.TextDisabled,
            theme.darkMode
          )} !important;
        font-size: 14px;
      }
      .ms-Button-textContainer {
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(
            ThemeColor.TextDisabled,
            theme.darkMode
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
