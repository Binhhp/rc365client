import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ListWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .ms-DetailsRow-cell {
    cursor: default;
  }
  .column__action {
    &:hover {
      font-weight: 600;
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)} !important;
    }
  }
  .text-ellipsis-2 {
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
`;
