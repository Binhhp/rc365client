import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ConfirmSensorWrapper = styled.div`
  padding: 20px 30px;
  margin-bottom: 25px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
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
`;
