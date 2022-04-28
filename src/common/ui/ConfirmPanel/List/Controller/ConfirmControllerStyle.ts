import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ConfirmControllerWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background4, theme)};
  .rs__content {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid;
    border-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Gray, theme)};
    i {
      font-size: 80px;
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    }
    .rs__infomation {
      padding: 15px;
      h4,
      p {
        margin: 0;
      }
      h4 {
        font-size: 18px;
        word-break: break-all;
      }
      p {
        opacity: 90%;
      }
    }
  }
  .rs__details {
    display: flex;
    .rs__group {
      max-width: 50%;
      width: 100%;
    }
  }
`;
