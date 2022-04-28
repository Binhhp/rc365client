import styled from "styled-components";
import { FooterPanelWrapper } from "src/ui/components/Organization/Detail/DetailPanel/Resources/Edit/EditStyle";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const EditConfigurationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .form__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    padding: 10vh 30px 0 30px;
    .exist__message {
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Error, theme)};
      margin: 5px;
    }
  }
`;

export const FooterWrapper = styled(FooterPanelWrapper)``;
