import { BuildFunction } from "src/common/functions";
import { ThemeColor } from "src/common/style/ThemeColor";
import styled from "styled-components";

export const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 60px;
  justify-content: space-between;
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  border-top: 1px solid;
  border-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
  .action__gr {
    display: flex;
    .btn__action {
      margin-right: 10px;
    }
  }
`;

export const InfomationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .content {
    margin: 0 30px 10px 30px;
    padding-bottom: 6px;
    border-bottom: 1px solid;
    border-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
    h3 {
      margin: 0;
    }
  }
`;
