import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ResourceConfirmCreateWrapper = styled.div`
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background4, theme)};
  padding: 15px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
  .Tag__title {
    margin: 10px 0;
    font-size: 24px;
  }
  .Tag__email {
    padding-left: 10px;
    margin: 2px 0;
  }
  .ms-Stack {
    padding: 2px 0 2px 10px;
    .ms-StackItem {
      width: 100%;
      .Tag__message {
        margin: 0;
        padding-left: 5px;
        word-break: break-word;
      }
    }
  }
`;
