import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const CreateSensorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  .infomation__stack {
    padding-bottom: 5px;
  }
  .infomation__stack .infomation__block {
    max-width: 50%;
    display: flex;
    flex-direction: column;
  }
  .padding__right {
    padding-right: 15px;
  }
  .expand__header {
    cursor: pointer;
    padding-top: 10px;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    .OC__icon {
      padding-right: 10px;
    }
    span,
    .OC__icon {
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    }
  }
`;

export const SearchResourceWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
