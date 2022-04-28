import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ConfirmSensorWrapper = styled.div`
  padding: 20px;
  display: flex;
  margin-bottom: 25px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  .wordBreak {
    word-break: break-word;
  }
  .text-ellipsis-2 {
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background4, theme)};
  .item__title {
    margin-bottom: 5px;
    i {
      margin-right: 10px;
    }
    span {
      font-weight: 600;
    }
  }
  .infomation__stack {
    .ms-StackItem {
      width: 100%;
      max-width: 50%;
    }
  }
  .block__icon {
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    display: flex;
    justify-content: center;
    padding: 10px 0px;
    max-width: 10%;
    width: 100%;
    i {
      font-size: 30px;
    }
  }
  .block__content {
    max-width: 45%;
    width: 100%;
    display: flex;
    flex-direction: column;
    p,
    h4 {
      margin: 5px 0;
      word-break: break-word;
    }
    h4 {
      font-size: 18px;
      margin: 0;
      padding: 5px 0;
      border-bottom: 1px solid;
      border-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Gray, theme)};
    }
  }
`;
