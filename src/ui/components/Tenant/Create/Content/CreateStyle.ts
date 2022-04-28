import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const CreateWrapper = styled.div`
  padding: 15px 30px;
  width: 100%;
  height: 100%;
  background: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
  border-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
  .tabContent {
    height: 100%;
  }
`;

export const PivotWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .is-disabled {
    opacity: 0.6;
  }
  .tab-wrapper .ms-Pivot .ms-Button--action {
    padding: 5px 10px;
    font-size: 15px;
    &:hover {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Background2, theme)};
    }
  }
  .tabContent {
    div:not([class]) {
      height: 100%;
    }
  }
`;
