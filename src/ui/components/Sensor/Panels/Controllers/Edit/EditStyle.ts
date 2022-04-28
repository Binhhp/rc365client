import styled from "styled-components";
import { FooterPanelWrapper } from "src/ui/components/Organization/Detail/DetailPanel/Resources/Edit/EditStyle";
import { PivotWrapper } from "src/ui/components/Sensor/Content/ContentStyle";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const EditControllerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 6vh;
`;

export const FooterWrapper = styled(FooterPanelWrapper)``;

export const PivotContentWrapper = styled(PivotWrapper)`
  padding: 10px;
`;

export const ResourceEdtWrapper = styled.div`
  margin: 0 15px;
  background: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background4, theme)};
  padding: 15px;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 30%);
  .is-disabled {
    .rs__icon,
    .rs__infomation {
      opacity: 80%;
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)} !important;
      .text-ellipsis-2 {
        display: -webkit-box !important;
        -webkit-line-clamp: 2 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
      }
    }
  }
  .is-disabledRs {
    .rs__icon {
      color: #c4c4c4 !important;
      opacity: 0.8;
      cursor: default;
      transition: ease-out 0.1s;
    }
    .rs__group .rs__infomation {
      opacity: 0.6;
      cursor: default;
      transition: ease-out 0.1s;
    }
  }
  .content__wrapper {
    display: flex;
    align-items: center;
    .rs__icon {
      font-size: 70px;
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
      transition: ease-out 0.1s;
    }
    .rs__group {
      width: 100%;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .rs__infomation {
        display: flex;
        flex-direction: column;
        transition: ease-out 0.1s;
        h5 {
          font-size: 16px;
          margin: 0;
          word-break: break-all;
        }
        span {
          font-size: 14px;
        }
      }
      .rs__action {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 15px;
        .ToggleWrapper {
          padding: 5px 0;
        }
      }
    }
  }
  .collapsed {
    display: flex;
    flex-direction: column;
    padding-right: 15px;
    .rs__collapsedIcon {
      cursor: pointer;
      padding: 0 5px;
      margin-left: auto;
    }
    .rs__infomationGr {
      padding: 10px 0;
      margin-top: 10px;
      border-top: 1px solid;
      border-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
      transition: height 0.5s ease-in;
      .ms-Stack {
        padding: 5px 0;
        .ms-StackItem {
          max-width: 50%;
          width: 100%;
          p {
            margin: 0;
          }
        }
      }
    }
  }
`;
