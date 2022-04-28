import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ConfirmItemUserWrapper = styled.div`
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background4, theme)};
  padding: 15px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
  .ms-Stack {
    .ms-StackItem {
      width: 100%;
      max-width: 50%;
      &:not(:first-child) {
        margin-left: 15px;
      }
    }
  }
  .item__name {
    margin: 5px 0;
  }
  .wordBreak {
    word-break: break-word;
  }
  .text-ellipsis-2 {
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
  .text-ellipsis-3 {
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
  .item__contract {
    margin: 5px 5px;
  }
  .item__location {
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin: 0 5px;
    }
  }
  .item__listContract {
    margin: 5px 0;
    li {
      word-break: break-word;
    }
  }
`;
