import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const InfomationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  .infomation__stack {
    width: 100%;
    height: 100%;
    .infomation__block {
      max-width: 50%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      .TextFieldWrapper-comp,
      .infomation__license {
        margin-bottom: 15px;
      }
    }
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ConfirmWrapper = styled.div`
  background-color: ${({ theme }) =>
    theme === "dark" ? "#212121" : "#ffffff"};
  padding: 15px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  border: ${({ theme }) =>
    theme === "dark" ? "1px solid #2c2b2b" : "1px solid #f4f4f4"};
  .item__tenant {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item__name {
      margin: 0;
    }
  }
  .item__owner {
    border-top: 1px solid #c4c4c4;
    h3 {
      word-wrap: break-word;
      margin-bottom: 0;
    }
    p {
      word-wrap: break-word;
      margin: 0;
    }
  }
`;
