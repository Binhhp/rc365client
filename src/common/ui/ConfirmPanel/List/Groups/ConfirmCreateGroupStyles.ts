import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ConfirmCreateGroupWrapper = styled.div`
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background4, theme)};
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  padding: 20px 30px;
  margin-bottom: 20px;
  cursor: pointer;
  .itemGroup__title {
    display: flex;
    align-items: center;
    .itemGroup__name {
      font-weight: 600;
      font-size: 15px;
      margin: 0;
    }
    i {
      padding-right: 10px;
      font-size: 15px;
    }
  }
  .itemGroup__email {
    font-size: 12px;
    color: #818080;
  }
  .itemGroup__description {
    margin-top: 5px;
    word-break: break-word;
  }
  .text-ellipsis-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
