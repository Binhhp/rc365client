import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const EditResourceWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .editResource__content {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-top: 40px;
    overflow: hidden;
    .edtRs__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 20px;
      .edit__organizationName {
        margin: 10px 22px;
        font-weight: 600;
      }
      .is-disabled {
        opacity: 0.6;
        cursor: default;
      }
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
      }
    }
  }
`;

export const MainContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  .tabContent {
    div:not([class]) {
      height: 100%;
    }
  }
  .tab-wrapper {
    margin: 0 22px;
  }
`;

export const FooterPanelWrapper = styled.div`
  padding: 16px 24px;
  width: 100%;
  height: auto;
  max-height: 65px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid
    ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
  .ms-Button--default {
    margin-right: 8px;
  }
  .footer__actionBtn {
    display: flex;
  }
`;
