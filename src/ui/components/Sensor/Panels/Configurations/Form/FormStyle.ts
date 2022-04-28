import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ConfigurationFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  .infomation__stack .infomation__block {
    max-width: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .endpoint__title {
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
      padding: 5px 0;
      .endpoint__icon {
        padding: 0 5px;
        cursor: default;
        opacity: 0.7;
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;
