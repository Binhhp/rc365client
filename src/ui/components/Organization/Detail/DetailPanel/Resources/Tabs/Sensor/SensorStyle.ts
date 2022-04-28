import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const SensorTabWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export const NotConnectedWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  .ss__icon {
    font-size: 80px;
    color: #c4c4c4;
  }
  .ss__connect {
    font-weight: 600;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    margin: 0;
    cursor: pointer;
  }
`;

export const SensorContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 15px 15px 15px;
  display: flex;
  flex-direction: column;
  .content__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;
    border-bottom: 1px solid
      ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
    margin-bottom: 10px;
    .ss__disabled {
      .ss__icon {
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.TextDisabled, theme)};
        opacity: 0.6;
        cursor: default;
      }
      .ss__total {
        opacity: 0.6;
      }
    }
    .ss__infomation {
      display: flex;
      align-items: center;
      justify-content: center;
      .ss__icon {
        font-size: 60px;
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
        cursor: default;
      }
      .sensor__detail {
        padding: 10px 15px;
        .ss__id {
          font-weight: 600;
          font-size: 16px;
          margin: 0;
        }
        .ss__total {
          color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
          opacity: 0.8;
        }
      }
    }
  }
`;
